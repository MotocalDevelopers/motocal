#!/usr/bin/env python3
"""
Motocal Image download script.

Usage: python download_image.py arm
       python download_image.py chara

Debug e.g: python download_image.py arm wiki tmp -d plain

Assume directory layouts
  * /
    * ./imgs
    * ./charaImages
    * ./txt_source/ URL list files
    * ./scripts/download_image.py This script

"""
import functools
import itertools
import logging
import os.path
import time
import urllib.request
from collections import namedtuple
from concurrent.futures import as_completed
from concurrent.futures.thread import ThreadPoolExecutor
from os import makedirs
from shutil import copyfileobj
from urllib.error import HTTPError

FutureResult = namedtuple("FutureResult", "url,path")

TXT_SOURCE = {'arm-wiki': "armImageWikiURLList.txt",
              'chara-wiki': "charaImageWikiURLList.txt",
              'arm-game': "armImageGameURLList.txt",
              'chara-game': "charaImageGameURLList.txt"}

SAVE_DIR = {'arm': '../imgs', 'chara': '../charaimgs'}
REQUIRED_REPORT_VALUES = ['count', 'total', 'message']


class Reporter:
    def __init__(self, total: int, report_function: callable, *args, **kwargs):
        self.count = 1
        self.total = total
        self.report_function = functools.partial(report_function, *args,
                                                 **kwargs)
        self._validate_report_function()

    def report(self, message, multiline=True, *args, **kwargs):
        if not multiline:
            message += '\r'
        self.report_function(count=self.count, total=self.total,
                             message=message, *args, **kwargs)

    def _validate_report_function(self):
        var_names = map(str.casefold,
                        self.report_function.func.__code__.co_varnames
                        [0:self.report_function.func.__code__.co_argcount])
        if not all(x.casefold() in var_names for x in REQUIRED_REPORT_VALUES):
            raise AttributeError(
                'Reporter methods have to have count,'
                ' total and message arguments')


def _progress_reporter(count, total, message):
    bar_len = 45
    filled_len = int(round(bar_len * count / float(total)))
    status = os.path.basename(message.path)
    percents = round(100.0 * count / float(total), 1)
    bar = '=' * filled_len + '-' * (bar_len - filled_len)
    print('[%s] %s%s ...%20s' % (bar, percents, '%', status), flush=True)


def _plain_reporter(count, total, message):
    """report plain text"""
    print('[%4d/%4d] Download %s' % count, total, message.url)


def _quiet_reporter(count, total, message):
    """
    :type message: object unused
    :type total: int unused
    :type count: int unused

    Added in case of it may be used internal logging for future
    """
    pass


def _do_nothing(*args, **kwargs):
    pass


REPORT_TYPE = {
    'progress': _progress_reporter,
    'plain': _plain_reporter,
    'quiet': _quiet_reporter
}


def download_image(url, path, method='GET', validate=False,
                   _retry_count=3, _timeout=1000, _wait_interval=0.5):
    """
    download image (for worker method)
    """
    for _ in range(_retry_count):
        try:
            http_request = urllib.request.Request(url, method=method)
            with urllib.request.urlopen(http_request,
                                        timeout=_timeout) as response:
                # FIXME: validate need to create empty file?
                # or just pass status code to reporter
                if not validate:
                    with open(path, mode="wb") as image_file:
                        copyfileobj(response, image_file)
                break
        except HTTPError as error:
            if error.code == 404:
                logging.error("Bad Url %s at path %s" % (url, path))
                break
            time.sleep(_wait_interval)
    return FutureResult(url, path)


def main(argv):
    """
    Download image file in URL list.
    """
    parser = _create_parser()
    options = parser.parse_args(argv)
    script_dir = os.path.abspath(os.path.dirname(__file__))
    txt_source = os.path.join(script_dir, "../txt_source")

    if not os.path.isdir(txt_source):
        logging.error("no directory found: %s", txt_source)
        return

    key = "%s-%s" % (options.target, options.site)
    separator = {"wiki": "=", "game": "/"}[options.site]
    filename = os.path.join(txt_source, TXT_SOURCE[key])
    report = REPORT_TYPE.get(options.reporter, _progress_reporter)

    if not os.path.isfile(filename):
        logging.error("No url list file found: %s", filename)
        return

    if not options.output:
        options.output = os.path.join(script_dir, SAVE_DIR[options.target])
        logging.info("Set default save directory: %s", options.output)

    if not os.path.isdir(options.output):
        logging.info("Save directory is created: %s", options.output)
        makedirs(options.output)

    def transform_wiki_url(file_name):
        url = r'http://gbf-wiki.com/attach2/%s_%s.png'
        return url % ('img'.encode('utf-8').hex().upper(),
                      file_name.encode('utf-8').hex().upper())

    def scan_file_for_download_list(url_map):
        """
        Finding and filtering existent files
        """
        # TODO: options.output, site, force -> param
        for url in url_map:
            name = url.split(separator)[-1]
            path = os.path.abspath(
                os.path.join(options.output, name))
            if options.force or not os.path.exists(path):
                if options.site == "wiki":
                    url = transform_wiki_url(name)
                yield url, path

    if options.dry_run:
        # In case of dry-run do nothing
        worker_method = _do_nothing
    elif options.validate:
        # In case of validation run HEAD request
        worker_method = functools.partial(download_image, method='HEAD')
    else:
        worker_method = download_image

    with open(filename, encoding="utf-8", mode='r') as url_list_file:
        _read_lines = functools.partial(map, str.rstrip)
        url_map = _read_lines(url_list_file)
        items = list(scan_file_for_download_list(url_map))
        total = len(items)

    if total < 0:
        # Nothing to process
        return

    # Do not create workers in case number of items are low
    _max_workers = max(1, min(total, options.workers))

    with ThreadPoolExecutor(max_workers=_max_workers) as executor:
        reporter = Reporter(total=total, report_function=report)
        submit = functools.partial(executor.submit, worker_method)
        for future in as_completed(itertools.starmap(submit, items)):
            reporter.report(future.result())


def _create_parser():
    from argparse import ArgumentParser
    parser = ArgumentParser()
    parser.add_argument('target', type=str, action='store',
                        choices=list(SAVE_DIR.keys()))
    parser.add_argument('-s', '--site', type=str, action='store',
                        default="wiki", choices=["wiki", "game"])
    parser.add_argument('-o', '--output', type=str, action='store',
                        default=None)
    parser.add_argument('-w', '--workers', type=int, action='store',
                        default=10)
    parser.add_argument('-f', '--force', action='store_true')
    report_group = parser.add_mutually_exclusive_group(required=False)
    report_group.add_argument('-r', '--reporter', type=str, action='store',
                              default='progress',
                              choices=['progress', 'plain'])
    report_group.add_argument('-q', '--quiet', action='store_const',
                              dest='reporter',
                              const='quiet')
    run_group = parser.add_mutually_exclusive_group(required=False)
    run_group.add_argument('-d', '--dry-run', action='store_true')
    run_group.add_argument('-v', '--validate', action='store_true')
    return parser


if __name__ == '__main__':
    import sys

    main(sys.argv[1:])

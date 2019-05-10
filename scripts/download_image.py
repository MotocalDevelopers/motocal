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
import logging
import os.path
import time
from concurrent.futures import as_completed
from concurrent.futures.thread import ThreadPoolExecutor
from os import makedirs
from shutil import copyfileobj
from urllib.error import HTTPError
from urllib.request import urlopen

_read_lines = functools.partial(map, str.rstrip)

TXT_SOURCE = {'arm-wiki': "armImageWikiURLList.txt",
              'chara-wiki': "charaImageWikiURLList.txt",
              'arm-game': "armImageGameURLList.txt",
              'chara-game': "charaImageGameURLList.txt"}

SAVE_DIR = {'arm': '../imgs', 'chara': '../charaimgs'}


def _progress_reporter(count, total, path='', multiline=True):
    bar_len = 45
    filled_len = int(round(bar_len * count / float(total)))
    status = os.path.basename(path)
    percents = round(100.0 * count / float(total), 1)
    bar = '=' * filled_len + '-' * (bar_len - filled_len)
    if not multiline:
        print('[%s] %s%s ...%20s' % (bar, percents, '%', status), flush=True,
              end='\r')
    else:
        print('[%s] %s%s ...%20s' % (bar, percents, '%', status), flush=True)


def _plain_reporter(count, total, url=''):
    """report plain text"""
    print('[%4d/%4d] Download %s' % count, total, url)


def _quiet_reporter(*args, **kwargs):
    # Added in case of it may be used internal logging for future
    return _do_nothing(args, kwargs)


def _do_nothing(*args, **kwargs):
    pass


REPORT_TYPE = {
    'progress': _progress_reporter,
    'plain': _plain_reporter,
    'quiet': _quiet_reporter
}


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
        for url in url_map:
            name = url.split(separator)[-1]
            path = os.path.abspath(
                os.path.join(options.output, name))
            if options.force or not os.path.exists(path):
                if options.site == "wiki":
                    url = transform_wiki_url(name)
                yield url, path

    def download_image(url, path, _retry_count=3, _timeout=1000):
        for _ in range(_retry_count):
            try:
                with urlopen(url, timeout=_timeout) as response, \
                        open(path, mode="wb") as image_file:
                    copyfileobj(response, image_file)
                    return True
            except HTTPError as error:
                if error.code == 404:
                    print("Bad Url %s at path %s" % (url, path),
                          file=sys.stderr)
                    break
                time.sleep(0.5)
        return False

    with open(filename, encoding="utf-8", mode='r') as url_list_file:
        # CPU wise copying to list is cheaper as we need to load all items into
        # memory in order to count them anyways
        url_map = _read_lines(url_list_file)
        items = list(scan_file_for_download_list(url_map))
        total = len(items)
        if total > 0:
            # Do not create workers in case number of items are low
            _max_workers = min(total, options.workers)
            function = download_image
            if options.dry_run:
                # In case of dry-run do nothing
                function = _do_nothing
            with ThreadPoolExecutor(max_workers=_max_workers) as executor:
                submit = functools.partial(executor.submit, function)
                future_to_image = {submit(url, path): (url, path) for
                                   (url, path) in items}
                for num, future in enumerate(as_completed(future_to_image),
                                             start=1):
                    url, path = future_to_image[future]
                    if options.reporter == "progress":
                        report_address = path
                    else:
                        report_address = url
                    report(num, total, report_address)


def _create_parser():
    from argparse import ArgumentParser
    parser = ArgumentParser()
    parser.add_argument('target', type=str, action='store',
                        choices=list(SAVE_DIR.keys()))
    parser.add_argument('-s', '--site', type=str, action='store',
                        default="wiki", choices=["wiki", "game"])
    parser.add_argument('-o', '--output', type=str, action='store',
                        default=None)
    parser.add_argument('-d', '--dry-run', action='store_true')
    parser.add_argument('-w', '--workers', type=int, action='store',
                        default=10)
    parser.add_argument('-f', '--force', action='store_true')
    group = parser.add_mutually_exclusive_group(required=False)
    group.add_argument('-r', '--reporter', type=str, action='store',
                       default='progress', choices=['progress', 'plain'])
    group.add_argument('-q', '--quiet', action='store_const', dest='reporter',
                       const='quiet')
    return parser


if __name__ == '__main__':
    import sys

    main(sys.argv[1:])

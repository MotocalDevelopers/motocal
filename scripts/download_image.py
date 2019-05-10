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
import argparse
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

    def report(self, message: str, next_line: bool = True, *args, **kwargs):
        """
        Prints requested message to the console.
        :param next_line: whatever reporting should skip a line or not.
        :type message: str message to print to the console.
        :return:
        """
        if not next_line:
            message += '\r'
        self.report_function(count=self.count, total=self.total,
                             message=message, *args, **kwargs)
        self.count += 1

    def _validate_report_function(self):
        """
        Validates if reporting function has necessary parameters to function.
        :except AttributeError if all attributes are not provided.
        :return:
        """
        var_names = map(str.casefold,
                        self.report_function.func.__code__.co_varnames
                        [0:self.report_function.func.__code__.co_argcount])
        if not all(x.casefold() in var_names for x in REQUIRED_REPORT_VALUES):
            raise AttributeError(
                'Reporter methods have to have count,'
                ' total and message arguments')


def _progress_reporter(count: int, total: int, message: FutureResult,
                       bar_len: int = 45):
    """
    Gives current progress on a progress bar.
    :param count: Current item index.
    :param total: Number of items.
    :param message: Message to print to console.
    :param bar_len: Length of the progress bar.
    :return:
    """
    filled_len = int(round(bar_len * count / float(total)))
    status = os.path.basename(message.path)
    percents = round(100.0 * count / float(total), 1)
    bar = '=' * filled_len + '-' * (bar_len - filled_len)
    print('[%s] %s%s ...%20s' % (bar, percents, '%', status), flush=True)


def _plain_reporter(count: int, total: int, message: FutureResult):
    print('[%4d/%4d] Download %s' % (count, total, message.url), flush=True)


def _quiet_reporter(count: int, total: int, message: FutureResult):
    """
    Added in case of it may be used internal logging for future
    :param message: object unused
    :param total: int unused
    :param count: int unused
    :return:
    """
    pass


def _do_nothing(*args, **kwargs):
    """
    Dummy function that does nothing
    :param args:
    :param kwargs:
    :return:
    """
    pass


REPORT_TYPE = {
    'progress': _progress_reporter,
    'plain': _plain_reporter,
    'quiet': _quiet_reporter,
}


def download_image(url: str, path: str, _retry_count: int = 3,
                   _timeout: int = 1000,
                   _wait_interval: float = 0.5) -> FutureResult:
    """
    Downloads image from any given url and saves into path
    :param url: URL to be downloaded
    :param path: Save location
    :param _retry_count: Number of retries before giving up
    :param _timeout: Connection timeout between client and server
    :param _wait_interval: Time to wait before retry
    :return: url and path back for reporting
    """
    for _ in range(_retry_count):
        try:
            with urllib.request.urlopen(url, timeout=_timeout) as response:
                with open(path, mode="wb") as image_file:
                    copyfileobj(response, image_file)
                    break
        except HTTPError as error:
            if error.code == 404:
                logging.error("Bad Url %s at path %s" % (url, path))
                break
            time.sleep(_wait_interval)
    return FutureResult(url, path)


def validate_image_url(url: str, path: str,
                       _timeout: int = 1000) -> FutureResult:
    """
    Validates any image url
    :param _timeout: Connection timeout between client and server
    :param url: URL to be check
    :param path: not used
    :return: url and path back for reporting
    """
    try:
        url_request = urllib.request.Request(url=url, method='HEAD')
        urllib.request.urlopen(url_request, timeout=_timeout)
    except HTTPError as error:
        logging.error(
            "Bad Url %s at path %s with error %s" % (url, path, error))
    return FutureResult(url, path)


def validate_source_files(source_location: str, filename: str) -> bool:
    if not os.path.isdir(source_location):
        logging.error("No directory found: %s", source_location)
        return False

    if not os.path.isfile(filename):
        logging.error("No url list file found: %s", filename)
        return False

    return True


def main(argv: list):
    """
    Entry point of the download image script
    :param argv: Console arguments
    :return:
    """
    script_dir = os.path.abspath(os.path.dirname(__file__))
    source_location = os.path.join(script_dir, "../txt_source")

    parser = _create_parser()
    options = parser.parse_args(argv)

    key = "%s-%s" % (options.target, options.site)
    filename = os.path.join(source_location, TXT_SOURCE[key])

    if not validate_source_files(source_location,
                                 filename) or not _create_save_locations(
        options.output, options.target, script_dir):
        return

    def transform_wiki_url(file_name):
        url = r'http://gbf-wiki.com/attach2/%s_%s.png'
        return url % ('img'.encode('utf-8').hex().upper(),
                      file_name.encode('utf-8').hex().upper())

    def scan_file_for_download_list(url_map: map, site: str, output: str,
                                    force: bool):
        """
        Scans text file and collects valid links into a generator
        :param url_map: Content of text file
        :param site:  Data source to be used
        :param output: Save location
        :param force: Whatever to overwrite current file or not
        :return:
        """
        separator = {"wiki": "=", "game": "/"}[site]
        for url in url_map:
            name = url.split(separator)[-1]
            path = os.path.abspath(
                os.path.join(output, name))
            if force or not os.path.exists(path):
                if site == "wiki":
                    url = transform_wiki_url(name)
                yield url, path

    with open(filename, encoding="utf-8", mode='r') as url_list_file:
        _read_lines = functools.partial(map, str.rstrip)
        url_map = _read_lines(url_list_file)
        items = list(
            scan_file_for_download_list(url_map, options.site, options.output,
                                        options.force))
        total = len(items)

    if total <= 0:
        # Nothing to process
        return

    # Do not create workers in case number of items are low
    _max_workers = max(1, min(total, options.workers))

    with ThreadPoolExecutor(max_workers=_max_workers) as executor:
        reporter = _create_reporter(options.validate, options.reporter, total)
        worker_method = _decide_worker_method(options.dry_run,
                                              options.validate)
        submit = functools.partial(executor.submit, worker_method)
        for future in as_completed(itertools.starmap(submit, items)):
            reporter.report(future.result())


def _create_reporter(validate: bool, report_type: str, total: int) -> Reporter:
    """
    Create a reporter object
    :param validate: Validate implies quiet in order to not overwrite errors
    :param report_type: Report type supplied from command line
    :param total: Total amount of items
    :return:
    """
    if validate:
        report_type = 'quiet'
    report_function = REPORT_TYPE.get(report_type, _progress_reporter)
    reporter = Reporter(total=total, report_function=report_function)
    return reporter


def _decide_worker_method(dry_run: bool = False,
                          validate: bool = False) -> callable:
    """
    Decides which method to use in order to run user request
    :param dry_run: Does nothing
    :param validate: Validates all urls
    :return:
    """
    if dry_run:
        # In case of dry-run do nothing
        worker_method = _do_nothing
    elif validate:
        # In case of validation run validate method
        worker_method = validate_image_url
    else:
        worker_method = download_image
    return worker_method


def _create_save_locations(output: str, target: str, script_dir: str) -> bool:
    """
    Create files and folders for save location if they don't exist
    :param output: Desired save location
    :param target: Arm or chara type
    :param script_dir: Current location of script
    :return:
    """
    try:
        if not output:
            output = os.path.join(script_dir, SAVE_DIR[target])
            logging.info("Set default save directory: %s", output)
        if not os.path.isdir(output):
            logging.info("Save directory is created: %s", output)
            makedirs(output)
        return True
    except IOError as err:
        logging.error("Cannot create necessary folder or files %s" % err)
        return False


def _create_parser():
    parser = argparse.ArgumentParser()
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

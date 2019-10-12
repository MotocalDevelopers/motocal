#!/usr/bin/env python3
"""
Motocal Image download script.

Usage: python3 download_image.py arm
       python3 download_image.py chara

Debug e.g: python3 download_image.py arm -c

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
import re
import time
import urllib.request
from collections import namedtuple
from concurrent.futures import as_completed
from concurrent.futures.thread import ThreadPoolExecutor
from os import makedirs
from shutil import copyfileobj
from urllib.error import HTTPError

FutureResult = namedtuple("FutureResult", "url,path")

TXT_SOURCE = {
    'arm-wiki': "armImageWikiURLList.txt",
    'chara-wiki': "charaImageWikiURLList.txt",
    'arm-game': "armImageGameURLList.txt",
    'chara-game': "charaImageGameURLList.txt"
}

SAVE_DIR = {'arm': '../imgs', 'chara': '../charaimgs'}
GAME_WORKER_LIMIT = 1

WARNING_MESSAGE = """
    WARNING: You specified {} workers which is over limit {} to download images
             from game website This may lead you to get banned.

    If you accept it enter Y or enter N to exit script.
    If not please define number of threads with -w parameter.
    If you want to skip this warning you can enter -y while calling script.

    Input [y/n]: """


def _progress_reporter(count: int, total: int, result: FutureResult,
                       bar_len: int = 40, multi: bool = True):
    """
    Gives current progress on a progress bar.
    :type multi: Allows multiple lines of report to fill
    :param count: Current item index.
    :param total: Number of items.
    :param result: Result from worker thread
    :param bar_len: Length of the progress bar.
    :return:

    >>> _progress_reporter(1, 100, FutureResult(r'url', r'path'))
    [----------------------------------------] 1.0% ...                path
    """
    filled_len = int(round(bar_len * count / float(total)))
    status = os.path.basename(result.path)
    percents = round(100.0 * count / float(total), 1)
    bar = '=' * filled_len + '-' * (bar_len - filled_len)
    print('[{}] {}{} ...{:>20}'.format(bar, percents, '%', status),
          flush=True, end='\r' if not multi else '\n')


def _plain_reporter(count: int, total: int, result: FutureResult,
                    multi: bool = True):
    """
    Gives current file and turn
    :param count: Current item index.
    :param total: Number of items.
    :param result: Result from worker thread
    :param multi: Allows multiple lines of report to fill
    :return:

    >>> _plain_reporter(1, 100, FutureResult(r'url', r'path'))
    [   1/ 100] Download url
    """
    print('[{:>4}/{:>4}] Download {}'.format(count, total, result.url),
          flush=True, end='\r' if not multi else '\n')


def _quiet_reporter(count: int, total: int, result: FutureResult):
    """
    Added in case of it may be used internal logging for future
    :param result: object unused
    :param total: int unused
    :param count: int unused
    :return:
    >>> _quiet_reporter(1, 100, FutureResult(r'url', r'path'))
    """
    pass


def _do_nothing(*args, **kwargs):
    """
    Dummy function that does nothing
    :param args:
    :param kwargs:
    :return:
    >>> _do_nothing()
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
    >>> download_image('http://www.example.com/attach2/696D67_31303430383039\
3530302E706E67.png','C://motocal//imgs//1040809500.png') # doctest: +SKIP
    FutureResult(url='http://www.example.com/attach2/696D67_3130343038303935\
30302E706E67.png', path='C://motocal//imgs//1040809500.png')
    """
    for _ in range(_retry_count):
        try:
            with urllib.request.urlopen(url, timeout=_timeout) as response:
                with open(path, mode="wb") as image_file:
                    copyfileobj(response, image_file)
                    break
        except HTTPError as error:
            if error.code == 404:
                logging.error("Bad Url {} at path {}".format(url, path))
                break
            time.sleep(_wait_interval)
    return FutureResult(url, path)


def check_image_url(url: str, path: str,
                    _timeout: int = 1000) -> FutureResult:
    """
    Checks any image url
    :param _timeout: Connection timeout between client and server
    :param url: URL to be check
    :param path: not used
    :return: url and path back for reporting

    >>> check_image_url('http://www.example.com/attach2/696D67_31303430383039\
3530302E706E67.png','C://motocal//imgs//1040809500.png') # doctest: +SKIP
    FutureResult(url='http://www.example.com/attach2/696D67_3130343038303935\
30302E706E67.png', path='C://motocal//imgs//1040809500.png')
    """
    try:
        url_request = urllib.request.Request(url=url, method='HEAD')
        urllib.request.urlopen(url_request, timeout=_timeout)
    except HTTPError as error:
        logging.error(
                "Bad Url {} at path {} with error {}".format(url, path, error))
    return FutureResult(url, path)


def transform_wiki_url(file_name: str) -> str:
    """
    Transforms attach url to original wiki url
    :param file_name: name of the file
    :return: file url
    >>> transform_wiki_url('1040017000.png')
    'http://gbf-wiki.com/attach2/696D67_313034303031373030302E706E67.png'
    >>> b'img'.hex().upper()
    '696D67'
    """
    url = r'http://gbf-wiki.com/attach2/696D67_{}.png'
    return url.format(file_name.encode('utf-8').hex().upper())


def scan_file_for_download_list(urls: list, site: str, output: str,
                                force: bool):
    """
    Scans text file and collects valid links into a generator
    :param site: Where to download 'wiki' or 'game'
    :param urls: Content of text file
    :param output: Save location
    :param force: Whatever to overwrite current file or not
    :param site: Where to download 'wiki' or 'game'
    :return:
    """
    for url in urls:
        name = re.findall(r'\d[^ /].*', url)[0]
        path = os.path.abspath(os.path.join(output, name))
        if force or not os.path.exists(path):
            if site == 'wiki':
                url = transform_wiki_url(name)
            yield url, path


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

    if options.site == 'game' and options.workers > GAME_WORKER_LIMIT:
        if options.yes:
            logging.info("Passing warning message...")
        elif not accept_game_download_warning(options.workers):
            return
        else:
            logging.info('Warning accepted, script will continue')

    key = "{}-{}".format(options.target, options.site)
    filename = os.path.join(source_location, TXT_SOURCE[key])

    if not os.path.isdir(source_location):
        logging.error("No directory found: {}".format(source_location))
        return

    if not os.path.isfile(filename):
        logging.error("No url list file found: {}".format(filename))
        return

    if not options.output:
        options.output = os.path.join(script_dir, SAVE_DIR[options.target])
        logging.info("Set default save directory: {}".format(options.output))

    try:
        if not os.path.isdir(options.output):
            logging.info(
                    "Save directory is created: {}".format(options.output))
            makedirs(options.output)
    except IOError as error:
        logging.error("Can't create the file/folders {}".format(error))
        return

    if options.dry_run:
        # In case of dry-run do nothing
        worker_method = _do_nothing
    elif options.check:
        # In case of validation run validate method
        worker_method = check_image_url
        options.force = True
        options.reporter = 'quiet'
    else:
        worker_method = download_image

    with open(filename, encoding="utf-8", mode='r') as url_file:
        read_lines = functools.partial(map, str.rstrip)
        urls = read_lines(url_file)
        items = list(
                scan_file_for_download_list(urls, options.site, options.output,
                                            options.force))
        total = len(items)

    if total <= 0:
        # Nothing to process
        return

    # Do not create workers in case number of items are low
    max_workers = max(1, min(total, options.workers))

    with ThreadPoolExecutor(max_workers=max_workers) as executor:
        submit = functools.partial(executor.submit, worker_method)
        count = itertools.count(start=1)
        report = REPORT_TYPE.get(options.reporter)
        for future in as_completed(itertools.starmap(submit, items)):
            report(next(count), total, future.result())


def accept_game_download_warning(workers: int,
                                 input_fn: callable = input) -> bool:
    """
    Shows warning in case user selected game as a source
    :param input_fn: Input function for test or file reading
    :param workers: Number of workers
    :return:
    >>> accept_game_download_warning(10, input_fn=lambda _: "y")
    True
    >>> accept_game_download_warning(10, input_fn=lambda _: "n")
    False
    """
    import textwrap
    choice = input_fn(
        textwrap.dedent(WARNING_MESSAGE.format(workers, GAME_WORKER_LIMIT)))
    while choice.lower() not in ['y', 'n']:
        choice = input_fn('Either enter Y or N as an argument:')
    return choice.lower() == 'y'


def _create_parser():
    """
    Creates default parser for the application
    :return:
    >>> any('target' in x.dest for x in _create_parser()._actions)
    True
    """
    parser = argparse.ArgumentParser()
    parser.add_argument('target', type=str, action='store',
                        choices=list(SAVE_DIR.keys()))
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
    run_group.add_argument('-c', '--check', action='store_true')
    source_group = parser.add_argument_group('source arguments')
    source_group.add_argument('-s', '--site', type=str, action='store',
                              default="wiki", choices=["wiki", "game"])
    source_group.add_argument('-y', '--yes', action='store_true',
                              help='pass warning')
    return parser


if __name__ == '__main__':
    import sys

    main(sys.argv[1:])

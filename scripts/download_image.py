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
from concurrent.futures import as_completed
from concurrent.futures.thread import ThreadPoolExecutor
from os import makedirs
from shutil import copyfileobj
from urllib.request import urlopen

_read_lines = functools.partial(map, str.rstrip)

TXT_SOURCE = {'arm-wiki': "armImageWikiURLList.txt",
              'chara-wiki': "charaImageWikiURLList.txt",
              'arm-game': "armImageGameURLList.txt",
              'chara-game': "charaImageGameURLList.txt"}

SAVE_DIR = {'arm': '../imgs', 'chara': '../charaImgs'}


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


REPORT_TYPE = {
        'progress': _progress_reporter,
        'plain': _plain_reporter,
}


def main(argv):
    """
    Download image file in URL list.
    """
    parser = _create_parser()
    if len(argv) == 1:  # if only 1 argument, it's the script name
        parser.print_usage()
        return
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

    if not options.directory:
        options.directory = os.path.join(script_dir, SAVE_DIR[options.target])
        logging.info("Set default save directory: %s", options.directory)

    if not os.path.isdir(options.directory):
        logging.info("Save directory is created: %s", options.directory)
        makedirs(options.directory)

    def scan_file_for_download_list(file):
        """
        Finding and filtering existent files
        """
        url_list = []
        for url in _read_lines(file):
            path = os.path.abspath(
                    os.path.join(options.directory, url.split(separator)[-1]))
            if options.force or not os.path.exists(path):
                url_list.append((url, path))
        return url_list

    def download_image(url, path):
        if not options.quiet:
            with urlopen(url) as response, open(path, mode="wb") as image_file:
                if response.code == 200:
                    copyfileobj(response, image_file)
                response.close()

    with open(filename, encoding="utf-8", mode='r') as url_list_file:
        # CPU wise copying to list is cheaper as we need to load all items into
        # memory in order to count them anyways
        items = scan_file_for_download_list(url_list_file)
        total = len(items)
        if total > 0:
            with ThreadPoolExecutor(max_workers=options.workers) as executor:
                submit = functools.partial(executor.submit, download_image)
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
    parser.add_argument('-t', '--target', type=str, action='store',
                        default="arm", choices=list(SAVE_DIR.keys()))
    parser.add_argument('-s', '--site', type=str, action='store',
                        default="wiki", choices=["wiki", "game"])
    parser.add_argument('-d', '--directory', type=str, action='store',
                        default=None)
    parser.add_argument('-q', '--quiet', action='store_true')
    parser.add_argument('-w', '--workers', type=int, action='store',
                        default=10)
    parser.add_argument('-r', '--reporter', type=str, action='store',
                        default='progress', choices=['progress', 'plain'])
    parser.add_argument('-f', '--force', action='store_true')
    return parser


if __name__ == '__main__':
    import sys

    main(sys.argv[1:])

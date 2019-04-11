#!/usr/bin/env python3
"""
Motocal Image download script.

Usage: python download_image.py arm
       python download_image.py chara

Debug e.g: python download_image.py arm wiki tmp -d plain

Assume directory layous
  * /
    * ./imgs
    * ./charaImages
    * ./txt_source/ URL list files
    * ./scripts/download_image.py This script

"""

import functools
import logging
import os
import sys
from urllib.request import urlretrieve

_readlines = functools.partial(map, str.rstrip)

TXT_SOURCE = {
    'arm-wiki': "armImageWikiURLList.txt",
    'chara-wiki': "charaImageWikiURLList.txt",
    'arm-game': "armImageGameURLList.txt",
    'chara-game': "charaImageGameURLList.txt",
}

SAVE_DIR = {
    'arm': '../imgs',
    'chara': '../charaImgs',
}

def progress_reporter(count, total, url='', path=''):
    bar_len = 45
    filled_len = int(round(bar_len * count / float(total)))
    status = os.path.basename(path)

    percents = round(100.0 * count / float(total), 1)
    bar = '=' * filled_len + '-' * (bar_len - filled_len)

    sys.stdout.write('[%s] %s%s ...%20s\r' % (bar, percents, '%', status))
    sys.stdout.flush()


def plain_reporter(count, total, url='', path=''):
    "report plain text"
    print('[{:4}/{:4}] Download {}'.format(count, total, url))


REPORT_TYPE = {
    'progress': progress_reporter,
    'plain': plain_reporter,
}


def main(target='arm', site='wiki', save_dir=None, dry_run=False, report_type="progress"):
    """
    Download image file in URL list.

    Options: [target='arm'] [site='wiki'] [save_dir=None] [dry_run=False]
      * target: (arm|chara)
      * site: (wiki|game)
      * save_dir: (./imgs|./charaimgs)
      * dry_run: -d for enabled. (must be set as the 4th argument)
                 print url list without downlaod.
    """

    script_dir = os.path.abspath(os.path.dirname(__file__))
    txt_source = os.path.join(script_dir, "../txt_source")

    if not os.path.isdir(txt_source):
        logging.error("no directory found: %s", txt_source)
        return

    try:
        key = "{}-{}".format(target, site)
        separator = {"wiki": "=", "game": "/"}[site]
        filename = os.path.join(txt_source, TXT_SOURCE[key])
        report = REPORT_TYPE.get(report_type, progress_reporter)
    except KeyError:
        if not target in {'arm', 'chara'}:
            logging.error("target argument must be 'arm' or 'chara'")
        if not site in {'wiki', 'game'}:
            logging.error("site argument must be 'wiki' or 'game'")
        print(main.__doc__, file=sys.stderr)
        return

    if not os.path.isfile(filename):
        logging.error("No url list file found: %s", filename)
        return

    if not save_dir:
        assert target in SAVE_DIR
        save_dir = os.path.join(script_dir, SAVE_DIR[target])
        logging.info("Set default save directory: %s", save_dir)

    if not os.path.isdir(save_dir):
        logging.info("Save directory is created: %s", save_dir)
        os.makedirs(save_dir)


    def parse_file(stream, separator=separator):
        """
        Parse file line and return pair of (url, a local save path)
        """
        for url in _readlines(stream):
            name = url.split(separator)[-1]
            path = os.path.abspath(os.path.join(save_dir, name))
            yield url, path

    def scan_download(stream, override=False):
        """
        Filtering non-exists files

        NOTE: `override` flag is currently unused.
        pass this param if implement force download option in future.
        """
        for url, path in parse_file(stream):
            if override or not os.path.exists(path):
                yield url, path

    def count_iter(iterable):
        """
        count number of elements in an iterator.
        """
        return sum(1 for _ in iterable)


    with open(filename, encoding="utf-8") as stream:
        total = count_iter(scan_download(stream))

        stream.seek(0)

        for num, (url, path) in enumerate(scan_download(stream), start=1):
            report(num, total, url, path)
            if not dry_run:
                urlretrieve(url, path)


if __name__ == '__main__':
    main(*sys.argv[1:])

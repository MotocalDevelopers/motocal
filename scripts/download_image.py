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
import os
import sys
from optparse import OptionParser
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


def progress_reporter(count, total, path=''):
    bar_len = 45
    filled_len = int(round(bar_len * count / float(total)))
    status = os.path.basename(path)

    percents = round(100.0 * count / float(total), 1)
    bar = '=' * filled_len + '-' * (bar_len - filled_len)

    sys.stdout.write('[%s] %s%s ...%20s\r' % (bar, percents, '%', status))
    sys.stdout.flush()


def plain_reporter(count, total, url=''):
    """report plain text"""
    print('[{:4}/{:4}] Download {}'.format(count, total, url))


REPORT_TYPE = {
    'progress': progress_reporter,
    'plain': plain_reporter,
}


def main(argv):
    """
    Download image file in URL list.

    Options: [--target arm] [--site wiki] [--save_dir path] [-d] [--workers=1]
      * --target -t: (arm|chara)
      * --site: (wiki|game)
      * --save_dir: (./imgs|./charaimgs)
      * --dry-run -d: Prints url list without download.
      * --workers -w: Number of threads to download images.
      * --reporter -r: (progress|plain)
    """
    parser = create_parser()
    if len(sys.argv) == 1:  # if only 1 argument, it's the script name
        parser.print_usage()
        exit(2)
    (options, args) = parser.parse_args(argv)
    script_dir = os.path.abspath(os.path.dirname(__file__))
    txt_source = os.path.join(script_dir, "../txt_source")

    if not os.path.isdir(txt_source):
        logging.error("no directory found: %s", txt_source)
        return

    key = "{}-{}".format(options.target, options.site)
    separator = {"wiki": "=", "game": "/"}[options.site]
    filename = os.path.join(txt_source, TXT_SOURCE[key])
    report = REPORT_TYPE.get(options.reporter, progress_reporter)

    if not os.path.isfile(filename):
        logging.error("No url list file found: %s", filename)
        return

    if not options.save_dir:
        options.save_dir = os.path.join(script_dir, SAVE_DIR[options.target])
        logging.info("Set default save directory: %s", options.save_dir)

    if not os.path.isdir(options.save_dir):
        logging.info("Save directory is created: %s", options.save_dir)
        os.makedirs(options.save_dir)

    def parse_file(_stream, _separator=separator):
        """
        Parse file line and return pair of (_url, a local save _path)
        """
        for _url in _readlines(_stream):
            name = _url.split(_separator)[-1]
            _path = os.path.abspath(os.path.join(options.save_dir, name))
            yield _url, _path

    def scan_download(_stream, override=False):
        """
        Filtering non-exists files

        NOTE: `override` flag is currently unused.
        pass this param if implement force download option in future.
        """
        for _url, _path in parse_file(_stream):
            if override or not os.path.exists(_path):
                yield _url, _path

    def count_iter(iterable):
        """
        count number of elements in an iterator.
        """
        return sum(1 for _ in iterable)

    with open(filename, encoding="utf-8") as stream:
        total = count_iter(scan_download(stream))

        stream.seek(0)

        for num, (url, path) in enumerate(scan_download(stream), start=1):
            report(num, total, ''.join([url, path]))
            if not options.dry_run:
                urlretrieve(url, path)


def create_parser():
    parser = OptionParser(usage=main.__doc__, add_help_option=False)
    parser.add_option('--target', '-t', action='store', dest="target", default="arm", choices=list(SAVE_DIR.keys()))
    parser.add_option('--site', action='store', dest="site", default="wiki", choices=["wiki", "game"])
    parser.add_option('--save_dir', action='store', dest="save_dir", default=None)
    parser.add_option('--dry-run', '-d', action='store_true', dest="dry_run", )
    parser.add_option('--workers', '-w', action='store', dest="workers", type='int', default=1)
    parser.add_option('--reporter', '-r', action='store', dest="reporter", default='progress',
                      choices=['progress', 'plain'])
    return parser


if __name__ == '__main__':
    main(sys.argv[1:])

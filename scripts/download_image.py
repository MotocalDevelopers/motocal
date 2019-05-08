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
from urllib.request import urlretrieve

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

    Options: [-t arm] [-s wiki] [-d path] [-q] [-w=10] [-r=progress] [-f]
      * --target -t: Data to be downloaded (arm|chara)
      * --site -s: Source to download from (wiki|game)
      * --directory -d: Save directory (./imgs|./charaimgs)
      * --quiet -q: Prints url list without download.
      * --workers -w: Number of threads to download images.
      * --reporter -r: Type of reporter (progress|plain)
      * --force -f: Redownloads all images even if it exists
    """
    parser = _create_parser()
    if len(argv) == 1:  # if only 1 argument, it's the script name
        parser.print_usage()
        return
    (options, args) = parser.parse_args(argv)
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

    if not options.save_dir:
        options.save_dir = os.path.join(script_dir, SAVE_DIR[options.target])
        logging.info("Set default save directory: %s", options.save_dir)

    if not os.path.isdir(options.save_dir):
        logging.info("Save directory is created: %s", options.save_dir)
        makedirs(options.save_dir)

    def scan_file_for_download_list(file):
        """
        Finding and filtering existent files
        """
        url_list = []
        for url in _read_lines(file):
            path = os.path.abspath(
                    os.path.join(options.save_dir, url.split(separator)[-1]))
            if options.overwrite or not os.path.exists(path):
                url_list.append((url, path))
        return url_list

    def download_image(url, path):
        if not options.dry_run:
            urlretrieve(url, path)

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
    from optparse import OptionParser
    parser = OptionParser(usage=main.__doc__, add_help_option=False)
    parser.add_option('--target', '-t', action='store', dest="target",
                      default="arm",
                      choices=list(SAVE_DIR.keys()))
    parser.add_option('--site', '-s', action='store', dest="site",
                      default="wiki",
                      choices=["wiki", "game"])
    parser.add_option('--directory', '-d', action='store', dest="save_dir",
                      default=None)
    parser.add_option('--quiet', '-q', action='store_true', dest="dry_run")
    parser.add_option('--workers', '-w', action='store', dest="workers",
                      type='int',
                      default=10)
    parser.add_option('--reporter', '-r', action='store', dest="reporter",
                      default='progress', choices=['progress', 'plain'])
    parser.add_option('force', '-f', action='store_true', dest="overwrite")
    return parser


if __name__ == '__main__':
    import sys

    main(sys.argv[1:])

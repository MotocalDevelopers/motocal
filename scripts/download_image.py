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
import logging as log
import os.path as op
from concurrent.futures import as_completed
from concurrent.futures.thread import ThreadPoolExecutor
from os import makedirs
from urllib.request import urlretrieve

read_lines = functools.partial(map, str.rstrip)

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


def progress_reporter(count, total, path='', multiline=True):
    bar_len = 45
    filled_len = int(round(bar_len * count / float(total)))

    status = op.basename(path)
    percents = round(100.0 * count / float(total), 1)
    bar = '=' * filled_len + '-' * (bar_len - filled_len)
    if not multiline:
        print(
                '[%s] %s%s ...%20s' %
                (bar,
                 percents,
                 '%',
                 status),
                flush=True,
                end='\r')
    else:
        print('[%s] %s%s ...%20s' % (bar, percents, '%', status), flush=True)


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
      * --overwrite -o: Redownloads all images even if it exists
    """
    parser = create_parser()
    if len(argv) == 1:  # if only 1 argument, it's the script name
        parser.print_usage()
        return
    (options, args) = parser.parse_args(argv)
    script_dir = op.abspath(op.dirname(__file__))
    txt_source = op.join(script_dir, "../txt_source")

    if not op.isdir(txt_source):
        log.error("no directory found: %s", txt_source)
        return

    key = "{}-{}".format(options.target, options.site)
    separator = {"wiki": "=", "game": "/"}[options.site]
    filename = op.join(txt_source, TXT_SOURCE[key])
    report = REPORT_TYPE.get(options.reporter, progress_reporter)

    if not op.isfile(filename):
        log.error("No url list file found: %s", filename)
        return

    if not options.save_dir:
        options.save_dir = op.join(script_dir, SAVE_DIR[options.target])
        log.info("Set default save directory: %s", options.save_dir)

    if not op.isdir(options.save_dir):
        log.info("Save directory is created: %s", options.save_dir)
        makedirs(options.save_dir)

    def scan_file_for_download_list(file):
        """
        Finding and filtering existent files
        """
        url_list = []
        for url in read_lines(file):
            path = op.abspath(
                    op.join(options.save_dir, url.split(separator)[-1]))
            if options.overwrite or not op.exists(path):
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
                future_to_image = {
                        executor.submit(
                                download_image,
                                url,
                                path): (
                                url,
                                path) for (
                                url,
                                path) in items}
                for num, future in enumerate(
                        as_completed(future_to_image), start=1):
                    url, path = future_to_image[future]
                    if options.reporter == "progress":
                        report_address = path
                    else:
                        report_address = url
                    report(
                            num, total, report_address)


def create_parser():
    from optparse import OptionParser
    parser = OptionParser(usage=main.__doc__, add_help_option=False)
    parser.add_option(
            '--target',
            '-t',
            action='store',
            dest="target",
            default="arm",
            choices=list(
                    SAVE_DIR.keys()))
    parser.add_option(
            '--site',
            action='store',
            dest="site",
            default="wiki",
            choices=[
                    "wiki",
                    "game"])
    parser.add_option(
            '--save_dir',
            action='store',
            dest="save_dir",
            default=None)
    parser.add_option('--dry-run', '-d', action='store_true', dest="dry_run")
    parser.add_option(
            '--workers',
            '-w',
            action='store',
            dest="workers",
            type='int',
            default=1)
    parser.add_option(
            '--reporter',
            '-r',
            action='store',
            dest="reporter",
            default='progress',
            choices=[
                    'progress',
                    'plain'])
    parser.add_option(
            '--overwrite',
            '-o',
            action='store_true',
            dest="overwrite")
    return parser


if __name__ == '__main__':
    import sys

    main(sys.argv[1:])

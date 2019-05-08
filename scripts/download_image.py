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
from concurrent.futures import as_completed
from concurrent.futures.thread import ThreadPoolExecutor
from functools import partial
from logging import error, info
from optparse import OptionParser
from os import makedirs
from os.path import basename, abspath, dirname, join, isdir, isfile, exists
from sys import argv
from urllib.request import urlretrieve

_readlines = partial(map, str.rstrip)

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

    status = basename(path)
    percents = round(100.0 * count / float(total), 1)
    bar = '=' * filled_len + '-' * (bar_len - filled_len)
    if not multiline:
        print('[%s] %s%s ...%20s' % (bar, percents, '%', status), flush=True, end='\r')
    else:
        print('[%s] %s%s ...%20s' % (bar, percents, '%', status), flush=True)


def plain_reporter(count, total, url=''):
    """report plain text"""
    print('[{:4}/{:4}] Download {}'.format(count, total, url))


REPORT_TYPE = {
    'progress': progress_reporter,
    'plain': plain_reporter,
}


def main(argvs):
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
    if len(argvs) == 1:  # if only 1 argument, it's the script name
        parser.print_usage()
        return
    (options, args) = parser.parse_args(argvs)
    script_dir = abspath(dirname(__file__))
    txt_source = join(script_dir, "../txt_source")

    if not isdir(txt_source):
        error("no directory found: %s", txt_source)
        return

    key = "{}-{}".format(options.target, options.site)
    separator = {"wiki": "=", "game": "/"}[options.site]
    filename = join(txt_source, TXT_SOURCE[key])
    report = REPORT_TYPE.get(options.reporter, progress_reporter)

    if not isfile(filename):
        error("No url list file found: %s", filename)
        return

    if not options.save_dir:
        options.save_dir = join(script_dir, SAVE_DIR[options.target])
        info("Set default save directory: %s", options.save_dir)

    if not isdir(options.save_dir):
        info("Save directory is created: %s", options.save_dir)
        makedirs(options.save_dir)

    def parse_file(_stream, _separator=separator):
        """
        Parse file line and return pair of (_url, a local save _path)
        """
        for _url in _readlines(_stream):
            name = _url.split(_separator)[-1]
            _path = abspath(join(options.save_dir, name))
            yield _url, _path

    def scan_download(_stream):
        """
        Filtering non-exists files

        NOTE: `override` flag is currently unused.
        pass this param if implement force download option in future.
        """
        for _url, _path in parse_file(_stream):
            if options.overwrite or not exists(_path):
                yield _url, _path

    def download_image(durl, dpath):
        if not options.dry_run:
            urlretrieve(durl, dpath)

    with open(filename, encoding="utf-8", mode='r') as stream:
        # CPU wise copying to list is cheaper as we need to load all items into memory in order to count them anyways
        items = list(scan_download(stream))
        total = len(items)
        if total > 0:
            with ThreadPoolExecutor(max_workers=options.workers) as executor:
                future_to_image = {executor.submit(download_image, url, path): (url, path) for (url, path) in items}
                for num, future in enumerate(as_completed(future_to_image), start=1):
                    url, path = future_to_image[future]
                    report(num, total, path if options.reporter == 'progress' else url)


def create_parser():
    parser = OptionParser(usage=main.__doc__, add_help_option=False)
    parser.add_option('--target', '-t', action='store', dest="target", default="arm", choices=list(SAVE_DIR.keys()))
    parser.add_option('--site', action='store', dest="site", default="wiki", choices=["wiki", "game"])
    parser.add_option('--save_dir', action='store', dest="save_dir", default=None)
    parser.add_option('--dry-run', '-d', action='store_true', dest="dry_run")
    parser.add_option('--workers', '-w', action='store', dest="workers", type='int', default=1)
    parser.add_option('--reporter', '-r', action='store', dest="reporter", default='progress',
                      choices=['progress', 'plain'])
    parser.add_option('--overwrite', '-o', action='store_true', dest="overwrite")
    return parser


if __name__ == '__main__':
    main(argv[1:])

#!/usr/bin/env python3
"""
Motocal Image download script.

Usage: python download_image.py arm
       python download_image.py chara

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


def progress(count, total, status=''):
    bar_len = 60
    filled_len = int(round(bar_len * count / float(total)))

    percents = round(100.0 * count / float(total), 1)
    bar = '=' * filled_len + '-' * (bar_len - filled_len)

    sys.stdout.write('[%s] %s%s ...%s\r' % (bar, percents, '%', status))
    sys.stdout.flush()


def main(target='arm', site='wiki', save_dir=None, dry_run=False):
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

    num_lines = -1
    with open(filename, encoding="utf-8") as f:
        for line in f:
            num_lines += 1

    with open(filename, encoding="utf-8") as stream:
        for line, url in enumerate(_readlines(stream)):
            file = url.split(separator)[-1]
            progress(line, num_lines, status=os.path.abspath(os.path.join(save_dir, file)))
            save_file = os.path.join(save_dir, file)
            if not os.path.exists(save_file):
                if not dry_run:
                    urlretrieve(url, save_file)


if __name__ == '__main__':
    main(*sys.argv[1:])

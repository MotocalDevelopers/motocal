#!/usr/bin/env python3
"""
Motocal Image download script.

Usage: python3 -m scripts.download_image.py arm
       python3 -m scripts.download_image.py chara

Assume directory layous
  * /
    * ./imgs
    * ./charaImages
    * ./txt_source/ URL list files
    * ./scripts/download_image.py This script

"""

import os
import sys
import logging
import functools
from urllib.request import urlretrieve

_readlines = functools.partial(map, str.rstrip)


TXT_SOURCE = {
    'arm-wiki': "armImageWikiURLList.txt",
    'chara-wiki': "charaImageWikiURLList.txt",
    # 'arm-game': "armImageGameURLList.txt",
    # 'chara-game': "charaImageGameURLList.txt",
}

SAVE_DIR = {
    'arm': '../imgs',
    'chara': '../charaImgs',
}

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

    with open(filename, encoding="utf-8") as stream:
        for url in _readlines(stream):
            save_file = os.path.join(save_dir, url.split(separator)[-1])
            if not os.path.exists(save_file):
                if not dry_run:
                    urlretrieve(url, save_file)
                print(url)


if __name__ == '__main__':
    main(*sys.argv[1:])
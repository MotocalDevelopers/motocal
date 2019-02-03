#!/usr/bin/env python3

"""
Report character names sorted by 'sex' field.

  Usage (debug): python3 check_sex.py
  Usage: python3 -O check_sex.py

  @date 2019/01/14
  @author kei-gbf
"""

import json
import logging
import os
import sys
from functools import partial
from itertools import count
from operator import itemgetter
from urllib.request import urlretrieve

CHARACTER_TABLE_URL = 'http://gbf-wiki.com/index.php?cmd=edit&page=%A5%C6%A1%BC%A5%D6%A5%EB%2F%C1%B4%A5%AD%A5%E3%A5%E9%A5%AF%A5%BF%A1%BC%B0%EC%CD%F7'

SEX = {
    '♂': 'male',
    '♀': 'female',
    '？': 'other',
}


def _open_cache_or_url(path='./chara_table.cache.html', url=CHARACTER_TABLE_URL, charset='euc_jp'):
    """
    During debug time, not send request to wiki many times.
    non-debug time, cleanup the cache file.

    """
    if not os.path.isfile(path):
        logging.info("FETCH URL: {}".format(path))
        urlretrieve(url, path)

    if not __debug__:
        import atexit
        atexit.register(partial(os.unlink, path))

    return open(path, encoding=charset, errors='ignore')


def strip_name(name):
    """
    Strip name, different versions does not change 'sex'
    """
    if name.startswith('[[') and name.endswith(']]'):
        name = name[2:-2]
    name = name.replace('[最終]', '')
    name = name.replace(' (SSR)', '').replace(' (SR)', '').replace(' (R)', '')
    name = name.strip()
    idx = name.find(')')
    if idx > 0:
        name = name[:idx + 1]
    idx = name.find('&gt;')
    if idx > 0:
        name = name[:idx]
    return name.strip()


def parse_characters_data():
    """
    Generate (name, sex) pairs from all characters table.
    """
    with _open_cache_or_url() as stream:
        # Skip to Search the first '#sortable' line
        for line in stream:
            if line.startswith('#sortable'):
                break

        readline = partial(next, map(str.rstrip, stream))

        # Skip next 2 lines
        readline()  # |No.| ...
        readline()  # |CENTER:30| ...

        # Parse row lines until empty
        for line in iter(readline, ''):
            row = line.split('|')
            name = strip_name(row[3])
            sex = SEX[row[7]]
            yield name, sex


def validate_characters(chatacters, table, hide_passed=True):
    counter = partial(next, count(1))
    report = lambda status, label, sex, key: print(
        "{} {:-4} {:12} {} {}".format(status, counter(), label, sex[0].upper(), key))
    name_to_key = lambda name: name.replace('[最終]', '').replace('(SSR)', '').replace('(SR)', '').replace('(R)',
                                                                                                         '').strip()

    for name, sex in map(itemgetter("name", "sex"), chatacters):
        key = name_to_key(name)
        if not key in table:
            report("NG", "NO KEY FOUND", sex, key)
        elif table[key] != sex:
            report("NG", "SEX MISMATCH", sex, key)
        elif not hide_passed:
            report("OK", "PASSED", sex, key)


def main(path="../charaData.json", output_report=False):
    if not os.path.isfile(path):
        path = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), path))
    characters = json.load(open(path, encoding="utf-8")).values()

    if output_report:
        def report(label, xs, func):
            print(label)
            for x in filter(func, xs):
                print(" - ", x["name"])

        report("# male", characters, lambda x: x['sex'] == 'male')
        report("# female", characters, lambda x: x['sex'] == 'female')
        report("# other", characters, lambda x: x['sex'] == 'other')

    if __debug__:
        table = dict(parse_characters_data())
        validate_characters(characters, table)
        print("\nTotal number of table rows: {} (wiki)".format(len(table)))
        print("\nTotal number of characters: {} (charaData.json)".format(len(characters)))


if __name__ == '__main__':
    main(*sys.argv[1:])

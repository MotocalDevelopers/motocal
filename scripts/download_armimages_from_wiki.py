import os, inspect
import urllib.request

filename = inspect.getframeinfo(inspect.currentframe()).filename
path = os.path.dirname(os.path.abspath(filename))

f = open(os.path.join(path, "../txt_source/armImageURLList.txt"), "r", encoding="utf-8")
urllist = f.read().splitlines()

directory = os.path.join(path, "../imgs")

if not os.path.exists(directory):
    os.makedirs(directory)

for url in urllist:
    # Wiki
    # local_file = os.path.join(directory, url.split("=")[-1])
    # Game
    local_file = os.path.join(directory, url.split("/")[-1])
    if not os.path.exists(local_file):
        urllib.request.urlretrieve(url, local_file)

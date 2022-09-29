import urllib.request
from bs4 import BeautifulSoup
import re
import os
import inspect

filename = inspect.getframeinfo(inspect.currentframe()).filename
path = os.path.dirname(os.path.abspath(filename))


def download_wiki_source(url):
    with urllib.request.urlopen(url) as html_txt:
        html = BeautifulSoup(html_txt.read().decode("euc_jp", "ignore"), "html.parser")
        return html.select_one("textarea[name='msg']").text


# ソースの中から表組みを取得
def extract_table(wikiSource):
    table_patten = re.compile(r"(\|&attachref.+?\|\n)+", re.DOTALL)
    table_patten.search(wikiSource)
    return table_patten.search(wikiSource).group(0)
    
    
def count_line(text):
    br_patten = re.compile(r"\n|^")
    return len(re.findall(br_patten, text))

# 取得エラーやページ荒らし等に備えるために下限行数を設定する
def output_txt(file_name, content, lower_limit):
    if count_line(content) < lower_limit: raise Exception("Lines of wiki is below the setting value.")
    with open(os.path.join(path, rf"..\txt_source\{file_name}"), "w", encoding="utf-8") as file:
        file.write(content)


def main():
    # wikiの編集画面をセット
    charaSSR_wikiSource = download_wiki_source("https://gbf-wiki.com/index.php?cmd=edit&page=%BF%CD%CA%AASSR")
    charaSR_wikiSource = download_wiki_source("https://gbf-wiki.com/index.php?cmd=edit&page=%BF%CD%CA%AASR")
    #armSSR_WikiSource = download_wiki_source("https://gbf-wiki.com/index.php?cmd=edit&page=%C9%F0%B4%EFSSR")
    
    output_txt("charaData-ssr.txt", extract_table(charaSSR_wikiSource), 400)
    output_txt("charaData-sr.txt", extract_table(charaSR_wikiSource), 250)

if __name__ == "__main__":
    main()
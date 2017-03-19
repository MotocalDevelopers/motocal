# motocal
元カレ計算機（グラブル攻撃力計算機）の開発用リポジトリです。

- src: トランスパイル前のソースコード
- dist: トランスパイル後のソースコード

src/content.jsを弄って、build/content.jsを生成、リリース時にproductionブランチにmerge.

現在のトランスパイルコマンド

``npm run build``

DB通信用の*phpファイルは管理していません。

# 開発準備
```sh
$ git clone https://github.com/hoshimi/motocal.git motocal
$ cd motocal
$ npm install
$ npm run build
$ open index.html
```

`npm run watch-dev` を実行していると、自動でトランスパイルされます。

# 作業用スクリプト
- arm\_data\_converter.py: txt_source/armData-ssr.txtとtxt_source/armData-sr.txtからarmData.jsonを生成します.
- chara\_data\_converter.py: txt_source/charaData.txtからcharaData.jsonを生成します.
- download\_armimages\_from\_wiki.sh: imgs/imageURLlist.txt内に記載されている画像データをwikiから持ってきます.
- download\_charaimages\_from\_wiki.sh: charaimgs/imageURLlist.txt内に記載されている画像データをwikiから持ってきます.

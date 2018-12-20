# motocal / 元カレ計算機
This is a repository for the development of former curry calculator (gbf attack power calculator).\
元カレ計算機（グラブル攻撃力計算機）の開発用リポジトリです。

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://www.heroku.com/deploy/?template=https://github.com/MotocalDevelopers/motocal)

## Preparation for development / 開発準備

### Local Development / ローカル開発
```sh
$ git clone https://github.com/MotocalDevelopers/motocal.git motocal
$ cd motocal
$ npm install
$ npm run build
$ open index.html
```
or
```sh
$ git clone https://github.com/MotocalDevelopers/motocal.git motocal
$ cd motocal
$ npm install
$ npm run build
$ npm run start
$ open localhost:8000
```
### Docker version / docker版
```sh
$ git clone https://github.com/MotocalDevelopers/motocal.git motocal
$ cd motocal
$ docker-compose up
```

## Build command / ビルドコマンド
### Commands for development environment / 開発環境用コマンド
```sh
$ npm run start
```

### Debug Build / Debugビルド
```sh
$ npm run build
```
### Debug Watch
```sh
$ npm run watch-dev
```
### Build for release / リリース用ビルド
```sh
$ npm run production-build
```
### Release Watch / リリース用 Watch
```sh
$ npm run production-watch-dev
```

## Structure / 構成
- src: Source code before trans-piling / トランスパイル前のソースコード
- dist: Source code after trans-piling / トランスパイル後のソースコード
- scripts: Script for generating data / データ生成用のスクリプト
- txt_sources: Text data for template processing / テンプレート処理前のテキストデータ
- imgs, charaimgs: Image data for templates display / テンプレート表示用の画像データ

## Workflow / 作業フロー
### Function development / 機能開発時
1. Fiddling inside src/src内をいじる
2. Generate dist / main.js etc. with npm run build / npm run build で dist/main.js等を生成
    - For release builds, run ''npm run production-build'' / リリースビルドの場合はnpm run production-build
    - Or monitor with ''npm run watch-dev'' / もしくは npm run watch-dev で監視する
3. Merge the production branch on release and then run ''npm run production-build'' / リリース時にproductionブランチにmergeしてからnpm run production-build

### Updating weapon templates / 武器テンプレート更新時
1. For the weapon you want to add, copy the corresponding line of the wiki and paste it on the top of txt_source/armData-ssr.txt / 追加したい武器について、wikiの該当行をコピーし、txt_source/armData-ssr.txt の一番上に貼り付け
2. Run arm_data_converter.py / arm_data_converter.py を実行
    - When dealing with new skills, please add the corresponding new skill name to arm_data_converter.py => Add the new skill to the calculator. / 新スキル対応する場合には arm_data_converter.py に新スキル名 => 新スキルの計算機内部IDの対応を書き加えて下さい。

※ For new upper limit breaking weapon it is necessary, to add a status at the end for 4 stars and 5 stars, the data added at the end is ○ (4 stars) or ◎ (5 stars) and Lv 100, Lv 150 stats. Please add it appropriately with reference to the examples. / 上限解放武器については3凸時、4凸時のステータスが必要になるため、コピーしてきたデータの末尾に○(4凸の場合)または◎(5凸の場合)と、Lv100時、Lv150時のステータスを追加するようにしています。実例を参考に適切に追加して下さい。

### Updating character templates / キャラテンプレート更新時
1. For the character you want to add, copy the corresponding line of the wiki and paste it on the top of txt_source/charaData.txt / 追加したいキャラについて、wikiの該当行をコピーし、txt_source/charaData.txt の一番上に貼り付け
2. Run chara_data_converter.py / chara_data_converter.py を実行

※ For new upper limit breaking of a character, it is OK just to update the stats (All characters stats are for their highest uncap, only exception are eternal character that have a version for 4 and 5 star) / キャラの上限解放についてはステータスをそのまま更新するだけでOKです。

## Note / 注記
- Php file for DB communication is not managed. / DB通信用の*phpファイルは管理していません。
- The repository does not manage image files for templates. It is necessary to DL using the following scripts. / テンプレート用の画像ファイルも管理していません。下記の作業用スクリプトを用いてDLする必要があります。

## About scripts / 作業用スクリプトについて
This is section for scripts that generates json data for templates and pulls weapon/character image data from gbfwiki. /テンプレート用のjsonデータ生成や、gbfwikiから武器/キャラの画像データを引っ張ってくるスクリプト群です。

※ Downloading images from the game is possible, but that may be considered as a bannable offense, if you use that script, you use it on your own personal responsibility.

For python scripts / pythonスクリプトなら、
```sh
$ python3 ./scripts/arm_data_converter.py
```

Please execute in the order of. / という形で実行してください。

#### arm\_data\_converter.py
- Generate armData.json from txt_source/armData-ssr.txt and txt_source/armData-sr.txt. / txt_source/armData-ssr.txtとtxt_source/armData-sr.txtからarmData.jsonを生成します.

#### chara\_data\_converter.py
- Generate charaData.json from txt_source/charaData.txt. / txt_source/charaData.txtからcharaData.jsonを生成します.

#### download\_armimages\_from\_wiki.py
- Downloads the image data from urls described in txt_source/armImageWikiURLList.txt from the wiki. / txt_source/armImageURLList.txt内に記載されている画像データをwikiから持ってきます.
#### download\_charaimages\_from\_wiki.py
- Downloads the image data described in txt_source/charaImageWikiURLList.txt from the wiki. / txt_source/charaImageURLList.txt内に記載されている画像データをwikiから持ってきます.
- These two scripts download only images that are not already downloaded. / これら2つの画像ダウンロードスクリプトは、あくまで「最新のもの」だけをダウンロードする内容になっております。

## LICENSE
MIT

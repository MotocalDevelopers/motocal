# motocal / 元カレ計算機
元カレ計算機（グラブル攻撃力計算機）の開発用リポジトリです。

## 開発準備

### ローカル開発
```sh
$ git clone https://github.com/hoshimi/motocal.git motocal
$ cd motocal
$ npm install
$ npm run build
$ open index.html
```
### docker版
```sh
$ git clone https://github.com/hoshimi/motocal.git motocal
$ cd motoca
$ docker-compose up
```

## ビルドコマンド
### 開発環境用コマンド
```sh
$ npm run start
```

### Debugビルド
```sh
$ npm run build
```
### Debug Watch
```sh
$ npm run watch-dev
```
### リリース用ビルド
```sh
$ npm run production-build
```
### リリース用 Watch
```sh
$ npm run production-watch-dev
```

## 構成
- src: トランスパイル前のソースコード
- dist: トランスパイル後のソースコード
- scripts: データ生成用のスクリプト
- txt_sources: テンプレート処理前のテキストデータ
- imgs, charaimgs: テンプレート表示用の画像データ

## 作業フロー
### 機能開発時
1. src内をいじる
2. npm run build で dist/main.js等を生成
    - リリースビルドの場合はnpm run production-build
    - もしくは npm run watch-dev で監視する
3. リリース時にproductionブランチにmergeしてからnpm run production-build

### 武器テンプレート更新時
1. 追加したい武器について、wikiの該当行をコピーし、txt_source/armData-ssr.txt の一番上に貼り付け
2. arm_data_converter.py を実行
    - 新スキル対応する場合には arm_data_converter.py に新スキル名 => 新スキルの計算機内部IDの対応を書き加えて下さい。

※ 上限解放武器については3凸時、4凸時のステータスが必要になるため、コピーしてきたデータの末尾に○(4凸の場合)または◎(5凸の場合)と、Lv100時、Lv150時のステータスを追加するようにしています。実例を参考に適切に追加して下さい。

### キャラテンプレート更新時
1. 追加したいキャラについて、wikiの該当行をコピーし、txt_source/charaData.txt の一番上に貼り付け
2. chara_data_converter.py を実行

※ キャラの上限解放についてはステータスをそのまま更新するだけでOKです。

## 注記
- DB通信用の*phpファイルは管理していません。
- テンプレート用の画像ファイルも管理していません。下記の作業用スクリプトを用いてDLする必要があります。

## 作業用スクリプトについて
テンプレート用のjsonデータ生成や、gbfwikiから武器/キャラの画像データを引っ張ってくるスクリプト群です。

pythonスクリプトなら、
```sh
$ python3 ./scripts/arm_data_converter.py
```

shellスクリプトなら
```sh
$ ./scripts/download_armimages_from_wiki.sh
```

という形で実行してください。

#### arm\_data\_converter.py
- txt_source/armData-ssr.txtとtxt_source/armData-sr.txtからarmData.jsonを生成します.

#### chara\_data\_converter.py
- txt_source/charaData.txtからcharaData.jsonを生成します.

#### download\_armimages\_from\_wiki.sh
- imgs/imageURLlist.txt内に記載されている画像データをwikiから持ってきます.
#### download\_charaimages\_from\_wiki.sh
- charaimgs/imageURLlist.txt内に記載されている画像データをwikiから持ってきます.
- これら2つの画像ダウンロードスクリプトは、あくまで「最新のもの」だけをダウンロードする内容になっております。古いものも全て落としてくるスクリプトは現在存在しません。

※ scriptsディレクトリ内ではなく、motocalのROOTディレクトリで実行してください。

## LICENSE
MIT

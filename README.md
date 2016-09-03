# motocal
元カレ計算機（グラブル攻撃力計算機）の開発用リポジトリです。

- src: トランスパイル前のソースコード
- build: トランスパイル後のソースコード

src/content.jsを弄って、build/content.jsを生成、リリース時にproductionブランチにmerge.

現在のトランスパイルコマンド

``browserify -t reactify src/content.js -o build/content.js``

DB通信用の*phpファイルは管理していません。

# 開発準備
```sh
$ npm install
$ npm run build
$ open index.html
```

`npm run watch-dev` を実行していると、自動で *build/content.js* が生成されます。

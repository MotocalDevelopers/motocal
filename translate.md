# motocal Translate Guide / 元カレ計算機 翻訳ガイド

たとえばスペイン語(es)対応を追加したい場合：
For example if you want to add Spanish(es) support:

1. Change into src directory.
```sh
$ cd src
```

2. Modify content.js, add support to changeLang function:
```js
  changeLang: function(key, e) {
      // if(key != "ja" && key != "en" ) key = "ja";
      if(key != "ja" && key != "en"  && key != "es") key = "ja";
      this.setState({locale: key});
  },
```

3. Add switch button
```js
<Button onClick={this.changeLang.bind(this, "en")}>English</Button>
<Button onClick={this.changeLang.bind(this, "es")}>Esponol</Button>
...
<Button bsSize="small" onClick={this.changeLang.bind(this, "en")}>English</Button>
<Button bsSize="small" onClick={this.changeLang.bind(this, "es")}>Esponol</Button>
```

4. Add selector option in global_const.js
```js
// module.exports.selector = { "ja": {}, "en": {} }
module.exports.selector = { "ja": {}, "en": {}, "es":{} }
```
and add support for the specific language in all selector objects, for example:
```js
module.exports.selector.en.elements = Object.keys(elementTypes).map(function (opt) { return <option value={opt} key={opt}>{intl.translate(elementTypes[opt], "en")}</option>; });
module.exports.selector.es.elements = Object.keys(elementTypes).map(function (opt) { return <option value={opt} key={opt}>{intl.translate(elementTypes[opt], "es")}</option>; });
```

5. In profile.js, add support in CreateClass():
```js
// var zenithBonuses = { "ja": {}, "en": {} }
var zenithBonuses = { "ja": {}, "en": {}, "es": {}}

// var alljobs = { "ja": {}, "en": {} }
var alljobs = { "ja": {}, "en": {}, "es": {}}
```

6. Finally, fill in translation data in multiLangData translate.js, and modify the last two functions in this file:
```js
if (lang == "es" ) lang = "es";
...
if (locale != "ja" && locale != "en" && locale != "es") return multiLangData[key]["ja"];
```

It should work now!

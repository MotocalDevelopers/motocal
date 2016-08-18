var React = require('react');
var ReactDOM = require('react-dom');
var {Button, ButtonGroup, FormControl, Checkbox} = require('react-bootstrap');

// global arrays
var zenith = {"無し": 0, "★1": 0.01, "★2": 0.03, "★3": 0.05, "★4": 0.06, "★5": 0.08, "★6": 0.10}
var zenithAttackBonus = [3000, 1500, 500];
var zenithHPBonus = [1000, 600, 300];
var skilllevels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
var considerNum = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var armNums = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
var summonNums = [1, 2, 3, 4, 5, 6, 7, 8];
var keyTypes = {"総合攻撃力": "totalAttack", "HP": "totalHP", "戦力": "ATKandHP", "パーティ平均攻撃力": "averageAttack", "技巧期待値": "criticalAttack", "技巧期待平均攻撃力": "averageCriticalAttack", "総合攻撃*期待回数*技巧期待値": "totalExpected", "総回技のパーティ平均値": "averageTotalExpected"}

// skill data
var skilltypes = {
    "non": {name: "無し", type:"non", amount: "non"},
    "normalS": {name:"通常攻刃(小)", type:"normal", amount: "S"},
    "normalM": {name:"通常攻刃(中)", type:"normal", amount: "M"},
    "normalL": {name:"通常攻刃(大)", type:"normal", amount: "L"},
    "normalLL": {name:"通常攻刃II", type:"normal", amount: "LL"},
    "normalBoukunL": {name:"通常暴君", type:"normalBoukun", amount: "LL"},
    "normalHaisuiS": {name:"通常背水(小)", type:"normalHaisui", amount: "S"},
    "normalHaisuiM": {name:"通常背水(中)", type:"normalHaisui", amount: "M"},
    "normalHaisuiL": {name:"通常背水(大)", type:"normalHaisui", amount: "L"},
    "normalKonshinL": {name:"通常渾身(大)", type:"normalKonshin", amount: "L"},
    "normalNiteS": {name:"通常二手(小)", type:"normalNite", amount: "S"},
    "normalNiteM": {name:"通常二手(中)", type:"normalNite", amount: "M"},
    "normalNiteL": {name:"通常二手(大)", type:"normalNite", amount: "L"},
    "normalSanteL": {name:"通常三手(大)", type:"normalSante", amount: "L"},
    "normalKatsumiM": {name:"通常克己(中)", type:"normalKatsumi", amount: "M"},
    "normalKamui": {name:"通常神威", type:"normalKamui", amount: "S"},
    "magnaM": {name: "マグナ攻刃", type:"magna", amount:"M"},
    "magnaL": {name: "マグナ攻刃II", type:"magna", amount:"L"},
    "magnaHaisuiS": {name:"マグナ背水(小)", type:"magnaHaisui", amount: "S"},
    "magnaHaisuiM": {name:"マグナ背水(中)", type:"magnaHaisui", amount: "M"},
    "magnaHaisuiL": {name:"マグナ背水(大)", type:"magnaHaisui", amount: "L"},
    "magnaSanteL": {name:"マグナ三手(大)", type:"magnaSante", amount: "L"},
    "magnaKatsumiM": {name:"マグナ克己(中)", type:"magnaKatsumi", amount: "M"},
    "magnaKamui": {name:"マグナ神威", type:"magnaKamui", amount: "S"},
    "magnaBoukun": {name:"マグナ暴君", type:"magnaBoukun", amount: "L"},
    "unknownM": {name:"アンノウンI", type:"unknown", amount: "M"},
    "unknownL": {name:"アンノウンII", type:"unknown", amount: "L"},
    "strengthHaisuiM": {name:"ストレングス背水(中)", type:"unknownOtherHaisui", amount: "M"},
    "strengthS": {name:"ストレングス等(小)", type:"unknownOther", amount: "S"},
    "strengthM": {name:"ストレングス等(中)", type:"unknownOther", amount: "M"},
    "strengthL": {name:"ストレングス等(大)", type:"unknownOther", amount: "L"},
    "normalHPS": {name:"通常守護(小)", type:"normalHP", amount: "S"},
    "normalHPM": {name:"通常守護(中)", type:"normalHP", amount: "M"},
    "normalHPL": {name:"通常守護(大)", type:"normalHP", amount: "L"},
    "magnaHPS": {name:"マグナ守護(小)", type:"magnaHP", amount: "S"},
    "magnaHPM": {name:"マグナ守護(中)", type:"magnaHP", amount: "M"},
    "magnaHPL": {name:"マグナ守護(大)", type:"magnaHP", amount: "L"},
    "magnaHPLL": {name:"マグナ守護II", type:"magnaHP", amount: "LL"},
    "unknownHPS": {name:"アンノウンVIT(小)", type:"unknownHP", amount: "S"},
    "unknownHPM": {name:"アンノウンVIT(中)", type:"unknownHP", amount: "M"},
    "unknownHPL": {name:"アンノウンVIT(大)", type:"unknownHP", amount: "L"},
    "unknownOtherBoukunL": {name:"ミフネ流・極意", type:"unknownOtherBoukun", amount: "L"},
    "unknownOtherNiteS": {name:"ミフネ流・双星", type:"unknownOtherNite", amount: "S"},
    "gurenJuin": {name:"紅蓮の呪印・弐", type:"gurenJuin", amount: "L"},
    "normalCriticalS": {name:"通常技巧(小)", type:"normalCritical", amount: "S"},
    "normalCriticalM": {name:"通常技巧(中)", type:"normalCritical", amount: "M"},
    "normalCriticalL": {name:"通常技巧(大)", type:"normalCritical", amount: "L"},
    "magnaCriticalS": {name:"マグナ技巧(小)", type:"magnaCritical", amount: "S"},
    "magnaCriticalM": {name:"マグナ技巧(中)", type:"magnaCritical", amount: "M"},
    "magnaCriticalL": {name:"マグナ技巧(大)", type:"magnaCritical", amount: "L"},
    "normalSetsuna": {name:"通常刹那", type:"normalSetsuna", amount: "M"},
    "magnaSetsuna": {name:"マグナ刹那", type:"magnaSetsuna", amount: "M"},
    "cosmosAT": {name:"コスモスAT", type:"cosmos", amount: "L"},
    "cosmosDF": {name:"コスモスDF", type:"cosmos", amount: "L"},
    "cosmosBL": {name:"コスモスBL", type:"cosmos", amount: "L"},
    "bahaAT-dagger": {name:"バハ攻-短剣", type:"bahaAT", amount: "L"},
    "bahaAT-axe": {name:"バハ攻-斧", type:"bahaAT", amount: "L"},
    "bahaAT-spear": {name:"バハ攻-槍", type:"bahaAT", amount: "L"},
    "bahaAT-gun": {name:"バハ攻-銃", type:"bahaAT", amount: "L"},
    "bahaATHP-sword": {name:"バハ攻HP-剣", type:"bahaATHP", amount: "M"},
    "bahaATHP-wand": {name:"バハ攻HP-杖", type:"bahaATHP", amount: "M"},
    "bahaHP-fist": {name:"バハHP-格闘", type:"bahaHP", amount: "L"},
    "bahaHP-katana": {name:"バハHP-刀", type:"bahaHP", amount: "L"},
    "bahaHP-bow": {name:"バハHP-弓", type:"bahaHP", amount: "L"},
    "bahaHP-music": {name:"バハHP-楽器", type:"bahaHP", amount: "L"},
    "bahaFUATHP-dagger": {name:"バハフツ-短剣", type:"bahaFUATHP", amount: "LL"},
    "bahaFUATHP-axe": {name:"バハフツ-斧", type:"bahaFUATHP", amount: "LL"},
    "bahaFUATHP-spear": {name:"バハフツ-槍", type:"bahaFUATHP", amount: "LL"},
    "bahaFUATHP-gun": {name:"バハフツ-銃", type:"bahaFUATHP", amount: "LL"},
    "bahaFUATHP-sword": {name:"バハフツ-剣", type:"bahaFUATHP", amount: "LL"},
    "bahaFUATHP-wand": {name:"バハフツ-杖", type:"bahaFUATHP", amount: "LL"},
    "bahaFUHP-fist": {name:"バハフツHP-格闘", type:"bahaFUHP", amount: "L"},
    "bahaFUHP-katana": {name:"バハフツHP-刀", type:"bahaFUHP", amount: "L"},
    "bahaFUHP-bow": {name:"バハフツHP-弓", type:"bahaFUHP", amount: "L"},
    "bahaFUHP-music": {name:"バハフツHP-楽器", type:"bahaFUHP", amount: "L"},
};

var armTypes = {
  "dagger": "短剣",
  "sword": "剣",
  "spear": "槍",
  "axe": "斧",
  "wand": "杖",
  "gun": "銃",
  "fist": "格闘",
  "bow": "弓",
  "music": "楽器",
  "katana": "刀",
  "none": "無し",
};

var summonTypes = {
    "magna": "マグナ",
    "element": "属性",
    "zeus": "ゼウス系",
    "chara": "キャラ",
    "ranko": "蘭子",
    "odin": "属性攻+キャラ攻",
}

var raceTypes = {
    "human": "人間",
    "erune": "エルーン",
    "doraf": "ドラフ",
    "havin": "ハーヴィン",
    "unknown": "種族不明",
}

var jobTypes = {
    "attack": "攻撃",
    "heal": "回復",
    "defense": "防御",
    "pecu": "特殊",
    "balance": "バランス",
}

var elementTypes = {
    "fire": "火",
    "wind": "風",
    "earth": "土",
    "water": "水",
    "light": "光",
    "dark": "闇",
}

// "key"属性が強い属性と弱い属性
var elementRelation = {
    "fire": {"weak": "water", "strong": "wind"},
    "wind": {"weak": "fire", "strong": "earth"},
    "earth": {"weak": "wind", "strong": "water"},
    "water": {"weak": "earth", "strong": "fire"},
    "light": {"weak": "none", "strong": "dark"},
    "dark": {"weak": "none", "strong": "light"},
}

var bahamutRelation = {
    "dagger": {"type1": "human"},
    "axe": {"type1": "doraf"},
    "spear": {"type1": "erune"},
    "gun": {"type1": "havin"},
    "sword": {"type1": "human", "type2": "doraf"},
    "wand": {"type1": "erune", "type2": "havin"},
    "fist": {"type1": "human"},
    "katana": {"type1": "doraf"},
    "bow": {"type1": "erune"},
    "music": {"type1": "havin"},
}

var bahamutFURelation = {
    "dagger": {"type1": "human", "type2": "erune"},
    "axe": {"type1": "doraf", "type2": "havin"},
    "spear": {"type1": "erune", "type2": "doraf"},
    "gun": {"type1": "havin", "type2": "human"},
    "sword": {"type1": "human", "type2": "doraf"},
    "wand": {"type1": "erune", "type2": "havin"},
    "fist": {"type1": "human"},
    "katana": {"type1": "doraf"},
    "bow": {"type1": "erune"},
    "music": {"type1": "havin"},
}

var Jobs = {
    "beruse":       {"name": "ベルセルク",       "favArm1": "sword",  "favArm2": "axe",    "type": "attack",  "atBonus": 6000.0, "kouzinBonus": 0.0, "hpBonus": 1000.0, "shugoBonus": 10.0, "DaBonus": 26.5, "TaBonus": 5.5},
    "sage":         {"name": "セージ",           "favArm1": "wand",   "favArm2": "spear",  "type": "heal",    "atBonus": 0.0, "kouzinBonus": 0.0, "hpBonus": 0.0, "shugoBonus": 0.0, "DaBonus": 6.5, "TaBonus": 3.0},
    "suparuta":     {"name": "スパルタ",         "favArm1": "sword",  "favArm2": "spear",  "type": "defense", "atBonus": 0.0, "kouzinBonus": 0.0, "hpBonus": 1500.0, "shugoBonus": 0.0, "DaBonus": 6.5, "TaBonus": 3.0},
    "warlock":      {"name": "ウォーロック",     "favArm1": "wand",   "favArm2": "dagger", "type": "attack",  "atBonus": 2000.0, "kouzinBonus": 0.0, "hpBonus": 0.0, "shugoBonus": 0.0, "DaBonus": 6.5, "TaBonus": 3.0},
    "alche":        {"name": "アルケミスト",     "favArm1": "dagger", "favArm2": "gun",    "type": "heal",    "atBonus": 0.0, "kouzinBonus": 0.0, "hpBonus": 100.0, "shugoBonus": 0.0, "DaBonus": 6.5, "TaBonus": 3.0},
    "ninja":        {"name": "忍者",             "favArm1": "katana", "favArm2": "fist",   "type": "pecu",    "atBonus": 0.0, "kouzinBonus": 0.0, "hpBonus": 0.0, "shugoBonus": 0.0, "DaBonus": 31.5, "TaBonus": 3.0},
    "samurai":      {"name": "侍",               "favArm1": "katana", "favArm2": "bow",    "type": "attack",  "atBonus": 3000.0, "kouzinBonus": 0.0, "hpBonus": 0.0, "shugoBonus": 0.0, "DaBonus": 6.5, "TaBonus": 3.0},
    "kensei":       {"name": "剣聖",             "favArm1": "sword",  "favArm2": "katana", "type": "pecu",    "atBonus": 1500.0, "kouzinBonus": 0.0, "hpBonus": 300.0, "shugoBonus": 0.0, "DaBonus": 6.5, "TaBonus": 3.0},
    "gunsri":       {"name": "ガンスリ",         "favArm1": "gun",    "favArm2": "gun",    "type": "pecu",    "atBonus": 1000.0, "kouzinBonus": 0.0, "hpBonus": 0.0, "shugoBonus": 0.0, "DaBonus": 11.5, "TaBonus": 3.0},
    "kenja":        {"name": "賢者",             "favArm1": "wand",   "favArm2": "wand",   "type": "pecu",    "atBonus": 0.0, "kouzinBonus": 0.0, "hpBonus": 1000.0, "shugoBonus": 0.0, "DaBonus": 6.5, "TaBonus": 3.0},
    "assassin":     {"name": "アサシン",         "favArm1": "dagger", "favArm2": "dagger", "type": "pecu",    "atBonus": 1000.0, "kouzinBonus": 0.0, "hpBonus": 0.0, "shugoBonus": 0.0, "DaBonus": 6.5, "TaBonus": 3.0},
    "weaponmaster": {"name": "ウェポンマスター", "favArm1": "sword",  "favArm2": "axe",    "type": "attack",  "atBonus": 0.0, "kouzinBonus": 0.0, "hpBonus": 0.0, "shugoBonus": 0.0, "DaBonus": 23.0, "TaBonus": 5.0},
    "holyse":       {"name": "ホリセバー",       "favArm1": "sword",  "favArm2": "spear",  "type": "defense", "atBonus": 0.0, "kouzinBonus": 0.0, "hpBonus": 0.0, "shugoBonus": 0.0, "DaBonus": 6.5, "TaBonus": 3.0},
    "bishop":       {"name": "ビショップ",       "favArm1": "wand",   "favArm2": "spear",  "type": "heal",    "atBonus": 0.0, "kouzinBonus": 0.0, "hpBonus": 0.0, "shugoBonus": 0.0, "DaBonus": 6.5, "TaBonus": 3.0},
    "hermit":       {"name": "ハーミット",       "favArm1": "wand",   "favArm2": "dagger", "type": "attack",  "atBonus": 0.0, "kouzinBonus": 0.0, "hpBonus": 0.0, "shugoBonus": 0.0, "DaBonus": 6.5, "TaBonus": 3.0},
    "hokuai":       {"name": "ホークアイ",       "favArm1": "dagger", "favArm2": "gun",    "type": "balance", "atBonus": 0.0, "kouzinBonus": 0.0, "hpBonus": 0.0, "shugoBonus": 0.0, "DaBonus": 6.5, "TaBonus": 3.0},
    "darkfe":       {"name": "ダクフェ",         "favArm1": "sword",  "favArm2": "dagger", "type": "pecu",    "atBonus": 0.0, "kouzinBonus": 0.0, "hpBonus": 0.0, "shugoBonus": 0.0, "DaBonus": 6.5, "TaBonus": 3.0},
    "oga":          {"name": "オーガ",           "favArm1": "fist",   "favArm2": "fist",   "type": "attack",  "atBonus": 2000.0, "kouzinBonus": 5.0, "hpBonus": 200.0, "shugoBonus": 0.0, "DaBonus": 60.0, "TaBonus": 5.0},
    "side":         {"name": "サイドワインダー", "favArm1": "bow",    "favArm2": "gun",    "type": "balance", "atBonus": 1000.0, "kouzinBonus": 0.0, "hpBonus": 0.0, "shugoBonus": 0.0, "DaBonus": 6.5, "TaBonus": 3.0},
    "superstar":    {"name": "スーパースター",   "favArm1": "music",  "favArm2": "dagger", "type": "pecu",    "atBonus": 0.0, "kouzinBonus": 0.0, "hpBonus": 0.0, "shugoBonus": 0.0, "DaBonus": 6.5, "TaBonus": 3.0},
    "valc":         {"name": "ヴァルキュリア",   "favArm1": "spear",  "favArm2": "axe",    "type": "attack",  "atBonus": 500.0, "kouzinBonus": 0.0, "hpBonus": 0.0, "shugoBonus": 0.0, "DaBonus": 11.5, "TaBonus": 8.0},
    "none":         {"name": "なし",             "favArm1": "none",   "favArm2": "none",   "type": "none",    "atBonus": 0.0, "kouzinBonus": 0.0, "hpBonus": 0.0, "shugoBonus": 0.0, "DaBonus": 6.5, "TaBonus": 3.0},
}

var summonElementTypes = {
    "fire": {"name": "火", "type": ["fire"]},
    "wind": {"name": "風", "type": ["wind"]},
    "earth": {"name": "土", "type": ["earth"]},
    "water": {"name": "水", "type": ["water"]},
    "light": {"name": "光", "type": ["light"]},
    "dark": {"name": "闇", "type": ["dark"]},
    "lightFire": {"name": "光/火", "type": ["light", "fire"]},
    "darkEarth": {"name": "闇/土", "type": ["dark", "earth"]},
    "windEarth": {"name": "風/土", "type": ["wind", "earth"]},
    "darkWater": {"name": "闇/水", "type": ["dark", "water"]},
    "earthLight": {"name": "土/光", "type": ["earth", "light"]},
    "windLight": {"name": "風/光", "type": ["wind", "light"]},
    "lightDark": {"name": "光/闇", "type": ["light", "dark"]},
    "darkFire": {"name": "闇/火", "type": ["dark", "fire"]},
    "waterLight": {"name": "水/光", "type": ["water", "light"]},
    "windFire": {"name": "風/火", "type": ["wind", "fire"]},
    "fireWater": {"name": "火/水", "type": ["fire", "water"]},
    "all": {"name": "全属性", "type": ["all"]},
}

var skillAmounts = {
    // normal と unknown の M Slv11 以降については仮入力
    "normal":{
        "S": [1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 10.4, 10.8, 11.2, 11.6, 12.0],
        "M": [3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 12.0, 12.0, 12.0, 12.0, 12.0],
        "L": [6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 15.6, 16.2, 16.8, 17.4, 18.0],
        "LL": [7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 16.0, 16.8, 17.6, 18.4, 19.2, 20.0],
    },
    "magna":{
        "S": [1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 10.4, 10.8, 11.2, 11.6, 12.0],
        "M": [3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 12.5, 13.0, 13.5, 14.0, 14.5],
        "L": [6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 15.6, 16.2, 16.8, 17.4, 18.0],
    },
    "unknown":{
        "S": [1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 10.4, 10.8, 11.2, 11.6, 12.0],
        "M": [3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 12.0, 12.0, 12.0, 12.0, 12.0],
        "L": [6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 15.6, 16.2, 16.8, 17.4, 18.0],
        "LL": [7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 16.0, 16.8, 17.6, 18.4, 19.2, 20.0],
    },
    "unknownOther":{
        "S": [1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 10.4, 10.8, 11.2, 11.6, 12.0],
        "M": [3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 12.0, 12.0, 12.0, 12.0, 12.0],
        "L": [6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 15.6, 16.2, 16.8, 17.4, 18.0],
        "LL": [7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 16.0, 16.8, 17.6, 18.4, 19.2, 20.0],
    },
    "bahaHP": {
        // 剣など
        "M": [10.0, 10.5, 11.0, 11.5, 12.0, 12.5, 13.0, 13.5, 14.0, 15.0, 15.6, 16.2, 16.8, 17.4, 18.0],
        "L": [20.0, 21.0, 22.0, 23.0, 24.0, 25.0, 26.0, 27.0, 28.0, 30.0, 30.4, 30.8, 31.2, 31.6, 32.0],
    },
    "bahaAT": {
        // 短剣など
        "M": [10.0, 10.5, 11.0, 11.5, 12.0, 12.5, 13.0, 13.5, 14.0, 15.0, 30.4, 30.8, 31.2, 31.6, 32.0],
        "L": [20.0, 21.0, 22.0, 23.0, 24.0, 25.0, 26.0, 27.0, 28.0, 30.0, 30.4, 30.8, 31.2, 31.6, 32.0],
    },
    "bahaFUATHP": {
        // 短剣、剣など
        "HP": [15.0, 15.0, 15.0, 15.0, 15.0, 15.0, 15.0, 15.0, 15.0, 15.0, 15.6, 16.2, 16.8, 17.4, 18.0],
        "AT": [30.0, 30.0, 30.0, 30.0, 30.0, 30.0, 30.0, 30.0, 30.0, 30.0, 30.4, 30.8, 31.2, 31.6, 32.0],
    },
    "bahaFUHP": {
        // 拳など
        // "HP": [30.0, 30.0, 30.0, 30.0, 30.0, 30.0, 30.0, 30.0, 30.0, 30.0, 32.0, 34.0, 36.0, 38.0, 40.0],
        // "DA": [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 2.0, 4.0, 6.0, 8.0, 10.0],
        // "TA": [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.6, 3.2, 4.8, 6.4,  8.0],
        // wiki データ
        "HP": [30.0, 30.0, 30.0, 30.0, 30.0, 30.0, 30.0, 30.0, 30.0, 30.0, 30.4, 30.8, 31.2, 31.6, 32.0],
        "DA": [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 4.6, 5.0, 5.5, 6.0, 6.5, 7.0],
        "TA": [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 4.6, 5.0, 5.5, 6.0, 6.5, 7.0],
    },
    "normalHP":{
        "S": [3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 12.0, 12.0, 12.0, 12.0, 12.0],
        "M": [6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 15.4, 15.8, 16.2, 16.6, 17.0],
        "L": [9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 16.0, 17.0, 18.0, 18.6, 19.2, 19.8, 20.4, 21.0],
    },
    "magnaHP":{
        "S": [1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 10.4, 10.8, 11.2, 11.6, 12.0],
        "M": [3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 12.0, 12.0, 12.0, 12.0, 12.0],
        "L": [6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 15.0, 15.0, 15.0, 15.0, 15.0],
        "LL": [6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 15.6, 16.2, 16.8, 17.4, 18.0],
    },
    "unknownHP":{
        "S": [1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 10.0, 10.0, 10.0, 10.0, 10.0],
        "M": [3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 12.0, 12.0, 12.0, 12.0, 12.0],
        "L": [6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 15.0, 15.0, 15.0, 15.0, 15.0],
        "LL": [6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 15.6, 16.2, 16.8, 17.4, 18.0],
    },
    "normalNite":{
        "S": [0.4, 0.6, 0.8, 1.0, 1.2, 1.4, 1.6, 1.8, 2.0, 2.2, 2.4, 2.6, 2.8, 3.0, 3.2],
        "M": [0.7, 1.0, 1.3, 1.6, 1.9, 2.2, 2.5, 2.8, 3.1, 3.4, 3.7, 4.0, 4.3, 4.6, 4.9],
        "L": [1.0, 1.4, 1.8, 2.2, 2.6, 3.0, 3.4, 3.8, 4.2, 4.6, 5.0, 5.4, 5.8, 6.2, 7.0],
    },
    // 仮
    "magnaNite":{
        "S": [0.4, 0.6, 0.8, 1.0, 1.2, 1.4, 1.6, 1.8, 2.0, 2.2, 2.4, 2.6, 2.8, 3.0, 3.2],
        "M": [0.7, 1.0, 1.3, 1.6, 1.9, 2.2, 2.5, 2.8, 3.1, 3.4, 3.7, 4.0, 4.3, 4.6, 4.9],
        "L": [1.0, 1.4, 1.8, 2.2, 2.6, 3.0, 3.4, 3.8, 4.2, 4.6, 5.0, 5.4, 5.8, 6.2, 7.0],
    },
    "unknownOtherNite":{
        "S": [0.4, 0.6, 0.8, 1.0, 1.2, 1.4, 1.6, 1.8, 2.0, 2.2, 2.4, 2.6, 2.8, 3.0, 3.2],
    },
    "normalSante":{
        "L": [1.1, 1.53, 1.96, 2.39, 2.82, 3.25, 3.68, 4.11, 4.54, 5.0, 5.4, 5.8, 6.2, 6.6, 7.0],
    },
    "magnaSante":{
        "L": [1.1, 1.53, 1.96, 2.39, 2.82, 3.25, 3.68, 4.11, 4.54, 5.0, 5.4, 5.8, 6.2, 6.6, 7.0],
    },
    "normalCritical":{
        "S": [1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0, 2.1, 2.2, 2.3, 2.4],
        "M": [3.0, 3.3, 3.6, 3.9, 4.2, 4.5, 4.8, 5.1, 5.4, 5.7, 6.0, 6.3, 6.7, 7.0, 7.3],
        "L": [4.0, 4.4, 4.8, 5.2, 5.6, 6.0, 6.4, 6.8, 7.2, 7.6, 8.0, 8.4, 8.8, 9.2, 9.6],
        "ratio": 0.5,
    },
    // 仮入力
    "magnaCritical":{
        "S": [1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0, 2.2, 2.2, 2.3, 2.4],
        "M": [3.0, 3.3, 3.6, 3.9, 4.2, 4.5, 4.8, 5.1, 5.4, 5.7, 6.0, 6.3, 6.7, 7.0, 7.3],
        "L": [4.0, 4.4, 4.8, 5.2, 5.6, 6.0, 6.4, 6.8, 7.2, 7.6, 8.0, 8.4, 8.8, 9.2, 9.6],
        "ratio": 0.5,
    },
}

// オプション用
var select_races = Object.keys(raceTypes).map(function(opt){return <option value={opt} key={opt}>{raceTypes[opt]}</option>;});
var select_elements = Object.keys(elementTypes).map(function(opt){return <option value={opt} key={opt}>{elementTypes[opt]}</option>;});
var select_summons = Object.keys(summonTypes).map(function(opt){return <option value={opt} key={opt}>{summonTypes[opt]}</option>;});
var select_skills = Object.keys(skilltypes).map(function(key){ return <option value={key} key={key}>{skilltypes[key].name}</option>;})
var select_types = Object.keys(jobTypes).map(function(opt){return <option value={opt} key={opt}>{jobTypes[opt]}</option>;});
var select_armtypes = Object.keys(armTypes).map(function(opt){return <option value={opt} key={opt}>{armTypes[opt]}</option>;});
var select_summonElements = Object.keys(summonElementTypes).map(function(opt){return <option value={opt} key={opt}>{summonElementTypes[opt].name}</option>;});
var select_zenithAttack = zenithAttackBonus.map(function(opt){return <option value={opt} key={opt}>{opt}</option>;});
var select_zenithHP = zenithHPBonus.map(function(opt){return <option value={opt} key={opt}>{opt}</option>;});
var select_slv = skilllevels.map(function(opt){return <option value={opt} key={opt}>{opt}</option>;});
var select_consider = considerNum.map(function(opt){return <option value={opt} key={opt}>{opt}</option>;});
var select_armnum = armNums.map(function(opt){return <option value={opt} key={opt}>{opt}</option>;});
var select_summonnum = summonNums.map(function(opt){return <option value={opt} key={opt}>{opt}</option>;});

// query 取得用の関数
var urldata = getVarInQuery("data");
var urlid = getVarInQuery("id")

function getVarInQuery(key){
    var vars = {}, max = 0, hash = "", array = "";
    var url = window.location.search;

    hash  = url.slice(1).split('&');
    max = hash.length;
    for (var i = 0; i < max; i++) {
        array = hash[i].split('=');
        vars[array[0]] = array[1];
    }

    var result = ""
    if(key in vars){
        result = vars[key];
    }

    return result;
}

var _ua = (function(u){
  return {
    Tablet:(u.indexOf("windows") != -1 && u.indexOf("touch") != -1 && u.indexOf("tablet pc") == -1)
      || u.indexOf("ipad") != -1
      || (u.indexOf("android") != -1 && u.indexOf("mobile") == -1)
      || (u.indexOf("firefox") != -1 && u.indexOf("tablet") != -1)
      || u.indexOf("kindle") != -1
      || u.indexOf("silk") != -1
      || u.indexOf("playbook") != -1,
    Mobile:(u.indexOf("windows") != -1 && u.indexOf("phone") != -1)
      || u.indexOf("iphone") != -1
      || u.indexOf("ipod") != -1
      || (u.indexOf("android") != -1 && u.indexOf("mobile") != -1)
      || (u.indexOf("firefox") != -1 && u.indexOf("mobile") != -1)
      || u.indexOf("blackberry") != -1
  }
})(window.navigator.userAgent.toLowerCase());

// global hash for loading new data
var newData = {}
var cosmosChecked = false;

// Root class contains [Profile, ArmList, Results].
var Root = React.createClass({
  getInitialState: function() {
      return {
        armNum: 5,
        summonNum: 2,
        profile: [],
        armlist: [],
        chara: [],
        summon: [],
        dataName: '',
        topclass: "top open",
        topopen: true,
        topbuttontext: "プロフィール",
        top2class: "top2",
        top2open: false,
        top2buttontext: "キャラ欄を展開 +",
        middleclass: "middle open",
        middleopen: true,
        middlebuttontext: "武器リスト",
      };
  },
  getDatacharById: function(id) {
      $.ajax({
          url: "getdata.php",
          type: 'POST',
          dataType: 'text',
          cache: false,
          timeout: 10000,
          data: {id: id},
          success: function(data, datatype) {
              var initState = JSON.parse(Base64.decode(data));
              newData = initState
              this.setState(initState);
          }.bind(this),
          error: function(xhr, status, err) {
              alert("Error!: IDが不正です. status: ", status, ", error message: ", err.toString());
          }.bind(this)
      });
  },
  componentDidMount: function(){
      if(urldata != ''){
          var initState = JSON.parse(Base64.decode(urldata));
          initState["dataName"] = "urlData"
          newData = initState
          this.setState(initState);
      }

      if(urlid != ''){
          this.getDatacharById(urlid);
      }
  },
  handleArmNumChange: function(newArmNum) {
      this.setState({armNum: newArmNum});
      var newProf = this.state.profile;
      newProf["armNum"] = newArmNum
      this.setState({profile: newProf});
  },
  handleSummonNumChange: function(newSummonNum) {
      this.setState({summonNum: newSummonNum});
      var newProf = this.state.profile;
      newProf["summonNum"] = newSummonNum
      this.setState({profile: newProf});
  },
  onChangeArmData: function(state) {
      this.setState({armlist: state});
  },
  onChangeProfileData: function(state) {
      this.setState({profile: state});
  },
  onChangeSummonData: function(state) {
      this.setState({summon: state});
  },
  onChangeCharaData: function(state) {
      this.setState({chara: state});
  },
  handleChangeData: function(newDataName) {
      this.setState({armNum: newData.armNum});
      this.setState({summonNum: newData.summonNum});
      this.setState({dataName: newDataName});
  },
  handleOnClickTopToggle: function(e) {
      if(this.state.topopen) {
          this.setState({topclass: "top", topopen: false, topbuttontext: "プロフィール欄を展開 +"})
      } else {
          this.setState({topclass: "top open", topopen: true, topbuttontext: "プロフィール"})
      }
  },
  handleOnClickTop2Toggle: function(e) {
      if(this.state.top2open) {
          this.setState({top2class: "top2", top2open: false, top2buttontext: "キャラ欄を展開 +"})
      } else {
          this.setState({top2class: "top2 open", top2open: true, top2buttontext: "キャラクター"})
      }
  },
  handleOnClickMiddleToggle: function(e) {
      if(this.state.middleopen) {
          this.setState({middleclass: "middle", middleopen: false, middlebuttontext: "武器リスト欄を展開 +"})
      } else {
          this.setState({middleclass: "middle open", middleopen: true, middlebuttontext: "武器リスト"})
      }
  },
  captureResultList: function(e){
      html2canvas(document.getElementById("allResult"), {
          onrendered: function(canvas) {
              window.open(canvas.toDataURL("image/png"));
          },
      })
  },
  changeTab: function(e){
      document.querySelector("button#inputTab").removeAttribute("class")
      document.querySelector("button#summonTab").removeAttribute("class")
      document.querySelector("button#charaTab").removeAttribute("class")
      document.querySelector("button#armTab").removeAttribute("class")
      document.querySelector("button#resultTab").removeAttribute("class")
      document.querySelector("button#systemTab").removeAttribute("class")

      e.target.setAttribute("class", "selected")

      document.querySelector("div#inputTab").setAttribute("class", "inputTab hidden")
      document.querySelector("div#summonTab").setAttribute("class", "summonTab hidden")
      document.querySelector("div#charaTab").setAttribute("class", "charaTab hidden")
      document.querySelector("div#armTab").setAttribute("class", "armTab hidden")
      document.querySelector("div#resultTab").setAttribute("class", "resultTab hidden")
      document.querySelector("div#systemTab").setAttribute("class", "systemTab hidden")

      var target = document.querySelector("div." + e.target.getAttribute("id"))
      target.setAttribute("class", e.target.getAttribute("id"));
  },
  changeTabPC: function(e){
      document.querySelector("button#inputTab").removeAttribute("class")
      document.querySelector("button#systemTab").removeAttribute("class")
      document.querySelector("button#charaTab").removeAttribute("class")
      document.querySelector("button#armTab").removeAttribute("class")
      e.target.setAttribute("class", "selected")

      document.querySelector("div#inputTab").setAttribute("class", "inputTab hidden")
      document.querySelector("div#charaTab").setAttribute("class", "charaTab hidden")
      document.querySelector("div#armTab").setAttribute("class", "armTab hidden")
      document.querySelector("div#systemTab").setAttribute("class", "systemTab hidden")

      var target = document.querySelector("div." + e.target.getAttribute("id"))
      target.setAttribute("class", e.target.getAttribute("id"));
  },
  render: function() {
    if(_ua.Mobile || _ua.Tablet) {
        return (
            <div className="root">
                <h2>元カレ計算機 (グラブル攻撃力計算機) </h2>
                <div className="tabrow">
                    <button id="inputTab" className="selected" onClick={this.changeTab}>ジータ</button>
                    <button id="summonTab" onClick={this.changeTab} >召喚石</button>
                    <button id="charaTab" onClick={this.changeTab} >キャラ</button>
                    <button id="armTab" onClick={this.changeTab} >武器</button>
                    <button id="resultTab" onClick={this.changeTab} >結果</button>
                    <button id="systemTab" onClick={this.changeTab} >保存</button>
                </div>
                <div className="inputTab" id="inputTab">
                    <Profile dataName={this.state.dataName} onArmNumChange={this.handleArmNumChange} onChange={this.onChangeProfileData} onSummonNumChange={this.handleSummonNumChange} />
                </div>
                <div className="summonTab hidden" id="summonTab">
                    <SummonList dataName={this.state.dataName} summonNum={this.state.summonNum} onChange={this.onChangeSummonData} />
                </div>
                <div className="charaTab hidden" id="charaTab">
                    <CharaList dataName={this.state.dataName} onChange={this.onChangeCharaData} />
                </div>
                <div className="armTab hidden" id="armTab">
                    <ArmList dataName={this.state.dataName} armNum={this.state.armNum} onChange={this.onChangeArmData} />
                </div>
                <div className="resultTab hidden" id="resultTab">
                    <ResultList data={this.state} />
                </div>
                <div className="systemTab hidden" id="systemTab">
                    <Sys data={this.state} onLoadNewData={this.handleChangeData} />
                    <TwitterShareButton data={this.state} />
                    <Notice />
                </div>
            </div>
        );
    } else {
        return (
            <div className="root">
                <div className="rootleft" id="rootleft2">
                    <h1>元カレ計算機 (グラブル攻撃力計算機) </h1>
                    <div className="tabrow">
                        <button id="inputTab" className="selected" onClick={this.changeTabPC}>入力 / Input</button>
                        <button id="charaTab" onClick={this.changeTabPC} >キャラ / Chara</button>
                        <button id="armTab" onClick={this.changeTabPC} >武器 / Weapon</button>
                        <button id="systemTab" onClick={this.changeTabPC} >保存・注記 / System</button>
                    </div>
                    <div className="inputTab" id="inputTab">
                        <Profile dataName={this.state.dataName} onArmNumChange={this.handleArmNumChange} onChange={this.onChangeProfileData} onSummonNumChange={this.handleSummonNumChange} />
                        <SummonList dataName={this.state.dataName} summonNum={this.state.summonNum} onChange={this.onChangeSummonData} />
                    </div>
                    <div className="charaTab hidden" id="charaTab">
                        <CharaList dataName={this.state.dataName} onChange={this.onChangeCharaData} />
                    </div>
                    <div className="armTab hidden" id="armTab">
                        <ArmList dataName={this.state.dataName} armNum={this.state.armNum} onChange={this.onChangeArmData} />
                    </div>
                    <div className="systemTab hidden" id="systemTab">
                        <Sys data={this.state} onLoadNewData={this.handleChangeData} />
                        <TwitterShareButton data={this.state} />
                        <Notice />
                    </div>
                </div>
                <div className="rootRight">
                    <ResultList data={this.state} />
                </div>
            </div>
        );
    }
  }
});

var CharaList = React.createClass({
    getInitialState: function() {
        return {
            charalist: [],
            defaultElement: "fire",
        };
    },
    handleOnChange: function(key, state){
        var newcharalist = this.state.charalist;
        newcharalist[key] = state;
        this.setState({charalist: newcharalist})
        this.props.onChange(newcharalist);
    },
    handleEvent: function(key, e) {
      var newState = this.state
      newState[key] = e.target.value
      this.setState(newState)
    },
    render: function() {
        var charas = [];
        for(var i=0; i < 6; i++) {
            charas.push({id: i});
        }
        var hChange = this.handleOnChange;
        var dataName = this.props.dataName;
        var defaultElement = this.state.defaultElement;
        if(_ua.Mobile) {
            return (
                <div className="charaList">
                    [属性一括変更]<FormControl componentClass="select" className="element" value={this.state.defaultElement} onChange={this.handleEvent.bind(this, "defaultElement")} > {select_elements} </FormControl>
                    {charas.map(function(c) {
                        return <Chara key={c.id} onChange={hChange} id={c.id} dataName={dataName} defaultElement={defaultElement} />;
                    })}
                </div>
            );

        } else {
            return (
                <div className="charaList">
                    <table>
                    <thead>
                    <tr>
                        <th>キャラ名*</th>
                        <th>属性* <br/> [一括変更] <br/><FormControl componentClass="select" className="element" value={this.state.defaultElement} onChange={this.handleEvent.bind(this, "defaultElement")} > {select_elements} </FormControl> </th>
                        <th>種族</th>
                        <th>タイプ</th>
                        <th>得意武器*</th>
                        <th>得意武器2</th>
                        <th className="considerAverage">平均に含める</th>
                        <th>素の攻撃力*<br/>(≠編成画面での表示値)</th>
                        <th>素のHP</th>
                        <th>残HP割合(%)</th>
                        <th>基礎DA率(%)</th>
                        <th>基礎TA率(%)</th>
                    </tr>
                    </thead>
                    <tbody>
                        {charas.map(function(c) {
                            return <Chara key={c.id} onChange={hChange} id={c.id} dataName={dataName} defaultElement={defaultElement} />;
                        })}
                    </tbody>
                    </table>
                </div>
            );
        }
    }
});

var Chara = React.createClass({
    getInitialState: function() {
        return {
            name: "",
            element: "fire",
            race: "human",
            attack: 0,
            hp: 0,
            support: "none",
            type: "attack",
            favArm: "dagger",
            favArm2: "none",
            remainHP: 100,
            DA: 6.5,
            TA: 3.0,
            isConsideredInAverage: true,
        };
    },
    componentDidMount: function(){
       var state = this.state;

       // もし newData に自分に該当するキーがあるなら読み込む
       // (データロード時に新しく増えたコンポーネント用)
       var chara = newData.chara
       if( chara != undefined && this.props.id in chara ){
           state = chara[this.props.id]
           this.setState(state)
       }
       // 初期化後 state を 上の階層に渡しておく
       // CharaList では onChange が勝手に上に渡してくれるので必要なし
       this.props.onChange(this.props.id, state);
    },
    componentWillReceiveProps: function(nextProps){
        // only fired on Data Load
        if(nextProps.dataName != this.props.dataName) {
            var chara = newData.chara
            if( chara != undefined && this.props.id in chara ){
                state = chara[this.props.id]
                this.setState(state)
                this.props.onChange(this.props.id, state)
            }
        }
        if(nextProps.defaultElement != this.props.defaultElement) {
            var newState = this.state
            newState["element"] = nextProps.defaultElement
            this.setState(newState);
            this.props.onChange(this.props.id, newState);
        }
    },
    handleEvent: function(key, e) {
        var newState = this.state
        if(key == "isConsideredInAverage") {
            newState[key] = (newState[key] == false) ? true : false
        } else {
            newState[key] = e.target.value
        }
        this.setState(newState)
        this.props.onChange(this.props.id, newState)
    },
    render: function() {
        if(_ua.Mobile) {
            return (
                <table><tbody>
                    <tr><th>名前</th><td><FormControl type="text" placeholder="名前" value={this.state.name} onChange={this.handleEvent.bind(this, "name")}/></td></tr>
                    <tr><th>属性</th><td><FormControl componentClass="select" value={this.state.element} onChange={this.handleEvent.bind(this, "element")} >{select_elements}</FormControl></td></tr>
                    <tr><th>種族</th><td><FormControl componentClass="select" value={this.state.race} onChange={this.handleEvent.bind(this, "race")} >{select_races}</FormControl></td></tr>
                    <tr><th>タイプ</th><td><FormControl componentClass="select" value={this.state.type} onChange={this.handleEvent.bind(this, "type")} >{select_types}</FormControl></td></tr>
                    <tr><th>得意武器1</th><td><FormControl componentClass="select" value={this.state.favArm} onChange={this.handleEvent.bind(this, "favArm")} >{select_armtypes}</FormControl></td></tr>
                    <tr><th>得意武器2</th><td><FormControl componentClass="select" value={this.state.favArm2} onChange={this.handleEvent.bind(this, "favArm2")} >{select_armtypes}</FormControl></td></tr>
                    <tr><th>平均に含める</th><td className="considerAverage"><Checkbox inline checked={this.state.isConsideredInAverage} onChange={this.handleEvent.bind(this, "isConsideredInAverage")} /></td></tr>
                    <tr><th>素の攻撃力</th><td><FormControl type="number" min="0" max="15000" value={this.state.attack} onChange={this.handleEvent.bind(this, "attack")}/></td></tr>
                    <tr><th>素のHP</th><td><FormControl type="number" min="0" max="5000" value={this.state.hp} onChange={this.handleEvent.bind(this, "hp")}/></td></tr>
                    <tr><th>残HP割合</th><td><FormControl type="number" min="0" max="100" value={this.state.remainHP} onChange={this.handleEvent.bind(this, "remainHP")}/></td></tr>
                    <tr><th>基礎DA率</th><td><FormControl type="number" min="0" step="0.1" value={this.state.DA} onChange={this.handleEvent.bind(this, "DA")}/></td></tr>
                    <tr><th>基礎TA率</th><td><FormControl type="number" min="0" step="0.1" value={this.state.TA} onChange={this.handleEvent.bind(this, "TA")}/></td></tr>
                </tbody></table>
            );

        } else {
            return (
                <tr>
                    <td><FormControl type="text" placeholder="名前" value={this.state.name} onChange={this.handleEvent.bind(this, "name")}/></td>
                    <td><FormControl componentClass="select" value={this.state.element} onChange={this.handleEvent.bind(this, "element")} >{select_elements}</FormControl></td>
                    <td><FormControl componentClass="select" value={this.state.race} onChange={this.handleEvent.bind(this, "race")} >{select_races}</FormControl></td>
                    <td><FormControl componentClass="select" value={this.state.type} onChange={this.handleEvent.bind(this, "type")} >{select_types}</FormControl></td>
                    <td><FormControl componentClass="select" value={this.state.favArm} onChange={this.handleEvent.bind(this, "favArm")} >{select_armtypes}</FormControl></td>
                    <td><FormControl componentClass="select" value={this.state.favArm2} onChange={this.handleEvent.bind(this, "favArm2")} >{select_armtypes}</FormControl></td>
                    <td className="considerAverage"><Checkbox inline checked={this.state.isConsideredInAverage} onChange={this.handleEvent.bind(this, "isConsideredInAverage")} /></td>
                    <td><FormControl type="number" min="0" max="15000" value={this.state.attack} onChange={this.handleEvent.bind(this, "attack")}/></td>
                    <td><FormControl type="number" min="0" max="5000" value={this.state.hp} onChange={this.handleEvent.bind(this, "hp")}/></td>
                    <td><FormControl type="number" min="0" max="100" value={this.state.remainHP} onChange={this.handleEvent.bind(this, "remainHP")}/></td>
                    <td><FormControl type="number" min="0" step="0.1" value={this.state.DA} onChange={this.handleEvent.bind(this, "DA")}/></td>
                    <td><FormControl type="number" min="0" step="0.1" value={this.state.TA} onChange={this.handleEvent.bind(this, "TA")}/></td>
                </tr>
            );
        }

    }
});

var SummonList = React.createClass({
    getInitialState: function() {
        return {
            smlist: [],
            defaultElement: "fire",
        };
    },
    componentWillReceiveProps: function(nextProps) {
        if (parseInt(nextProps.summonNum) < parseInt(this.props.summonNum)) {
            var newsmlist = this.state.smlist;
            while(newsmlist.length > nextProps.summonNum) {
                newsmlist.pop();
            }
            this.setState({smlist: newsmlist})
        }
    },
    handleOnChange: function(key, state){
        var newsmlist = this.state.smlist;
        newsmlist[key] = state;
        this.setState({smlist: newsmlist})
        this.props.onChange(newsmlist);
    },
    handleEvent: function(key, e) {
      var newState = this.state
      newState[key] = e.target.value
      this.setState(newState)
    },
    render: function() {
        var summons = [];
        for(var i=0; i < this.props.summonNum; i++) {
            summons.push({id: i});
        }
        var hChange = this.handleOnChange;
        var dataName = this.props.dataName;
        var defaultElement = this.state.defaultElement;
        if(_ua.Mobile) {
            return (
                <div className="summonList">
                    [属性一括変更]<FormControl componentClass="select" className="element" value={this.state.defaultElement} onChange={this.handleEvent.bind(this, "defaultElement")} > {select_summonElements} </FormControl>
                    {summons.map(function(sm) {
                        return <Summon key={sm.id} onChange={hChange} id={sm.id} dataName={dataName} defaultElement={defaultElement} />;
                    })}
                </div>
            );
        } else {
            return (
                <div className="summonList">
                    <h3 className="margin-top"> 召喚石 </h3>
                    <table>
                    <thead>
                    <tr>
                        <th>石*</th>
                        <th>属性* <br/>[一括変更]<FormControl componentClass="select" className="element" value={this.state.defaultElement} onChange={this.handleEvent.bind(this, "defaultElement")} > {select_summonElements} </FormControl></th>
                        <th>加護量*</th>
                        <th>合計攻撃力*</th>
                        <th>合計HP</th>
                        <th>HPUP(%)</th>
                        <th>DA加護</th>
                        <th>TA加護</th>
                    </tr>
                    </thead>
                    <tbody>
                        {summons.map(function(sm) {
                            return <Summon key={sm.id} onChange={hChange} id={sm.id} dataName={dataName} defaultElement={defaultElement} />;
                        })}
                    </tbody>
                    </table>
                </div>
            );
        }
    }
});

var Summon = React.createClass({
    getInitialState: function() {
        return {
            selfSummonType: "magna",
            selfSummonAmount: 0,
            selfSummonAmount2: 0,
            selfElement: "fire",
            friendSummonType: "magna",
            friendSummonAmount: 0,
            friendSummonAmount2: 0,
            friendElement: "fire",
            attack: 0,
            hp: 0,
            hpBonus: 0,
            DA: 0,
            TA: 0,
            criticalRatio: 0.0,
        };
    },
    componentDidMount: function(){
       var state = this.state;

       // もし newData に自分に該当するキーがあるなら読み込む
       // (データロード時に新しく増えたコンポーネント用)
       var summon = newData.summon
       if( summon != undefined && this.props.id in summon ){
           state = summon[this.props.id]
           this.setState(state)
       }
       // 初期化後 state を 上の階層に渡しておく
       // summonList では onChange が勝手に上に渡してくれるので必要なし
       this.props.onChange(this.props.id, state);
    },
    componentWillReceiveProps: function(nextProps){
        // only fired on Data Load
        if(nextProps.dataName != this.props.dataName) {
            var newState = newData.summon[this.props.id]
            this.setState(newState);
            this.props.onChange(this.props.id, newState)
        }

        if(nextProps.defaultElement != this.props.defaultElement) {
            var newState = this.state
            newState["selfElement"] = nextProps.defaultElement
            newState["friendElement"] = nextProps.defaultElement
            this.setState(newState);
            this.props.onChange(this.props.id, newState);
        }
    },
    handleEvent: function(key, e) {
        var newState = this.state
        newState[key] = e.target.value
        this.setState(newState)
        this.props.onChange(this.props.id, newState)
    },
    handleSummonAmountChange(type, ind, e){
        var newState = this.state
        if(type == "self") {
            if(ind == 0){
                newState["selfSummonAmount"] = e.target.value
            } else {
                newState["selfSummonAmount2"] = e.target.value
            }
        } else {
            if(ind == 0){
                newState["friendSummonAmount"] = e.target.value
            } else {
                newState["friendSummonAmount2"] = e.target.value
            }
        }
        this.setState(newState)
        this.props.onChange(this.props.id, newState)
    },
    render: function() {
        var selfSummon = [{"label": "", "input": "number"}, {"input": "hidden"}]
        if(this.state.selfSummonType == "odin"){
            selfSummon[1] = {"label": "キャラ ", "input": "number"}
            selfSummon[0].label = "属性 "
        }
        var friendSummon = [{"label": "", "input": "number"}, {"input": "hidden"}]
        if(this.state.friendSummonType == "odin"){
            friendSummon[1] = {"label": "キャラ ", "input": "number"}
            friendSummon[0].label = "属性 "
        }
        if(_ua.Mobile) {
            return (
                <table>
                <tbody>
                <tr>
                    <th>自分の石</th>
                    <td>
                    <FormControl componentClass="select" className="element" value={this.state.selfElement} onChange={this.handleEvent.bind(this, "selfElement")} >{select_summonElements}</FormControl>
                    <FormControl componentClass="select" className="summontype" value={this.state.selfSummonType} onChange={this.handleEvent.bind(this, "selfSummonType")} >{select_summons}</FormControl>
                    </td>
                </tr>
                <tr>
                    <th>自分の加護量</th>
                    <td>{selfSummon[0].label}<FormControl classNametype={selfSummon[0].input} min="0" max="200" value={this.state.selfSummonAmount} onChange={this.handleSummonAmountChange.bind(this, "self", 0)} /><br/>
                    {selfSummon[1].label}<FormControl type={selfSummon[1].input} min="0" max="200" value={this.state.selfSummonAmount2} onChange={this.handleSummonAmountChange.bind(this, "self", 1)} />
                    </td>
                </tr>
                <tr>
                    <th>フレンド石</th>
                    <td>
                    <FormControl componentClass="select" className="element" value={this.state.friendElement} onChange={this.handleEvent.bind(this, "friendElement")} >{select_summonElements}</FormControl>
                    <FormControl componentClass="select" className="summontype" value={this.state.friendSummonType} onChange={this.handleEvent.bind(this, "friendSummonType")} >{select_summons}</FormControl></td>
                </tr>
                <tr>
                    <th>フレの加護量</th>
                    <td>{friendSummon[0].label}<FormControl type={friendSummon[0].input} min="0" max="200" value={this.state.friendSummonAmount} onChange={this.handleSummonAmountChange.bind(this, "friend", 0)} /><br/>
                    {friendSummon[1].label}<FormControl type={friendSummon[1].input} min="0" max="200" value={this.state.friendSummonAmount2} onChange={this.handleSummonAmountChange.bind(this, "friend", 1)} />
                    </td>
                </tr>
                <tr>
                    <th>合計攻撃力</th>
                    <td><FormControl type="number" min="0" value={this.state.attack} onChange={this.handleEvent.bind(this, "attack")}/></td>
                </tr>
                <tr>
                    <th>合計HP</th>
                    <td><FormControl type="number" min="0" value={this.state.hp} onChange={this.handleEvent.bind(this, "hp")}/></td>
                </tr>
                <tr>
                    <th>HPUP(%)</th>
                    <td><FormControl type="number" min="0" value={this.state.hpBonus} onChange={this.handleEvent.bind(this, "hpBonus")}/></td>
                </tr>
                <tr>
                    <th>DA加護</th>
                    <td><FormControl type="number" min="0" value={this.state.DA} onChange={this.handleEvent.bind(this, "DA")}/></td>
                </tr>
                <tr>
                    <th>TA加護</th>
                    <td><FormControl type="number" min="0" value={this.state.TA} onChange={this.handleEvent.bind(this, "TA")}/></td>
                </tr>
                </tbody>
                </table>
            );
        } else {
            return (
                <tr>
                    <td><label>自分:<FormControl componentClass="select" className="multi" value={this.state.selfSummonType} onChange={this.handleEvent.bind(this, "selfSummonType")} >{select_summons}</FormControl></label><br/>
                    <label>フレ:<FormControl componentClass="select" className="multi" value={this.state.friendSummonType} onChange={this.handleEvent.bind(this, "friendSummonType")} >{select_summons}</FormControl></label></td>
                    <td><FormControl componentClass="select" value={this.state.selfElement} onChange={this.handleEvent.bind(this, "selfElement")} >{select_summonElements}</FormControl><br/>
                    <FormControl componentClass="select" value={this.state.friendElement} onChange={this.handleEvent.bind(this, "friendElement")} >{select_summonElements}</FormControl></td>
                    <td>{selfSummon[0].label}<FormControl type={selfSummon[0].input} min="0" max="200" value={this.state.selfSummonAmount} onChange={this.handleSummonAmountChange.bind(this, "self", 0)} />
                    {selfSummon[1].label}<FormControl type={selfSummon[1].input} min="0" max="200" value={this.state.selfSummonAmount2} onChange={this.handleSummonAmountChange.bind(this, "self", 1)} />
                    <br/>
                    {friendSummon[0].label}<FormControl type={friendSummon[0].input} min="0" max="200" value={this.state.friendSummonAmount} onChange={this.handleSummonAmountChange.bind(this, "friend", 0)} />
                    {friendSummon[1].label}<FormControl type={friendSummon[1].input} min="0" max="200" value={this.state.friendSummonAmount2} onChange={this.handleSummonAmountChange.bind(this, "friend", 1)} />
                    </td>
                    <td><FormControl type="number" min="0" value={this.state.attack} onChange={this.handleEvent.bind(this, "attack")}/></td>
                    <td><FormControl type="number" min="0" value={this.state.hp} onChange={this.handleEvent.bind(this, "hp")}/></td>
                    <td><FormControl type="number" min="0" value={this.state.hpBonus} onChange={this.handleEvent.bind(this, "hpBonus")}/></td>
                    <td><FormControl type="number" min="0" value={this.state.DA} onChange={this.handleEvent.bind(this, "DA")}/></td>
                    <td><FormControl type="number" min="0" value={this.state.TA} onChange={this.handleEvent.bind(this, "TA")}/></td>
                </tr>
            );
        }
    }
});

var ResultList = React.createClass({
    getInitialState: function() {
        return {
            switchTotalAttack: 1,
            switchATKandHP: 0,
            switchHP: 0,
            switchCharaHP: 0,
            switchDATA: 0,
            switchExpectedAttack: 0,
            switchCharaExpectedAttack: 0,
            switchCriticalRatio: 0,
            switchCharaAttack: 0,
            switchAverageAttack: 0,
            switchTotalExpected: 0,
            switchAverageTotalExpected: 0,
            switchDamage: 0,
            disableAutoResultUpdate: 0,
            result: {summon: this.props.data.summon, result: []},
        };
    },
    componentWillReceiveProps: function(nextProps) {
        // armlistかcharaの武器名に変更があればresultはupdateしなくてよい
        // var isSubtlePropsChange = false;
        // console.log("this.props:", this.props);
        // console.log("next.props:", nextProps);
        // if(this.props.data.armlist != undefined) {
        //     var len = (this.props.data.armlist.length > nextProps.data.armlist.length) ? nextProps.data.armlist.length : this.props.data.armlist.length
        //     for(var i = 0; i < len; i++){
        //         console.log("judge:", this.props.data.armlist[i].name == nextProps.data.armlist[i].name);
        //         if(this.props.data.armlist[i].name != nextProps.data.armlist[i].name) {
        //             isSubtlePropsChange = true;
        //             break;
        //         }
        //     }
        // }
        //
        // // if(this.props.data.chara != undefined && !isSubtlePropsChange) {
        // //     for(var i = 0; i < this.props.data.chara.length; i++){
        // //         if(this.props.data.chara[i].name != nextProps.data.chara[i].name) {
        // //             isSubtlePropsChange = true;
        // //             break;
        // //         }
        // //     }
        // // }
        // //
        // var diffpathcer = jsondiffpatch.create({
        //     objectHash: function(obj) {
        //         return obj.name;
        //     },
        // });
        //
        // console.log("jsondiff:", diffpathcer.diff(this.props.data.armlist, nextProps.data.armlist))

        if(this.state.disableAutoResultUpdate != 1){
            var allresult = this.calculateResult(nextProps);
            this.setState({result: allresult});
        }
    },
    handleEvent: function(key, e) {
        var newState = this.state
        newState[key] = (newState[key] == 0) ? 1 : 0

        // 自動更新ONにしたらUPDATEする
        if(key == "disableAutoResultUpdate" && newState[key] == 0){
            newState["result"] = this.calculateResult(this.props)
        }
        this.setState(newState)
    },
    calculateCombinations: function(arml) {
        // 全武器に対して [最小考慮数, ... , 最大考慮数] の配列を計算しておく
        var armNumArray = []
        var totalItr = 1;
        for(var i = 0; i < arml.length; i++){
            var temp = []
            var itr = arml[i].considerNumberMax - arml[i].considerNumberMin + 1
            for(var j = 0; j < itr; j++){
                temp[j] = j + arml[i].considerNumberMin;
            }
            totalItr *= itr;
            armNumArray[i] = temp;
        }

        // index を manage する関数
        var proceedIndex = function(index, ana, i){
            if(i == ana.length){
                return index;
            } else {
                index[i]++;
                if(index[i] > ana[i].length - 1){
                    index[i] = 0;
                    index = proceedIndex(index, ana, i + 1);
                }
                return index
            }
        }

        var combinations = []
        var index = []
        for(var i = 0; i < armNumArray.length; i++){
            index[i] = 0;
        }

        for(var i = 0; i < totalItr; i++){
            var temp = []
            var num = 0;
            var isCosmosIncluded = false;
            var isValidCombination = true;
            for(var j = 0; j < armNumArray.length; j++){
                if(arml[j].isCosmos == 0) {
                    temp.push(armNumArray[j][index[j]]);
                    num += parseInt(armNumArray[j][index[j]])
                } else {
                    // cosmos 武器
                    if(armNumArray[j][index[j]] == 0) {
                        temp.push(armNumArray[j][index[j]]);
                    } else if(armNumArray[j][index[j]] > 0 && !isCosmosIncluded) {
                        temp.push(armNumArray[j][index[j]]);
                        num += parseInt(armNumArray[j][index[j]])
                        isCosmosIncluded = true;
                    } else {
                        isValidCombination = false;
                    }
                }
            }
            if( isValidCombination && ((totalItr <= 1024 && num <= 10) || num == 10) ) combinations.push(temp)
            index = proceedIndex(index, armNumArray, 0)
        }
        return combinations
    },
    calculateBasedOneSummon: function(summon, prof, buff, totals) {
        var res = {}

        for(key in totals) {
            var totalSummon = {magna: 0, element: 0, zeus: 0, chara: 0, ranko: 0, attack: 0, hp: 0.0, hpBonus: 0.0, da: 0, ta: 0};
            selfElement = (summon.selfElement == undefined) ? "fire" : summon.selfElement
            friendElement = (summon.friendElement == undefined) ? "fire" : summon.friendElement

            if((summonElementTypes[selfElement]["type"].indexOf(totals[key]["element"]) >= 0) || selfElement == "all" ){
                if(summon.selfSummonType == "odin") {
                    // odin(属性+キャラ攻撃)など、複数の場合の処理
                    totalSummon["element"] += 0.01 * parseInt(summon.selfSummonAmount)
                    totalSummon["chara"] += 0.01 * parseInt(summon.selfSummonAmount2)
                } else {
                    // 自分の加護 通常の場合
                    totalSummon[summon.selfSummonType] += 0.01 * parseInt(summon.selfSummonAmount)
                }
            }
            if((summonElementTypes[friendElement]["type"].indexOf(totals[key]["element"]) >= 0) || friendElement == "all" ){
                if(summon.friendSummonType == "odin") {
                    // odin(属性+キャラ攻撃)など、複数の場合の処理
                    totalSummon["element"] += 0.01 * parseInt(summon.friendSummonAmount)
                    totalSummon["chara"] += 0.01 * parseInt(summon.friendSummonAmount2)
                } else {
                    // フレンドの加護 通常の場合
                    totalSummon[summon.friendSummonType] += 0.01 * parseInt(summon.friendSummonAmount)
                }
            }

            // 後から追加したので NaN でないか判定しておく
            if(!isNaN(summon.attack)) totalSummon["attack"] = parseInt(summon.attack)
            if(!isNaN(summon.hp)) totalSummon["hp"] = parseInt(summon.hp)
            if(!isNaN(summon.hpBonus)) totalSummon["hpBonus"] = 0.01 * parseInt(summon.hpBonus)
            if(!isNaN(summon.DA)) totalSummon["da"] = 0.01 * parseInt(summon.DA)
            if(!isNaN(summon.TA)) totalSummon["ta"] = 0.01 * parseInt(summon.TA)

            // 弱点属性判定
            var typeBonus = 1.0
            var enemyElement = (prof.enemyElement == undefined || prof.enemyElement == "水") ? "fire" : prof.enemyElement
            if(elementRelation[ totals[key]["element"] ]["weak"] == enemyElement) {
                typeBonus = 0.75
            } else if(elementRelation[ totals[key]["element"] ]["strong"] == enemyElement) {
                typeBonus = 1.5
            }

            // for attack
            var magnaCoeff = 1.0 + 0.01 * totals[key]["magna"] * ( 1.0 + totalSummon["magna"] )
            var magnaHaisuiCoeff = 1.0 + 0.01 * (totals[key]["magnaHaisui"]) * ( 1.0 + totalSummon["magna"] )
            var unknownCoeff = 1.0 + 0.01 * totals[key]["unknown"] * (1.0 + totalSummon["ranko"]) + 0.01 * totals[key]["unknownOther"]
            var unknownHaisuiCoeff = 1.0 + 0.01 * totals[key]["unknownOtherHaisui"]

            var normalCoeff = 1.0 + 0.01 * totals[key]["normal"] * (1.0 + totalSummon["zeus"]) + 0.01 * totals[key]["bahaAT"] + totalSummon["chara"] + buff["normal"]
            var normalHaisuiCoeff = 1.0 + 0.01 * (totals[key]["normalHaisui"]) * (1.0 + totalSummon["zeus"])
            var normalKonshinCoeff = 1.0 + 0.01 * (totals[key]["normalKonshin"]) * (1.0 + totalSummon["zeus"])
            var elementCoeff = typeBonus + totalSummon["element"] + buff["element"]
            var otherCoeff = 1.0 + buff["other"]

            if(key == "Djeeta") {
                var zenithATK = (prof.zenithAttackBonus == undefined) ? 3000 : parseInt(prof.zenithAttackBonus)
                var zenithHP = (prof.zenithHPBonus == undefined) ? 1000 : parseInt(prof.zenithHPBonus)
                // for Djeeta
                var summedAttack = (totals[key]["baseAttack"] + totals[key]["armAttack"] + totalSummon["attack"] + zenithATK + parseInt(Jobs[prof.job].atBonus)) * (1.0 + buff["master"])
                var displayHP = (totals[key]["baseHP"] + totalSummon["hp"] + totals[key]["armHP"] + zenithHP) * (1.0 + buff["masterHP"])
            } else {
                // for chara
                var summedAttack = totals[key]["baseAttack"] + totals[key]["armAttack"] + totalSummon["attack"]
                var displayHP = totals[key]["baseHP"] + totals[key]["armHP"] + totalSummon["hp"]
            }

            var totalAttack = summedAttack * magnaCoeff * magnaHaisuiCoeff * normalCoeff * normalHaisuiCoeff * elementCoeff * unknownCoeff * otherCoeff * unknownHaisuiCoeff * normalKonshinCoeff
            var totalHP = displayHP * (1.0 - totals[key]["HPdebuff"]) * (1.0 + buff["hp"] + totalSummon["hpBonus"] + 0.01 * totals[key]["bahaHP"] + 0.01 * totals[key]["magnaHP"] * (1.0 + totalSummon["magna"]) + 0.01 * totals[key]["normalHP"] * (1.0 + totalSummon["zeus"]) + 0.01 * totals[key]["unknownHP"] * (1.0 + totalSummon["ranko"]))

            // for DA and TA
            // baseDA: 6.5%, baseTA: 3.0%
            var normalNite = (totals[key]["normalNite"] * (1.0 + totalSummon["zeus"]) > 50.0) ? 50.0 : totals[key]["normalNite"] * (1.0 + totalSummon["zeus"])
            var magnaNite = (totals[key]["magnaNite"] * (1.0 + totalSummon["magna"]) > 50.0) ? 50.0 : totals[key]["magnaNite"] * (1.0 + totalSummon["magna"])
            var normalSante = (totals[key]["normalSante"] * (1.0 + totalSummon["zeus"]) > 50.0) ? 50.0 : totals[key]["normalSante"] * (1.0 + totalSummon["zeus"])
            var magnaSante = (totals[key]["magnaSante"] * (1.0 + totalSummon["magna"]) > 50.0) ? 50.0 : totals[key]["magnaSante"] * (1.0 + totalSummon["magna"])
            var unknownOtherNite = (totals[key]["unknownOtherNite"] > 50.0) ? 50.0 : totals[key]["unknownOtherNite"]

            // DATA sup
            var armDAup = (unknownOtherNite + normalNite + normalSante + magnaNite + magnaSante + totals[key]["bahaDA"] + totals[key]["cosmosBL"]> 50.0) ? 50.0 : normalNite + normalSante + magnaNite + magnaSante + unknownOtherNite + totals[key]["bahaDA"] + totals[key]["cosmosBL"]
            var armTAup = (normalSante + magnaSante + totals[key]["bahaTA"] > 50.0) ? 50.0 : normalSante + magnaSante + totals[key]["bahaTA"]

            var totalDA = 100.0 * (0.01 * totals[key]["baseDA"] + buff["da"] + totalSummon["da"] + 0.01 * armDAup)
            var totalTA = 100.0 * (0.01 * totals[key]["baseTA"] + buff["ta"] + totalSummon["ta"] + 0.01 * armTAup)
            var taRate = (parseFloat(totalTA) >= 100.0) ? 1.0 : 0.01 * parseFloat(totalTA)
            var daRate = (parseFloat(totalDA) >= 100.0) ? 1.0 : 0.01 * parseFloat(totalDA)
            var expectedAttack = 3.0 * taRate + (1.0 - taRate) * (2.0 * daRate + (1.0 - daRate))

            var criticalRatio = (1.0 + skillAmounts["magnaCritical"]["ratio"]) * 0.01 * totals[key]["magnaCritical"] * (1.0 + totalSummon["magna"]) + (1.0 + skillAmounts["normalCritical"]["ratio"]) * 0.01 * totals[key]["normalCritical"] * (1.0 + totalSummon["zeus"]) + 1.0 * (1.0 - 0.01 * totals[key]["normalCritical"] * (1.0 + totalSummon["zeus"]) - 0.01 * totals[key]["magnaCritical"] * (1.0 + totalSummon["magna"]))

            if(typeBonus != 1.5) {
                criticalRatio = 1.0
            }

            var criticalAttack = parseInt(totalAttack * criticalRatio)
            var nazo_number = parseInt(totalAttack * criticalRatio * expectedAttack)

            // 表示用配列
            var coeffs = {};
            coeffs["normal"] = 100.0 * (normalCoeff - 1.0);
            coeffs["normalHaisui"] = 100.0 * (normalHaisuiCoeff - 1.0);
            coeffs["normalKonshin"] = 100.0 * (normalKonshinCoeff - 1.0);
            coeffs["magna"] = 100.0 * (magnaCoeff - 1.0);
            coeffs["magnaHaisui"] = 100.0 * (magnaHaisuiCoeff - 1.0);
            coeffs["unknown"] = 100.0 * (unknownCoeff - 1.0);
            coeffs["unknownHaisui"] = 100.0 * (unknownHaisuiCoeff - 1.0);
            coeffs["other"] = 100.0 * (otherCoeff - 1.0);

            res[key] = {totalAttack: Math.ceil(totalAttack), displayAttack: Math.ceil(summedAttack), totalHP: Math.round(totalHP), displayHP: Math.round(displayHP), remainHP: totals[key]["remainHP"], totalDA: totalDA, totalTA: totalTA, expectedAttack: expectedAttack, criticalAttack: criticalAttack, criticalRatio: criticalRatio, totalExpected: nazo_number, skilldata: coeffs };

        }
        var average = 0.0;
        var crit_average = 0.0;
        var totalExpected_average = 0.0;

        var cnt = 0.0
        for(key in res) {
            if(totals[key]["isConsideredInAverage"]) {
                average += res[key].totalAttack
                crit_average += res[key].criticalAttack
                totalExpected_average += res[key].totalExpected
                cnt += 1.0
            }
        }
        res["Djeeta"]["averageAttack"] = parseInt(average/cnt)
        res["Djeeta"]["averageCriticalAttack"] = parseInt(crit_average/cnt)
        res["Djeeta"]["averageTotalExpected"] = parseInt(totalExpected_average/cnt)
        return res
    },
    calculateOneCombination: function(comb, summon, prof, arml, buff, chara){
        var tempArmList = []
        for(var i = 0; i < arml.length; i++){
            for(var j = 0; j < comb[i]; j++){
                tempArmList.push(arml[i]);
            }
        }
        var baseAttack = (prof.rank > 100) ? 5000 + (parseInt(prof.rank) - 100) * 20 : 1000 + (parseInt(prof.rank)) * 40
        var baseHP = (prof.rank > 100) ? 1400 + (parseInt(prof.rank) - 100) * 4.0 : 600 + (parseInt(prof.rank)) * 8
        var element = (prof.element == undefined) ? "fire" : prof.element
        var djeetaRemainHP = (prof.remainHP != undefined && parseInt(prof.remainHP) < parseInt(prof.hp)) ? 0.01 * parseInt(prof.remainHP) : 0.01 * parseInt(prof.hp)
        var djeetaDA = (prof.DA == undefined) ? 6.5 : parseFloat(prof.DA)
        var djeetaTA = (prof.TA == undefined) ? 3.0 : parseFloat(prof.TA)

        var totals = {"Djeeta": {baseAttack: baseAttack, baseHP: baseHP, baseDA: djeetaDA, baseTA: djeetaTA, remainHP: djeetaRemainHP, armAttack: 0, armHP:0, fav1: "", fav2: "", race: "unknown", type: "none", element: element, HPdebuff: 0.00, magna: 0, magnaHaisui: 0, normal: 0, normalHaisui: 0, normalKonshin: 0, unknown: 0, unknownOther: 0, unknownOtherHaisui: 0, bahaAT: 0, bahaHP: 0, bahaDA: 0, bahaTA: 0, magnaHP: 0, normalHP: 0, unknownHP: 0, bahaHP: 0, normalNite: 0, magnaNite: 0, normalSante: 0, magnaSante: 0, unknownOtherNite: 0, normalCritical: 0, magnaCritical: 0, cosmosBL: 0, isConsideredInAverage: true}};
        for(var i = 0; i < chara.length; i++){
            if(chara[i].name != "") {
                var charaelement = (chara[i].element == undefined) ? "fire" : chara[i].element
                var charaDA = (chara[i].DA == undefined) ? 6.5 : chara[i].DA
                var charaTA = (chara[i].TA == undefined) ? 3.0 : chara[i].TA
                var charaRemainHP = (chara[i].remainHP != undefined && parseInt(chara[i].remainHP) < parseInt(prof.hp)) ? 0.01 * parseInt(chara[i].remainHP) : 0.01 * parseInt(prof.hp)
                var charaConsidered = (chara[i].isConsideredInAverage == undefined) ? true : chara[i].isConsideredInAverage
                totals[chara[i].name] = {baseAttack: parseInt(chara[i].attack), baseHP: parseInt(chara[i].hp), baseDA: parseFloat(charaDA), baseTA: parseFloat(charaTA), remainHP: charaRemainHP, armAttack: 0, armHP:0, fav1: chara[i].favArm, fav2: chara[i].favArm2, race: chara[i].race, type: chara[i].type, element: charaelement, HPdebuff: 0.00, magna: 0, magnaHaisui: 0, normal: 0, normalHaisui: 0, normalKonshin: 0, unknown: 0, unknownOther: 0, unknownOtherHaisui: 0, bahaAT: 0, bahaHP: 0, bahaDA: 0, bahaTA: 0, magnaHP: 0, normalHP: 0, unknownHP: 0, bahaHP: 0, normalNite: 0, magnaNite: 0, normalSante: 0, magnaSante: 0, unknownOtherNite: 0, normalCritical: 0, magnaCritical: 0, cosmosBL: 0, isConsideredInAverage: charaConsidered}
            }
        }

        // cosmos武器があるかどうかを確認しておく
        var cosmosType = '';
        for(var i = 0; i < tempArmList.length; i++){
            var arm = tempArmList[i];
            if(arm.isCosmos) {
                cosmosType = arm.armType
            }
        }

        if(prof.job != undefined) {
            totals["Djeeta"]["fav1"] = Jobs[prof.job].favArm1
            totals["Djeeta"]["fav2"] = Jobs[prof.job].favArm2
            totals["Djeeta"]["type"] = Jobs[prof.job].type
        }

        var index = 0;
        for( key in totals ) {
            index++;
            var isBahaAtIncluded = false; var isBahaAthpIncluded = false;

            for(var i = 0; i < tempArmList.length; i++){
                var arm = tempArmList[i];
                var armSup= 1.0
                var hpSup = 1.0

                if (arm.armType == cosmosType){
                    armSup += 0.3
                    hpSup += 0.3
                }

                if( key == "Djeeta" ) {
                    // for Djeeta
                    if(arm.armType == totals[key]["fav1"] && arm.armType == totals[key]["fav2"]){
                        armSup += (0.2 + buff["zenith1"] + buff["zenith2"])
                        hpSup += 0.2
                    } else if(arm.armType == totals[key]["fav1"]){
                        armSup += (0.2 + buff["zenith1"])
                        hpSup += 0.2
                    } else if(arm.armType == totals[key]["fav2"]){
                        armSup += (0.2 + buff["zenith2"])
                        hpSup += 0.2
                    }
                } else {
                    // for chara
                    if(arm.armType == totals[key]["fav1"]){
                        armSup += 0.2
                        hpSup += 0.2
                    } else if(arm.armType == totals[key]["fav2"]){
                        armSup += 0.2
                        hpSup += 0.2
                    }
                }

                totals[key]["armAttack"] += armSup * parseInt(arm.attack)
                totals[key]["armHP"] += hpSup * parseInt(arm.hp)

                for(var j = 1; j <= 2; j++){
                    var skillname = '';
                    var element = ''; (arm.element == undefined) ? "fire" : arm.element
                    if(j == 1) {
                        skillname = arm.skill1
                        element = (arm.element == undefined) ? "fire" : arm.element
                    } else {
                        skillname = arm.skill2
                        element = (arm.element2 == undefined) ? "fire" : arm.element2
                    }

                    if(skillname != 'non'){
                        // 古いデータ用の対応
                        if(skillname == "bahaAT" || skillname == "bahaFUATHP") {
                            skillname += "-dagger"
                        } else if (skillname == "bahaATHP") {
                            skillname += "-sword"
                        }
                        var stype = skilltypes[skillname].type;
                        var amount = skilltypes[skillname].amount;
                        var slv = parseInt(arm.slv)

                        // mask invalid slv
                        if(slv == 0) slv = 1

                        // バハとコスモスは属性関係なし
                        if(stype == 'bahaAT') {
                            if(!isBahaAtIncluded) {
                                // バハ短剣など
                                if(totals[key]["race"] == "unknown") {
                                    totals[key]["bahaAT"] += skillAmounts["bahaAT"][amount][slv - 1];
                                    isBahaAtIncluded = true;
                                } else {
                                    var bahatype = skillname.split("-")
                                    if( bahamutRelation[bahatype[1]]["type1"] == totals[key]["race"] ) {
                                        totals[key]["bahaAT"] += skillAmounts["bahaAT"][amount][slv - 1];
                                        isBahaAtIncluded = true;
                                    }
                                }
                            }
                        } else if(stype == 'bahaATHP') {
                            if(!isBahaAthpIncluded) {
                                // バハ剣など
                                if(totals[key]["race"] == "unknown") {
                                    totals[key]["bahaAT"] += skillAmounts["bahaAT"][amount][slv - 1];
                                    totals[key]["bahaHP"] += skillAmounts["bahaHP"][amount][slv - 1];
                                    isBahaAthpIncluded = true;
                                } else {
                                    var bahatype = skillname.split("-")
                                    if( bahamutRelation[bahatype[1]]["type1"] == totals[key]["race"] || bahamutRelation[ bahatype[1]]["type2"] == totals[key]["race"] ) {
                                        totals[key]["bahaAT"] += skillAmounts["bahaAT"][amount][slv - 1];
                                        totals[key]["bahaHP"] += skillAmounts["bahaHP"][amount][slv - 1];
                                        isBahaAthpIncluded = true;
                                    }
                                }
                            }
                        } else if(stype == 'bahaFUATHP') {
                            if(totals[key]["race"] == "unknown") {
                                totals[key]["bahaAT"] += skillAmounts["bahaFUATHP"]["AT"][slv - 1];
                                totals[key]["bahaHP"] += skillAmounts["bahaFUATHP"]["HP"][slv - 1];
                            } else {
                                var bahatype = skillname.split("-")
                                if( bahamutFURelation[bahatype[1]]["type1"] == totals[key]["race"] || bahamutFURelation[ bahatype[1]]["type2"] == totals[key]["race"] ) {
                                    totals[key]["bahaAT"] += skillAmounts["bahaFUATHP"]["AT"][slv - 1];
                                    totals[key]["bahaHP"] += skillAmounts["bahaFUATHP"]["HP"][slv - 1];
                                }
                            }
                        } else if(stype == 'bahaFUHP') {
                            if(totals[key]["race"] == "unknown") {
                                totals[key]["bahaHP"] += skillAmounts["bahaFUHP"]["HP"][slv - 1];
                                totals[key]["bahaDA"] += skillAmounts["bahaFUHP"]["DA"][slv - 1];
                                totals[key]["bahaTA"] += skillAmounts["bahaFUHP"]["TA"][slv - 1];
                            } else {
                                var bahatype = skillname.split("-")
                                if( bahamutFURelation[bahatype[1]]["type1"] == totals[key]["race"] || bahamutFURelation[ bahatype[1]]["type2"] == totals[key]["race"] ) {
                                    totals[key]["bahaHP"] += skillAmounts["bahaFUHP"]["HP"][slv - 1];
                                    totals[key]["bahaDA"] += skillAmounts["bahaFUHP"]["DA"][slv - 1];
                                    totals[key]["bahaTA"] += skillAmounts["bahaFUHP"]["TA"][slv - 1];
                                }
                            }
                        } else if(stype == 'cosmos') {
                            // コスモス武器
                            if(skillname == 'cosmosAT' && totals[key]["type"] == "attack") {
                                totals[key]["normal"] += 20.0;
                                totals[key]["HPdebuff"] += 0.40
                            } else if(skillname == 'cosmosDF' && totals[key]["type"] == "defense") {
                                totals[key]["HPdebuff"] -= 0.10
                            } else if(skillname == 'cosmosBL' && totals[key]["type"] == "balance") {
                                totals[key]["cosmosBL"] = 20.0
                            }
                        } else if(totals[key]["element"] == element){
                            // 属性一致してれば計算

                            if(stype == 'normalHaisui' || stype == 'magnaHaisui' || stype == 'unknownOtherHaisui'){
                                // 背水倍率の実装は日比野さんのところのを参照
                                var remainHP = totals[key]["remainHP"]
                                var baseRate = 0.0
                                if(amount == "S") {
                                    // 小
                                    if(slv < 10) {
                                        baseRate = -0.3 + slv * 1.8;
                                    } else {
                                        baseRate = 18 + 3.0 * ((slv - 10) / 5.0)
                                    }
                                } else if ( amount == "M" ){
                                    // 中
                                    if(slv < 10) {
                                        baseRate = -0.4 + slv * 2.4;
                                    } else {
                                        baseRate = 24 + 3.0 * ((slv - 10) / 5.0)
                                    }
                                } else {
                                    // 大
                                    if(slv < 10) {
                                        baseRate = -0.5 + slv * 3.0;
                                    } else {
                                        baseRate = 30 + 3.0 * ((slv - 10) / 5.0)
                                    }
                                }
                                var haisuiBuff =  (baseRate/3.0) * ( 2.0 * remainHP * remainHP - 5.0 * remainHP + 3.0 )
                                totals[key][stype] += haisuiBuff
                            } else if(stype == 'normalKonshin'){
                                var remainHP = totals[key]["remainHP"]
                                var baseRate = 0.0
                                if(amount == "S") {
                                    // 小
                                    if(slv < 10) {
                                        baseRate = -0.3 + slv * 1.8;
                                    } else {
                                        baseRate = 18 + 3.0 * ((slv - 10) / 5.0)
                                    }
                                } else if ( amount == "M" ){
                                    // 中
                                    if(slv < 10) {
                                        baseRate = -0.4 + slv * 2.4;
                                    } else {
                                        baseRate = 24 + 3.0 * ((slv - 10) / 5.0)
                                    }
                                } else {
                                    if(slv <= 10) {
                                        baseRate = 10.0 + slv * 1.0;
                                    } else {
                                        baseRate = 20.0 + ((slv - 10) * 0.6);
                                    }
                                }
                                var konshinBuff = baseRate * remainHP
                                totals[key][stype] += konshinBuff
                            } else if(stype == 'normalKamui') {
                                totals[key]["normal"] += skillAmounts["normal"][amount][slv - 1];
                                totals[key]["normalHP"] += skillAmounts["normalHP"][amount][slv - 1];
                            } else if(stype == 'magnaKamui') {
                                totals[key]["magna"] += skillAmounts["magna"][amount][slv - 1];
                                totals[key]["magnaHP"] += skillAmounts["magnaHP"][amount][slv - 1];
                            } else if(stype == 'normalSetsuna') {
                                totals[key]["normalCritical"] += skillAmounts["normalCritical"][amount][slv - 1];
                                totals[key]["normal"] += skillAmounts["normal"][amount][slv - 1];
                            } else if(stype == 'magnaSetsuna') {
                                totals[key]["magnaCritical"] += skillAmounts["magnaCritical"][amount][slv - 1];
                                totals[key]["magna"] += skillAmounts["magna"][amount][slv - 1];
                            } else if(stype == 'normalKatsumi') {
                                totals[key]["normalCritical"] += skillAmounts["normalCritical"][amount][slv - 1];
                                totals[key]["normalNite"] += skillAmounts["normalNite"][amount][slv - 1];
                            } else if(stype == 'magnaKatsumi') {
                                totals[key]["magnaCritical"] += skillAmounts["magnaCritical"][amount][slv - 1];
                                totals[key]["magnaNite"] += skillAmounts["magnaNite"][amount][slv - 1];
                            } else if(stype == 'normalBoukun') {
                                totals[key]["HPdebuff"] += 0.10
                                totals[key]["normal"] += skillAmounts["normal"][amount][slv - 1];
                            } else if(stype == 'magnaBoukun') {
                                totals[key]["HPdebuff"] += 0.10
                                totals[key]["magna"] += skillAmounts["magna"][amount][slv - 1];
                            } else if(stype == 'unknownOtherBoukun'){
                                totals[key]["HPdebuff"] += 0.07
                                totals[key]["unknown"] += skillAmounts["unknown"][amount][slv - 1];
                            } else if(stype == 'gurenJuin'){
                                if(index == 2){
                                    totals[key]["normal"] += skillAmounts["normal"][amount][slv - 1];
                                }
                            } else {
                                totals[key][stype] += skillAmounts[stype][amount][slv - 1];
                            }
                        }
                    }
                }
            }

            // バハ武器重複上限
            if(totals[key]["bahaAT"] > 50) totals[key]["bahaAT"] = 50
            if(totals[key]["bahaHP"] > 50) totals[key]["bahaHP"] = 50
        }

        var result = []
        for(var i = 0; i < summon.length; i++){
           // 攻撃などの結果を入れた連想配列の配列を作る
           result.push(this.calculateBasedOneSummon(summon[i], prof, buff, totals));
        }

        return result
    },
    calculateResult: function(newprops) {
      var prof = newprops.data.profile; var arml = newprops.data.armlist;
      var summon = newprops.data.summon; var chara = newprops.data.chara;

      if (prof != undefined && arml != undefined && summon != undefined && chara != undefined) {
          var totalBuff = {master: 0.0, masterHP: 0.0, normal: 0.0, element: 0.0, other: 0.0, zenith1: 0.0, zenith2: 0.0, hp: 0.0, da: 0.0, ta: 0.0};

          // 後から追加したパラメータはNaNなことがあるので追加処理
          if(!isNaN(prof.masterBonus)) totalBuff["master"] += 0.01 * parseInt(prof.masterBonus);
          if(!isNaN(prof.masterBonusHP)) totalBuff["masterHP"] += 0.01 * parseInt(prof.masterBonusHP);
          if(!isNaN(prof.hpBuff)) totalBuff["hp"] += 0.01 * parseInt(prof.hpBuff);
          if(!isNaN(prof.daBuff)) totalBuff["da"] += 0.01 * parseInt(prof.daBuff);
          if(!isNaN(prof.taBuff)) totalBuff["ta"] += 0.01 * parseInt(prof.taBuff);
          totalBuff["normal"] += 0.01 * parseInt(prof.normalBuff);
          totalBuff["element"] += 0.01 * parseInt(prof.elementBuff);
          totalBuff["other"] += 0.01 * parseInt(prof.otherBuff);
          totalBuff["zenith1"] += zenith[prof.zenithBonus1];
          totalBuff["zenith2"] += zenith[prof.zenithBonus2];

          // sortKey がNaNでないならそちらを使う、NaNなら総合攻撃力で
          var sortkey = "totalAttack"
          var sortkeyname = "総合攻撃力"
          if(prof.sortKey == prof.sortKey) {
              // バグ対応
              if(prof.sortKey == "[同上]のパーティ平均値") {
                  sortkey = "averageTotalExpected"
                  sortkeyname = "総回技のパーティ平均値"
              } else {
                  sortkey = keyTypes[prof.sortKey]
                  sortkeyname = prof.sortKey
              }
          }

          var combinations = this.calculateCombinations(arml)
          var res = []
          for(var i = 0; i < summon.length; i++){
              res[i] = []
          }
          for(var i = 0; i < combinations.length; i++){
              var oneres = this.calculateOneCombination(combinations[i], summon, prof, arml, totalBuff, chara)
              for(var j = 0; j < summon.length; j++){
                  res[j].push({data: oneres[j], armNumbers: combinations[i]});
              }
          }
          // この時点で summonres は"各召喚石に対応する結果データの連想配列 を並べた配列"の配列になっているはず

          for(var i = 0; i < summon.length; i++){
              if(sortkey == "ATKandHP") {
                  res[i].sort(function(a, b){
                      if((a.data.Djeeta.displayAttack + a.data.Djeeta.displayHP) < (b.data.Djeeta.displayAttack + b.data.Djeeta.displayHP)) return  1;
                      if((a.data.Djeeta.displayAttack + a.data.Djeeta.displayHP) > (b.data.Djeeta.displayAttack + b.data.Djeeta.displayHP)) return -1;
                      return 0;
                  });
              }else {
                  res[i].sort(function(a, b){
                      if(a["data"]["Djeeta"][sortkey] < b["data"]["Djeeta"][sortkey]) return  1;
                      if(a["data"]["Djeeta"][sortkey] > b["data"]["Djeeta"][sortkey]) return -1;
                      return 0;
                  });
              }
              while(res[i].length > 10){ res[i].pop(); }
          }

          return {summon: summon, result: res, sortkeyname: sortkeyname}
      } else {
          return {summon: summon, result: []}
      }

    },
    render: function() {
        res = this.state.result;
        var prof = this.props.data.profile
        var arm = this.props.data.armlist
        var chara = this.props.data.chara
        var summondata = res.summon
        var result = res.result

        switcher = this.state;
        var armnames = []
        for(var i = 0; i < arm.length; i++){
            if(arm[i].considerNumberMax != 0) {
                var armname = arm[i].name;
                if(armname == '') {
                    armname = "武器" + (i + 1).toString()
                }
                armnames.push(armname)
            }
        }

        var tableheader = []
        if(switcher.switchTotalAttack) {
            tableheader.push('総合攻撃力')
        }
        if(switcher.switchATKandHP) {
            tableheader.push('戦力')
        }
        if(switcher.switchCharaAttack) {
            for(var i = 0; i < chara.length; i++){
                if(chara[i].name != "") {
                    tableheader.push(chara[i].name)
                }
            }
        }
        if(switcher.switchDATA) {
            tableheader.push('連続攻撃率(%)')
        }
        if(switcher.switchExpectedAttack) {
            tableheader.push('期待攻撃回数 (期待攻撃力)')
        }
        if(switcher.switchCriticalRatio) {
            tableheader.push('技巧期待値 (期待攻撃力, 平均攻撃力)')
        }
        if(switcher.switchHP) {
            tableheader.push('HP (残HP)')
        }
        if(switcher.switchCharaHP) {
            for(var i = 0; i < chara.length; i++){
                if(chara[i].name != "") {
                    tableheader.push(chara[i].name + "HP")
                }
            }
        }
        if(switcher.switchAverageAttack) {
            tableheader.push('平均攻撃力')
        }
        if(switcher.switchTotalExpected) {
            tableheader.push('総合*回数*技巧')
        }
        if(switcher.switchAverageTotalExpected) {
            tableheader.push('総回技値の平均値')
        }
        if(switcher.switchDamage) {
            tableheader.push("単攻撃ダメージ\n(期待回数*単ダメージ)")
        }

        var remainHPstr = "ジータHP";
        if(prof.remainHP != undefined) {
            remainHPstr += (parseInt(prof.remainHP) < parseInt(prof.hp)) ? prof.remainHP : prof.hp
        } else {
            remainHPstr += prof.hp
        }
        remainHPstr += "%"
        for(var i = 0; i < chara.length; i++){
            if(chara[i].name != "") {
                remainHPstr += ", " + chara[i].name + "HP"
                if(chara[i].remainHP != undefined) {
                    remainHPstr += (parseInt(chara[i].remainHP) < parseInt(prof.hp)) ? chara[i].remainHP : prof.hp
                } else {
                    remainHPstr += prof.hp
                }
                remainHPstr += "%"
            }
        }

        if(_ua.Mobile) {
            return (
                <div className="resultList">
                    表示項目制御:
                    <table className="displayElement">
                    <tbody>
                    <tr>
                        <td><Checkbox inline checked={this.state.switchTotalAttack} onChange={this.handleEvent.bind(this, "switchTotalAttack")} /> 総合攻撃力</td>
                        <td><Checkbox inline checked={this.state.switchATKandHP} onChange={this.handleEvent.bind(this, "switchATKandHP")} /> 戦力</td>
                    </tr><tr>
                        <td><Checkbox inline checked={this.state.switchHP} onChange={this.handleEvent.bind(this, "switchHP")} /> HP</td>
                        <td><Checkbox inline checked={this.state.switchDATA} onChange={this.handleEvent.bind(this, "switchDATA")} /> 連続攻撃率</td>
                    </tr><tr>
                        <td><Checkbox inline checked={this.state.switchExpectedAttack} onChange={this.handleEvent.bind(this, "switchExpectedAttack")} /> 期待攻撃回数</td>
                        <td><Checkbox inline checked={this.state.switchCriticalRatio} onChange={this.handleEvent.bind(this, "switchCriticalRatio")} /> 技巧期待値</td>
                    </tr><tr>
                        <td><Checkbox inline checked={this.state.switchCharaAttack} onChange={this.handleEvent.bind(this, "switchCharaAttack")} /> キャラ攻撃力</td>
                        <td><Checkbox inline checked={this.state.switchCharaHP} onChange={this.handleEvent.bind(this, "switchCharaHP")} /> キャラHP</td>
                    </tr><tr>
                        <td><Checkbox inline checked={this.state.switchAverageAttack} onChange={this.handleEvent.bind(this, "switchAverageAttack")} /> パーティ平均攻撃力</td>
                        <td><Checkbox inline checked={this.state.switchTotalExpected} onChange={this.handleEvent.bind(this, "switchTotalExpected")} /> 総合*期待回数*技巧期待値</td>
                    </tr><tr>
                        <td><Checkbox inline checked={this.state.switchAverageTotalExpected} onChange={this.handleEvent.bind(this, "switchAverageTotalExpected")} /> 総回技のパーティ平均値</td>
                        <td><Checkbox inline checked={this.state.switchDamage} onChange={this.handleEvent.bind(this, "switchDamage")} /> 予想ダメージ</td>
                    </tr>
                    </tbody>
                    </table>
                    <br/>
                    動作制御:
                    <Checkbox inline checked={this.state.disableAutoResultUpdate} onChange={this.handleEvent.bind(this, "disableAutoResultUpdate")} /> 自動更新を切る

                    <div className="divright"><h3>{remainHPstr}</h3></div>
                    <hr />
                    {summondata.map(function(s, summonindex) {
                        var selfSummonHeader = ""
                        if(s.selfSummonType == "odin"){
                            selfSummonHeader = "属性攻" + s.selfSummonAmount + "キャラ攻" + s.selfSummonAmount2
                        } else {
                            selfSummonHeader = summonElementTypes[s.selfElement].name + summonTypes[s.selfSummonType] + s.selfSummonAmount
                        }

                        var friendSummonHeader = ""
                        if(s.friendSummonType == "odin"){
                            friendSummonHeader = "属性攻" + s.friendSummonAmount + "キャラ攻" + s.friendSummonAmount2
                        } else {
                            friendSummonHeader = summonElementTypes[s.friendElement].name + summonTypes[s.friendSummonType] + s.friendSummonAmount
                        }

                        return(
                            <div key={summonindex} className="result">
                                <h2> 結果{summonindex + 1}: {selfSummonHeader} + {friendSummonHeader} ({res.sortkeyname})</h2>
                                <table>
                                <thead className="result">
                                <tr>
                                    <th>順位</th>
                                    {tableheader.map(function(m, ind){ return <th key={ind} >{m}</th>; })}
                                    {
                                        armnames.map(function(m, ind){
                                        if(ind == 0) {
                                            return <th key={ind} className="resultFirst">{m}</th>;
                                        } else {
                                            return <th key={ind} className="resultList">{m}</th>;
                                        }})
                                    }
                                </tr>
                                </thead>
                                <Result key={summonindex} data={result[summonindex]} switcher={switcher} arm={arm} prof={prof}/>
                                </table>
                            </div>
                        );
                    })}
                </div>
            );

        } else {
            return (
                <div className="resultList">
                    表示項目制御:
                    <table className="displayElement"><tbody>
                    <tr>
                        <td><Checkbox inline checked={this.state.switchTotalAttack} onChange={this.handleEvent.bind(this, "switchTotalAttack")} /> 総合攻撃力</td>
                        <td><Checkbox inline checked={this.state.switchATKandHP} onChange={this.handleEvent.bind(this, "switchATKandHP")} /> 戦力</td>
                        <td><Checkbox inline checked={this.state.switchHP} onChange={this.handleEvent.bind(this, "switchHP")} /> HP</td>
                        <td><Checkbox inline checked={this.state.switchDATA} onChange={this.handleEvent.bind(this, "switchDATA")} /> 連続攻撃率</td>
                        <td><Checkbox inline checked={this.state.switchExpectedAttack} onChange={this.handleEvent.bind(this, "switchExpectedAttack")} /> 期待攻撃回数</td>
                        <td><Checkbox inline checked={this.state.switchCriticalRatio} onChange={this.handleEvent.bind(this, "switchCriticalRatio")} /> 技巧期待値</td>
                    </tr><tr>
                        <td><Checkbox inline checked={this.state.switchCharaAttack} onChange={this.handleEvent.bind(this, "switchCharaAttack")} /> キャラ攻撃力</td>
                        <td><Checkbox inline checked={this.state.switchCharaHP} onChange={this.handleEvent.bind(this, "switchCharaHP")} /> キャラHP</td>
                        <td><Checkbox inline checked={this.state.switchAverageAttack} onChange={this.handleEvent.bind(this, "switchAverageAttack")} /> パーティ平均攻撃力</td>
                        <td><Checkbox inline checked={this.state.switchTotalExpected} onChange={this.handleEvent.bind(this, "switchTotalExpected")} /> 総合*期待回数*技巧期待値</td>
                        <td><Checkbox inline checked={this.state.switchAverageTotalExpected} onChange={this.handleEvent.bind(this, "switchAverageTotalExpected")} /> 総回技のパーティ平均値</td>
                        <td><Checkbox inline checked={this.state.switchDamage} onChange={this.handleEvent.bind(this, "switchDamage")} /> 予想ダメージ</td>
                    </tr>
                    </tbody></table>
                    <br/>
                    動作制御:
                    <Checkbox inline className="autoupdate" checked={this.state.disableAutoResultUpdate} onChange={this.handleEvent.bind(this, "disableAutoResultUpdate")} /> 自動更新を切る

                    <div className="divright"><h3>{remainHPstr}</h3></div>
                    <hr />
                    {summondata.map(function(s, summonindex) {
                        var selfSummonHeader = ""
                        if(s.selfSummonType == "odin"){
                            selfSummonHeader = "属性攻" + s.selfSummonAmount + "キャラ攻" + s.selfSummonAmount2
                        } else {
                            selfSummonHeader = summonElementTypes[s.selfElement].name + summonTypes[s.selfSummonType] + s.selfSummonAmount
                        }

                        var friendSummonHeader = ""
                        if(s.friendSummonType == "odin"){
                            friendSummonHeader = "属性攻" + s.friendSummonAmount + "キャラ攻" + s.friendSummonAmount2
                        } else {
                            friendSummonHeader = summonElementTypes[s.friendElement].name + summonTypes[s.friendSummonType] + s.friendSummonAmount
                        }

                        return(
                            <div key={summonindex} className="result">
                                <h2> 結果{summonindex + 1}: {selfSummonHeader} + {friendSummonHeader} ({res.sortkeyname})</h2>
                                <table>
                                <thead className="result">
                                <tr>
                                    <th>順位</th>
                                    {tableheader.map(function(m, ind){ return <th key={ind}>{m}</th>; })}
                                    {
                                        armnames.map(function(m, ind){
                                        if(ind == 0) {
                                            return <th key={ind} className="resultFirst">{m}</th>;
                                        } else {
                                            return <th key={ind} className="resultList">{m}</th>;
                                        }})
                                    }
                                </tr>
                                </thead>
                                <Result key={summonindex} data={result[summonindex]} switcher={switcher} arm={arm} prof={prof}/>
                                </table>
                            </div>
                        );
                    })}
                </div>
            );
        }
    }
});

var Result = React.createClass({
    render: function() {
        var sw = this.props.switcher;
        var arm = this.props.arm;
        var prof = this.props.prof;
        return (
            <tbody className="result">
                {this.props.data.map(function(m, rank) {
                    var skillstr = "";
                    for(key in m.data){
                        var skilldata = m.data[key].skilldata

                        if(key == "Djeeta") {
                            skillstr += "ジータ: "
                        } else {
                            skillstr += key + ": "
                        }

                        if(skilldata.normal != 0.0) {skillstr += "攻刃" + skilldata.normal.toFixed(1); skillstr += "% ";}
                        if(skilldata.normalHaisui != 0.0) {skillstr += "攻刃背水" + skilldata.normalHaisui.toFixed(1); skillstr += "% ";}
                        if(skilldata.normalKonshin != 0.0) {skillstr += "攻刃渾身" + skilldata.normalKonshin.toFixed(1); skillstr += "% ";}
                        if(skilldata.magna != 0.0) {skillstr += "マグナ" + skilldata.magna.toFixed(1); skillstr += "% ";}
                        if(skilldata.magnaHaisui != 0.0) {skillstr += "マグナ背水" + skilldata.magnaHaisui.toFixed(1); skillstr += "% ";}
                        if(skilldata.unknown != 0.0) {skillstr += "アンノウン" + skilldata.unknown.toFixed(1); skillstr += "% ";}
                        if(skilldata.unknownHaisui != 0.0) {skillstr += "アンノウン背水" + skilldata.unknownHaisui.toFixed(1); skillstr += "% ";}
                        if(skilldata.other != 0.0) {skillstr += "その他枠" + skilldata.other.toFixed(1); skillstr += "% ";}

                        skillstr += "\n"
                    }

                    var tablebody = []
                    if(sw.switchTotalAttack) {
                        tablebody.push(m.data.Djeeta.totalAttack)
                    }
                    if(sw.switchATKandHP) {
                        var senryoku = parseInt(m.data.Djeeta.displayAttack) + parseInt(m.data.Djeeta.displayHP)
                        tablebody.push(senryoku + ' (' + parseInt(m.data.Djeeta.displayAttack) + ' + ' + parseInt(m.data.Djeeta.displayHP) + ')')
                    }
                    if(sw.switchCharaAttack) {
                        for(key in m.data){
                            if(key != "Djeeta") {
                                tablebody.push(m.data[key].totalAttack)
                            }
                        }
                    }
                    if(sw.switchDATA) {
                        tablebody.push('DA:' + m.data.Djeeta.totalDA.toFixed(1) + '%, TA: ' + m.data.Djeeta.totalTA.toFixed(1) + '%')
                    }
                    if(sw.switchExpectedAttack) {
                        var expectedAttack = parseInt(m.data.Djeeta.expectedAttack * m.data.Djeeta.totalAttack)
                        tablebody.push(m.data.Djeeta.expectedAttack.toFixed(2) + "(" + expectedAttack + ")")
                    }
                    if(sw.switchCriticalRatio) {
                        tablebody.push(m.data.Djeeta.criticalRatio.toFixed(4) + "(" + m.data.Djeeta.criticalAttack + ", " + m.data.Djeeta.averageCriticalAttack + ")")
                    }
                    if(sw.switchHP) {
                        tablebody.push(m.data.Djeeta.totalHP + "(" + parseInt(m.data.Djeeta.totalHP * m.data.Djeeta.remainHP) + ")")
                    }
                    if(sw.switchCharaHP) {
                        for(key in m.data){
                            if(key != "Djeeta") {
                                tablebody.push(m.data[key].totalHP + "(" + parseInt(m.data[key].totalHP * m.data[key].remainHP) + ")")
                            }
                        }
                    }
                    if(sw.switchAverageAttack) {
                        tablebody.push(parseInt(m.data.Djeeta.averageAttack))
                    }
                    if(sw.switchTotalExpected) {
                        tablebody.push(m.data.Djeeta.totalExpected)
                    }
                    if(sw.switchAverageTotalExpected) {
                        tablebody.push(m.data.Djeeta.averageTotalExpected)
                    }
                    if(sw.switchDamage) {
                        var def = (prof.enemyDefense == undefined) ? 10 : prof.enemyDefense
                        var damage = m.data.Djeeta.totalAttack / def
                        var overedDamage = 0
                        // 補正1
                        if(damage > 300000) {
                            overedDamage = 0.70 * (damage - 300000)
                            damage = 300000 + overedDamage
                        }
                        // 補正2
                        if(damage > 350000) {
                            overedDamage = 0.40 * (damage - 350000)
                            damage = 350000 + overedDamage
                        }
                        // 補正3
                        if(damage > 400000) {
                            overedDamage = 0.10 * (damage - 400000)
                            damage = 400000 + overedDamage
                        }
                        // 補正4
                        if(damage > 450000) {
                            overedDamage = 0.01 * (damage - 450000)
                            damage = 450000 + overedDamage
                        }

                        var expectedDamage = m.data.Djeeta.expectedAttack * damage
                        tablebody.push(parseInt(damage) + "(" + parseInt(expectedDamage) + ")")
                    }
                    return (
                        <tr className="result" title={skillstr} key={rank + 1}>
                            <td>{rank + 1}</td>
                            {tablebody.map(function(am, ind){
                                return (<td key={ind} >{am}</td>);
                            })}
                            {m.armNumbers.map(function(am, ind){
                                if(arm[ind].considerNumberMax != 0) {
                                    if(ind == 0){
                                        return (<td key={ind} className="resultFirst">{am} 本</td>);
                                    } else {
                                        return (<td key={ind} className="resultList">{am} 本</td>);
                                    }
                                }
                             })}
                        </tr>
                    );
                })}
            </tbody>
        );
    }
});

// ArmList has a number of Arm objects.
var ArmList = React.createClass({
    getInitialState: function() {
        var al = []
        for(var i = 0; i < this.props.armNum; i++) al[i] = []

        var arms = []
        for(var i=0; i < this.props.armNum; i++) { arms.push(i); }

        return {
            // 武器リストをRootに渡すための連想配列
            alist: al,
            // 武器リストを管理するための連想配列
            // indexによって保存データとの対応を取り、
            // その値をkeyとして使うことでコンポーネントの削除などを行う
            arms: arms,
            defaultElement: "fire",
        };
    },
    updateArmNum: function(num) {
        var arms = this.state.arms
        if(arms.length < num) {
            var maxvalue = Math.max.apply(null, arms)
            for(var i = 0; i < (num - arms.length); i++){
                arms.push(i + maxvalue + 1)
            }
        } else {
            // ==の場合は考えなくてよい (問題がないので)
            while(arms.length > num){
                arms.pop();
            }
        }
        this.setState({arms: arms})
    },
    componentWillReceiveProps: function(nextProps) {
        // iPadなどで一度数字が消された場合NaNになる
        if(!isNaN(parseInt(nextProps.armNum))) {
            // 今回のarmNumが小さくなったらalistも切り落とす (前回がNaNの場合も行う)
            if (isNaN(parseInt(this.props.armNum)) || (parseInt(nextProps.armNum) < parseInt(this.props.armNum))) {
                var newalist = this.state.alist;
                while(newalist.length > nextProps.armNum) {
                    newalist.pop();
                }
                this.setState({alist: newalist})
            }
            this.updateArmNum(nextProps.armNum)
        }
    },
    handleOnCopy: function(id, keyid, state) {
        var newarms = this.state.arms
        var maxvalue = Math.max.apply(null, newarms)

        newarms.splice(id + 1, 0, maxvalue + 1)
        newarms.pop();
        this.setState({arms: newarms})

        // newDataにコピー対象のstateを入れておいて、componentDidMountで読み出されるようにする
        if(!("armlist" in newData)) {
            // もしnewDataが更新される前だったらkeyを作っておく
            newData["armlist"] = {}
        }
        newData.armlist[id + 1] = state;

        var newalist = this.state.alist;
        newalist.splice(id + 1, 0, state)
        newalist.pop();
        this.setState({alist: newalist})

        // Root へ変化を伝搬
        this.props.onChange(newalist);
    },
    handleOnRemove: function(id, keyid, state) {
        var newarms = this.state.arms
        var maxvalue = Math.max.apply(null, newarms)

        // 該当の "key" を持つものを削除する
        newarms.splice(this.state.arms.indexOf(keyid), 1)
        // 1個補充
        newarms.push(maxvalue + 1)
        this.setState({arms: newarms})

        // newDataにinitial stateを入れておいて、componentDidMountで読み出されるようにする
        if(!("armlist" in newData)) {
            newData["armlist"] = {}
        }
        newData.armlist[newarms.length - 1] = state;

        var newalist = this.state.alist;
        // 削除した分をalistからも削除
        newalist.splice(id, 1)
        // 1個補充
        newalist.push(state)
        this.setState({alist: newalist})

        // Root へ変化を伝搬
        this.props.onChange(newalist);
    },
    handleOnChange: function(key, state){
        var newalist = this.state.alist;
        newalist[key] = state;
        this.setState({alist: newalist})
        this.props.onChange(newalist);
    },
    handleEvent: function(key, e) {
      var newState = this.state
      newState[key] = e.target.value
      this.setState(newState)
    },
    render: function(){
        var dataName = this.props.dataName;
        var arms = this.state.arms;
        var hChange = this.handleOnChange;
        var hRemove = this.handleOnRemove;
        var hCopy = this.handleOnCopy;
        var defaultElement = this.state.defaultElement;

        if(_ua.Mobile) {
            return (
                <div className="armList">
                    [属性一括変更]<FormControl componentClass="select" className="element" value={this.state.defaultElement} onChange={this.handleEvent.bind(this, "defaultElement")} > {select_elements} </FormControl>
                    {arms.map(function(arm, ind) {
                        return <Arm key={arm} onChange={hChange} onRemove={hRemove} onCopy={hCopy} id={ind} keyid={arm} dataName={dataName} defaultElement={defaultElement} />;
                    })}
                </div>
            );
        } else {
            return (
                <div className="armList">
                    <table>
                    <thead>
                    <tr>
                        <th>武器名*</th>
                        <th className="atkhp">攻撃力*</th>
                        <th className="atkhp">HP</th>
                        <th className="select">武器種*</th>
                        <th>コスモス</th>
                        <th>スキル*   [属性一括変更]<FormControl componentClass="select" className="element" value={this.state.defaultElement} onChange={this.handleEvent.bind(this, "defaultElement")} > {select_elements} </FormControl></th>
                        <th className="select">SLv*</th>
                        <th className="consider">本数*</th>
                        <th className="system">操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    {arms.map(function(arm, ind) {
                        return <Arm key={arm} onChange={hChange} onRemove={hRemove} onCopy={hCopy} id={ind} keyid={arm} dataName={dataName} defaultElement={defaultElement} />;
                    })}
                    </tbody>
                    </table>
                </div>
            )
        };
    }
});

// Arm is a fundamental object corresponding one arm.
var Arm = React.createClass({
    getInitialState: function() {
        return {
                name: '',
                attack: 0,
                hp: 0,
                armType: 'sword',
                isCosmos: 0,
                skill1: 'non',
                skill2: 'non',
                slv: 1,
                considerNumberMin: 0,
                considerNumberMax: 1,
                element: 'fire',
                element2: 'fire',
        };
    },
    componentWillReceiveProps: function(nextProps){
        // only fired on Data Load
        if(nextProps.dataName != this.props.dataName) {
            var newState = newData.armlist[this.props.id]
            this.setState(newState);
            this.props.onChange(this.props.id, newState);
        }

        if(nextProps.defaultElement != this.props.defaultElement) {
            var newState = this.state
            newState["element"] = nextProps.defaultElement
            newState["element2"] = nextProps.defaultElement
            this.setState(newState);
            this.props.onChange(this.props.id, newState);
        }
    },
    componentDidMount: function(){
       var state = this.state;

       // もし newData に自分に該当するキーがあるなら読み込む
       // (データロード時に新しく増えたコンポーネント用)
       var armlist = newData.armlist
       if( armlist != undefined && this.props.id in armlist ){
           state = armlist[this.props.id]
           this.setState(state)
       }
       // 初期化後 state を 上の階層に渡しておく
       // armList では onChange が勝手に上に渡してくれるので必要なし
       this.props.onChange(this.props.id, state);
    },
    handleEvent: function(key, e) {
        var newState = this.state
        if(key == "isCosmos") {
            // if already checked
            if( newState[key] == 1 ) {
                newState[key] = 0
                // コスモススキルが設定されていたら外す
                if( newState["skill1"].search(/cosmos/) >= 0){
                    newState["skill1"] = "non"
                }
                if( newState["skill2"].search(/cosmos/) >= 0){
                    newState["skill2"] = "non"
                }
            // or else
            } else {
                newState[key] = 1
            }

        } else if(key == "considerNumberMin"){
            if (parseInt(e.target.value) > parseInt(this.state.considerNumberMax)) {
                newState["considerNumberMax"] = parseInt(e.target.value)
            }
            newState[key] = parseInt(e.target.value)
        } else if(key == "considerNumberMax") {
            if (parseInt(e.target.value) < parseInt(this.state.considerNumberMin)) {
                newState["considerNumberMin"] = parseInt(e.target.value)
            }
            newState[key] = parseInt(e.target.value)
        } else if( (key == "skill1" || key == "skill2") && (e.target.value.search(/cosmos/) >= 0)){
            if( newState["isCosmos"] == 1) {
                if( (key == "skill1" && newState["skill2"].search(/cosmos/) < 0) || (key == "skill2" && newState["skill1"].search(/cosmos/) < 0)) {
                    // 既にcosmosスキルが設定されていない場合のみ設定可能
                    newState[key] = e.target.value
                } else {
                    alert("コスモススキルは一種のみ設定可能です。")
                }
            } else {
                newState[key] = e.target.value
                newState["isCosmos"] = 1
            }
        } else { newState[key] = e.target.value }

        this.setState(newState)
        this.props.onChange(this.props.id, newState)
    },
    clickRemoveButton: function(e) {
        this.props.onRemove(this.props.id, this.props.keyid, this.getInitialState())
    },
    clickCopyButton: function(e, state) {
        this.props.onCopy(this.props.id, this.props.keyid, this.state)
    },
    render: function(){
        if(_ua.Mobile) {
            return (
                <table>
                <tbody>
                    <tr><th>武器名</th><td><FormControl type="text" placeholder="武器名" value={this.state.name} onChange={this.handleEvent.bind(this, "name")} /></td></tr>
                    <tr><th>攻撃力</th><td className="atkhp"><FormControl type="number" placeholder="0以上の整数" min="0" value={this.state.attack} onChange={this.handleEvent.bind(this, "attack")} /></td></tr>
                    <tr><th>HP</th><td className="atkhp"><FormControl type="number" placeholder="0以上の整数" min="0" value={this.state.hp} onChange={this.handleEvent.bind(this, "hp")} /></td></tr>
                    <tr><th>種類</th><td className="select"><FormControl componentClass="select" value={this.state.armType} onChange={this.handleEvent.bind(this, "armType")} > {select_armtypes} </FormControl></td></tr>
                    <tr><th>コスモス武器?</th><td><Checkbox inline checked={this.state.isCosmos} onChange={this.handleEvent.bind(this, "isCosmos")} /></td></tr>
                    <tr><th>スキル</th>
                    <td>
                        <FormControl componentClass="select" className="element" value={this.state.element} onChange={this.handleEvent.bind(this, "element")} > {select_elements} </FormControl>
                        <FormControl componentClass="select" className="skill" value={this.state.skill1} onChange={this.handleEvent.bind(this, "skill1")} > {select_skills}</FormControl><br/>
                        <FormControl componentClass="select" className="element" value={this.state.element2} onChange={this.handleEvent.bind(this, "element2")} > {select_elements} </FormControl>
                        <FormControl componentClass="select" className="skill" value={this.state.skill2} onChange={this.handleEvent.bind(this, "skill2")} > {select_skills}</FormControl>
                    </td></tr>
                    <tr><th>スキルレベル</th><td className="select"><FormControl componentClass="select" value={this.state.slv} onChange={this.handleEvent.bind(this, "slv")} > {select_slv} </FormControl></td></tr>
                    <tr><th>考慮本数</th><td className="consider">
                        min: <FormControl componentClass="select" className="consider" value={this.state.considerNumberMin} onChange={this.handleEvent.bind(this, "considerNumberMin")} > {select_consider} </FormControl><br/>
                        max: <FormControl componentClass="select" className="consider" value={this.state.considerNumberMax} onChange={this.handleEvent.bind(this, "considerNumberMax")} > {select_consider} </FormControl>
                    </td></tr>
                    <tr><th>操作</th>
                    <td>
                        <ButtonGroup>
                            <Button bsStyle="primary" onClick={this.clickRemoveButton}>削除</Button>
                            <Button bsStyle="primary" onClick={this.clickCopyButton}>コピー</Button>
                        </ButtonGroup>
                    </td></tr>
                </tbody>
                </table>
            );
        } else {
            return (
                <tr>
                    <td><FormControl type="text" placeholder="武器名" value={this.state.name} onChange={this.handleEvent.bind(this, "name")} /></td>
                    <td className="atkhp"><FormControl type="number" placeholder="0以上の整数" min="0" value={this.state.attack} onChange={this.handleEvent.bind(this, "attack")} /></td>
                    <td className="atkhp"><FormControl type="number" placeholder="0以上の整数" min="0" value={this.state.hp} onChange={this.handleEvent.bind(this, "hp")} /></td>
                    <td className="select"><FormControl componentClass="select" value={this.state.armType} onChange={this.handleEvent.bind(this, "armType")} > {select_armtypes} </FormControl></td>
                    <td><Checkbox inline checked={this.state.isCosmos} onChange={this.handleEvent.bind(this, "isCosmos")} /></td>
                    <td>
                        <FormControl componentClass="select" className="element" value={this.state.element} onChange={this.handleEvent.bind(this, "element")} > {select_elements} </FormControl>
                        <FormControl componentClass="select" className="skill" value={this.state.skill1} onChange={this.handleEvent.bind(this, "skill1")} > {select_skills}</FormControl><br/>
                        <FormControl componentClass="select" className="element" value={this.state.element2} onChange={this.handleEvent.bind(this, "element2")} > {select_elements} </FormControl>
                        <FormControl componentClass="select" className="skill" value={this.state.skill2} onChange={this.handleEvent.bind(this, "skill2")} > {select_skills}</FormControl>
                    </td>
                    <td className="select"><FormControl componentClass="select" value={this.state.slv} onChange={this.handleEvent.bind(this, "slv")} > {select_slv} </FormControl></td>
                    <td className="consider">
                        min: <FormControl componentClass="select" className="consider" value={this.state.considerNumberMin} onChange={this.handleEvent.bind(this, "considerNumberMin")} > {select_consider} </FormControl><br/>
                        max: <FormControl componentClass="select" className="consider" value={this.state.considerNumberMax} onChange={this.handleEvent.bind(this, "considerNumberMax")} > {select_consider} </FormControl>
                    </td>
                    <td className="system">
                        <ButtonGroup vertical>
                            <Button bsStyle="primary" block onClick={this.clickRemoveButton}>削除</Button>
                            <Button bsStyle="primary" block onClick={this.clickCopyButton}>コピー</Button>
                        </ButtonGroup>
                    </td>
                </tr>
            );
        }
    }
});

var RegisteredArm = React.createClass({
    render: function() {
    },
});

var Profile = React.createClass({
    getDefaultProps() {
        var zenithBonuses = Object.keys(zenith).map(function(opt){ return <option value={opt} key={opt}>{opt}</option> });
        var ktypes = Object.keys(keyTypes).map(function(opt){ return <option value={opt} key={opt}>{opt}</option> });
        var alljobs = Object.keys(Jobs).map(function(opt){ return <option value={opt} key={opt}>{Jobs[opt].name}</option> });

        return {
            zenithBonuses: zenithBonuses,
            keyTypes: ktypes,
            alljobs: alljobs,
        };
    },
    componentDidMount: function(){
       // 初期化後 state を 上の階層に渡しておく
       this.props.onChange(this.state);
    },
    componentWillReceiveProps: function(nextProps){
        // only fired on Data Load
        if(nextProps.dataName != this.props.dataName) {
            var newState = newData.profile
            this.setState(newState);
            this.props.onChange(newState);
        }
    },
    getInitialState: function() {
        return {
            rank: 1,
            zenithAttackBonus: 3000,
            zenithHPBonus: 1000,
            masterBonus: 0,
            masterBonusHP: 0,
            normalBuff: 0,
            elementBuff: 0,
            otherBuff: 0,
            hpBuff: 0,
            daBuff: 0,
            taBuff: 0,
            hp: 100,
            remainHP: 100,
            zenithBonus1: "無し",
            zenithBonus2: "無し",
            enemyElement: "fire",
            enemyDefense: 10,
            job: "none",
            armNum: 5,
            summonNum: 2,
            sortKey: "総合攻撃力",
            element: "fire",
            DA: 6.5,
            TA: 3.0,
        };
    },
    handleEvent: function(key, e) {
      var newState = this.state
      newState[key] = e.target.value
      if(key == "job") {
          newState.DA = Jobs[e.target.value].DaBonus
          newState.TA = Jobs[e.target.value].TaBonus
      }
      this.setState(newState)
      this.props.onChange(newState)
    },
    handleSummonNumChange: function(e) {
      this.setState({summonNum: e.target.value});
      this.props.onSummonNumChange(e.target.value);
    },
    handleArmNumChange: function(e) {
      if(e.target.value < 20) {
          this.setState({armNum: e.target.value});
          this.props.onArmNumChange(e.target.value);
      }
    },
    render: function() {
        if(_ua.Mobile) {
            return (
                <div className="profile">
                    <h3> ジータちゃん情報 (*: 推奨入力項目)</h3>
                    <table>
                        <tbody>
                        <tr>
                            <th className="prof">Rank*</th>
                            <th className="prof">ゼニス攻撃力*</th>
                            <th className="prof">ゼニスHP</th>
                            <th className="prof">マスボ<br/>ATK(%)*</th>
                        </tr>
                        <tr>
                            <td><FormControl type="number"  min="0" max="175" value={this.state.rank} onChange={this.handleEvent.bind(this, "rank")}/></td>
                            <td><FormControl componentClass="select" value={this.state.zenithAttackBonus} onChange={this.handleEvent.bind(this, "zenithAttackBonus")} > {select_zenithAttack} </FormControl></td>
                            <td><FormControl componentClass="select" value={this.state.zenithHPBonus} onChange={this.handleEvent.bind(this, "zenithHPBonus")} > {select_zenithHP} </FormControl></td>
                            <td><FormControl type="number" min="0" max="100" value={this.state.masterBonus} onChange={this.handleEvent.bind(this, "masterBonus")}/></td>
                        </tr>
                        <tr>
                            <th className="prof">マスボ<br/>HP(%)*</th>
                            <th className="prof">ジョブ*</th>
                            <th className="prof">残HP(%)<br/>(ジータのみ)</th>
                        </tr>
                        <tr>
                            <td><FormControl type="number" min="0" max="100" value={this.state.masterBonusHP} onChange={this.handleEvent.bind(this, "masterBonusHP")}/></td>
                            <td><FormControl componentClass="select" value={this.state.job} onChange={this.handleEvent.bind(this, "job")} > {this.props.alljobs} </FormControl></td>
                            <td><FormControl type="number" min="0" max="100" value={this.state.remainHP} onChange={this.handleEvent.bind(this, "remainHP")}/></td>
                        </tr>
                        <tr>
                            <th className="prof">ジータ属性*</th>
                            <th className="prof">敵の属性*</th>
                            <th className="prof">武器ゼニス1</th>
                            <th className="prof">武器ゼニス2</th>
                        </tr>
                        <tr>
                            <td><FormControl componentClass="select" value={this.state.element} onChange={this.handleEvent.bind(this, "element")}> {select_elements} </FormControl></td>
                            <td><FormControl componentClass="select" value={this.state.enemyElement} onChange={this.handleEvent.bind(this, "enemyElement")}> {select_elements} </FormControl></td>
                            <td><FormControl componentClass="select" value={this.state.zenithBonus1} onChange={this.handleEvent.bind(this, "zenithBonus1")} > {this.props.zenithBonuses} </FormControl></td>
                            <td><FormControl componentClass="select" value={this.state.zenithBonus2} onChange={this.handleEvent.bind(this, "zenithBonus2")} > {this.props.zenithBonuses} </FormControl></td>
                        </tr>
                        <tr>
                            <th className="prof">基礎DA率</th>
                            <th className="prof">基礎TA率</th>
                            <th className="prof">敵防御固有値(仮)</th>
                        </tr>
                        <tr>
                            <td><FormControl type="number" min="0" step="0.1" value={this.state.DA} onChange={this.handleEvent.bind(this, "DA")}/></td>
                            <td><FormControl type="number" min="0" step="0.1" value={this.state.TA} onChange={this.handleEvent.bind(this, "TA")}/></td>
                            <td><FormControl type="number" min="0" step="0.5" value={this.state.enemyDefense} onChange={this.handleEvent.bind(this, "enemyDefense")}/></td>
                        </tr>
                        </tbody>
                    </table>
                    ※ゼニスパーク分の攻撃ボーナスと、ジョブ攻撃ボーナスを分離し、 ジョブ分は自動で反映されるように変更しました。<br/>
                    <span>
                    {Jobs[this.state.job].name}:
                    得意 [{armTypes[Jobs[this.state.job].favArm1]}, {armTypes[Jobs[this.state.job].favArm2]}],
                    {jobTypes[Jobs[this.state.job].type]}タイプ,
                    攻撃ボーナス {Jobs[this.state.job].atBonus},
                    HPボーナス {Jobs[this.state.job].hpBonus},
                    攻刃バフ {Jobs[this.state.job].kouzinBonus},
                    守護バフ {Jobs[this.state.job].shugoBonus},
                    基礎DA率 {Jobs[this.state.job].DaBonus}%,
                    基礎TA率 {Jobs[this.state.job].TaBonus}%
                    </span>

                    <h3> パーティ全体への効果 (%表記)</h3>
                    <table>
                        <tbody>
                        <tr>
                            <th className="buff">通常バフ</th>
                            <th className="buff">属性バフ</th>
                            <th className="buff">その他バフ</th>
                            <th className="buff">HPバフ</th>
                        </tr><tr>
                            <td><FormControl type="number"  min="0" value={this.state.normalBuff} onChange={this.handleEvent.bind(this, "normalBuff")}/></td>
                            <td><FormControl type="number"  min="0" value={this.state.elementBuff} onChange={this.handleEvent.bind(this, "elementBuff")}/></td>
                            <td><FormControl type="number"  min="0" value={this.state.otherBuff} onChange={this.handleEvent.bind(this, "otherBuff")}/></td>
                            <td><FormControl type="number"  min="0" value={this.state.hpBuff} onChange={this.handleEvent.bind(this, "hpBuff")}/></td>
                        </tr><tr>
                            <th className="buff">DAバフ</th>
                            <th className="buff">TAバフ</th>
                            <th className="buff">残HP(%)</th>
                        </tr><tr>
                            <td><FormControl type="number"  min="0" max="100" value={this.state.daBuff} onChange={this.handleEvent.bind(this, "daBuff")}/></td>
                            <td><FormControl type="number"  min="0" max="100" value={this.state.taBuff} onChange={this.handleEvent.bind(this, "taBuff")}/></td>
                            <td><FormControl type="number"  min="0" max="100" value={this.state.hp} onChange={this.handleEvent.bind(this, "hp")}/></td>
                        </tr><tr>
                            <th className="buff">武器種類数*</th>
                            <th className="buff">召喚石の組数*</th>
                            <th className="buff">優先する項目</th>
                        </tr>
                        <tr>
                            <td><FormControl componentClass="select" value={this.state.armNum} onChange={this.handleArmNumChange}> {select_armnum} </FormControl></td>
                            <td><FormControl componentClass="select" value={this.state.summonNum} onChange={this.handleSummonNumChange}> {select_summonnum} </FormControl></td>
                            <td><FormControl componentClass="select" value={this.state.sortKey} onChange={this.handleEvent.bind(this, "sortKey")} > {this.props.keyTypes} </FormControl></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            );
        } else {
            return (
                <div className="profile">
                    <h3> ジータちゃん情報 (*: 推奨入力項目)</h3>
                    <table>
                        <tbody>
                        <tr>
                            <th className="prof">Rank*</th>
                            <th className="prof">ゼニス攻撃力*</th>
                            <th className="prof">ゼニスHP</th>
                            <th className="prof">マスターボーナス<br/>ATK(%)*</th>
                            <th className="prof">マスターボーナス<br/>HP(%)</th>
                            <th className="prof">ジョブ*</th>
                            <th className="prof">残HP(%)<br/>(ジータのみ)</th>
                        </tr>
                        <tr>
                            <td><FormControl type="number"  min="0" max="175" value={this.state.rank} onChange={this.handleEvent.bind(this, "rank")}/></td>
                            <td><FormControl componentClass="select" value={this.state.zenithAttackBonus} onChange={this.handleEvent.bind(this, "zenithAttackBonus")} > {select_zenithAttack} </FormControl></td>
                            <td><FormControl componentClass="select" value={this.state.zenithHPBonus} onChange={this.handleEvent.bind(this, "zenithHPBonus")} > {select_zenithHP} </FormControl></td>
                            <td><FormControl type="number" min="0" max="100" value={this.state.masterBonus} onChange={this.handleEvent.bind(this, "masterBonus")}/></td>
                            <td><FormControl type="number" min="0" max="100" value={this.state.masterBonusHP} onChange={this.handleEvent.bind(this, "masterBonusHP")}/></td>
                            <td><FormControl componentClass="select" value={this.state.job} onChange={this.handleEvent.bind(this, "job")} > {this.props.alljobs} </FormControl></td>
                            <td><FormControl type="number" min="0" max="100" value={this.state.remainHP} onChange={this.handleEvent.bind(this, "remainHP")}/></td>
                        </tr>
                        <tr>
                            <th className="prof">ジータ属性*</th>
                            <th className="prof">敵の属性*</th>
                            <th className="prof">武器ゼニス1</th>
                            <th className="prof">武器ゼニス2</th>
                            <th className="prof">基礎DA率</th>
                            <th className="prof">基礎TA率</th>
                            <th className="prof">敵防御固有値(仮)</th>
                        </tr>
                        <tr>
                            <td><FormControl componentClass="select" value={this.state.element} onChange={this.handleEvent.bind(this, "element")}> {select_elements} </FormControl></td>
                            <td><FormControl componentClass="select" value={this.state.enemyElement} onChange={this.handleEvent.bind(this, "enemyElement")}> {select_elements} </FormControl></td>
                            <td><FormControl componentClass="select" value={this.state.zenithBonus1} onChange={this.handleEvent.bind(this, "zenithBonus1")} > {this.props.zenithBonuses} </FormControl></td>
                            <td><FormControl componentClass="select" value={this.state.zenithBonus2} onChange={this.handleEvent.bind(this, "zenithBonus2")} > {this.props.zenithBonuses} </FormControl></td>
                            <td><FormControl type="number" min="0" step="0.1" value={this.state.DA} onChange={this.handleEvent.bind(this, "DA")}/></td>
                            <td><FormControl type="number" min="0" step="0.1" value={this.state.TA} onChange={this.handleEvent.bind(this, "TA")}/></td>
                            <td><FormControl type="number" min="0" step="0.5" value={this.state.enemyDefense} onChange={this.handleEvent.bind(this, "enemyDefense")}/></td>
                        </tr>
                        </tbody>
                    </table>
                    ※ゼニスパーク分の攻撃ボーナスと、ジョブ攻撃ボーナスを分離し、 ジョブ分は自動で反映されるように変更しました。<br/>
                    <span>
                    {Jobs[this.state.job].name}:
                    得意 [{armTypes[Jobs[this.state.job].favArm1]}, {armTypes[Jobs[this.state.job].favArm2]}],
                    {jobTypes[Jobs[this.state.job].type]}タイプ,
                    攻撃ボーナス {Jobs[this.state.job].atBonus},
                    HPボーナス {Jobs[this.state.job].hpBonus},
                    攻刃バフ {Jobs[this.state.job].kouzinBonus},
                    守護バフ {Jobs[this.state.job].shugoBonus},
                    基礎DA率 {Jobs[this.state.job].DaBonus}%,
                    基礎TA率 {Jobs[this.state.job].TaBonus}%
                    </span>

                    <h3 className="margin-top"> パーティ全体への効果 (%表記)</h3>
                    <table>
                        <tbody>
                        <tr>
                            <th className="buff">通常バフ</th>
                            <th className="buff">属性バフ</th>
                            <th className="buff">その他バフ</th>
                            <th className="buff">HPバフ</th>
                            <th className="buff">DAバフ</th>
                            <th className="buff">TAバフ</th>
                            <th className="buff">残HP(%)</th>
                        </tr><tr>
                            <td><FormControl type="number"  min="0" value={this.state.normalBuff} onChange={this.handleEvent.bind(this, "normalBuff")}/></td>
                            <td><FormControl type="number"  min="0" value={this.state.elementBuff} onChange={this.handleEvent.bind(this, "elementBuff")}/></td>
                            <td><FormControl type="number"  min="0" value={this.state.otherBuff} onChange={this.handleEvent.bind(this, "otherBuff")}/></td>
                            <td><FormControl type="number"  min="0" value={this.state.hpBuff} onChange={this.handleEvent.bind(this, "hpBuff")}/></td>
                            <td><FormControl type="number"  min="0" max="100" value={this.state.daBuff} onChange={this.handleEvent.bind(this, "daBuff")}/></td>
                            <td><FormControl type="number"  min="0" max="100" value={this.state.taBuff} onChange={this.handleEvent.bind(this, "taBuff")}/></td>
                            <td><FormControl type="number"  min="0" max="100" value={this.state.hp} onChange={this.handleEvent.bind(this, "hp")}/></td>
                        </tr><tr>
                            <th className="buff">武器種類数*</th>
                            <th className="buff">召喚石の組数*</th>
                            <th className="buff">優先する項目</th>
                        </tr>
                        <tr>
                            <td><FormControl componentClass="select" value={this.state.armNum} onChange={this.handleArmNumChange}> {select_armnum} </FormControl></td>
                            <td><FormControl componentClass="select" value={this.state.summonNum} onChange={this.handleSummonNumChange}> {select_summonnum} </FormControl></td>
                            <td><FormControl componentClass="select" value={this.state.sortKey} onChange={this.handleEvent.bind(this, "sortKey")} > {this.props.keyTypes} </FormControl></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            );
        }
    }
});
var Sys = React.createClass({
    getInitialState: function() {
        return {
            storedData: {},
            dataName: '',
            selectedData: '',
        };
    },
    componentDidMount: function(){
        // localStorage から data をロードする
        if ("data" in localStorage && localStorage.data != "{}" ) {
            var storedData = JSON.parse(Base64.decode(localStorage["data"]))
            this.setState({storedData: storedData})
        }
    },
    handleOnClick: function(key, e) {
      var newState = this.state
      newState[key] = e.target.value
      this.setState(newState)
    },
    handleEvent: function(key, e) {
      var newState = this.state
      newState[key] = e.target.value
      this.setState(newState)

      if(key == "dataName") {
          // 短縮URL取得時に使用するために保存しておく
          newData["dataName"] = e.target.value;
      }
    },
    onSubmitRemove: function(e) {
      if(this.state.selectedData != ''){
          // remove data
          var newState = this.state;
          delete newState["storedData"][this.state.selectedData];
          newState.selectedData = Object.keys(this.state.storedData)[0]

          localStorage.setItem("data", Base64.encodeURI(JSON.stringify(newState.storedData)));
          this.setState(newState);
      } else {
          alert("削除するデータを選択して下さい。")
      }
    },
    onSubmitLoad: function(e){
      e.preventDefault();
      if(this.state.selectedData != ''){
          newData = JSON.parse(JSON.stringify(this.state.storedData[this.state.selectedData]));

          // これは will receive props が発火したあとしか反映されない
          this.setState({dataName: this.state.selectedData});
          this.props.onLoadNewData(this.state.selectedData)
      } else {
          alert("読み込むデータを選択して下さい。")
      }
    },
    onSubmitSave: function(e){
      e.preventDefault();
      if(this.state.dataName != ''){
          var newState = this.state;
          var propsdata = JSON.parse(JSON.stringify(this.props.data));

          // dataName だけ Root に持っていっていないので、上書きしておく
          propsdata["dataName"] = this.state.dataName;

          newState["storedData"][this.state.dataName] = propsdata;
          newState["selectedData"] = this.state.dataName;

          // save data
          var saveString = Base64.encodeURI(JSON.stringify(newState.storedData));
          localStorage.setItem("data", saveString);

          newData = propsdata;
          this.setState(newState);
      } else {
          alert("データ名を入力して下さい。")
      }
    },
    render: function() {
        var datalist = []
        if(Object.keys(this.state.storedData).length != 0){
            var keys = Object.keys(this.state.storedData);
            datalist = keys.map(function(opt){
                return (
                    <option value={opt} key={opt}>{opt}</option>
                );
            });
        }
        return (
            <div className="dataControl">
                データ名: <FormControl size="10" type="text" value={this.state.dataName} onChange={this.handleEvent.bind(this, "dataName")} />
                ブラウザに保存されたデータ
                <FormControl componentClass="select" value={this.state.selectedData} onClick={this.handleOnClick.bind(this, "selectedData")} onChange={this.handleEvent.bind(this, "selectedData")} > {datalist} </FormControl>
                <ButtonGroup className="systemButtonGroup">
                    <Button bsStyle="primary" className="systemButton" onClick={this.onSubmitSave} >保存</Button>
                    <Button bsStyle="primary" className="systemButton" onClick={this.onSubmitLoad} >読込</Button>
                    <Button bsStyle="primary" className="systemButton" onClick={this.onSubmitRemove} >削除</Button>
                </ButtonGroup>
            </div>
        );
    }
});

// Twitter Button
var TwitterShareButton = React.createClass ({
    componentWillReceiveProps: function(nextProps){
        var datatext = Base64.encodeURI(JSON.stringify(this.props.data))
        this.setState({datatext: datatext});
    },
    getInitialState: function() {
        var datatext = Base64.encodeURI(JSON.stringify(this.props.data))
        return {
            shareurl: "",
            shareurl_history: [],
            datatext: datatext,
        };
    },
    getShortenUrl: function() {
        var data = this.props.data;
        if("dataName" in newData && newData["dataName"] != '') {
            // 基本的にSys.dataNameに入力されているものをベースにして保存
            data["dataName"] = newData["dataName"];
        } else {
            // Sys.dataNameが空の場合
            data["dataName"] = "savedData";
        }

        $.ajax({
            url: "getshort.php",
            type: 'POST',
            dataType: 'text',
            cache: false,
            timeout: 10000,
            data: {datachar: Base64.encodeURI(JSON.stringify(data))},
            success: function(data, datatype) {
                var shareurl = 'http://hsimyu.net/motocal?id=' + data
                var tweeturl = 'https://twitter.com/intent/tweet?';
                tweeturl += 'text=元カレ計算機（グラブル攻撃力計算機）'
                tweeturl += '&url=' + shareurl
                window.open(tweeturl, '_blank')
                var sharehist = this.state.shareurl_history
                sharehist.unshift(this.props.data["dataName"] + ": " + shareurl);
                this.setState({shareurl: shareurl, shareurl_history: sharehist})
            }.bind(this),
            error: function(xhr, status, err) {
                alert("Error!: 何かがおかしいです。@hsimyuまで連絡して下さい。status: ", status, ", error message: ", err.toString());
            }.bind(this)
        });
    },
    render: function() {
      return (
            <div className="tweet">
                <Button bsStyle="primary" className="tweetButton" onClick={this.getShortenUrl}> サーバに保存<br/>(短縮URLを取得) </Button>
                <ul>
                {this.state.shareurl_history.map(function(s){
                    return (
                        <li>{s}</li>
                    )
                })}
                </ul>
            </div>
       );
    },
});

var Notice = React.createClass ({
    render: function() {
      return (
        <div className="notice">
            <div className="divright"><a href="http://hsimyu.net/motocal/">入力リセット</a></div>
            <h2>入力例: <a href="http://hsimyu.net/motocal/thumbnail.php" target="_blank"> 元カレ計算機データビューア </a> </h2>
            <h2>更新履歴</h2>
            <ul>
                <li>2016/08/18: スマホ・タブレットレイアウト対応 / PC版レイアウトも調整 / UI調整 </li>
                <li>2016/08/17: 検証データを元に渾身の実装を修正 / <a href="http://hsimyu.net/motocal/thumbnail.php" target="_blank">データビューア</a>の作成 / 予想ダメージ計算に減衰補正を追加 </li>
                <li>2016/08/16: 三手スキルSLv11~15の値を入力 / DATA率の合計を、枠別上限から武器スキル全体の上限に修正 / 渾身仮実装 </li>
                <li>2016/08/12: 二手スキル上限の値に召喚石加護分の値が考慮されていなかった不具合を修正。/ 予想ダメージ機能を仮実装しました。</li>
                <li>2016/08/11: 敵の属性の内部的な初期値がおかしかった不具合を修正。</li>
                <li>2016/08/09: 簡易リセットボタンを配置 / バハムート武器フツルスの拳系に対応 (wikiの情報に準拠) (HP40%, DA10%, TA8%という情報もありますが、未確定の為とりあえず低い値を採用しました。検証してくれる方を募集してます……) </li>
                <li>2016/08/07: コスモス武器を複数含めて比較できるようにした (2本同時に編成されることはありません) / キャラを平均値に含めるかどうかを指定できるようにした。 / 武器スキル属性の一括変更を実装 </li>
                <li>2016/08/06: 考慮本数が最大0本の場合は結果欄に表示されないように変更 / 計算量を削減する処理を追加 / バハ攻とバハ攻HPが複数本指定された時に同種スキルが重複して計算されないよう修正 / キャラ別HP管理を実装 / ジータの基礎DATA率を弄れるように / キャラHPの表示を実装 / 結果のHP欄に残HPも同時表示するようにした / マウスホバー時にスキル情報を表示するようにした。 </li>
                <li>2016/08/03: レイアウト調整/キャラ別基礎DATA率計算の実装</li>
                <li>2016/08/02: 三手対応</li>
                <li>2016/07/26: レイアウトの微調整 / 保存用文字列の表示を撤廃（邪魔なので）/ 保存用URLをいくつか発行した際に履歴を表示するようにした。/ 結果の自動更新を無効化するオプションの追加 </li>
                <li>2016/07/17: フラム=グラス系の石も計算できるようにした。/ 総合攻撃力*期待攻撃回数*技巧倍率を計算した値の導入 </li>
                <li>2016/07/16: バハ短剣の適応種族が間違っていたので修正 / 朱雀琴スキルの実装 / 計算量を削減する処理の追加 </li>
            </ul>

            <h3>注記</h3>
            <ul>
                 <li>未対応: 羅刹/召喚石のクリティカル率</li>
                 <li>今後の実装予定: 召喚石入力欄の利便性向上 / キャラ欄の利便性向上</li>
                 <li><strong>バハ武器フツルスのHP/攻撃力を正しく計算したい場合はスキルに"バハフツ(攻/HP)"を選択してください。</strong> <br/>
                 (バハ攻SLv11~の場合のHPと、バハ攻HPのSLv10の場合にズレが出ます。それ以外は問題ありません)</li>
                 <li>得意武器IIのゼニス（★4以上）は、Iをすべてマスター済みという前提で各6%, 8%, 10%として計算します。</li>
                 <li>三手はSLv1で1.1%、SLv10で5%というデータから内挿しているため、あくまで予想値であるということをご理解下さい。<br/>
                 また、三手スキル上限はデータがないため仮に50%としています。実際には50%よりも低い可能性もあるのでご注意下さい。</li>
                 <li>"コスモス"欄はコスモス武器にチェックをつけてください。</li>
                 <li>計算量削減のため、計算数が1024通りを超えた場合は合計本数10本の編成のみ算出・比較します。</li>
                 <li>パーティ全体の残HP指定と個別の残HP指定のうち、低い方を適用して背水値を計算します。(背水キャラ運用用) </li>
                 <li>
                 敵防御固有値は予想ダメージ計算にのみ使用されます。(10から15程度が目安)<br/>
                 防御デバフを考慮する場合、防御固有値を半分にしてください。<br/>
                 また、予想ダメージ機能はあくまで目安ということでお願いします。<br/>
                 補正幅は, 30万以上: 30%減衰, 35万以上: 60%減衰、40万以上: 90%減衰、45万以上: 99%減衰としていますが、<br/>
                 若干きつすぎる気がしています。(情報をお持ちでしたらご提供頂けると助かります) </li>
            </ul>

            <img className="banner" src="./ChWJ-LgUgAA2JEy.jpg" />
            製作者: ほしみ <a href="http://twitter.com/hsimyu" target="_blank"> @hsimyu </a><br/>
            不具合報告・ご要望がありましたらTwitterにてご連絡をお願い致します。

            <h3>LICENSE</h3>
            <ul>
                <li> <a href="http://facebook.github.io/react">React</a>: Copyright &copy; 2013-2016 Facebook Inc. v15.3.0 </li>
                <li> <a href="http://github.com/dankogai/js-base64">dankogai/js-base64</a>: Copyright &copy; 2014, Dan Kogai <a href="./js-base64/LICENSE.md"> LICENSE </a></li>

            </ul>

            <h3>参考文献</h3>
            以下のサイト・ツイートを参考にさせていただきました。
            <ul>
                <li> <a href="http://gbf-wiki.com">グランブルーファンタジー(グラブル)攻略wiki</a></li>
                <li> <a href="http://hibin0.web.fc2.com/grbr_atk_calc/atk_calc.html">グランブルーファンタジー攻撃力計算機</a></li>
                <li> <a href="http://hibin0.web.fc2.com/grbr_weapon_calc/weapon_calc.html">オススメ装備に自信ニキ</a></li>
                <li> <a href="http://greatsundome.hatenablog.com/entry/2015/12/09/230544">すんどめ侍のグラブル生活 - 【グラブル】武器スキル検証結果</a></li>
                <li> <a href="http://greatsundome.hatenablog.com/entry/2015/10/11/175521">すんどめ侍のグラブル生活 - 【グラブル】ジョブデータ検証結果</a></li>
                <li> <a href="http://greatsundome.hatenablog.com/entry/2015/10/07/114737">すんどめ侍のグラブル生活 - 【グラブル】減衰補正検証まとめ</a></li>
                <li> <a href="https://twitter.com/hibino_naoki/status/722338377127735296"> @hibino_naoki さんのコルタナ(三手大)検証情報</a></li>
                <li> <a href="https://twitter.com/gekikara_s/status/746274346251882496"> @gekikara_s さんのバハフツ拳検証情報</a></li>
                <li> <a href="https://twitter.com/Hecate_mk2/status/765508148689985537"> @Hecate_mk2 さんの渾身(大)検証情報</a></li>
                <li> <a href="https://twitter.com/firemagma/status/765632239526830080"> @firemagma さんの渾身(大)検証情報</a></li>
                <li> <a href="https://twitter.com/hibino_naoki/status/765749475457413120"> @hibino_naoki さんの渾身(大)検証情報</a></li>
            </ul>

            <h3>スキル性能・各種計算式</h3>
            <table><tbody>
                <tr><th>スキル名/SLv</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th><th>10</th><th>11</th><th>12</th><th>13</th><th>14</th><th>15</th></tr>
                <tr><td>通常攻刃(小)</td><td>1.0</td><td>2.0</td><td>3.0</td><td>4.0</td><td>5.0</td><td>6.0</td><td>7.0</td><td>8.0</td><td>9.0</td><td>10.0</td><td>10.4</td><td>10.8</td><td>11.2</td><td>11.6</td><td>12.0</td></tr>
                <tr><td>通常攻刃(中)</td><td>3.0</td><td>4.0</td><td>5.0</td><td>6.0</td><td>7.0</td><td>8.0</td><td>9.0</td><td>10.0</td><td>11.0</td><td>12.0</td><td>12.0</td><td>12.0</td><td>12.0</td><td>12.0</td><td>12.0</td></tr>
                <tr><td>通常攻刃(大)</td><td>6.0</td><td>7.0</td><td>8.0</td><td>9.0</td><td>10.0</td><td>11.0</td><td>12.0</td><td>13.0</td><td>14.0</td><td>15.0</td><td>15.6</td><td>16.2</td><td>16.8</td><td>17.4</td><td>18.0</td></tr>
                <tr><td>通常攻刃II</td><td>7.0</td><td>8.0</td><td>9.0</td><td>10.0</td><td>11.0</td><td>12.0</td><td>13.0</td><td>14.0</td><td>15.0</td><td>16.0</td><td>16.8</td><td>17.6</td><td>18.4</td><td>19.2</td><td>20.0</td></tr>
                <tr><td>マグナ攻刃(小)</td><td>1.0</td><td>2.0</td><td>3.0</td><td>4.0</td><td>5.0</td><td>6.0</td><td>7.0</td><td>8.0</td><td>9.0</td><td>10.0</td><td>10.4</td><td>10.8</td><td>11.2</td><td>11.6</td><td>12.0</td></tr>
                <tr><td>マグナ攻刃(中)</td><td>3.0</td><td>4.0</td><td>5.0</td><td>6.0</td><td>7.0</td><td>8.0</td><td>9.0</td><td>10.0</td><td>11.0</td><td>12.0</td><td>12.5</td><td>13.0</td><td>13.5</td><td>14.0</td><td>14.5</td></tr>
                <tr><td>マグナ攻刃(大)</td><td>6.0</td><td>7.0</td><td>8.0</td><td>9.0</td><td>10.0</td><td>11.0</td><td>12.0</td><td>13.0</td><td>14.0</td><td>15.0</td><td>15.6</td><td>16.2</td><td>16.8</td><td>17.4</td><td>18.0</td></tr>
                <tr><td>アンノウン(小)</td><td>1.0</td><td>2.0</td><td>3.0</td><td>4.0</td><td>5.0</td><td>6.0</td><td>7.0</td><td>8.0</td><td>9.0</td><td>10.0</td><td>10.4</td><td>10.8</td><td>11.2</td><td>11.6</td><td>12.0</td></tr>
                <tr><td>アンノウン(中)</td><td>3.0</td><td>4.0</td><td>5.0</td><td>6.0</td><td>7.0</td><td>8.0</td><td>9.0</td><td>10.0</td><td>11.0</td><td>12.0</td><td>12.0</td><td>12.0</td><td>12.0</td><td>12.0</td><td>12.0</td></tr>
                <tr><td>アンノウン(大)</td><td>6.0</td><td>7.0</td><td>8.0</td><td>9.0</td><td>10.0</td><td>11.0</td><td>12.0</td><td>13.0</td><td>14.0</td><td>15.0</td><td>15.6</td><td>16.2</td><td>16.8</td><td>17.4</td><td>18.0</td></tr>
                <tr><td>バハHP(剣など)</td><td>10.0</td><td>10.5</td><td>11.0</td><td>11.5</td><td>12.0</td><td>12.5</td><td>13.0</td><td>13.5</td><td>14.0</td><td>15.0</td><td>15.6</td><td>16.2</td><td>16.8</td><td>17.4</td><td>18.0</td></tr>
                <tr><td>バハHP(拳など)</td><td>20.0</td><td>21.0</td><td>22.0</td><td>23.0</td><td>24.0</td><td>25.0</td><td>26.0</td><td>27.0</td><td>28.0</td><td>30.0</td><td>30.4</td><td>30.8</td><td>31.2</td><td>31.6</td><td>32.0</td></tr>
                <tr><td>バハ攻(剣など)</td><td>10.0</td><td>10.5</td><td>11.0</td><td>11.5</td><td>12.0</td><td>12.5</td><td>13.0</td><td>13.5</td><td>14.0</td><td>15.0</td><td>30.4</td><td>30.8</td><td>31.2</td><td>31.6</td><td>32.0</td></tr>
                <tr><td>バハ攻(短剣等)</td><td>20.0</td><td>21.0</td><td>22.0</td><td>23.0</td><td>24.0</td><td>25.0</td><td>26.0</td><td>27.0</td><td>28.0</td><td>30.0</td><td>30.4</td><td>30.8</td><td>31.2</td><td>31.6</td><td>32.0</td></tr>
                <tr><td>バハフツHP(短剣等)</td><td>15.0</td><td>15.0</td><td>15.0</td><td>15.0</td><td>15.0</td><td>15.0</td><td>15.0</td><td>15.0</td><td>15.0</td><td>15.0</td><td>15.6</td><td>16.2</td><td>16.8</td><td>17.4</td><td>18.0</td></tr>
                <tr><td>バハフツ攻(短剣等)</td><td>30.0</td><td>30.0</td><td>30.0</td><td>30.0</td><td>30.0</td><td>30.0</td><td>30.0</td><td>30.0</td><td>30.0</td><td>30.0</td><td>30.4</td><td>30.8</td><td>31.2</td><td>31.6</td><td>32.0</td></tr>
                <tr><td>バハフツHP(拳等)</td><td>30.0</td><td>30.0</td><td>30.0</td><td>30.0</td><td>30.0</td><td>30.0</td><td>30.0</td><td>30.0</td><td>30.0</td><td>30.0</td><td>30.4</td><td>30.8</td><td>31.2</td><td>31.6</td><td>32.0</td></tr>
                <tr><td>バハフツ連続攻撃率</td><td>0.0</td><td>0.0</td><td>0.0</td><td>0.0</td><td>0.0</td><td>0.0</td><td>0.0</td><td>0.0</td><td>0.0</td><td>4.6</td><td>5.0</td><td>5.5</td><td>6.0</td><td>6.5</td><td>7.0</td></tr>
                <tr><td>通常守護(小)</td><td>3.0</td><td>4.0</td><td>5.0</td><td>6.0</td><td>7.0</td><td>8.0</td><td>9.0</td><td>10.0</td><td>11.0</td><td>12.0</td><td>12.0</td><td>12.0</td><td>12.0</td><td>12.0</td><td>12.0</td></tr>
                <tr><td>通常守護(中)</td><td>6.0</td><td>7.0</td><td>8.0</td><td>9.0</td><td>10.0</td><td>11.0</td><td>12.0</td><td>13.0</td><td>14.0</td><td>15.0</td><td>15.4</td><td>15.8</td><td>16.2</td><td>16.6</td><td>17.0</td></tr>
                <tr><td>通常守護(大)</td><td>9.0</td><td>10.0</td><td>11.0</td><td>12.0</td><td>13.0</td><td>14.0</td><td>15.0</td><td>16.0</td><td>17.0</td><td>18.0</td><td>18.6</td><td>19.2</td><td>19.8</td><td>20.4</td><td>21.0</td></tr>
                <tr><td>マグナ守護(小)</td><td>1.0</td><td>2.0</td><td>3.0</td><td>4.0</td><td>5.0</td><td>6.0</td><td>7.0</td><td>8.0</td><td>9.0</td><td>10.0</td><td>10.4</td><td>10.8</td><td>11.2</td><td>11.6</td><td>12.0</td></tr>
                <tr><td>マグナ守護(中)</td><td>3.0</td><td>4.0</td><td>5.0</td><td>6.0</td><td>7.0</td><td>8.0</td><td>9.0</td><td>10.0</td><td>11.0</td><td>12.0</td><td>12.0</td><td>12.0</td><td>12.0</td><td>12.0</td><td>12.0</td></tr>
                <tr><td>マグナ守護(大)</td><td>6.0</td><td>7.0</td><td>8.0</td><td>9.0</td><td>10.0</td><td>11.0</td><td>12.0</td><td>13.0</td><td>14.0</td><td>15.0</td><td>15.0</td><td>15.0</td><td>15.0</td><td>15.0</td><td>15.0</td></tr>
                <tr><td>マグナ守護II</td><td>6.0</td><td>7.0</td><td>8.0</td><td>9.0</td><td>10.0</td><td>11.0</td><td>12.0</td><td>13.0</td><td>14.0</td><td>15.0</td><td>15.6</td><td>16.2</td><td>16.8</td><td>17.4</td><td>18.0</td></tr>
                <tr><td>アンノウンVIT(小)</td><td>1.0</td><td>2.0</td><td>3.0</td><td>4.0</td><td>5.0</td><td>6.0</td><td>7.0</td><td>8.0</td><td>9.0</td><td>10.0</td><td>10.0</td><td>10.0</td><td>10.0</td><td>10.0</td><td>10.0</td></tr>
                <tr><td>アンノウンVIT(中)</td><td>3.0</td><td>4.0</td><td>5.0</td><td>6.0</td><td>7.0</td><td>8.0</td><td>9.0</td><td>10.0</td><td>11.0</td><td>12.0</td><td>12.0</td><td>12.0</td><td>12.0</td><td>12.0</td><td>12.0</td></tr>
                <tr><td>アンノウンVIT(大)</td><td>6.0</td><td>7.0</td><td>8.0</td><td>9.0</td><td>10.0</td><td>11.0</td><td>12.0</td><td>13.0</td><td>14.0</td><td>15.0</td><td>15.0</td><td>15.0</td><td>15.0</td><td>15.0</td><td>15.0</td></tr>
                <tr><td>通常二手(小)</td><td>0.4</td><td>0.6</td><td>0.8</td><td>1.0</td><td>1.2</td><td>1.4</td><td>1.6</td><td>1.8</td><td>2.0</td><td>2.2</td><td>2.4</td><td>2.6</td><td>2.8</td><td>3.0</td><td>3.2</td></tr>
                <tr><td>通常二手(中)</td><td>0.7</td><td>1.0</td><td>1.3</td><td>1.6</td><td>1.9</td><td>2.2</td><td>2.5</td><td>2.8</td><td>3.1</td><td>3.4</td><td>3.7</td><td>4.0</td><td>4.3</td><td>4.6</td><td>4.9</td></tr>
                <tr><td>通常二手(大)</td><td>1.0</td><td>1.4</td><td>1.8</td><td>2.2</td><td>2.6</td><td>3.0</td><td>3.4</td><td>3.8</td><td>4.2</td><td>4.6</td><td>5.0</td><td>5.4</td><td>5.8</td><td>6.2</td><td>7.0</td></tr>
                <tr><td>マグナ二手(小)</td><td>0.4</td><td>0.6</td><td>0.8</td><td>1.0</td><td>1.2</td><td>1.4</td><td>1.6</td><td>1.8</td><td>2.0</td><td>2.2</td><td>2.4</td><td>2.6</td><td>2.8</td><td>3.0</td><td>3.2</td></tr>
                <tr><td>マグナ二手(中)</td><td>0.7</td><td>1.0</td><td>1.3</td><td>1.6</td><td>1.9</td><td>2.2</td><td>2.5</td><td>2.8</td><td>3.1</td><td>3.4</td><td>3.7</td><td>4.0</td><td>4.3</td><td>4.6</td><td>4.9</td></tr>
                <tr><td>マグナ二手(大)</td><td>1.0</td><td>1.4</td><td>1.8</td><td>2.2</td><td>2.6</td><td>3.0</td><td>3.4</td><td>3.8</td><td>4.2</td><td>4.6</td><td>5.0</td><td>5.4</td><td>5.8</td><td>6.2</td><td>7.0</td></tr>
                <tr><td>アンノウン二手(小)</td><td>0.4</td><td>0.6</td><td>0.8</td><td>1.0</td><td>1.2</td><td>1.4</td><td>1.6</td><td>1.8</td><td>2.0</td><td>2.2</td><td>2.4</td><td>2.6</td><td>2.8</td><td>3.0</td><td>3.2</td></tr>
                <tr><td>通常三手(大)</td><td>1.1</td><td>1.53</td><td>1.96</td><td>2.39</td><td>2.82</td><td>3.25</td><td>3.68</td><td>4.11</td><td>4.54</td><td>5.0</td><td>5.4</td><td>5.8</td><td>6.2</td><td>6.6</td><td>7.0</td></tr>
                <tr><td>マグナ三手(大)</td><td>1.1</td><td>1.53</td><td>1.96</td><td>2.39</td><td>2.82</td><td>3.25</td><td>3.68</td><td>4.11</td><td>4.54</td><td>5.0</td><td>5.4</td><td>5.8</td><td>6.2</td><td>6.6</td><td>7.0</td></tr>
                <tr><td>通常技巧(小)</td><td>1.0</td><td>1.1</td><td>1.2</td><td>1.3</td><td>1.4</td><td>1.5</td><td>1.6</td><td>1.7</td><td>1.8</td><td>1.9</td><td>2.0</td><td>2.1</td><td>2.2</td><td>2.3</td><td>2.4</td></tr>
                <tr><td>通常技巧(中)</td><td>3.0</td><td>3.3</td><td>3.6</td><td>3.9</td><td>4.2</td><td>4.5</td><td>4.8</td><td>5.1</td><td>5.4</td><td>5.7</td><td>6.0</td><td>6.3</td><td>6.7</td><td>7.0</td><td>7.3</td></tr>
                <tr><td>通常技巧(大)</td><td>4.0</td><td>4.4</td><td>4.8</td><td>5.2</td><td>5.6</td><td>6.0</td><td>6.4</td><td>6.8</td><td>7.2</td><td>7.6</td><td>8.0</td><td>8.4</td><td>8.8</td><td>9.2</td><td>9.6</td></tr>
                <tr><td>マグナ技巧(小)</td><td>1.0</td><td>1.1</td><td>1.2</td><td>1.3</td><td>1.4</td><td>1.5</td><td>1.6</td><td>1.7</td><td>1.8</td><td>1.9</td><td>2.0</td><td>2.2</td><td>2.2</td><td>2.3</td><td>2.4</td></tr>
                <tr><td>マグナ技巧(中)</td><td>3.0</td><td>3.3</td><td>3.6</td><td>3.9</td><td>4.2</td><td>4.5</td><td>4.8</td><td>5.1</td><td>5.4</td><td>5.7</td><td>6.0</td><td>6.3</td><td>6.7</td><td>7.0</td><td>7.3</td></tr>
                <tr><td>マグナ技巧(大)</td><td>4.0</td><td>4.4</td><td>4.8</td><td>5.2</td><td>5.6</td><td>6.0</td><td>6.4</td><td>6.8</td><td>7.2</td><td>7.6</td><td>8.0</td><td>8.4</td><td>8.8</td><td>9.2</td><td>9.6</td></tr>
            </tbody></table>
            <ul>
                <li>通常神威: 通常攻刃(小) + 通常守護(小)</li>
                <li>マグナ神威: マグナ攻刃(小) + マグナ守護(小)</li>
                <li>通常刹那: 通常技巧(中) + 通常攻刃(中) </li>
                <li>マグナ刹那: マグナ技巧(中) + マグナ攻刃(中) </li>
                <li>通常克己: 通常技巧(中) + 通常二手(中) </li>
                <li>マグナ克己: マグナ技巧(中) + マグナ二手(中) </li>
                <li>通常暴君: 通常攻刃(大) + HP減少(10%) </li>
                <li>マグナ暴君: マグナ攻刃(大) + HP減少(10%) </li>
                <li>アンノウン暴君(ミフネ): アンノウン攻刃(大) + HP減少(7%) </li>
                <li>技巧(小, 中, 大): クリティカル時倍率 50%</li>
                <li>マグナ技巧(小, 中, 大): クリティカル時倍率 50% </li>
                <li>背水(小): (baseRate/3) * (2 * 残りHP割合^2 - 5 * 残りHP割合 + 3) <br/>(baseRateは (Slv10以下) -0.3 + Slv * 1.8, (Slv10以上) 18.0 + 3.0 * (Slv - 10) / 5.0 </li>
                <li>背水(中): (baseRate/3) * (2 * 残りHP割合^2 - 5 * 残りHP割合 + 3) <br/>(baseRateは (Slv10以下) -0.4 + Slv * 2.4, (Slv10以上) 24.0 + 3.0 * (Slv - 10) / 5.0 </li>
                <li>背水(大): (baseRate/3) * (2 * 残りHP割合^2 - 5 * 残りHP割合 + 3) <br/>(baseRateは (Slv10以下) -0.5 + Slv * 3.0, (Slv10以上) 30.0 + 3.0 * (Slv - 10) / 5.0 </li>
                <li>渾身(大): baseRate * 残りHP割合 (baseRateは (Slv10以下) 10.0 + Slv * 1.0, (Slv10以上) 20.0 + (Slv - 10) * 0.6 </li>
                <li>攻撃回数期待値: 3.0 * TA率 + (1.0 - TA率) * (2.0 * DA率 + (1.0 - DA率)) (TA→DAの順で判定、TA率が100％なら3回、TA率0％でDA率100％なら2回) </li>
                <li>技巧期待値: 通常技巧倍率 * 通常技巧確率 + マグナ技巧倍率 * マグナ技巧確率 + (1.0 - 通常技巧確率 - マグナ技巧確率) * 1.0 (マグナと通常は重複)</li>
                <li>基礎HP: 600 + 8 * rank(100まで) + 4 * (rank - 100)</li>
            </ul>
        </div>
       );
    },

});

ReactDOM.render(<Root />, document.getElementById('app'));

var React = require('react');
var ReactDOM = require('react-dom');
var {Base64} = require('js-base64');
var {Chart} = require('react-google-charts')
var {Thumbnail, ControlLabel, Button, ButtonGroup, FormControl, Checkbox, Modal, Image, Popover} = require('react-bootstrap');

// global arrays
var zenith = {"無し": 0, "★1": 0.01, "★2": 0.03, "★3": 0.05, "★4": 0.06, "★5": 0.08, "★6": 0.10}
var zenithAttackBonus = [3000, 1500, 500, 0];
var zenithHPBonus = [1000, 600, 300, 0];
var skilllevels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
var considerNum = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var ougiGageBuffList = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
var ougiRatioList = [4.0, 4.5, 5.0];
var masterATKList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
var masterHPList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
var HPList = [ 100, 99, 98, 97, 96, 95, 94, 93, 92, 91, 90, 89, 88, 87, 86, 85, 84, 83, 82, 81, 80, 79, 78, 77, 76, 75, 74, 73, 72, 71, 70, 69, 68, 67, 66, 65, 64, 63, 62, 61, 60, 59, 58, 57, 56, 55, 54, 53, 52, 51, 50, 49, 48, 47, 46, 45, 44, 43, 42, 41, 40, 39, 38, 37, 36, 35, 34, 33, 32, 31, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1 ];
var plusNumList = { "+0": 0, "+1": 1, "+2": 2, "+3": 3, "+4": 4, "+5": 5, "+6": 6, "+7": 7, "+8": 8, "+9": 9, "+10": 10, "+11": 11, "+12": 12, "+13": 13, "+14": 14, "+15": 15, "+16": 16, "+17": 17, "+18": 18, "+19": 19, "+20": 20, "+21": 21, "+22": 22, "+23": 23, "+24": 24, "+25": 25, "+26": 26, "+27": 27, "+28": 28, "+29": 29, "+30": 30, "+31": 31, "+32": 32, "+33": 33, "+34": 34, "+35": 35, "+36": 36, "+37": 37, "+38": 38, "+39": 39, "+40": 40, "+41": 41, "+42": 42, "+43": 43, "+44": 44, "+45": 45, "+46": 46, "+47": 47, "+48": 48, "+49": 49, "+50": 50, "+51": 51, "+52": 52, "+53": 53, "+54": 54, "+55": 55, "+56": 56, "+57": 57, "+58": 58, "+59": 59, "+60": 60, "+61": 61, "+62": 62, "+63": 63, "+64": 64, "+65": 65, "+66": 66, "+67": 67, "+68": 68, "+69": 69, "+70": 70, "+71": 71, "+72": 72, "+73": 73, "+74": 74, "+75": 75, "+76": 76, "+77": 77, "+78": 78, "+79": 79, "+80": 80, "+81": 81, "+82": 82, "+83": 83, "+84": 84, "+85": 85, "+86": 86, "+87": 87, "+88": 88, "+89": 89, "+90": 90, "+91": 91, "+92": 92, "+93": 93, "+94": 94, "+95": 95, "+96": 96, "+97": 97, "+98": 98, "+99": 99}
var levelListLimit = { "Lv. 1": 1, "Lv. 2": 2, "Lv. 3": 3, "Lv. 4": 4, "Lv. 5": 5, "Lv. 6": 6, "Lv. 7": 7, "Lv. 8": 8, "Lv. 9": 9, "Lv. 10": 10, "Lv. 11": 11, "Lv. 12": 12, "Lv. 13": 13, "Lv. 14": 14, "Lv. 15": 15, "Lv. 16": 16, "Lv. 17": 17, "Lv. 18": 18, "Lv. 19": 19, "Lv. 20": 20, "Lv. 21": 21, "Lv. 22": 22, "Lv. 23": 23, "Lv. 24": 24, "Lv. 25": 25, "Lv. 26": 26, "Lv. 27": 27, "Lv. 28": 28, "Lv. 29": 29, "Lv. 30": 30, "Lv. 31": 31, "Lv. 32": 32, "Lv. 33": 33, "Lv. 34": 34, "Lv. 35": 35, "Lv. 36": 36, "Lv. 37": 37, "Lv. 38": 38, "Lv. 39": 39, "Lv. 40": 40, "Lv. 41": 41, "Lv. 42": 42, "Lv. 43": 43, "Lv. 44": 44, "Lv. 45": 45, "Lv. 46": 46, "Lv. 47": 47, "Lv. 48": 48, "Lv. 49": 49, "Lv. 50": 50, "Lv. 51": 51, "Lv. 52": 52, "Lv. 53": 53, "Lv. 54": 54, "Lv. 55": 55, "Lv. 56": 56, "Lv. 57": 57, "Lv. 58": 58, "Lv. 59": 59, "Lv. 60": 60, "Lv. 61": 61, "Lv. 62": 62, "Lv. 63": 63, "Lv. 64": 64, "Lv. 65": 65, "Lv. 66": 66, "Lv. 67": 67, "Lv. 68": 68, "Lv. 69": 69, "Lv. 70": 70, "Lv. 71": 71, "Lv. 72": 72, "Lv. 73": 73, "Lv. 74": 74, "Lv. 75": 75, "Lv. 76": 76, "Lv. 77": 77, "Lv. 78": 78, "Lv. 79": 79, "Lv. 80": 80, "Lv. 81": 81, "Lv. 82": 82, "Lv. 83": 83, "Lv. 84": 84, "Lv. 85": 85, "Lv. 86": 86, "Lv. 87": 87, "Lv. 88": 88, "Lv. 89": 89, "Lv. 90": 90, "Lv. 91": 91, "Lv. 92": 92, "Lv. 93": 93, "Lv. 94": 94, "Lv. 95": 95, "Lv. 96": 96, "Lv. 97": 97, "Lv. 98": 98, "Lv. 99": 99, "Lv. 100": 100}
var levelListNoLimit = { "Lv. 1": 1, "Lv. 2": 2, "Lv. 3": 3, "Lv. 4": 4, "Lv. 5": 5, "Lv. 6": 6, "Lv. 7": 7, "Lv. 8": 8, "Lv. 9": 9, "Lv. 10": 10, "Lv. 11": 11, "Lv. 12": 12, "Lv. 13": 13, "Lv. 14": 14, "Lv. 15": 15, "Lv. 16": 16, "Lv. 17": 17, "Lv. 18": 18, "Lv. 19": 19, "Lv. 20": 20, "Lv. 21": 21, "Lv. 22": 22, "Lv. 23": 23, "Lv. 24": 24, "Lv. 25": 25, "Lv. 26": 26, "Lv. 27": 27, "Lv. 28": 28, "Lv. 29": 29, "Lv. 30": 30, "Lv. 31": 31, "Lv. 32": 32, "Lv. 33": 33, "Lv. 34": 34, "Lv. 35": 35, "Lv. 36": 36, "Lv. 37": 37, "Lv. 38": 38, "Lv. 39": 39, "Lv. 40": 40, "Lv. 41": 41, "Lv. 42": 42, "Lv. 43": 43, "Lv. 44": 44, "Lv. 45": 45, "Lv. 46": 46, "Lv. 47": 47, "Lv. 48": 48, "Lv. 49": 49, "Lv. 50": 50, "Lv. 51": 51, "Lv. 52": 52, "Lv. 53": 53, "Lv. 54": 54, "Lv. 55": 55, "Lv. 56": 56, "Lv. 57": 57, "Lv. 58": 58, "Lv. 59": 59, "Lv. 60": 60, "Lv. 61": 61, "Lv. 62": 62, "Lv. 63": 63, "Lv. 64": 64, "Lv. 65": 65, "Lv. 66": 66, "Lv. 67": 67, "Lv. 68": 68, "Lv. 69": 69, "Lv. 70": 70, "Lv. 71": 71, "Lv. 72": 72, "Lv. 73": 73, "Lv. 74": 74, "Lv. 75": 75, "Lv. 76": 76, "Lv. 77": 77, "Lv. 78": 78, "Lv. 79": 79, "Lv. 80": 80, "Lv. 81": 81, "Lv. 82": 82, "Lv. 83": 83, "Lv. 84": 84, "Lv. 85": 85, "Lv. 86": 86, "Lv. 87": 87, "Lv. 88": 88, "Lv. 89": 89, "Lv. 90": 90, "Lv. 91": 91, "Lv. 92": 92, "Lv. 93": 93, "Lv. 94": 94, "Lv. 95": 95, "Lv. 96": 96, "Lv. 97": 97, "Lv. 98": 98, "Lv. 99": 99, "Lv. 100": 100, "Lv. 101": 101, "Lv. 102": 102, "Lv. 103": 103, "Lv. 104": 104, "Lv. 105": 105, "Lv. 106": 106, "Lv. 107": 107, "Lv. 108": 108, "Lv. 109": 109, "Lv. 110": 110, "Lv. 111": 111, "Lv. 112": 112, "Lv. 113": 113, "Lv. 114": 114, "Lv. 115": 115, "Lv. 116": 116, "Lv. 117": 117, "Lv. 118": 118, "Lv. 119": 119, "Lv. 120": 120, "Lv. 121": 121, "Lv. 122": 122, "Lv. 123": 123, "Lv. 124": 124, "Lv. 125": 125, "Lv. 126": 126, "Lv. 127": 127, "Lv. 128": 128, "Lv. 129": 129, "Lv. 130": 130, "Lv. 131": 131, "Lv. 132": 132, "Lv. 133": 133, "Lv. 134": 134, "Lv. 135": 135, "Lv. 136": 136, "Lv. 137": 137, "Lv. 138": 138, "Lv. 139": 139, "Lv. 140": 140, "Lv. 141": 141, "Lv. 142": 142, "Lv. 143": 143, "Lv. 144": 144, "Lv. 145": 145, "Lv. 146": 146, "Lv. 147": 147, "Lv. 148": 148, "Lv. 149": 149, "Lv. 150": 150 }
var skillLevelListNoLimit = { "SLv. 1": 1, "SLv. 2": 2, "SLv. 3": 3, "SLv. 4": 4, "SLv. 5": 5, "SLv. 6": 6, "SLv. 7": 7, "SLv. 8": 8, "SLv. 9": 9, "SLv. 10": 10, "SLv. 11": 11, "SLv. 12": 12, "SLv. 13": 13, "SLv. 14": 14, "SLv. 15": 15 }
var skillLevelListLimit = { "SLv. 1": 1, "SLv. 2": 2, "SLv. 3": 3, "SLv. 4": 4, "SLv. 5": 5, "SLv. 6": 6, "SLv. 7": 7, "SLv. 8": 8, "SLv. 9": 9, "SLv. 10": 10 }

var enemyDefenseType = {
    10.0: {"name": "10.0(一般的な敵)"},
    8.0: {"name": "8.0(防御-20%)"},
    7.0: {"name": "7.0(防御-30%)"},
    5.0: {"name": "5.0(防御-50%)"},
    13.0: {"name": "13.0(ティアマグ・シュヴァマグ)"},
    6.5: {"name": "6.5(ティアシュヴァ防御-50%)"},
    11.0: {"name": "11.0(プロバハ?)"},
    5.5: {"name": "5.5(プロバハ(防御-50%))"},
    20.0: {"name": "20.0(プロバハHL?)"},
}
var keyTypes = {
    "totalAttack":"総合攻撃力",
    "totalHP": "ジータHP",
    "ATKandHP": "戦力",
    "averageAttack": "パーティ平均攻撃力",
    "criticalAttack": "技巧期待値",
    "averageCriticalAttack": "技巧期待平均攻撃力",
    "totalExpected": "総合攻撃*期待回数*技巧期待値",
    "averageTotalExpected": "総回技のパーティ平均値",
    "expectedCycleDamagePerTurn": "予想ターン毎ダメージ",
    "averageCyclePerTurn": "予想ターン毎ダメージのパーティ平均値",
}
var supportedChartSortkeys = {
    "totalAttack": "総合攻撃力",
    "averageAttack": "パーティ平均攻撃力",
    "expectedCycleDamagePerTurn": "予想ターン毎ダメージ",
    "averageCyclePerTurn": "予想ターン毎ダメージのパーティ平均値",
    "totalHP": "ジータ残りHP",
}

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
    "unknownM": {name:"アンノウンATK・I", type:"unknown", amount: "M"},
    "unknownL": {name:"アンノウンATK・II", type:"unknown", amount: "L"},
    "strengthHaisuiM": {name:"ストレングス背水(中)", type:"unknownOtherHaisui", amount: "M"},
    "strengthS": {name:"ストレングス等(小)", type:"unknownOther", amount: "S"},
    "strengthM": {name:"ストレングス等(中)", type:"unknownOther", amount: "M"},
    "strengthL": {name:"ストレングス等(大)", type:"unknownOther", amount: "L"},
    "normalHPS": {name:"通常守護(小)", type:"normalHP", amount: "S"},
    "normalHPM": {name:"通常守護(中)", type:"normalHP", amount: "M"},
    "normalHPL": {name:"通常守護(大)", type:"normalHP", amount: "L"},
    "magnaHPM": {name:"マグナ守護", type:"magnaHP", amount: "M"},
    "magnaHPL": {name:"マグナ守護II", type:"magnaHP", amount: "L"},
    "unknownHPS": {name:"アンノウン・VIT I(小)", type:"unknownHP", amount: "S"},
    "unknownHPM": {name:"アンノウン・VIT I(中)", type:"unknownHP", amount: "M"},
    "unknownHPL": {name:"アンノウン・VIT II(大)", type:"unknownHP", amount: "L"},
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
    "cosmos-sword": {name:"コスモス剣", type:"cosmosArm", amount: "L", cosmosArm:"sword"},
    "cosmos-dagger": {name:"コスモス短剣", type:"cosmosArm", amount: "L", cosmosArm:"dagger"},
    "cosmos-spear": {name:"コスモス槍", type:"cosmosArm", amount: "L", cosmosArm:"spear"},
    "cosmos-axe": {name:"コスモス斧", type:"cosmosArm", amount: "L", cosmosArm:"axe"},
    "cosmos-wand": {name:"コスモス杖", type:"cosmosArm", amount: "L", cosmosArm:"wand"},
    "cosmos-gun": {name:"コスモス銃", type:"cosmosArm", amount: "L", cosmosArm:"gun"},
    "cosmos-fist": {name:"コスモス拳", type:"cosmosArm", amount: "L", cosmosArm:"fist"},
    "cosmos-bow": {name:"コスモス弓", type:"cosmosArm", amount: "L", cosmosArm:"bow"},
    "cosmos-katana": {name:"コスモス刀", type:"cosmosArm", amount: "L", cosmosArm:"katana"},
    "cosmos-music": {name:"コスモス楽器", type:"cosmosArm", amount: "L", cosmosArm:"music"},
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

var filterElementTypes = {
    "fire": "火",
    "wind": "風",
    "earth": "土",
    "water": "水",
    "light": "光",
    "dark": "闇",
    "all": "全属性",
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
    "chaos":      {"name": "カオスルーダー",     "favArm1": "sword",   "favArm2": "dagger", "type": "pecu",  "atBonus": 0.0, "kouzinBonus": 0.0, "hpBonus": 0.0, "shugoBonus": 0.0, "DaBonus": 6.5, "TaBonus": 3.0},
    "gizoku":      {"name": "義賊",     "favArm1": "dagger",   "favArm2": "gun", "type": "balance",  "atBonus": 0.0, "kouzinBonus": 0.0, "hpBonus": 0.0, "shugoBonus": 0.0, "DaBonus": 6.5, "TaBonus": 3.0},
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
        "L": [6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 15.6, 16.2, 16.8, 17.4, 18.0],
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
var select_filterelements = Object.keys(filterElementTypes).map(function(opt){return <option value={opt} key={opt}>{filterElementTypes[opt]}</option>;});
var select_summons = Object.keys(summonTypes).map(function(opt){return <option value={opt} key={opt}>{summonTypes[opt]}</option>;});
var select_skills = Object.keys(skilltypes).map(function(key){ return <option value={key} key={key}>{skilltypes[key].name}</option>;})
var select_types = Object.keys(jobTypes).map(function(opt){return <option value={opt} key={opt}>{jobTypes[opt]}</option>;});
var select_armtypes = Object.keys(armTypes).map(function(opt){return <option value={opt} key={opt}>{armTypes[opt]}</option>;});
var select_summonElements = Object.keys(summonElementTypes).map(function(opt){return <option value={opt} key={opt}>{summonElementTypes[opt].name}</option>;});
var select_zenithAttack = zenithAttackBonus.map(function(opt){return <option value={opt} key={opt}>{opt}</option>;});
var select_zenithHP = zenithHPBonus.map(function(opt){return <option value={opt} key={opt}>{opt}</option>;});
var select_slv = skilllevels.map(function(opt){return <option value={opt} key={opt}>{opt}</option>;});
var select_consider = considerNum.map(function(opt){return <option value={opt} key={opt}>{opt}</option>;});
var select_ougiGageBuff = ougiGageBuffList.map(function(opt){return <option value={opt} key={opt}>{opt}</option>;});
var select_ougiRatio = ougiRatioList.map(function(opt){return <option value={opt} key={opt}>{opt}</option>;});
var select_hplist = HPList.map(function(opt){return <option value={opt} key={opt}>{opt}</option>;});
var select_masteratk = masterATKList.map(function(opt){return <option value={opt} key={opt}>{opt}</option>;});
var select_masterhp = masterHPList.map(function(opt){return <option value={opt} key={opt}>{opt}</option>;});
var select_ktypes = Object.keys(keyTypes).map(function(opt){ return <option value={opt} key={opt}>{keyTypes[opt]}</option> });
var select_plusnum = Object.keys(plusNumList).map(function(opt){ return <option value={plusNumList[opt]} key={opt}>{opt}</option> });
var select_levelNoLimit = Object.keys(levelListNoLimit).map(function(opt){ return <option value={levelListNoLimit[opt]} key={opt}>{opt}</option> });
var select_levelLimit = Object.keys(levelListLimit).map(function(opt){ return <option value={levelListLimit[opt]} key={opt}>{opt}</option> });
var select_skilllevelNoLimit = Object.keys(skillLevelListNoLimit).map(function(opt){ return <option value={skillLevelListNoLimit[opt]} key={opt}>{opt}</option> });
var select_skilllevelLimit = Object.keys(skillLevelListLimit).map(function(opt){ return <option value={skillLevelListLimit[opt]} key={opt}>{opt}</option> });
var select_supported_chartsortkeys = Object.keys(supportedChartSortkeys).map(function(opt){ return <option value={opt} key={opt}>{keyTypes[opt]}</option> });
var select_enemydeftypes = Object.keys(enemyDefenseType).map(function(opt){return <option value={opt} key={opt}>{enemyDefenseType[opt].name}</option>;});

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
var touchPosition = null;
var touchDirection = null;

// Root class contains [Profile, ArmList, Results].
var Root = React.createClass({
  getInitialState: function() {
      var initial_width = 50;
      var initial_height = 100;

      if(window.innerWidth <= 1450) {
          initial_width = 100;
          initial_height = 50;
      }
      return {
          armNum: 5,
          summonNum: 2,
          charaNum: 6,
          profile: [],
          armlist: [],
          chara: [],
          summon: [],
          dataName: '',
          sortKey: "totalAttack",
          noResultUpdate: false,
          resultHasChangeButNotUpdated: false,
          oldWidth: window.innerWidth,
          rootleftHeight: initial_height,
          rootleftWidth: initial_width,
          rootrightHeight: initial_height,
          rootrightWidth: initial_width,
      };
  },
  onTouchStart: function(e) {
      //スワイプ開始時の横方向の座標を格納
      touchPosition = this.getPosition(e)
      touchDirection = ''
  },
  onTouchMove: function(e) {
      //スワイプの方向（left / right）を取得
      var td = "none";
      if (touchPosition - this.getPosition(e) > 140) {
          td = 'right'; //左と検知
      } else if (touchPosition - this.getPosition(e) < -140){
          td = 'left'; //右と検知
      }
      touchDirection = td
  },
  onTouchEnd: function(e) {
      if(touchDirection == "left" || touchDirection == "right") {
          this.swipeTab(touchDirection);
      }
  },
  //横方向の座標を取得
  getPosition: function(e) {
      return e.touches[0].pageX;
  },
  swipeTab: function(direction){
      var selected = document.querySelector("button.selected").getAttribute("id")
      document.querySelector("button.selected").removeAttribute("class")
      document.querySelector("div#" + selected).setAttribute("class", selected + " hidden")

      if(direction == "left") {
          switch(selected) {
              case "inputTab":
                  document.querySelector("button#systemTab").setAttribute("class", "selected")
                  document.querySelector("div#systemTab").setAttribute("class", "systemTab")
                  break;
              case "summonTab":
                  document.querySelector("button#inputTab").setAttribute("class", "selected")
                  document.querySelector("div#inputTab").setAttribute("class", "inputTab")
                  break;
              case "charaTab":
                  document.querySelector("button#summonTab").setAttribute("class", "selected")
                  document.querySelector("div#summonTab").setAttribute("class", "summonTab")
                  break;
              case "armTab":
                  document.querySelector("button#charaTab").setAttribute("class", "selected")
                  document.querySelector("div#charaTab").setAttribute("class", "charaTab")
                  break;
              case "resultTab":
                  document.querySelector("button#armTab").setAttribute("class", "selected")
                  document.querySelector("div#armTab").setAttribute("class", "armTab")
                  break;
              case "systemTab":
                  document.querySelector("button#resultTab").setAttribute("class", "selected")
                  document.querySelector("div#resultTab").setAttribute("class", "resultTab")
                  break;
          }
      } else {
          switch(selected) {
              case "inputTab":
                  document.querySelector("button#summonTab").setAttribute("class", "selected")
                  document.querySelector("div#summonTab").setAttribute("class", "summonTab")
                  break;
              case "summonTab":
                  document.querySelector("button#charaTab").setAttribute("class", "selected")
                  document.querySelector("div#charaTab").setAttribute("class", "charaTab")
                  break;
              case "charaTab":
                  document.querySelector("button#armTab").setAttribute("class", "selected")
                  document.querySelector("div#armTab").setAttribute("class", "armTab")
                  break;
              case "armTab":
                  document.querySelector("button#resultTab").setAttribute("class", "selected")
                  document.querySelector("div#resultTab").setAttribute("class", "resultTab")

                  // // resultTabになった時だけ結果を更新する
                  // if(this.state.resultHasChangeButNotUpdated == undefined || this.state.resultHasChangeButNotUpdated) {
                  //     this.setState({noResultUpdate: false});
                  //     this.setState({resultHasChangeButNotUpdated: false});
                  // }
                  break;
              case "resultTab":
                  document.querySelector("button#systemTab").setAttribute("class", "selected")
                  document.querySelector("div#systemTab").setAttribute("class", "systemTab")
                  break;
              case "systemTab":
                  document.querySelector("button#inputTab").setAttribute("class", "selected")
                  document.querySelector("div#inputTab").setAttribute("class", "inputTab")
                  break;
          }
      }
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
              var oldState = this.state
              initState["noResultUpdate"] = false
              initState["oldWidth"] = oldState.oldWidth
              initState["rootleftHeight"] = oldState.rootleftHeight
              initState["rootleftWidth"] = oldState.rootleftWidth
              initState["rootrightHeight"] = oldState.rootrightHeight
              initState["rootrightWidth"] = oldState.rootrightWidth

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
      window.addEventListener('resize', this.handleResize);
  },
  componentWillUnmount() {
      window.removeEventListener('resize', this.handleResize);
  },
  handleEvent: function(key, e) {
      var newState = this.state
      newState[key] = e.target.value
      this.setState(newState)
  },
  onChangeArmData: function(state, isSubtle) {
      // armlistの武器名に変更があればresultはupdateしなくてよい
      this.setState({armlist: state});

      // tablet と smartphoneの時はタブ切り替え時以外updateしない
      if(isSubtle != undefined) {
          this.setState({noResultUpdate: isSubtle});
      } else {
          this.setState({noResultUpdate: false});
      }
  },
  onChangeProfileData: function(state) {
      this.setState({profile: state});
      this.setState({noResultUpdate: false});
  },
  onChangeSummonData: function(state) {
      this.setState({summon: state});
      this.setState({noResultUpdate: false});
  },
  onChangeCharaData: function(state, isSubtle) {
      this.setState({chara: state});

      if(isSubtle != undefined) {
          this.setState({noResultUpdate: isSubtle});
      } else {
          this.setState({noResultUpdate: false});
      }
  },
  handleChangeData: function(newDataName) {
      this.setState({armNum: newData.armNum});
      this.setState({summonNum: newData.summonNum});
      this.setState({dataName: newDataName});
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
      document.querySelector("button#howToTab").removeAttribute("class")

      e.target.setAttribute("class", "selected")

      document.querySelector("div#inputTab").setAttribute("class", "Tab hidden")
      document.querySelector("div#summonTab").setAttribute("class", "Tab hidden")
      document.querySelector("div#charaTab").setAttribute("class", "Tab hidden")
      document.querySelector("div#armTab").setAttribute("class", "Tab hidden")
      document.querySelector("div#resultTab").setAttribute("class", "Tab hidden")
      document.querySelector("div#systemTab").setAttribute("class", "Tab hidden")
      document.querySelector("div#howToTab").setAttribute("class", "Tab hidden")

      var target = document.querySelector("div#" + e.target.getAttribute("id"))
      target.setAttribute("class", "Tab");
  },
  changeTabPC: function(e){
      document.querySelector("button#inputTab").removeAttribute("class")
      document.querySelector("button#summonTab").removeAttribute("class")
      document.querySelector("button#systemTab").removeAttribute("class")
      document.querySelector("button#charaTab").removeAttribute("class")
      document.querySelector("button#armTab").removeAttribute("class")
      document.querySelector("button#howToTab").removeAttribute("class")
      e.target.setAttribute("class", "selected")

      document.querySelector("div#inputTab").setAttribute("class", "Tab hidden")
      document.querySelector("div#summonTab").setAttribute("class", "Tab hidden")
      document.querySelector("div#charaTab").setAttribute("class", "Tab hidden")
      document.querySelector("div#armTab").setAttribute("class", "Tab hidden")
      document.querySelector("div#systemTab").setAttribute("class", "Tab hidden")
      document.querySelector("div#howToTab").setAttribute("class", "Tab hidden")

      var target = document.querySelector("div#" + e.target.getAttribute("id"))
      target.setAttribute("class", "Tab");
  },
  addArmNum: function(e) {
      var newArmNum = parseInt(this.state.armNum);
      if(newArmNum < 20) {
          newArmNum += 1
          this.setState({armNum: newArmNum});
          return newArmNum;
      } else {
          return -1;
      }
  },
  subArmNum: function(e) {
      var newArmNum = parseInt(this.state.armNum);
      if(newArmNum > 1) newArmNum -= 1
      this.setState({armNum: newArmNum});
  },
  addSummonNum: function(e) {
      var newSummonNum = parseInt(this.state.summonNum);
      if(newSummonNum < 6) newSummonNum += 1
      this.setState({summonNum: newSummonNum});
  },
  subSummonNum: function(e) {
      var newSummonNum = parseInt(this.state.summonNum);
      if(newSummonNum > 1) newSummonNum -= 1
      this.setState({summonNum: newSummonNum});
  },
  addCharaNum: function(e) {
      var newCharaNum = parseInt(this.state.charaNum);
      if(newCharaNum < 10) {
          newCharaNum += 1
          this.setState({charaNum: newCharaNum});
          return newCharaNum;
      } else {
          return -1;
      }
  },
  subCharaNum: function(e) {
      var newCharaNum = parseInt(this.state.charaNum);
      if(newCharaNum > 1) newCharaNum -= 1
      this.setState({charaNum: newCharaNum});
  },
  onDragEnd: function(e) {
      if(window.innerWidth > 1450) {
          if(e.pageX > 0) {
              this.setState({rootleftWidth: parseInt(100.0 * e.pageX / window.innerWidth)})
              this.setState({rootrightWidth: 100 - parseInt(100.0 * e.pageX / window.innerWidth)})
              this.setState({noResultUpdate: true})
          }
      } else {
          if(e.pageY > 0) {
              this.setState({rootleftHeight: parseInt(100.0 * e.pageY / window.innerHeight)})
              this.setState({rootrightHeight: 100 - parseInt(100.0 * e.pageY / window.innerHeight)})
              this.setState({noResultUpdate: true})
          }
      }
  },
  handleResize: function(e) {
      if(this.state.oldWidth <= 1450 && e.target.innerWidth > 1450) {
          this.setState({rootleftHeight: 100})
          this.setState({rootrightHeight: 100})
          this.setState({rootleftWidth: 50})
          this.setState({rootrightWidth: 50})
          this.setState({oldWidth: e.target.innerWidth})
          this.setState({noResultUpdate: true})
      } else if(this.state.oldWidth > 1450 && e.target.innerWidth <= 1450) {
          this.setState({rootleftHeight: 50})
          this.setState({rootrightHeight: 50})
          this.setState({rootleftWidth: 100})
          this.setState({rootrightWidth: 100})
          this.setState({oldWidth: e.target.innerWidth})
          this.setState({noResultUpdate: true})
      }
  },
  render: function() {
    if(_ua.Mobile) {
        return (
            <div className="root" onTouchStart={this.onTouchStart} onTouchMove={this.onTouchMove} onTouchEnd={this.onTouchEnd} >
                <h2>元カレ計算機 (グラブル攻撃力計算機) </h2>
                <div className="tabrow">
                    <button id="inputTab" className="selected" onClick={this.changeTab}>ジータ</button>
                    <button id="summonTab" onClick={this.changeTab} >召喚石</button>
                    <button id="charaTab" onClick={this.changeTab} >キャラ</button>
                    <button id="armTab" onClick={this.changeTab} >武器</button>
                    <button id="resultTab" onClick={this.changeTab} >結果</button>
                    <button id="systemTab" onClick={this.changeTab} >保存</button>
                    <button id="howToTab" onClick={this.changeTab} >二手について</button>
                </div>
                <div className="Tab" id="inputTab">
                    <Profile dataName={this.state.dataName} onChange={this.onChangeProfileData} />
                </div>
                <div className="Tab hidden" id="summonTab">
                    <SummonList dataName={this.state.dataName} summonNum={this.state.summonNum} onChange={this.onChangeSummonData} />
                    <ButtonGroup className="addRemoveButtonGroup">
                        <Button className="addRemoveButton" bsStyle="primary" onClick={this.addSummonNum}>召喚石追加(現在{this.state.summonNum}組)</Button>
                        <Button className="addRemoveButton" bsStyle="danger" onClick={this.subSummonNum}>削除</Button>
                    </ButtonGroup>
                </div>
                <div className="Tab hidden" id="charaTab">
                    <CharaList dataName={this.state.dataName} onChange={this.onChangeCharaData} charaNum={this.state.charaNum} pleaseAddCharaNum={this.addCharaNum} />
                    <ButtonGroup className="addRemoveButtonGroup">
                        <Button className="addRemoveButton" bsStyle="primary" onClick={this.addCharaNum}>キャラ追加(現在{this.state.charaNum}人)</Button>
                        <Button className="addRemoveButton" bsStyle="danger" onClick={this.subCharaNum}>削除</Button>
                    </ButtonGroup>
                </div>
                <div className="Tab hidden" id="armTab">
                    <ArmList dataName={this.state.dataName} armNum={this.state.armNum} onChange={this.onChangeArmData} pleaseAddArmNum={this.addArmNum} />
                    <ButtonGroup className="addRemoveButtonGroup">
                        <Button className="addRemoveButton" bsStyle="primary" onClick={this.addArmNum}>武器追加(現在{this.state.armNum}本)</Button>
                        <Button className="addRemoveButton" bsStyle="danger" onClick={this.subArmNum}>削除</Button>
                    </ButtonGroup>
                </div>
                <div className="Tab hidden" id="resultTab">
                    優先する項目: <FormControl componentClass="select" value={this.state.sortKey} onChange={this.handleEvent.bind(this, "sortKey")} > {select_ktypes} </FormControl>
                    <ResultList data={this.state} />
                </div>
                <div className="Tab hidden" id="systemTab">
                    <div className="systemList">
                        <Sys data={this.state} onLoadNewData={this.handleChangeData} />
                        <TwitterShareButton data={this.state} />
                        <Notice />
                    </div>
                </div>
                <div className="Tab hidden" id="howToTab">
                    <HowTo />
                </div>
            </div>
        );
    } else if(_ua.Tablet) {
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
                    <button id="howToTab" onClick={this.changeTab} >二手編成について</button>
                </div>
                <div className="Tab" id="inputTab">
                    <Profile dataName={this.state.dataName} onChange={this.onChangeProfileData} />
                </div>
                <div className="Tab hidden" id="summonTab">
                    <SummonList dataName={this.state.dataName} summonNum={this.state.summonNum} onChange={this.onChangeSummonData} />
                    <ButtonGroup className="addRemoveButtonGroup">
                        <Button className="addRemoveButton" bsStyle="primary" onClick={this.addSummonNum}>召喚石追加(現在{this.state.summonNum}組)</Button>
                        <Button className="addRemoveButton" bsStyle="danger" onClick={this.subSummonNum}>削除</Button>
                    </ButtonGroup>
                </div>
                <div className="Tab hidden" id="charaTab">
                    <CharaList dataName={this.state.dataName} onChange={this.onChangeCharaData} charaNum={this.state.charaNum} pleaseAddCharaNum={this.addCharaNum} />
                    <ButtonGroup className="addRemoveButtonGroup">
                        <Button className="addRemoveButton" bsStyle="primary" onClick={this.addCharaNum}>キャラ追加(現在{this.state.charaNum}人)</Button>
                        <Button className="addRemoveButton" bsStyle="danger" onClick={this.subCharaNum}>削除</Button>
                    </ButtonGroup>
                </div>
                <div className="Tab hidden" id="armTab">
                    <ArmList dataName={this.state.dataName} armNum={this.state.armNum} onChange={this.onChangeArmData} pleaseAddArmNum={this.addArmNum}/>
                    <ButtonGroup className="addRemoveButtonGroup">
                        <Button className="addRemoveButton" bsStyle="primary" onClick={this.addArmNum}>武器追加(現在{this.state.armNum}本)</Button>
                        <Button className="addRemoveButton" bsStyle="danger" onClick={this.subArmNum}>削除</Button>
                    </ButtonGroup>
                </div>
                <div className="Tab hidden" id="resultTab">
                    優先する項目: <FormControl componentClass="select" value={this.state.sortKey} onChange={this.handleEvent.bind(this, "sortKey")} > {select_ktypes} </FormControl>
                    <ResultList data={this.state} />
                </div>
                <div className="Tab hidden" id="systemTab">
                    <div className="systemList">
                        <Sys data={this.state} onLoadNewData={this.handleChangeData} />
                        <TwitterShareButton data={this.state} />
                        <Notice />
                    </div>
                </div>
                <div className="Tab hidden" id="howToTab">
                    <HowTo />
                </div>
            </div>
        );
    } else {
        return (
            <div className="root">
                <div className="rootleft" id="rootleft2" style={{height: this.state.rootleftHeight + "%", width: this.state.rootleftWidth +"%"}}>
                    <h1>元カレ計算機 (グラブル攻撃力計算機) </h1>
                    <div className="tabrow">
                        <button id="inputTab" className="selected" onClick={this.changeTabPC}>入力 / Input</button>
                        <button id="summonTab" onClick={this.changeTabPC} >召喚石 / Summon </button>
                        <button id="charaTab" onClick={this.changeTabPC} >キャラ / Chara</button>
                        <button id="armTab" onClick={this.changeTabPC} >武器 / Weapon</button>
                        <button id="systemTab" onClick={this.changeTabPC} >保存・注記 / System</button>
                        <button id="howToTab" onClick={this.changeTabPC} >二手スキル込みの編成について</button>
                    </div>
                    <div className="Tab" id="inputTab">
                        <Profile dataName={this.state.dataName} onChange={this.onChangeProfileData} />
                    </div>
                    <div className="Tab hidden" id="summonTab">
                        <SummonList dataName={this.state.dataName} summonNum={this.state.summonNum} onChange={this.onChangeSummonData} />
                        <ButtonGroup className="addRemoveButtonGroup">
                            <Button className="addRemoveButton" bsStyle="primary" onClick={this.addSummonNum}>召喚石追加 / Add</Button>
                            <Button className="addRemoveButton" bsStyle="danger" onClick={this.subSummonNum}>削除 / Remove</Button>
                        </ButtonGroup>
                    </div>
                    <div className="Tab hidden" id="charaTab">
                        <CharaList dataName={this.state.dataName} onChange={this.onChangeCharaData} charaNum={this.state.charaNum} pleaseAddCharaNum={this.addCharaNum} />
                        <ButtonGroup className="addRemoveButtonGroup">
                            <Button className="addRemoveButton" bsStyle="primary" onClick={this.addCharaNum}>キャラ追加 / Add</Button>
                            <Button className="addRemoveButton" bsStyle="danger" onClick={this.subCharaNum}>削除 / Remove</Button>
                        </ButtonGroup>
                    </div>
                    <div className="Tab hidden" id="armTab">
                        <ArmList dataName={this.state.dataName} armNum={this.state.armNum} onChange={this.onChangeArmData} pleaseAddCharaNum={this.addCharaNum} pleaseAddArmNum={this.addArmNum} />
                        <ButtonGroup className="addRemoveButtonGroup">
                            <Button className="addRemoveButton" bsStyle="primary" onClick={this.addArmNum}>武器追加 / Add</Button>
                            <Button className="addRemoveButton" bsStyle="danger" onClick={this.subArmNum}>削除 / Remove</Button>
                        </ButtonGroup>
                    </div>
                    <div className="Tab hidden" id="systemTab">
                        <Sys data={this.state} onLoadNewData={this.handleChangeData} />
                        <TwitterShareButton data={this.state} />
                        <Notice />
                    </div>
                    <div className="Tab hidden" id="howToTab">
                        <HowTo />
                    </div>
                </div>
                <div draggable="true" className="drag-hr bg-info" onDragEnd={this.onDragEnd}><span className="label label-primary">drag</span></div>
                <div className="rootRight" style={{height: this.state.rootrightHeight + "%", width: "calc(" + this.state.rootrightWidth + "% - 12px)"}} >
                    優先する項目: <FormControl componentClass="select" value={this.state.sortKey} onChange={this.handleEvent.bind(this, "sortKey")} > {select_ktypes} </FormControl>
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
            addChara: null,
            addCharaID: -1,
            openPresets: false,
        };
    },
    closePresets: function() {
        this.setState({openPresets: false})
    },
    openPresets: function() {
        this.setState({openPresets: true})
    },
    componentWillReceiveProps: function(nextProps) {
        if (parseInt(nextProps.charaNum) < parseInt(this.props.charaNum)) {
            var newcharalist = this.state.charalist;
            while(newcharalist.length > nextProps.charaNum) {
                newcharalist.pop();
            }
            this.setState({charalist: newcharalist})
        }
    },
    handleOnChange: function(key, state, isSubtle){
        var newcharalist = this.state.charalist;
        newcharalist[key] = state;
        this.setState({charalist: newcharalist})
        this.setState({addChara: null})
        this.props.onChange(newcharalist, isSubtle);
    },
    handleEvent: function(key, e) {
        var newState = this.state
        newState[key] = e.target.value
        newState["addChara"] = null
        this.setState(newState)
    },
    addTemplateChara: function(templateChara) {
        var minimumID = -1;
        for(key in this.state.charalist) {
            if(this.state.charalist[key].name == "" && this.state.charalist[key].attack == 0){
                minimumID = key;
                break;
            }
        }
        if(minimumID >= 0) {
            this.setState({addChara: templateChara})
            this.setState({addCharaID: minimumID})
            if(_ua.Mobile || _ua.Tablet) {
                alert("追加しました。")
            }
        } else {
            var newKey = this.props.pleaseAddCharaNum() - 1;

            if(newKey >= 0) {
                this.setState({addChara: templateChara})
                this.setState({addCharaID: newKey})
                if(_ua.Mobile || _ua.Tablet) {
                    alert("追加しました。")
                }
            } else {
                alert("キャラがいっぱいです。")
            }
        }
    },
    render: function() {
        var charas = [];
        for(var i=0; i < this.props.charaNum; i++) {
            charas.push({id: i});
        }
        var hChange = this.handleOnChange;
        var dataName = this.props.dataName;
        var defaultElement = this.state.defaultElement;
        var addChara = this.state.addChara
        var addCharaID = this.state.addCharaID

        if(_ua.Mobile) {
            return (
                <div className="charaList">
                    <ButtonGroup vertical block>
                        <Button bsStyle="success" bsSize="large" onClick={this.openPresets}>キャラテンプレートを開く</Button>
                    </ButtonGroup>
                    <Modal show={this.state.openPresets} onHide={this.closePresets}>
                        <Modal.Header closeButton>
                            <Modal.Title>Presets</Modal.Title>
                            <span>(最大50件しか表示されません)</span>
                        </Modal.Header>
                        <Modal.Body>
                            <RegisteredChara onClick={this.addTemplateChara} />
                        </Modal.Body>
                    </Modal>

                    <ControlLabel>属性一括変更</ControlLabel>
                    <FormControl componentClass="select" className="element" value={this.state.defaultElement} onChange={this.handleEvent.bind(this, "defaultElement")} > {select_elements} </FormControl>
                    {charas.map(function(c) {
                        return <Chara key={c.id} onChange={hChange} id={c.id} dataName={dataName} defaultElement={defaultElement} addChara={addChara} addCharaID={addCharaID} />;
                    })}
                </div>
            );

        } else {
            return (
                <div className="charaList">
                    <Button bsStyle="success" bsSize="large" onClick={this.openPresets}>キャラテンプレートを開く</Button>
                    <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th>キャラ名*</th>
                        <th>属性* <br/> <ControlLabel>一括変更</ControlLabel><FormControl componentClass="select" className="element" value={this.state.defaultElement} onChange={this.handleEvent.bind(this, "defaultElement")} > {select_elements} </FormControl> </th>
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
                            return <Chara key={c.id} onChange={hChange} id={c.id} dataName={dataName} defaultElement={defaultElement} addChara={addChara} addCharaID={addCharaID} />;
                        })}
                    </tbody>
                    </table>

                    <Modal show={this.state.openPresets} onHide={this.closePresets}>
                        <Modal.Header closeButton>
                            <Modal.Title>Presets</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <RegisteredChara onClick={this.addTemplateChara} />
                        </Modal.Body>
                    </Modal>
                </div>
            );
        }
    }
});

var RegisteredChara = React.createClass({
    getInitialState: function() {
        return {
            filterText: "",
            filterElement: "all",
            charaData: {},
            limit: 50,
        };
    },
    componentDidMount: function() {
        $.ajax({
            url: "./charaData.json",
            dataType: 'json',
            cache: false,
            timeout: 10000,
            success: function(data) {
                this.setState({charaData: data})
            }.bind(this),
            error: function(xhr, status, err) {
                alert("Error!: キャラデータの取得に失敗しました。 status: ", status, ", error message: ", err.toString());
            }.bind(this)
        });
    },
    clickedTemplate: function(e) {
        this.props.onClick(this.state.charaData[e.target.getAttribute("id")]);
    },
    handleEvent: function(key, e) {
        var newState = this.state
        newState[key] = e.target.value
        this.setState(newState)
    },
    render: function() {
        var clickedTemplate = this.clickedTemplate;
        var filterText = this.state.filterText;
        var filterElement = this.state.filterElement;
        var charaData = this.state.charaData
        var limit = this.state.limit;
        var displayed_count = 0;

        if(_ua.Mobile){
            return (
                <div className="charaTemplate">
                    <FormControl type="text" placeholder="キャラ名" value={this.state.filterText} onChange={this.handleEvent.bind(this, "filterText")} />
                    <FormControl componentClass="select" value={this.state.filterElement} onChange={this.handleEvent.bind(this, "filterElement")}>{select_filterelements}</FormControl>
                    <div className="charaTemplateContent">
                        {Object.keys(charaData).map(function(key, ind) {
                            if(filterElement == "all" || (charaData[key].element == filterElement)){
                                if(filterText == "" || key.indexOf(filterText) != -1){
                                    if(displayed_count < limit) {
                                        displayed_count++;
                                        return (
                                            <div className="onechara" key={key}>
                                                <p>{charaData[key].name}</p><br/>
                                                <Image rounded onClick={clickedTemplate} id={key} src={charaData[key].imageURL} alt={key} />
                                            </div>
                                        );
                                    } else {
                                        return "";
                                    }
                                }
                            }
                            return "";
                        })}
                    </div>
                </div>
            )
        } else {
            return (
                <div className="charaTemplate">
                    <FormControl type="text" placeholder="キャラ名" value={this.state.filterText} onChange={this.handleEvent.bind(this, "filterText")} />
                    <FormControl componentClass="select" value={this.state.filterElement} onChange={this.handleEvent.bind(this, "filterElement")}>{select_filterelements}</FormControl>
                    <div className="charaTemplateContent">
                        {Object.keys(charaData).map(function(key, ind) {
                            if(filterElement == "all" || (charaData[key].element == filterElement)){
                                if(filterText == "" || key.indexOf(filterText) != -1){
                                    return (
                                        <div className="onechara" key={key}>
                                            <p>{charaData[key].name}</p><br/>
                                            <Image rounded onClick={clickedTemplate} id={key} src={charaData[key].imageURL} alt={key} />
                                        </div>
                                    );
                                }
                            }
                            return "";
                        })}
                    </div>
                </div>
            )
        }
    },
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

       // もし addCharaIDが設定されていて、自分と一致しているなら読み込む
       if(this.props.addChara != null && this.props.id == this.props.addCharaID ) {
           var newchara = this.props.addChara

           state["name"] = newchara.name
           state["attack"] = parseInt(newchara.attack)
           state["hp"] = parseInt(newchara.hp)
           state["type"] = newchara.type
           state["race"] = newchara.race
           state["element"] = newchara.element
           state["favArm"] = newchara.fav1
           state["favArm2"] = newchara.fav2
           state["DA"] = parseFloat(newchara.baseDA)
           state["TA"] = parseFloat(newchara.baseTA)

           this.setState(state);
       }
       // 初期化後 state を 上の階層に渡しておく
       // CharaList では onChange が勝手に上に渡してくれるので必要なし
       this.props.onChange(this.props.id, state, false);
    },
    componentWillReceiveProps: function(nextProps){
        // only fired on Data Load
        if(nextProps.dataName != this.props.dataName) {
            var chara = newData.chara
            if( chara != undefined && this.props.id in chara ){
                state = chara[this.props.id]
                this.setState(state)
                this.props.onChange(this.props.id, state, false)
            }
        }
        if(nextProps.defaultElement != this.props.defaultElement) {
            var newState = this.state
            newState["element"] = nextProps.defaultElement
            this.setState(newState);
            this.props.onChange(this.props.id, newState, false);
        }

        if(nextProps.addChara != null && nextProps.addChara != this.props.addChara && this.props.id == nextProps.addCharaID ) {
            var newState = this.state
            var newchara = nextProps.addChara

            newState["name"] = newchara.name
            newState["attack"] = parseInt(newchara.attack)
            newState["hp"] = parseInt(newchara.hp)
            newState["type"] = newchara.type
            newState["race"] = newchara.race
            newState["element"] = newchara.element
            newState["favArm"] = newchara.fav1
            newState["favArm2"] = newchara.fav2
            newState["DA"] = parseFloat(newchara.baseDA)
            newState["TA"] = parseFloat(newchara.baseTA)

            this.setState(newState);
            this.props.onChange(this.props.id, newState, false);
        }
    },
    handleEvent: function(key, e) {
        var newState = this.state
        var isSubtle = false

        if(key == "isConsideredInAverage") {
            newState[key] = (newState[key] == false) ? true : false
        } else {
            if(key == "name" && this.state.name != "" && newState.name != "") {
                isSubtle = true
            }

            newState[key] = e.target.value
        }
        this.setState(newState)
        this.props.onChange(this.props.id, newState, isSubtle)
    },
    render: function() {
        if(_ua.Mobile) {
            return (
                <table className="table table-bordered"><tbody>
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
        var sm = []
        for(var i=0; i < this.props.summonNum; i++) { sm.push(i); }

        return {
            smlist: [],
            defaultElement: "fire",
            summons: sm,
        };
    },
    updateSummonNum: function(num) {
        var summons = this.state.summons

        if(summons.length < num) {
            var maxvalue = Math.max.apply(null, summons)
            for(var i = 0; i < (num - summons.length); i++){
                summons.push(i + maxvalue + 1)
            }
        } else {
            // ==の場合は考えなくてよい (問題がないので)
            while(summons.length > num){
                summons.pop();
            }
        }
        this.setState({summons: summons})
    },
    componentWillReceiveProps: function(nextProps) {
        if (parseInt(nextProps.summonNum) < parseInt(this.props.summonNum)) {
            var newsmlist = this.state.smlist;
            while(newsmlist.length > nextProps.summonNum) {
                newsmlist.pop();
            }
            this.setState({smlist: newsmlist})
        }
        this.updateSummonNum(nextProps.summonNum)
    },
    handleOnCopy: function(id, keyid, state) {
        var newsummons = this.state.summons
        var maxvalue = Math.max.apply(null, newsummons)

        newsummons.splice(id + 1, 0, maxvalue + 1)
        newsummons.pop();
        this.setState({summons: newsummons})

        // newDataにコピー対象のstateを入れておいて、componentDidMountで読み出されるようにする
        if(!("summon" in newData)) {
            // もしnewDataが更新される前だったらkeyを作っておく
            newData["summon"] = {}
        }
        newData.summon[id + 1] = state;

        var newsmlist = this.state.smlist;
        newsmlist.splice(id + 1, 0, state)
        newsmlist.pop();
        this.setState({smlist: newsmlist})

        // Root へ変化を伝搬
        this.props.onChange(newsmlist);
    },
    handleOnRemove: function(id, keyid, state) {
        var newsummons = this.state.summons
        var maxvalue = Math.max.apply(null, newsummons)

        // 該当の "key" を持つものを削除する
        newsummons.splice(this.state.summons.indexOf(keyid), 1)
        // 1個補充
        newsummons.push(maxvalue + 1)
        this.setState({summons: newsummons})

        // newDataにinitial stateを入れておいて、componentDidMountで読み出されるようにする
        if(!("summon" in newData)) {
            newData["summon"] = {}
        }
        newData.summon[newsummons.length - 1] = state;

        var newsmlist = this.state.smlist;
        // 削除した分をalistからも削除
        newsmlist.splice(id, 1)
        // 1個補充
        newsmlist.push(state)
        this.setState({smlist: newsmlist})

        // Root へ変化を伝搬
        this.props.onChange(newsmlist);
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
        var summons = this.state.summons;
        var hChange = this.handleOnChange;
        var hRemove = this.handleOnRemove;
        var hCopy = this.handleOnCopy;
        var dataName = this.props.dataName;
        var defaultElement = this.state.defaultElement;
        if(_ua.Mobile) {
            return (
                <div className="summonList">
                    <ControlLabel>属性一括変更</ControlLabel><FormControl componentClass="select" className="element" value={this.state.defaultElement} onChange={this.handleEvent.bind(this, "defaultElement")} > {select_summonElements} </FormControl>
                    {summons.map(function(sm, ind) {
                        return <Summon key={sm} keyid={sm} onRemove={hRemove} onCopy={hCopy} onChange={hChange} id={ind} dataName={dataName} defaultElement={defaultElement} />;
                    })}
                </div>
            );
        } else {
            return (
                <div className="summonList">
                    [属性一括変更]<FormControl componentClass="select" className="element" value={this.state.defaultElement} onChange={this.handleEvent.bind(this, "defaultElement")} > {select_summonElements} </FormControl>
                    <h3 className="margin-top"> 召喚石 </h3>
                    <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th>自分の石*</th>
                        <th>フレの石*</th>
                        <th>合計攻撃力*</th>
                        <th>合計HP</th>
                        <th>HPUP(%)</th>
                        <th>DA加護</th>
                        <th>TA加護</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                        {summons.map(function(sm, ind) {
                            return <Summon key={sm} keyid={sm} onRemove={hRemove} onCopy={hCopy} onChange={hChange} id={ind} dataName={dataName} defaultElement={defaultElement} />;
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
    clickRemoveButton: function(e) {
        this.props.onRemove(this.props.id, this.props.keyid, this.getInitialState())
    },
    clickCopyButton: function(e, state) {
        this.props.onCopy(this.props.id, this.props.keyid, this.state)
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
                <table className="table table-bordered">
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
                    <td>{selfSummon[0].label}<FormControl type={selfSummon[0].input} min="0" max="200" value={this.state.selfSummonAmount} onChange={this.handleSummonAmountChange.bind(this, "self", 0)} /><br/>
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
                <tr>
                    <th>操作</th>
                    <td>
                        <ButtonGroup vertical block>
                            <Button bsStyle="primary" block onClick={this.clickRemoveButton}>削除</Button>
                            <Button bsStyle="primary" block onClick={this.clickCopyButton}>コピー</Button>
                        </ButtonGroup>
                    </td>
                </tr>
                </tbody>
                </table>
            );
        } else {
            return (
                <tr>
                    <td>
                        <FormControl componentClass="select" value={this.state.selfElement} onChange={this.handleEvent.bind(this, "selfElement")} >{select_summonElements}</FormControl>
                        <FormControl componentClass="select" value={this.state.selfSummonType} onChange={this.handleEvent.bind(this, "selfSummonType")} >{select_summons}</FormControl>
                        {selfSummon[0].label}<FormControl type={selfSummon[0].input} placeholder="加護量" min="0" max="200" value={this.state.selfSummonAmount} onChange={this.handleSummonAmountChange.bind(this, "self", 0)} />
                        {selfSummon[1].label}<FormControl type={selfSummon[1].input} placeholder="加護量" min="0" max="200" value={this.state.selfSummonAmount2} onChange={this.handleSummonAmountChange.bind(this, "self", 1)} />
                    </td>
                    <td>
                        <FormControl componentClass="select" value={this.state.friendElement} onChange={this.handleEvent.bind(this, "friendElement")} >{select_summonElements}</FormControl>
                        <FormControl componentClass="select" value={this.state.friendSummonType} onChange={this.handleEvent.bind(this, "friendSummonType")} >{select_summons}</FormControl>
                        {friendSummon[0].label}<FormControl type={friendSummon[0].input} placeholder="加護量" min="0" max="200" value={this.state.friendSummonAmount} onChange={this.handleSummonAmountChange.bind(this, "friend", 0)} />
                        {friendSummon[1].label}<FormControl type={friendSummon[1].input} placeholder="加護量" min="0" max="200" value={this.state.friendSummonAmount2} onChange={this.handleSummonAmountChange.bind(this, "friend", 1)} />
                    </td>
                    <td><FormControl type="number" min="0" value={this.state.attack} onChange={this.handleEvent.bind(this, "attack")}/></td>
                    <td><FormControl type="number" min="0" value={this.state.hp} onChange={this.handleEvent.bind(this, "hp")}/></td>
                    <td><FormControl type="number" min="0" value={this.state.hpBonus} onChange={this.handleEvent.bind(this, "hpBonus")}/></td>
                    <td><FormControl type="number" min="0" value={this.state.DA} onChange={this.handleEvent.bind(this, "DA")}/></td>
                    <td><FormControl type="number" min="0" value={this.state.TA} onChange={this.handleEvent.bind(this, "TA")}/></td>
                    <td>
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

var ResultList = React.createClass({
    calculateCombinations: function(arml) {
        // 全武器に対して [最小考慮数, ... , 最大考慮数] の配列を計算しておく
        var armNumArray = []
        var totalItr = 1;
        for(var i = 0; i < arml.length; i++){
            var temp = []
            var numMin = (arml[i].considerNumberMin != undefined) ? parseInt(arml[i].considerNumberMin) : 0
            var numMax = (arml[i].considerNumberMax != undefined) ? parseInt(arml[i].considerNumberMax) : 1
            var itr = numMax - numMin + 1
            for(var j = 0; j < itr; j++){
                temp[j] = j + numMin;
            }
            totalItr *= itr;
            armNumArray[i] = temp;
        }
        var combinations = []
        var index = []
        for(var i = 0; i < armNumArray.length; i++){
            index[i] = 0;
        }

        // isCosmos 事前判定
        var isCosmosArray = []
        for(var i = 0; i < arml.length; i++){
            isCosmosArray[i] = this.isCosmos(arml[i])
        }

        for(var i = 0; i < totalItr; i=(i+1)|0){
            var temp = []
            var num = 0;
            var isCosmosIncluded = false;
            var isValidCombination = true;
            for(var j = 0; j < armNumArray.length; j=(j+1)|0){
                if(!isCosmosArray[j]) {
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
            index = this.proceedIndex(index, armNumArray, 0)
        }
        return combinations
    },
    proceedIndex: function(index, ana, i){
        if(i == ana.length){
            return index;
        } else {
            index[i] = (index[i] + 1)|0;
            if(index[i] > ana[i].length - 1){
                index[i] = 0;
                index = this.proceedIndex(index, ana, i + 1);
            }
            return index
        }
    },
    isCosmos: function(arm){
        var isCos = false;
        if(skilltypes[arm.skill1] != undefined && skilltypes[arm.skill1].type == "cosmosArm") {
            isCos = true;
        } else if(skilltypes[arm.skill2] != undefined && skilltypes[arm.skill2].type == "cosmosArm") {
            isCos = true;
        }

        return isCos
    },
    calculateBasedOneSummon: function(summonind, prof, buff, totals) {
        var res = {}

        for(key in totals) {
            var totalSummon = totals[key]["totalSummon"][summonind]

            // for attack
            var magnaCoeff = 1.0 + 0.01 * totals[key]["magna"] * totalSummon["magna"]
            var magnaHaisuiCoeff = 1.0 + 0.01 * (totals[key]["magnaHaisui"]) * totalSummon["magna"]
            var unknownCoeff = 1.0 + 0.01 * totals[key]["unknown"] * totalSummon["ranko"] + 0.01 * totals[key]["unknownOther"]
            var unknownHaisuiCoeff = 1.0 + 0.01 * totals[key]["unknownOtherHaisui"]

            var normalCoeff = 1.0 + 0.01 * totals[key]["normal"] * totalSummon["zeus"] + 0.01 * totals[key]["bahaAT"] + totalSummon["chara"] + buff["normal"]
            var normalHaisuiCoeff = 1.0 + 0.01 * (totals[key]["normalHaisui"]) * totalSummon["zeus"]
            var normalKonshinCoeff = 1.0 + 0.01 * (totals[key]["normalKonshin"]) * totalSummon["zeus"]
            var elementCoeff = totals[key]["typeBonus"] + (totalSummon["element"] - 1.0) + buff["element"]
            var otherCoeff = 1.0 + buff["other"]

            if(key == "Djeeta") {
                // for Djeeta
                var summedAttack = (totals[key]["baseAttack"] + totals[key]["armAttack"] + totalSummon["attack"] + totals["Djeeta"]["zenithATK"] + totals["Djeeta"]["job"].atBonus) * (1.0 + buff["master"])
                var displayHP = (totals[key]["baseHP"] + totalSummon["hp"] + totals[key]["armHP"] + totals["Djeeta"]["zenithHP"]) * (1.0 + buff["masterHP"])
            } else {
                // for chara
                var summedAttack = totals[key]["baseAttack"] + totals[key]["armAttack"] + totalSummon["attack"]
                var displayHP = totals[key]["baseHP"] + totals[key]["armHP"] + totalSummon["hp"]
            }

            var totalAttack = summedAttack * magnaCoeff * magnaHaisuiCoeff * normalCoeff * normalHaisuiCoeff * elementCoeff * unknownCoeff * otherCoeff * unknownHaisuiCoeff * normalKonshinCoeff
            var totalHP = displayHP * (1.0 - totals[key]["HPdebuff"]) * (1.0 + buff["hp"] + totalSummon["hpBonus"] + 0.01 * totals[key]["bahaHP"] + 0.01 * totals[key]["magnaHP"] * totalSummon["magna"] + 0.01 * totals[key]["normalHP"] * totalSummon["zeus"] + 0.01 * totals[key]["unknownHP"] * totalSummon["ranko"])

            // for DA and TA
            // baseDA: 6.5%, baseTA: 3.0%
            var normalNite = (totals[key]["normalNite"] * totalSummon["zeus"] > 50.0) ? 50.0 : totals[key]["normalNite"] * totalSummon["zeus"]
            var magnaNite = (totals[key]["magnaNite"] * totalSummon["magna"] > 50.0) ? 50.0 : totals[key]["magnaNite"] * totalSummon["magna"]
            var normalSante = (totals[key]["normalSante"] * totalSummon["zeus"] > 50.0) ? 50.0 : totals[key]["normalSante"] * totalSummon["zeus"]
            var magnaSante = (totals[key]["magnaSante"] * totalSummon["magna"] > 50.0) ? 50.0 : totals[key]["magnaSante"] * totalSummon["magna"]
            var unknownOtherNite = (totals[key]["unknownOtherNite"] > 50.0) ? 50.0 : totals[key]["unknownOtherNite"]

            // DATA sup
            var armDAup = (unknownOtherNite + normalNite + normalSante + magnaNite + magnaSante + totals[key]["bahaDA"] + totals[key]["cosmosBL"]> 50.0) ? 50.0 : normalNite + normalSante + magnaNite + magnaSante + unknownOtherNite + totals[key]["bahaDA"] + totals[key]["cosmosBL"]
            var armTAup = (normalSante + magnaSante + totals[key]["bahaTA"] > 50.0) ? 50.0 : normalSante + magnaSante + totals[key]["bahaTA"]

            var totalDA = 100.0 * (0.01 * totals[key]["baseDA"] + buff["da"] + totalSummon["da"] + 0.01 * armDAup)
            var totalTA = 100.0 * (0.01 * totals[key]["baseTA"] + buff["ta"] + totalSummon["ta"] + 0.01 * armTAup)
            var taRate = (parseFloat(totalTA) >= 100.0) ? 1.0 : 0.01 * parseFloat(totalTA)
            var daRate = (parseFloat(totalDA) >= 100.0) ? 1.0 : 0.01 * parseFloat(totalDA)
            var expectedAttack = 3.0 * taRate + (1.0 - taRate) * (2.0 * daRate + (1.0 - daRate))

            if(totals[key]["typeBonus"] != 1.5) {
                var criticalRatio = 1.0
            } else {
                var criticalRatio = (1.0 + skillAmounts["magnaCritical"]["ratio"]) * 0.01 * totals[key]["magnaCritical"] * totalSummon["magna"] + (1.0 + skillAmounts["normalCritical"]["ratio"]) * 0.01 * totals[key]["normalCritical"] * totalSummon["zeus"] + 1.0 * (1.0 - 0.01 * totals[key]["normalCritical"] * totalSummon["zeus"] - 0.01 * totals[key]["magnaCritical"] * totalSummon["magna"])
            }
            var criticalAttack = parseInt(totalAttack * criticalRatio)
            var expectedOugiGage = buff["ougiGage"] * (taRate * 37.0 + (1.0 - taRate) * (daRate * 22.0 + (1.0 - daRate) * 10.0))
            var expectedTurn = Math.ceil(100.0 / expectedOugiGage)

            var damage = this.calculateDamage(criticalRatio * totalAttack, prof.enemyDefense)
            var ougiDamage = this.calculateOugiDamage(criticalRatio * totalAttack, prof.enemyDefense, prof.ougiRatio)
            var expectedCycleDamage = ougiDamage + expectedTurn * expectedAttack * damage
            var expectedCycleDamagePerTurn = expectedCycleDamage / (expectedTurn + 1)

            var nazo_number = parseInt(totalAttack * criticalRatio * expectedAttack)

            // 表示用配列
            var coeffs = {};
            coeffs["normal"] = normalCoeff;
            coeffs["normalHaisui"] = normalHaisuiCoeff;
            coeffs["normalKonshin"] = normalKonshinCoeff;
            coeffs["magna"] = magnaCoeff;
            coeffs["magnaHaisui"] = magnaHaisuiCoeff;
            coeffs["unknown"] = unknownCoeff;
            coeffs["unknownHaisui"] = unknownHaisuiCoeff;
            coeffs["other"] = otherCoeff;

            res[key] = {totalAttack: Math.ceil(totalAttack), displayAttack: Math.ceil(summedAttack), totalHP: Math.round(totalHP), displayHP: Math.round(displayHP), remainHP: totals[key]["remainHP"], totalDA: totalDA, totalTA: totalTA, totalSummon: totalSummon, element: totals[key]["element"], expectedAttack: expectedAttack, criticalAttack: criticalAttack, criticalRatio: criticalRatio, totalExpected: nazo_number, skilldata: coeffs, expectedOugiGage: expectedOugiGage, damage: damage, ougiDamage: ougiDamage, expectedTurn: expectedTurn, expectedCycleDamagePerTurn: expectedCycleDamagePerTurn};
        }
        var average = 0.0;
        var crit_average = 0.0;
        var totalExpected_average = 0.0;
        var averageCyclePerTurn = 0.0;

        var cnt = 0.0
        for(key in res) {
            if(totals[key]["isConsideredInAverage"]) {
                average += res[key].totalAttack
                crit_average += res[key].criticalAttack
                totalExpected_average += res[key].totalExpected
                averageCyclePerTurn += res[key].expectedCycleDamagePerTurn
                cnt += 1.0
            }
        }
        res["Djeeta"]["averageAttack"] = parseInt(average/cnt)
        res["Djeeta"]["averageCriticalAttack"] = parseInt(crit_average/cnt)
        res["Djeeta"]["averageTotalExpected"] = parseInt(totalExpected_average/cnt)
        res["Djeeta"]["averageCyclePerTurn"] = parseInt(averageCyclePerTurn/cnt)
        return res
    },
    calculateDamage: function(totalAttack, enemyDefense) {
        // ダメージ計算
        var def = (enemyDefense == undefined) ? 10.0 : enemyDefense
        var damage = totalAttack / def
        var overedDamage = 0
        // 補正1
        if(damage > 612500) {
            overedDamage += 0.01 * (damage - 612500)
            damage = 612500
        }
        // 補正2
        if(damage > 550000) {
            overedDamage += 0.10 * (damage - 550000)
            damage = 550000
        }
        // 補正3
        if(damage > 425000) {
            overedDamage += 0.40 * (damage - 425000)
            damage = 425000
        }
        // 補正4
        if(damage > 300000) {
            overedDamage += 0.70 * (damage - 300000)
            damage = 300000
        }

        return damage + overedDamage
    },
    calculateOugiDamage: function(totalAttack, enemyDefense, ougiRatio) {
        // ダメージ計算
        var def = (enemyDefense == undefined) ? 10.0 : enemyDefense
        var ratio = (ougiRatio == undefined) ? 4.5 : ougiRatio
        var damage = totalAttack * ratio / def
        var overedDamage = 0
        // 補正1
        if(damage > 1400000) {
            overedDamage += 0.01 * (damage - 1400000)
            damage = 1400000
        }
        // 補正2
        if(damage > 1300000) {
            overedDamage += 0.05 * (damage - 1300000)
            damage = 1300000
        }
        // 補正3
        if(damage > 1150000) {
            overedDamage += 0.40 * (damage - 1150000)
            damage = 1150000
        }
        // 補正4
        if(damage > 1000000) {
            overedDamage += 0.60 * (damage - 1000000)
            damage = 1000000
        }

        return damage + overedDamage
    },
    calculateOneCombination: function(comb, summon, prof, arml, totals, buff){
        // var tempArmList = []
        // for(var i = 0; i < arml.length; i++){
        //     for(var j = 0; j < comb[i]; j++){
        //         tempArmList.push(arml[i]);
        //     }
        // }
        this.addSkilldataToTotals(totals, comb, arml, buff)
        var result = []
        for(var i = 0; i < summon.length; i++){
           // 攻撃などの結果を入れた連想配列の配列を作る
           result.push(this.calculateBasedOneSummon(i, prof, buff, totals));
        }

        return result
    },
    addSkilldataToTotals: function(totals, comb, arml, buff) {
        // cosmos武器があるかどうかを確認しておく
        var cosmosType = '';
        for(var i = 0; i < arml.length; i++){
            if(comb[i] > 0) {
                var arm = arml[i];
                if(this.isCosmos(arm)) {
                    if(skilltypes[arm.skill1].type == "cosmosArm") {
                        cosmosType = skilltypes[arm.skill1].cosmosArm
                    } else {
                        cosmosType = skilltypes[arm.skill2].cosmosArm
                    }
                }
            }
        }

        var index = 0;
        for( key in totals ) {
            index = (index + 1)|0;
            var isBahaAtIncluded = false; var isBahaAthpIncluded = false;

            for(var i = 0; i < arml.length; i++){
                if(comb[i] == 0) continue

                var arm = arml[i];
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

                totals[key]["armAttack"] += armSup * parseInt(arm.attack) * comb[i]
                totals[key]["armHP"] += hpSup * parseInt(arm.hp) * comb[i]

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
                                    totals[key]["bahaAT"] += comb[i] * skillAmounts["bahaAT"][amount][slv - 1];
                                    isBahaAtIncluded = true;
                                } else {
                                    var bahatype = skillname.split("-")
                                    if( bahamutRelation[bahatype[1]]["type1"] == totals[key]["race"] ) {
                                        totals[key]["bahaAT"] += comb[i] * skillAmounts["bahaAT"][amount][slv - 1];
                                        isBahaAtIncluded = true;
                                    }
                                }
                            }
                        } else if(stype == 'bahaATHP') {
                            if(!isBahaAthpIncluded) {
                                // バハ剣など
                                if(totals[key]["race"] == "unknown") {
                                    totals[key]["bahaAT"] += comb[i] * skillAmounts["bahaAT"][amount][slv - 1];
                                    totals[key]["bahaHP"] += comb[i] * skillAmounts["bahaHP"][amount][slv - 1];
                                    isBahaAthpIncluded = true;
                                } else {
                                    var bahatype = skillname.split("-")
                                    if( bahamutRelation[bahatype[1]]["type1"] == totals[key]["race"] || bahamutRelation[ bahatype[1]]["type2"] == totals[key]["race"] ) {
                                        totals[key]["bahaAT"] += comb[i] * skillAmounts["bahaAT"][amount][slv - 1];
                                        totals[key]["bahaHP"] += comb[i] * skillAmounts["bahaHP"][amount][slv - 1];
                                        isBahaAthpIncluded = true;
                                    }
                                }
                            }
                        } else if(stype == 'bahaFUATHP') {
                            if(totals[key]["race"] == "unknown") {
                                totals[key]["bahaAT"] += comb[i] * skillAmounts["bahaFUATHP"]["AT"][slv - 1];
                                totals[key]["bahaHP"] += comb[i] * skillAmounts["bahaFUATHP"]["HP"][slv - 1];
                            } else {
                                var bahatype = skillname.split("-")
                                if( bahamutFURelation[bahatype[1]]["type1"] == totals[key]["race"] || bahamutFURelation[ bahatype[1]]["type2"] == totals[key]["race"] ) {
                                    totals[key]["bahaAT"] += comb[i] * skillAmounts["bahaFUATHP"]["AT"][slv - 1];
                                    totals[key]["bahaHP"] += comb[i] * skillAmounts["bahaFUATHP"]["HP"][slv - 1];
                                }
                            }
                        } else if(stype == 'bahaFUHP') {
                            if(totals[key]["race"] == "unknown") {
                                totals[key]["bahaHP"] += comb[i] * skillAmounts["bahaFUHP"]["HP"][slv - 1];
                                totals[key]["bahaDA"] += comb[i] * skillAmounts["bahaFUHP"]["DA"][slv - 1];
                                totals[key]["bahaTA"] += comb[i] * skillAmounts["bahaFUHP"]["TA"][slv - 1];
                            } else {
                                var bahatype = skillname.split("-")
                                if( bahamutFURelation[bahatype[1]]["type1"] == totals[key]["race"] || bahamutFURelation[ bahatype[1]]["type2"] == totals[key]["race"] ) {
                                    totals[key]["bahaHP"] += comb[i] * skillAmounts["bahaFUHP"]["HP"][slv - 1];
                                    totals[key]["bahaDA"] += comb[i] * skillAmounts["bahaFUHP"]["DA"][slv - 1];
                                    totals[key]["bahaTA"] += comb[i] * skillAmounts["bahaFUHP"]["TA"][slv - 1];
                                }
                            }
                        } else if(stype == 'cosmos') {
                            // コスモス武器
                            if(skillname == 'cosmosAT' && totals[key]["type"] == "attack") {
                                totals[key]["normal"] += comb[i] * 20.0;
                                totals[key]["HPdebuff"] += comb[i] * 0.40
                            } else if(skillname == 'cosmosDF' && totals[key]["type"] == "defense") {
                                totals[key]["HPdebuff"] -= comb[i] * 0.10
                            } else if(skillname == 'cosmosBL' && totals[key]["type"] == "balance") {
                                totals[key]["cosmosBL"] = comb[i] * 20.0
                            }
                        } else if(stype == 'cosmosArm') {
                            // コスモス武器スキルはスキップ
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
                                var haisuiBuff = (baseRate/3.0) * ( 2.0 * remainHP * remainHP - 5.0 * remainHP + 3.0 )
                                totals[key][stype] += comb[i] * haisuiBuff
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
                                totals[key][stype] += comb[i] * konshinBuff
                            } else if(stype == 'normalKamui') {
                                totals[key]["normal"] += comb[i] * skillAmounts["normal"][amount][slv - 1];
                                totals[key]["normalHP"] += comb[i] * skillAmounts["normalHP"][amount][slv - 1];
                            } else if(stype == 'magnaKamui') {
                                totals[key]["magna"] += comb[i] * skillAmounts["magna"][amount][slv - 1];
                                totals[key]["magnaHP"] += comb[i] * skillAmounts["magnaHP"][amount][slv - 1];
                            } else if(stype == 'normalSetsuna') {
                                totals[key]["normalCritical"] += comb[i] * skillAmounts["normalCritical"][amount][slv - 1];
                                totals[key]["normal"] += comb[i] * skillAmounts["normal"][amount][slv - 1];
                            } else if(stype == 'magnaSetsuna') {
                                totals[key]["magnaCritical"] += comb[i] * skillAmounts["magnaCritical"][amount][slv - 1];
                                totals[key]["magna"] += comb[i] * skillAmounts["magna"][amount][slv - 1];
                            } else if(stype == 'normalKatsumi') {
                                totals[key]["normalCritical"] += comb[i] * skillAmounts["normalCritical"][amount][slv - 1];
                                totals[key]["normalNite"] += comb[i] * skillAmounts["normalNite"][amount][slv - 1];
                            } else if(stype == 'magnaKatsumi') {
                                totals[key]["magnaCritical"] += comb[i] * skillAmounts["magnaCritical"][amount][slv - 1];
                                totals[key]["magnaNite"] += comb[i] * skillAmounts["magnaNite"][amount][slv - 1];
                            } else if(stype == 'normalBoukun') {
                                totals[key]["HPdebuff"] += comb[i] * 0.10
                                totals[key]["normal"] += comb[i] * skillAmounts["normal"][amount][slv - 1];
                            } else if(stype == 'magnaBoukun') {
                                totals[key]["HPdebuff"] += comb[i] * 0.10
                                totals[key]["magna"] += comb[i] * skillAmounts["magna"][amount][slv - 1];
                            } else if(stype == 'unknownOtherBoukun'){
                                totals[key]["HPdebuff"] += comb[i] * 0.07
                                totals[key]["unknown"] += comb[i] * skillAmounts["unknown"][amount][slv - 1];
                            } else if(stype == 'gurenJuin'){
                                if(index == 2){
                                    totals[key]["normal"] += comb[i] * skillAmounts["normal"][amount][slv - 1];
                                }
                            } else {
                                totals[key][stype] += comb[i] * skillAmounts[stype][amount][slv - 1];
                            }
                        }
                    }
                }
            }

            // バハ武器重複上限
            if(totals[key]["bahaAT"] > 50) totals[key]["bahaAT"] = 50
            if(totals[key]["bahaHP"] > 50) totals[key]["bahaHP"] = 50
        }
    },
    initializeTotals: function(totals) {
        // 初期化
        for(key in totals){
            totals[key]["armAttack"] = 0; totals[key]["armHP"] = 0; totals[key]["HPdebuff"] = 0; totals[key]["magna"] = 0;
            totals[key]["magnaHaisui"] = 0; totals[key]["normal"] = 0; totals[key]["normalHaisui"] = 0; totals[key]["normalKonshin"] = 0;
            totals[key]["unknown"] = 0; totals[key]["unknownOther"] = 0; totals[key]["unknownOtherHaisui"] = 0; totals[key]["bahaAT"] = 0;
            totals[key]["bahaHP"] = 0; totals[key]["bahaDA"] = 0; totals[key]["bahaTA"] = 0; totals[key]["magnaHP"] = 0;
            totals[key]["normalHP"] = 0; totals[key]["unknownHP"] = 0; totals[key]["normalNite"] = 0; totals[key]["magnaNite"] = 0;
            totals[key]["normalSante"] = 0; totals[key]["magnaSante"] = 0; totals[key]["unknownOtherNite"] = 0; totals[key]["normalCritical"] = 0;
            totals[key]["magnaCritical"] = 0; totals[key]["cosmosBL"] = 0;
        }
    },
    getTotalBuff: function(prof) {
        var totalBuff = {master: 0.0, masterHP: 0.0, normal: 0.0, element: 0.0, other: 0.0, zenith1: 0.0, zenith2: 0.0, hp: 0.0, da: 0.0, ta: 0.0, ougiGage: 1.0};

        if(!isNaN(prof.masterBonus)) totalBuff["master"] += 0.01 * parseInt(prof.masterBonus);
        if(!isNaN(prof.masterBonusHP)) totalBuff["masterHP"] += 0.01 * parseInt(prof.masterBonusHP);
        if(!isNaN(prof.hpBuff)) totalBuff["hp"] += 0.01 * parseInt(prof.hpBuff);
        if(!isNaN(prof.daBuff)) totalBuff["da"] += 0.01 * parseInt(prof.daBuff);
        if(!isNaN(prof.taBuff)) totalBuff["ta"] += 0.01 * parseInt(prof.taBuff);
        if(!isNaN(prof.ougiGageBuff)) totalBuff["ougiGage"] += 0.01 * parseInt(prof.ougiGageBuff);
        totalBuff["normal"] += 0.01 * parseInt(prof.normalBuff);
        totalBuff["element"] += 0.01 * parseInt(prof.elementBuff);
        totalBuff["other"] += 0.01 * parseInt(prof.otherBuff);
        totalBuff["zenith1"] += zenith[prof.zenithBonus1];
        totalBuff["zenith2"] += zenith[prof.zenithBonus2];

        return totalBuff
    },
    getInitialTotals: function(prof, chara, summon) {
        var baseAttack = (prof.rank > 100) ? 5000 + (parseInt(prof.rank) - 100) * 20 : 1000 + (parseInt(prof.rank)) * 40
        var baseHP = (prof.rank > 100) ? 1400 + (parseInt(prof.rank) - 100) * 4.0 : 600 + (parseInt(prof.rank)) * 8
        var element = (prof.element == undefined) ? "fire" : prof.element
        var djeetaRemainHP = (prof.remainHP != undefined && parseInt(prof.remainHP) < parseInt(prof.hp)) ? 0.01 * parseInt(prof.remainHP) : 0.01 * parseInt(prof.hp)
        var djeetaDA = (prof.DA == undefined) ? 6.5 : parseFloat(prof.DA)
        var djeetaTA = (prof.TA == undefined) ? 3.0 : parseFloat(prof.TA)
        var job = (prof.job == undefined) ? Jobs["none"] : Jobs[prof.job]
        var zenithATK = (prof.zenithAttackBonus == undefined) ? 3000 : parseInt(prof.zenithAttackBonus)
        var zenithHP = (prof.zenithHPBonus == undefined) ? 1000 : parseInt(prof.zenithHPBonus)

        var totals = {"Djeeta": {baseAttack: baseAttack, baseHP: baseHP, baseDA: djeetaDA, baseTA: djeetaTA, remainHP: djeetaRemainHP, armAttack: 0, armHP:0, fav1: job.favArm1, fav2: job.favArm2, race: "unknown", type: job.type, element: element, HPdebuff: 0.00, magna: 0, magnaHaisui: 0, normal: 0, normalHaisui: 0, normalKonshin: 0, unknown: 0, unknownOther: 0, unknownOtherHaisui: 0, bahaAT: 0, bahaHP: 0, bahaDA: 0, bahaTA: 0, magnaHP: 0, normalHP: 0, unknownHP: 0, normalNite: 0, magnaNite: 0, normalSante: 0, magnaSante: 0, unknownOtherNite: 0, normalCritical: 0, magnaCritical: 0, cosmosBL: 0, isConsideredInAverage: true, job: job, zenithATK: zenithATK, zenithHP: zenithHP}};

        for(var i = 0; i < chara.length; i++){
            if(chara[i].name != "") {
                var charaelement = (chara[i].element == undefined) ? "fire" : chara[i].element
                var charaDA = (chara[i].DA == undefined) ? 6.5 : chara[i].DA
                var charaTA = (chara[i].TA == undefined) ? 3.0 : chara[i].TA
                var charaRemainHP = (chara[i].remainHP != undefined && parseInt(chara[i].remainHP) < parseInt(prof.hp)) ? 0.01 * parseInt(chara[i].remainHP) : 0.01 * parseInt(prof.hp)
                var charaConsidered = (chara[i].isConsideredInAverage == undefined) ? true : chara[i].isConsideredInAverage

                // key 重複対応
                var charakey = chara[i].name;
                var k = 1;
                while(charakey in totals) {
                    charakey = chara[i].name + k
                        k++;
                }

                totals[charakey] = {baseAttack: parseInt(chara[i].attack), baseHP: parseInt(chara[i].hp), baseDA: parseFloat(charaDA), baseTA: parseFloat(charaTA), remainHP: charaRemainHP, armAttack: 0, armHP:0, fav1: chara[i].favArm, fav2: chara[i].favArm2, race: chara[i].race, type: chara[i].type, element: charaelement, HPdebuff: 0.00, magna: 0, magnaHaisui: 0, normal: 0, normalHaisui: 0, normalKonshin: 0, unknown: 0, unknownOther: 0, unknownOtherHaisui: 0, bahaAT: 0, bahaHP: 0, bahaDA: 0, bahaTA: 0, magnaHP: 0, normalHP: 0, unknownHP: 0, bahaHP: 0, normalNite: 0, magnaNite: 0, normalSante: 0, magnaSante: 0, unknownOtherNite: 0, normalCritical: 0, magnaCritical: 0, cosmosBL: 0, isConsideredInAverage: charaConsidered}
            }
        }
        for(key in totals) {
            totals[key]["totalSummon"] = []
            for(var s = 0; s < summon.length; s++) {
                var selfElement = (summon[s].selfElement == undefined) ? "fire" : summon[s].selfElement
                var friendElement = (summon[s].friendElement == undefined) ? "fire" : summon[s].friendElement

                var totalSummon = {magna: 1.0, element: 1.0, zeus: 1.0, chara: 0.0, ranko: 1.0, attack: 0, hp: 0.0, hpBonus: 0.0, da: 0, ta: 0};

                if((summonElementTypes[selfElement]["type"].indexOf(totals[key]["element"]) >= 0) || selfElement == "all" ){
                    if(summon[s].selfSummonType == "odin") {
                        // odin(属性+キャラ攻撃)など、複数の場合の処理
                        totalSummon["element"] += 0.01 * parseInt(summon[s].selfSummonAmount)
                        totalSummon["chara"] += 0.01 * parseInt(summon[s].selfSummonAmount2)
                    } else {
                        // 自分の加護 通常の場合
                        totalSummon[summon[s].selfSummonType] += 0.01 * parseInt(summon[s].selfSummonAmount)
                    }
                }
                if((summonElementTypes[friendElement]["type"].indexOf(totals[key]["element"]) >= 0) || friendElement == "all" ){
                    if(summon[s].friendSummonType == "odin") {
                        // odin(属性+キャラ攻撃)など、複数の場合の処理
                        totalSummon["element"] += 0.01 * parseInt(summon[s].friendSummonAmount)
                        totalSummon["chara"] += 0.01 * parseInt(summon[s].friendSummonAmount2)
                    } else {
                        // フレンドの加護 通常の場合
                        totalSummon[summon[s].friendSummonType] += 0.01 * parseInt(summon[s].friendSummonAmount)
                    }
                }

                // 後から追加したので NaN でないか判定しておく
                if(!isNaN(summon[s].attack)) totalSummon["attack"] = parseInt(summon[s].attack)
                if(!isNaN(summon[s].hp)) totalSummon["hp"] = parseInt(summon[s].hp)
                if(!isNaN(summon[s].hpBonus)) totalSummon["hpBonus"] = 0.01 * parseInt(summon[s].hpBonus)
                if(!isNaN(summon[s].DA)) totalSummon["da"] = 0.01 * parseInt(summon[s].DA)
                if(!isNaN(summon[s].TA)) totalSummon["ta"] = 0.01 * parseInt(summon[s].TA)

                totals[key]["totalSummon"][s] = totalSummon
            }
        }

        var enemyElement = (prof.enemyElement == undefined || prof.enemyElement == "水") ? "fire" : prof.enemyElement
        for(key in totals){
            if(elementRelation[ totals[key]["element"] ]["weak"] == enemyElement) {
                totals[key]["typeBonus"] = 0.75
            } else if(elementRelation[ totals[key]["element"] ]["strong"] == enemyElement) {
                totals[key]["typeBonus"] = 1.5
            } else {
                totals[key]["typeBonus"] = 1.0
            }
        }

        return totals
    },
    calculateResult: function(newprops) {
      var prof = newprops.data.profile; var arml = newprops.data.armlist;
      var summon = newprops.data.summon; var chara = newprops.data.chara;

      if (prof != undefined && arml != undefined && summon != undefined && chara != undefined) {
          var totalBuff = this.getTotalBuff(prof)

          // 後から追加したパラメータはNaNなことがあるので追加処理
          // sortKey がNaNでないならそちらを使う、NaNなら総合攻撃力で
          var sortkey = "totalAttack"
          var sortkeyname = "総合攻撃力"
          if(newprops.data.sortKey == newprops.data.sortKey) {
              sortkey = newprops.data.sortKey
              sortkeyname = keyTypes[sortkey]
          }

          // combinationsが変更されていないなら古いやつを使う
          if(this.state.previousArmlist != null) {
              var isCombinationChanged = false;
              if(this.state.previousArmlist.length != arml.length) {
                  isCombinationChanged = true;
              }
              if(!isCombinationChanged) {
                  for(var i = 0; i < arml.length; i = (i + 1)|0){
                      if(arml[i].considerNumberMax != this.state.previousArmlist[i].considerNumberMax || arml[i].considerNumberMin != this.state.previousArmlist[i].considerNumberMin) {
                          isCombinationChanged = true;
                      }
                  }
              }
              if(isCombinationChanged) {
                  var combinations = this.calculateCombinations(arml)
                  this.setState({previousArmlist: JSON.parse(JSON.stringify(arml))})
                  this.setState({previousCombinations: JSON.parse(JSON.stringify(combinations))})
              } else {
                  var combinations = this.state.previousCombinations
              }
          } else {
              var combinations = this.calculateCombinations(arml)
              this.setState({previousArmlist: JSON.parse(JSON.stringify(arml))})
              this.setState({previousCombinations: JSON.parse(JSON.stringify(combinations))})
          }

          var res = []
          var minSortKey = []
          for(var i = 0; i < summon.length; i++){
              res[i] = []
              minSortKey[i] = -1
          }

          var totals = this.getInitialTotals(prof, chara, summon)
          var itr = combinations.length
          var totalItr = itr * summon.length * Object.keys(totals).length

          for(var i = 0; i < itr; i = (i + 1)|0){
              var oneres = this.calculateOneCombination(combinations[i], summon, prof, arml, totals, totalBuff)
              for(var j = 0; j < summon.length; j++){
                  if(i < 10) {
                      //  まずminSortkeyを更新する
                      if (minSortKey[j] < 0 || minSortKey[j] > oneres[j].Djeeta[sortkey]) {
                          minSortKey[j] = oneres[j].Djeeta[sortkey]
                      }
                      res[j].push({data: oneres[j], armNumbers: combinations[i]});
                  } else {
                      // minSortkey より大きいものだけpush
                      if (oneres[j].Djeeta[sortkey] >= minSortKey[j]) {
                          // 11番目に追加する
                          res[j].push({data: oneres[j], armNumbers: combinations[i]});

                          // 10番目まででminSortkey[j]と一致するものを消す
                          var spliceid = -1;
                          for(var k = 0; k < 10; k = (k + 1)|0) {
                              if(res[j][k].data.Djeeta[sortkey] == minSortKey[j]) {
                                  spliceid = k
                              }
                          }
                          res[j].splice(spliceid, 1)
                          minSortKey[j] = -1

                          // 10個の配列になったので、もう一度最小値を計算する
                          for(var k = 0; k < 10; k = (k + 1)|0) {
                              if (minSortKey[j] < 0 || minSortKey[j] > res[j][k].data.Djeeta[sortkey]) {
                                  minSortKey[j] = res[j][k].data.Djeeta[sortkey]
                              }
                          }
                      }
                  }
              }
              this.initializeTotals(totals)
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

          return {summon: summon, result: res, sortkeyname: sortkeyname, totalItr: totalItr}
      } else {
          return {summon: summon, result: []}
      }
    },
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
            switchOugiGage: 0,
            switchOugiDamage: 0,
            switchCycleDamage: 0,
            switchAverageCycleDamage: 0,
            disableAutoResultUpdate: 0,
            result: {summon: this.props.data.summon, result: []},
            haisuiSortKey: "totalAttack",
            haisuiData: {},
            storedList: {"combinations": [], "armlist": []},
            openHPChart: false,
            hpChartButtonActive: false,
            openHPChartTutorial: false,
            previousArmlist: null,
            previousCombinations: null,
        };
    },
    closeHPChart: function() {
        this.setState({openHPChart: false})
    },
    closeHPChartTutorial: function() {
        this.setState({openHPChartTutorial: false})
    },
    openHPChartTutorial: function() {
        this.setState({openHPChartTutorial: true})
    },
    componentWillReceiveProps: function(nextProps) {
        if(this.state.disableAutoResultUpdate != 1 && (nextProps.data.noResultUpdate == undefined || !nextProps.data.noResultUpdate)){
            var allresult = this.calculateResult(nextProps);
            this.setState({result: allresult});
        }

        // armlistが変更されていないかcheck => 変更されてたら今までの分消す
        var isArmValid = true
        for(var i = 0; i < this.state.storedList.combinations.length; i++) {
            if(nextProps.data.armlist.length != this.state.storedList.armlist[i].length) {
                isArmValid = false
                continue;
            }
            for(var k = 0; k < nextProps.data.armlist.length; k++){
                // 名前と攻撃力が同時に変更されていた場合、削除や追加などが起こっていると予想される
                if(nextProps.data.armlist[k].name != this.state.storedList.armlist[i][k].name && nextProps.data.armlist[k].attack != this.state.storedList.armlist[i][k].attack ) {
                    isArmValid = false
                    break;
                }
            }
        }
        if(!isArmValid){
            this.setState({storedList: {"combinations": [], "armlist": []}})
            this.setState({hpChartButtonActive: false})
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
    openHPChart: function() {
        var storedCombinations = this.state.storedList.combinations
        var storedArmlist = this.state.storedList.armlist

        var prof = this.props.data.profile; var arml = this.props.data.armlist;
        var summon = this.props.data.summon; var chara = this.props.data.chara;
        var totalBuff = this.getTotalBuff(prof)
        var totals = this.getInitialTotals(prof, chara, summon)

        var sortkey = "totalAttack"
        var sortkeyname = "総合攻撃力"
        if(this.props.data.sortKey == this.props.data.sortKey) {
            sortkey = this.props.data.sortKey
            sortkeyname = keyTypes[sortkey]
        }

        var res = []
        for(var i = 0; i < summon.length; i++){
            res[i] = []
        }

        for(var i = 0; i < storedCombinations.length; i++){
            var oneres = this.calculateOneCombination(storedCombinations[i], summon, prof, arml, totals, totalBuff)
            for(var j = 0; j < summon.length; j++){
                res[j].push({data: oneres[j], armNumbers: storedCombinations[i]});
            }
            this.initializeTotals(totals)
        }
        // resに再計算されたデータが入っている状態
        // res[summonind][rank]
        this.setState({haisuiData: this.generateHaisuiData(res, arml, summon, prof, storedCombinations)})
        this.setState({haisuiSortKey: sortkey})
        this.setState({openHPChart: true})
    },
    generateHaisuiData: function(res, arml, summon, prof, storedCombinations) {
        var data = {}
        var minMaxArr = {
            "totalAttack": {"max": 0, "min": 0},
            "totalHP": {"max": 0, "min": 0},
            "expectedCycleDamagePerTurn": {"max": 0, "min": 0},
            "averageAttack": {"max": 0, "min": 0},
            "averageCyclePerTurn": {"max": 0, "min": 0},
        }

        if(res.length > 1) {
            var AllTotalAttack = [["残りHP(%)"]];
            var AllCycleDamagePerTurn = [["残りHP(%)"]];
            var AllAverageTotalAttack = [["残りHP(%)"]];
            var AllAverageCycleDamagePerTurn = [["残りHP(%)"]];
            var AllTotalHP = [["残りHP(%)"]]
            for(var m = 1; m < 101; m++){
                AllTotalAttack.push([m.toString() + "%"])
                AllCycleDamagePerTurn.push([m.toString() + "%"])
                AllTotalHP.push([m.toString() + "%"])
                AllAverageTotalAttack.push([m.toString() + "%"])
                AllAverageCycleDamagePerTurn.push([m.toString() + "%"])
            }
        }

        for(var s = 0; s < res.length; s++) {
            var oneresult = res[s]
            var summonHeader = ""
            if(summon[s].selfSummonType == "odin"){
                summonHeader += "属性攻" + summon[s].selfSummonAmount + "キャラ攻" + summon[s].selfSummonAmount2
            } else {
                summonHeader += summonElementTypes[summon[s].selfElement].name + summonTypes[summon[s].selfSummonType] + summon[s].selfSummonAmount
            }

            summonHeader += " + "
            if(summon[s].friendSummonType == "odin"){
                summonHeader += "属性攻" + summon[s].friendSummonAmount + "キャラ攻" + summon[s].friendSummonAmount2
            } else {
                summonHeader += summonElementTypes[summon[s].friendElement].name + summonTypes[summon[s].friendSummonType] + summon[s].friendSummonAmount
            }
            var TotalAttack = [["残りHP(%)"]]; var CycleDamagePerTurn = [["残りHP(%)"]]; var AverageTotalAttack = [["残りHP(%)"]]; var AverageCycleDamagePerTurn = [["残りHP(%)"]];
            var TotalHP = [["残りHP(%)"]]
            for(var m = 1; m < 101; m++){
                TotalAttack.push([m.toString() + "%"])
                CycleDamagePerTurn.push([m.toString() + "%"])
                TotalHP.push([m.toString() + "%"])
                AverageTotalAttack.push([m.toString() + "%"])
                AverageCycleDamagePerTurn.push([m.toString() + "%"])

                // 合計値を足すために先に要素を追加しておく
                // (key の 処理順が不明のため)
                for(var j = 0; j < oneresult.length; j++){
                    AverageTotalAttack[m].push(0)
                    AverageCycleDamagePerTurn[m].push(0)
                }
            }

            for(var j = 0; j < oneresult.length; j++){
                var onedata = oneresult[j].data
                var cnt = Object.keys(onedata).length

                var title = "No. " + (j+1).toString() + ":"
                for(var i=0; i < arml.length; i++){
                    if(storedCombinations[j][i] > 0) {
                        var name = (arml[i].name == "") ? "武器(" + i.toString() + ")" : arml[i].name
                        title += name.substr(0,6) + storedCombinations[j][i] + "本\n"
                    }
                }
                for(key in onedata){
                    var totalSummon = onedata[key].totalSummon
                    var normalHaisuiOrig = 0.01 * onedata[key].skilldata.normalHaisui
                    var magnaHaisuiOrig = 0.01 * onedata[key].skilldata.magnaHaisui
                    var normalKonshinOrig = 0.01 * onedata[key].skilldata.normalKonshin
                    var totalAttackWithoutHaisui = onedata[key].totalAttack / ((1.0 + normalHaisuiOrig) * (1.0 + magnaHaisuiOrig) * (1.0 + normalKonshinOrig))
                    var haisuiBuff = []
                    for(var k = 0; k < 100; k++){
                        haisuiBuff.push({normalHaisui: 1.0, magnaHaisui: 1.0, normalKonshin: 1.0})
                    }
                    for(var i=0; i < arml.length; i++){
                        var arm = arml[i]
                        for(var jj = 1; jj <= 2; jj++){
                            var skillname = '';
                            var element = ''; (arm.element == undefined) ? "fire" : arm.element
                            if(jj == 1) {
                                skillname = arm.skill1
                                element = (arm.element == undefined) ? "fire" : arm.element
                            } else {
                                skillname = arm.skill2
                                element = (arm.element2 == undefined) ? "fire" : arm.element2
                            }

                            if(skillname != 'non' && onedata[key].element == element){
                                var stype = skilltypes[skillname].type;
                                var amount = skilltypes[skillname].amount;
                                var slv = parseInt(arm.slv)

                                // mask invalid slv
                                if(slv == 0) slv = 1

                                if(stype == "normalHaisui" || stype == "magnaHaisui"){
                                    for(var l=0; l < haisuiBuff.length; l++) {
                                        var remainHP = 0.01 * (l + 1)
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
                                        if(stype == "normalHaisui") {
                                            haisuiBuff[l][stype] += storedCombinations[j][i] * 0.01 * (baseRate/3.0) * ( 2.0 * remainHP * remainHP - 5.0 * remainHP + 3.0 ) * totalSummon.zeus
                                        } else {
                                            haisuiBuff[l][stype] += storedCombinations[j][i] * 0.01 * (baseRate/3.0) * ( 2.0 * remainHP * remainHP - 5.0 * remainHP + 3.0 ) * totalSummon.magna
                                        }
                                    }
                                } else if(stype == "normalKonshin" || stype == "magnaKonshin"){
                                    for(var l=0; l < haisuiBuff.length; l++) {
                                        var remainHP = 0.01 * (l + 1)
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
                                        if(stype == "normalKonshin") {
                                            haisuiBuff[l][stype] += storedCombinations[j][i] * 0.01 * baseRate * remainHP * totalSummon.zeus
                                        } else {
                                            haisuiBuff[l][stype] += storedCombinations[j][i] * 0.01 * baseRate * remainHP * totalSummon.magna
                                        }
                                    }
                                }
                            }
                        }
                    }

                    for(var k = 0; k < 100; k++){
                        var newTotalAttack = totalAttackWithoutHaisui * haisuiBuff[k].normalHaisui * haisuiBuff[k].magnaHaisui * haisuiBuff[k].normalKonshin
                        var newDamage = this.calculateDamage(onedata[key].criticalRatio * newTotalAttack, prof.enemyDefense)
                        var newOugiDamage = this.calculateOugiDamage(onedata[key].criticalRatio * newTotalAttack, prof.enemyDefense, prof.ougiRatio)
                        var newExpectedCycleDamagePerTurn = (newOugiDamage + onedata[key].expectedTurn * onedata[key].expectedAttack * newDamage) / (onedata[key].expectedTurn + 1)

                        if(key == "Djeeta") {
                            TotalAttack[k + 1].push( parseInt(newTotalAttack) )
                            TotalHP[k + 1].push( parseInt(0.01 * (k + 1) * onedata[key].totalHP) )
                            CycleDamagePerTurn[k + 1].push( parseInt(newExpectedCycleDamagePerTurn) )
                        }

                        AverageTotalAttack[k + 1][j + 1] += parseInt(newTotalAttack / cnt)
                        AverageCycleDamagePerTurn[k + 1][j + 1] += parseInt(newExpectedCycleDamagePerTurn / cnt)
                    }
                }
                TotalAttack[0].push(title)
                TotalHP[0].push(title)
                CycleDamagePerTurn[0].push(title)
                AverageTotalAttack[0].push(title)
                AverageCycleDamagePerTurn[0].push(title)

                // 召喚石2組以上の場合
                if(res.length > 1) {
                    AllTotalAttack[0].push("(" + summonHeader + ")" + title)
                    AllTotalHP[0].push("(" + summonHeader + ")" + title)
                    AllCycleDamagePerTurn[0].push("(" + summonHeader + ")" + title)
                    AllAverageTotalAttack[0].push("(" + summonHeader + ")" + title)
                    AllAverageCycleDamagePerTurn[0].push("(" + summonHeader + ")" + title)

                    for(var k = 1; k < 101; k++) {
                        AllTotalAttack[k].push(TotalAttack[k][j + 1])
                        AllTotalHP[k].push(TotalHP[k][j + 1])
                        AllCycleDamagePerTurn[k].push(CycleDamagePerTurn[k][j + 1])
                        AllAverageTotalAttack[k].push(AverageTotalAttack[k][j + 1])
                        AllAverageCycleDamagePerTurn[k].push(AverageCycleDamagePerTurn[k][j + 1])
                    }
                }
            }

            data[summonHeader] = {}
            data[summonHeader]["totalAttack"] = TotalAttack
            data[summonHeader]["expectedCycleDamagePerTurn"] = CycleDamagePerTurn
            data[summonHeader]["averageAttack"] = AverageTotalAttack
            data[summonHeader]["averageCyclePerTurn"] = AverageCycleDamagePerTurn
            data[summonHeader]["totalHP"] = TotalHP
        }

        if(res.length > 1){
            data["まとめて比較"] = {}
            data["まとめて比較"]["totalAttack"] = AllTotalAttack
            data["まとめて比較"]["totalHP"] = AllTotalHP
            data["まとめて比較"]["expectedCycleDamagePerTurn"] = AllCycleDamagePerTurn
            data["まとめて比較"]["averageAttack"] = AllAverageTotalAttack
            data["まとめて比較"]["averageCyclePerTurn"] = AllAverageCycleDamagePerTurn
        }

        // グラフ最大値最小値を抽出
        for(key in minMaxArr) {
            for(summonkey in data) {
                for(var k = 1; k <= 100; k++){
                    for(var j = 1; j <= res[0].length; j++){
                        // グラフ最大値最小値を保存
                        if(data[summonkey][key][k][j] > minMaxArr[key]["max"]) minMaxArr[key]["max"] = data[summonkey][key][k][j]
                        if(data[summonkey][key][k][j] < minMaxArr[key]["min"] || minMaxArr[key]["min"] == 0) minMaxArr[key]["min"] = data[summonkey][key][k][j]
                    }
                }
            }
        }

        data["minMaxArr"] = minMaxArr
        return data
    },
    addHaisuiData: function(id, summonid) {
        var newStored = this.state.storedList
        newStored["combinations"].push(JSON.parse(JSON.stringify(this.state.result.result[summonid][id].armNumbers)))
        newStored["armlist"].push(JSON.parse(JSON.stringify(this.props.data.armlist)))
        this.setState({storedList: newStored})
        this.setState({hpChartButtonActive: true})
    },
    resetStoredList: function(e) {
        this.setState({storedList: {"combinations": [], "armlist": []}})
        this.setState({openHPChart: false})
        this.setState({hpChartButtonActive: false})
    },
    render: function() {
        res = this.state.result;
        var prof = this.props.data.profile
        var arm = this.props.data.armlist
        var chara = this.props.data.chara
        var summondata = res.summon
        var result = res.result
        var onAddToHaisuiData = this.addHaisuiData

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
            tableheader.push("期待攻撃回数\n(期待攻撃力)")
        }
        if(switcher.switchCriticalRatio) {
            tableheader.push("技巧期待値\n(期待攻撃力, 平均攻撃力)")
        }
        if(switcher.switchHP) {
            tableheader.push("HP\n(残HP)")
        }
        if(switcher.switchCharaHP) {
            for(var i = 0; i < chara.length; i++){
                if(chara[i].name != "") {
                    tableheader.push(chara[i].name + "HP")
                }
            }
        }
        if(switcher.switchAverageAttack) {
            tableheader.push('パーティ平均攻撃力')
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
        if(switcher.switchOugiGage) {
            tableheader.push("ターン毎の\n奥義ゲージ上昇量")
        }
        if(switcher.switchOugiDamage) {
            tableheader.push("奥義ダメージ")
        }
        if(switcher.switchCycleDamage) {
            tableheader.push("予想ターン毎ダメージ")
        }
        if(switcher.switchAverageCycleDamage) {
            tableheader.push("予想ターン毎ダメージ\nのパーティ平均値")
        }

        var job = (prof.job == undefined) ? Jobs["none"].name : Jobs[prof.job].name
        var remainHPstr = "ジータ(" + job + ")HP";
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
        remainHPstr += ", 通常バフ" + prof.normalBuff + "%, 属性バフ" + prof.elementBuff + "%, その他バフ" + prof.otherBuff + "%"

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
                        <td><Checkbox inline checked={this.state.switchDamage} onChange={this.handleEvent.bind(this, "switchDamage")} /> 単攻撃ダメージ</td>
                    </tr><tr>
                        <td><Checkbox inline checked={this.state.switchOugiGage} onChange={this.handleEvent.bind(this, "switchOugiGage")} />奥義ゲージ上昇期待値</td>
                        <td><Checkbox inline checked={this.state.switchOugiDamage} onChange={this.handleEvent.bind(this, "switchOugiDamage")} />奥義ダメージ</td>
                    </tr><tr>
                        <td><Checkbox inline checked={this.state.switchCycleDamage} onChange={this.handleEvent.bind(this, "switchCycleDamage")} />予想ターン毎ダメージ</td>
                        <td><Checkbox inline checked={this.state.switchAverageCycleDamage} onChange={this.handleEvent.bind(this, "switchAverageCycleDamage")} />予想ターン毎ダメージの平均値</td>
                    </tr>
                    </tbody>
                    </table>
                    <br/>
                    動作制御:
                    <Checkbox inline checked={this.state.disableAutoResultUpdate} onChange={this.handleEvent.bind(this, "disableAutoResultUpdate")} /> 自動更新を切る
                    <span> / 計算総数:{res.totalItr}組(1万超の場合、計算に時間がかかります)</span>
                    <Button bsStyle="primary" bsSize="large" block onClick={this.openHPChart} disabled={!this.state.hpChartButtonActive} >背水渾身グラフを開く(beta)</Button>
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
                                <div className="charainfo"><span>{remainHPstr}</span></div>
                                <table className="table table-bordered">
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
                                    <th>操作</th>
                                </tr>
                                </thead>
                                <Result key={summonindex} summonid={summonindex} data={result[summonindex]} switcher={switcher} arm={arm} prof={prof} onAddToHaisuiData={onAddToHaisuiData} />
                                </table>
                            </div>
                        );
                    })}
                    <Modal className="hpChart" show={this.state.openHPChart} onHide={this.closeHPChart}>
                        <Modal.Header closeButton>
                            <Modal.Title>HP Charts ({remainHPstr})</Modal.Title>
                            <Button bsStyle="primary" onClick={this.openHPChartTutorial}>使い方</Button>
                            <Button bsStyle="danger" onClick={this.resetStoredList}>保存された編成を全て削除</Button>
                        </Modal.Header>
                        <Modal.Body>
                            <HPChart data={this.state.haisuiData} sortKey={this.state.haisuiSortKey} />
                            <Modal className="hpChartTutotial" show={this.state.openHPChartTutorial} onHide={this.closeHPChartTutorial}>
                                <Modal.Header closeButton>
                                    <Modal.Title>HP Chartsの使い方</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <p>HPチャート機能は「保存された武器編成の攻撃力等を、残りHP割合ごとに再計算する」機能です。</p>
                                    <h2>1.</h2>
                                    <p>適当に編成を計算した後、グラフを見たい編成をグラフに加えます。</p>
                                    <Thumbnail alt="HPチャート操作1" src="./otherImages/hpChartTutorial1.png">
                                    </Thumbnail>
                                    <h2>2.</h2>
                                    <p>グラフに加えると、「背水渾身チャートを開く」ボタンが有効化されるので、クリックします。</p>
                                    <h2>3.</h2>
                                    <p>「優先する項目」に設定されている値を描画したグラフが表示されます。</p>
                                    <Thumbnail alt="HPチャート操作1" src="./otherImages/hpChartTutorial2.png">
                                    </Thumbnail>
                                    <p className="text-danger">まだサポートされていない要素が「優先する項目」に設定されている場合、"総合攻撃力"のグラフに変更されます。</p>
                                    <h2>4.</h2>
                                    <p>上部の選択ボタンで、他の要素を表示することも可能です。</p>
                                    <Thumbnail alt="HPチャート操作1" src="./otherImages/hpChartTutorial3.png">
                                    </Thumbnail>
                                    <h2>5.</h2>
                                    <p>複数の召喚石組み合わせが設定されている場合、複数のグラフが作成されます。</p>
                                    <Thumbnail alt="HPチャート操作1" src="./otherImages/hpChartTutorial4.png">
                                    </Thumbnail>
                                    <p className="text-danger">現在は、ある組み合わせをグラフに保存すると、全てのグラフに追加されるようになっています。
                                    これを召喚石別にするかどうかは、今後検討します。</p>
                                    <h2>注記</h2>
                                    <p>編成として保存されるのは「武器の組み合わせの本数」のみです。
                                    そのため、武器攻撃力やバフ量などを変更した場合、結果のグラフも自動的に変更されます。</p>
                                    <p className="text-danger">武器枠の数が追加/削除された場合、武器枠のデータがリセットされた場合は、
                                    保存されている編成はリセットされてしまいますのでご注意下さい。
                                    これは、武器組み合わせのみを保存しているため、誤って組み合わせで再計算されることを防ぐためです。</p>
                                    <p>また、現在「追加した特定のグラフを削除する」機能は実装されておりませんので、
                                    グラフが多くなりすぎてしまった場合、全削除を行い、保存されている編成をリセットしてください。</p>
                                    <p>ご要望・不具合等あればお知らせ下さい。</p>
                                </Modal.Body>
                            </Modal>
                        </Modal.Body>
                    </Modal>
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
                        <td><Checkbox inline checked={this.state.switchDamage} onChange={this.handleEvent.bind(this, "switchDamage")} /> 単攻撃ダメージ</td>
                    </tr>
                    <tr>
                        <td><Checkbox inline checked={this.state.switchOugiGage} onChange={this.handleEvent.bind(this, "switchOugiGage")} /> 奥義ゲージ上昇期待値 </td>
                        <td><Checkbox inline checked={this.state.switchOugiDamage} onChange={this.handleEvent.bind(this, "switchOugiDamage")} /> 奥義ダメージ </td>
                        <td><Checkbox inline checked={this.state.switchCycleDamage} onChange={this.handleEvent.bind(this, "switchCycleDamage")} /> 予想ターン毎ダメージ </td>
                        <td><Checkbox inline checked={this.state.switchAverageCycleDamage} onChange={this.handleEvent.bind(this, "switchAverageCycleDamage")} /> 予想ターン毎ダメージの平均値 </td>
                        <td></td>
                        <td></td>
                    </tr>
                    </tbody></table>
                    <br/>
                    動作制御:
                    <Checkbox inline className="autoupdate" checked={this.state.disableAutoResultUpdate} onChange={this.handleEvent.bind(this, "disableAutoResultUpdate")} /> 自動更新を切る

                    <span> / 計算総数:{res.totalItr}組(1万超の場合、計算に時間がかかります)</span>
                    <hr />
                    <Button bsStyle="primary" bsSize="large" block onClick={this.openHPChart} disabled={!this.state.hpChartButtonActive} >背水渾身グラフを開く(beta)</Button>
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
                                <div className="charainfo"><span>{remainHPstr}</span></div>
                                <table className="table table-bordered">
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
                                    <th>操作</th>
                                </tr>
                                </thead>
                                <Result key={summonindex} summonid={summonindex} data={result[summonindex]} switcher={switcher} arm={arm} prof={prof} onAddToHaisuiData={onAddToHaisuiData} />
                                </table>
                            </div>
                        );
                    })}
                    <Modal className="hpChart" show={this.state.openHPChart} onHide={this.closeHPChart}>
                        <Modal.Header closeButton>
                            <Modal.Title>HP Charts ({remainHPstr})</Modal.Title>
                            <Button bsStyle="primary" onClick={this.openHPChartTutorial}>使い方</Button>
                            <Button bsStyle="danger" onClick={this.resetStoredList}>保存された編成を全て削除</Button>
                        </Modal.Header>
                        <Modal.Body>
                            <HPChart data={this.state.haisuiData} sortKey={this.state.haisuiSortKey} />
                            <Modal className="hpChartTutotial" show={this.state.openHPChartTutorial} onHide={this.closeHPChartTutorial}>
                                <Modal.Header closeButton>
                                    <Modal.Title>HP Chartsの使い方</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <p>HPチャート機能は「保存された武器編成の攻撃力等を、残りHP割合ごとに再計算する」機能です。</p>
                                    <h2>1.</h2>
                                    <p>適当に編成を計算した後、グラフを見たい編成をグラフに加えます。</p>
                                    <Thumbnail alt="HPチャート操作1" src="./otherImages/hpChartTutorial1.png">
                                    </Thumbnail>
                                    <h2>2.</h2>
                                    <p>グラフに加えると、「背水渾身チャートを開く」ボタンが有効化されるので、クリックします。</p>
                                    <h2>3.</h2>
                                    <p>「優先する項目」に設定されている値を描画したグラフが表示されます。</p>
                                    <Thumbnail alt="HPチャート操作1" src="./otherImages/hpChartTutorial2.png">
                                    </Thumbnail>
                                    <p className="text-danger">まだサポートされていない要素が「優先する項目」に設定されている場合、"総合攻撃力"のグラフに変更されます。</p>
                                    <h2>4.</h2>
                                    <p>上部の選択ボタンで、他の要素を表示することも可能です。</p>
                                    <Thumbnail alt="HPチャート操作1" src="./otherImages/hpChartTutorial3.png">
                                    </Thumbnail>
                                    <h2>5.</h2>
                                    <p>複数の召喚石組み合わせが設定されている場合、複数のグラフが作成されます。</p>
                                    <Thumbnail alt="HPチャート操作1" src="./otherImages/hpChartTutorial4.png">
                                    </Thumbnail>
                                    <p className="text-danger">現在は、ある組み合わせをグラフに保存すると、全てのグラフに追加されるようになっています。
                                    これを召喚石別にするかどうかは、今後検討します。</p>
                                    <h2>注記</h2>
                                    <p>編成として保存されるのは「武器の組み合わせの本数」のみです。
                                    そのため、武器攻撃力やバフ量などを変更した場合、結果のグラフも自動的に変更されます。</p>
                                    <p className="text-danger">武器枠の数が追加/削除された場合、武器枠のデータがリセットされた場合は、
                                    保存されている編成はリセットされてしまいますのでご注意下さい。
                                    これは、武器組み合わせのみを保存しているため、誤って組み合わせで再計算されることを防ぐためです。</p>
                                    <p>また、現在「追加した特定のグラフを削除する」機能は実装されておりませんので、
                                    グラフが多くなりすぎてしまった場合、全削除を行い、保存されている編成をリセットしてください。</p>
                                    <p>ご要望・不具合等あればお知らせ下さい。</p>
                                </Modal.Body>
                            </Modal>
                        </Modal.Body>
                    </Modal>
                </div>
            );
        }
    }
});

var HPChart = React.createClass({
    getInitialState: function() {
        var sortKey = this.props.sortKey
        if(!(sortKey in supportedChartSortkeys)) sortKey = "totalAttack"

        options = {}
        if(_ua.Mobile) {
            for(key in this.props.data) {
                if(key != "minMaxArr") {
                    options[key] = {
                        title: key,
                        curveType: 'function',
                        forcelFrame: true,
                        hAxis: {title: "残りHP", titleTextStyle: {italic: false}, textStyle: {italic: false}},
                        vAxis: {title: supportedChartSortkeys[sortKey], textStyle: {italic: false}, minValue: this.props.data["minMaxArr"][sortKey]["min"], maxValue: this.props.data["minMaxArr"][sortKey]["max"]},
                        tooltip: {ignoreBounds: true, isHtml: true, showColorCode: true, textStyle: {fontSize: 10}},
                        legend: {position: "top", maxLines: 3, textStyle: {fontSize: 8}},
                        chartArea: {left: "20%", top: "10%", width: "80%", height: "70%",},
                    }
                }
            }
        } else {
            for(key in this.props.data) {
                if(key != "minMaxArr") {
                    options[key] = {
                        title: key,
                        curveType: 'function',
                        forcelFrame: true,
                        hAxis: {title: "残りHP", titleTextStyle: {italic: false}, textStyle: {italic: false}},
                        vAxis: {title: supportedChartSortkeys[sortKey], textStyle: {italic: false}, minValue: this.props.data["minMaxArr"][sortKey]["min"], maxValue: this.props.data["minMaxArr"][sortKey]["max"]},
                        tooltip: {ignoreBounds: true, isHtml: true, showColorCode: true, textStyle: {fontSize: 10}},
                        legend: {position: "top", maxLines: 3, textStyle: {fontSize: 8}},
                        chartArea: {left: "20%", top: "10%", width: "80%", height: "70%",},
                    }
                }
            }
        }

        return {
            options: options,
            sortKey: sortKey,
        }
    },
    handleEvent: function(key, e) {
        var newState = this.state
        newState[key] = e.target.value

        // optionsをupdate
        options = {}
        if(_ua.Mobile) {
            for(key in this.props.data) {
                if(key != "minMaxArr") {
                    options[key] = {
                        title: key,
                        forcelFrame: true,
                        curveType: 'function',
                        hAxis: {title: "残りHP", titleTextStyle: {italic: false}, textStyle: {italic: false}},
                        vAxis: {title: supportedChartSortkeys[e.target.value], textStyle: {italic: false}, minValue: this.props.data["minMaxArr"][e.target.value]["min"], maxValue: this.props.data["minMaxArr"][e.target.value]["max"]},
                        tooltip: {ignoreBounds: true, isHtml: true, showColorCode: true, textStyle: {fontSize: 10}},
                        legend: {position: "top", maxLines: 3, textStyle: {fontSize: 8}},
                        chartArea: {left: "20%", top: "10%", width: "80%", height: "70%",},
                    }
                }
            }
        } else {
            for(key in this.props.data) {
                if(key != "minMaxArr") {
                    options[key] = {
                        title: key,
                        forcelFrame: true,
                        curveType: 'function',
                        hAxis: {title: "残りHP", titleTextStyle: {italic: false}, textStyle: {italic: false}},
                        vAxis: {title: supportedChartSortkeys[e.target.value], textStyle: {italic: false}, minValue: this.props.data["minMaxArr"][e.target.value]["min"], maxValue: this.props.data["minMaxArr"][e.target.value]["max"]},
                        tooltip: {ignoreBounds: true, isHtml: true, showColorCode: true, textStyle: {fontSize: 10}},
                        legend: {position: "top", maxLines: 3, textStyle: {fontSize: 8}},
                        chartArea: {left: "20%", top: "10%", width: "80%", height: "70%",},
                    }
                }
            }

        }
        newState.options = options

        this.setState(newState)
    },
    render: function() {
        var options = this.state.options
        var data = this.props.data
        var sortKey = this.state.sortKey

        if(_ua.Mobile) {
            return (
                    <div className="HPChart">
                        {/*<FormControl componentClass="select" value={this.state.sortKey} onChange={this.handleEvent.bind(this, "sortKey")}>{select_supported_chartsortkeys}</FormControl>*/}
                        {Object.keys(data).map(function(key, ind) {
                            if(key != "minMaxArr") {
                                return <Chart chartType="LineChart" className="LineChart" data={data[key][sortKey]} key={key} options={options[key]} graph_id={"LineChart" + ind} width={"90%"} height={"50%"} legend_toggle={true} />
                            }
                        })}
                    </div>
            );
        } else {
            if(window.innerWidth >= 1450) {
                var width = (90.0 / (Object.keys(data).length - 1))
                if(Object.keys(data).length - 1 > 2) {
                    width = 45.0
                }
            } else {
                var width = 90.0
            }

            return (
                    <div className="HPChart">
                        <FormControl componentClass="select" value={this.state.sortKey} onChange={this.handleEvent.bind(this, "sortKey")}>{select_supported_chartsortkeys}</FormControl>
                        {Object.keys(data).map(function(key, ind) {
                            if(key != "minMaxArr") {
                                return <Chart chartType="LineChart" className="LineChart" data={data[key][sortKey]} key={key} options={options[key]} graph_id={"LineChart" + ind} width={width + "%"} height={"600px"} legend_toggle={true} />
                            }
                        })}
                    </div>
            );

        }
    },
});

var Result = React.createClass({
    onClick: function(e) {
        this.props.onAddToHaisuiData(e.target.id, this.props.summonid)
    },
    render: function() {
        var sw = this.props.switcher;
        var arm = this.props.arm;
        var prof = this.props.prof;
        var onClick = this.onClick;
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

                        if(skilldata.normal != 1.0) {skillstr += "攻刃" + (100.0 * (skilldata.normal - 1.0)).toFixed(1); skillstr += "% ";}
                        if(skilldata.normalHaisui != 1.0) {skillstr += "攻刃背水" + (100.0 * (skilldata.normalHaisui - 1.0)).toFixed(1); skillstr += "% ";}
                        if(skilldata.normalKonshin != 1.0) {skillstr += "攻刃渾身" + (100.0 * (skilldata.normalKonshin - 1.0)).toFixed(1); skillstr += "% ";}
                        if(skilldata.magna != 1.0) {skillstr += "マグナ" + (100.0 * (skilldata.magna - 1.0)).toFixed(1); skillstr += "% ";}
                        if(skilldata.magnaHaisui != 1.0) {skillstr += "マグナ背水" + (100.0 * (skilldata.magnaHaisui - 1.0)).toFixed(1); skillstr += "% ";}
                        if(skilldata.unknown != 1.0) {skillstr += "アンノウン" + (100.0 * (skilldata.unknown - 1.0)).toFixed(1); skillstr += "% ";}
                        if(skilldata.unknownHaisui != 1.0) {skillstr += "アンノウン背水" + (100.0 * (skilldata.unknownHaisui - 1.0)).toFixed(1); skillstr += "% ";}
                        if(skilldata.other != 1.0) {skillstr += "その他枠" + (100.0 * (skilldata.other - 1.0)).toFixed(1); skillstr += "% ";}

                        skillstr += "\n"
                    }

                    var tablebody = []
                    if(sw.switchTotalAttack) {
                        tablebody.push(m.data.Djeeta.totalAttack)
                    }
                    if(sw.switchATKandHP) {
                        var senryoku = parseInt(m.data.Djeeta.displayAttack) + parseInt(m.data.Djeeta.displayHP)
                        tablebody.push(senryoku + "\n(" + parseInt(m.data.Djeeta.displayAttack) + ' + ' + parseInt(m.data.Djeeta.displayHP) + ')')
                    }
                    if(sw.switchCharaAttack) {
                        for(key in m.data){
                            if(key != "Djeeta") {
                                tablebody.push(m.data[key].totalAttack)
                            }
                        }
                    }
                    if(sw.switchDATA) {
                        tablebody.push('DA:' + m.data.Djeeta.totalDA.toFixed(1) + '%,\n TA: ' + m.data.Djeeta.totalTA.toFixed(1) + '%')
                    }
                    if(sw.switchExpectedAttack) {
                        var expectedAttack = parseInt(m.data.Djeeta.expectedAttack * m.data.Djeeta.totalAttack)
                        tablebody.push(m.data.Djeeta.expectedAttack.toFixed(2) + "\n(" + expectedAttack + ")")
                    }
                    if(sw.switchCriticalRatio) {
                        tablebody.push(m.data.Djeeta.criticalRatio.toFixed(4) + "\n(" + m.data.Djeeta.criticalAttack + ", " + m.data.Djeeta.averageCriticalAttack + ")")
                    }
                    if(sw.switchHP) {
                        tablebody.push(m.data.Djeeta.totalHP + "\n(" + parseInt(m.data.Djeeta.totalHP * m.data.Djeeta.remainHP) + ")")
                    }
                    if(sw.switchCharaHP) {
                        for(key in m.data){
                            if(key != "Djeeta") {
                                tablebody.push(m.data[key].totalHP + "\n(" + parseInt(m.data[key].totalHP * m.data[key].remainHP) + ")")
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
                        var damage = m.data.Djeeta.damage
                        var expectedDamage = m.data.Djeeta.expectedAttack * damage
                        tablebody.push(parseInt(damage) + "\n(" + parseInt(expectedDamage) + ")")
                    }
                    if(sw.switchOugiGage) {
                        tablebody.push(m.data.Djeeta.expectedOugiGage.toFixed(2) + "%\n(" + m.data.Djeeta.expectedTurn + "ターン)")
                    }
                    if(sw.switchOugiDamage) {
                        tablebody.push(parseInt(m.data.Djeeta.ougiDamage))
                    }
                    if(sw.switchCycleDamage) {
                        tablebody.push(parseInt(m.data.Djeeta.expectedCycleDamagePerTurn))
                    }
                    if(sw.switchAverageCycleDamage) {
                        tablebody.push(parseInt(m.data.Djeeta.averageCyclePerTurn))
                    }
                    if(_ua.Mobile) {
                        return (
                            <tr className="result" title={skillstr} key={rank + 1}>
                                <td>{rank + 1}</td>
                                {tablebody.map(function(am, ind){
                                    return (<td key={ind} >{am}</td>);
                                })}
                                {m.armNumbers.map(function(am, ind){
                                    if(arm[ind].considerNumberMax != 0) {
                                        if(ind == 0){
                                            if(parseInt(am) > 0) {
                                                return (<td key={ind} className="resultFirst"><p className="text-info">{am}</p></td>);
                                            } else {
                                                return (<td key={ind} className="resultFirst"><p className="text-muted">{am}</p></td>);
                                            }
                                        } else {
                                            if(parseInt(am) > 0) {
                                                return (<td key={ind} className="resultList"><p className="text-info">{am}</p></td>);
                                            } else {
                                                return (<td key={ind} className="resultList"><p className="text-muted">{am}</p></td>);
                                            }
                                        }
                                    }
                                 })}
                                <td><Button id={rank} bsStyle="primary" bsSize="xsmall" onClick={onClick}>グラフに<br/>加える</Button></td>
                            </tr>
                        );
                    } else {
                        return (
                            <tr className="result" title={skillstr} key={rank + 1}>
                                <td>{rank + 1}</td>
                                {tablebody.map(function(am, ind){
                                    return (<td key={ind} >{am}</td>);
                                })}
                                {m.armNumbers.map(function(am, ind){
                                    if(arm[ind].considerNumberMax != 0) {
                                        if(ind == 0){
                                            if(parseInt(am) > 0) {
                                                return (<td key={ind} className="resultFirst"><p className="text-info">{am} 本</p></td>);
                                            } else {
                                                return (<td key={ind} className="resultFirst"><p className="text-muted">{am} 本</p></td>);
                                            }
                                        } else {
                                            if(parseInt(am) > 0) {
                                                return (<td key={ind} className="resultList"><p className="text-info">{am} 本</p></td>);
                                            } else {
                                                return (<td key={ind} className="resultList"><p className="text-muted">{am} 本</p></td>);
                                            }
                                        }
                                    }
                                 })}
                                <td><Button id={rank} bsStyle="primary" block onClick={onClick}>グラフに<br/>加える</Button></td>
                            </tr>
                        );
                    }
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
            addArm: null,
            addArmID: -1,
            considerNum: 1,
            openPresets: false,
        };
    },
    closePresets: function() {
        this.setState({openPresets: false})
    },
    openPresets: function() {
        this.setState({openPresets: true})
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
        this.props.onChange(newalist, false);
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
        this.props.onChange(newalist, false);
    },
    handleOnChange: function(key, state, isSubtle){
        var newalist = this.state.alist;
        newalist[key] = state;
        this.setState({alist: newalist})
        this.setState({addArm: null})
        this.props.onChange(newalist, isSubtle);
    },
    handleEvent: function(key, e) {
        var newState = this.state
        newState[key] = e.target.value
        newState["addArm"] = null
        this.setState(newState)
    },
    addTemplateArm: function(templateArm, considerNum) {
        var minimumID = -1;
        for(key in this.state.alist) {
            if(this.state.alist[key].name == "" && this.state.alist[key].attack == 0){
                minimumID = key;
                break;
            }
        }
        if(minimumID >= 0) {
            this.setState({addArm: templateArm})
            this.setState({addArmID: minimumID})
            this.setState({considerNum: considerNum})
            if(_ua.Mobile || _ua.Tablet) {
                alert("追加しました。")
            }
        } else {
            var newKey = this.props.pleaseAddArmNum() - 1;
            if(newKey >= 0) {
                this.setState({addArm: templateArm})
                this.setState({addArmID: newKey})
                this.setState({considerNum: considerNum})
                if(_ua.Mobile || _ua.Tablet) {
                    alert("追加しました。")
                }
            } else {
                alert("キャラがいっぱいです。")
            }
        }
    },
    render: function(){
        var dataName = this.props.dataName;
        var arms = this.state.arms;
        var hChange = this.handleOnChange;
        var hRemove = this.handleOnRemove;
        var hCopy = this.handleOnCopy;
        var defaultElement = this.state.defaultElement;
        var addArm = this.state.addArm;
        var addArmID = this.state.addArmID;
        var considerNum = this.state.considerNum;

        if(_ua.Mobile) {
            return (
                <div className="armList">
                    <ButtonGroup vertical block>
                        <Button bsStyle="success" bsSize="large" onClick={this.openPresets}>武器テンプレートを開く</Button>
                    </ButtonGroup>
                    <Modal show={this.state.openPresets} onHide={this.closePresets}>
                        <Modal.Header closeButton>
                            <Modal.Title>Presets</Modal.Title>
                            <span>(最大50件しか表示されません)</span>
                        </Modal.Header>
                        <Modal.Body>
                            <RegisteredArm onClick={this.addTemplateArm} />
                        </Modal.Body>
                    </Modal>

                    <ControlLabel>属性一括変更</ControlLabel><FormControl componentClass="select" className="element" value={this.state.defaultElement} onChange={this.handleEvent.bind(this, "defaultElement")} > {select_elements} </FormControl>
                    {arms.map(function(arm, ind) {
                        return <Arm key={arm} onChange={hChange} onRemove={hRemove} onCopy={hCopy} addArm={addArm} addArmID={addArmID} considerNum={considerNum} id={ind} keyid={arm} dataName={dataName} defaultElement={defaultElement} />;
                    })}
                </div>
            );
        } else {
            return (
                <div className="armList">
                    <Button bsStyle="success" bsSize="large" onClick={this.openPresets}>武器テンプレートを開く</Button>
                    <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th>武器名*</th>
                        <th className="atkhp">攻撃力*</th>
                        <th className="atkhp">HP</th>
                        <th>武器種*</th>
                        <th className="skillselect">スキル*   <ControlLabel>属性一括変更</ControlLabel><FormControl componentClass="select" className="element" value={this.state.defaultElement} onChange={this.handleEvent.bind(this, "defaultElement")} > {select_elements} </FormControl></th>
                        <th>SLv*</th>
                        <th className="consider">本数*</th>
                        <th className="system">操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    {arms.map(function(arm, ind) {
                        return <Arm key={arm} onChange={hChange} onRemove={hRemove} onCopy={hCopy} addArm={addArm} addArmID={addArmID} considerNum={considerNum} id={ind} keyid={arm} dataName={dataName} defaultElement={defaultElement} />;
                    })}
                    </tbody>
                    </table>

                    <Modal show={this.state.openPresets} onHide={this.closePresets}>
                        <Modal.Header closeButton>
                            <Modal.Title>Presets</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <RegisteredArm onClick={this.addTemplateArm} />
                        </Modal.Body>
                    </Modal>
                </div>
            )
        };
    }
});

var RegisteredArm = React.createClass({
    getInitialState: function() {
        return {
            filterText: "",
            filterElement: "all",
            armData: {},
            limit: 50,
            tempArm: {},
            openConsiderNumberModal: false,
            plusNum: 0,
            armLv: 1,
            armSLv: 1,
        };
    },
    closeConsiderNumberModal: function() {
        this.setState({openConsiderNumberModal: false})
    },
    openConsiderNumberModal: function() {
        this.setState({openConsiderNumberModal: true})
    },
    componentDidMount: function() {
        $.ajax({
            url: "./armData.json",
            dataType: 'json',
            cache: false,
            timeout: 10000,
            success: function(data) {
                this.setState({armData: data})
            }.bind(this),
            error: function(xhr, status, err) {
                alert("Error!: 武器データの取得に失敗しました。 status: ", status, ", error message: ", err.toString());
            }.bind(this)
        });
    },
    clickedTemplate: function(e) {
        this.setState({tempArm: this.state.armData[e.target.getAttribute("id")]});
        var arm = this.state.armData[e.target.getAttribute("id")]
        this.setState({armLv: parseInt(arm.maxlv)})
        this.setState({armSLv: parseInt(arm.slvmax)})
        if(arm.maxlv == "150") {
            this.setState({select_level: select_levelNoLimit})
            this.setState({select_skilllevel: select_skilllevelNoLimit})
        } else {
            this.setState({select_level: select_levelLimit})
            this.setState({select_skilllevel: select_skilllevelLimit})
        }
        this.setState({openConsiderNumberModal: true})
    },
    clickedConsiderNumber: function(e) {
        var arm = this.state.tempArm
        arm["plus"] = this.state.plusNum
        arm["lv"] = this.state.armLv
        arm["slv"] = this.state.armSLv
        this.props.onClick(arm, e.target.value);
        this.setState({openConsiderNumberModal: false})
        this.setState({plusNum: 0})
    },
    handleEvent: function(key, e) {
        var newState = this.state
        newState[key] = e.target.value
        this.setState(newState)
    },
    render: function() {
        var clickedTemplate = this.clickedTemplate;
        var filterText = this.state.filterText;
        var filterElement = this.state.filterElement;
        var armData = this.state.armData
        var limit = this.state.limit;
        var displayed_count = 0;

        if(_ua.Mobile){
            return (
                <div className="armTemplate">
                    <FormControl type="text" placeholder="武器名" value={this.state.filterText} onChange={this.handleEvent.bind(this, "filterText")} />
                    <FormControl componentClass="select" value={this.state.filterElement} onChange={this.handleEvent.bind(this, "filterElement")}>{select_filterelements}</FormControl>
                    <div className="armTemplateContent">
                        {Object.keys(armData).map(function(key, ind) {
                            if(filterElement == "all" || (armData[key].element == filterElement || armData[key].element2 == filterElement)){
                                if(filterText == "" || key.indexOf(filterText) != -1){
                                    if(displayed_count < limit) {
                                        displayed_count++;
                                        return (
                                            <div className="onearm" key={key}>
                                                <p>{armData[key].name}</p><br/>
                                                <Image rounded onClick={clickedTemplate} id={key} src={armData[key].imageURL} alt={key} />
                                            </div>
                                        );
                                    } else {
                                        return "";
                                    }
                                }
                            }
                            return "";
                        })}
                    </div>
                    <Modal className="presetsConsiderNumber" show={this.state.openConsiderNumberModal} onHide={this.closeConsiderNumberModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>何本追加しますか？</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <FormControl componentClass="select" value={this.state.armLv} onChange={this.handleEvent.bind(this, "armLv")}>{this.state.select_level}</FormControl>
                            <FormControl componentClass="select" value={this.state.armSLv} onChange={this.handleEvent.bind(this, "armSLv")}>{this.state.select_skilllevel}</FormControl>
                            <FormControl componentClass="select" value={this.state.plusNum} onChange={this.handleEvent.bind(this, "plusNum")}>{select_plusnum}</FormControl>
                            <div className="btn-group btn-group-justified" role="group" aria-label="...">
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default" value="1" onClick={this.clickedConsiderNumber}>1本</button>
                                </div>
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default" value="2" onClick={this.clickedConsiderNumber}>2本</button>
                                </div>
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default" value="3" onClick={this.clickedConsiderNumber}>3本</button>
                                </div>
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default" value="4" onClick={this.clickedConsiderNumber}>4本</button>
                                </div>
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default" value="5" onClick={this.clickedConsiderNumber}>5本</button>
                                </div>
                            </div>
                            <div className="btn-group btn-group-justified" role="group" aria-label="...">
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default" value="6" onClick={this.clickedConsiderNumber}>6本</button>
                                </div>
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default" value="7" onClick={this.clickedConsiderNumber}>7本</button>
                                </div>
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default" value="8" onClick={this.clickedConsiderNumber}>8本</button>
                                </div>
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default" value="9" onClick={this.clickedConsiderNumber}>9本</button>
                                </div>
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default" value="10" onClick={this.clickedConsiderNumber}>10本</button>
                                </div>
                            </div>
                        </Modal.Body>
                    </Modal>
                </div>
            )
        } else {
            return (
                <div className="armTemplate">
                    <FormControl type="text" placeholder="武器名" value={this.state.filterText} onChange={this.handleEvent.bind(this, "filterText")} />
                    <FormControl componentClass="select" value={this.state.filterElement} onChange={this.handleEvent.bind(this, "filterElement")}>{select_filterelements}</FormControl>
                    <div className="armTemplateContent">
                        {Object.keys(armData).map(function(key, ind) {
                            if(filterElement == "all" || (armData[key].element == filterElement || armData[key].element2 == filterElement)){
                                if(filterText == "" || key.indexOf(filterText) != -1){
                                    return (
                                        <div className="onearm" key={key}>
                                            <p>{armData[key].name}</p><br/>
                                            <Image rounded onClick={clickedTemplate} id={key} src={armData[key].imageURL} alt={key} />
                                        </div>
                                    );
                                }
                            }
                            return "";
                        })}
                    </div>
                    <Modal className="presetsConsiderNumber" show={this.state.openConsiderNumberModal} onHide={this.closeConsiderNumberModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>何本追加しますか？</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <FormControl componentClass="select" value={this.state.armLv} onChange={this.handleEvent.bind(this, "armLv")}>{this.state.select_level}</FormControl>
                            <FormControl componentClass="select" value={this.state.armSLv} onChange={this.handleEvent.bind(this, "armSLv")}>{this.state.select_skilllevel}</FormControl>
                            <FormControl componentClass="select" value={this.state.plusNum} onChange={this.handleEvent.bind(this, "plusNum")}>{select_plusnum}</FormControl>
                            <div className="btn-group btn-group-justified" role="group" aria-label="...">
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default" value="1" onClick={this.clickedConsiderNumber}>1本</button>
                                </div>
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default" value="2" onClick={this.clickedConsiderNumber}>2本</button>
                                </div>
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default" value="3" onClick={this.clickedConsiderNumber}>3本</button>
                                </div>
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default" value="4" onClick={this.clickedConsiderNumber}>4本</button>
                                </div>
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default" value="5" onClick={this.clickedConsiderNumber}>5本</button>
                                </div>
                            </div>
                            <div className="btn-group btn-group-justified" role="group" aria-label="...">
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default" value="6" onClick={this.clickedConsiderNumber}>6本</button>
                                </div>
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default" value="7" onClick={this.clickedConsiderNumber}>7本</button>
                                </div>
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default" value="8" onClick={this.clickedConsiderNumber}>8本</button>
                                </div>
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default" value="9" onClick={this.clickedConsiderNumber}>9本</button>
                                </div>
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default" value="10" onClick={this.clickedConsiderNumber}>10本</button>
                                </div>
                            </div>
                        </Modal.Body>
                    </Modal>
                </div>
            )
        }
    },
});

// Arm is a fundamental object corresponding one arm.
var Arm = React.createClass({
    getInitialState: function() {
        return {
            name: '',
            attack: 0,
            hp: 0,
            armType: 'sword',
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
            this.props.onChange(this.props.id, newState, false);
        }

        if(nextProps.defaultElement != this.props.defaultElement) {
            var newState = this.state
            newState["element"] = nextProps.defaultElement
            newState["element2"] = nextProps.defaultElement
            this.setState(newState);
            this.props.onChange(this.props.id, newState, false);
        }

        if(nextProps.addArm != null && nextProps.addArm != this.props.addArm && this.props.id == nextProps.addArmID ) {
            var newState = this.state
            var newarm = nextProps.addArm

            newState["name"] = newarm.name

            // Lv別処理
            if(newarm.lv == 1) {
                newState["attack"] = parseInt(newarm.minattack) + 5 * newarm.plus
                newState["hp"] = parseInt(newarm.minhp) + newarm.plus
            } else if(newarm.lv <= 100) {
                if(newarm.maxlv == "100") {
                    newState["attack"] = Math.floor(newarm.lv * (parseInt(newarm.attack) - parseInt(newarm.minattack))/100.0 + parseInt(newarm.minattack) + 5 * newarm.plus)
                    newState["hp"] = Math.floor(newarm.lv * (parseInt(newarm.hp) - parseInt(newarm.minhp))/100 + parseInt(newarm.minhp) + newarm.plus)
                } else {
                    // 4凸武器の場合は、Lv100以下の計算にattacklv100を使う
                    newState["attack"] = Math.floor(newarm.lv * (parseInt(newarm.attacklv100) - parseInt(newarm.minattack))/100.0 + parseInt(newarm.minattack) + 5 * newarm.plus)
                    newState["hp"] = Math.floor(newarm.lv * (parseInt(newarm.hplv100) - parseInt(newarm.minhp))/100 + parseInt(newarm.minhp) + newarm.plus)
                }
            } else {
                // 4凸がない場合は100までしか入ってこないので例外処理する必要なし
                newState["attack"] = Math.floor((newarm.lv - 100) * (parseInt(newarm.attack) - parseInt(newarm.attacklv100))/50 + parseInt(newarm.attacklv100) + 5 * newarm.plus)
                newState["hp"] = Math.floor((newarm.lv - 100) * (parseInt(newarm.hp) - parseInt(newarm.hplv100))/50 + parseInt(newarm.hplv100) + newarm.plus)
            }

            if(newarm.lv != parseInt(newarm.maxlv)) newState["name"] += "Lv." + newarm.lv
            if(newarm.plus != 0) newState["name"] += "+" + newarm.plus

            newState["armType"] = newarm.type
            newState["element"] = newarm.element
            newState["skill1"] = newarm.skill1
            newState["element2"] = newarm.element2
            newState["skill2"] = newarm.skill2
            newState["slv"] = newarm.slv
            newState["considerNumberMax"] = parseInt(nextProps.considerNum)

            this.setState(newState);
            this.props.onChange(this.props.id, newState, false);
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

       // もし addArmID が自分のIDと同じなら、templateデータを読み込む
       if(this.props.addArm != null && this.props.id == this.props.addArmID ) {
           var newarm = this.props.addArm

           state["name"] = newarm.name

           // Lv別処理
           if(newarm.lv == 1) {
               state["attack"] = parseInt(newarm.minattack) + 5 * newarm.plus
               state["hp"] = parseInt(newarm.minhp) + newarm.plus
           } else if(newarm.lv <= 100) {
               if(newarm.maxlv == "100") {
                   state["attack"] = Math.floor(newarm.lv * (parseInt(newarm.attack) - parseInt(newarm.minattack))/100.0 + parseInt(newarm.minattack) + 5 * newarm.plus)
                   state["hp"] = Math.floor(newarm.lv * (parseInt(newarm.hp) - parseInt(newarm.minhp))/100 + parseInt(newarm.minhp) + newarm.plus)
               } else {
                   // 4凸武器の場合は、Lv100以下の計算にattacklv100を使う
                   state["attack"] = Math.floor(newarm.lv * (parseInt(newarm.attacklv100) - parseInt(newarm.minattack))/100.0 + parseInt(newarm.minattack) + 5 * newarm.plus)
                   state["hp"] = Math.floor(newarm.lv * (parseInt(newarm.hplv100) - parseInt(newarm.minhp))/100 + parseInt(newarm.minhp) + newarm.plus)
               }
           } else {
               // 4凸がない場合は100までしか入ってこないので例外処理する必要なし
               state["attack"] = Math.floor((newarm.lv - 100) * (parseInt(newarm.attack) - parseInt(newarm.attacklv100))/50 + parseInt(newarm.attacklv100) + 5 * newarm.plus)
               state["hp"] = Math.floor((newarm.lv - 100) * (parseInt(newarm.hp) - parseInt(newarm.hplv100))/50 + parseInt(newarm.hplv100) + newarm.plus)
           }
           if(newarm.lv != parseInt(newarm.maxlv)) state["name"] += "Lv." + newarm.lv
           if(newarm.plus != 0) state["name"] += "+" + newarm.plus

           state["armType"] = newarm.type
           state["element"] = newarm.element
           state["skill1"] = newarm.skill1
           state["element2"] = newarm.element2
           state["skill2"] = newarm.skill2
           state["slv"] = newarm.slv
           state["considerNumberMax"] = parseInt(this.props.considerNum)

           this.setState(state);
       }
       // 初期化後 state を 上の階層に渡しておく
       // armList では onChange が勝手に上に渡してくれるので必要なし
       this.props.onChange(this.props.id, state, false);
    },
    handleEvent: function(key, e) {
        var newState = this.state
        var isSubtle = false
        if(key == "considerNumberMin"){
            if (parseInt(e.target.value) > parseInt(this.state.considerNumberMax)) {
                newState["considerNumberMax"] = parseInt(e.target.value)
            }
            newState[key] = parseInt(e.target.value)
        } else if(key == "considerNumberMax") {
            if (parseInt(e.target.value) < parseInt(this.state.considerNumberMin)) {
                newState["considerNumberMin"] = parseInt(e.target.value)
            }
            newState[key] = parseInt(e.target.value)
        } else {
            if(key == "name") isSubtle = true

            newState[key] = e.target.value
        }

        this.setState(newState)
        this.props.onChange(this.props.id, newState, isSubtle)
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
                <table className="table table-bordered">
                <tbody>
                    <tr><th>武器名</th><td><FormControl type="text" placeholder="武器名" value={this.state.name} onChange={this.handleEvent.bind(this, "name")} /></td></tr>
                    <tr><th>攻撃力</th><td className="atkhp"><FormControl type="number" placeholder="0以上の整数" min="0" value={this.state.attack} onChange={this.handleEvent.bind(this, "attack")} /></td></tr>
                    <tr><th>HP</th><td className="atkhp"><FormControl type="number" placeholder="0以上の整数" min="0" value={this.state.hp} onChange={this.handleEvent.bind(this, "hp")} /></td></tr>
                    <tr><th>種類</th><td className="select"><FormControl componentClass="select" value={this.state.armType} onChange={this.handleEvent.bind(this, "armType")} > {select_armtypes} </FormControl></td></tr>
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
                    <td className="armname"><FormControl type="text" placeholder="武器名" value={this.state.name} onChange={this.handleEvent.bind(this, "name")} /></td>
                    <td className="atkhp"><FormControl type="number" placeholder="0以上の整数" min="0" value={this.state.attack} onChange={this.handleEvent.bind(this, "attack")} /></td>
                    <td className="atkhp"><FormControl type="number" placeholder="0以上の整数" min="0" value={this.state.hp} onChange={this.handleEvent.bind(this, "hp")} /></td>
                    <td><FormControl componentClass="select" value={this.state.armType} onChange={this.handleEvent.bind(this, "armType")} > {select_armtypes} </FormControl></td>
                    <td className="skillselect">
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

var Profile = React.createClass({
    getDefaultProps() {
        var zenithBonuses = Object.keys(zenith).map(function(opt){ return <option value={opt} key={opt}>{opt}</option> });
        var alljobs = Object.keys(Jobs).map(function(opt){ return <option value={opt} key={opt}>{Jobs[opt].name}</option> });

        return {
            zenithBonuses: zenithBonuses,
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
            enemyDefense: 10.0,
            job: "none",
            element: "fire",
            DA: 6.5,
            TA: 3.0,
            ougiGageBuff: 0,
            ougiRatio: 4.5,
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
    render: function() {
        if(_ua.Mobile) {
            return (
                <div className="profile">
                    <h3> ジータちゃん情報 (*: 推奨入力項目)</h3>
                    <table className="table table-bordered">
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
                            <td><FormControl componentClass="select" value={this.state.masterBonus} onChange={this.handleEvent.bind(this, "masterBonus")}>{select_masteratk}</FormControl></td>
                        </tr>
                        <tr>
                            <th className="prof">マスボ<br/>HP(%)*</th>
                            <th className="prof">ジョブ*</th>
                            <th className="prof">残HP(%)<br/>(ジータのみ)</th>
                        </tr>
                        <tr>
                            <td><FormControl componentClass="select" value={this.state.masterBonusHP} onChange={this.handleEvent.bind(this, "masterBonusHP")}>{select_masterhp}</FormControl></td>
                            <td><FormControl componentClass="select" value={this.state.job} onChange={this.handleEvent.bind(this, "job")} > {this.props.alljobs}</FormControl></td>
                            <td><FormControl componentClass="select" value={this.state.remainHP} onChange={this.handleEvent.bind(this, "remainHP")}>{select_hplist}</FormControl></td>
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
                            <th className="prof">敵防御固有値</th>
                            <th className="prof">奥義倍率</th>
                        </tr>
                        <tr>
                            <td><FormControl type="number" min="0" step="0.1" value={this.state.DA} onChange={this.handleEvent.bind(this, "DA")}/></td>
                            <td><FormControl type="number" min="0" step="0.1" value={this.state.TA} onChange={this.handleEvent.bind(this, "TA")}/></td>
                            <td><FormControl componentClass="select" value={this.state.enemyDefense} onChange={this.handleEvent.bind(this, "enemyDefense")}> {select_enemydeftypes} </FormControl></td>
                            <td><FormControl componentClass="select" value={this.state.ougiRatio} onChange={this.handleEvent.bind(this, "ougiRatio")}> {select_ougiRatio} </FormControl></td>
                        </tr>
                        </tbody>
                    </table>
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
                    <table className="table table-bordered">
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
                            <th className="prof">奥義ゲージ上昇率アップ</th>
                        </tr><tr>
                            <td><FormControl type="number"  min="0" max="100" value={this.state.daBuff} onChange={this.handleEvent.bind(this, "daBuff")}/></td>
                            <td><FormControl type="number"  min="0" max="100" value={this.state.taBuff} onChange={this.handleEvent.bind(this, "taBuff")}/></td>
                            <td><FormControl componentClass="select" value={this.state.hp} onChange={this.handleEvent.bind(this, "hp")}>{select_hplist}</FormControl></td>
                            <td><FormControl componentClass="select" value={this.state.ougiGageBuff} onChange={this.handleEvent.bind(this, "ougiGageBuff")}> {select_ougiGageBuff} </FormControl></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            );
        } else {
            return (
                <div className="profile">
                    <h3> ジータちゃん情報 (*: 推奨入力項目)</h3>
                    <table className="table table-bordered">
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
                            <td><FormControl componentClass="select" value={this.state.masterBonus} onChange={this.handleEvent.bind(this, "masterBonus")}>{select_masteratk}</FormControl></td>
                            <td><FormControl componentClass="select" value={this.state.masterBonusHP} onChange={this.handleEvent.bind(this, "masterBonusHP")}>{select_masterhp}</FormControl></td>
                            <td><FormControl componentClass="select" value={this.state.job} onChange={this.handleEvent.bind(this, "job")} > {this.props.alljobs} </FormControl></td>
                            <td><FormControl componentClass="select" value={this.state.remainHP} onChange={this.handleEvent.bind(this, "remainHP")}>{select_hplist}</FormControl></td>
                        </tr>
                        <tr>
                            <th className="prof">ジータ属性*</th>
                            <th className="prof">敵の属性*</th>
                            <th className="prof">武器ゼニス1</th>
                            <th className="prof">武器ゼニス2</th>
                            <th className="prof">基礎DA率</th>
                            <th className="prof">基礎TA率</th>
                            <th className="prof">敵防御固有値</th>
                        </tr>
                        <tr>
                            <td><FormControl componentClass="select" value={this.state.element} onChange={this.handleEvent.bind(this, "element")}> {select_elements} </FormControl></td>
                            <td><FormControl componentClass="select" value={this.state.enemyElement} onChange={this.handleEvent.bind(this, "enemyElement")}> {select_elements} </FormControl></td>
                            <td><FormControl componentClass="select" value={this.state.zenithBonus1} onChange={this.handleEvent.bind(this, "zenithBonus1")} > {this.props.zenithBonuses} </FormControl></td>
                            <td><FormControl componentClass="select" value={this.state.zenithBonus2} onChange={this.handleEvent.bind(this, "zenithBonus2")} > {this.props.zenithBonuses} </FormControl></td>
                            <td><FormControl type="number" min="0" step="0.1" value={this.state.DA} onChange={this.handleEvent.bind(this, "DA")}/></td>
                            <td><FormControl type="number" min="0" step="0.1" value={this.state.TA} onChange={this.handleEvent.bind(this, "TA")}/></td>
                            <td><FormControl componentClass="select" value={this.state.enemyDefense} onChange={this.handleEvent.bind(this, "enemyDefense")}> {select_enemydeftypes} </FormControl></td>
                        </tr>
                        <tr>
                            <th className="prof">奥義倍率</th>
                            <th className="prof"></th>
                            <th className="prof"></th>
                            <th className="prof"></th>
                            <th className="prof"></th>
                            <th className="prof"></th>
                            <th className="prof"></th>
                        </tr>
                        <tr>
                            <td><FormControl componentClass="select" value={this.state.ougiRatio} onChange={this.handleEvent.bind(this, "ougiRatio")}> {select_ougiRatio} </FormControl></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        </tbody>
                    </table>
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
                    <table className="table table-bordered">
                        <tbody>
                        <tr>
                            <th className="buff">通常バフ</th>
                            <th className="buff">属性バフ</th>
                            <th className="buff">その他バフ</th>
                            <th className="buff">HPバフ</th>
                            <th className="buff">DAバフ</th>
                            <th className="buff">TAバフ</th>
                            <th className="buff">残HP(%)</th>
                            <th className="buff">奥義ゲージ上昇率アップ</th>
                        </tr><tr>
                            <td><FormControl type="number"  min="0" value={this.state.normalBuff} onChange={this.handleEvent.bind(this, "normalBuff")}/></td>
                            <td><FormControl type="number"  min="0" value={this.state.elementBuff} onChange={this.handleEvent.bind(this, "elementBuff")}/></td>
                            <td><FormControl type="number"  min="0" value={this.state.otherBuff} onChange={this.handleEvent.bind(this, "otherBuff")}/></td>
                            <td><FormControl type="number"  min="0" value={this.state.hpBuff} onChange={this.handleEvent.bind(this, "hpBuff")}/></td>
                            <td><FormControl type="number"  min="0" max="100" value={this.state.daBuff} onChange={this.handleEvent.bind(this, "daBuff")}/></td>
                            <td><FormControl type="number"  min="0" max="100" value={this.state.taBuff} onChange={this.handleEvent.bind(this, "taBuff")}/></td>
                            <td><FormControl componentClass="select" value={this.state.hp} onChange={this.handleEvent.bind(this, "hp")}>{select_hplist}</FormControl></td>
                            <td><FormControl componentClass="select" value={this.state.ougiGageBuff} onChange={this.handleEvent.bind(this, "ougiGageBuff")}> {select_ougiGageBuff} </FormControl></td>
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
            this.setState({selectedData: Object.keys(storedData)[0]})
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
    componentDidMount: function(){
        // localStorage から sharehistory をロードする
        if ("sharehist" in localStorage && localStorage.sharehist != "{}" ) {
            var sharehist = JSON.parse(localStorage["sharehist"])
            this.setState({shareurl_history: sharehist})
        }
    },
    getInitialState: function() {
        var datatext = Base64.encodeURI(JSON.stringify(this.props.data))
        return {
            shareurl: "",
            shareurl_history: {},
            datatext: datatext,
        };
    },
    getShortenUrl: function() {
        var data = JSON.parse(JSON.stringify(this.props.data));
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
                sharehist[this.props.data["dataName"]] = shareurl;
                this.setState({shareurl: shareurl, shareurl_history: sharehist})
                localStorage.setItem("sharehist", JSON.stringify(sharehist));
            }.bind(this),
            error: function(xhr, status, err) {
                alert("Error!: 何かがおかしいです。@hsimyuまで連絡して下さい。status: ", status, ", error message: ", err.toString());
            }.bind(this)
        });
    },
    render: function() {
      var sharehist = this.state.shareurl_history;
      return (
            <div className="tweet">
                <Button bsStyle="primary" className="tweetButton" onClick={this.getShortenUrl}> サーバに保存<br/>(短縮URLを取得) </Button>
                <div className="list-group">
                {Object.keys(sharehist).map(function(s, ind){
                    return (
                        <a className="list-group-item" href={sharehist[s]} key={s} >{s}: {sharehist[s]} </a>
                    )
                })}
                </div>
            </div>
       );
    },
});

var HowTo = React.createClass({
    render: function() {
        return (
            <div className="howTo">
                <h2> 二手・三手スキル混みの編成について </h2>
                <p> 本計算機ではこれまで、二手三手スキル混みの最適編成計算について、
                総攻撃力に技巧期待値と期待攻撃回数を単に乗算した"総合*回数*技巧期待値"を用いていました。 <br/>
                この値を用いた場合、
                <strong>総合攻撃力が低くても攻撃回数を伸ばした方が期待される攻撃力(〜ダメージ)が大きい</strong>としてソートされる傾向があります。</p>
                <p>しかしながら、<a href="http://ch.nicovideo.jp/suitonjp/blomaga/ar1017708">suitonさんがご提案なされた</a>ように、
                奥義を使用した場合のダメージまで考慮した1サイクルあたりのダメージをベースにソートを行った方が、
                総合的な火力として適切ではないか、と私は考えています。
                また、減衰補正を考慮しない場合、無制限に総合攻撃力が高い編成が優先される事になりますが、
                実際には減衰到達後は連続攻撃で稼いでいくことになるため、総合攻撃力ベースのソートで火力を測るのは限界があると考えられます。<br/>
                そこで、本計算機においても、suitonさんご提案の1サイクルあたりダメージについて、
                更に技巧期待値・奥義ゲージ上昇量・奥義倍率・ダメージ減衰補正を適用した上で、
                ソートするキーとして選択できるよう追加を行いました。</p>
                <p className="text-danger">リリース時、奥義ゲージの期待値計算にミスがありましたので、修正しました。</p>

                <h3>詳しい計算手順</h3>
                <p>まず、1サイクルあたりダメージを以下のように定義します。</p>
                <pre>1サイクルのダメージ = 奥義ダメージ + (奥義ゲージが貯まるまでのターン数) * (通常攻撃ダメージ)</pre>
                <p>(本計算機ではアビリティダメージ分については考慮していません。)</p>
                <p>ここで、DA率・TA率から、1ターンあたりに期待される攻撃回数は</p>
                <pre>期待攻撃回数 = 3 * TA率 + (1 - TA率)(2 * DA率 + 1 * (1 - DA率))</pre>
                <p>と計算できます。ここから同様に、1ターンあたりの奥義ゲージ上昇量は</p>
                <pre>期待奥義ゲージ上昇量 = TA率 * 37 + (1 - TA率)(DA率 * 22 + (1 - DA率) * 10)</pre>
                <p>と計算できます。したがって、奥義ゲージが100%になるまでに必要なターン数は</p>
                <pre>必要ターン数 = Math.ceil(100.0 / 期待奥義ゲージ上昇量) </pre>
                <p>となります。(Math.ceilは切り上げを意味しています。)</p>
                <p>ターン数については上記で求めることができましたので、次にダメージの算出を行います。
                まず、ランク・ジョブ・武器編成などから計算された攻撃力の値(結果欄の"総合攻撃力")を用いて、</p>
                <pre> 単攻撃ダメージ(減衰補正前) = 総合攻撃力 / 敵防御固有値 </pre>
                <p>として、減衰補正前のダメージを求めることができます。
                敵防御固有値は一般に10、硬い敵で13-15程度のようです。(防御デバフありの場合その分固有値が小さくなると考えてください。)</p>
                <p>ここで、技巧分を考慮すると、</p>
                <pre>技巧期待値 = 技巧倍率 * 技巧スキル率 + (1.0 - 技巧スキル率) </pre>
                <p>という式で技巧期待値が求まります。(複数ある場合にも対応)</p>
                <p>連続攻撃でクリティカルが発生した場合全てクリティカルになりますので、期待値を考える場合には単純に総合攻撃力への乗算で良いかと思われます。</p>
                <pre> 単攻撃ダメージ(減衰補正前, 技巧補正混み) = 総合攻撃力 * 技巧期待値 / 敵防御固有値 </pre>
                <p>次に、奥義ダメージについては</p>
                <pre> 奥義ダメージ(減衰補正前) = 総合攻撃力 * 奥義倍率 / 敵防御固有値 </pre>
                <p>として計算できます。</p>
                <p>補正前の単攻撃ダメージが30万を超えた場合、もしくは奥義ダメージが100万を超えた場合、減衰補正を適用することになります。(参考: <a href="http://greatsundome.hatenablog.com/entry/2015/10/07/114737">すんどめ侍のグラブル生活 - 【グラブル】減衰補正検証まとめ</a>)</p>
                <p>(減衰補正については注記にも記してあるとおり、8/21現在は正確に補正されているか確認できていませんので、その点のみご注意下さい。)</p>
                <p>減衰補正されたダメージ値を得られたとして、通常攻撃時の1ターンあたりに期待されるダメージは</p>
                <pre> 通常攻撃ダメージ = 期待攻撃回数 * 単攻撃ダメージ(減衰補正後)</pre>
                <p>となります。</p>
                <p>以上で、最初に示した式中の右辺の全ての項が求まりましたので、1サイクルあたりのダメージが算出できます。</p>
                <p>これを、</p>
                <pre>1サイクル = 奥義ゲージが貯まるまでの必要ターン数 + 1</pre>
                <p>で割ったものが、最終的な計算結果となります。</p>
                <pre>予想ターン毎ダメージ = 1サイクルのダメージ / 1サイクル</pre>
                <p>優先する項目を"予想ターン毎ダメージ"に変更することで、上記手順で得られた計算値を元にソートすることが可能です。
                また、表示項目の予想ターン毎ダメージにチェックを入れることで、計算値を表示することができます。
                (ついでに、奥義ゲージ上昇量と必要ターンについても表示できるようにしておきました。)
                </p>

                <h3>所見</h3>
                <p>
                これまでの"総合*回数*技巧期待値"でソートした場合の結果と、上記のソートキーを用いた場合の結果を見比べると
                やみくもにDA・TA率が最大となるように編成されるのではなく、DA・TA率を確保した上で総合攻撃力を高める、という編成が上位にきやすくなったと感じています。</p>
                <p>例えばの<a href="http://hsimyu.net/motocal/?id=748">編成例</a>ですが、下記画像のように</p>
                <Thumbnail alt="総合*回数*技巧期待値の場合" src="./soukaigi.png">
                    <h2 className="text-warning">総合*回数*技巧期待値の場合</h2>
                    <p className="text-warning">DA:74.1%, 奥義ゲージ上昇期待値が19.89%、必要ターンは6</p>
                </Thumbnail>
                <Thumbnail alt="予想ターン毎ダメージの場合" src="./cycleDamage.png">
                    <h2 className="text-info">予想ターン毎ダメージの場合</h2>
                    <p className="text-info">DA: 67.3%, 奥義ゲージ上昇期待値が19.12%、必要ターンは6のまま</p>
                </Thumbnail>
                <p>DA率最大の編成が1位ではなくなっています。(もちろん、単なる1編成例ですので、ジョブ・DAバフ・TAバフ・奥義ゲージ上昇バフ・奥義倍率等によって、大きく結果が変わる可能性もあります。)</p>
                <p>一概に後者の編成のが強いとは断言できませんが、1つの目安として使って頂ければと思います。</p>
                <p>キャラ混みの平均値についても総合*回数*技巧期待値同様に計算できるようになっていますが、現在はキャラ別の奥義倍率についてはサポートしていませんので、あくまで目安としてお使い下さい。</p>
                <p>また、通常攻撃ダメージの減衰補正・奥義ダメージの減衰補正についてのより詳しい情報があればご提供頂けると助かります。</p>

                <h3>最後に</h3>
                <p>本計算機を信頼して、討滅戦武器集めたのに編成に入らないって結果に変わった！という方がおりましたらすみません。</p>
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
            <ul className="list-group">
                <li className="list-group-item list-group-item-info">2016/08/26: 武器追加時にLvとSLvも選べるようにした </li>
                <li className="list-group-item list-group-item-success">2016/08/26: 新武器の画像を追加 </li>
                <li className="list-group-item list-group-item-success">2016/08/25: 計算量削減処理を追加 (倍くらい早くなりました) </li>
                <li className="list-group-item list-group-item-success">2016/08/25: 新武器の情報を武器テンプレートに追加(画像なし) </li>
                <li className="list-group-item list-group-item-info">2016/08/25: カオスルーダーと義賊を追加 / フェリ(SSR)がキャラテンプレートに表示されていない不具合を修正 </li>
                <li className="list-group-item list-group-item-info">2016/08/25: 武器追加時に+を計算できるようにした </li>
                <li className="list-group-item list-group-item-info">2016/08/25: 召喚石が複数あった際に、全てのグラフをまとめたものも表示されるようにした / 召喚石の削除・コピー機能実装 </li>
                <li className="list-group-item list-group-item-danger">2016/08/24: 前述の不具合調整の際のミスのため、全く計算されなくなってしまう場合があったのを修正 </li>
                <li className="list-group-item list-group-item-info">2016/08/24: PC版UIの微調整 / プリセット入力から武器を追加した際、本数が正しく設定されない場合があるのを修正 </li>
                <li className="list-group-item list-group-item-danger">2016/08/24: データ読み出しの際、PC版のレイアウトが崩れることがある不具合を修正 </li>
                <li className="list-group-item list-group-item-danger">2016/08/24: サーバからのデータ読み出し機能に障害が出ていたのを修正 </li>
                <li className="list-group-item list-group-item-info">2016/08/23: iPhone版でもHPチャート機能をリリース / PC版のレイアウトをドラッグして調整できるようにした </li>
                <li className="list-group-item list-group-item-info">2016/08/23: グラフ用に保存した編成を全リセットするボタン追加 / 凡例のスタイル調整 </li>
                <li className="list-group-item list-group-item-success">2016/08/22: 背水渾身用のHPチャート表示機能を実装 </li>
                <li className="list-group-item list-group-item-success">2016/08/21: 予想ターン毎ダメージの導入と、それについての解説を追加 / 減衰補正を修正 </li>
                <li className="list-group-item list-group-item-danger">2016/08/21: コスモス武器を選んだ場合に止まってしまう不具合を修正 </li>
                <li className="list-group-item list-group-item-success">2016/08/20: スマホ版でスワイプでのタブ切り替えに対応 / 武器追加時に考慮本数を選べるようにした </li>
                <li className="list-group-item list-group-item-info">2016/08/20: UIを調整 / サーバに保存後にデータを変更すると、初期データに戻ってしまう不具合を修正 / 保存したURLをブラウザ履歴として残すようにした / ブラウザ保存データを一度も選択しないで読み込みを行うと、データを指定しろと言われる不具合を修正 / 武器とキャラプリセットで、枠がないときにいっぱいですって言われないようにした </li>
                <li className="list-group-item list-group-item-success">2016/08/19: キャラテンプレート機能を追加 </li>
                <li className="list-group-item list-group-item-success">2016/08/19: 武器テンプレート機能を追加(gbf-wikiのデータを使わせて頂きました。) / コスモス武器チェックボックス廃止 / 計算処理の削減 </li>
                <li className="list-group-item list-group-item-info">2016/08/19: 武器数・召喚石数・キャラ数の増やし方を変更 / ゼニスパークとジョブ攻撃ボーナスを分離 / 同じ名前のキャラがいると片方しか計算されない不具合を修正 </li>
                <li className="list-group-item list-group-item-success">2016/08/18: スマホ・タブレットレイアウト対応 / PC版レイアウトも調整 / UI調整 </li>
                <li className="list-group-item list-group-item-success">2016/08/17: 検証データを元に渾身の実装を修正 / <a href="http://hsimyu.net/motocal/thumbnail.php" target="_blank">データビューア</a>の作成 / 予想ダメージ計算に減衰補正を追加 </li>
                <li className="list-group-item list-group-item-info">2016/08/16: 三手スキルSLv11~15の値を入力 / DATA率の合計を、枠別上限から武器スキル全体の上限に修正 / 渾身仮実装 </li>
                <li className="list-group-item list-group-item-info">2016/08/12: 二手スキル上限の値に召喚石加護分の値が考慮されていなかった不具合を修正。/ 予想ダメージ機能を仮実装しました。</li>
                <li className="list-group-item list-group-item-danger">2016/08/11: 敵の属性の内部的な初期値がおかしかった不具合を修正。</li>
                <li className="list-group-item list-group-item-info">2016/08/09: 簡易リセットボタンを配置 / バハムート武器フツルスの拳系に対応 (wikiの情報に準拠) (HP40%, DA10%, TA8%という情報もありますが、未確定の為とりあえず低い値を採用しました。検証してくれる方を募集してます……) </li>
                <li className="list-group-item list-group-item-success">2016/08/07: コスモス武器を複数含めて比較できるようにした (2本同時に編成されることはありません) / キャラを平均値に含めるかどうかを指定できるようにした。 / 武器スキル属性の一括変更を実装 </li>
            </ul>

            <h3>注記</h3>
            <ul className="list-group">
                 <li className="list-group-item list-group-item-info">未対応: 羅刹/召喚石のクリティカル率</li>
                 <li className="list-group-item list-group-item-info">今後の実装予定: 召喚石入力欄の利便性向上 / キャラ欄の利便性向上</li>
                 <li className="list-group-item list-group-item-info"><strong>バハ武器フツルスのHP/攻撃力を正しく計算したい場合はスキルに"バハフツ(攻/HP)"を選択してください。</strong> <br/>
                 (バハ攻SLv11~の場合のHPと、バハ攻HPのSLv10の場合にズレが出ます。それ以外は問題ありません)</li>
                 <li className="list-group-item list-group-item-info">得意武器IIのゼニス（★4以上）は、Iをすべてマスター済みという前提で各6%, 8%, 10%として計算します。</li>
                 <li className="list-group-item list-group-item-info">三手はSLv1で1.1%、SLv10で5%というデータから内挿しているため、あくまで予想値であるということをご理解下さい。<br/>
                 また、三手スキル上限はデータがないため仮に50%としています。実際には50%よりも低い可能性もあるのでご注意下さい。</li>
                 <li className="list-group-item list-group-item-info">計算量削減のため、計算数が1024通りを超えた場合は合計本数10本の編成のみ算出・比較します。</li>
                 <li className="list-group-item list-group-item-info">パーティ全体の残HP指定と個別の残HP指定のうち、低い方を適用して背水値を計算します。(背水キャラ運用用) </li>
                 <li className="list-group-item list-group-item-info">
                 敵防御固有値は単攻撃ダメージ計算にのみ使用されます。(10から15程度が目安)<br/>
                 防御デバフを考慮する場合、防御固有値を半分にしてください。<br/>
                 また、単攻撃ダメージ計算はあくまで目安ということでお願いします。<br/>
                 補正幅は, <br/>
                 通常攻撃:30万以上: 30%減衰, 42.5万以上: 60%減衰、55万以上: 90%減衰、62.5万以上: 99%減衰<br/>
                 奥義:    100万以上: 40%減衰, 115万以上: 60%減衰、130万以上: 95%減衰、140万以上: 99%減衰<br/>
                 としていますが、
                 正確な情報をお持ちでしたらご提供頂けると助かります。 </li>
            </ul>

            <Image className="banner" src="./ChWJ-LgUgAA2JEy.jpg" />
            製作者: ほしみ <a href="http://twitter.com/hsimyu" target="_blank"> @hsimyu </a><br/>
            不具合報告・ご要望がありましたらTwitterにてご連絡をお願い致します。

            <h3>LICENSE</h3>
            <ul className="list-group">
                <li className="list-group-item"> <a href="http://facebook.github.io/react">React</a>: Copyright &copy; 2013-2016 Facebook Inc. v15.3.0 </li>
                <li className="list-group-item"> <a href="http://github.com/dankogai/js-base64">dankogai/js-base64</a>: Copyright &copy; 2014, Dan Kogai <a href="./js-base64/LICENSE.md"> LICENSE </a></li>

            </ul>

            <h3>参考文献</h3>
            以下のサイト・ツイートを参考にさせていただきました。
            <ul className="list-group">
                <li className="list-group-item"> <a href="http://gbf-wiki.com">グランブルーファンタジー(グラブル)攻略wiki</a></li>
                <li className="list-group-item"> <a href="http://hibin0.web.fc2.com/grbr_atk_calc/atk_calc.html">グランブルーファンタジー攻撃力計算機</a></li>
                <li className="list-group-item"> <a href="http://hibin0.web.fc2.com/grbr_weapon_calc/weapon_calc.html">オススメ装備に自信ニキ</a></li>
                <li className="list-group-item"> <a href="http://greatsundome.hatenablog.com/entry/2015/12/09/230544">すんどめ侍のグラブル生活 - 【グラブル】武器スキル検証結果</a></li>
                <li className="list-group-item"> <a href="http://greatsundome.hatenablog.com/entry/2015/10/11/175521">すんどめ侍のグラブル生活 - 【グラブル】ジョブデータ検証結果</a></li>
                <li className="list-group-item"> <a href="http://greatsundome.hatenablog.com/entry/2015/10/07/114737">すんどめ侍のグラブル生活 - 【グラブル】減衰補正検証まとめ</a></li>
                <li className="list-group-item"> <a href="https://twitter.com/hibino_naoki/status/722338377127735296"> @hibino_naoki さんのコルタナ(三手大)検証情報</a></li>
                <li className="list-group-item"> <a href="https://twitter.com/gekikara_s/status/746274346251882496"> @gekikara_s さんのバハフツ拳検証情報</a></li>
                <li className="list-group-item"> <a href="https://twitter.com/Hecate_mk2/status/765508148689985537"> @Hecate_mk2 さんの渾身(大)検証情報</a></li>
                <li className="list-group-item"> <a href="https://twitter.com/firemagma/status/765632239526830080"> @firemagma さんの渾身(大)検証情報</a></li>
                <li className="list-group-item"> <a href="https://twitter.com/hibino_naoki/status/765749475457413120"> @hibino_naoki さんの渾身(大)検証情報</a></li>
                <li className="list-group-item"> <a href="http://gbf.xzz.jp/dev/%E9%98%B2%E5%BE%A1%E5%9B%BA%E6%9C%89%E5%80%A4%E3%83%A1%E3%83%A2/"> 防御固有値メモ - グラメモ</a></li>
            </ul>

            <h3>スキル性能・各種計算式</h3>
            <div className="table-responsive">
            <table className="table"><tbody>
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
            </div>
            <ul className="list-group">
                <li className="list-group-item">通常神威: 通常攻刃(小) + 通常守護(小)</li>
                <li className="list-group-item">マグナ神威: マグナ攻刃(小) + マグナ守護(小)</li>
                <li className="list-group-item">通常刹那: 通常技巧(中) + 通常攻刃(中) </li>
                <li className="list-group-item">マグナ刹那: マグナ技巧(中) + マグナ攻刃(中) </li>
                <li className="list-group-item">通常克己: 通常技巧(中) + 通常二手(中) </li>
                <li className="list-group-item">マグナ克己: マグナ技巧(中) + マグナ二手(中) </li>
                <li className="list-group-item">通常暴君: 通常攻刃(大) + HP減少(10%) </li>
                <li className="list-group-item">マグナ暴君: マグナ攻刃(大) + HP減少(10%) </li>
                <li className="list-group-item">アンノウン暴君(ミフネ): アンノウン攻刃(大) + HP減少(7%) </li>
                <li className="list-group-item">技巧(小, 中, 大): クリティカル時倍率 50%</li>
                <li className="list-group-item">マグナ技巧(小, 中, 大): クリティカル時倍率 50% </li>
                <li className="list-group-item">背水(小): (baseRate/3) * (2 * 残りHP割合^2 - 5 * 残りHP割合 + 3) <br/>(baseRateは (Slv10以下) -0.3 + Slv * 1.8, (Slv10以上) 18.0 + 3.0 * (Slv - 10) / 5.0 </li>
                <li className="list-group-item">背水(中): (baseRate/3) * (2 * 残りHP割合^2 - 5 * 残りHP割合 + 3) <br/>(baseRateは (Slv10以下) -0.4 + Slv * 2.4, (Slv10以上) 24.0 + 3.0 * (Slv - 10) / 5.0 </li>
                <li className="list-group-item">背水(大): (baseRate/3) * (2 * 残りHP割合^2 - 5 * 残りHP割合 + 3) <br/>(baseRateは (Slv10以下) -0.5 + Slv * 3.0, (Slv10以上) 30.0 + 3.0 * (Slv - 10) / 5.0 </li>
                <li className="list-group-item">渾身(大): baseRate * 残りHP割合 (baseRateは (Slv10以下) 10.0 + Slv * 1.0, (Slv10以上) 20.0 + (Slv - 10) * 0.6 </li>
                <li className="list-group-item">攻撃回数期待値: 3.0 * TA率 + (1.0 - TA率) * (2.0 * DA率 + (1.0 - DA率)) (TA→DAの順で判定、TA率が100％なら3回、TA率0％でDA率100％なら2回) </li>
                <li className="list-group-item">技巧期待値: 通常技巧倍率 * 通常技巧確率 + マグナ技巧倍率 * マグナ技巧確率 + (1.0 - 通常技巧確率 - マグナ技巧確率) * 1.0 (マグナと通常は重複)</li>
                <li className="list-group-item">基礎HP: 600 + 8 * rank(100まで) + 4 * (rank - 100)</li>
            </ul>
        </div>
       );
    },

});

ReactDOM.render(<Root />, document.getElementById('app'));

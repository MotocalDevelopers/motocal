var React = require('react');
var {Tooltip, OverlayTrigger} = require('react-bootstrap');
var intl = require('./translate.js');

module.exports.TextWithTooltip = React.createClass({
    render: function() {
        var tooltip = <Tooltip id={this.props.id}>{this.props.tooltip}</Tooltip>

        return (
            <OverlayTrigger overlay={tooltip} placement="top" delayShow={300} delayHide={150}>
                {this.props.children}
            </OverlayTrigger>
        );
    },
    propTypes: {
        tooltip: React.PropTypes.string.isRequired,
    }
});

module.exports.ElementColorLabel = React.createClass({
    render: function() {
        var element = this.props.element;

        if(element == "fire") return <span className="label label-danger" style={{"fontSize": "12pt"}}>{this.props.children}</span>
        if(element == "water") return <span className="label label-primary" style={{"fontSize": "12pt"}}>{this.props.children}</span>
        if(element == "earth") return <span className="label label-warning" style={{"fontSize": "12pt"}}>{this.props.children}</span>
        if(element == "wind") return <span className="label label-success" style={{"fontSize": "12pt"}}>{this.props.children}</span>
        if(element == "light") return <span className="label label-light" style={{"fontSize": "12pt"}}>{this.props.children}</span>
        if(element == "dark") return <span className="label label-dark" style={{"fontSize": "12pt"}}>{this.props.children}</span>
        if(element == "non" || element == "non-but-critical") return <span className="label label-non" style={{"fontSize": "12pt"}}>{this.props.children}</span>
        return <span className="label label-default" style={{"fontSize": "12pt"}}>{this.props.children}</span>
    },
    propTypes: {
        element: React.PropTypes.string.isRequired,
    }
});
// 属性に対応した色のラベルを返す
module.exports.getElementColorLabel = (function(element, locale) {
    if(element == "fire") return <span className="label label-danger">{intl.translate("火", locale)}</span>
    if(element == "water") return <span className="label label-primary">{intl.translate("水", locale)}</span>
    if(element == "earth") return <span className="label label-warning">{intl.translate("土", locale)}</span>
    if(element == "wind") return <span className="label label-success">{intl.translate("風", locale)}</span>
    if(element == "light") return <span className="label label-light">{intl.translate("光", locale)}</span>
    if(element == "dark") return <span className="label label-dark">{intl.translate("闇", locale)}</span>
    if(element == "non") return <span className="label label-non">{intl.translate("無", locale)}</span>
    if(element == "non-but-critical") return <span className="label label-non">{intl.translate("無（技巧あり）", locale)}</span>
    return <span className="label label-danger">{intl.translate("火", locale)}</span>
});


module.exports._ua = (function(u){
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

var zenith = {"無し": 0, "★1": 0.01, "★2": 0.03, "★3": 0.05, "★4": 0.06, "★5": 0.08, "★6": 0.10}
var zenithAttackBonus = [3000, 1500, 500, 0];
var zenithHPBonus = [1000, 600, 300, 0];
var zenithPartyHPBonus = [2000, 1600, 1300, 1000, 600, 300, 0];
var skilllevels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
var considerNum = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var buffLevelList = [
    0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95,
    100, 105, 110, 115, 120, 125, 130, 135, 140, 145, 150, 155, 160, 165, 170, 175, 180, 185, 190, 195,
    200, 205, 210, 215, 220, 225, 230, 235, 240, 245, 250, 255, 260, 265, 270, 275, 280, 285, 290, 295, 300,
    -5, -10, -15, -20, -25, -30, -35, -40, -45, -50, -55, -60, -65, -70, -75, -80, -85, -90, -95, -100
];
var ougiRatioList = [4.0, 4.5, 5.0];
var masterATKList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
var masterHPList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
var HPList = [ 100, 99, 98, 97, 96, 95, 94, 93, 92, 91, 90, 89, 88, 87, 86, 85, 84, 83, 82, 81, 80, 79, 78, 77, 76, 75, 74, 73, 72, 71, 70, 69, 68, 67, 66, 65, 64, 63, 62, 61, 60, 59, 58, 57, 56, 55, 54, 53, 52, 51, 50, 49, 48, 47, 46, 45, 44, 43, 42, 41, 40, 39, 38, 37, 36, 35, 34, 33, 32, 31, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1 ];
var plusNumList = { "+0": 0, "+99(max)": 99, "+1": 1, "+2": 2, "+3": 3, "+4": 4, "+5": 5, "+6": 6, "+7": 7, "+8": 8, "+9": 9, "+10": 10, "+11": 11, "+12": 12, "+13": 13, "+14": 14, "+15": 15, "+16": 16, "+17": 17, "+18": 18, "+19": 19, "+20": 20, "+21": 21, "+22": 22, "+23": 23, "+24": 24, "+25": 25, "+26": 26, "+27": 27, "+28": 28, "+29": 29, "+30": 30, "+31": 31, "+32": 32, "+33": 33, "+34": 34, "+35": 35, "+36": 36, "+37": 37, "+38": 38, "+39": 39, "+40": 40, "+41": 41, "+42": 42, "+43": 43, "+44": 44, "+45": 45, "+46": 46, "+47": 47, "+48": 48, "+49": 49, "+50": 50, "+51": 51, "+52": 52, "+53": 53, "+54": 54, "+55": 55, "+56": 56, "+57": 57, "+58": 58, "+59": 59, "+60": 60, "+61": 61, "+62": 62, "+63": 63, "+64": 64, "+65": 65, "+66": 66, "+67": 67, "+68": 68, "+69": 69, "+70": 70, "+71": 71, "+72": 72, "+73": 73, "+74": 74, "+75": 75, "+76": 76, "+77": 77, "+78": 78, "+79": 79, "+80": 80, "+81": 81, "+82": 82, "+83": 83, "+84": 84, "+85": 85, "+86": 86, "+87": 87, "+88": 88, "+89": 89, "+90": 90, "+91": 91, "+92": 92, "+93": 93, "+94": 94, "+95": 95, "+96": 96, "+97": 97, "+98": 98, "+99": 99}
var levelListLimit = { "Lv. 1": 1, "0凸 (Lv. 40)": 40, "1凸 (Lv. 60)": 60, "2凸 (Lv. 80)": 80, "3凸 (Lv. 100)": 100, "Lv. 2": 2, "Lv. 3": 3, "Lv. 4": 4, "Lv. 5": 5, "Lv. 6": 6, "Lv. 7": 7, "Lv. 8": 8, "Lv. 9": 9, "Lv. 10": 10, "Lv. 11": 11, "Lv. 12": 12, "Lv. 13": 13, "Lv. 14": 14, "Lv. 15": 15, "Lv. 16": 16, "Lv. 17": 17, "Lv. 18": 18, "Lv. 19": 19, "Lv. 20": 20, "Lv. 21": 21, "Lv. 22": 22, "Lv. 23": 23, "Lv. 24": 24, "Lv. 25": 25, "Lv. 26": 26, "Lv. 27": 27, "Lv. 28": 28, "Lv. 29": 29, "Lv. 30": 30, "Lv. 31": 31, "Lv. 32": 32, "Lv. 33": 33, "Lv. 34": 34, "Lv. 35": 35, "Lv. 36": 36, "Lv. 37": 37, "Lv. 38": 38, "Lv. 39": 39, "Lv. 40": 40, "Lv. 41": 41, "Lv. 42": 42, "Lv. 43": 43, "Lv. 44": 44, "Lv. 45": 45, "Lv. 46": 46, "Lv. 47": 47, "Lv. 48": 48, "Lv. 49": 49, "Lv. 50": 50, "Lv. 51": 51, "Lv. 52": 52, "Lv. 53": 53, "Lv. 54": 54, "Lv. 55": 55, "Lv. 56": 56, "Lv. 57": 57, "Lv. 58": 58, "Lv. 59": 59, "Lv. 60": 60, "Lv. 61": 61, "Lv. 62": 62, "Lv. 63": 63, "Lv. 64": 64, "Lv. 65": 65, "Lv. 66": 66, "Lv. 67": 67, "Lv. 68": 68, "Lv. 69": 69, "Lv. 70": 70, "Lv. 71": 71, "Lv. 72": 72, "Lv. 73": 73, "Lv. 74": 74, "Lv. 75": 75, "Lv. 76": 76, "Lv. 77": 77, "Lv. 78": 78, "Lv. 79": 79, "Lv. 80": 80, "Lv. 81": 81, "Lv. 82": 82, "Lv. 83": 83, "Lv. 84": 84, "Lv. 85": 85, "Lv. 86": 86, "Lv. 87": 87, "Lv. 88": 88, "Lv. 89": 89, "Lv. 90": 90, "Lv. 91": 91, "Lv. 92": 92, "Lv. 93": 93, "Lv. 94": 94, "Lv. 95": 95, "Lv. 96": 96, "Lv. 97": 97, "Lv. 98": 98, "Lv. 99": 99, "Lv. 100": 100}
var levelListNoLimit = { "Lv. 1": 1, "0凸 (Lv. 40)": 40, "1凸 (Lv. 60)": 60, "2凸 (Lv. 80)": 80, "3凸 (Lv. 100)": 100, "Lv. 2": 2, "Lv. 3": 3, "Lv. 4": 4, "Lv. 5": 5, "Lv. 6": 6, "Lv. 7": 7, "Lv. 8": 8, "Lv. 9": 9, "Lv. 10": 10, "Lv. 11": 11, "Lv. 12": 12, "Lv. 13": 13, "Lv. 14": 14, "Lv. 15": 15, "Lv. 16": 16, "Lv. 17": 17, "Lv. 18": 18, "Lv. 19": 19, "Lv. 20": 20, "Lv. 21": 21, "Lv. 22": 22, "Lv. 23": 23, "Lv. 24": 24, "Lv. 25": 25, "Lv. 26": 26, "Lv. 27": 27, "Lv. 28": 28, "Lv. 29": 29, "Lv. 30": 30, "Lv. 31": 31, "Lv. 32": 32, "Lv. 33": 33, "Lv. 34": 34, "Lv. 35": 35, "Lv. 36": 36, "Lv. 37": 37, "Lv. 38": 38, "Lv. 39": 39, "Lv. 40": 40, "Lv. 41": 41, "Lv. 42": 42, "Lv. 43": 43, "Lv. 44": 44, "Lv. 45": 45, "Lv. 46": 46, "Lv. 47": 47, "Lv. 48": 48, "Lv. 49": 49, "Lv. 50": 50, "Lv. 51": 51, "Lv. 52": 52, "Lv. 53": 53, "Lv. 54": 54, "Lv. 55": 55, "Lv. 56": 56, "Lv. 57": 57, "Lv. 58": 58, "Lv. 59": 59, "Lv. 60": 60, "Lv. 61": 61, "Lv. 62": 62, "Lv. 63": 63, "Lv. 64": 64, "Lv. 65": 65, "Lv. 66": 66, "Lv. 67": 67, "Lv. 68": 68, "Lv. 69": 69, "Lv. 70": 70, "Lv. 71": 71, "Lv. 72": 72, "Lv. 73": 73, "Lv. 74": 74, "Lv. 75": 75, "Lv. 76": 76, "Lv. 77": 77, "Lv. 78": 78, "Lv. 79": 79, "Lv. 80": 80, "Lv. 81": 81, "Lv. 82": 82, "Lv. 83": 83, "Lv. 84": 84, "Lv. 85": 85, "Lv. 86": 86, "Lv. 87": 87, "Lv. 88": 88, "Lv. 89": 89, "Lv. 90": 90, "Lv. 91": 91, "Lv. 92": 92, "Lv. 93": 93, "Lv. 94": 94, "Lv. 95": 95, "Lv. 96": 96, "Lv. 97": 97, "Lv. 98": 98, "Lv. 99": 99, "Lv. 100": 100, "Lv. 101": 101, "Lv. 102": 102, "Lv. 103": 103, "Lv. 104": 104, "Lv. 105": 105, "Lv. 106": 106, "Lv. 107": 107, "Lv. 108": 108, "Lv. 109": 109, "Lv. 110": 110, "Lv. 111": 111, "Lv. 112": 112, "Lv. 113": 113, "Lv. 114": 114, "Lv. 115": 115, "Lv. 116": 116, "Lv. 117": 117, "Lv. 118": 118, "Lv. 119": 119, "Lv. 120": 120, "Lv. 121": 121, "Lv. 122": 122, "Lv. 123": 123, "Lv. 124": 124, "Lv. 125": 125, "Lv. 126": 126, "Lv. 127": 127, "Lv. 128": 128, "Lv. 129": 129, "Lv. 130": 130, "Lv. 131": 131, "Lv. 132": 132, "Lv. 133": 133, "Lv. 134": 134, "Lv. 135": 135, "Lv. 136": 136, "Lv. 137": 137, "Lv. 138": 138, "Lv. 139": 139, "Lv. 140": 140, "Lv. 141": 141, "Lv. 142": 142, "Lv. 143": 143, "Lv. 144": 144, "Lv. 145": 145, "Lv. 146": 146, "Lv. 147": 147, "Lv. 148": 148, "Lv. 149": 149, "Lv. 150": 150 }
var skillLevelListNoLimit = { "SLv. 1": 1, "SLv. 2": 2, "SLv. 3": 3, "SLv. 4": 4, "SLv. 5": 5, "SLv. 6": 6, "SLv. 7": 7, "SLv. 8": 8, "SLv. 9": 9, "SLv. 10": 10, "SLv. 11": 11, "SLv. 12": 12, "SLv. 13": 13, "SLv. 14": 14, "SLv. 15": 15 }
var skillLevelListLimit = { "SLv. 1": 1, "SLv. 2": 2, "SLv. 3": 3, "SLv. 4": 4, "SLv. 5": 5, "SLv. 6": 6, "SLv. 7": 7, "SLv. 8": 8, "SLv. 9": 9, "SLv. 10": 10 }
var summonAmountList = [0, 10, 20, 25, 30, 40, 50, 60, 66, 70, 75, 80, 85, 90, 95, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200];
var chainNumberList = [1, 2, 3, 4];

// limitBonus
var limitBonusAttackList = [0, 500, 800, 1000, 1300, 1500, 1600, 1800, 2000, 2300, 2500, 2600, 2800, 3000];
var limitBonusHPList = [0, 250, 500, 750, 1000, 1250, 1500, 1750, 2000, 2250, 2500, 2750, 3000];
var limitBonusDAList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
var limitBonusTAList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
var limitBonusElementList = [0, 5, 8, 10, 13, 15, 16, 18, 20, 21, 24, 25, 28, 30, 32, 33, 35, 36, 38, 40];
var limitBonusCriticalList = {
    "none": {
        "name": "無",
        "value": 0.0,
        "attackRatio": 0.0,
    },
    "small": {
        "name": "小",
        "value": 0.125,
        "attackRatio": 0.125,
    },
    "medium": {
        "name": "中",
        "value": 0.20,
        "attackRatio": 0.20,
    },
    "large": {
        "name": "大",
        "value": 0.25,
        "attackRatio": 0.25,
    },
};

var enemyDefenseType = {
    10.0: {"name": "敵防御10"},
    8.0: {"name": "敵防御8"},
    7.0: {"name": "敵防御7"},
    5.0: {"name": "敵防御5"},
    13.0: {"name": "敵防御13"},
    6.5: {"name": "敵防御6.5"},
    11.0: {"name": "敵防御11"},
    5.5: {"name": "敵防御5.5"},
    20.0: {"name": "敵防御20"},
}
var keyTypes = {
    "totalAttack":"攻撃力(二手技巧無し,ジータさんのみ)",
    "totalHP": "ジータさんHP",
    "ATKandHP": "戦力",
    "averageAttack": "パーティ平均攻撃力(二手技巧無し)",
    "criticalAttack": "技巧期待値(ジータさんのみ)",
    "averageCriticalAttack": "技巧期待平均攻撃力",
    "pureDamage": "単攻撃ダメージ(技巧連撃無)",
    "damageWithCritical": "単攻撃ダメージ(技巧有)",
    "damageWithMultiple": "単攻撃ダメージ(連撃有)",
    "damage": "単攻撃ダメージ(技巧連撃有)",
    "ougiDamage": "奥義ダメージ",
    "totalExpected": "総合攻撃*期待回数*技巧期待値(ジータさんのみ)",
    "averageTotalExpected": "総回技のパーティ平均値",
    "expectedCycleDamagePerTurn": "予想ターン毎ダメージ(ジータさんのみ)",
    "averageCyclePerTurn": "予想ターン毎ダメージのパーティ平均値",
}
var supportedChartSortkeys = {
    "totalAttack": "攻撃力(二手技巧無し,ジータさんのみ)",
    "averageAttack": "パーティ平均攻撃力(二手技巧無し)",
    "criticalAttack": "技巧期待値(ジータさんのみ)",
    "averageCriticalAttack": "技巧期待平均攻撃力",
    "totalExpected": "総合攻撃*期待回数*技巧期待値(ジータさんのみ)",
    "averageTotalExpected": "総回技のパーティ平均値",
    "expectedCycleDamagePerTurn": "予想ターン毎ダメージ(ジータさんのみ)",
    "averageCyclePerTurn": "予想ターン毎ダメージのパーティ平均値",
    "totalHP": "ジータさん残りHP",
}
var supportedTurnChartSortkeys = {
    "totalAttack": "攻撃力(二手技巧無し,ジータさんのみ)",
    "averageAttack": "パーティ平均攻撃力(二手技巧無し)",
    "criticalAttack": "技巧期待値(ジータさんのみ)",
    "averageCriticalAttack": "技巧期待平均攻撃力",
    "expectedCycleDamagePerTurn": "予想ターン毎ダメージ(ジータさんのみ)",
    "averageCyclePerTurn": "予想ターン毎ダメージのパーティ平均値",
}
var supportedSimulationChartSortkeys = {
    "averageAttack": "パーティ平均攻撃力(二手技巧無し)",
    "averageTotalExpected": "総回技のパーティ平均値",
    "expectedDamage": "予想ダメージ(ジータさんのみ)",
    "averageExpectedDamage": "予想ダメージのパーティ平均値",
    "summedAverageExpectedDamage": "予想ダメージ平均の積分値",
}

// skill data
var skilltypes = {
    "non": {name: "無し", type:"non", amount: "non"},
    "normalS": {name:"通常攻刃(小)", type:"normal", amount: "S"},
    "normalM": {name:"通常攻刃(中)", type:"normal", amount: "M"},
    "normalL": {name:"通常攻刃(大)", type:"normal", amount: "L"},
    "normalLL": {name:"通常攻刃II", type:"normal", amount: "LL"},
    "normalLLM": {name:"通常攻刃III", type:"normal", amount: "LLM"},
    "normalBoukunL": {name:"通常暴君", type:"normalBoukun", amount: "L"},
    "normalBoukunLLL": {name:"通常暴君II", type:"normalBoukun", amount: "LLL"},
    "normalHaisuiS": {name:"通常背水(小)", type:"normalHaisui", amount: "S"},
    "normalHaisuiM": {name:"通常背水(中)", type:"normalHaisui", amount: "M"},
    "normalHaisuiL": {name:"通常背水(大)", type:"normalHaisui", amount: "L"},
    "normalKonshinM": {name:"通常渾身(中)", type:"normalKonshin", amount: "M"},
    "normalKonshinL": {name:"通常渾身(大)", type:"normalKonshin", amount: "L"},
    "normalOtherKonshinL": {name: "通常渾身(大)(神石加護無効)", type: "normalOtherKonshin", amount: "L"},
    "normalNiteS": {name:"通常二手(小)", type:"normalNite", amount: "S"},
    "normalNiteM": {name:"通常二手(中)", type:"normalNite", amount: "M"},
    "normalNiteL": {name:"通常二手(大)", type:"normalNite", amount: "L"},
    "normalSanteS": {name:"通常三手(小)", type:"normalSante", amount: "S"},
    "normalSanteL": {name:"通常三手(大)", type:"normalSante", amount: "L"},
    "normalKatsumiM": {name:"通常克己(中)", type:"normalKatsumi", amount: "M"},
    "normalKamui": {name:"通常神威(小)", type:"normalKamui", amount: "S"},
    "normalKamuiM": {name:"通常神威(中)", type:"normalKamui", amount: "M"},
    "normalKatsumokuS": {name: "通常括目", type: "normalKatsumoku", amount: "S"},
    "normalRasetsuM": {name: "通常羅刹", type: "normalRasetsu", amount: "M"},
    "normalMusouM": {name: "通常無双(中)", type: "normalMusou", amount: "M"},
    "normalRanbuS": {name: "通常乱舞(小)", type: "normalRanbu", amount: "S"},
    "magnaM": {name: "マグナ攻刃", type:"magna", amount:"M"},
    "magnaL": {name: "マグナ攻刃II", type:"magna", amount:"L"},
    "magnaHaisuiS": {name:"マグナ背水(小)", type:"magnaHaisui", amount: "S"},
    "magnaHaisuiM": {name:"マグナ背水(中)", type:"magnaHaisui", amount: "M"},
    "magnaHaisuiL": {name:"マグナ背水(大)", type:"magnaHaisui", amount: "L"},
    "magnaKonshinM": {name:"マグナ渾身(中)", type:"magnaKonshin", amount: "M"},
    "magnaSanteL": {name:"マグナ三手(大)", type:"magnaSante", amount: "L"},
    "magnaKatsumiM": {name:"マグナ克己(中)", type:"magnaKatsumi", amount: "M"},
    "magnaKamui": {name:"マグナ神威", type:"magnaKamui", amount: "S"},
    "magnaBoukun": {name:"マグナ暴君", type:"magnaBoukun", amount: "L"},
    "magnaKatsumokuS": {name: "マグナ括目", type: "magnaKatsumoku", amount: "S"},
    "magnaRasetsuM": {name: "マグナ羅刹", type: "magnaRasetsu", amount: "M"},
    "magnaRanbuM": {name: "マグナ乱舞(中)", type: "magnaRanbu", amount: "M"},
    "unknownM": {name:"アンノウンATK・I", type:"unknown", amount: "M"},
    "unknownL": {name:"アンノウンATK・II", type:"unknown", amount: "L"},
    "strengthHaisuiM": {name:"EX背水(中)", type:"exHaisui", amount: "M"},
    "strengthS": {name:"EX攻刃(小)", type:"ex", amount: "S"},
    "strengthM": {name:"EX攻刃(中)", type:"ex", amount: "M"},
    "strengthL": {name:"EX攻刃(大)", type:"ex", amount: "L"},
    "strengthLL": {name:"EX攻刃(特大)", type:"ex", amount: "LL"},
    "exATKandHPM": {name:"EX攻刃+守護(中)", type:"exATKandHP", amount: "M"},
    "normalDamageLimit2_5": {name: "通常上限UP(2.5%)", type: "normalDamageLimit", amount: "S"},
    "normalDamageLimit7": {name: "通常上限UP(7.0%)", type: "normalDamageLimit", amount: "M"},
    "normalDamageLimit10": {name: "通常上限UP(10%)", type: "normalDamageLimit", amount: "L"},
    "ougiDamageLimit10": {name: "奥義上限UP(10%)", type: "ougiDamageLimit", amount: "L"},
    "normalHPS": {name:"通常守護(小)", type:"normalHP", amount: "S"},
    "normalHPM": {name:"通常守護(中)", type:"normalHP", amount: "M"},
    "normalHPL": {name:"通常守護(大)", type:"normalHP", amount: "L"},
    "normalHPLL": {name:"通常守護II", type:"normalHP", amount: "LL"},
    "magnaHPM": {name:"マグナ守護", type:"magnaHP", amount: "M"},
    "magnaHPL": {name:"マグナ守護II", type:"magnaHP", amount: "L"},
    "unknownHPS": {name:"アンノウン・VIT I(小)", type:"unknownHP", amount: "S"},
    "unknownHPM": {name:"アンノウン・VIT I(中)", type:"unknownHP", amount: "M"},
    "unknownHPL": {name:"アンノウン・VIT II(大)", type:"unknownHP", amount: "L"},
    "unknownOtherBoukunL": {name:"ミフネ流・極意", type:"exBoukun", amount: "L"},
    "unknownOtherNiteS": {name:"ミフネ流・双星", type:"exNite", amount: "S"},
    "gurenJuin": {name:"紅蓮の呪印・弐", type:"gurenJuin", amount: "L"},
    "muhyoTuiga": {name:"霧氷の追牙・肆", type:"muhyoTuiga", amount: "L"},
    "tsuranukiKiba": {name:"貫きの牙", type:"tsuranukiKiba", amount: "M"},
    "tsuranukiKibaMain": {name:"貫きの牙(メイン装備時)", type:"tsuranukiKiba", amount: "M"},
    "washiouKekkai": {name:"鷲王の結界", type:"washiouKekkai", amount: "M"},
    "maihimeEnbu": {name:"舞姫の演舞", type:"maihimeEnbu", amount: "M"},
    "normalCriticalS": {name:"通常技巧(小)", type:"normalCritical", amount: "S"},
    "normalCriticalM": {name:"通常技巧(中)", type:"normalCritical", amount: "M"},
    "normalCriticalL": {name:"通常技巧(大)", type:"normalCritical", amount: "L"},
    "magnaCriticalS": {name:"マグナ技巧(小)", type:"magnaCritical", amount: "S"},
    "magnaCriticalM": {name:"マグナ技巧(中)", type:"magnaCritical", amount: "M"},
    "magnaCriticalL": {name:"マグナ技巧(大)", type:"magnaCritical", amount: "L"},
    "normalSetsunaS": {name:"通常刹那(小)", type:"normalSetsuna", amount: "S"},
    "normalSetsuna": {name:"通常刹那(中)", type:"normalSetsuna", amount: "M"},
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
    "cosmosPC": {name:"コスモスPC", type:"cosmos", amount: "L"},
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
    "omega-raw": {name:"オメガ-未強化", type:"omega", amount: "raw"},
    "omega-senni": {name:"オメガ-戦意", type:"omega", amount: "senni"},
    "omega-tousou": {name:"オメガ-闘争", type:"omega", amount: "tousou"},
    "omega-seimei": {name:"オメガ-生命", type:"omega", amount: "seimei"},
    "omega-kyousou": {name:"オメガ-強壮", type:"omega", amount: "M"},
    "omega-gekijou": {name:"オメガ-激情", type:"omega", amount: "M"},
    "omega-yuuki": {name:"オメガ-勇気", type:"omega", amount: "yuuki"},
    "gauphKey-alpha": {name: "ガフスキー[α]", type: "gauphKey", amount: "L"},
    // "gauphKey-beta": {name: "ガフスキー[β]", type: "gauphKey", amount: "L"},
    "gauphKey-gamma": {name: "ガフスキー[γ]", type: "gauphKey", amount: "L"},
    // "gauphKey-delta": {name: "ガフスキー[Δ]", type: "gauphKey", amount: "L"},
    "tenshiShukufuku":   {name:"天司の祝福", type: "tenshiShukufuku", amount: "M"},
    "tenshiShukufukuII": {name:"天司の祝福II", type: "tenshiShukufuku", amount: "L"},
    "extendedDjeetaNormalDATA5": {name: "[ジータのみ] 通常枠DATA 5%", type: "extendedDjeetaNormalDATA", amount: 5.0},
    "extendedDjeetaNormalDATA10": {name: "[ジータのみ] 通常枠DATA 10%", type: "extendedDjeetaNormalDATA", amount: 10.0},
    "extendedDjeetaNormalDATA15": {name: "[ジータのみ] 通常枠DATA 15%", type: "extendedDjeetaNormalDATA", amount: 15.0},
    "extendedDjeetaNormalDATA20": {name: "[ジータのみ] 通常枠DATA 20%", type: "extendedDjeetaNormalDATA", amount: 20.0},
    "extendedDjeetaNormalDATA25": {name: "[ジータのみ] 通常枠DATA 25%", type: "extendedDjeetaNormalDATA", amount: 25.0},
    "extendedDjeetaNormalDATA30": {name: "[ジータのみ] 通常枠DATA 30%", type: "extendedDjeetaNormalDATA", amount: 30.0},
};

var cosmosSkills = {
    "cosmosAT": {name:"コスモスAT", type:"cosmos", amount: "L"},
    "cosmosDF": {name:"コスモスDF", type:"cosmos", amount: "L"},
    "cosmosBL": {name:"コスモスBL", type:"cosmos", amount: "L"},
    "cosmosPC": {name:"コスモスPC", type:"cosmos", amount: "L"},
    "non": {name: "無し", type:"non", amount: "non"},
};

// テンプレート選択時の追加選択
var sishoSeiryu = {
    "non": {name: "無し", type:"non", amount: "non"},
    "normalCriticalM": {name:"王道: 竜巻の技巧"},
    "normalDamageLimit7": {name:"邪道: 通常上限UP(7.0%)"},
};
var sishoSuzaku = {
    "non": {name: "無し", type:"non", amount: "non"},
    "normalHPS": {name:"王道: 火の守護"},
    "normalDamageLimit7": {name:"邪道: 通常上限UP(7.0%)"},
};
var sishoByakko = {
    "non": {name: "無し", type:"non", amount: "non"},
    "normalCriticalM": {name:"王道: 大地の技巧"},
    "normalDamageLimit7": {name:"邪道: 通常上限UP(7.0%)"},
};
var sishoGenbu = {
    "non": {name: "無し", type:"non", amount: "non"},
    "normalNiteS": {name:"王道: 水の二手"},
    "normalDamageLimit7": {name:"邪道: 通常上限UP(7.0%)"},
};

var omegaWeaponSkill1 = {
    "omega-raw": {name: "オメガ-未強化"},
    "omega-senni": {name:"オメガ-戦意"},
    "omega-tousou": {name:"オメガ-闘争"},
    "omega-seimei": {name:"オメガ-生命"},
    "omega-gekijou": {name:"オメガ-激情"},
    "omega-kyousou": {name:"オメガ-強壮"},
    "omega-yuuki": {name:"オメガ-勇気"},
};

var omegaWeaponSkill2 = {
    "non": {name: "無し"},
    "gauphKey-alpha": {name: "ガフスキー[α]"},
    "gauphKey-gamma": {name:"ガフスキー[γ]"},
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
    "zeus": "神石系",
    "chara": "キャラ",
    "ranko": "蘭子",
    "odin": "属性攻+キャラ攻",
    "elementTurn": "属性(経過ターン)",
    "elementByRace": "属性(種族数)",
}

var raceTypes = {
    "human": "人間",
    "erune": "エルーン",
    "doraf": "ドラフ",
    "havin": "ハーヴィン",
    "seisho": "星晶獣",
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

var enemyElementTypes = {
    "fire": "火",
    "wind": "風",
    "earth": "土",
    "water": "水",
    "light": "光",
    "dark": "闇",
    "non": "無",
    "non-but-critical": "無（技巧あり）",
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
module.exports.elementRelation = {
    "fire": {"weak": "water", "strong": "wind"},
    "wind": {"weak": "fire", "strong": "earth"},
    "earth": {"weak": "wind", "strong": "water"},
    "water": {"weak": "earth", "strong": "fire"},
    "light": {"weak": "none", "strong": "dark"},
    "dark": {"weak": "none", "strong": "light"},
}

module.exports.bahamutRelation = {
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

module.exports.bahamutFURelation = {
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

module.exports.Jobs = {
    "beruse":       {"name": "ベルセルク",       "favArm1": "sword",  "favArm2": "axe",    "type": "attack",  "atBonus": 6000.0, "kouzinBonus": 0.0, "hpBonus": 1000.0, "shugoBonus": 10.0, "DaBonus": 26.5, "TaBonus": 5.5},
    "sage":         {"name": "セージ",           "favArm1": "wand",   "favArm2": "spear",  "type": "heal",    "atBonus": 0.0, "kouzinBonus": 0.0, "hpBonus": 0.0, "shugoBonus": 0.0, "DaBonus": 6.5, "TaBonus": 3.0},
    "suparuta":     {"name": "スパルタ",         "favArm1": "sword",  "favArm2": "spear",  "type": "defense", "atBonus": 0.0, "kouzinBonus": 0.0, "hpBonus": 1500.0, "shugoBonus": 0.0, "DaBonus": 6.5, "TaBonus": 3.0},
    "warlock":      {"name": "ウォーロック",     "favArm1": "wand",   "favArm2": "dagger", "type": "attack",  "atBonus": 2000.0, "kouzinBonus": 0.0, "hpBonus": 0.0, "shugoBonus": 0.0, "DaBonus": 6.5, "TaBonus": 3.0},
    "chaos":      {"name": "カオスルーダー",     "favArm1": "sword",   "favArm2": "dagger", "type": "pecu",  "atBonus": 0.0, "kouzinBonus": 0.0, "hpBonus": 0.0, "shugoBonus": 0.0, "DaBonus": 6.5, "TaBonus": 3.0},
    "gizoku":      {"name": "義賊",     "favArm1": "dagger",   "favArm2": "gun", "type": "balance",  "atBonus": 0.0, "kouzinBonus": 0.0, "hpBonus": 0.0, "shugoBonus": 0.0, "DaBonus": 6.5, "TaBonus": 3.0},
    "wrestler":    {"name": "レスラー", "favArm1": "fist", "favArm2": "fist", "type": "attack", "atBonus": 2000.0, "kouzinBonus": 0.0, "hpBonus": 300.0, "shugoBonus": 0.0, "DaBonus": 70.0, "TaBonus": 10.0},
    "hounddog": {"name": "ハウンドドッグ", "favArm1": "bow",    "favArm2": "gun",    "type": "balance", "atBonus": 1800.0, "kouzinBonus": 0.0, "hpBonus": 0.0, "shugoBonus": 0.0, "DaBonus": 6.5, "TaBonus": 3.0},
    "apsaras": {"name": "アプサラス", "favArm1": "spear",    "favArm2": "axe",    "type": "attack", "atBonus": 2000.0, "kouzinBonus": 0.0, "hpBonus": 0.0, "shugoBonus": 0.0, "DaBonus": 16.5, "TaBonus": 13.0},
    "elysian":    {"name": "エリュシオン",   "favArm1": "music",  "favArm2": "dagger", "type": "pecu",    "atBonus": 0.0, "kouzinBonus": 0.0, "hpBonus": 0.0, "shugoBonus": 0.0, "DaBonus": 6.5, "TaBonus": 3.0},
    "alche":        {"name": "アルケミスト",     "favArm1": "dagger", "favArm2": "gun",    "type": "heal",    "atBonus": 0.0, "kouzinBonus": 0.0, "hpBonus": 100.0, "shugoBonus": 0.0, "DaBonus": 6.5, "TaBonus": 3.0},
    "ninja":        {"name": "忍者",             "favArm1": "katana", "favArm2": "fist",   "type": "pecu",    "atBonus": 0.0, "kouzinBonus": 0.0, "hpBonus": 0.0, "shugoBonus": 0.0, "DaBonus": 31.5, "TaBonus": 3.0},
    "samurai":      {"name": "侍",               "favArm1": "katana", "favArm2": "bow",    "type": "attack",  "atBonus": 3000.0, "kouzinBonus": 0.0, "hpBonus": 0.0, "shugoBonus": 0.0, "DaBonus": 6.5, "TaBonus": 3.0},
    "kensei":       {"name": "剣聖",             "favArm1": "sword",  "favArm2": "katana", "type": "pecu",    "atBonus": 1500.0, "kouzinBonus": 0.0, "hpBonus": 300.0, "shugoBonus": 0.0, "DaBonus": 6.5, "TaBonus": 3.0},
    "gunsri":       {"name": "ガンスリンガー",         "favArm1": "gun",    "favArm2": "gun",    "type": "pecu",    "atBonus": 1000.0, "kouzinBonus": 0.0, "hpBonus": 0.0, "shugoBonus": 0.0, "DaBonus": 11.5, "TaBonus": 3.0},
    "kenja":        {"name": "賢者",             "favArm1": "wand",   "favArm2": "wand",   "type": "pecu",    "atBonus": 0.0, "kouzinBonus": 0.0, "hpBonus": 1000.0, "shugoBonus": 0.0, "DaBonus": 6.5, "TaBonus": 3.0},
    "assassin":     {"name": "アサシン",         "favArm1": "dagger", "favArm2": "dagger", "type": "pecu",    "atBonus": 1000.0, "kouzinBonus": 0.0, "hpBonus": 0.0, "shugoBonus": 0.0, "DaBonus": 6.5, "TaBonus": 3.0},
    "weaponmaster": {"name": "ウェポンマスター", "favArm1": "sword",  "favArm2": "axe",    "type": "attack",  "atBonus": 0.0, "kouzinBonus": 0.0, "hpBonus": 0.0, "shugoBonus": 0.0, "DaBonus": 23.0, "TaBonus": 5.0},
    "holyse":       {"name": "ホーリーセイバー",       "favArm1": "sword",  "favArm2": "spear",  "type": "defense", "atBonus": 0.0, "kouzinBonus": 0.0, "hpBonus": 0.0, "shugoBonus": 0.0, "DaBonus": 6.5, "TaBonus": 3.0},
    "bishop":       {"name": "ビショップ",       "favArm1": "wand",   "favArm2": "spear",  "type": "heal",    "atBonus": 0.0, "kouzinBonus": 0.0, "hpBonus": 0.0, "shugoBonus": 0.0, "DaBonus": 6.5, "TaBonus": 3.0},
    "hermit":       {"name": "ハーミット",       "favArm1": "wand",   "favArm2": "dagger", "type": "attack",  "atBonus": 0.0, "kouzinBonus": 0.0, "hpBonus": 0.0, "shugoBonus": 0.0, "DaBonus": 6.5, "TaBonus": 3.0},
    "hokuai":       {"name": "ホークアイ",       "favArm1": "dagger", "favArm2": "gun",    "type": "balance", "atBonus": 0.0, "kouzinBonus": 0.0, "hpBonus": 0.0, "shugoBonus": 0.0, "DaBonus": 6.5, "TaBonus": 3.0},
    "darkfe":       {"name": "ダークフェンサー",         "favArm1": "sword",  "favArm2": "dagger", "type": "pecu",    "atBonus": 0.0, "kouzinBonus": 0.0, "hpBonus": 0.0, "shugoBonus": 0.0, "DaBonus": 6.5, "TaBonus": 3.0},
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
        "M": [3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 12.5, 13.0, 13.5, 14.0, 14.5],
        "L": [6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 15.6, 16.2, 16.8, 17.4, 18.0],
        "LL": [7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 16.0, 16.8, 17.6, 18.4, 19.2, 20.0],
        "LLM": [8.0, 9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 16.0, 17.0, 18.0, 19.0, 20.0, 21.0, 22.0],
        "LLL": [9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 16.0, 17.0, 18.0, 19.0, 20.0, 21.0, 22.0, 23.0],
    },
    "magna":{
        "S": [1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 10.4, 10.8, 11.2, 11.6, 12.0],
        "M": [3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 12.5, 13.0, 13.5, 14.0, 14.5, 14.8, 15.1, 15.4, 15.7, 16.0],
        "L": [6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 15.6, 16.2, 16.8, 17.4, 18.0, 18.4, 18.8, 19.2, 19.6, 20.0],
    },
    "unknown":{
        "S": [1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 10.4, 10.8, 11.2, 11.6, 12.0],
        "M": [3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 12.5, 13.0, 13.5, 14.0, 14.5],
        "L": [6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 15.6, 16.2, 16.8, 17.4, 18.0],
    },
    "ex":{
        "S": [1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 10.4, 10.8, 11.2, 11.6, 12.0],
        "M": [3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 12.5, 13.0, 13.5, 14.0, 14.5],
        "L": [6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 15.6, 16.2, 16.8, 17.4, 18.0],
        "LL": [9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 16.0, 17.0, 18.0, 19.0, 20.0, 21.0, 22.0, 23.0],
    },
    "exHP":{
        "S": [1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 10.0, 10.0, 10.0, 10.0, 10.0],
        "M": [3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 12.0, 12.0, 12.0, 12.0, 12.0],
        "L": [6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 15.0, 15.0, 15.0, 15.0, 15.0],
        "LL": [6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 15.6, 16.2, 16.8, 17.4, 18.0],
    },
    "exATKandHP":{
        "M": {
            "ATK": [3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 12.5, 13.0, 13.5, 14.0, 14.5],
            "HP": [6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 15.0, 15.0, 15.0, 15.0, 15.0],
        },
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
        // wiki データ
        "HP": [30.0, 30.0, 30.0, 30.0, 30.0, 30.0, 30.0, 30.0, 30.0, 30.0, 30.4, 30.8, 31.2, 31.6, 32.0],
        "DA": [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 7.5, 8.0, 8.5, 9.0, 9.5, 10.0],
        "TA": [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 6.0, 6.4, 6.8, 7.2, 7.6, 8.0],
    },
    "omega": {
        "rawATK": [2.0, 4.0, 6.0, 8.0, 10.0, 12.0, 14.0, 16.0, 18.0, 20.0, 20.0, 20.0, 20.0, 20.0, 20.0],
        "rawHP": [1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 10.0, 10.0, 10.0, 10.0, 10.0],
        "senni": [1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 10.0, 10.0, 10.0, 10.0, 10.0],
        "tousou": [2.0, 4.0, 6.0, 8.0, 10.0, 12.0, 14.0, 16.0, 18.0, 20.0, 20.0, 20.0, 20.0, 20.0, 20.0],
        "seimei": [1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 10.0, 10.0, 10.0, 10.0, 10.0],
        "yuuki": [6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 15.0, 15.0, 15.0, 15.0, 15.0],
    },
    "normalHP":{
        "S": [3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 12.4, 12.8, 13.2, 13.6, 14.0],
        "M": [6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 15.4, 15.8, 16.2, 16.6, 17.0],
        "L": [9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 16.0, 17.0, 18.0, 18.6, 19.2, 19.8, 20.4, 21.0],
        "LL":[10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 16.0, 17.0, 18.0, 19.0, 20.0, 21.0, 22.0, 23.0, 24.0],
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
        "L": [1.0, 1.4, 1.8, 2.2, 2.6, 3.0, 3.4, 3.8, 4.2, 4.6, 5.0, 5.4, 5.8, 6.2, 6.6],
    },
    "exNite":{
        "S": [0.4, 0.6, 0.8, 1.0, 1.2, 1.4, 1.6, 1.8, 2.0, 2.2, 2.4, 2.6, 2.8, 3.0, 3.2],
    },
    "normalSante":{
        "S": [0.4, 0.6, 0.8, 1.0, 1.2, 1.4, 1.6, 1.8, 2.0, 2.2, 2.4, 2.6, 2.8, 3.0, 3.2],
        "L": [1.0, 1.4, 1.8, 2.2, 2.6, 3.0, 3.4, 3.8, 4.2, 4.6, 5.0, 5.4, 5.8, 6.2, 7.0],
    },
    "magnaSante":{
        "L": [1.0, 1.4, 1.8, 2.2, 2.6, 3.0, 3.4, 3.8, 4.2, 4.6, 5.0, 5.4, 5.8, 6.2, 7.0],
    },
    "normalCritical":{
        "S": [1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0, 2.1, 2.2, 2.3, 2.4],
        // "M": [3.0, 3.3, 3.6, 3.9, 4.2, 4.5, 4.8, 5.1, 5.4, 5.7, 6.0, 6.3, 6.7, 7.0, 7.3],
        "M": [3.02, 3.24, 3.46, 3.68, 3.90, 4.12, 4.34, 4.56, 4.78, 5.0, 5.22, 5.44, 5.66, 5.88, 6.10],
        "L": [4.0, 4.4, 4.8, 5.2, 5.6, 6.0, 6.4, 6.8, 7.2, 7.6, 8.0, 8.4, 8.8, 9.2, 9.6],
        "ratio": 0.5,
    },
    // 仮入力
    "magnaCritical":{
        "S": [1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0, 2.2, 2.2, 2.3, 2.4],
        "M": [3.02, 3.24, 3.46, 3.68, 3.90, 4.12, 4.34, 4.56, 4.78, 5.0, 5.22, 5.44, 5.66, 5.88, 6.10],
        "L": [4.0, 4.333, 4.666, 5.0, 5.333, 5.66, 6.0, 6.333, 6.666, 7.0, 7.6, 8.2, 8.8, 9.4, 10.0],
        "ratio": 0.5,
    },
    "normalRanbu": {
        "S": [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.2, 1.4, 1.6, 1.8, 2.0]
    },
    "magnaRanbu": {
        "M": [2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0]
    },
    // 鷲王の結界
    "washiouKekkai":{
        "M": [6.0, 6.5, 7.0, 7.5, 8.0, 8.5, 9.0, 9.5, 10.0, 10.5, 11.0, 11.5, 12.0, 12.5, 13.0],
    },
    "normalDamageLimit": {
        "S": 0.025,
        "M": 0.07,
        "L": 0.1,
    },
    "ougiDamageLimit": {
        "S": 0.025,
        "M": 0.07,
        "L": 0.1,
    },
}

// chara support
var supportAbilities = {
    "none": {"name": "なし", "type": "none", "range": "own", "value": 0},
    "da_up_all_5": {"name": "全体DA率UP5%(ランスロット)", "type": "DABuff", "range": "all", "value": 0.05},
    "ta_up_all_3": {"name": "全体TA率UP3%(ネツァ)", "type": "TABuff", "range": "all", "value": 0.03},
    "ta_up_all_5": {"name": "全体TA率UP5%", "type": "TABuff", "range": "all", "value": 0.05},
    "atk_up_own_5": {"name": "攻撃UP5%(ネツァ,レディグレイ,ハロシャル)", "type": "normalBuff", "range": "own", "value": 0.05},
    "atk_up_all_5": {"name": "全体攻撃UP5%(アニラ,クリス)", "type": "normalBuff", "range": "all", "value": 0.05},
    "atk_up_doraf": {"name": "ドラフと種族不明の攻撃UP(ナルメア)", "type": "normalBuff_doraf", "range": "all", "value": 0.10},
    "atk_up_depends_races": {"name": "バトルメンバーの種族数に応じて攻撃力アップ(リリィ)", "type": "normalBuff_depends_races", "range": "own", "value": 0.10},
    // "atk_up_depends_member": {"name": "バトルメンバーの数に応じて攻撃力アップ(パシ)", "type": "normalBuff_depends_member", "range": "own", "value": 0.05},
    "ougi_gage_up_own_10": {"name": "奥義ゲージ上昇量UP10%(メガネ)", "type": "ougiGageBuff", "range": "own", "value": 0.10},
    "ougi_gage_up_own_20": {"name": "奥義ゲージ上昇量UP20%(アレ爺,シルヴァ,アーミラ)", "type": "ougiGageBuff", "range": "own", "value": 0.20},
    "ougi_gage_up_own_100": {"name": "奥義ゲージ上昇量UP100%(オクトー)", "type": "ougiGageBuff", "range": "own", "value": 1.00},
    "ougi_damage_up_1_5": {"name": "全体の奥義ダメージ1.5倍(シエテ)", "type": "ougiDamageBuff", "range": "all", "value": 0.50},
    "taiyou_sinkou": {"name": "味方全体に背水効果(ザルハメリナ)", "type": "taiyou_sinkou", "range": "all", "value": 0.00},
    "critical_up_own_10_30": {"name": "クリティカル確率UP(ヴァンピィ, ハロカリ) 発動率10%, 倍率30%", "type": "criticalBuff", "range": "own", "value": 0.10, "attackRatio": 0.30},
    "critical_up_all_5_30": {"name": "味方全体のクリティカル確率UP(フェリ) 発動率5%, 倍率30%", "type": "criticalBuff", "range": "all", "value": 0.05, "attackRatio": 0.30},
}

// exports
module.exports.zenith = zenith
module.exports.raceTypes = raceTypes
module.exports.skillAmounts = skillAmounts
module.exports.elementTypes = elementTypes
module.exports.enemyElementTypes = enemyElementTypes
module.exports.filterElementTypes = filterElementTypes
module.exports.summonTypes = summonTypes
module.exports.skilltypes = skilltypes
module.exports.jobTypes = jobTypes
module.exports.armTypes = armTypes
module.exports.summonElementTypes = summonElementTypes
module.exports.keyTypes = keyTypes
module.exports.supportedTurnChartSortkeys = supportedTurnChartSortkeys
module.exports.supportedChartSortkeys = supportedChartSortkeys
module.exports.supportedSimulationChartSortkeys = supportedSimulationChartSortkeys
module.exports.enemyDefenseType = enemyDefenseType
module.exports.supportAbilities = supportAbilities
module.exports.limitBonusCriticalList = limitBonusCriticalList;

module.exports.additionalSelectList = {
    "・属性変更": {
        notationText: "",
        selectKeys: ["elements"],
        selectors: ["elements"],
        defaultKeys: ["light"],
    },
    "・覚醒": {
        notationText: "",
        selectKeys: ["elements"],
        selectors: ["elements"],
        defaultKeys: ["light"],
    },
    "コスモス": {
        notationText: "",
        selectKeys: ["skill2"],
        selectors: ["cosmosSkills"],
        defaultKeys: ["cosmosAT"],
    },
    "絶覇": {
        notationText: "",
        selectKeys: ["main_weapon_change"],
        selectors: ["mainWeapon"],
        defaultKeys: [0],
    },
    "スナップブレード": {
        notationText: "",
        selectKeys: ["main_weapon_switch"],
        selectors: ["mainWeapon"],
        defaultKeys: [0],
    },
    "青竜牙矛": {
        notationText: "",
        selectKeys: ["skill2"],
        selectors: ["sishoSeiryu"],
        defaultKeys: ["non"],
    },
    "朱雀光剣": {
        notationText: "",
        selectKeys: ["skill2"],
        selectors: ["sishoSuzaku"],
        defaultKeys: ["non"],
    },
    "白虎咆拳": {
        notationText: "",
        selectKeys: ["skill2"],
        selectors: ["sishoByakko"],
        defaultKeys: ["non"],
    },
    "玄武甲槌": {
        notationText: "",
        selectKeys: ["skill2"],
        selectors: ["sishoGenbu"],
        defaultKeys: ["non"],
    },
    "無垢なる": {
        notationText: "オメガウェポン注記",
        selectKeys: ["skill1", "elements"],
        selectors: ["omegaWeaponSkill1", "elements"],
        defaultKeys: ["omega-raw", "light"],
    },
    "オメガ": {
        notationText: "オメガウェポン注記",
        selectKeys: ["skill1", "skill2", "elements"],
        selectors: ["omegaWeaponSkill1", "omegaWeaponSkill2", "elements"],
        defaultKeys: ["omega-raw", "non", "light"],
    },
    "ミカエル": { notationText: "天司武器注記", selectKeys: [], selectors: [], },
    "ウリエル": { notationText: "天司武器注記", selectKeys: [], selectors: [], },
    "ガブリエル": { notationText: "天司武器注記", selectKeys: [], selectors: [], },
    "ラファエル": { notationText: "天司武器注記", selectKeys: [], selectors: [], },
}


// オプション用
module.exports.selector = {"ja": {}, "en": {}}
module.exports.selector.ja.races = Object.keys(raceTypes).map(function(opt){return <option value={opt} key={opt}>{raceTypes[opt]}</option>;});
module.exports.selector.en.races = Object.keys(raceTypes).map(function(opt){return <option value={opt} key={opt}>{intl.translate(raceTypes[opt], "en")}</option>;});

module.exports.selector.ja.elements = Object.keys(elementTypes).map(function(opt){return <option value={opt} key={opt}>{elementTypes[opt]}</option>;});
module.exports.selector.en.elements = Object.keys(elementTypes).map(function(opt){return <option value={opt} key={opt}>{intl.translate(elementTypes[opt], "en")}</option>;});

module.exports.selector.ja.enemyElements = Object.keys(enemyElementTypes).map(function(opt){return <option value={opt} key={opt}>{enemyElementTypes[opt]}</option>;});
module.exports.selector.en.enemyElements = Object.keys(enemyElementTypes).map(function(opt){return <option value={opt} key={opt}>{intl.translate(enemyElementTypes[opt], "en")}</option>;});

module.exports.selector.ja.filterelements = Object.keys(filterElementTypes).map(function(opt){return <option value={opt} key={opt}>{filterElementTypes[opt]}</option>;});
module.exports.selector.en.filterelements = Object.keys(filterElementTypes).map(function(opt){return <option value={opt} key={opt}>{intl.translate(filterElementTypes[opt], "en")}</option>;});

module.exports.selector.ja.summons = Object.keys(summonTypes).map(function(opt){return <option value={opt} key={opt}>{summonTypes[opt]}</option>;});
module.exports.selector.en.summons = Object.keys(summonTypes).map(function(opt){return <option value={opt} key={opt}>{intl.translate(summonTypes[opt], "en")}</option>;});

module.exports.selector.ja.skills = Object.keys(skilltypes).map(function(key){ return <option value={key} key={key}>{intl.translate(skilltypes[key].name, "ja")}</option>;})
module.exports.selector.en.skills = Object.keys(skilltypes).map(function(key){ return <option value={key} key={key}>{intl.translate(skilltypes[key].name, "en")}</option>;})

module.exports.selector.ja.cosmosSkills = Object.keys(cosmosSkills).map(function(key){ return <option value={key} key={key}>{cosmosSkills[key].name}</option>;})
module.exports.selector.en.cosmosSkills = Object.keys(cosmosSkills).map(function(key){ return <option value={key} key={key}>{intl.translate(cosmosSkills[key].name, "en")}</option>;})

module.exports.selector.ja.mainWeapon = [<option value={0} key={"no"}>{intl.translate("メイン装備no", "ja")}</option>,<option value={1} key={"yes"}>{intl.translate("メイン装備yes", "ja")}</option>]
module.exports.selector.en.mainWeapon = [<option value={0} key={"no"}>{intl.translate("メイン装備no", "en")}</option>,<option value={1} key={"yes"}>{intl.translate("メイン装備yes", "en")}</option>]

module.exports.selector.ja.sishoSeiryu = Object.keys(sishoSeiryu).map(function(key){ return <option value={key} key={key}>{sishoSeiryu[key].name}</option>;})
module.exports.selector.en.sishoSeiryu = Object.keys(sishoSeiryu).map(function(key){ return <option value={key} key={key}>{intl.translate(sishoSeiryu[key].name, "en")}</option>;})
module.exports.selector.ja.sishoByakko = Object.keys(sishoByakko).map(function(key){ return <option value={key} key={key}>{sishoByakko[key].name}</option>;})
module.exports.selector.en.sishoByakko = Object.keys(sishoByakko).map(function(key){ return <option value={key} key={key}>{intl.translate(sishoByakko[key].name, "en")}</option>;})
module.exports.selector.ja.sishoSuzaku = Object.keys(sishoSuzaku).map(function(key){ return <option value={key} key={key}>{sishoSuzaku[key].name}</option>;})
module.exports.selector.en.sishoSuzaku = Object.keys(sishoSuzaku).map(function(key){ return <option value={key} key={key}>{intl.translate(sishoSuzaku[key].name, "en")}</option>;})
module.exports.selector.ja.sishoGenbu = Object.keys(sishoGenbu).map(function(key){ return <option value={key} key={key}>{sishoGenbu[key].name}</option>;})
module.exports.selector.en.sishoGenbu = Object.keys(sishoGenbu).map(function(key){ return <option value={key} key={key}>{intl.translate(sishoGenbu[key].name, "en")}</option>;})

// オメガウェポンテンプレート用セレクタ
module.exports.selector.ja.omegaWeaponSkill1 = Object.keys(omegaWeaponSkill1).map(function(key){ return <option value={key} key={key}>{intl.translate(omegaWeaponSkill1[key].name, "ja")}</option>;})
module.exports.selector.en.omegaWeaponSkill1 = Object.keys(omegaWeaponSkill1).map(function(key){ return <option value={key} key={key}>{intl.translate(omegaWeaponSkill1[key].name, "en")}</option>;})
module.exports.selector.ja.omegaWeaponSkill2 = Object.keys(omegaWeaponSkill2).map(function(key){ return <option value={key} key={key}>{intl.translate(omegaWeaponSkill2[key].name, "ja")}</option>;})
module.exports.selector.en.omegaWeaponSkill2 = Object.keys(omegaWeaponSkill2).map(function(key){ return <option value={key} key={key}>{intl.translate(omegaWeaponSkill2[key].name, "en")}</option>;})

module.exports.selector.ja.types = Object.keys(jobTypes).map(function(opt){return <option value={opt} key={opt}>{jobTypes[opt]}</option>;});
module.exports.selector.en.types = Object.keys(jobTypes).map(function(opt){return <option value={opt} key={opt}>{intl.translate(jobTypes[opt], "en")}</option>;});

module.exports.selector.ja.armtypes = Object.keys(armTypes).map(function(opt){return <option value={opt} key={opt}>{armTypes[opt]}</option>;});
module.exports.selector.en.armtypes = Object.keys(armTypes).map(function(opt){return <option value={opt} key={opt}>{intl.translate(armTypes[opt], "en")}</option>;});

module.exports.selector.ja.summonElements = Object.keys(summonElementTypes).map(function(opt){return <option value={opt} key={opt}>{summonElementTypes[opt].name}</option>;});
module.exports.selector.en.summonElements = Object.keys(summonElementTypes).map(function(opt){return <option value={opt} key={opt}>{intl.translate(summonElementTypes[opt].name, "en")}</option>;});

module.exports.selector.summonAmounts = summonAmountList.map(function(opt){return <option value={opt} key={opt}>{opt}</option>;});
module.exports.selector.zenithAttack = zenithAttackBonus.map(function(opt){return <option value={opt} key={opt}>{opt}</option>;});
module.exports.selector.zenithHP = zenithHPBonus.map(function(opt){return <option value={opt} key={opt}>{opt}</option>;});
module.exports.selector.zenithPartyHP = zenithPartyHPBonus.map(function(opt){return <option value={opt} key={opt}>{opt}</option>;});
module.exports.selector.slv = skilllevels.map(function(opt){return <option value={opt} key={opt}>{opt}</option>;});
module.exports.selector.consider = considerNum.map(function(opt){return <option value={opt} key={opt}>{opt}</option>;});
module.exports.selector.buffLevel = buffLevelList.map(function(opt){return <option value={opt} key={opt}>{opt}</option>;});
module.exports.selector.ougiRatio = ougiRatioList.map(function(opt){return <option value={opt} key={opt}>{opt}</option>;});
module.exports.selector.hplist = HPList.map(function(opt){return <option value={opt} key={opt}>{opt}</option>;});
module.exports.selector.masteratk = masterATKList.map(function(opt){return <option value={opt} key={opt}>{opt}</option>;});
module.exports.selector.masterhp = masterHPList.map(function(opt){return <option value={opt} key={opt}>{opt}</option>;});
module.exports.selector.chainNumber = chainNumberList.map(function(opt){return <option value={opt} key={opt}>{opt}</option>;});

module.exports.selector.ja.ktypes = Object.keys(keyTypes).map(function(opt){ return <option value={opt} key={opt}>{keyTypes[opt]}</option> });
module.exports.selector.en.ktypes = Object.keys(keyTypes).map(function(opt){ return <option value={opt} key={opt}>{intl.translate(keyTypes[opt], "en")}</option> });

module.exports.selector.plusnum = Object.keys(plusNumList).map(function(opt){ return <option value={plusNumList[opt]} key={opt}>{opt}</option> });
module.exports.selector.levelNoLimit = Object.keys(levelListNoLimit).map(function(opt){ return <option value={levelListNoLimit[opt]} key={opt}>{opt}</option> });
module.exports.selector.levelLimit = Object.keys(levelListLimit).map(function(opt){ return <option value={levelListLimit[opt]} key={opt}>{opt}</option> });
module.exports.selector.skilllevelNoLimit = Object.keys(skillLevelListNoLimit).map(function(opt){ return <option value={skillLevelListNoLimit[opt]} key={opt}>{opt}</option> });
module.exports.selector.skilllevelLimit = Object.keys(skillLevelListLimit).map(function(opt){ return <option value={skillLevelListLimit[opt]} key={opt}>{opt}</option> });

// Limit Bonus Selectors
module.exports.selector.limitBonusAttackList = limitBonusAttackList.map(function(opt){return <option value={opt} key={opt}>{opt}</option>;});
module.exports.selector.limitBonusHPList = limitBonusHPList.map(function(opt){return <option value={opt} key={opt}>{opt}</option>;});
module.exports.selector.limitBonusDAList = limitBonusDAList.map(function(opt){return <option value={opt} key={opt}>{opt}%</option>;});
module.exports.selector.limitBonusTAList = limitBonusTAList.map(function(opt){return <option value={opt} key={opt}>{opt}%</option>;});
module.exports.selector.limitBonusElementList = limitBonusElementList.map(function(opt){return <option value={opt} key={opt}>{opt}%</option>;});
module.exports.selector.limitBonusCriticalList = Object.keys(limitBonusCriticalList).map(function(opt){ return <option value={opt} key={opt}>{limitBonusCriticalList[opt].name}</option> });

module.exports.selector.ja.supported_chartsortkeys = Object.keys(supportedChartSortkeys).map(function(opt){ return <option value={opt} key={opt}>{supportedChartSortkeys[opt]}</option> });
module.exports.selector.en.supported_chartsortkeys = Object.keys(supportedChartSortkeys).map(function(opt){ return <option value={opt} key={opt}>{intl.translate(supportedChartSortkeys[opt], "en")}</option> });

module.exports.selector.ja.supported_simulationchartsortkeys = Object.keys(supportedSimulationChartSortkeys).map(function(opt){ return <option value={opt} key={opt}>{supportedSimulationChartSortkeys[opt]}</option> });
module.exports.selector.en.supported_simulationchartsortkeys = Object.keys(supportedSimulationChartSortkeys).map(function(opt){ return <option value={opt} key={opt}>{intl.translate(supportedSimulationChartSortkeys[opt], "en")}</option> });

module.exports.supportedChartSortkeys = supportedChartSortkeys
module.exports.supportedSimulationChartSortkeys = supportedSimulationChartSortkeys

module.exports.selector.ja.enemydeftypes = Object.keys(enemyDefenseType).map(function(opt){return <option value={opt} key={opt}>{enemyDefenseType[opt].name}</option>;});
module.exports.selector.en.enemydeftypes = Object.keys(enemyDefenseType).map(function(opt){return <option value={opt} key={opt}>{intl.translate(enemyDefenseType[opt].name, "en")}</option>;});

module.exports.selector.supportAbilities = Object.keys(supportAbilities).map(function(opt){return <option value={opt} key={opt}>{supportAbilities[opt].name}</option>;});


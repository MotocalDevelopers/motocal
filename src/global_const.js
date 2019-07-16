var React = require('react');
var {Tooltip, OverlayTrigger} = require('react-bootstrap');
var intl = require('./translate.js');
var PropTypes = require('prop-types');
var CreateClass = require('create-react-class');

module.exports.TextWithTooltip = CreateClass({
    render: function () {
        var tooltip = <Tooltip id={this.props.id}>{this.props.tooltip}</Tooltip>;

        return (
            <OverlayTrigger overlay={tooltip} placement="top" delayShow={300} delayHide={150}>
                {this.props.children}
            </OverlayTrigger>
        );
    },
    propTypes: {
        tooltip: PropTypes.string.isRequired,
    }
});

module.exports.ElementColorLabel = CreateClass({
    render: function () {
        var element = this.props.element;

        if (element == "fire") {
            return <span className="label label-danger" style={{"fontSize": "12pt"}}>{this.props.children}</span>;
        } else if (element == "water") {
            return <span className="label label-primary" style={{"fontSize": "12pt"}}>{this.props.children}</span>;
        } else if (element == "earth") {
            return <span className="label label-warning" style={{"fontSize": "12pt"}}>{this.props.children}</span>;
        } else if (element == "wind") {
            return <span className="label label-success" style={{"fontSize": "12pt"}}>{this.props.children}</span>;
        } else if (element == "light") {
            return <span className="label label-light" style={{"fontSize": "12pt"}}>{this.props.children}</span>;
        } else if (element == "dark") {
            return <span className="label label-dark" style={{"fontSize": "12pt"}}>{this.props.children}</span>;
        } else if (element == "non" || element == "non-but-critical") {
            return <span className="label label-non" style={{"fontSize": "12pt"}}>{this.props.children}</span>;
        }
        return <span className="label label-default" style={{"fontSize": "12pt"}}>{this.props.children}</span>
    },
    propTypes: {
        element: PropTypes.string.isRequired,
    }
});
// Return the label of the color corresponding to the attribute
module.exports.getElementColorLabel = (function (element, locale) {
    if (element == "fire") {
        return <span className="label label-danger">{intl.translate("火", locale)}</span>;
    } else if (element == "water") {
        return <span className="label label-primary">{intl.translate("水", locale)}</span>;
    } else if (element == "earth") {
        return <span className="label label-warning">{intl.translate("土", locale)}</span>;
    } else if (element == "wind") {
        return <span className="label label-success">{intl.translate("風", locale)}</span>;
    } else if (element == "light") {
        return <span className="label label-light">{intl.translate("光", locale)}</span>;
    } else if (element == "dark") {
        return <span className="label label-dark">{intl.translate("闇", locale)}</span>;
    } else if (element == "non") {
        return <span className="label label-non">{intl.translate("無", locale)}</span>;
    } else if (element == "non-but-critical") {
        return <span className="label label-non">{intl.translate("無（技巧あり）", locale)}</span>;
    }
    return <span className="label label-danger">{intl.translate("火", locale)}</span>
});


module.exports._ua = (function (u) {
    return {
        Tablet: (u.indexOf("windows") != -1 && u.indexOf("touch") != -1 && u.indexOf("tablet pc") == -1)
            || u.indexOf("ipad") != -1 || (u.indexOf("android") != -1 && u.indexOf("mobile") == -1)
            || (u.indexOf("firefox") != -1 && u.indexOf("tablet") != -1) || u.indexOf("kindle") != -1
            || u.indexOf("silk") != -1 || u.indexOf("playbook") != -1,
        Mobile: (u.indexOf("windows") != -1 && u.indexOf("phone") != -1) || u.indexOf("iphone") != -1
            || u.indexOf("ipod") != -1 || (u.indexOf("android") != -1 && u.indexOf("mobile") != -1)
            || (u.indexOf("firefox") != -1 && u.indexOf("mobile") != -1) || u.indexOf("blackberry") != -1
    }
})(window.navigator.userAgent.toLowerCase());

const UNLIMIT_VALUE = 99999;
module.exports.LIMIT = {
    normalDA: 50,
    magnaDA: 50,
    exDA: UNLIMIT_VALUE,
    bahaDA: 50,
    cosmosDA: 50,
    otherDA: UNLIMIT_VALUE,
    normalTA: 50,
    magnaTA: 50,
    bahaTA: 50,
    otherTA: UNLIMIT_VALUE,
    chainDamageUP: 1.20,
    chainDamageLimit: 0.50,
};
module.exports.hollowskyNames = [
    "虚空の",
    "Hollowsky"
];
var opusNames = [
    "of Repudiation",
    "絶対否定の",
    "of Renunciation",
    "永遠拒絶の"
];
var zenith = {　//得意武器
    "無し": 0,
    "★1": 0.01,
    "★2": 0.03,
    "★3": 0.05,
    "★4": 0.06,
    "★5": 0.08,
    "★6": 0.10,
    "★7": 0.11,
    "★8": 0.13,
    "★9": 0.15,
    "★10": 0.16,
    "★11": 0.18,
    "★12": 0.20
};

var zenithAttackBonus = [3000, 1500, 500, 0];
var zenithHPBonus = [1000, 600, 300, 0];
var zenithPartyHPBonus = [3000, 2600, 2300, 2000, 1600, 1300, 1000, 600, 300, 0];
var zenithDABonus = {
    "無し": 0,
    "★1": 0.01,
    "★2": 0.03,
    "★3": 0.05,
    "★4": 0.06,
    "★5": 0.08,
    "★6": 0.10
};
var zenithTABonus = {
    "無し": 0,
    "★1": 0.01,
    "★2": 0.03,
    "★3": 0.05
};

//var zenithCriticalBonus = [0, 1, 3, 5, 6, 8, 10];
var zenithOugiDamageBonus = {
    "無し": 0, 
    "★1": 0.01, 
    "★2": 0.03, 
    "★3": 0.05, 
    "★4": 0.06, 
    "★5": 0.08, 
    "★6": 0.10, 
    "★7": 0.11, 
    "★8": 0.13,
    "★9": 0.15
};
var zenithChainDamageBonus = {
    "無し": 0, 
    "★1": 0.01, 
    "★2": 0.03, 
    "★3": 0.05,
    "★4": 0.06, 
    "★5": 0.08, 
    "★6": 0.10
};
var zenithChainDamageLimitBonus = {
    "無し": 0, 
    "★1":  0.01, 
    "★2": 0.03, 
    "★3": 0.05
};
var zenithElementBonus = {
    "無し": 0, 
    "★1": 0.01, 
    "★2": 0.03, 
    "★3": 0.05, 
    "★4": 0.06, 
    "★5": 0.08, 
    "★6": 0.10
};
var zenithDamageLimitBonus = {
    "無し": 0, 
    "★1": 0.03, 
    "★2": 0.06, 
    "★3": 0.10, 
    "★4": 0.11, 
    "★5": 0.13, 
    "★6": 0.15
};


var skilllevels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
var considerNum = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var buffLevelList = [
    0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95,
    100, 105, 110, 115, 120, 125, 130, 135, 140, 145, 150, 155, 160, 165, 170, 175, 180, 185, 190, 195,
    200, 205, 210, 215, 220, 225, 230, 235, 240, 245, 250, 255, 260, 265, 270, 275, 280, 285, 290, 295, 300,
    -5, -10, -15, -20, -25, -30, -35, -40, -45, -50, -55, -60, -65, -70, -75, -80, -85, -90, -95, -100
];
var ougiGageUpOugiBuffLevelList = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95,];
var criticalRateLevelList = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100];
var ougiRatioList = [0.0, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0, 5.5, 6.0, 6.5, 7.0, 7.5, 8.0, 9.5, 10.0, 10.5, 11.0, 11.5, 12.0, 12.5, 13.0, 13.5, 14.0, 14.5, 15.0];
var masterATKList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
var masterHPList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
var masterDAList = [0, 1, 2, 3, 4];
var masterTAList = [0, 1, 2];
var masterDamageLimitList = [0, 1];
var HPList = [
    100, 99, 98, 97, 96, 95, 94, 93, 92, 91, 90, 89, 88, 87, 86, 85, 84, 83, 82, 81,
    80, 79, 78, 77, 76, 75, 74, 73, 72, 71, 70, 69, 68, 67, 66, 65, 64, 63, 62, 61,
    60, 59, 58, 57, 56, 55, 54, 53, 52, 51, 50, 49, 48, 47, 46, 45, 44, 43, 42, 41,
    40, 39, 38, 37, 36, 35, 34, 33, 32, 31, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21,
    20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
var plusNumList = {
    "+0": 0,
    "+99(max)": 99,
    "+1": 1,
    "+2": 2,
    "+3": 3,
    "+4": 4,
    "+5": 5,
    "+6": 6,
    "+7": 7,
    "+8": 8,
    "+9": 9,
    "+10": 10,
    "+11": 11,
    "+12": 12,
    "+13": 13,
    "+14": 14,
    "+15": 15,
    "+16": 16,
    "+17": 17,
    "+18": 18,
    "+19": 19,
    "+20": 20,
    "+21": 21,
    "+22": 22,
    "+23": 23,
    "+24": 24,
    "+25": 25,
    "+26": 26,
    "+27": 27,
    "+28": 28,
    "+29": 29,
    "+30": 30,
    "+31": 31,
    "+32": 32,
    "+33": 33,
    "+34": 34,
    "+35": 35,
    "+36": 36,
    "+37": 37,
    "+38": 38,
    "+39": 39,
    "+40": 40,
    "+41": 41,
    "+42": 42,
    "+43": 43,
    "+44": 44,
    "+45": 45,
    "+46": 46,
    "+47": 47,
    "+48": 48,
    "+49": 49,
    "+50": 50,
    "+51": 51,
    "+52": 52,
    "+53": 53,
    "+54": 54,
    "+55": 55,
    "+56": 56,
    "+57": 57,
    "+58": 58,
    "+59": 59,
    "+60": 60,
    "+61": 61,
    "+62": 62,
    "+63": 63,
    "+64": 64,
    "+65": 65,
    "+66": 66,
    "+67": 67,
    "+68": 68,
    "+69": 69,
    "+70": 70,
    "+71": 71,
    "+72": 72,
    "+73": 73,
    "+74": 74,
    "+75": 75,
    "+76": 76,
    "+77": 77,
    "+78": 78,
    "+79": 79,
    "+80": 80,
    "+81": 81,
    "+82": 82,
    "+83": 83,
    "+84": 84,
    "+85": 85,
    "+86": 86,
    "+87": 87,
    "+88": 88,
    "+89": 89,
    "+90": 90,
    "+91": 91,
    "+92": 92,
    "+93": 93,
    "+94": 94,
    "+95": 95,
    "+96": 96,
    "+97": 97,
    "+98": 98,
    "+99": 99
};

var charaPlusNumList = {
    "+0": 0,
    "+300(max)": 300,
    "+1": 1,
    "+2": 2,
    "+3": 3,
    "+4": 4,
    "+5": 5,
    "+6": 6,
    "+7": 7,
    "+8": 8,
    "+9": 9,
    "+10": 10,
    "+11": 11,
    "+12": 12,
    "+13": 13,
    "+14": 14,
    "+15": 15,
    "+16": 16,
    "+17": 17,
    "+18": 18,
    "+19": 19,
    "+20": 20,
    "+21": 21,
    "+22": 22,
    "+23": 23,
    "+24": 24,
    "+25": 25,
    "+26": 26,
    "+27": 27,
    "+28": 28,
    "+29": 29,
    "+30": 30,
    "+31": 31,
    "+32": 32,
    "+33": 33,
    "+34": 34,
    "+35": 35,
    "+36": 36,
    "+37": 37,
    "+38": 38,
    "+39": 39,
    "+40": 40,
    "+41": 41,
    "+42": 42,
    "+43": 43,
    "+44": 44,
    "+45": 45,
    "+46": 46,
    "+47": 47,
    "+48": 48,
    "+49": 49,
    "+50": 50,
    "+51": 51,
    "+52": 52,
    "+53": 53,
    "+54": 54,
    "+55": 55,
    "+56": 56,
    "+57": 57,
    "+58": 58,
    "+59": 59,
    "+60": 60,
    "+61": 61,
    "+62": 62,
    "+63": 63,
    "+64": 64,
    "+65": 65,
    "+66": 66,
    "+67": 67,
    "+68": 68,
    "+69": 69,
    "+70": 70,
    "+71": 71,
    "+72": 72,
    "+73": 73,
    "+74": 74,
    "+75": 75,
    "+76": 76,
    "+77": 77,
    "+78": 78,
    "+79": 79,
    "+80": 80,
    "+81": 81,
    "+82": 82,
    "+83": 83,
    "+84": 84,
    "+85": 85,
    "+86": 86,
    "+87": 87,
    "+88": 88,
    "+89": 89,
    "+90": 90,
    "+91": 91,
    "+92": 92,
    "+93": 93,
    "+94": 94,
    "+95": 95,
    "+96": 96,
    "+97": 97,
    "+98": 98,
    "+99": 99,
    "+100": 100,
    "+101": 101,
    "+102": 102,
    "+103": 103,
    "+104": 104,
    "+105": 105,
    "+106": 106,
    "+107": 107,
    "+108": 108,
    "+109": 109,
    "+110": 110,
    "+111": 111,
    "+112": 112,
    "+113": 113,
    "+114": 114,
    "+115": 115,
    "+116": 116,
    "+117": 117,
    "+118": 118,
    "+119": 119,
    "+120": 120,
    "+121": 121,
    "+122": 122,
    "+123": 123,
    "+124": 124,
    "+125": 125,
    "+126": 126,
    "+127": 127,
    "+128": 128,
    "+129": 129,
    "+130": 130,
    "+131": 131,
    "+132": 132,
    "+133": 133,
    "+134": 134,
    "+135": 135,
    "+136": 136,
    "+137": 137,
    "+138": 138,
    "+139": 139,
    "+140": 140,
    "+141": 141,
    "+142": 142,
    "+143": 143,
    "+144": 144,
    "+145": 145,
    "+146": 146,
    "+147": 147,
    "+148": 148,
    "+149": 149,
    "+150": 150,
    "+151": 151,
    "+152": 152,
    "+153": 153,
    "+154": 154,
    "+155": 155,
    "+156": 156,
    "+157": 157,
    "+158": 158,
    "+159": 159,
    "+160": 160,
    "+161": 161,
    "+162": 162,
    "+163": 163,
    "+164": 164,
    "+165": 165,
    "+166": 166,
    "+167": 167,
    "+168": 168,
    "+169": 169,
    "+170": 170,
    "+171": 171,
    "+172": 172,
    "+173": 173,
    "+174": 174,
    "+175": 175,
    "+176": 176,
    "+177": 177,
    "+178": 178,
    "+179": 179,
    "+180": 180,
    "+181": 181,
    "+182": 182,
    "+183": 183,
    "+184": 184,
    "+185": 185,
    "+186": 186,
    "+187": 187,
    "+188": 188,
    "+189": 189,
    "+190": 190,
    "+191": 191,
    "+192": 192,
    "+193": 193,
    "+194": 194,
    "+195": 195,
    "+196": 196,
    "+197": 197,
    "+198": 198,
    "+199": 199,
    "+200": 200,
    "+201": 201,
    "+202": 202,
    "+203": 203,
    "+204": 204,
    "+205": 205,
    "+206": 206,
    "+207": 207,
    "+208": 208,
    "+209": 209,
    "+210": 210,
    "+211": 211,
    "+212": 212,
    "+213": 213,
    "+214": 214,
    "+215": 215,
    "+216": 216,
    "+217": 217,
    "+218": 218,
    "+219": 219,
    "+220": 220,
    "+221": 221,
    "+222": 222,
    "+223": 223,
    "+224": 224,
    "+225": 225,
    "+226": 226,
    "+227": 227,
    "+228": 228,
    "+229": 229,
    "+230": 230,
    "+231": 231,
    "+232": 232,
    "+233": 233,
    "+234": 234,
    "+235": 235,
    "+236": 236,
    "+237": 237,
    "+238": 238,
    "+239": 239,
    "+240": 240,
    "+241": 241,
    "+242": 242,
    "+243": 243,
    "+244": 244,
    "+245": 245,
    "+246": 246,
    "+247": 247,
    "+248": 248,
    "+249": 249,
    "+250": 250,
    "+251": 251,
    "+252": 252,
    "+253": 253,
    "+254": 254,
    "+255": 255,
    "+256": 256,
    "+257": 257,
    "+258": 258,
    "+259": 259,
    "+260": 260,
    "+261": 261,
    "+262": 262,
    "+263": 263,
    "+264": 264,
    "+265": 265,
    "+266": 266,
    "+267": 267,
    "+268": 268,
    "+269": 269,
    "+270": 270,
    "+271": 271,
    "+272": 272,
    "+273": 273,
    "+274": 274,
    "+275": 275,
    "+276": 276,
    "+277": 277,
    "+278": 278,
    "+279": 279,
    "+280": 280,
    "+281": 281,
    "+282": 282,
    "+283": 283,
    "+284": 284,
    "+285": 285,
    "+286": 286,
    "+287": 287,
    "+288": 288,
    "+289": 289,
    "+290": 290,
    "+291": 291,
    "+292": 292,
    "+293": 293,
    "+294": 294,
    "+295": 295,
    "+296": 296,
    "+297": 297,
    "+298": 298,
    "+299": 299,
    "+300": 300
};


// Levels Lists
var levelListFactory = function (base_list, max_level) {
    for (var i = 2; i <= max_level; ++i) {
        base_list["Lv. " + i.toString()] = i;
    }
    return base_list;
};

var levelList100Limit = levelListFactory({
    "Lv. 1": 1,
    "0凸 (Lv. 40)": 40,
    "1凸 (Lv. 60)": 60,
    "2凸 (Lv. 80)": 80,
    "3凸 (Lv. 100)": 100
}, 100);
var levelList150Limit = levelListFactory({
    "Lv. 1": 1,
    "0凸 (Lv. 40)": 40,
    "1凸 (Lv. 60)": 60,
    "2凸 (Lv. 80)": 80,
    "3凸 (Lv. 100)": 100,
    "4凸 (Lv. 150)": 150
}, 150);
var levelList200Limit = levelListFactory({
    "Lv. 1": 1,
    "0凸 (Lv. 40)": 40,
    "1凸 (Lv. 60)": 60,
    "2凸 (Lv. 80)": 80,
    "3凸 (Lv. 100)": 100,
    "4凸 (Lv. 150)": 150,
    "5凸 (Lv. 200)": 200
}, 200);

//SR
var SRLevelList75Limit = levelListFactory({
    "Lv. 1": 1,
    "0凸 (Lv. 30)": 30,
    "1凸 (Lv. 45)": 45,
    "2凸 (Lv. 60)": 60,
    "3凸 (Lv. 75)": 75,
}, 75);

var SRLevelList120Limit = levelListFactory({
    "Lv. 1": 1,
    "0凸 (Lv. 30)": 30,
    "1凸 (Lv. 45)": 45,
    "2凸 (Lv. 60)": 60,
    "3凸 (Lv. 75)": 75,
    "4凸 (Lv. 120)": 120,
}, 120);

// Skill Level Lists
var skillLevelListFactory = function (max_level) {
    var base_list = {};
    for (var i = 1; i <= max_level; ++i) {
        base_list["SLv. " + i.toString()] = i;
    }
    return base_list;
};

var skillLevelList10Limit = skillLevelListFactory(10);
var skillLevelList15Limit = skillLevelListFactory(15);
var skillLevelList20Limit = skillLevelListFactory(20);

var summonAmountList = [0, 10, 20, 25, 30, 40, 50, 60, 66, 70, 75, 80, 85, 90, 95, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200, 210, 220, 230, 240, 250, 260, 270, 280, 290, 300];
var chainNumberList = [1, 2, 3, 4];

// Chara limitBonus
var limitBonusAttackList = [0, 500, 800, 1000, 1300, 1500, 1600, 1800, 2000, 2300, 2500, 2600, 2800, 3000];
var limitBonusHPList = [0, 250, 500, 750, 1000, 1250, 1500, 1750, 2000, 2250, 2500, 2750, 3000];
var limitBonusDAList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
var limitBonusTAList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
var limitBonusElementList = [0, 5, 8, 10, 13, 15, 16, 18, 20, 21, 23, 24, 25, 26, 28, 29, 30, 31, 32, 33, 34, 35, 36, 38, 40];
var limitBonusCriticalList = {
    "none": {
        "name": "無し",
        "value": 0.0,
        "attackRatio": 0.0,
    },
    "small": {
        "name": "小",
        "value": 0.12,
        "attackRatio": 0.12,
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
var limitBonusOugiDamageList = [0, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80];
var limitBonusOugiDamageLimitList = [0, 5, 8, 10, 13, 15, 16, 18, 20, 21, 23, 24, 25, 26, 28, 29, 30, 31, 32, 33, 34, 35, 36, 38, 40];
var limitBonusOugiGageBuffList = [0, 5, 8, 10, 13, 15, 16, 18, 20, 21, 23, 24, 25, 26, 28, 29, 30, 31, 32, 33, 34, 35, 36, 38, 40];

/*var limitBonusHaisuiList = {
    "none": "無し",
    "small": "小",
    "medium": "中",
    "large": "大",
    };*/

// Chara EX limitBonus
var EXlimitBonusAttackList = [0, 300, 600, 900, 1200, 1500, 1800, 2100, 2400, 2700, 3000];
var EXlimitBonusHPList = [0, 150, 300, 450, 600, 750, 900, 1050, 1200, 1350, 1500];
var EXlimitBonusOugiDamageList = [0, 10, 12, 14, 16, 18, 20, 22, 24, 27, 30];
var EXlimitBonusOugiDamageLimitList = [0, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
var EXlimitBonusCriticalList = [0, 10, 12, 14, 16, 18, 20, 22, 24, 27, 30];
var EXlimitBonusHaisuiList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var EXlimitBonusKonshinList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var EXlimitBonusDAList = [0, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
var EXlimitBonusTAList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

var enemyDefenseType = {
    10.0: { "name": "敵防御10.0" },
    10.5: { "name": "敵防御10.5" },
    11.0: { "name": "敵防御11.0" },
    12.0: { "name": "敵防御12.0" },
    13.0: { "name": "敵防御13.0" },
    14.0: { "name": "敵防御14.0" },
    15.0: { "name": "敵防御15.0" },
    20.0: { "name": "敵防御20.0" },
}
var keyTypes = {
    "totalAttack": "攻撃力(二手技巧無し,ジータさんのみ)",
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
    "ougiDamageWithChainDamage": "奥義+チェンバダメージ",
    "totalExpected": "総合攻撃*期待回数*技巧期待値(ジータさんのみ)",
    "averageTotalExpected": "総回技のパーティ平均値",
    "expectedCycleDamagePerTurn": "予想ターン毎ダメージ(ジータさんのみ)",
    "averageCyclePerTurn": "予想ターン毎ダメージのパーティ平均値",
//    "averageCyclePerTime": "予想ダメージ経時的な",
};
var supportedChartSortkeys = {
    "totalAttack": "攻撃力(二手技巧無し,ジータさんのみ)",
    "averageAttack": "パーティ平均攻撃力(二手技巧無し)",
    "criticalAttack": "技巧期待値(ジータさんのみ)",
    "averageCriticalAttack": "技巧期待平均攻撃力",
    "totalExpected": "総合攻撃*期待回数*技巧期待値(ジータさんのみ)",
    "averageTotalExpected": "総回技のパーティ平均値",
    "expectedCycleDamagePerTurn": "予想ターン毎ダメージ(ジータさんのみ)",
    "averageCyclePerTurn": "予想ターン毎ダメージのパーティ平均値",
//    "averageCyclePerTime": "予想ダメージ経時的な",
    "totalHP": "ジータさん残りHP",
};
var supportedTurnChartSortkeys = {
    "totalAttack": "攻撃力(二手技巧無し,ジータさんのみ)",
    "averageAttack": "パーティ平均攻撃力(二手技巧無し)",
    "criticalAttack": "技巧期待値(ジータさんのみ)",
    "averageCriticalAttack": "技巧期待平均攻撃力",
    "expectedCycleDamagePerTurn": "予想ターン毎ダメージ(ジータさんのみ)",
    "averageCyclePerTurn": "予想ターン毎ダメージのパーティ平均値",
//    "averageCyclePerTime": "予想ダメージ経時的な",
};
var supportedSimulationChartSortkeys = {
    "averageAttack": "パーティ平均攻撃力(二手技巧無し)",
    "averageTotalExpected": "総回技のパーティ平均値",
    "expectedDamage": "予想ダメージ(ジータさんのみ)",
    "averageExpectedDamage": "予想ダメージのパーティ平均値",
    "summedAverageExpectedDamage": "予想ダメージ平均の積分値",
};

// skill data
var skilltypes = {
    "non": {name: "無し", type: "non", amount: "non"},
    "normalS": {name: "通常攻刃(小)", type: "normal", amount: "S"},
    "normalM": {name: "通常攻刃(中)", type: "normal", amount: "M"},
    "normalL": {name: "通常攻刃(大)", type: "normal", amount: "L"},
    "normalLL": {name: "通常攻刃II", type: "normal", amount: "LL"},
    "normalLLM": {name: "通常攻刃III", type: "normal", amount: "LLM"},
    "normalBoukunL": {name: "通常暴君", type: "normalBoukun", amount: "L"},
    "normalBoukunLLL": {name: "通常暴君II", type: "normalBoukun", amount: "LLL"},
    "normalSoka": {name: "通常楚歌", type: "normalSoka", amount: "M"},
    "normalHaisuiS": {name: "通常背水(小)", type: "normalHaisui", amount: "S"},
    "normalHaisuiM": {name: "通常背水(中)", type: "normalHaisui", amount: "M"},
    "normalHaisuiL": {name: "通常背水(大)", type: "normalHaisui", amount: "L"},
    "normalKonshinS": {name: "通常渾身(小)", type: "normalKonshin", amount: "S"},
    "normalKonshinM": {name: "通常渾身(中)", type: "normalKonshin", amount: "M"},
    "normalKonshinL": {name: "通常渾身(大)", type: "normalKonshin", amount: "L"},
    "normalOtherKonshinL": {name: "通常渾身(大)(神石加護無効)", type: "normalOtherKonshin", amount: "L"},
    "normalNiteS": {name: "通常二手(小)", type: "normalNite", amount: "S"},
    "normalNiteM": {name: "通常二手(中)", type: "normalNite", amount: "M"},
    "normalNiteL": {name: "通常二手(大)", type: "normalNite", amount: "L"},
    "normalSanteS": {name: "通常三手(小)", type: "normalSante", amount: "S"},
    "normalSanteM": {name: "通常三手(中)", type: "normalSante", amount: "M"},
    "normalSanteL": {name: "通常三手(大)", type: "normalSante", amount: "L"},
    "normalKatsumiS": {name: "通常克己(小)", type: "normalKatsumi", amount: "S"},
    "normalKatsumiM": {name: "通常克己(中)", type: "normalKatsumi", amount: "M"},
    "normalKamui": {name: "通常神威(小)", type: "normalKamui", amount: "S"},
    "normalKamuiM": {name: "通常神威(中)", type: "normalKamui", amount: "M"},
    "normalKamuiL": {name: "通常神威(大)", type: "normalKamui", amount: "L"},
    "normalKatsumokuS": {name: "通常括目", type: "normalKatsumoku", amount: "S"},
    "normalRasetsuM": {name: "通常羅刹", type: "normalRasetsu", amount: "M"},
    "normalMusouM": {name: "通常無双(中)", type: "normalMusou", amount: "M"},
    "normalMusouLL": {name: "通常無双II", type: "normalMusou", amount: "LL"},
    "normalJinkaiS": {name: "通常刃界(小)", type: "normalJinkai", amount: "S"},
    "normalRanbuS": {name: "通常乱舞(小)", type: "normalRanbu", amount: "S"},
    "normalCriticalS": {name: "通常技巧(小)", type: "normalCritical", amount: "S"},
    "normalCriticalM": {name: "通常技巧(中)", type: "normalCritical", amount: "M"},
    "normalCriticalL": {name: "通常技巧(大)", type: "normalCritical", amount: "L"},
    "normalSetsunaS": {name: "通常刹那(小)", type: "normalSetsuna", amount: "S"},
    "normalSetsuna": {name: "通常刹那(中)", type: "normalSetsuna", amount: "M"},
    "normalHiouS": {name: "通常秘奥(小)", type: "normalHiou", amount: "S"},
    "normalHiouM": {name: "通常秘奥(中)", type: "normalHiou", amount: "M"},
    "normalHiouL": {name: "通常秘奥(大)", type: "normalHiou", amount: "L"},
    "normalHissatsuM": {name: "通常必殺(中)", type: "normalHissatsu", amount: "M"},
    "normalHissatsuL": {name: "通常必殺(大)", type: "normalHissatsu", amount: "L"},
    "normalEiketsuL": {name: "通常英傑(大)", type: "normalEiketsu", amount: "L"},
    "normalOntyouM": {name: "通常恩寵(中)", type: "normalOntyou", amount: "M"},
    "normalSeisyouM": {name: "通常本質(中)", type: "normalSeisyou", amount: "M"},
    "normalHigoS": {name: "通常庇護(小)", type: "normalHigo", amount: "S"},
    "magnaM": {name: "マグナ攻刃", type: "magna", amount: "M"},
    "magnaL": {name: "マグナ攻刃II", type: "magna", amount: "L"},
    "magnaSoka": {name: "マグナ楚歌", type: "magnaSoka", amount: "M"},
    "magnaHaisuiS": {name: "マグナ背水(小)", type: "magnaHaisui", amount: "S"},
    "magnaHaisuiM": {name: "マグナ背水(中)", type: "magnaHaisui", amount: "M"},
    "magnaHaisuiL": {name: "マグナ背水(大)", type: "magnaHaisui", amount: "L"},
    "magnaKonshinM": {name: "マグナ渾身(中)", type: "magnaKonshin", amount: "M"},
    "magnaKonshinL": {name: "マグナ渾身(大)", type: "magnaKonshin", amount: "L"},
    "magnaHakaiS": {name: "マグナ破壊(小)", type: "magnaHakai", amount: "S"},
    "magnaSanteS": {name: "マグナ三手(小)", type: "magnaSante", amount: "S"},
    "magnaSanteM": {name: "マグナ三手(中)", type: "magnaSante", amount: "M"},
    "magnaSanteL": {name: "マグナ三手(大)", type: "magnaSante", amount: "L"},
    "magnaKatsumiM": {name: "マグナ克己(中)", type: "magnaKatsumi", amount: "M"},
    "magnaKamui": {name: "マグナ神威(小)", type: "magnaKamui", amount: "S"},
    "magnaKamuiM": {name: "マグナ神威(中)", type: "magnaKamui", amount: "M"},
    "magnaKamuiL": {name: "マグナ神威(大)", type: "magnaKamui", amount: "L"},
    "magnaBoukun": {name: "マグナ暴君", type: "magnaBoukun", amount: "L"},
    "magnaKatsumokuS": {name: "マグナ括目", type: "magnaKatsumoku", amount: "S"},
    "magnaRasetsuM": {name: "マグナ羅刹", type: "magnaRasetsu", amount: "M"},
    "magnaMusouM": {name: "マグナ無双(中)", type: "magnaMusou", amount: "M"},
    "magnaRanbuM": {name: "マグナ乱舞(中)", type: "magnaRanbu", amount: "M"},
    "magnaCriticalS": {name: "マグナ技巧(小)", type: "magnaCritical", amount: "S"},
    "magnaCriticalM": {name: "マグナ技巧(中)", type: "magnaCritical", amount: "M"},
    "magnaCriticalL": {name: "マグナ技巧(大)", type: "magnaCritical", amount: "L"},
    "magnaSetsunaS": {name: "マグナ刹那(小)", type: "magnaSetsuna", amount: "S"},
    "magnaSetsuna": {name: "マグナ刹那(中)", type: "magnaSetsuna", amount: "M"},
    "magnaGunshinS": {name: "マグナ軍神(小)", type: "magnaGunshin", amount: "S"},
    "magnaGunshinM": {name: "マグナ軍神(中)", type: "magnaGunshin", amount: "M"},
    "magnaHissatsuM": {name: "マグナ必殺(中)", type: "magnaHissatsu", amount: "M"},
    "magnaKenbuL": {name: "マグナ拳武(大)", type: "magnaKenbu", amount: "L"},
    "magnaJojutsuL": {name: "マグナ杖術(大)", type: "magnaJojutsu", amount: "L"},
    "magnaSeisyouM": {name: "マグナ本質(中)", type: "magnaSeisyou", amount: "M"},
    "unknownM": {name: "アンノウンATK・I", type: "unknown", amount: "M"},
    "unknownL": {name: "アンノウンATK・II", type: "unknown", amount: "L"},
    "strengthHaisuiM": {name: "EX背水(中)", type: "exHaisui", amount: "M"},
    "strengthS": {name: "EX攻刃(小)", type: "ex", amount: "S"},
    "strengthM": {name: "EX攻刃(中)", type: "ex", amount: "M"},
    "strengthL": {name: "EX攻刃(大)", type: "ex", amount: "L"},
    "strengthLL": {name: "EX攻刃(特大)", type: "ex", amount: "LL"},
    "exATKandHPM": {name: "EX攻刃+守護(中)", type: "exATKandHP", amount: "M"},
    "normalDamageLimit2_5": {name: "通常上限UP(2.5%)", type: "normalDamageLimit", amount: "S"},
    "normalDamageLimit7": {name: "通常上限UP(7.0%)", type: "normalDamageLimit", amount: "M"},
    "normalDamageLimit10": {name: "通常上限UP(10%)", type: "normalDamageLimit", amount: "L"},
    "ougiDamageLimit10": {name: "奥義上限UP(10%)", type: "ougiDamageLimit", amount: "L"}, //現在未使用
    "huanglongHissatsu": {name: "黄龍槍 (メイン装備時)", type: "huanglongHissatsu", amount: "non"},
    "cherubimKonshin": {name: "ケルヴィム (メイン装備時)", type: "cherubimKonshin", amount: "non"},
    "sunbladeKonshin": {name: "真・道天浄土 (メイン装備時)", type: "sunbladeKonshin", amount: "non"},
    "ougiDamageLimitExceedM": {name: "奥義上限UP(イクシード)", type: "ougiDamageLimitExceed", amount: "M"},
    "chainForce": {name: "チェインフォース", type: "chainForce", amount: "M"},
    "normalHPS": {name: "通常守護(小)", type: "normalHP", amount: "S"},
    "normalHPM": {name: "通常守護(中)", type: "normalHP", amount: "M"},
    "normalHPL": {name: "通常守護(大)", type: "normalHP", amount: "L"},
    "normalHPLL": {name: "通常守護II", type: "normalHP", amount: "LL"},
    "magnaHPS": {name: "マグナ守護(小)", type: "magnaHP", amount: "S"},
    "magnaHPM": {name: "マグナ守護(中)", type: "magnaHP", amount: "M"},
    "magnaHPL": {name: "マグナ守護(大)", type: "magnaHP", amount: "L"},
    "magnaFukashinS": {name: "マグナ不可侵(小)", type: "magnaFukashin", amount: "S"},
    "unknownHPS": {name: "アンノウン・VIT I(小)", type: "unknownHP", amount: "S"},
    "unknownHPM": {name: "アンノウン・VIT I(中)", type: "unknownHP", amount: "M"},
    "unknownHPL": {name: "アンノウン・VIT II(大)", type: "unknownHP", amount: "L"},
    "unknownOtherBoukunL": {name: "ミフネ流・極意", type: "exBoukun", amount: "L"},
    "unknownOtherNiteS": {name: "ミフネ流・双星", type: "exNite", amount: "S"},
    "rankiShikku": {name: "乱気の疾駆・壱", type: "rankiShikku", amount: "L"},
    "gurenJuin": {name: "紅蓮の呪印・弐", type: "gurenJuin", amount: "L"},
    "chiretsuSenwaku": {name: "地裂の煽惑・参", type: "chiretsuSenwaku", amount: "L"},
    "muhyoTuiga": {name: "霧氷の追牙・肆", type: "muhyoTuiga", amount: "L"},
    "tsuranukiKiba": {name: "貫きの牙", type: "tsuranukiKiba", amount: "M"},
    "tsuranukiKibaMain": {name: "貫きの牙(メイン装備時)", type: "tsuranukiKiba", amount: "M"},
    "washiouKekkai": {name: "鷲王の結界", type: "washiouKekkai", amount: "M"},
    "maihimeEnbu": {name: "舞姫の演武", type: "maihimeEnbu", amount: "M"},
    "hengenKengi": {name: "変幻自在の剣技", type: "maihimeEnbu", amount: "M"},
    "kochoKenbu": {name: "胡蝶の剣舞", type: "normal", amount: "L"},
    "cosmos-sword": {name: "コスモス剣", type: "cosmosArm", amount: "L", cosmosArm: "sword"},
    "cosmos-dagger": {name: "コスモス短剣", type: "cosmosArm", amount: "L", cosmosArm: "dagger"},
    "cosmos-spear": {name: "コスモス槍", type: "cosmosArm", amount: "L", cosmosArm: "spear"},
    "cosmos-axe": {name: "コスモス斧", type: "cosmosArm", amount: "L", cosmosArm: "axe"},
    "cosmos-wand": {name: "コスモス杖", type: "cosmosArm", amount: "L", cosmosArm: "wand"},
    "cosmos-gun": {name: "コスモス銃", type: "cosmosArm", amount: "L", cosmosArm: "gun"},
    "cosmos-fist": {name: "コスモス拳", type: "cosmosArm", amount: "L", cosmosArm: "fist"},
    "cosmos-bow": {name: "コスモス弓", type: "cosmosArm", amount: "L", cosmosArm: "bow"},
    "cosmos-katana": {name: "コスモス刀", type: "cosmosArm", amount: "L", cosmosArm: "katana"},
    "cosmos-music": {name: "コスモス楽器", type: "cosmosArm", amount: "L", cosmosArm: "music"},
    "cosmosAT": {name: "コスモスAT", type: "cosmos", amount: "L"},
    "cosmosDF": {name: "コスモスDF", type: "cosmos", amount: "L"},
    "cosmosBL": {name: "コスモスBL", type: "cosmos", amount: "L"},
    "cosmosPC": {name: "コスモスPC", type: "cosmos", amount: "L"},
    "bahaAT-dagger": {name: "バハ攻-短剣", type: "bahaAT", amount: "L"},
    "bahaAT-axe": {name: "バハ攻-斧", type: "bahaAT", amount: "L"},
    "bahaAT-spear": {name: "バハ攻-槍", type: "bahaAT", amount: "L"},
    "bahaAT-gun": {name: "バハ攻-銃", type: "bahaAT", amount: "L"},
    "bahaATHP-sword": {name: "バハ攻HP-剣", type: "bahaATHP", amount: "M"},
    "bahaATHP-wand": {name: "バハ攻HP-杖", type: "bahaATHP", amount: "M"},
    "bahaHP-fist": {name: "バハHP-格闘", type: "bahaHP", amount: "L"},
    "bahaHP-katana": {name: "バハHP-刀", type: "bahaHP", amount: "L"},
    "bahaHP-bow": {name: "バハHP-弓", type: "bahaHP", amount: "L"},
    "bahaHP-music": {name: "バハHP-楽器", type: "bahaHP", amount: "L"},
    "bahaFUATHP-dagger": {name: "バハフツ-短剣", type: "bahaFUATHP", amount: "LL"},
    "bahaFUATHP-axe": {name: "バハフツ-斧", type: "bahaFUATHP", amount: "LL"},
    "bahaFUATHP-spear": {name: "バハフツ-槍", type: "bahaFUATHP", amount: "LL"},
    "bahaFUATHP-gun": {name: "バハフツ-銃", type: "bahaFUATHP", amount: "LL"},
    "bahaFUATHP-sword": {name: "バハフツ-剣", type: "bahaFUATHP", amount: "LL"},
    "bahaFUATHP-wand": {name: "バハフツ-杖", type: "bahaFUATHP", amount: "LL"},
    "bahaFUHP-fist": {name: "バハフツHP-格闘", type: "bahaFUHP", amount: "L"},
    "bahaFUHP-katana": {name: "バハフツHP-刀", type: "bahaFUHP", amount: "L"},
    "bahaFUHP-bow": {name: "バハフツHP-弓", type: "bahaFUHP", amount: "L"},
    "bahaFUHP-music": {name: "バハフツHP-楽器", type: "bahaFUHP", amount: "L"},
    "sensei": {name: "先制", type: "sensei", amount: "M"},
    "omega-raw": {name: "オメガ-未強化", type: "omega", amount: "raw"},
    "omega-senni": {name: "オメガ-戦意", type: "omega", amount: "senni"},
    "omega-tousou": {name: "オメガ-闘争", type: "omega", amount: "tousou"},
    "omega-seimei": {name: "オメガ-生命", type: "omega", amount: "seimei"},
    "omega-kyousou": {name: "オメガ-強壮", type: "omega", amount: "M"},
    "omega-gekijou": {name: "オメガ-激情", type: "omega", amount: "M"},
    "omega-yuuki": {name: "オメガ-勇気", type: "omega", amount: "yuuki"},
    "gauphKey-alpha": {name: "ガフスキー[α]", type: "gauphKey", amount: "L"},
    // "gauphKey-beta": {name: "ガフスキー[β]", type: "gauphKey", amount: "L"},
    "gauphKey-gamma": {name: "ガフスキー[γ]", type: "gauphKey", amount: "L"},
    "gauphKey-delta": {name: "ガフスキー[Δ]", type: "gauphKey", amount: "L"},
    "akasha-axe": {name: "アーカーシャ-斧", type: "akasha", amount: "fist"},
    "akasha-sword": {name: "アーカーシャ-剣", type: "akasha", amount: "dagger"},
    "akasha-bow": {name: "アーカーシャ-弓", type: "akasha", amount: "gun"},
    "akasha-wand": {name: "アーカーシャ-杖", type: "akasha", amount: "music"},
    "akasha-spear": {name: "アーカーシャ-槍", type: "akasha", amount: "katana"},
    "impervious-covenant": {name: "不壊の誓約", type: "covenant", amount:"impervious"},
    "victorious-covenant": {name: "凱歌の誓約", type: "covenant", amount:"victorious"},
    "contentious-covenant": {name: "修羅の誓約", type: "covenant", amount:"contentious"},
    "deleterious-covenant": {name: "致命の誓約", type: "covenant", amount:"deleterious"},
    "calamitous-covenant": {name: "災禍の誓約", type: "covenant", amount:"calamitous"},
    "opus-alpha": {name: "ペンデュラム[α]", type: "opusKey", amount: "L"},
    //"opus-beta": {name: "ペンデュラム[β]", type: "opusKey", amount: "L"},
    "opus-gamma": {name: "ペンデュラム[γ]", type: "opusKey", amount: "L"},
    "opus-delta": {name: "ペンデュラム[Δ]", type: "opusKey", amount: "L"},
    "opus-normalElement": {name: "通常進境(大)(最大時)", type: "opusnormalElement", amount: "L"},
    "opus-magnaElement": {name: "マグナ進境(大)(最大時)", type: "opusmagnaElement", amount: "L"},
    "tenshiShukufuku": {name: "天司の祝福", type: "tenshiShukufuku", amount: "M"},
    "tenshiShukufukuII": {name: "天司の祝福II", type: "tenshiShukufuku", amount: "L"},
    "tenshiShukufukuIII": {name: "天司の祝福III", type: "tenshiShukufuku", amount: "LL"},
    "extendedDjeetaNormalDATA5": {name: "[ジータのみ] 通常枠DATA 5%", type: "extendedDjeetaNormalDATA", amount: 5.0},
    "extendedDjeetaNormalDATA10": {name: "[ジータのみ] 通常枠DATA 10%", type: "extendedDjeetaNormalDATA", amount: 10.0},
    "extendedDjeetaNormalDATA15": {name: "[ジータのみ] 通常枠DATA 15%", type: "extendedDjeetaNormalDATA", amount: 15.0},
    "extendedDjeetaNormalDATA20": {name: "[ジータのみ] 通常枠DATA 20%", type: "extendedDjeetaNormalDATA", amount: 20.0},
    "extendedDjeetaNormalDATA25": {name: "[ジータのみ] 通常枠DATA 25%", type: "extendedDjeetaNormalDATA", amount: 25.0},
    "extendedDjeetaNormalDATA30": {name: "[ジータのみ] 通常枠DATA 30%", type: "extendedDjeetaNormalDATA", amount: 30.0},
};

var cosmosSkills = {
    "cosmosAT": {name: "コスモスAT", type: "cosmos", amount: "L"},
    "cosmosDF": {name: "コスモスDF", type: "cosmos", amount: "L"},
    "cosmosBL": {name: "コスモスBL", type: "cosmos", amount: "L"},
    "cosmosPC": {name: "コスモスPC", type: "cosmos", amount: "L"},
    "non": {name: "無し", type: "non", amount: "non"},
};

// additional selection when template is selected
module.exports.skillDetails = {
    'victorious-covenant': 'victorious_calamitous_covenant',
    'calamitous-covenant': 'victorious_calamitous_covenant'
};

var skillDetailsDescription = {
    'victorious-covenant': 'ジータバフの数',
    'calamitous-covenant': '敵の弱体効果'  
};

var victorious_calamitous_covenant = {
    "0": 0,
    "1": 1,
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10
};

var sishoSeiryu = {
    "non": {name: "無し", type: "non", amount: "non"},
    "normalCriticalM": {name: "王道: 竜巻の技巧"},
    "normalDamageLimit7": {name: "邪道: 通常上限UP(7.0%)"},
};
var sishoSuzaku = {
    "non": {name: "無し", type: "non", amount: "non"},
    "normalHPS": {name: "王道: 火の守護"},
    "normalDamageLimit7": {name: "邪道: 通常上限UP(7.0%)"},
};
var sishoByakko = {
    "non": {name: "無し", type: "non", amount: "non"},
    "normalCriticalM": {name: "王道: 大地の技巧"},
    "normalDamageLimit7": {name: "邪道: 通常上限UP(7.0%)"},
};
var sishoGenbu = {
    "non": {name: "無し", type: "non", amount: "non"},
    "normalNiteS": {name: "王道: 水の二手"},
    "normalDamageLimit7": {name: "邪道: 通常上限UP(7.0%)"},
};

var omegaWeaponSkill1 = {
    "omega-raw": {name: "オメガ-未強化"},
    "omega-senni": {name: "オメガ-戦意"},
    "omega-tousou": {name: "オメガ-闘争"},
    "omega-seimei": {name: "オメガ-生命"},
    "omega-gekijou": {name: "オメガ-激情"},
    "omega-kyousou": {name: "オメガ-強壮"},
    "omega-yuuki": {name: "オメガ-勇気"},
};

var omegaWeaponSkill2 = {
    "non": {name: "無し"},
    "gauphKey-alpha": {name: "ガフスキー[α]"},
    "gauphKey-gamma": {name: "ガフスキー[γ]"},
    "gauphKey-delta": {name: "ガフスキー[Δ]"},
};

var opusWeaponSkill1 = {
    "non": {name: "無し"},
    "opus-alpha": {name: "ペンデュラム[α]"},
    "opus-gamma": {name: "ペンデュラム[γ]"},
    "opus-delta": {name: "ペンデュラム[Δ]"},
};

var opusNormalWeaponSkill2 = {
    "non": {name: "無し"},
    "normalKonshinL": {name: "通常渾身(大)"},
    "normalHaisuiL": {name: "通常背水(大)"},
    "normalSanteM": {name: "通常三手(中)"},
    "opus-normalElement": {name: "通常進境(大)(最大時)"},
};

var opusMagnaWeaponSkill2 = {
    "non": {name: "無し"},
    "magnaKonshinL": {name: "マグナ渾身(大)"},
    "magnaHaisuiL": {name: "マグナ背水(大)"},
    "magnaSanteM": {name: "マグナ三手(中)"},
    "opus-magnaElement": {name: "マグナ進境(大)(最大時)"},
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
};

var raceTypes = {
    "human": "人間",
    "erune": "エルーン",
    "doraf": "ドラフ",
    "havin": "ハーヴィン",
    "seisho": "星晶獣",
    "unknown": "種族不明",
};

var sexTypes = {
    "female": "女",
    "male": "男",
    "other": "不詳"
};

var jobTypes = {
    "attack": "攻撃",
    "heal": "回復",
    "defense": "防御",
    "pecu": "特殊",
    "balance": "バランス",
};

var elementTypes = {
    "fire": "火",
    "wind": "風",
    "earth": "土",
    "water": "水",
    "light": "光",
    "dark": "闇",
};

var enemyElementTypes = {
    "fire": "火",
    "wind": "風",
    "earth": "土",
    "water": "水",
    "light": "光",
    "dark": "闇",
    "non": "無",
    "non-but-critical": "無（技巧あり）",
};

var filterElementTypes = {
    "all": "全属性",
    "fire": "火",
    "wind": "風",
    "earth": "土",
    "water": "水",
    "light": "光",
    "dark": "闇",
};

// strong and weak elements for each element
module.exports.elementRelation = {
    "fire": {"weak": "water", "strong": "wind"},
    "wind": {"weak": "fire", "strong": "earth"},
    "earth": {"weak": "wind", "strong": "water"},
    "water": {"weak": "earth", "strong": "fire"},
    "light": {"weak": "none", "strong": "dark"},
    "dark": {"weak": "none", "strong": "light"},
};

// Bahamut weapons
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
};

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
};

// Classes
module.exports.Jobs = {
    "beruse": {
        "name": "ベルセルク",
        "favArm1": "sword",
        "favArm2": "axe",
        "type": "attack",
        "atBonus": 6000.0,
        "kouzinBonus": 0.0,
        "hpBonus": 1000.0,
        "shugoBonus": 10.0,
        "DaBonus": 25.0,
        "TaBonus": 5.0
    },
    "suparuta": {
        "name": "スパルタ",
        "favArm1": "sword",
        "favArm2": "spear",
        "type": "defense",
        "atBonus": 0.0,
        "kouzinBonus": 0.0,
        "hpBonus": 1500.0,
        "shugoBonus": 0.0,
        "DaBonus": 7.0,
        "TaBonus": 3.0
    },
    "sage": {
        "name": "セージ",
        "favArm1": "wand",
        "favArm2": "spear",
        "type": "heal",
        "atBonus": 0.0,
        "kouzinBonus": 0.0,
        "hpBonus": 0.0,
        "shugoBonus": 0.0,
        "DaBonus": 4.0,
        "TaBonus": 1.0
    },
    "warlock": {
        "name": "ウォーロック",
        "favArm1": "wand",
        "favArm2": "dagger",
        "type": "attack",
        "atBonus": 2000.0,
        "kouzinBonus": 0.0,
        "hpBonus": 0.0,
        "shugoBonus": 0.0,
        "DaBonus": 7.0,
        "TaBonus": 3.0
    },
    "gizoku": {
        "name": "義賊",
        "favArm1": "dagger",
        "favArm2": "gun",
        "type": "balance",
        "atBonus": 0.0,
        "kouzinBonus": 0.0,
        "hpBonus": 0.0,
        "shugoBonus": 0.0,
        "DaBonus": 10.0,
        "TaBonus": 10.0
    },
    "chaos": {
        "name": "カオスルーダー",
        "favArm1": "sword",
        "favArm2": "dagger",
        "type": "pecu",
        "atBonus": 0.0,
        "kouzinBonus": 0.0,
        "hpBonus": 0.0,
        "shugoBonus": 0.0,
        "DaBonus": 7.0,
        "TaBonus": 3.0
    },
    "wrestler": {
        "name": "レスラー",
        "favArm1": "fist",
        "favArm2": "fist",
        "type": "attack",
        "atBonus": 2000.0,
        "kouzinBonus": 0.0,
        "hpBonus": 300.0,
        "shugoBonus": 0.0,
        "DaBonus": 70.0,
        "TaBonus": 20.0
    },
    "hounddog": {
        "name": "ハウンドドッグ",
        "favArm1": "bow",
        "favArm2": "gun",
        "type": "balance",
        "atBonus": 1800.0,
        "kouzinBonus": 0.0,
        "hpBonus": 0.0,
        "shugoBonus": 0.0,
        "DaBonus": 4.0,
        "TaBonus": 1.0
    },
    "elysian": {
        "name": "エリュシオン",
        "favArm1": "music",
        "favArm2": "dagger",
        "type": "pecu",
        "atBonus": 0.0,
        "kouzinBonus": 0.0,
        "hpBonus": 0.0,
        "shugoBonus": 0.0,
        "DaBonus": 7.0,
        "TaBonus": 3.0
    },
    "apsaras_spear": {
        "name": "アプサラス(槍)",
        "favArm1": "spear",
        "favArm2": "axe",
        "type": "attack",
        "atBonus": 2000.0,
        "kouzinBonus": 0.0,
        "hpBonus": 0.0,
        "shugoBonus": 0.0,
        "DaBonus": 30.0,
        "TaBonus": 20.0
    },
    "apsaras_axe": {
        "name": "アプサラス(斧)",
        "favArm1": "spear",
        "favArm2": "axe",
        "type": "attack",
        "atBonus": 2000.0,
        "kouzinBonus": 0.0,
        "hpBonus": 0.0,
        "shugoBonus": 0.0,
        "DaBonus": 20.0,
        "TaBonus": 15.0
    },
    "chrysaor": {
        "name": "クリュサオル",
        "favArm1": "sword",
        "favArm2": "katana",
        "type": "attack",
        "atBonus": 2000.0,
        "kouzinBonus": 0.0,
        "hpBonus": 600.0,
        "shugoBonus": 0.0,
        "DaBonus": 37.0,
        "TaBonus": 3.0
    },
    "chrysaor_dual": {
        "name": "クリュサオル(二刀)",
        "favArm1": "sword",
        "favArm2": "katana",
        "type": "attack",
        "atBonus": 2000.0,
        "kouzinBonus": 20.0,
        "hpBonus": 600.0,
        "shugoBonus": 0.0,
        "DaBonus": 57.0,
        "TaBonus": 3.0
    },
    "rune": {
        "name": "魔法戦士",
        "favArm1": "katana",
        "favArm2": "fist",
        "type": "pecu",
        "atBonus": 0.0,
        "kouzinBonus": 0.0,
        "hpBonus": 0.0,
        "shugoBonus": 0.0,
        "DaBonus": 28.0,
        "TaBonus": 11.0
    },
    "docco": {
        "name": "ドクター",
        "favArm1": "dagger",
        "favArm2": "gun",
        "type": "heal",
        "atBonus": 0.0,
        "kouzinBonus": 0.0,
        "hpBonus": 2000.0,
        "shugoBonus": 0.0,
        "DaBonus": 4.0,
        "TaBonus": 1.0
    },
    "kengo": {
        "name": "剣豪",
        "favArm1": "katana",
        "favArm2": "bow",
        "type": "attack",
        "atBonus": 3000.0,
        "kouzinBonus": 0.0,
        "hpBonus": 1000.0,
        "shugoBonus": 0.0,
        "DaBonus": 4.0,
        "TaBonus": 1.0
    },
    "glory": {
        "name": "ザ・グローリー",
        "favArm1": "sword",
        "favArm2": "katana",
        "type": "pecu",
        "atBonus": 3000.0,
        "kouzinBonus": 0.0,
        "hpBonus": 1000.0,
        "shugoBonus": 0.0,
        "DaBonus": 10.0,
        "TaBonus": 5.0
    },
    "rambo": {
        "name": "ソルジャー",
        "favArm1": "gun",
        "favArm2": "gun",
        "type": "pecu",
        "atBonus": 2000.0,
        "kouzinBonus": 0.0,
        "hpBonus": 0.0,
        "shugoBonus": 0.0,
        "DaBonus": 10.0,
        "TaBonus": 15.0
    },
    "neko": {
        "name": "黒猫道士",
        "favArm1": "wand",
        "favArm2": "wand",
        "type": "pecu",
        "atBonus": 0.0,
        "kouzinBonus": 0.0,
        "hpBonus": 3000.0,
        "shugoBonus": 0.0,
        "DaBonus": 9.0,
        "TaBonus": 6.0
    },
    "alche": {
        "name": "アルケミスト",
        "favArm1": "dagger",
        "favArm2": "gun",
        "type": "heal",
        "atBonus": 0.0,
        "kouzinBonus": 0.0,
        "hpBonus": 100.0,
        "shugoBonus": 0.0,
        "DaBonus": 4.0,
        "TaBonus": 1.0
    },
    "ninja": {
        "name": "忍者",
        "favArm1": "katana",
        "favArm2": "fist",
        "type": "pecu",
        "atBonus": 0.0,
        "kouzinBonus": 0.0,
        "hpBonus": 0.0,
        "shugoBonus": 0.0,
        "DaBonus": 29.0,
        "TaBonus": 1.0
    },
    "samurai": {
        "name": "侍",
        "favArm1": "katana",
        "favArm2": "bow",
        "type": "attack",
        "atBonus": 3000.0,
        "kouzinBonus": 0.0,
        "hpBonus": 0.0,
        "shugoBonus": 0.0,
        "DaBonus": 4.0,
        "TaBonus": 1.0
    },
    "kensei": {
        "name": "剣聖",
        "favArm1": "sword",
        "favArm2": "katana",
        "type": "pecu",
        "atBonus": 1500.0,
        "kouzinBonus": 0.0,
        "hpBonus": 300.0,
        "shugoBonus": 0.0,
        "DaBonus": 10.0,
        "TaBonus": 5.0
    },
    "gunsri": {
        "name": "ガンスリンガー",
        "favArm1": "gun",
        "favArm2": "gun",
        "type": "pecu",
        "atBonus": 1000.0,
        "kouzinBonus": 0.0,
        "hpBonus": 0.0,
        "shugoBonus": 0.0,
        "DaBonus": 15.0,
        "TaBonus": 5.0
    },
    "kenja": {
        "name": "賢者",
        "favArm1": "wand",
        "favArm2": "wand",
        "type": "pecu",
        "atBonus": 0.0,
        "kouzinBonus": 0.0,
        "hpBonus": 1000.0,
        "shugoBonus": 0.0,
        "DaBonus": 4.0,
        "TaBonus": 1.0
    },
    "assassin": {
        "name": "アサシン",
        "favArm1": "dagger",
        "favArm2": "dagger",
        "type": "pecu",
        "atBonus": 1000.0,
        "kouzinBonus": 0.0,
        "hpBonus": 0.0,
        "shugoBonus": 0.0,
        "DaBonus": 10.0,
        "TaBonus": 5.0
    },
    "drummaster": {
        "name": "ドラムマスター",
        "favArm1": "music",
        "favArm2": "music",
        "type": "pecu",
        "atBonus": 1000.0,
        "kouzinBonus": 0.0,
        "hpBonus": 0.0,
        "shugoBonus": 0.0,
        "DaBonus": 90.0,
        "TaBonus": 90.0
    },
    "dancer": {
        "name": "ダンサー",
        "favArm1": "dagger",
        "favArm2": "dagger",
        "type": "pecu",
        "atBonus": 900.0,
        "kouzinBonus": 0.0,
        "hpBonus": 0.0,
        "shugoBonus": 0.0,
        "DaBonus": 8.0,
        "TaBonus": 1.0
    },
    "mechanic": {
        "name": "メカニック",
        "favArm1": "gun",
        "favArm2": "gun",
        "type": "pecu",
        "atBonus": 1000.0,
        "kouzinBonus": 0.0,
        "hpBonus": 0.0,
        "shugoBonus": 0.0,
        "DaBonus": 7.0,
        "TaBonus": 3.0
    },
    "weaponmaster": {
        "name": "ウェポンマスター",
        "favArm1": "sword",
        "favArm2": "axe",
        "type": "attack",
        "atBonus": 0.0,
        "kouzinBonus": 0.0,
        "hpBonus": 0.0,
        "shugoBonus": 5.0,
        "DaBonus": 23.0,
        "TaBonus": 5.0
    },
    "holyse": {
        "name": "ホーリーセイバー",
        "favArm1": "sword",
        "favArm2": "spear",
        "type": "defense",
        "atBonus": 0.0,
        "kouzinBonus": 0.0,
        "hpBonus": 0.0,
        "shugoBonus": 0.0,
        "DaBonus": 7.0,
        "TaBonus": 3.0
    },
    "bishop": {
        "name": "ビショップ",
        "favArm1": "wand",
        "favArm2": "spear",
        "type": "heal",
        "atBonus": 0.0,
        "kouzinBonus": 0.0,
        "hpBonus": 0.0,
        "shugoBonus": 0.0,
        "DaBonus": 4.0,
        "TaBonus": 1.0
    },
    "hermit": {
        "name": "ハーミット",
        "favArm1": "wand",
        "favArm2": "dagger",
        "type": "attack",
        "atBonus": 0.0,
        "kouzinBonus": 0.0,
        "hpBonus": 0.0,
        "shugoBonus": 0.0,
        "DaBonus": 7.0,
        "TaBonus": 3.0
    },
    "hokuai": {
        "name": "ホークアイ",
        "favArm1": "dagger",
        "favArm2": "gun",
        "type": "balance",
        "atBonus": 0.0,
        "kouzinBonus": 0.0,
        "hpBonus": 0.0,
        "shugoBonus": 0.0,
        "DaBonus": 10.0,
        "TaBonus": 10.0
    },
    "darkfe": {
        "name": "ダークフェンサー",
        "favArm1": "sword",
        "favArm2": "dagger",
        "type": "pecu",
        "atBonus": 0.0,
        "kouzinBonus": 0.0,
        "hpBonus": 0.0,
        "shugoBonus": 0.0,
        "DaBonus": 7.0,
        "TaBonus": 3.0
    },
    "oga": {
        "name": "オーガ",
        "favArm1": "fist",
        "favArm2": "fist",
        "type": "attack",
        "atBonus": 2000.0,
        "kouzinBonus": 5.0,
        "hpBonus": 200.0,
        "shugoBonus": 0.0,
        "DaBonus": 60.0,
        "TaBonus": 5.0
    },
    "side": {
        "name": "サイドワインダー",
        "favArm1": "bow",
        "favArm2": "gun",
        "type": "balance",
        "atBonus": 1000.0,
        "kouzinBonus": 0.0,
        "hpBonus": 0.0,
        "shugoBonus": 0.0,
        "DaBonus": 7.0,
        "TaBonus": 3.0
    },
    "superstar": {
        "name": "スーパースター",
        "favArm1": "music",
        "favArm2": "dagger",
        "type": "pecu",
        "atBonus": 0.0,
        "kouzinBonus": 0.0,
        "hpBonus": 0.0,
        "shugoBonus": 0.0,
        "DaBonus": 4.0,
        "TaBonus": 1.0
    },
    "valc": {
        "name": "ヴァルキュリア",
        "favArm1": "spear",
        "favArm2": "axe",
        "type": "attack",
        "atBonus": 500.0,
        "kouzinBonus": 0.0,
        "hpBonus": 0.0,
        "shugoBonus": 0.0,
        "DaBonus": 15.0,
        "TaBonus": 10.0
    },
    "gladiator": {
        "name": "グラディエーター",
        "favArm1": "sword",
        "favArm2": "katana",
        "type": "attack",
        "atBonus": 2000.0,
        "kouzinBonus": 0.0,
        "hpBonus": 0.0,
        "shugoBonus": 0.0,
        "DaBonus": 22.0,
        "TaBonus": 3.0
    },
    "none": {
        "name": "なし",
        "favArm1": "none",
        "favArm2": "none",
        "type": "none",
        "atBonus": 0.0,
        "kouzinBonus": 0.0,
        "hpBonus": 0.0,
        "shugoBonus": 0.0,
        "DaBonus": 7.0,
        "TaBonus": 3.0
    },
};

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
};

// Skills
var skillAmounts = {
    "normal": {
        "S": [1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 10.4, 10.8, 11.2, 11.6, 12.0, 12.2, 12.4, 12.6, 12.8, 13.0],
        "M": [3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 12.5, 13.0, 13.5, 14.0, 14.5, 14.8, 15.1, 15.4, 15.7, 16.0],
        "L": [6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 15.6, 16.2, 16.8, 17.4, 18.0, 18.4, 18.8, 19.2, 19.6, 20.0],
        //Normal Attack Up II(通常攻刃II)
        "LL": [7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 16.0, 16.8, 17.6, 18.4, 19.2, 20.0, 20.4, 20.8, 21.2, 21.6, 22.0],
        //Normal Attack Up III(通常攻刃III)
        "LLM": [8.0, 9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 16.0, 17.0, 18.0, 19.0, 20.0, 21.0, 22.0, 22.5, 23.0, 23.5, 24.0, 24.5],
        //Tyranny II(暴君II)
        "LLL": [9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 16.0, 17.0, 18.0, 19.0, 20.0, 21.0, 22.0, 23.0, 23.5, 24.0, 24.5, 25.0, 25.5],
    },
    "magna": {
        "S": [1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 10.4, 10.8, 11.2, 11.6, 12.0, 12.1, 12.2, 12.3, 12.4, 12.5],
        "M": [3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 12.5, 13.0, 13.5, 14.0, 14.5, 14.8, 15.1, 15.4, 15.7, 16.0],
        "L": [6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 15.6, 16.2, 16.8, 17.4, 18.0, 18.4, 18.8, 19.2, 19.6, 20.0],
    },
    "ex": {
        "S": [1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 10.4, 10.8, 11.2, 11.6, 12.0, 12.6, 13.2, 13.8, 14.4, 15.0],
        "M": [3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 12.5, 13.0, 13.5, 14.0, 14.5, 15.0, 15.5, 16.0, 16.5, 17.0],
        "L": [6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 15.6, 16.2, 16.8, 17.4, 18.0, 18.6, 19.2, 19.8, 20.4, 21.0],
        "LL": [9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 16.0, 17.0, 18.0, 19.0, 20.0, 21.0, 22.0, 23.0, 24.0, 25.0, 26.0, 27.0, 28.0],
    },
    "normalHP": {
        "S": [3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 12.4, 12.8, 13.2, 13.6, 14.0, 14.0, 14.0, 14.0, 14.0, 14.0],
        "M": [6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 15.4, 15.8, 16.2, 16.6, 17.0, 17.0, 17.0, 17.0, 17.0, 17.0],
        "L": [9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 16.0, 17.0, 18.0, 18.6, 19.2, 19.8, 20.4, 21.0, 21.0, 21.0, 21.0, 21.0, 21.0],
        "LL": [10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 16.0, 17.0, 18.0, 19.0, 20.0, 21.0, 22.0, 23.0, 24.0, 24.0, 24.0, 24.0, 24.0, 24.0],
    },
    "magnaHP": {
        "S": [1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 10.4, 10.8, 11.2, 11.6, 12.0, 12.2, 12.4, 12.6, 12.8, 13.0],
        "M": [3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 12.5, 13.0, 13.5, 14.0, 14.5, 14.8, 15.1, 15.4, 15.7, 16.0],
        "L": [6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 15.6, 16.2, 16.8, 17.4, 18.0, 18.4, 18.8, 19.2, 19.6, 20.0],
    },
    "exHP": {
        "S": [1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 10.4, 10.8, 11.2, 11.6, 12.0, 12.6, 13.2, 13.8, 14.4, 15.0],
        "M": [3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 12.5, 13.0, 13.5, 14.0, 14.5, 15.0, 15.5, 16.0, 16.5, 17.0],
        "L": [6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 15.6, 16.2, 16.8, 17.4, 18.0, 18.6, 19.2, 19.8, 20.4, 21.0],
    },
    "bahaAT": {
        // Daggers etc.
        "M": [10.0, 10.5, 11.0, 11.5, 12.0, 12.5, 13.0, 13.5, 14.0, 15.0, 30.4, 30.8, 31.2, 31.6, 32.0, 32.0, 32.0, 32.0, 32.0, 32.0],
        "L": [20.0, 21.0, 22.0, 23.0, 24.0, 25.0, 26.0, 27.0, 28.0, 30.0, 30.4, 30.8, 31.2, 31.6, 32.0, 32.0, 32.0, 32.0, 32.0, 32.0],
    },
    "bahaHP": {
        // Sword etc.
        "M": [10.0, 10.5, 11.0, 11.5, 12.0, 12.5, 13.0, 13.5, 14.0, 15.0, 15.6, 16.2, 16.8, 17.4, 18.0, 18.0, 18.0, 18.0, 18.0, 18.0],
        "L": [20.0, 21.0, 22.0, 23.0, 24.0, 25.0, 26.0, 27.0, 28.0, 30.0, 30.4, 30.8, 31.2, 31.6, 32.0, 32.0, 32.0, 32.0, 32.0, 32.0],
    },
    "bahaFUATHP": {
        // Dagger, sword etc.
        "HP": [15.0, 15.0, 15.0, 15.0, 15.0, 15.0, 15.0, 15.0, 15.0, 15.0, 15.6, 16.2, 16.8, 17.4, 18.0, 18.0, 18.0, 18.0, 18.0, 18.0],
        "AT": [30.0, 30.0, 30.0, 30.0, 30.0, 30.0, 30.0, 30.0, 30.0, 30.0, 30.4, 30.8, 31.2, 31.6, 32.0, 32.0, 32.0, 32.0, 32.0, 32.0],
    },
    "bahaFUHP": {
        // Fist etc
        "HP": [30.0, 30.0, 30.0, 30.0, 30.0, 30.0, 30.0, 30.0, 30.0, 30.0, 30.4, 30.8, 31.2, 31.6, 32.0, 32.0, 32.0, 32.0, 32.0, 32.0],
        "DA": [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 5.0, 5.6, 6.2, 6.8, 7.4, 8.0, 8.0, 8.0, 8.0, 8.0, 8.0],
        "TA": [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 5.0, 5.4, 5.8, 6.2, 6.6, 7.0, 7.0, 7.0, 7.0, 7.0, 7.0],
    },
    "omega": {
        "rawATK": [2.0, 4.0, 6.0, 8.0, 10.0, 12.0, 14.0, 16.0, 18.0, 20.0, 20.0, 20.0, 20.0, 20.0, 20.0, 20.0, 20.0, 20.0, 20.0, 20.0],
        "rawHP": [1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 10.0, 10.0, 10.0, 10.0, 10.0, 10.0, 10.0, 10.0, 10.0, 10.0],
        "senni": [1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 10.0, 10.0, 10.0, 10.0, 10.0, 10.0, 10.0, 10.0, 10.0, 10.0],
        "tousou": [2.0, 4.0, 6.0, 8.0, 10.0, 12.0, 14.0, 16.0, 18.0, 20.0, 20.0, 20.0, 20.0, 20.0, 20.0, 20.0, 20.0, 20.0, 20.0, 20.0],
        "seimei": [1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 10.0, 10.0, 10.0, 10.0, 10.0, 10.0, 10.0, 10.0, 10.0, 10.0],
        "yuuki": [6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 15.0, 15.0, 15.0, 15.0, 15.0, 15.0, 15.0, 15.0, 15.0, 15.0],
    },
    "multiAttack": {
        "S": [0.4, 0.6, 0.8, 1.0, 1.2, 1.4, 1.6, 1.8, 2.0, 2.2, 2.46, 2.72, 2.98, 3.24, 3.5, 3.66, 3.82, 3.98, 4.14, 4.3],
        "M": [0.8, 1.1, 1.4, 1.7, 2.0, 2.3, 2.6, 2.9, 3.2, 3.5, 3.8, 4.1, 4.4, 4.7, 5.0, 5.2, 5.4, 5.6, 5.8, 6.0],
        "L": [1.2, 1.6, 2.0, 2.4, 2.8, 3.2, 3.6, 4.0, 4.4, 5.0, 5.4, 5.8, 6.2, 6.6, 7.0, 7.3, 7.6, 7.9, 8.2, 8.5],
        // used by Mirror-Blade Shard(刃鏡片)
        "LL": [1.6, 2.2, 2.8, 3.4, 4.0, 4.6, 5.2, 5.8, 6.4, 7.0, 7.4, 7.8, 8.2, 8.6, 9.0, 9.3, 9.6, 9.9, 10.2, 10.5],
    },
    "critical": {
        "S": [1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0, 2.2, 2.4, 2.6, 2.8, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0],
        "M": [3.2, 3.4, 3.6, 3.8, 4.0, 4.2, 4.4, 4.6, 4.8, 5.0, 5.3, 5.6, 5.9, 6.2, 6.5, 6.5, 6.5, 6.5, 6.5, 6.5],
        "L": [4.4, 4.8, 5.2, 5.6, 6.0, 6.4, 6.8, 7.2, 7.6, 8.0, 8.4, 8.8, 9.2, 9.6, 10.0, 10.2, 10.4, 10.6, 10.8, 11.0],
        "ratio": 0.5,
    },
    "normalRanbu": {
        //only TA effect
        "S": [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.2, 1.4, 1.6, 1.8, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0]
    },
    "magnaRanbu": {
        //only TA effect
        "M": [0.18, 0.31, 0.44, 0.57, 0.7, 0.83, 0.96, 1.09, 1.22, 1.35, 1.48, 1.61, 1.74, 1.87, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0]
    },
    "magnaHakai": {
        "S": [0.4, 0.55, 0.7, 0.85, 1.0, 1.15, 1.3, 1.45, 1.6, 1.75, 1.9, 2.05, 2.20, 2.35, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5],
    },
    // Since it is only one Soka effect, it is usually defined separately from Magna attacking blade
    "normalSoka": {
        "M": [3.0, 3.0, 4.0, 4.0, 5.0, 5.0, 6.0, 6.0, 7.0, 8.0, 8.0, 8.0, 8.0, 8.0, 8.0, 8.0, 8.0, 8.0, 8.0, 8.0],
    },
    "magnaSoka": {
        "M": [3.0, 3.0, 4.0, 4.0, 5.0, 5.0, 6.0, 6.0, 7.0, 8.0, 8.0, 8.0, 8.0, 8.0, 8.0, 8.0, 8.0, 8.0, 8.0, 8.0],
    },
    // Pre-emptive skills
    "sensei": {
        "M": [5.0, 6.0, 7.0, 8.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 16.0, 17.0, 18.0, 19.0, 20.0, 20.0, 20.0, 20.0, 20.0, 20.0],
    },
    // Royal Wing Barrier
    "washiouKekkai": {
        "M": [6.0, 6.5, 7.0, 7.5, 8.0, 8.5, 9.0, 9.5, 10.0, 10.5, 11.0, 11.5, 12.0, 12.5, 13.0, 13.0, 13.0, 13.0, 13.0, 13.0],
    },
    // normal Mystery + Sentence(通常秘奥/必殺(奥義ダメージ))
    "normalHiou": {
        "S": [0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0, 5.5, 6.0, 6.5, 7.0, 7.5, 7.5, 7.5, 7.5, 7.5, 7.5],
        "M": [2.5, 3.0, 3.5, 4.0, 4.5, 5.0, 5.5, 6.0, 6.5, 7.0, 7.5, 8.0, 8.5, 9.0, 9.5, 9.5, 9.5, 9.5, 9.5, 9.5],
        "L": [5.5, 6.0, 6.5, 7.0, 7.5, 8.0, 8.5, 9.0, 9.5, 10.0, 10.5, 11.0, 11.5, 12.0, 12.5, 12.5, 12.5, 12.5, 12.5, 12.5]
    },
    // normal Sentence limit up (必殺(奥義上限))
    "normalOugiDamageLimitHissatsu": {
        "M": [0.8, 1.1, 1.4, 1.7, 2.0, 2.3, 2.6, 2.9, 3.2, 3.5, 3.8, 4.1, 4.4, 4.7, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0],
        "L": [1.2, 1.6, 2.0, 2.4, 2.8, 3.2, 3.6, 4.0, 4.4, 4.8, 5.2, 5.6, 6.0, 6.4, 6.8, 6.8, 6.8, 6.8, 6.8, 6.8]
    },
    // normal Glory chain up
    "normalEiketsu": {
        "L": [3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 12.5, 13.0, 13.5, 14.0, 14.5, 14.5, 14.5, 14.5, 14.5, 14.5]
    },
    // normal Glory limit up
    "normalEiketsuDamageLimit": {
        "L": [1.2, 1.6, 2.0, 2.4, 2.8, 3.2, 3.6, 4.0, 4.4, 4.8, 5.2, 5.6, 6.0, 6.4, 6.8, 6.8, 6.8, 6.8, 6.8, 6.8]
    },
    // magna Sentence
    "magnaHiou": {
        "M": [2.5, 3.0, 3.5, 4.0, 4.5, 5.0, 5.5, 6.0, 6.5, 7.0, 7.5, 8.0, 8.5, 9.0, 9.5, 9.5, 9.5, 9.5, 9.5, 9.5]
    },
    // magna Sentence limit up
    "magnaOugiDamageLimitHissatsu": {
        "M": [2.5, 3.0, 3.5, 4.0, 4.5, 5.0, 5.5, 6.0, 6.5, 7.0, 7.5, 8.0, 8.5, 9.0, 9.5, 9.5, 9.5, 9.5, 9.5, 9.5]
    },
    // Dmg cap up
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
    // Excelsior Ougi cap up
    "ougiDamageLimitExceed": {
        "M": [5.5, 6.0, 6.5, 7.0, 7.5, 8.0, 8.5, 9.0, 9.5, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 15.0, 15.0, 15.0, 15.0, 15.0]
    },
    // Chain Force cap up
    "chainDamageLimit": {
        "M": [2.0, 4.0, 6.0, 8.0, 10.0, 12.0, 14.0, 16.0, 18.0, 20.0, 22.0, 24.0, 26.0, 28.0, 30.0, 30.0, 30.0, 30.0, 30.0, 30.0]
    },
    // Chain Force damage up
    "chainDamage": {
        "M": [4.0, 8.0, 12.0, 16.0, 20.0, 24.0, 28.0, 32.0, 36.0, 40.0, 42.0, 44.0, 46.0, 48.0, 50.0, 50.0, 50.0, 50.0, 50.0, 50.0]
    },
    "magnaGunshin": {
        //only DA effect
        "S": [0.5, 0.8, 1.1, 1.4, 1.7, 2.0, 2.3, 2.6, 2.7, 3.0, 3.3, 3.6, 3.9, 4.2, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5],
        "M": [0.8, 1.1, 1.4, 1.7, 2.0, 2.3, 2.6, 2.9, 3.2, 3.5, 3.8, 4.1, 4.4, 4.7, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0]
    },
    "tuiga": {
        //Xuanwu Shellfists/玄武拳の霧氷の追牙・肆
        "L": [1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 10.4, 10.8, 11.2, 11.6, 12.0, 12.2, 12.4, 12.6, 12.8, 13.0],
    },
    // Debuff Resistance Grace (Unconfirmed Placeholder)
    "normalOntyou": {
        "M": [3.2, 3.4, 3.6, 3.8, 4.0, 4.2, 4.4, 4.6, 4.8, 5.0, 5.2, 5.4, 5.6, 5.8, 6.0, 6.0, 6.0, 6.0, 6.0, 6.0]
    },
    "normalHigo": {
        "S": [0.5, 0.8, 1.1, 1.4, 1.7, 2.0, 2.3, 2.6, 2.7, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0]
    }
};

// chara support
var supportAbilities = {
    "none": {
        "name": "なし",
        "type": "none",
        "range": "own",
        "value": 0
    },
    "da_up_all_10": {
        "name": "全体DA率10%UP(ランスロット)",
        "type": "DASupport",
        "range": "all",
        "value": 0.10
    },
    // ID is not changed for compatibility of save data.
    "ta_up_all_3": {
        "name": "全体TA率5%UP(ネツァ)",
        "type": "TASupport",
        "range": "all",
        "value": 0.05
    },
    "data_up_wind_10_5": {
        "name": "全体風DA率10%UP&TA率5%UP(コッコロ)",
        "type": "DATASupport",
        "range": "wind",
        "value": [0.10, 0.05]
    },
    "data_up_water_10_5": {
        "name": "全体水DA率10%UP&TA率5%UP(水着ディアンサ)",
        "type": "DATASupport",
        "range": "water",
        "value": [0.10, 0.05]
    },
    "da_up_fist_10": {
        "name": "格闘キャラDA率10%UP(ガンダゴウザ)",
        "type": "daBuff_fist",
        "range": "all",
        "value": 0.10
    },
    "hp_down_own_15": {
        "name": "HP15%DOWN(水着イシュ, マルキ, ロザミア)",
        "type": "HPBuff",
        "range": "own",
        "value": -0.15
    },
    "hp_up_own_15": {
        "name": "HP15%UP(ペコリーヌ)",
        "type": "HPBuff",
        "range": "own",
        "value": 0.15
    },
    "hp_up_own_20": {
        "name": "HP20%UP(ソリッズ, ファスティバ(SSR))",
        "type": "HPBuff",
        "range": "own",
        "value": 0.20
    },
    "atk_up_own_5": {
        "name": "攻撃5%UP(レディグレイ)",
        "type": "normalBuff",
        "range": "own",
        "value": 0.05
    },
    "atk_up_all_5": {
        "name": "全体攻撃5%UP(クリスティーナ)",
        "type": "normalBuff",
        "range": "all",
        "value": 0.05
    },
    "atk_up_all_10": {
        "name": "全体攻撃10%UP(アニラ)",
        "type": "normalBuff",
        "range": "all",
        "value": 0.10
    },
    "atk_up_doraf": {
        "name": "ドラフと種族不明の攻撃UP(ナルメア)",
        "type": "normalBuff_doraf",
        "range": "all",
        "value": 0.10
    },
    "atk_up_depends_races": {
        "name": "バトルメンバーの種族数に応じて攻撃力UP(リリィ)",
        "type": "normalBuff_depends_races",
        "range": "own",
        "value": 0.10
    },
    "element_buff_boost_own_30": {
        "name": "属性バフ付与時に属性攻撃30%UP(パーシヴァル)",
        "type": "element_buff_boost",
        "range": "own",
        "value": 0.30
    },
    "eternal_wisdom": {
        "name": "属性バフ付与時にステータスUP(スカーサハ)",
        "type": "eternal_wisdom",
        "range": "own",
        "value": 0.00
    },
    "ougi_gage_up_own_10": {
        "name": "奥義ゲージ上昇量10%UP(アルタイル)",
        "type": "ougiGageBuff",
        "range": "own",
        "value": 0.10
    },
    "ougi_gage_up_own_20": {
        "name": "奥義ゲージ上昇量20%UP(アレ爺,シルヴァ,アーミラ)",
        "type": "ougiGageBuff",
        "range": "own",
        "value": 0.20
    },
    "ougi_gage_up_own_100": {
        "name": "奥義ゲージ上昇量100%UP(オクトー)",
        "type": "ougiGageBuff",
        "range": "own",
        "value": 1.00
    },
    "ougi_damage_up_50": {
        "name": "全体奥義ダメージ50%UP(シエテ)",
        "type": "ougiDamageBuff",
        "range": "all",
        "value": 0.50
    },
    "ougi_damage_up_50_cap_10": {
        "name": "全体奥義ダメージ50%UP&奥義上限10%UP(最終シエテ)",
        "type": "ougiDamageBuff_capBuff",
        "range": "all",
        "value": 0.50
    },
    "emnity_all_SL10": {
        "name": "全体背水効果(ザルハメリナ)",
        "type": "emnity_all_SL10",
        "range": "all",
        "value": 0.00
    },
    "emnity_own_SL20": {
        "name": "背水効果(闇ジャンヌダルク, 黒騎士)",
        "type": "emnity_own_SL20",
        "range": "own",
        "value": 0.00
    },
    "envoy_meditation": {
        "name": "バトルメンバーの属性の数に応じて自分のステータスUP(水着ゾーイ)",
        "type": "envoy_meditation",
        "range": "own",
        "value": 0.00
    },
    "ideal_vassals": {
        "name": "バトルメンバーの数が多い程自分のステータスUP(パーシヴァル)",
        "type": "ideal_vassals",
        "range": "own",
        "value": 0.00
    },
    "dance_of_nataraja": {
        "name": "奥義ゲージ上昇量35%DOWN&与ダメージ上昇15%UP(シヴァ)",
        "type": "dance_of_nataraja",
        "range": "own",
        "value": 0.00
    },
    "recklessness_incarnate": {
        "name": "奥義ゲージ上昇量35%DOWN&与ダメージ15%UP&HP20%UP(クビラ)",
        "type": "recklessness_incarnate",
        "range": "own",
        "value": 0.00
    },
    "knightmare_frame": {
        "name": "HP15%UP&DEF10%UP&奥義ゲージ上昇量25%DOWN(ルルーシュ・ランペルージ, 枢木スザク, 紅月カレン)",
        "type": "knightmare_frame",
        "range": "own",
        "value": 0.00
    },
    "critical_up_own_10_30": {
        "name": "クリティカル確率UP(発動率10%, 倍率30%)(ヴァンピィ, ジャンヌダルク)",
        "type": "criticalBuff",
        "range": "own",
        "value": 0.10,
        "attackRatio": 0.30
    },
    "critical_up_own_20_20": {
        "name": "クリティカル確率UP(発動率20%, 倍率20%)(水着ジャンヌ)",
        "type": "criticalBuff",
        "range": "own",
        "value": 0.20,
        "attackRatio": 0.20
    },
    "critical_up_own_40_50": {
        "name": "クリティカル確率UP(発動率40%, 倍率50%)(キャル)",
        "type": "criticalBuff",
        "range": "own",
        "value": 0.40,
        "attackRatio": 0.50
    },
    "critical_up_all_5_30": {
        "name": "全体クリティカル確率UP(発動率5%, 倍率30%)(フェリ)",
        "type": "criticalBuff",
        "range": "all",
        "value": 0.05,
        "attackRatio": 0.30
    },
    "critical_up_all_100_50": {
        "name": "全体クリティカル確率UP(発動率100%, 倍率50%)(最終ソーン奥義)",
        "type": "criticalBuff",
        "range": "all",
        "value": 1.00,
        "attackRatio": 0.50
    },
    "damageUP_5": {
        "name": "与ダメージ上昇5%UP(アビー)",
        "type": "charaDamageUP",
        "range": "own",
        "value": 0.05
    },
    "damageUP_10": {
        "name": "与ダメージ上昇10%UP",
        "type": "charaDamageUP",
        "range": "own",
        "value": 0.10
    },
    "damageUP_20": {
        "name": "与ダメージ上昇20%UP(色々)",
        "type": "charaDamageUP",
        "range": "own",
        "value": 0.20
    },
    "damageUP_OugiCapUP_20": {
        "name": "与ダメージ上昇20%UP&奥義ダメージ上限20%UP(最終十天衆)",
        "type": "charaDamageUP_OugiCap",
        "range": "own",
        "value": 0.20
    },
    "ougiCapUP_20": {
        "name": "奥義ダメージ上限20%UP(最終十天衆)",
        "type": "ougiDamageLimitBuff",
        "range": "own",
        "value": 0.20
    },
    "ougiCapUP_25": {
        "name": "奥義ダメージ上限25%UP(ルリア,SSRロボミ)",
        "type": "ougiDamageLimitBuff",
        "range": "own",
        "value": 0.25
    },
    "ougiCapUP_100": {
        "name": "奥義ダメージ上限100%UP(シャリオス17世)",
        "type": "ougiDamageLimitBuff",
        "range": "own",
        "value": 1.0
    },
    "wildcard": {
        "name": "武器スキルの得意武器/タイプ/種族の発動条件を全て満たす(カイム)",
        "type": "wildcard",
        "range": "own",
        "value": 0.0
    },
    "stamina_all_L": {
        "name": "通常攻撃を行わないが木之本桜の残りHPが多いほど味方全体の攻撃が大きくUP",
        "type": "normalSupportKonshin",
        "range": "all",
        "value": "L"
    },
    "stamina_all_M": {
        "name": "ルルーシュの残りHPが多いほど味方全体の攻撃が大きくUP",
        "type": "normalSupportKonshin",
        "range": "all",
        "value": "M"
    },
    "stamina_all_L_hp_down_own_15": {
        "name": "最大HPが15%減少 防御力が低いがイシュミールの残りHPが多いほど味方全体の攻撃が大きくUP",
        "type": "normalSupportKonshin_hpDebuff",
        "range": "all",
        "value": "L",
        "hpDebuff": 0.15
    },
    "supplemental_third_hit_50k": { //like contentious-covenant
        "name": "トリプルアタック発動時に3回目の攻撃の5万与ダメージ上昇(ハレゼナ)",
        "type": "supplemental_third_hit",
        "range": "own",
        "value": 50000
    },
};

// exports
module.exports.opusNames = opusNames;
module.exports.zenith = zenith;
module.exports.zenithDA = zenithDABonus;
module.exports.zenithTA = zenithTABonus;
//module.exports.zenithCritical = zenithCritical;
module.exports.zenithOugiDamage = zenithOugiDamageBonus;
module.exports.zenithChainDamage = zenithChainDamageBonus;
module.exports.zenithChainDamageLimit = zenithChainDamageLimitBonus;
module.exports.zenithElement = zenithElementBonus;
module.exports.zenithDamageLimit = zenithDamageLimitBonus;
module.exports.raceTypes = raceTypes;
module.exports.sexTypes = sexTypes;
module.exports.skillAmounts = skillAmounts;
module.exports.elementTypes = elementTypes;
module.exports.enemyElementTypes = enemyElementTypes;
module.exports.filterElementTypes = filterElementTypes;
module.exports.summonTypes = summonTypes;
module.exports.skilltypes = skilltypes;
module.exports.jobTypes = jobTypes;
module.exports.armTypes = armTypes;
module.exports.summonElementTypes = summonElementTypes;
module.exports.keyTypes = keyTypes;
module.exports.supportedTurnChartSortkeys = supportedTurnChartSortkeys;
module.exports.supportedChartSortkeys = supportedChartSortkeys;
module.exports.supportedSimulationChartSortkeys = supportedSimulationChartSortkeys;
module.exports.enemyDefenseType = enemyDefenseType;
module.exports.supportAbilities = supportAbilities;
module.exports.limitBonusCriticalList = limitBonusCriticalList;
module.exports.skillDetailsDescription = skillDetailsDescription;

module.exports.additionalSelectList = {
    "・属性変更": {
        selectKeysNotation: "",
        notationText: "",
        selectKeys: ["elements"],
        selectors: ["elements"],
        defaultKeys: ["light"],
    },
    "・覚醒": {
        selectKeysNotation: "",
        notationText: "",
        selectKeys: ["elements"],
        selectors: ["elements"],
        defaultKeys: ["light"],
    },
    "コスモス": {
        selectKeysNotation: "",
        notationText: "",
        selectKeys: ["skill2"],
        selectors: ["cosmosSkills"],
        defaultKeys: ["cosmosAT"],
    },
    "絶覇": {
        selectKeysNotation: "",
        notationText: "",
        selectKeys: ["main_weapon_change"],
        selectors: ["mainWeapon"],
        defaultKeys: [0],
    },
    "[4凸]ブリューナク": {
        selectKeysNotation: "",
        notationText: "",
        selectKeys: ["main_weapon_change"],
        selectors: ["mainWeapon"],
        defaultKeys: [0],
    },
    "スナップブレード": {
        selectKeysNotation: "",
        notationText: "",
        selectKeys: ["main_weapon_switch"],
        selectors: ["mainWeapon"],
        defaultKeys: [0],
    },
    "青竜牙矛": {
        selectKeysNotation: "",
        notationText: "",
        selectKeys: ["skill2"],
        selectors: ["sishoSeiryu"],
        defaultKeys: ["non"],
    },
    "朱雀光剣": {
        selectKeysNotation: "",
        notationText: "",
        selectKeys: ["skill2"],
        selectors: ["sishoSuzaku"],
        defaultKeys: ["non"],
    },
    "白虎咆拳": {
        selectKeysNotation: "",
        notationText: "",
        selectKeys: ["skill2"],
        selectors: ["sishoByakko"],
        defaultKeys: ["non"],
    },
    "玄武甲槌": {
        selectKeysNotation: "",
        notationText: "",
        selectKeys: ["skill2"],
        selectors: ["sishoGenbu"],
        defaultKeys: ["non"],
    },
    "黄龍槍": {
        selectKeysNotation: "",
        notationText: "",
        selectKeys: ["main_weapon_switch"],
        selectors: ["mainWeapon"],
        defaultKeys: [0],
    },
    "無垢なる": {
        selectKeysNotation: "",
        notationText: "",
        selectKeys: ["skill1", "elements"],
        selectors: ["omegaWeaponSkill1", "elements"],
        defaultKeys: ["omega-raw", "light"],
    },
    "オメガ": {
        selectKeysNotation: "",
        notationText: "",
        selectKeys: ["skill1", "skill2", "elements"],
        selectors: ["omegaWeaponSkill1", "omegaWeaponSkill2", "elements"],
        defaultKeys: ["omega-raw", "non", "light"],
    },
    "ミカエル": {selectKeysNotation: "", notationText: "天司武器注記", selectKeys: [], selectors: [],},
    "ウリエル": {selectKeysNotation: "", notationText: "天司武器注記", selectKeys: [], selectors: [],},
    "ガブリエル": {selectKeysNotation: "", notationText: "天司武器注記", selectKeys: [], selectors: [],},
    "ラファエル": {selectKeysNotation: "", notationText: "天司武器注記", selectKeys: [], selectors: [],},
    "絶対否定の剣": {
        selectKeysNotation: "",
        notationText: "",
        selectKeys: ["skill2", "skill3"],
        selectors: ["opusWeaponSkill1", "opusNormalWeaponSkill2"],
        defaultKeys: ["non", "non"],
    },
    "永遠拒絶の剣": {
        selectKeysNotation: "",
        notationText: "",
        selectKeys: ["skill2", "skill3"],
        selectors: ["opusWeaponSkill1", "opusMagnaWeaponSkill2"],
        defaultKeys: ["non", "non"],
    },
    "絶対否定の槍": {
        selectKeysNotation: "",
        notationText: "",
        selectKeys: ["skill2", "skill3"],
        selectors: ["opusWeaponSkill1", "opusNormalWeaponSkill2"],
        defaultKeys: ["non", "non"],
    },
    "永遠拒絶の槍": {
        selectKeysNotation: "",
        notationText: "",
        selectKeys: ["skill2", "skill3"],
        selectors: ["opusWeaponSkill1", "opusMagnaWeaponSkill2"],
        defaultKeys: ["non", "non"],
    },
    "絶対否定の大鎌": {
        selectKeysNotation: "",
        notationText: "",
        selectKeys: ["skill2", "skill3"],
        selectors: ["opusWeaponSkill1", "opusNormalWeaponSkill2"],
        defaultKeys: ["non", "non"],
    },
    "永遠拒絶の大鎌": {
        selectKeysNotation: "",
        notationText: "",
        selectKeys: ["skill2", "skill3"],
        selectors: ["opusWeaponSkill1", "opusMagnaWeaponSkill2"],
        defaultKeys: ["non", "non"],
    },
    "絶対否定の杖": {
        selectKeysNotation: "",
        notationText: "",
        selectKeys: ["skill2", "skill3"],
        selectors: ["opusWeaponSkill1", "opusNormalWeaponSkill2"],
        defaultKeys: ["non", "non"],
    },
    "永遠拒絶の杖": {
        selectKeysNotation: "",
        notationText: "",
        selectKeys: ["skill2", "skill3"],
        selectors: ["opusWeaponSkill1", "opusMagnaWeaponSkill2"],
        defaultKeys: ["non", "non"],
    },
    "絶対否定の竪琴": {
        selectKeysNotation: "",
        notationText: "",
        selectKeys: ["skill2", "skill3"],
        selectors: ["opusWeaponSkill1", "opusNormalWeaponSkill2"],
        defaultKeys: ["non", "non"],
    },
    "永遠拒絶の竪琴": {
        selectKeysNotation: "",
        notationText: "",
        selectKeys: ["skill2", "skill3"],
        selectors: ["opusWeaponSkill1", "opusMagnaWeaponSkill2"],
        defaultKeys: ["non", "non"],
    },
    "絶対否定の太刀": {
        selectKeysNotation: "",
        notationText: "",
        selectKeys: ["skill2", "skill3"],
        selectors: ["opusWeaponSkill1", "opusNormalWeaponSkill2"],
        defaultKeys: ["non", "non"],
    },
    "永遠拒絶の太刀": {
        selectKeysNotation: "",
        notationText: "",
        selectKeys: ["skill2", "skill3"],
        selectors: ["opusWeaponSkill1", "opusMagnaWeaponSkill2"],
        defaultKeys: ["non", "non"],
    },
    "ランス・オブ・ケルヴィム": {
        notationText: "",
        selectKeys: ["main_weapon_switch"],
        selectors: ["mainWeapon"],
        defaultKeys: [0]
    },
    "真・道天浄土": {
        notationText: "",
        selectKeys: ["main_weapon_switch"],
        selectors: ["mainWeapon"],
        defaultKeys: [0]
    },
    "[4凸]虚空の裂剣": {
        selectKeysNotation: skillDetailsDescription['calamitous-covenant'],
        notationText: "",
        selectKeys: ["skill2Detail"],
        selectors: ["victorious_calamitous_covenant"],
        defaultKeys: ["0"],
    },
    "[4凸]虚空の拝腕": {
        selectKeysNotation: skillDetailsDescription['victorious-covenant'],
        notationText: "",
        selectKeys: ["skill2Detail"],
        selectors: ["victorious_calamitous_covenant"],
        defaultKeys: ["0"],
    }
};


// オプション用
module.exports.selector = {"ja": {}, "en": {}, "zh": {}};
module.exports.selector.ja.races = Object.keys(raceTypes).map(function (opt) {
    return <option value={opt} key={opt}>{raceTypes[opt]}</option>;
});
module.exports.selector.en.races = Object.keys(raceTypes).map(function (opt) {
    return <option value={opt} key={opt}>{intl.translate(raceTypes[opt], "en")}</option>;
});
module.exports.selector.zh.races = Object.keys(raceTypes).map(function (opt) {
    return <option value={opt} key={opt}>{intl.translate(raceTypes[opt], "zh")}</option>;
});

module.exports.selector.ja.sexes = Object.keys(sexTypes).map(function (opt) {
    return <option value={opt} key={opt}>{sexTypes[opt]}</option>;
});
module.exports.selector.en.sexes = Object.keys(sexTypes).map(function (opt) {
    return <option value={opt} key={opt}>{intl.translate(sexTypes[opt], "en")}</option>;
});
module.exports.selector.zh.sexes = Object.keys(sexTypes).map(function (opt) {
    return <option value={opt} key={opt}>{intl.translate(sexTypes[opt], "zh")}</option>;
});

module.exports.selector.ja.elements = Object.keys(elementTypes).map(function (opt) {
    return <option value={opt} key={opt}>{elementTypes[opt]}</option>;
});
module.exports.selector.en.elements = Object.keys(elementTypes).map(function (opt) {
    return <option value={opt} key={opt}>{intl.translate(elementTypes[opt], "en")}</option>;
});
module.exports.selector.zh.elements = Object.keys(elementTypes).map(function (opt) {
    return <option value={opt} key={opt}>{intl.translate(elementTypes[opt], "zh")}</option>;
});

module.exports.selector.ja.enemyElements = Object.keys(enemyElementTypes).map(function (opt) {
    return <option value={opt} key={opt}>{enemyElementTypes[opt]}</option>;
});
module.exports.selector.en.enemyElements = Object.keys(enemyElementTypes).map(function (opt) {
    return <option value={opt} key={opt}>{intl.translate(enemyElementTypes[opt], "en")}</option>;
});
module.exports.selector.zh.enemyElements = Object.keys(enemyElementTypes).map(function (opt) {
    return <option value={opt} key={opt}>{intl.translate(enemyElementTypes[opt], "zh")}</option>;
});

module.exports.selector.ja.filterelements = Object.keys(filterElementTypes).map(function (opt) {
    return <option value={opt} key={opt}>{filterElementTypes[opt]}</option>;
});
module.exports.selector.en.filterelements = Object.keys(filterElementTypes).map(function (opt) {
    return <option value={opt} key={opt}>{intl.translate(filterElementTypes[opt], "en")}</option>;
});
module.exports.selector.zh.filterelements = Object.keys(filterElementTypes).map(function (opt) {
    return <option value={opt} key={opt}>{intl.translate(filterElementTypes[opt], "zh")}</option>;
});

module.exports.selector.ja.summons = Object.keys(summonTypes).map(function (opt) {
    return <option value={opt} key={opt}>{summonTypes[opt]}</option>;
});
module.exports.selector.en.summons = Object.keys(summonTypes).map(function (opt) {
    return <option value={opt} key={opt}>{intl.translate(summonTypes[opt], "en")}</option>;
});
module.exports.selector.zh.summons = Object.keys(summonTypes).map(function (opt) {
    return <option value={opt} key={opt}>{intl.translate(summonTypes[opt], "zh")}</option>;
});

module.exports.selector.ja.skills = Object.keys(skilltypes).map(function (key) {
    return <option value={key} key={key}>{intl.translate(skilltypes[key].name, "ja")}</option>;
});
module.exports.selector.en.skills = Object.keys(skilltypes).map(function (key) {
    return <option value={key} key={key}>{intl.translate(skilltypes[key].name, "en")}</option>;
});
module.exports.selector.zh.skills = Object.keys(skilltypes).map(function (key) {
    return <option value={key} key={key}>{intl.translate(skilltypes[key].name, "zh")}</option>;
});

module.exports.selector.ja.cosmosSkills = Object.keys(cosmosSkills).map(function (key) {
    return <option value={key} key={key}>{cosmosSkills[key].name}</option>;
});
module.exports.selector.en.cosmosSkills = Object.keys(cosmosSkills).map(function (key) {
    return <option value={key} key={key}>{intl.translate(cosmosSkills[key].name, "en")}</option>;
});
module.exports.selector.zh.cosmosSkills = Object.keys(cosmosSkills).map(function (key) {
    return <option value={key} key={key}>{intl.translate(cosmosSkills[key].name, "zh")}</option>;
});

module.exports.selector.ja.mainWeapon = [<option value={0} key={"no"}>{intl.translate("メイン装備no", "ja")}</option>,
    <option value={1} key={"yes"}>{intl.translate("メイン装備yes", "ja")}</option>];
module.exports.selector.en.mainWeapon = [<option value={0} key={"no"}>{intl.translate("メイン装備no", "en")}</option>,
    <option value={1} key={"yes"}>{intl.translate("メイン装備yes", "en")}</option>];
module.exports.selector.zh.mainWeapon = [<option value={0} key={"no"}>{intl.translate("メイン装備no", "en")}</option>,
    <option value={1} key={"yes"}>{intl.translate("メイン装備yes", "zh")}</option>];

module.exports.selector.ja.sishoSeiryu = Object.keys(sishoSeiryu).map(function (key) {
    return <option value={key} key={key}>{sishoSeiryu[key].name}</option>;
});
module.exports.selector.en.sishoSeiryu = Object.keys(sishoSeiryu).map(function (key) {
    return <option value={key} key={key}>{intl.translate(sishoSeiryu[key].name, "en")}</option>;
});
module.exports.selector.zh.sishoSeiryu = Object.keys(sishoSeiryu).map(function (key) {
    return <option value={key} key={key}>{intl.translate(sishoSeiryu[key].name, "zh")}</option>;
});

module.exports.selector.ja.sishoByakko = Object.keys(sishoByakko).map(function (key) {
    return <option value={key} key={key}>{sishoByakko[key].name}</option>;
});
module.exports.selector.en.sishoByakko = Object.keys(sishoByakko).map(function (key) {
    return <option value={key} key={key}>{intl.translate(sishoByakko[key].name, "en")}</option>;
});
module.exports.selector.zh.sishoByakko = Object.keys(sishoByakko).map(function (key) {
    return <option value={key} key={key}>{intl.translate(sishoByakko[key].name, "zh")}</option>;
});

module.exports.selector.ja.sishoSuzaku = Object.keys(sishoSuzaku).map(function (key) {
    return <option value={key} key={key}>{sishoSuzaku[key].name}</option>;
});
module.exports.selector.en.sishoSuzaku = Object.keys(sishoSuzaku).map(function (key) {
    return <option value={key} key={key}>{intl.translate(sishoSuzaku[key].name, "en")}</option>;
});
module.exports.selector.zh.sishoSuzaku = Object.keys(sishoSuzaku).map(function (key) {
    return <option value={key} key={key}>{intl.translate(sishoSuzaku[key].name, "zh")}</option>;
});

module.exports.selector.ja.sishoGenbu = Object.keys(sishoGenbu).map(function (key) {
    return <option value={key} key={key}>{sishoGenbu[key].name}</option>;
});
module.exports.selector.en.sishoGenbu = Object.keys(sishoGenbu).map(function (key) {
    return <option value={key} key={key}>{intl.translate(sishoGenbu[key].name, "en")}</option>;
});
module.exports.selector.zh.sishoGenbu = Object.keys(sishoGenbu).map(function (key) {
    return <option value={key} key={key}>{intl.translate(sishoGenbu[key].name, "zh")}</option>;
});


module.exports.selector.ja.victorious_calamitous_covenant = Object.keys(victorious_calamitous_covenant).map(function (key) {
    return <option value={key} key={key}>{key}</option>;
});
module.exports.selector.en.victorious_calamitous_covenant = Object.keys(victorious_calamitous_covenant).map(function (key) {
    return <option value={key} key={key}>{key}</option>;
});
module.exports.selector.zh.victorious_calamitous_covenant = Object.keys(victorious_calamitous_covenant).map(function (key) {
    return <option value={key} key={key}>{key}</option>;
});

// オメガウェポンテンプレート用セレクタ
module.exports.selector.ja.omegaWeaponSkill1 = Object.keys(omegaWeaponSkill1).map(function (key) {
    return <option value={key} key={key}>{intl.translate(omegaWeaponSkill1[key].name, "ja")}</option>;
});
module.exports.selector.en.omegaWeaponSkill1 = Object.keys(omegaWeaponSkill1).map(function (key) {
    return <option value={key} key={key}>{intl.translate(omegaWeaponSkill1[key].name, "en")}</option>;
});
module.exports.selector.zh.omegaWeaponSkill1 = Object.keys(omegaWeaponSkill1).map(function (key) {
    return <option value={key} key={key}>{intl.translate(omegaWeaponSkill1[key].name, "zh")}</option>;
});

module.exports.selector.ja.omegaWeaponSkill2 = Object.keys(omegaWeaponSkill2).map(function (key) {
    return <option value={key} key={key}>{intl.translate(omegaWeaponSkill2[key].name, "ja")}</option>;
});
module.exports.selector.en.omegaWeaponSkill2 = Object.keys(omegaWeaponSkill2).map(function (key) {
    return <option value={key} key={key}>{intl.translate(omegaWeaponSkill2[key].name, "en")}</option>;
});
module.exports.selector.zh.omegaWeaponSkill2 = Object.keys(omegaWeaponSkill2).map(function (key) {
    return <option value={key} key={key}>{intl.translate(omegaWeaponSkill2[key].name, "zh")}</option>;
});

module.exports.selector.ja.opusWeaponSkill1 = Object.keys(opusWeaponSkill1).map(function (key) {
    return <option value={key} key={key}>{intl.translate(opusWeaponSkill1[key].name, "ja")}</option>;
});
module.exports.selector.en.opusWeaponSkill1 = Object.keys(opusWeaponSkill1).map(function (key) {
    return <option value={key} key={key}>{intl.translate(opusWeaponSkill1[key].name, "en")}</option>;
});
module.exports.selector.zh.opusWeaponSkill1 = Object.keys(opusWeaponSkill1).map(function (key) {
    return <option value={key} key={key}>{intl.translate(opusWeaponSkill1[key].name, "zh")}</option>;
});

module.exports.selector.ja.opusNormalWeaponSkill2 = Object.keys(opusNormalWeaponSkill2).map(function (key) {
    return <option value={key} key={key}>{intl.translate(opusNormalWeaponSkill2[key].name, "ja")}</option>;
});
module.exports.selector.en.opusNormalWeaponSkill2 = Object.keys(opusNormalWeaponSkill2).map(function (key) {
    return <option value={key} key={key}>{intl.translate(opusNormalWeaponSkill2[key].name, "en")}</option>;
});
module.exports.selector.zh.opusNormalWeaponSkill2 = Object.keys(opusNormalWeaponSkill2).map(function (key) {
    return <option value={key} key={key}>{intl.translate(opusNormalWeaponSkill2[key].name, "zh")}</option>;
});

module.exports.selector.ja.opusMagnaWeaponSkill2 = Object.keys(opusMagnaWeaponSkill2).map(function (key) {
    return <option value={key} key={key}>{intl.translate(opusMagnaWeaponSkill2[key].name, "ja")}</option>;
});
module.exports.selector.en.opusMagnaWeaponSkill2 = Object.keys(opusMagnaWeaponSkill2).map(function (key) {
    return <option value={key} key={key}>{intl.translate(opusMagnaWeaponSkill2[key].name, "en")}</option>;
});
module.exports.selector.zh.opusMagnaWeaponSkill2 = Object.keys(opusMagnaWeaponSkill2).map(function (key) {
    return <option value={key} key={key}>{intl.translate(opusMagnaWeaponSkill2[key].name, "zh")}</option>;
});

module.exports.selector.ja.types = Object.keys(jobTypes).map(function (opt) {
    return <option value={opt} key={opt}>{jobTypes[opt]}</option>;
});
module.exports.selector.en.types = Object.keys(jobTypes).map(function (opt) {
    return <option value={opt} key={opt}>{intl.translate(jobTypes[opt], "en")}</option>;
});
module.exports.selector.zh.types = Object.keys(jobTypes).map(function (opt) {
    return <option value={opt} key={opt}>{intl.translate(jobTypes[opt], "zh")}</option>;
});

module.exports.selector.ja.armtypes = Object.keys(armTypes).map(function (opt) {
    return <option value={opt} key={opt}>{armTypes[opt]}</option>;
});
module.exports.selector.en.armtypes = Object.keys(armTypes).map(function (opt) {
    return <option value={opt} key={opt}>{intl.translate(armTypes[opt], "en")}</option>;
});
module.exports.selector.zh.armtypes = Object.keys(armTypes).map(function (opt) {
    return <option value={opt} key={opt}>{intl.translate(armTypes[opt], "zh")}</option>;
});

module.exports.selector.ja.summonElements = Object.keys(summonElementTypes).map(function (opt) {
    return <option value={opt} key={opt}>{summonElementTypes[opt].name}</option>;
});
module.exports.selector.en.summonElements = Object.keys(summonElementTypes).map(function (opt) {
    return <option value={opt} key={opt}>{intl.translate(summonElementTypes[opt].name, "en")}</option>;
});
module.exports.selector.zh.summonElements = Object.keys(summonElementTypes).map(function (opt) {
    return <option value={opt} key={opt}>{intl.translate(summonElementTypes[opt].name, "zh")}</option>;
});

module.exports.selector.summonAmounts = summonAmountList.map(function (opt) {
    return <option value={opt} key={opt}>{opt}</option>;
});

module.exports.selector.zenithAttack = zenithAttackBonus.map(function (opt) {
    return <option value={opt} key={opt}>{opt}</option>;
});
module.exports.selector.zenithHP = zenithHPBonus.map(function (opt) {
    return <option value={opt} key={opt}>{opt}</option>;
});
module.exports.selector.zenithPartyHP = zenithPartyHPBonus.map(function (opt) {
    return <option value={opt} key={opt}>{opt}</option>;
});

//module.exports.selector.zenithCriticalBonus = zenithCriticalBonus.map(function (opt) {
//    return <option value={opt} key={opt}>{opt}</option>;
//});


module.exports.selector.slv = skilllevels.map(function (opt) {
    return <option value={opt} key={opt}>{opt}</option>;
});
module.exports.selector.consider = considerNum.map(function (opt) {
    return <option value={opt} key={opt}>{opt}</option>;
});
module.exports.selector.buffLevel = buffLevelList.map(function (opt) {
    return <option value={opt} key={opt}>{opt}</option>;
});
module.exports.selector.ougiGageUpOugiBuffLevel = ougiGageUpOugiBuffLevelList.map(function (opt) {
    return <option value={opt} key={opt}>{opt}</option>;
});
module.exports.selector.criticalRateLevel = criticalRateLevelList.map(function (opt) {
    return <option value={opt} key={opt}>{opt}</option>;
});
module.exports.selector.ougiRatio = ougiRatioList.map(function (opt) {
    return <option value={opt} key={opt}>{opt}</option>;
});
module.exports.selector.hplist = HPList.map(function (opt) {
    return <option value={opt} key={opt}>{opt}</option>;
});
module.exports.selector.masteratk = masterATKList.map(function (opt) {
    return <option value={opt} key={opt}>{opt}</option>;
});
module.exports.selector.masterhp = masterHPList.map(function (opt) {
    return <option value={opt} key={opt}>{opt}</option>;
});
module.exports.selector.masterDA = masterDAList.map(function (opt) {
    return <option value={opt} key={opt}>{opt}</option>;
});
module.exports.selector.masterTA = masterTAList.map(function (opt) {
    return <option value={opt} key={opt}>{opt}</option>;
});
module.exports.selector.masterDamageLimit = masterDamageLimitList.map(function (opt) {
    return <option value={opt} key={opt}>{opt}</option>;
});
module.exports.selector.chainNumber = chainNumberList.map(function (opt) {
    return <option value={opt} key={opt}>{opt}</option>;
});

module.exports.selector.ja.ktypes = Object.keys(keyTypes).map(function (opt) {
    return <option value={opt} key={opt}>{keyTypes[opt]}</option>
});
module.exports.selector.en.ktypes = Object.keys(keyTypes).map(function (opt) {
    return <option value={opt} key={opt}>{intl.translate(keyTypes[opt], "en")}</option>
});
module.exports.selector.zh.ktypes = Object.keys(keyTypes).map(function (opt) {
    return <option value={opt} key={opt}>{intl.translate(keyTypes[opt], "zh")}</option>
});

module.exports.selector.plusnum = Object.keys(plusNumList).map(function (opt) {
    return <option value={plusNumList[opt]} key={opt}>{opt}</option>
});
module.exports.selector.charaPlusNumList = Object.keys(charaPlusNumList).map(function (opt) {
    return <option value={charaPlusNumList[opt]} key={opt}>{opt}</option>
});

module.exports.selector.level100Limit = Object.keys(levelList100Limit).map(function (opt) {
    return <option value={levelList100Limit[opt]} key={opt}>{opt}</option>
});
module.exports.selector.level150Limit = Object.keys(levelList150Limit).map(function (opt) {
    return <option value={levelList150Limit[opt]} key={opt}>{opt}</option>
});
module.exports.selector.level200Limit = Object.keys(levelList200Limit).map(function (opt) {
    return <option value={levelList200Limit[opt]} key={opt}>{opt}</option>
});
module.exports.selector.SRLevel75Limit = Object.keys(SRLevelList75Limit).map(function (opt) {
    return <option value={SRLevelList75Limit[opt]} key={opt}>{opt}</option>
});
module.exports.selector.SRLevel120Limit = Object.keys(SRLevelList120Limit).map(function (opt) {
    return <option value={SRLevelList120Limit[opt]} key={opt}>{opt}</option>
});

module.exports.selector.skilllevel10Limit = Object.keys(skillLevelList10Limit).map(function (opt) {
    return <option value={skillLevelList10Limit[opt]} key={opt}>{opt}</option>
});
module.exports.selector.skilllevel15Limit = Object.keys(skillLevelList15Limit).map(function (opt) {
    return <option value={skillLevelList15Limit[opt]} key={opt}>{opt}</option>
});
module.exports.selector.skilllevel20Limit = Object.keys(skillLevelList20Limit).map(function (opt) {
    return <option value={skillLevelList20Limit[opt]} key={opt}>{opt}</option>
});

// Chara Limit Bonus Selectors
module.exports.selector.limitBonusAttackList = limitBonusAttackList.map(function (opt) {
    return <option value={opt} key={opt}>{opt}</option>;
});
module.exports.selector.limitBonusHPList = limitBonusHPList.map(function (opt) {
    return <option value={opt} key={opt}>{opt}</option>;
});
module.exports.selector.limitBonusDAList = limitBonusDAList.map(function (opt) {
    return <option value={opt} key={opt}>{opt}</option>;
});
module.exports.selector.limitBonusTAList = limitBonusTAList.map(function (opt) {
    return <option value={opt} key={opt}>{opt}</option>;
});
module.exports.selector.limitBonusElementList = limitBonusElementList.map(function (opt) {
    return <option value={opt} key={opt}>{opt}</option>;
});
module.exports.selector.ja.limitBonusCriticalList = Object.keys(limitBonusCriticalList).map(function (opt) {
    return <option value={opt} key={opt}>{limitBonusCriticalList[opt].name}</option>;
});
module.exports.selector.en.limitBonusCriticalList = Object.keys(limitBonusCriticalList).map(function (opt) {
    return <option value={opt} key={opt}>{intl.translate(limitBonusCriticalList[opt].name, "en")}</option>;
});
module.exports.selector.zh.limitBonusCriticalList = Object.keys(limitBonusCriticalList).map(function (opt) {
    return <option value={opt} key={opt}>{intl.translate(limitBonusCriticalList[opt].name, "zh")}</option>;
});
module.exports.selector.limitBonusOugiDamageList = limitBonusOugiDamageList.map(function (opt) {
    return <option value={opt} key={opt}>{opt}</option>;
});
module.exports.selector.limitBonusOugiDamageLimitList = limitBonusOugiDamageLimitList.map(function (opt) {
    return <option value={opt} key={opt}>{opt}</option>;
});
module.exports.selector.limitBonusOugiGageBuffList = limitBonusOugiGageBuffList.map(function (opt) {
    return <option value={opt} key={opt}>{opt}</option>;
});

// Chara EX Limit Bonus Selectors
module.exports.selector.EXlimitBonusAttackList = EXlimitBonusAttackList.map(function (opt) {
    return <option value={opt} key={opt}>{opt}</option>;
});
module.exports.selector.EXlimitBonusHPList = EXlimitBonusHPList.map(function (opt) {
    return <option value={opt} key={opt}>{opt}</option>;
});
module.exports.selector.EXlimitBonusOugiDamageList = EXlimitBonusOugiDamageList.map(function (opt) {
    return <option value={opt} key={opt}>{opt}</option>;
});
module.exports.selector.EXlimitBonusOugiDamageLimitList = EXlimitBonusOugiDamageLimitList.map(function (opt) {
    return <option value={opt} key={opt}>{opt}</option>;
});
module.exports.selector.EXlimitBonusCriticalList = EXlimitBonusCriticalList.map(function (opt) {
    return <option value={opt} key={opt}>{opt}</option>;
});
module.exports.selector.EXlimitBonusHaisuiList = EXlimitBonusHaisuiList.map(function (opt) {
    return <option value={opt} key={opt}>{opt}</option>;
});
module.exports.selector.EXlimitBonusKonshinList = EXlimitBonusKonshinList.map(function (opt) {
    return <option value={opt} key={opt}>{opt}</option>;
});
module.exports.selector.EXlimitBonusDAList = EXlimitBonusDAList.map(function (opt) {
    return <option value={opt} key={opt}>{opt}</option>;
});
module.exports.selector.EXlimitBonusTAList = EXlimitBonusTAList.map(function (opt) {
    return <option value={opt} key={opt}>{opt}</option>;
});


module.exports.selector.ja.supported_chartsortkeys = Object.keys(supportedChartSortkeys).map(function (opt) {
    return <option value={opt} key={opt}>{supportedChartSortkeys[opt]}</option>
});
module.exports.selector.en.supported_chartsortkeys = Object.keys(supportedChartSortkeys).map(function (opt) {
    return <option value={opt} key={opt}>{intl.translate(supportedChartSortkeys[opt], "en")}</option>
});
module.exports.selector.zh.supported_chartsortkeys = Object.keys(supportedChartSortkeys).map(function (opt) {
    return <option value={opt} key={opt}>{intl.translate(supportedChartSortkeys[opt], "zh")}</option>
});

module.exports.selector.ja.supported_simulationchartsortkeys = Object.keys(supportedSimulationChartSortkeys).map(function (opt) {
    return <option value={opt} key={opt}>{supportedSimulationChartSortkeys[opt]}</option>
});
module.exports.selector.en.supported_simulationchartsortkeys = Object.keys(supportedSimulationChartSortkeys).map(function (opt) {
    return <option value={opt} key={opt}>{intl.translate(supportedSimulationChartSortkeys[opt], "en")}</option>
});
module.exports.selector.zh.supported_simulationchartsortkeys = Object.keys(supportedSimulationChartSortkeys).map(function (opt) {
    return <option value={opt} key={opt}>{intl.translate(supportedSimulationChartSortkeys[opt], "zh")}</option>
});

module.exports.supportedChartSortkeys = supportedChartSortkeys;
module.exports.supportedSimulationChartSortkeys = supportedSimulationChartSortkeys;

module.exports.selector.ja.enemydeftypes = Object.keys(enemyDefenseType).map(function (opt) {
    return <option value={opt} key={opt}>{intl.translate(enemyDefenseType[opt].name, "ja")}</option>;
});
module.exports.selector.en.enemydeftypes = Object.keys(enemyDefenseType).map(function (opt) {
    return <option value={opt} key={opt}>{intl.translate(enemyDefenseType[opt].name, "en")}</option>;
});
module.exports.selector.zh.enemydeftypes = Object.keys(enemyDefenseType).map(function (opt) {
    return <option value={opt} key={opt}>{intl.translate(enemyDefenseType[opt].name, "zh")}</option>;
});

module.exports.selector.ja.supportAbilities = Object.keys(supportAbilities).map(function (opt) {
    return <option value={opt} key={opt}>{intl.translate(supportAbilities[opt].name, "ja")}</option>;
});
module.exports.selector.en.supportAbilities = Object.keys(supportAbilities).map(function (opt) {
    return <option value={opt} key={opt}>{intl.translate(supportAbilities[opt].name, "en")}</option>;
});
module.exports.selector.zh.supportAbilities = Object.keys(supportAbilities).map(function (opt) {
    return <option value={opt} key={opt}>{intl.translate(supportAbilities[opt].name, "zh")}</option>;
});

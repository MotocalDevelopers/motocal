'use strict';

module.exports.attack = function (type = "balanced", lv = 1) {
    return {
        "balanced"   : [0, 1000, 1000, 1000, 1000, 3000, 3000],
        "attack"     : [0, 1000, 2000, 2000, 2000, 4000, 6000],
        "defense"    : [0, 1000, 1000, 1000, 1000, 1000, 1000],
        "multiattack": [0, 1000, 1000, 1000, 1000, 3000, 3000],
    }[type][lv-1];
};

module.exports.HP = function (type = "balanced", lv = 1) {
    return {
        "balanced"   : [0, 0, 500,  500,  500,  500, 1500],
        "attack"     : [0, 0,   0,    0,    0,    0,    0],
        "defense"    : [0, 0, 500, 1000, 1000, 2000, 2000],
        "multiattack": [0, 0,   0,    0,    0,    0,    0],
    }[type][lv-1];
};

module.exports.ougi = function (type = "balanced", lv = 1) {
    return {
        "balanced"   : [0.00, 0.00, 0.00, 0.05, 0.05, 0.05, 0.05],
        "attack"     : [0.00, 0.00, 0.00, 0.05, 0.10, 0.10, 0.10],
        "defense"    : [0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00],
        "multiattack": [0.00, 0.00, 0.00, 0.05, 0.05, 0.05, 0.05],
    }[type][lv-1];
};

module.exports.DA = function (type = "balanced", lv = 1) {
    return {
        "balanced"   : [0.00, 0.00, 0.00, 0.00, 0.02, 0.02, 0.02],
        "attack"     : [0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00],
        "defense"    : [0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00],
        "multiattack": [0.00, 0.00, 0.04, 0.04, 0.04, 0.04, 0.10],
    }[type][lv-1];
};

module.exports.TA = function (type = "balanced", lv = 1) {
    return {
        "balanced"   : [0.00, 0.00, 0.00, 0.00, 0.02, 0.02, 0.02],
        "attack"     : [0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00],
        "defense"    : [0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00],
        "multiattack": [0.00, 0.00, 0.00, 0.00, 0.02, 0.02, 0.02],
    }[type][lv-1];
};

'use strict';

const { func } = require("prop-types");

module.exports.attack = function (lv = 1) {
    switch (lv) {
        case 7:
        case 6:
            return 3000;
        case 5:
        case 4:
        case 3:
        case 2:
            return 1000;
        default:
            return 0;
    }
};

module.exports.HP = function (lv = 1) {
    switch (lv) {
        case 7:
            return 1500;
        case 6:
        case 5:
        case 4:
        case 3:
            return 500;
        case 2:
        default:
            return 0;
    }
};

module.exports.ougi = function (lv = 1) {
    switch (lv) {
        case 7:
        case 6:
        case 5:
        case 4:
            return 0.05;
        case 3:
        case 2:
        default:
            return 0;
    }
};

module.exports.DA = module.exports.TA = function (lv = 1) {
    switch (lv) {
        case 7:
        case 6:
        case 5:
            return 0.02;
        case 4:
        case 3:
        case 2:
        default:
            return 0;
    }
};

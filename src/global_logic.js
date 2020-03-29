const intl = require('./translate.js');
const {
    LIMIT,
    BASE_LIMIT_VALUES,
    DEFAULT,
    elementRelation,
    supportAbilities,
    zenith,
    zenithDA,
    zenithTA,
    zenithOugiDamage,
    zenithChainDamage,
    zenithChainDamageLimit,
    zenithElement,
    zenithDamageLimit,
    Jobs,
    skilltypes,
    skillAmounts,
    summonTypes,
    summonElementTypes,
    opusNames,
    hollowskyNames,
    limitBonusCriticalList,
} = require('./global_const.js');
const supplemental = require('./supplemental.js');
const {
    favContains,
    bahaRaceContains,
    bahaRaceCharaContains,
    bahaFURaceCharaContains,
    favCharaContains,
    typeCharaContains,
    raceCharaContains,
} = require('./skill_filter.js');
const {range, when} = require('./support_filter');
const epic = require('./epic');


module.exports.isCosmos = function (arm) {
    return (skilltypes[arm.skill1] != undefined && skilltypes[arm.skill1].type == "cosmosArm") ||
        (skilltypes[arm.skill2] != undefined && skilltypes[arm.skill2].type == "cosmosArm") ||
        (skilltypes[arm.skill3] != undefined && skilltypes[arm.skill3].type == "cosmosArm");
};

module.exports.isDarkOpus = function (arm) {
    return arm != undefined && arm.name != undefined && opusNames.some(value => arm.name.includes(value));
};

function isHaisuiType(stype) {
    return (stype === "normalHaisui" || stype === "magnaHaisui" ||
        stype === "normalKonshin" || stype === "magnaKonshin" ||
        stype === "normalOtherKonshin" || stype === "exHaisui" ||
        stype === "normalSupportKonshin" || stype === "normalSupportHaisui");
}

module.exports.isValidResult = function (res, minHP) {
    // Function for preprocessing the result

    // Minimum guarantee HP
    return !(minHP != undefined && minHP > res.Djeeta.totalHP);
};

module.exports.proceedIndex = function (index, ana, i) {
    if (i != ana.length) {
        index[i] = (index[i] + 1) | 0;
        if (index[i] > ana[i].length - 1) {
            index[i] = 0;
            index = arguments.callee(index, ana, i + 1);
        }
    }
    return index;
};

module.exports.isHollowsky = function (arm) {
    return arm != undefined && arm.name != undefined && hollowskyNames.some( value => arm.name.includes(value));
};

/**
 * Generate limitValues new array instance for damage caps.
 * @param {number} limitUp
 * @param {Array<[float,float]>} values
 * @param {Array<[float,float]>} initial limit values
 * @private
 *
 * initLimitValues(2, [[1000,1.0], [2000,2.0]]) => [[2000,1.0], [4000,2.0]]
 */
const _initLimitValues = (limitUp, values) => values.map(([threshold, ratio]) => [threshold*limitUp, ratio]);

module.exports._initLimitValues = _initLimitValues;

/**
 * Add and returns sum of numbers in array
 * @param {number[]} arr array contains numbers
 * @param {number} total sum of numbers in array
 * @returns {number} sum of array
 */
module.exports.sum = (arr, total = 0) => {
    for (const num of arr) {
        total += parseFloat(num);
    }
    return total;
};

/**
 * This function aims to remove all combinations that has no chance to be top dps henceforth saving processing time
 * @param {Array<number[]>} combinations all possible combinations
 * @param {number} maxSize desired size of a combination
 * @param {boolean} ruleMaxSize Eliminate any grid that doesn't reach maximum weapon possible for given weapon list
 * @returns {Array<number[]>} filtered combinations
 */
module.exports.filterCombinations = function (combinations, maxSize, ruleMaxSize = true) {
    if (ruleMaxSize) {
        combinations = combinations.filter(combination => module.exports.sum(combination) === maxSize);
    }
    return combinations;
};

module.exports.calcCombinations = function (arml, ruleMaxSize) {
    // Calculate the array of [Minimum consideration number, ..., Maximum consideration number] for all weapons
    var armNumArray = [];
    var totalItr = 1;
    for (var i = 0; i < arml.length; i++) {
        var temp = [];
        var numMin = arml[i].considerNumberMin != undefined ? parseInt(arml[i].considerNumberMin) : 0;
        var numMax = arml[i].considerNumberMax != undefined ? parseInt(arml[i].considerNumberMax) : 1;
        var itr = numMax - numMin + 1;
        for (var j = 0; j < itr; j++) {
            temp[j] = j + numMin;
        }
        totalItr *= itr;
        armNumArray[i] = temp;
    }
    var combinations = [];
    var index = [];
    for (var i = 0; i < armNumArray.length; i++) {
        index[i] = 0;
    }

    var isDarkOpusArray = [];
    var isHollowskyArray = []; //isAkasha
    for (var i = 0; i < arml.length; i++) {
        isDarkOpusArray[i] = module.exports.isDarkOpus(arml[i]);
        isHollowskyArray[i] = module.exports.isHollowsky(arml[i]);

    }
    let maxSize = 0;
    for (var i = 0; i < totalItr; i = (i + 1) | 0) {
        var temp = [];
        var num = 0;
        var isDarkOpusIncluded = false;
        var isHollowskyIncluded = false;
        var isValidCombination = true;
        for (var j = 0; j < armNumArray.length; j = (j + 1) | 0) {
            if (!isDarkOpusArray[j] && !isHollowskyArray[j]) {
                temp.push(armNumArray[j][index[j]]);
                num += parseInt(armNumArray[j][index[j]])
            } else {
                if (armNumArray[j][index[j]] == 0) {
                    temp.push(armNumArray[j][index[j]]);
                } else if (armNumArray[j][index[j]] > 0 && armNumArray[j][index[j]] <= 1 && isHollowskyArray[j] && !isHollowskyIncluded) {
                    temp.push(armNumArray[j][index[j]]);
                    num += parseInt(armNumArray[j][index[j]]);
                    isHollowskyIncluded = true;
                } else if (armNumArray[j][index[j]] > 0 && armNumArray[j][index[j]] <= 1 && isDarkOpusArray[j] && !isDarkOpusIncluded) {
                    temp.push(armNumArray[j][index[j]]);
                    num += parseInt(armNumArray[j][index[j]]);
                    isDarkOpusIncluded = true;
                } else {
                    isValidCombination = false;
                }
            }
        }
        if (isValidCombination && ((totalItr <= 1024 && num <= 10) || num === 10)) {
            combinations.push(temp);
            maxSize = Math.max(maxSize, num);
        }
        index = module.exports.proceedIndex(index, armNumArray, 0)
    }
    return module.exports.filterCombinations(combinations, maxSize, ruleMaxSize);
};

module.exports.getTypeBonus = function (self_elem, enemy_elem) {
    var t_enemy_elem = enemy_elem != undefined ? enemy_elem : "fire";
    var t_elem = self_elem != undefined ? self_elem : "fire";

    if (elementRelation[t_elem]["weak"] == t_enemy_elem) {
        return 0.75
    }
    if (elementRelation[t_elem]["strong"] == t_enemy_elem) {
        return 1.5
    }
    return 1.0
},

    module.exports.getTypeBonusStr = function (self_elem, enemy_elem) {
        switch (module.exports.getTypeBonus(self_elem, enemy_elem)) {
            case 1.0:
                return "非有利";
            case 1.5:
                return "有利";
            case 0.75:
                return "不利";
            default:
                return "非有利"
        }
    };

module.exports.makeSummonHeaderString = function (summon, locale, idx=0) {
    var summonHeader = "";
    if (idx > 0) {
        // Don't remove "idx"
        // summonHeader must be unique as dictionary key
        summonHeader += "No." + idx + " ";
    }
    if (summon.selfSummonType == "odin") {
        summonHeader += intl.translate("属性攻", locale) + summon.selfSummonAmount + intl.translate("キャラ攻", locale) + summon.selfSummonAmount2
    } else {
        summonHeader += intl.translate(summonElementTypes[summon.selfElement].name, locale) + intl.translate(summonTypes[summon.selfSummonType], locale) + summon.selfSummonAmount
    }

    summonHeader += " + ";
    if (summon.friendSummonType == "odin") {
        summonHeader += intl.translate("属性攻", locale) + summon.friendSummonAmount + intl.translate("キャラ攻", locale) + summon.friendSummonAmount2
    } else {
        summonHeader += intl.translate(summonElementTypes[summon.friendElement].name, locale) + intl.translate(summonTypes[summon.friendSummonType], locale) + summon.friendSummonAmount
    }
    return summonHeader;
};

module.exports.calcDefenseDebuff = function (defense, debuff) {
    defense = defense != undefined ? defense : 10.0;
    debuff = debuff != undefined ? debuff : 0;

    return Math.max(1, defense * (1 - debuff * 0.01));
};

module.exports.calcDamage = function (summedAttack, totalSkillCoeff, criticalRatio, enemyDefense, defenseDebuff, enemyResistance, additionalDamage, damageUP, limitValues) {
    // Damage calculation
    var def = module.exports.calcDefenseDebuff(enemyDefense, defenseDebuff);
    var damage = Math.ceil(summedAttack / def) * totalSkillCoeff * criticalRatio;
    var overedDamage = 0;

    for (const [limitValue, limitRatio] of limitValues) {
        // Damage cap calculation

        // Subtract only by the extent exceeding the attenuation line
        if (damage > limitValue) {
            overedDamage += limitRatio * (damage - limitValue);
            damage = limitValue;
        }
    }

    var res = damage + overedDamage;

    res *= Math.max(1.0, 1.0 + additionalDamage);
    // "Granted Damage Increase" is a correction after attenuation
    res *= Math.max(1.0, 1.0 + damageUP);
    res *= Math.max(0.0, Math.min(1.0, 1.0 - enemyResistance));

    return res;
};

module.exports.calcOugiDamage = function (summedAttack, totalSkillCoeff, criticalRatio, enemyDefense, defenseDebuff, enemyResistance, ougiRatio, ougiDamageUP, damageUP, ougiFixedDamage, ougiBonusPlainDamage, limitValues) {
    // Damage calculation
    var def = module.exports.calcDefenseDebuff(enemyDefense, defenseDebuff);
    var damage = (1.0 + ougiDamageUP) * ougiRatio * Math.ceil(summedAttack / def) * totalSkillCoeff * criticalRatio;
    damage += ougiFixedDamage * criticalRatio;
    var overedDamage = 0.0;

    for (const [limitValue, limitRatio] of limitValues) {
        // Damage cap calculation

        // Subtract only by the extent exceeding the attenuation line
        if (damage > limitValue) {
            overedDamage += limitRatio * (damage - limitValue);
            damage = limitValue;
        }
    }

    // The final damage becomes the correction amount + the minimum attenuation line
    damage = damage + overedDamage;

    // Damage raised
    damage *= Math.max(1.0, 1.0 + damageUP);
    damage *= Math.max(0.0, Math.min(1.0, 1.0 - enemyResistance));
    damage += ougiBonusPlainDamage;

    return damage;

};

function calcOugiFixedDamage(key) {
    return (key == "Djeeta") ? 3000 : 2000;
}
module.exports.calcOugiFixedDamage = calcOugiFixedDamage;

module.exports.calcChainBurst = function (ougiDamage, chainNumber, typeBonus, enemyResistance, chainDamageUP, chainDamageLimitUP) {
    if (chainNumber <= 1) return 0.0;

    var chainCoeff = 0.0;
    if (chainNumber === 2) {
        chainCoeff = 0.25;
    } else if (chainNumber === 3) {
        chainCoeff = 1.0 / 3.0;
    } else {
        // full or over chain
        chainCoeff = 0.50;
    }

    var chainDamageLimit = chainDamageLimitUP != undefined ? chainDamageLimitUP : 0.0;
    var damage = (1.0 + chainDamageUP) * typeBonus * chainCoeff * ougiDamage;
    var overedDamage = 0.0;

    if (chainNumber <= 2) {
        var limitValues = [[1500000, 0.01], [1300000, 0.05], [1200000, 0.30], [1000000, 0.60]]
    } else if (chainNumber === 3) {
        var limitValues = [[2000000, 0.01], [1500000, 0.05], [1450000, 0.30], [1250000, 0.60]]
    } else {
        var limitValues = [[2500000, 0.01], [1800000, 0.05], [1700000, 0.30], [1500000, 0.60]]
    }

    for (var index = 0; index < 4; index++) {
        // Damage cap calculation
        var limitValue = limitValues[index][0] * (1.0 + chainDamageLimit);
        var limitRatio = limitValues[index][1];

        // Subtract only by the extent exceeding the attenuation line
        if (damage > limitValue) {
            overedDamage += limitRatio * (damage - limitValue);
            damage = limitValue
        }
    }

    // The final damage becomes the correction amount + the minimum attenuation line
    damage = damage + overedDamage;
    damage *= Math.max(0.0, Math.min(1.0, 1.0 - enemyResistance));

    return damage;
};

module.exports.calcCriticalArray = function (_normalCritical, _magnaCritical, normalOtherCritical, summon) {
    // Store each occurrence probability
    var probability = [];
    // Store the corresponding magnification
    var damageRatio = [];
    //'ignore' any undefined
    _normalCritical = _normalCritical == undefined ? 0 : _normalCritical;
    _magnaCritical = _magnaCritical == undefined ? 0 : _magnaCritical;
    normalOtherCritical = normalOtherCritical.filter((val) => val != undefined);

    var magnaCritical = 0.01 * _magnaCritical * summon["magna"];
    if (magnaCritical > 1.0) {
        probability.push(1.0);
        damageRatio.push(0.5);
    } else if (magnaCritical > 0.0) {
        probability.push(magnaCritical);
        damageRatio.push(0.5);
    }

    var normalCritical = 0.01 * _normalCritical * summon["zeus"];
    if (normalCritical > 1.0) {
        probability.push(1.0);
        damageRatio.push(0.5);
    } else if (normalCritical > 0.0) {
        probability.push(normalCritical);
        damageRatio.push(0.5);
    }

    // Normal other critical skill array is passed in the form of [probability 1, probability 2, probability 3, ...]
    // Critical for LB and Support abilities
    for (var j = 0; j < normalOtherCritical.length; j++) {
        probability.push(normalOtherCritical[j]["value"]);
        damageRatio.push(normalOtherCritical[j]["attackRatio"]);
    }

    // Up to 10 elements + LB + character critical skill in array
    // The magnification and the activation rate are different
    // There are up to 2 ^ n activation probabilities when n elements
    // If you set the array to {activation rate: {activation number: x, case: 1}} then use keys to get the expected value
    // {Damage magnification: {activation probability: x}},
    // In the case of the same magnification, the activation probability should be added
    var criticalRatioArray = {};

    if (probability.length > 0) {
        var bitmask = [];
        for (var i = 0; i < probability.length; i++) {
            bitmask.push(1 << i);
        }

        for (var i = 0; i < Math.pow(2, probability.length); i++) {
            var eachProb = 1.0;
            var attackRatio = 1.0;

            for (var j = 0; j < probability.length; j++) {
                if ((bitmask[j] & i) > 0) {
                    // The jth critical skill invoked
                    eachProb *= probability[j];
                    attackRatio += damageRatio[j]
                } else {
                    // The jth critical skill is not invoked
                    eachProb *= 1.0 - probability[j]
                }
            }

            // The activation rate of one case up to here was able to be calculated
            if (eachProb > 0.0) {
                if (eachProb > 1.0) eachProb = 1.0;

                if (!(attackRatio in criticalRatioArray)) {
                    // If ratio does not exist
                    criticalRatioArray[attackRatio] = eachProb
                } else {
                    // If ratio exists
                    criticalRatioArray[attackRatio] += eachProb
                }
            }
        }
    }
    return criticalRatioArray;
};

module.exports.calcCriticalRatio = function (criticalRatioArray) {
    var criticalRatio = 0.0;

    if (Object.keys(criticalRatioArray).length > 0) {
        for (var attackRatio in criticalRatioArray) {
            criticalRatio += attackRatio * criticalRatioArray[attackRatio]
        }
    } else {
        criticalRatio = 1.0
    }

    return criticalRatio
};

module.exports.calcCriticalDeviation = function (criticalRatioArray) {
    var expectedValue = module.exports.calcCriticalRatio(criticalRatioArray);
    var variance = 0.0;

    for (var attackRatio in criticalRatioArray) {
        variance += criticalRatioArray[attackRatio] * Math.pow((attackRatio - expectedValue), 2)
    }

    return Math.sqrt(variance);
};

module.exports.calcBasedOneSummon = function (summonind, prof, buff, totals) {
    var res = {};

    for (var key in totals) {
        var totalSummon = totals[key]["totalSummon"][summonind];

        // hp magnification
        var hpCoeff = 1.0;
        hpCoeff += 0.01 * totals[key]["normalHP"] * totalSummon["zeus"] * (1 + totals[key]["aegisUP"]);
        hpCoeff += 0.01 * totals[key]["magnaHP"] * totalSummon["magna"] * (1 + totals[key]["aegisUP"]);
        hpCoeff += 0.01 * totals[key]["unknownHP"] * totalSummon["ranko"];
        hpCoeff += 0.01 * totals[key]["exHP"];
        hpCoeff += 0.01 * totals[key]["bahaHP"];
        hpCoeff += 0.01 * totals[key]["omegaNormalHP"];
        hpCoeff += 0.01 * totals[key]["akashaHP"];
        hpCoeff += buff["hp"];
        hpCoeff += totalSummon["hpBonus"];
        if (key == "Djeeta") {
            hpCoeff += 0.01 * totals["Djeeta"]["job"].shugoBonus;
        }
        if (totals[key]["EXLB"]["WED"]) {
            hpCoeff += 0.10;
        }
        hpCoeff *= 1.0 + totals[key]["HPBuff"];
        hpCoeff *= 1.0 - Math.min(0.70, totals[key]["HPdebuff"]);

        // Base HP
        var displayHP = totals[key]["baseHP"];
        displayHP += totals[key]["armHP"];
        displayHP += totalSummon["hp"];

        if (key == "Djeeta") {
            // for Djeeta
            // ATK
            var summedAttack = totals[key]["baseAttack"];
            summedAttack += totals[key]["armAttack"];
            summedAttack += totalSummon["attack"];
            summedAttack += totals["Djeeta"]["job"].atBonus;
            summedAttack *= 1.0 + buff["master"];
            // HP
            displayHP += totals["Djeeta"]["job"].hpBonus;
            displayHP *= 1.0 + buff["masterHP"];
            var totalHP = displayHP * hpCoeff

        } else {
            // for character
            // ATK
            var summedAttack = totals[key]["baseAttack"];
            summedAttack += totals[key]["armAttack"];
            summedAttack += totalSummon["attack"];
            summedAttack += totals[key]["LB"].ATK;
            summedAttack += totals[key]["EXLB"].ATK;
            summedAttack += totals[key]["plusBonus"] * 3;

            // HP
            displayHP += totals[key]["LB"].HP;
            displayHP += totals[key]["EXLB"].HP;
            displayHP += totals[key]["plusBonus"];
            var totalHP = displayHP * hpCoeff;
        }

        if (totals[key]["remainHP"] == 0) {
            totals[key]["remainHP"] = 1.0 / parseFloat(totalHP);
        }

        // Calculation of various attack coefficients  各種攻刃係数の計算
        var magnaCoeff = 1.0 + (0.01 * totals[key]["magna"] + 0.01 * totals[key]["magnaSoka"]) * totalSummon["magna"];
        var magnaHaisuiCoeff = 1.0 + 0.01 * (totals[key]["magnaHaisui"] * totalSummon["magna"]);
        var magnaKonshinCoeff = 1.0 + 0.01 * (totals[key]["magnaKonshin"] * totalSummon["magna"]);
        var exCoeff = 1.0 + 0.01 * totals[key]["unknown"] * totalSummon["ranko"];
        exCoeff += 0.01 * totals[key]["ex"];
        exCoeff += 0.01 * totals[key]["akashaATK"];
        exCoeff += 0.01 * totals[key]["akashaSensei"];
        exCoeff += totals[key]["dracoATK"]
        var exHaisuiCoeff = 1.0 + 0.01 * totals[key]["exHaisui"];
        var normalCoeff = 1.0 + (0.01 * totals[key]["normal"] + 0.01 * totals[key]["normalSoka"]) * totalSummon["zeus"];
        normalCoeff += 0.01 * totals[key]["normalOther"];
        normalCoeff += 0.01 * totals[key]["bahaAT"];
        normalCoeff += 0.01 * totals[key]["omegaNormal"];
        normalCoeff += totalSummon["chara"];
        normalCoeff += buff["normal"];
        normalCoeff += totals[key]["normalBuff"];
        // Add pre-emptive to normal attack 先制を通常攻刃へ加算
        normalCoeff += 0.01 * totals[key]["sensei"];
        if (key == "Djeeta") {
            normalCoeff += 0.01 * totals["Djeeta"]["job"].kouzinBonus;
        }

        var normalHaisuiCoeff = 1.0 + 0.01 * totals[key]["normalHaisui"] * totalSummon["zeus"];
        normalHaisuiCoeff += 0.01 * totals[key]["normalOtherHaisui"];

        var normalKonshinCoeff = 1.0 + 0.01 * totals[key]["normalKonshin"] * totalSummon["zeus"];
        normalKonshinCoeff += 0.01 * totals[key]["normalOtherKonshin"];
        normalKonshinCoeff += 0.01 * Math.max(totals[key]["normalSupportKonshin"], totals[key]["normalSupportKonshinWeapon"]);

        var LBKonshinCoeff = 1.0 + module.exports.calcLBHaisuiValue("EXLBKonshin", totals[key]["EXLB"]["Konshin"], totals[key]["remainHP"]);

        // Also calculate the attribute (elapsed turn) with the maximum value 属性(経過ターン)も最大値で計算する
        var elementCoeff = totals[key]["typeBonus"];
        elementCoeff += totalSummon["element"] - 1.0;
        elementCoeff += totalSummon["elementTurn"] - 1.0;
        elementCoeff += buff["element"];
        elementCoeff += totals[key]["elementBuff"];
        elementCoeff += totals[key]["elementBuffBoostBuff"];
        elementCoeff += 0.01 * totals[key]["shinTenNoInori"];
        elementCoeff += 0.01 * totals[key]["LB"].Element;

        // 進境
        let normalElement = totals[key]["opusnormalElement"] * totalSummon["zeus"];
        normalElement += totals[key]["opusmagnaElement"] * totalSummon["magna"];
        normalElement += totals[key]["normalElement"] * totalSummon["zeus"];
        elementCoeff += Math.min(normalElement, 0.75);

        if (key == "Djeeta") {
            elementCoeff += buff["zenithElement"];
        }

        var otherCoeff = 1.0 + buff["other"];
        otherCoeff *= 1.0 + buff["other2"];
        otherCoeff *= 1.0 + totals[key]["otherBuff"];
        otherCoeff *= 1.0 + totals[key]["otherBuff2"];
        // Category of "Shield of Eternal Splendor". (総べ称号枠)
        var otherEternal = 1.0 + totals[key]["caimOther"];
        if (totals[key]["EXLB"]["WED"]) {
            otherEternal += 0.10;
        }
        otherCoeff *= otherEternal;
        if (key == "Djeeta") {
            // Verified by weapon users, not by wiki
            otherCoeff *= 1.0 + (0.01 * totals[key]["slaysnakes_myth"]);
            otherCoeff *= 1.0 + (0.01 * totals[key]["victorys_promise"]);
        }
        otherCoeff *= prof.retsujitsuNoRakuen ? 1.20 : 1;
        otherCoeff *= prof.shiToAiNoSekai ? 1.20 : 1;

        otherCoeff *= totalSummon["shivaBuff"] ? 2.0 : 1;

        // Character Emnity
        var charaHaisuiCoeff = 1.0 + 0.01 * totals[key]["charaHaisui"] + 0.01 * totals[key]["normalSupportHaisuiWeapon"];

        //chara LB Emnity
        var LBHaisuiCoeff = 1.0 + module.exports.calcLBHaisuiValue("EXLBHaisui", totals[key]["EXLB"]["Haisui"], totals[key]["remainHP"]);

        var totalSkillCoeff = normalCoeff * normalHaisuiCoeff * normalKonshinCoeff;
        totalSkillCoeff *= magnaCoeff * magnaHaisuiCoeff * magnaKonshinCoeff;
        totalSkillCoeff *= exCoeff * exHaisuiCoeff;
        totalSkillCoeff *= elementCoeff;
        totalSkillCoeff *= otherCoeff;
        totalSkillCoeff *= charaHaisuiCoeff;
        totalSkillCoeff *= LBHaisuiCoeff;
        totalSkillCoeff *= LBKonshinCoeff;
        totalSkillCoeff -= totals[key]["ATKDebuff"];
        var totalAttack = summedAttack * totalSkillCoeff;

        // Lowest HP limit = 1
        if (totalHP <= 0) totalHP = 1;

        // for DA and TA
        var normalNite = totals[key]["normalNite"] * totalSummon["zeus"];
        normalNite += totals[key]["normalOtherNite"];
        var magnaNite = totals[key]["magnaNite"] * totalSummon["magna"];
        var normalSante = totals[key]["normalSante"] * totalSummon["zeus"] + totals[key]["normalOtherSante"];
        var magnaSante = totals[key]["magnaSante"] * totalSummon["magna"];
        var exNite = Math.min(LIMIT.exDA, totals[key]["exNite"]);

        // DATA upper limit
        // Normal * Magna * EX * Baha * Cosmos BL
        // DATA debuff for Rasetsu

        var armDAupNormal = Math.min(LIMIT.normalDA, normalNite + normalSante);
        var armDAupMagna = Math.min(LIMIT.magnaDA, magnaNite + magnaSante);
        var armDAupBaha = Math.min(LIMIT.bahaDA, totals[key]["bahaDA"]);
        var armDAupCosmos = Math.min(LIMIT.cosmosDA, totals[key]["cosmosBL"]);
        var armDAupOther = Math.min(LIMIT.otherDA, totals[key]["DAOther"]); // 99999 for no limit

        // unknown never reaches 50% of the current situation
        var totalDA = 0.01 * totals[key]["baseDA"];
        totalDA += 0.01 * totals[key]["LB"]["DA"];
        totalDA += 0.01 * totals[key]["EXLB"]["DA"];
        totalDA += buff["da"];
        totalDA += totals[key]["DASupport"];
        totalDA += totals[key]["DABuff"];
        totalDA += totalSummon["da"];
        totalDA += 0.01 * (armDAupNormal + armDAupMagna + exNite + armDAupBaha + armDAupCosmos + armDAupOther);
        if (key == "Djeeta") {
            totalDA += buff["masterDA"];
            totalDA += buff["zenithDA"];
        }

        // Fit 0% < DA < 100%
        totalDA = Math.min(1.0, Math.max(0.0, totalDA));

        // skill that rises only TA is called LesserSante
        var normalLesserSante = totals[key]["normalLesserSante"] * totalSummon["zeus"];
        normalLesserSante += totals[key]["normalOtherLesserSante"];
        var magnaLesserSante = totals[key]["magnaLesserSante"] * totalSummon["magna"];
        var armTAupNormal = Math.min(LIMIT.normalTA, normalSante + normalLesserSante);
        var armTAupMagna = Math.min(LIMIT.magnaTA, magnaSante + magnaLesserSante);
        var armTAupBaha = Math.min(LIMIT.bahaTA, totals[key]["bahaTA"]);
        var armTAupOther = Math.min(LIMIT.otherTA, totals[key]["TAOther"]); // UNUSED  // 99999 for no limit

        var totalTA = 0.01 * totals[key]["baseTA"];
        totalTA += 0.01 * totals[key]["LB"]["TA"];
        totalTA += 0.01 * totals[key]["EXLB"]["TA"];
        totalTA += buff["ta"];
        totalTA += totals[key]["TASupport"];
        totalTA += totals[key]["TABuff"];
        totalTA += totalSummon["ta"];
        totalTA += 0.01 * (armTAupNormal + armTAupMagna + armTAupBaha + armTAupOther);
        if (key == "Djeeta") {
            totalTA += buff["masterTA"];
            totalTA += buff["zenithTA"];
            totalTA += 0.01 * totals[key]["superTA"];
        }

        // Fit 0% < TA < 100%
        totalTA = Math.min(1.0, Math.max(0.0, totalTA));

        var taRate = Math.min(1.0, Math.floor(totalTA * 100) / 100); // Truncated values are used to calculate multi attack.
        var daRate = Math.min(1.0, Math.floor(totalDA * 100) / 100);
        var expectedAttack = 3.0 * taRate + (1.0 - taRate) * (2.0 * daRate + (1.0 - daRate));

        // damageUP is 与ダメージ上昇(e.g. seraphic weapons)
        // The final damage will be boosted by the this.
        let damageUP = 0;
        let damageUPOnlyNormalDamage = totals[key]["charaUniqueDamageUP"];
        if (totals[key]["typeBonus"] == 1.5) {
            // Supplemental damage rise support ability does not overlap with Tenshi skill (the strongest effect overwrites the lesser)
            damageUP += Math.max(totals[key]["tenshiDamageUP"], totals[key]["charaDamageUP"]);
            damageUP += 0.01 * totalSummon["tenshiDamageUP"];
            damageUPOnlyNormalDamage += totals[key]["damageUPOnlyNormalBuff"] + buff["damageUPOnlyNormal"];
        }

        var criticalArray = {};
        var criticalRatio = 1.0;
        if (totals[key]["typeBonus"] == 1.5
            || prof.enemyElement == "non-but-critical"
            || prof.retsujitsuNoRakuen
        ) {
            let LBCriticalArray = getLBCriticalArray(totals[key]["LB"]);
            let EXLBCriticalArray = getEXLBCriticalArray(totals[key]["EXLB"]["Critical"]);
            let normalOtherCriticalBuffArray = totals[key]["normalOtherCriticalBuff"];
            let normalOtherCriticalArray = totals[key]["normalOtherCritical"].concat(
                LBCriticalArray,
                EXLBCriticalArray,
                normalOtherCriticalBuffArray,
                totals[key]["criticalBuff"] || [],
                buff["criticalBuff"]
             );

            criticalArray = module.exports.calcCriticalArray(totals[key]["normalCritical"], totals[key]["magnaCritical"], normalOtherCriticalArray, totalSummon);
            criticalRatio = module.exports.calcCriticalRatio(criticalArray);
        }

        //Enemy (Elemental) Resistance if not superior element.
        var enemyResistance = totals[key]["typeBonus"] == 1.5 ? 0 : Math.max(0, Math.min(1.0, 0.01 * parseFloat(prof.enemyResistance)));

        var criticalAttack = parseInt(totalAttack * criticalRatio);

        //critical attack ratio (to be a critical, regardless of damage multiplier)
        var critRate = 0;
        if (Object.keys(criticalArray).length > 0) {
            critRate = 1.0 - (isNaN(criticalArray[1.0]) ? 0 : Math.max(0, Math.min(1, criticalArray[1.0])));
        }
        var effectiveCriticalLimit = critRate * totals[key]["criticalDamageLimit"];

        //ougi gauge calculation
        //while exact uplift effect does not stack. special effects that could lead to uplift like Linkage (SS Grea) does stack with normal uplift.
        var uplift = 100 * (buff["uplift"] + totals[key]["uplift"]);
        var ougiGageBuff = buff["ougiGage"] + totals[key]["ougiGageBuff"] + (0.01 * totals[key]["LB"]["OugiGageBuff"]) - totals[key]["ougiDebuff"];
        const gainOugiGage = totals[key]["gainOugiGage"];

        var expectedOugiGage = Math.ceil(uplift * ougiGageBuff);
        expectedOugiGage += (taRate * Math.ceil(37.0 * ougiGageBuff) + (1.0 - taRate) * (daRate * Math.ceil(22.0 * ougiGageBuff) + (1.0 - daRate) * Math.ceil(10.0 * ougiGageBuff)));
        expectedOugiGage += Math.ceil(gainOugiGage * ougiGageBuff);
        // Speed up charge bar during one-foe attacks
        if (key == "Djeeta") {
            let ougiGageDuringAttack = buff["masterBonusOugiGage"];
            expectedOugiGage += taRate * ougiGageDuringAttack * 3 + (1.0 - taRate) * (daRate * ougiGageDuringAttack * 2 + (1.0 - daRate) * ougiGageDuringAttack);
        }
        expectedOugiGage = expectedOugiGage < 0 ? 0 : Math.max(1.0, expectedOugiGage);

        var ougiGageUpOugiBuff = buff["ougiGageUpOugi"] * ougiGageBuff;
        var ougiGage = 100 - Math.min(99, ougiGageUpOugiBuff);
        var minimumTurn = Math.ceil(ougiGage / ((uplift + 37.0) * ougiGageBuff));
        var expectedTurn = Math.max(minimumTurn, ougiGage / expectedOugiGage);

        // "additionalDamage" considers the Fourth Pursuit effect as a normal frame
        var additionalDamage = 0.01 * totals[key]["additionalDamage"] * totalSummon["zeus"];
        additionalDamage += totals[key]["additionalDamageBuff"];
        additionalDamage += buff["additionalDamage"];
        additionalDamage += prof.shiToAiNoSekai ? 0.30 : 0;
        if (key == "Djeeta") {
            additionalDamage += totals[key]["superAdditionalDamage"];
        }
        if (this.sum(totals[key]["additionalDamageXA"]) > 0) {
            //additionalDamage based on attacks per turn (sturm support ability-like)
            let [saDamage, daDamage, taDamage] = totals[key]["additionalDamageXA"];
            additionalDamage += taRate * taDamage; // additionalDamage On Triple Attack
            additionalDamage += (1.0 - taRate) * daRate * daDamage; // additionalDamage On Double Attack
            additionalDamage += (1.0 - taRate) * (1.0 - daRate) * saDamage; // additionalDamage On Single Attack
        }
        if (totals[key]['echoThirdHit'] > 0 && taRate > 0) {
            additionalDamage += totals[key]['echoThirdHit'] * taRate / 3
        }

        // Damage limit UP = Overall buff + Personal buff + skill
        var damageLimit = buff["damageLimit"];
        damageLimit += totals[key]["damageLimitBuff"];
        damageLimit += Math.min(0.20, totals[key]["normalDamageLimit"] + totals[key]["cosmosNormalDamageLimit"]);
        damageLimit += Math.min(0.10, totals[key]["omegaNormalDamageLimit"]);
        damageLimit += totals[key]["caimDamageLimit"];
        damageLimit += 0.01 * totalSummon["damageLimit"];
        if (totals[key]["EXLB"]["WED"]) {
            damageLimit += 0.05;
        }
        // Mystery damage upper limit UP = whole buff + individual buff + skill + damage upper limit UP minutes
        // The upper limit of skill of mystery damage is 30%
        var ougiDamageLimitByExceed = Math.min(0.30, totals[key]["exceedOugiDamageLimit"]);
        var ougiDamageLimitByNormal = Math.min(0.30, totals[key]["normalOugiDamageLimit"] * totalSummon["zeus"]);
        var ougiDamageLimitByMagna = Math.min(0.30, totals[key]["magnaOugiDamageLimit"] * totalSummon["magna"]);
        var ougiDamageLimit = Math.min(0.60, (ougiDamageLimitByMagna + ougiDamageLimitByNormal + ougiDamageLimitByExceed));
        ougiDamageLimit += Math.min(0.20, totals[key]["ougiDamageLimit"] + totals[key]["cosmosNormalDamageLimit"]);
        ougiDamageLimit += Math.min(0.15, totals[key]["omegaOugiDamageLimit"]);
        ougiDamageLimit += buff["ougiDamageLimit"] + totals[key]["ougiDamageLimitBuff"];
        ougiDamageLimit += totals[key]["caimDamageLimit"];
        ougiDamageLimit += 0.01 * totalSummon["damageLimit"];
        ougiDamageLimit += 0.01 * totals[key]["LB"]["OugiDamageLimit"];
        ougiDamageLimit += 0.01 * totals[key]["EXLB"]["OugiDamageLimit"];
        if (totals[key]["EXLB"]["WED"]) {
            ougiDamageLimit += 0.05;
        }
        // Chain Burst
        var chainDamageLimit = 0.01 * (totals[key]["chainDamageLimit"] + (totals[key]["normalChainDamageLimit"] * totalSummon["zeus"]));
        chainDamageLimit = Math.min(LIMIT.chainDamageLimit, chainDamageLimit);

        chainDamageLimit += buff["zenithChainDamageLimit"];


        // Mystery damage = magnification * (1 + mystery damage buff frame) * (1 + mystery damage rise skill frame)
        // Save only the coefficient part (100% + delta of delta) for common processing

        var ougiDamageByCosmosAT = Math.min(20, totals[key]["cosmosAT"]);
        var ougiDamageByNormal = Math.min(100, totals[key]["normalOugiDamage"] * totalSummon["zeus"]);
        var ougiDamageByMagna = Math.min(100, totals[key]["magnaOugiDamage"] * totalSummon["magna"]);
        var ougiDamageSkill = 0.01 * (ougiDamageByCosmosAT + ougiDamageByMagna + ougiDamageByNormal);

        var ougiDamageExceptSkill = totals[key]["ougiDamageBuff"] + totalSummon["ougiDamage"] + buff['ougiDamage'];
        ougiDamageExceptSkill += 0.01 * totals[key]["LB"]["OugiDamage"];
        ougiDamageExceptSkill += 0.01 * totals[key]["EXLB"]["OugiDamage"];

        if (key == "Djeeta") {
            ougiDamageExceptSkill += buff["zenithOugiDamage"];
            ougiDamageExceptSkill += totals[key]["superOugiDamage"];
        }

        var ougiDamageUP = (1.0 + ougiDamageSkill) * (1.0 + ougiDamageExceptSkill) - 1.0;

        // NOT plain additional damage such as Yodarha (SRR)
        var ougiFixedDamage = calcOugiFixedDamage(key);

        var chainDamageUP = 0.01 * (totals[key]["chainDamage"] + (totals[key]["normalChainDamage"] * totalSummon["zeus"]));
        chainDamageUP = Math.min(LIMIT.chainDamageUP, chainDamageUP);

        chainDamageUP += buff["zenithChainDamage"];

        if (key == "Djeeta") {
            damageLimit += buff["masterDamageLimit"] + buff["zenithDamageLimit"];
            ougiDamageLimit += buff["masterDamageLimit"] + buff["zenithDamageLimit"];
        }

        var criticalDamageLimit = damageLimit + effectiveCriticalLimit;
        var criticalOugiDamageLimit = ougiDamageLimit + effectiveCriticalLimit;

        var debuffResistanceByHigo = 0.01 * Math.min(30, totals[key]["debuffResistance"] * totalSummon["zeus"]);
        //Other than Higo skill category.
        var debuffResistanceByNormal = 0.01 * totals[key]["cosmosDebuffResistance"];
        var debuffResistance = 100 * (1.0 + debuffResistanceByHigo) * (1.0 + debuffResistanceByNormal) - 100;
        debuffResistance += 100 * totals[key]["debuffResistanceBuff"];

        // Generate LimitValues
        let normalDamageLimitValues = _initLimitValues(1.0 + criticalDamageLimit, BASE_LIMIT_VALUES.normalDamage);
        let normalDamageLimitValuesWithoutCritical = _initLimitValues(1.0 + damageLimit, BASE_LIMIT_VALUES.normalDamage);
        let ougiDamageLimitValues = _initLimitValues(1.0 + criticalOugiDamageLimit, BASE_LIMIT_VALUES.ougiDamage);
        let ougiDamageLimitValuesWithoutCritical = _initLimitValues(1.0 + ougiDamageLimit, BASE_LIMIT_VALUES.ougiDamage);

        if (totals[key]["ougiLimitValues"]) {
            ougiDamageLimitValues = _initLimitValues(1.0 + criticalOugiDamageLimit, totals[key]["ougiLimitValues"]);
            ougiDamageLimitValuesWithoutCritical = _initLimitValues(1.0 + ougiDamageLimit, totals[key]["ougiLimitValues"]);
        }

        const _addShivaLimitUp = (values) => values.map(([threshold, ratio]) => [threshold+500000, ratio]);
        if (totalSummon["shivaBuff"]) {
            normalDamageLimitValues = _initLimitValues(1.0 + criticalDamageLimit, BASE_LIMIT_VALUES.shivaNormalDamage);
            normalDamageLimitValuesWithoutCritical = _initLimitValues(1.0 + damageLimit, BASE_LIMIT_VALUES.shivaNormalDamage);
            ougiDamageLimitValues = _addShivaLimitUp(ougiDamageLimitValues);
            ougiDamageLimitValuesWithoutCritical = _addShivaLimitUp(ougiDamageLimitValuesWithoutCritical);
        }

        // "damage" is a single attack damage without additional damage (with attenuation and skill correction)
        var damage = module.exports.calcDamage(summedAttack, totalSkillCoeff, criticalRatio, prof.enemyDefense, prof.defenseDebuff, enemyResistance, additionalDamage, damageUP + damageUPOnlyNormalDamage, normalDamageLimitValues);

        // Use damage in case of no critical to correct skill expectation
        var damageWithoutCritical = module.exports.calcDamage(summedAttack, totalSkillCoeff, 1.0, prof.enemyDefense, prof.defenseDebuff, enemyResistance, additionalDamage, damageUP + damageUPOnlyNormalDamage, normalDamageLimitValuesWithoutCritical);

        // Expected critical skill ratio
        var effectiveCriticalRatio = damage / damageWithoutCritical;

        // Comprehensive attack power * Expected skill expectation * Multi-shot expected value
        var sougou_kaisuu_gikou = parseInt(totalAttack * criticalRatio * expectedAttack);

        var ougiDamage = module.exports.calcOugiDamage(summedAttack, totalSkillCoeff, criticalRatio, prof.enemyDefense, prof.defenseDebuff, enemyResistance, totals[key]["ougiRatio"], ougiDamageUP, damageUP, ougiFixedDamage, totals[key]["ougiBonusPlainDamage"], ougiDamageLimitValues);

        // Accuracy calculation
        var accuracy = 1.0;
        accuracy -= totals[key]["accuracyDebuff"];
        damage *= accuracy;
        damageWithoutCritical *= accuracy;

        var chainBurstSupplemental = 0;
        //Supplemental Damage is a "static" damage that is added after damage cap/defense/etc is calculated.
        var supplementalDamageArray = {};

        var supplementalDamageBuff = Math.ceil(
            Math.max(
                totals[key]["supplementalDamageBuff"],
                buff["supplementalDamageBuff"]
            ) * (1.0 - enemyResistance)
        );

        if (supplementalDamageBuff > 0) {
            supplementalDamageArray["バフ"] = {
                damage: supplementalDamageBuff,
                damageWithoutCritical: supplementalDamageBuff,
                ougiDamage: supplementalDamageBuff * (1.0 + damageUP),
                chainBurst: supplementalDamageBuff,
                type: "other",
            };
        }
        if (totals[key]["supplementalThirdHit"].length > 0) {
            for (let key2 in totals[key]["supplementalThirdHit"]) {
                let value = Math.ceil(taRate * totals[key]["supplementalThirdHit"][key2].value * (1.0 - enemyResistance));
                supplementalDamageArray[totals[key]["supplementalThirdHit"][key2].source] = {
                    damage: value,
                    type: "third_hit",
                    //extraValue: taRate,
                };
            }
        }
        if (totals[key]['covenant'] === "impervious") {
            let value = Math.ceil(30000 * (1.0 - enemyResistance));
            supplementalDamageArray["不壊の誓約"] = {
                damage: value,
                damageWithoutCritical: value,
                ougiDamage: value * (1.0 + damageUP),
                chainBurst: value,
                threshold: 0.80,
                type: "hp_based",
                //extraValue: totals[key].remainHP,
            };
        } else if (totals[key]['covenant'] === 'victorious' && totals['Djeeta']['buffCount'] > 0) {
            let djeetaBuffCount = Math.min(10, totals['Djeeta']['buffCount']);
            let value = Math.ceil(djeetaBuffCount * 3000 * (1.0 - enemyResistance));
            supplementalDamageArray["凱歌の誓約"] = {
                damage: value,
                damageWithoutCritical: value,
                ougiDamage: value * (1.0 + damageUP),
                chainBurst: value,
                type: "djeeta_buff_based",
                extraValue: djeetaBuffCount,
            };
        } else if (totals[key]['covenant'] === 'contentious' && taRate > 0) {
            let value = Math.ceil(taRate * 100000 * (1.0 - enemyResistance));
            supplementalDamageArray["修羅の誓約"] = {
                damage: value,
                type: "third_hit",
                //extraValue: taRate,
            };
        } else if (totals[key]['covenant'] === 'deleterious' && Object.keys(criticalArray).length > 0) {
            let value = Math.ceil(critRate * 30000 * (1.0 - enemyResistance));
            supplementalDamageArray["致命の誓約"] = {
                damage: value,
                damageWithoutCritical: 0,
                ougiDamage: value * (1.0 + damageUP),
                chainBurst: 0,
                type: "on_critical",
                extraValue: (100 * critRate).toFixed(2),
            };
        } else if (totals[key]['covenant'] === 'calamitous') {
            let enemyDebuffCount = Math.min(10, buff['enemyDebuffCount']);
            let value = Math.ceil(enemyDebuffCount * 3000 * (1.0 - enemyResistance));
            supplementalDamageArray["災禍の誓約"] = {
                damage: value,
                damageWithoutCritical: value,
                ougiDamage: value * (1.0 + damageUP),
                chainBurst: value,
                type: "boss_debuff_based",
                extraValue: enemyDebuffCount,
            };
        }

        [damage, damageWithoutCritical, ougiDamage, chainBurstSupplemental] = supplemental.calcOthersDamage(supplementalDamageArray, [damage, damageWithoutCritical, ougiDamage, chainBurstSupplemental], {remainHP: totals[key]["remainHP"]});
        // Chain burst damage is calculated based on the assumption that "there is only one who has the same damage as that character has chain number people"
        var chainBurst = chainBurstSupplemental + module.exports.calcChainBurst(buff["chainNumber"] * ougiDamage, buff["chainNumber"], module.exports.getTypeBonus(totals[key].element, prof.enemyElement), enemyResistance, chainDamageUP, chainDamageLimit);

        var expectedCycleDamagePerTurn;
        if (expectedTurn === Infinity) {
            expectedCycleDamagePerTurn = expectedAttack * damage;

            [damage, expectedCycleDamagePerTurn] = supplemental.calcThirdHitDamage(supplementalDamageArray, [damage, expectedCycleDamagePerTurn], {expectedTurn: 1});
        } else {
            // Normal attack * n times
            let expectedCycleDamage = expectedTurn * expectedAttack * damage;
            // Ougi + chain burst (buff ["chainNumber"] is 1 or more so division OK)
            expectedCycleDamage += ougiDamage + chainBurst / buff["chainNumber"];

            [damage, expectedCycleDamage] = supplemental.calcThirdHitDamage(supplementalDamageArray, [damage, expectedCycleDamage], {expectedTurn: expectedTurn});

            expectedCycleDamagePerTurn = expectedCycleDamage / (expectedTurn + 1.0);
        }

        // Display array
        var coeffs = {};
        coeffs["normal"] = normalCoeff;
        coeffs["normalHaisui"] = normalHaisuiCoeff;
        coeffs["normalKonshin"] = normalKonshinCoeff;
        coeffs["magna"] = magnaCoeff;
        coeffs["magnaHaisui"] = magnaHaisuiCoeff;
        coeffs["magnaKonshin"] = magnaKonshinCoeff;
        coeffs["element"] = elementCoeff;
        coeffs["ATKDebuff"] = 1.0 + totals[key]["ATKDebuff"];
        coeffs["ex"] = exCoeff;
        coeffs["exHaisui"] = exHaisuiCoeff;
        coeffs["charaHaisui"] = charaHaisuiCoeff;
        coeffs["LBHaisui"] = LBHaisuiCoeff;
        coeffs["LBKonshin"] = LBKonshinCoeff;
        coeffs["other"] = otherCoeff;
        coeffs["hpRatio"] = hpCoeff;
        coeffs["ougiGageBuff"] = ougiGageBuff - 1.0;
        coeffs["additionalDamage"] = additionalDamage;
        coeffs["additionalDamageXA"] = this.sum(totals[key]["additionalDamageXA"]) > 0 ? totals[key]["additionalDamageXA"] : null;
        coeffs["ougiDamageUP"] = ougiDamageUP;
        coeffs["chainDamageUP"] = chainDamageUP;
        coeffs["damageUP"] = damageUP;
        coeffs["damageUPOnlyNormalDamage"] = damageUPOnlyNormalDamage;
        coeffs["damageLimit"] = damageLimit;
        coeffs["ougiDamageLimit"] = ougiDamageLimit;
        coeffs["chainDamageLimit"] = chainDamageLimit;
        coeffs["criticalArray"] = criticalArray;
        coeffs["criticalDamageLimit"] = totals[key]["criticalDamageLimit"];
        coeffs["criticalOugiDamageLimit"] = totals[key]["criticalOugiDamageLimit"];
        coeffs["critRate"] = critRate;
        coeffs["enemyResistance"] = enemyResistance;
        coeffs["supplementalDamageArray"] = supplementalDamageArray;
        coeffs["uplift"] = 0.01 * uplift;

        // Consecutive shooting information
        coeffs["normalDA"] = armDAupNormal;
        coeffs["magnaDA"] = armDAupMagna;
        coeffs["exDA"] = exNite;
        coeffs["cosmosDA"] = armDAupCosmos;
        coeffs["bahaDA"] = armDAupBaha;
        coeffs["otherDA"] = (buff["da"] + totals[key]["DABuff"] + totalSummon["da"]) * 100 + armDAupOther;
        coeffs["normalTA"] = armTAupNormal;
        coeffs["magnaTA"] = armTAupMagna;
        coeffs["bahaTA"] = armTAupBaha;
        coeffs["otherTA"] = (buff["ta"] + totals[key]["TABuff"] + totalSummon["ta"]) * 100 + armTAupOther;

        coeffs["accuracyDebuff"] = 1.0 + totals[key]["accuracyDebuff"];

        res[key] = {
            totalAttack: Math.ceil(totalAttack),
            displayAttack: Math.ceil(summedAttack),
            totalSkillCoeff: totalSkillCoeff,
            totalHP: Math.round(totalHP),
            displayHP: Math.round(displayHP),
            remainHP: totals[key]["remainHP"],
            totalDA: totalDA,
            totalTA: totalTA,
            debuffResistance: debuffResistance,
            totalSummon: totalSummon,
            // For graphs
            fav1: totals[key]["fav1"],
            fav2: totals[key]["fav2"],
            element: totals[key]["element"],
            expectedAttack: expectedAttack,
            criticalAttack: criticalAttack,
            criticalRatio: criticalRatio,
            effectiveCriticalRatio: effectiveCriticalRatio,
            totalExpected: sougou_kaisuu_gikou,
            skilldata: coeffs,
            expectedOugiGage: expectedOugiGage,
            // Tips and tricks
            damage: damage * expectedAttack,
            // Net damage
            pureDamage: damageWithoutCritical,
            // Only skill
            damageWithCritical: damage,
            // Only consecutive shots
            damageWithMultiple: damageWithoutCritical * expectedAttack,
            ougiRatio: totals[key]["ougiRatio"],
            ougiDamage: ougiDamage,
            ougiFixedDamage: ougiFixedDamage,
            ougiBonusPlainDamage: totals[key]["ougiBonusPlainDamage"],
            chainBurst: chainBurst,
            expectedTurn: expectedTurn,
            expectedCycleDamagePerTurn: expectedCycleDamagePerTurn,
            exlbHaisui: totals[key]["EXLB"]["Haisui"],
            exlbKonshin: totals[key]["EXLB"]["Konshin"],
            normalDamageLimitValues: normalDamageLimitValues,
            ougiDamageLimitValues: ougiDamageLimitValues,
            normalDamageLimitValuesWithoutCritical: normalDamageLimitValuesWithoutCritical,
            ougiDamageLimitValuesWithoutCritical: ougiDamageLimitValuesWithoutCritical,
        };
    }

    var average = 0.0;
    var crit_average = 0.0;
    var totalExpected_average = 0.0;
    var averageCyclePerTurn = 0.0;
    var averageChainBurst = 0.0;
    var totalOugiDamage = 0.0;

    var cnt = 0.0;
    for (key in res) {
        if (totals[key]["isConsideredInAverage"]) {
            average += res[key].totalAttack;
            crit_average += res[key].criticalAttack;
            totalExpected_average += res[key].totalExpected;
            averageCyclePerTurn += res[key].expectedCycleDamagePerTurn;
            averageChainBurst += res[key].chainBurst;
            totalOugiDamage += res[key].ougiDamage;
            cnt += 1.0
        }
    }

    res["Djeeta"]["averageAttack"] = average / cnt;
    res["Djeeta"]["averageCriticalAttack"] = crit_average / cnt;
    res["Djeeta"]["averageTotalExpected"] = totalExpected_average / cnt;
    res["Djeeta"]["averageCyclePerTurn"] = averageCyclePerTurn / cnt;
    res["Djeeta"]["averageChainBurst"] = averageChainBurst / cnt;
    res["Djeeta"]["totalOugiDamage"] = totalOugiDamage;
    res["Djeeta"]["totalOugiDamageWithChain"] = totalOugiDamage + res["Djeeta"]["averageChainBurst"];

    for (var key in totals) {
        res[key]["totalOugiDamage"] = totalOugiDamage;
        res[key]["ougiDamageWithChainDamage"] = totalOugiDamage + res["Djeeta"]["averageChainBurst"];
    }

    return res;
};

module.exports.getTesukatoripokaAmount = function (amount, numOfRaces) {
    if (amount == 100 || amount == 120 || amount == 130) {
        var resultAmount = 10;
        switch (numOfRaces) {
            case 1:
                break;
            case 2:
                resultAmount = 30;
                break;
            case 3:
                resultAmount = 60;
                break;
            case 4:
                resultAmount = 100;
                break;
        }
        if (amount == 120) {
            resultAmount += 20;
        } else if (amount == 130) {
            resultAmount += 30;
        }
        return resultAmount;
    }
    return 0;
};

module.exports.checkNumberOfRaces = function (chara) {
    // check num of races
    var includedRaces = {
        "human": false,
        "erune": false,
        "doraf": false,
        "havin": false,
        "seisho": false,
        "unknown": true,
    };
    // Since there is a Djeeta, the unknown field is always true
    // The initial value of ind can also start from 1
    var ind = 1;
    for (var key in chara) {
        if (chara[key].name != "" && chara[key].isConsideredInAverage) {
            // only front line
            if (ind < 4) {
                includedRaces[chara[key]["race"]] = true
            }
            ind++;
        }
    }

    var races = 0;
    for (var key in includedRaces) {
        if (includedRaces[key]) races++;
    }
    return races
};

module.exports.checkNumberOfElements = function (totals) {
    // check num of elements
    var includedElements = {
        "fire": false,
        "water": false,
        "earth": false,
        "wind": false,
        "light": false,
        "dark": false,
    };

    var ind = 0;
    for (var key in totals) {
        if (totals[key].name != "" && totals[key].isConsideredInAverage) {
            // only front line
            if (ind < 4) {
                includedElements[totals[key]["element"]] = true
            }
            ind++;
        }
    }

    var elements = 0;
    for (var key in includedElements) {
        if (includedElements[key]) elements++;
    }
    return elements
};

module.exports.calcHaisuiValue = function (haisuiType, haisuiAmount, haisuiSLv, haisuiRemainHP) {
    var remainHP = haisuiRemainHP;
    var baseRate = 0.0;

    if (haisuiType == 'normalHaisui' || haisuiType == 'magnaHaisui' || haisuiType == 'exHaisui' || haisuiType == "charaHaisui" || haisuiType === "normalSupportHaisui") {
        // Refer to Mr. Hibino's site for implementation of emnity magnification
        // baseRate: Value at HP 50%
        if (haisuiAmount == "S") {
            // 小
            if (haisuiSLv < 10) {
                baseRate = -0.3 + haisuiSLv * 1.8;
            } else if (haisuiSLv <= 15) {
                baseRate = 18.0 + 3.0 * ((haisuiSLv - 10) / 5.0)
            } else {
                baseRate = 21.0 + 1.5 * ((haisuiSLv - 15) / 5.0)
            }
        } else if (haisuiAmount == "M") {
            // 中
            if (haisuiSLv < 10) {
                baseRate = -0.4 + haisuiSLv * 2.4;
            } else if (haisuiSLv <= 15) {
                baseRate = 24 + 6.0 * ((haisuiSLv - 10) / 5.0)
            } else {
                baseRate = 30 + 2.5 * ((haisuiSLv - 15) / 5.0)
            }
        } else {
            // 大
            if (haisuiSLv < 10) {
                baseRate = -0.5 + haisuiSLv * 3.0;
            } else if (haisuiSLv <= 15) {
                baseRate = 30 + 7.5 * ((haisuiSLv - 10) / 5.0)
            } else {
                baseRate = 37.5 + 3.0 * ((haisuiSLv - 15) / 5.0)
            }
        }
        return (baseRate / 3.0) * (2.0 * remainHP * remainHP - 5.0 * remainHP + 3.0)
    }
    if (haisuiType === "normalKonshin" || haisuiType === "normalOtherKonshin") {
        if (remainHP >= 0.25) {
            if (haisuiAmount === "S") {
                // Normal Stamina (S)
                // TODO: No Data
                return 0.0
            } else if (haisuiAmount === "M") {
                // Normal Stamina (M)
                if (haisuiSLv < 15) {
                    return Math.pow(100.0 * remainHP / (65.0 - haisuiSLv), 2.9) + 2.1;
                } else {
                    return Math.pow(100.0 * remainHP / (65.0 - (15 + (0.4 * (haisuiSLv - 15)))), 2.9) + 2.1;
                }
            } else {
                // Normal Stamina (L)
                // ref: http://binarysblog.blog.fc2.com/blog-entry-1.html
                if (haisuiSLv < 15) {
                    return Math.pow(100.0 * remainHP / (56.4 - haisuiSLv), 2.9) + 2.1;
                } else {
                    return Math.pow(100.0 * remainHP / (56.4 - (15 + (0.4 * (haisuiSLv - 15)))), 2.9) + 2.1;
                }
            }
        }
    } else if (haisuiType === "normalSupportKonshin") {
        if (remainHP >= 0.50) {
            if (haisuiAmount === "S") {

            } else if (haisuiAmount === "M") {
                return 17.3333 * Math.pow(remainHP, 3) - 13.1746 * Math.pow(remainHP, 2) + 7.44714 * remainHP - 1.59476;
            } else {
                return 24.3323 * Math.pow(remainHP, 3) - 15.6128 * Math.pow(remainHP, 2) + 7.84802 * remainHP - 1.5524;
            }
        }
    } else if (haisuiType === "magnaKonshin") {
        if (remainHP >= 0.25) {
            if (haisuiAmount === "S") {

            } else if (haisuiAmount === "M") {
                // Magna Stamina (M)
                if (haisuiSLv < 15) {
                    return Math.pow(100.0 * remainHP / (60.4 - haisuiSLv), 2.9) + 2.1;
                } else {
                    return Math.pow(100.0 * remainHP / (60.4 - (15 + (0.4 * (haisuiSLv - 15)))), 2.9) + 2.1;
                }
            } else {
                // Magna Stamina (L)
                // ref: https://twitter.com/Hecate_mk2/status/1117394776414777344
                if (haisuiSLv < 15) {
                    return Math.pow(100.0 * remainHP / (56.4 - haisuiSLv), 2.9) + 2.1;
                } else {
                    return Math.pow(100.0 * remainHP / (56.4 - (15 + (0.4 * (haisuiSLv - 15)))), 2.9) + 2.1;
                }
            }
        }
    } else if (haisuiType === "omegaKonshin") {
        if (remainHP >= 0.25) {
            return Math.pow(100.0 * remainHP / (53.7 - haisuiSLv), 2.9) + 2.1;
        }
    } else {
        console.error("Unknown Haisui Type Passed: " + haisuiType);
    }
    return 0.0;
};

module.exports.calcLBHaisuiValue = function (haisuiType, haisuiAmount, haisuiRemainHP) {
    var remainHP = haisuiRemainHP;
    var value = 0.0;

    if (haisuiType == 'EXLBHaisui' || haisuiType == 'LBHaisui') {
        if (haisuiAmount == "1") {
            if (remainHP > 0.75 && remainHP <= 1) {
                value = 0.01;
            } else if  (remainHP > 0.5 && remainHP <= 0.75) {
                value = -0.0104 * remainHP + 0.0278;
            } else {
                value = -0.0548 * remainHP + 0.05;
            }
        } else if (haisuiAmount == "2") {
            if (remainHP > 0.75 && remainHP <= 1) {
                value = 0.01;
            } else if  (remainHP > 0.5 && remainHP <= 0.75) {
                value = -0.0132 * remainHP + 0.0299;
            } else {
                value = -0.0734 * remainHP + 0.06;
            }
        } else if (haisuiAmount == "3") {
            if (remainHP > 0.75 && remainHP <= 1) {
                value = 0.01;
            } else if  (remainHP > 0.5 && remainHP <= 0.75) {
                value = -0.0148 * remainHP + 0.0411;
            } else {
                value = -0.0826 * remainHP + 0.075;
            }
        } else if (haisuiAmount == "4") {
            if (remainHP > 0.75 && remainHP <= 1) {
                value = 0.01;
            } else if  (remainHP > 0.5 && remainHP <= 0.75) {
                value = -0.02 * remainHP + 0.045;
            } else {
                value = -0.11 * remainHP + 0.09;
            }
        } else if (haisuiAmount == "5") {
            if (remainHP > 0.75 && remainHP <= 1) {
                value = 0.01;
            } else if  (remainHP > 0.5 && remainHP <= 0.75) {
                value = -0.016 * remainHP + 0.052;
            } else {
                value = -0.112 * remainHP + 0.1;
            }
        } else if (haisuiAmount == "6") {
            if (remainHP > 0.75 && remainHP <= 1) {
                value = 0.01;
            } else if  (remainHP > 0.5 && remainHP <= 0.75) {
                value = -0.02 * remainHP + 0.055;
            } else {
                value = -0.13 * remainHP + 0.11;
            }
        } else if (haisuiAmount == "7") {
            if (remainHP > 0.75 && remainHP <= 1) {
                value = 0.01;
            } else if  (remainHP > 0.5 && remainHP <= 0.75) {
                value = -0.0268 * remainHP + 0.0601;
            } else {
                value = -0.1466 * remainHP + 0.12;
            }
        } else if (haisuiAmount == "8") {
            if (remainHP > 0.75 && remainHP <= 1) {
                value = 0.01;
            } else if  (remainHP > 0.5 && remainHP <= 0.75) {
                value = -0.024 * remainHP + 0.068;
            } else {
                value = -0.138 * remainHP + 0.125;
            }
        } else if (haisuiAmount == "9") {
            if (remainHP > 0.75 && remainHP <= 1) {
                value = 0.01;
            } else if  (remainHP > 0.5 && remainHP <= 0.75) {
                value = -0.0292 * remainHP + 0.0719;
            } else {
                value = -0.1604 * remainHP + 0.1375;
            }
        } else if (haisuiAmount == "10") {
            if (remainHP > 0.75 && remainHP <= 1) {
                value = 0.01;
            } else if  (remainHP > 0.5 && remainHP <= 0.75) {
                value = -0.0332 * remainHP + 0.0749;
            } else {
                value = -0.1834 * remainHP + 0.15;
            }
        }
    }

    if (haisuiType == 'EXLBKonshin' || haisuiType == 'LBKonshin') {
        switch (haisuiAmount) {
            case 1: value = Math.min(0.03, 0.03 * remainHP + 0.01); break;
            case 2: value = Math.min(0.04, 0.03 * remainHP + 0.01); break;
            case 3: value = Math.min(0.05, 0.04 * remainHP + 0.02); break;
            case 4: value = Math.min(0.06, 0.04 * remainHP + 0.02); break;
            case 5: value = Math.min(0.07, 0.06 * remainHP + 0.03); break;
            case 6: value = Math.min(0.08, 0.06 * remainHP + 0.03); break;
            case 7: value = Math.min(0.09, 0.06 * remainHP + 0.03); break;
            case 8: value = Math.min(0.10, 0.08 * remainHP + 0.04); break;
            case 9: value = Math.min(0.11, 0.08 * remainHP + 0.04); break;
            case 10: value = Math.min(0.12, 0.08 * remainHP + 0.04); break;
        }
    }

    return value;
};

function* eachSkill(arm) {
    const _skill_element_keys = [
        ["skill1", "element"],
        ["skill2", "element2"],
        ["skill3", "element3"],
    ];
    for (let [skey,ekey] of _skill_element_keys) {
        var skillname = arm[skey] ? arm[skey] : "non";
        var element = arm[ekey] != undefined ? arm[ekey] : "fire";
        var skillkey = skey;
        if (typeof skilltypes[skillname] === 'undefined') {
            console.error("unknown skill name:", skillname);
            continue;
        }

        if (skillname == 'non') {
            continue; // Safe for skip
        }

        yield [skillkey, skillname, element];
    }
}

function* eachSupport(chara) {
    for (let key of ["support", "support2", "support3"]) {

        let supportID = chara[key];

        if (typeof supportID === 'undefined') {
            continue; // Data maybe broken.
        }

        if (supportID === 'none') {
            continue; // Safe for skip
        }

        let support = supportAbilities[supportID];

        if (typeof support === 'undefined') {
            console.error("unknown support ability ID:", supportID);
            continue;
        }

        // process composite support
        if (support.type === 'composite') {
            for (let subSupport of support.value) {
                // TODO: check undefined and" "none" support
                yield supportAbilities[subSupport.ID] || subSupport;
            }
            continue;
        }

        yield support;
    }
}

module.exports.recalcCharaHaisui = function (chara, remainHP) {
    var charaHaisuiValue = 1.0;

    for (var ch = 0; ch < chara.length; ch++) {
        if (chara[ch].name != "" && chara[ch].isConsideredInAverage) {
            for (let support of eachSupport(chara[ch])) {
                // Treatment of emnity supplements only
                switch (support.type) {
                    case "emnity_all_SL10":
                        // Refer to Zahlhamelina's HP
                        charaHaisuiValue += 0.01 * module.exports.calcHaisuiValue("charaHaisui", "L", 10, remainHP);
                        continue;
                    case "emnity_own_SL20":
                        // Refer to Dark Jeanne's HP
                        charaHaisuiValue += 0.01 * module.exports.calcHaisuiValue("charaHaisui", "L", 27.5, remainHP);
                        continue;
                    case "emnity_own_SL20_steps":
                        // Refer to Black Knight's HP
                        if (remainHP < 0.75 && remainHP >= 0.50) {
                            charaHaisuiValue += 0.15;
                        } else if (remainHP < 0.50 && remainHP >= 0.25) {
                            charaHaisuiValue += 0.30;
                        } else if (remainHP < 0.25) {
                            charaHaisuiValue += 0.45;
                        }
                        continue;
                    default:
                        break;
                }
            }
        }
    }

    return charaHaisuiValue;
};

module.exports.recalcNormalSupportKonshin = function (chara, remainHP) {
    let normalSupportKonshinValue = 0;

    for (let ch = 0; ch < chara.length; ch++) {
        if (chara[ch].name != "" && chara[ch].isConsideredInAverage) {
            for (let support of eachSupport(chara[ch])) {
                // Treatment of emnity supplements only
                switch (support.type) {
                    case "normalSupportKonshin_hpDebuff":
                        // fall through
                    case "normalSupportKonshin":
                        // Refer to owner's HP
                        normalSupportKonshinValue += 0.01 * module.exports.calcHaisuiValue("normalSupportKonshin", "L", 1, remainHP);
                        continue;
                    default:
                        break;
                }
            }
        }
    }
    return normalSupportKonshinValue;
};

module.exports.getTotalBuff = function (prof) {
    var totalBuff = {
        master: 0.0,
        masterHP: 0.0,
        masterDA: 0.0,
        masterTA: 0.0,
        masterDamageLimit: 0.0,
        masterBonusOugiGage: 0.0,
        normal: 0.0,
        element: 0.0,
        other: 0.0,
        other2: 0.0,
        damageUPOnlyNormal: 0.0,
        zenith1: 0.0,
        zenith2: 0.0,
        zenithDA: 0.0,
        zenithTA: 0.0,
        //zenithCritical: 0.0,
        zenithOugiDamage: 0.0,
        zenithChainDamage: 0.0,
        zenithChainDamageLimit: 0.0,
        zenithElement: 0.0,
        zenithDamageLimit: 0.0,
        hp: 0.0,
        da: 0.0,
        ta: 0.0,
        ougiGage: 1.0,
        ougiDamage: 0.0,
        additionalDamage: 0.0,
        ougiGageUpOugi: 0.0,
        damageLimit: 0.0,
        ougiDamageLimit: 0.0,
        chainNumber: 1,
        criticalBuff: [],
        uplift: 0,
        supplementalDamageBuff: 0,
        //enemyBuffCount: 0,
        enemyDebuffCount: 0,
        retsujitsuNoRakuen: false,
    };

    if (!isNaN(prof.masterBonus)) totalBuff["master"] += 0.01 * parseInt(prof.masterBonus);
    if (!isNaN(prof.masterBonusHP)) totalBuff["masterHP"] += 0.01 * parseInt(prof.masterBonusHP);
    if (!isNaN(prof.masterBonusDA)) totalBuff["masterDA"] += 0.01 * parseInt(prof.masterBonusDA);
    if (!isNaN(prof.masterBonusTA)) totalBuff["masterTA"] += 0.01 * parseInt(prof.masterBonusTA);
    if (!isNaN(prof.masterBonusDamageLimit)) totalBuff["masterDamageLimit"] += 0.01 * parseInt(prof.masterBonusDamageLimit);
    if (!isNaN(prof.masterBonusOugiGage)) totalBuff["masterBonusOugiGage"] += parseInt(prof.masterBonusOugiGage);
    if (!isNaN(prof.hpBuff)) totalBuff["hp"] += 0.01 * parseInt(prof.hpBuff);
    if (!isNaN(prof.daBuff)) totalBuff["da"] += 0.01 * parseFloat(prof.daBuff);
    if (!isNaN(prof.taBuff)) totalBuff["ta"] += 0.01 * parseFloat(prof.taBuff);
    if (!isNaN(prof.otherBuff2)) totalBuff["other2"] += 0.01 * parseInt(prof.otherBuff2);
    if (!isNaN(prof.damageUPOnlyNormalBuff)) totalBuff["damageUPOnlyNormal"] += 0.01 * parseInt(prof.damageUPOnlyNormalBuff);
    if (!isNaN(prof.additionalDamageBuff)) totalBuff["additionalDamage"] += 0.01 * parseInt(prof.additionalDamageBuff);
    if (!isNaN(prof.ougiGageUpOugiBuff)) totalBuff["ougiGageUpOugi"] += parseInt(prof.ougiGageUpOugiBuff);
    if (!isNaN(prof.uplift)) totalBuff["uplift"] += 0.01 * parseInt(prof.uplift);
    if (!isNaN(prof.ougiGageBuff)) totalBuff["ougiGage"] += 0.01 * parseInt(prof.ougiGageBuff);
    if (!isNaN(prof.ougiDamageBuff)) totalBuff["ougiDamage"] += 0.01 * parseInt(prof.ougiDamageBuff);
    if (!isNaN(prof.chainNumber)) totalBuff["chainNumber"] = parseInt(prof.chainNumber);
    if (!isNaN(prof.damageLimitBuff)) totalBuff["damageLimit"] = 0.01 * parseFloat(prof.damageLimitBuff);
    if (!isNaN(prof.ougiDamageLimitBuff)) totalBuff["ougiDamageLimit"] = 0.01 * parseFloat(prof.ougiDamageLimitBuff);
    totalBuff["normal"] += 0.01 * parseInt(prof.normalBuff);
    totalBuff["element"] += 0.01 * parseInt(prof.elementBuff);
    totalBuff["other"] += 0.01 * parseInt(prof.otherBuff);
    totalBuff["zenith1"] += zenith[prof.zenithBonus1];
    totalBuff["zenith2"] += zenith[prof.zenithBonus2];
    totalBuff["zenithDA"] += zenithDA[prof.zenithDABonus] != undefined ? zenithDA[prof.zenithDABonus] : 0;
    totalBuff["zenithTA"] += zenithTA[prof.zenithTABonus] != undefined ? zenithTA[prof.zenithTABonus] : 0;
    //totalBuff["zenithCritical"] += zenithCritical[prof.zenithCriticalBonus] != undefined ? zenithCritical[prof.zenithCriticalBonus] : 0;
    totalBuff["zenithOugiDamage"] += zenithOugiDamage[prof.zenithOugiDamageBonus] != undefined ? zenithOugiDamage[prof.zenithOugiDamageBonus] : 0;
    totalBuff["zenithChainDamage"] += zenithChainDamage[prof.zenithChainDamageBonus] != undefined ? zenithChainDamage[prof.zenithChainDamageBonus] : 0;
    totalBuff["zenithChainDamageLimit"] += zenithChainDamageLimit[prof.zenithChainDamageLimitBonus] != undefined ? zenithChainDamageLimit[prof.zenithChainDamageLimitBonus] : 0;
    totalBuff["zenithElement"] += zenithElement[prof.zenithElementBonus] != undefined ? zenithElement[prof.zenithElementBonus] : 0;
    totalBuff["zenithDamageLimit"] += zenithDamageLimit[prof.zenithDamageLimitBonus] != undefined ? zenithDamageLimit[prof.zenithDamageLimitBonus] : 0;
    totalBuff["criticalBuff"] = prof.criticalBuff != undefined ? prof.criticalBuff : [];
    totalBuff["supplementalDamageBuff"] += parseInt(prof.supplementalDamageBuff);

    totalBuff["retsujitsuNoRakuen"] = prof.retsujitsuNoRakuen;

    return totalBuff;
};

function maskInvalidSkillLevel(slv, stype, amount) {
    if (slv < 1) return 1;
    if (slv > 20) return 20;
    return slv;
}

module.exports.addSkilldataToTotals = function (totals, comb, arml, buff) {
    var cosmosAmounts = {
        "sword": 0,
        "dagger": 0,
        "spear": 0,
        "axe": 0,
        "wand": 0,
        "gun": 0,
        "fist": 0,
        "bow": 0,
        "music": 0,
        "katana": 0,
    };
    // Check whether there is a cosmos weapon
    for (var i = 0; i < arml.length; i++) {
        if (comb[i] > 0) {
            var arm = arml[i];
            if (module.exports.isCosmos(arm)) {
                if (skilltypes[arm.skill1].type == "cosmosArm") {
                    cosmosAmounts[skilltypes[arm.skill1].cosmosArm] = Math.max(cosmosAmounts[skilltypes[arm.skill1].cosmosArm], skilltypes[arm.skill1].amount);
                } else if (skilltypes[arm.skill2].type == "cosmosArm") {
                    cosmosAmounts[skilltypes[arm.skill2].cosmosArm] = Math.max(cosmosAmounts[skilltypes[arm.skill2].cosmosArm], skilltypes[arm.skill2].amount);
                } else {
                    cosmosAmounts[skilltypes[arm.skill3].cosmosArm] = Math.max(cosmosAmounts[skilltypes[arm.skill3].cosmosArm], skilltypes[arm.skill3].amount);
                }
            }
        }
    }

    var isAkashaIncludedGlobal = false;
    var isAkashaIncludedLocal = {
        "axe": false,
        "sword": false,
        "bow": false,
        "wand": false,
        "spear": false,
    };

    var index = 0;
    for (var key in totals) {
        index = index + 1 | 0;
        var numGrandEpic = 0; // number of Grand Epic skills
        var isResonanceStaffIncluded = false;
        var isBahaAtIncluded = false;
        var isBahaAthpIncluded = false;
        var isBahaHpIncluded = false;

        // Omega Weapon can activate multiple effects if it is different skill
        var isOmegaIncluded = {
            "omegaBase": false,
            "senni": false,
            "tousou": false,
            "seimei": false,
            "kyousou": false,
            "gekijou": false,
            "yuuki": false,
            "alpha": false,
            "gamma": false,
            "delta": false,
        };

        for (var i = 0; i < arml.length; i++) {
            if (comb[i] != 0) {
                var arm = arml[i];
                var armSup = 1.0;
                var hpSup = 1.0;
                if (cosmosAmounts[arm.armType] > 0) {
                    armSup += cosmosAmounts[arm.armType];
                    hpSup += cosmosAmounts[arm.armType];
                }
                if (key == "Djeeta") {
                    // for Djeeta
                    if (arm.armType == totals[key]["fav1"] && arm.armType == totals[key]["fav2"]) {
                        armSup += (0.2 + buff["zenith1"] + buff["zenith2"]);
                        hpSup += 0.2
                    } else if (arm.armType == totals[key]["fav1"]) {
                        armSup += (0.2 + buff["zenith1"]);
                        hpSup += 0.2
                    } else if (arm.armType == totals[key]["fav2"]) {
                        armSup += (0.2 + buff["zenith2"]);
                        hpSup += 0.2
                    }
                } else {
                    // for chara
                    if (arm.armType == totals[key]["fav1"]) {
                        armSup += 0.2
                    } else if (arm.armType == totals[key]["fav2"]) {
                        armSup += 0.2
                    }
                }
                totals[key]["armAttack"] += armSup * parseInt(arm.attack) * comb[i];
                totals[key]["armHP"] += hpSup * parseInt(arm.hp) * comb[i];
                for (let [skillkey, skillname, element] of eachSkill(arm)) {
                    var stype = skilltypes[skillname].type;
                    var amount = skilltypes[skillname].amount;
                    var slv = parseInt(arm.slv);

                    // SLv20 compatible
                    slv = maskInvalidSkillLevel(slv, stype, amount);

                    // Baha, cosmos and omega weapons have no attribute relation
                    if (stype == 'bahaAT') {
                        if (!isBahaAtIncluded && bahaRaceCharaContains(skillname, totals[key])) {
                            // Baha dagger etc.
                            totals[key]["bahaAT"] += comb[i] * skillAmounts["bahaAT"]["AT"][slv - 1];
                            isBahaAtIncluded = true;
                        }
                    } else if (stype == 'bahaATHP') {
                        if (!isBahaAthpIncluded && bahaRaceCharaContains(skillname, totals[key])) {
                            // Baha sword etc.
                            totals[key]["bahaAT"] += comb[i] * skillAmounts["bahaATHP"]["AT"][slv - 1];
                            totals[key]["bahaHP"] += comb[i] * skillAmounts["bahaATHP"]["HP"][slv - 1];
                            isBahaAthpIncluded = true;
                        }
                    } else if (stype == 'bahaHP') {
                        if (!isBahaHpIncluded && bahaRaceCharaContains(skillname, totals[key])) {
                            // Baha Fist etc
                            totals[key]["bahaHP"] += comb[i] * skillAmounts["bahaHP"]["HP"][slv - 1];
                            isBahaHpIncluded = true;
                        }
                    } else if (stype == 'bahaFUATHP') {
                        if (bahaFURaceCharaContains(skillname, totals[key])) {
                            totals[key]["bahaAT"] += comb[i] * skillAmounts["bahaFUATHP"]["AT"][slv - 1];
                            totals[key]["bahaHP"] += comb[i] * skillAmounts["bahaFUATHP"]["HP"][slv - 1];
                        }
                    } else if (stype == 'bahaFUHP') {
                        if (bahaFURaceCharaContains(skillname, totals[key])) {
                            totals[key]["bahaHP"] += comb[i] * skillAmounts["bahaFUHP"]["HP"][slv - 1];
                            totals[key]["bahaDA"] += comb[i] * skillAmounts["bahaFUHP"]["DA"][slv - 1];
                            totals[key]["bahaTA"] += comb[i] * skillAmounts["bahaFUHP"]["TA"][slv - 1];
                        }
                    } else if (stype == 'cosmosArm') {
                        // Cosmos Weapons skip
                    } else if (stype == 'cosmos') {
                        // Cosmos weapons
                        if (skillname == 'cosmosAT' && typeCharaContains("attack", totals[key])) {
                            totals[key]["cosmosAT"] += comb[i] * 20.0;
                        } else if (skillname == 'cosmosDF' && typeCharaContains("defense", totals[key])) {
                            totals[key]["HPdebuff"] -= comb[i] * 0.10;
                        } else if (skillname == 'cosmosBL' && typeCharaContains("balance", totals[key])) {
                            totals[key]["cosmosBL"] = comb[i] * 20.0;
                        } else if (skillname == 'cosmosPC' && typeCharaContains("pecu", totals[key])) {
                            totals[key]["cosmosDebuffResistance"] = comb[i] * 20.0;
                        }
                    } else if (stype == 'cosmosLimit') {
                        // Cosmos Weapons Damage Limit Skill
                        if (amount == 'sword') {
                            totals[key]["cosmosNormalDamageLimit"] = Math.max(totals[key]["cosmosNormalDamageLimit"], 0.01 * Math.min(10, epic.countSwordType(arml, comb)));
                        } else if (amount == 'dagger') {
                            totals[key]["cosmosNormalDamageLimit"] = Math.max(totals[key]["cosmosNormalDamageLimit"], 0.01 * Math.min(10, epic.countDaggerType(arml, comb)));
                        } else if (amount == 'spear') {
                            totals[key]["cosmosNormalDamageLimit"] = Math.max(totals[key]["cosmosNormalDamageLimit"], 0.01 * Math.min(10, epic.countSpearType(arml, comb)));
                        } else if (amount == 'axe') {
                            totals[key]["cosmosNormalDamageLimit"] = Math.max(totals[key]["cosmosNormalDamageLimit"], 0.01 * Math.min(10, epic.countAxeType(arml, comb)));
                        } else if (amount == 'wand') {
                            totals[key]["cosmosNormalDamageLimit"] = Math.max(totals[key]["cosmosNormalDamageLimit"], 0.01 * Math.min(10, epic.countWandType(arml, comb)));
                        } else if (amount == 'gun') {
                            totals[key]["cosmosNormalDamageLimit"] = Math.max(totals[key]["cosmosNormalDamageLimit"], 0.01 * Math.min(10, epic.countGunType(arml, comb)));
                        } else if (amount == 'fist') {
                            totals[key]["cosmosNormalDamageLimit"] = Math.max(totals[key]["cosmosNormalDamageLimit"], 0.01 * Math.min(10, epic.countFistType(arml, comb)));
                        } else if (amount == 'bow') {
                            totals[key]["cosmosNormalDamageLimit"] = Math.max(totals[key]["cosmosNormalDamageLimit"], 0.01 * Math.min(10, epic.countBowType(arml, comb)));
                        } else if (amount == 'music') {
                            totals[key]["cosmosNormalDamageLimit"] = Math.max(totals[key]["cosmosNormalDamageLimit"], 0.01 * Math.min(10, epic.countMusicType(arml, comb)));
                        } else if (amount == 'katana') {
                            totals[key]["cosmosNormalDamageLimit"] = Math.max(totals[key]["cosmosNormalDamageLimit"], 0.01 * Math.min(10, epic.countKatanaType(arml, comb)));
                        }
                    } else if (stype == 'chainForce') {
                        // Chainforce weapons, chain DMG and Limit Up
                        totals[key]["chainDamage"] += comb[i] * skillAmounts["chainDamage"][amount][slv - 1];
                        totals[key]["chainDamageLimit"] += comb[i] * skillAmounts["chainDamageLimit"][amount][slv - 1];
                    } else if (stype == 'omega') {
                        // Omega Weapon
                        var omegaType = skillname.split("-")[1];
                        if (favCharaContains(arm.armType, totals[key])) {
                            if (!isOmegaIncluded["omegaBase"]) {
                                totals[key]["omegaNormal"] += skillAmounts["omega"]["rawATK"][slv - 1];
                                totals[key]["omegaNormalHP"] += skillAmounts["omega"]["rawHP"][slv - 1];

                                isOmegaIncluded["omegaBase"] = true;
                            }

                            if (!isOmegaIncluded[omegaType]) {
                                if (omegaType === "senni") {
                                    totals[key]["omegaNormal"] += skillAmounts["omega"][amount][slv - 1];
                                } else if (omegaType === "tousou") {
                                    totals[key]["normalOtherSante"] += skillAmounts["omega"][amount][slv - 1];
                                } else if (omegaType === "seimei") {
                                    totals[key]["omegaNormalHP"] += skillAmounts["omega"][amount][slv - 1];
                                } else if (omegaType === "kyousou") {
                                    totals[key]["normalOtherKonshin"] += module.exports.calcHaisuiValue("omegaKonshin", amount, slv, totals[key]["remainHP"]);
                                } else if (omegaType === "gekijou") {
                                    totals[key]["normalOtherHaisui"] += module.exports.calcHaisuiValue("normalHaisui", amount, slv, totals[key]["remainHP"]);
                                } else if (omegaType === "yuuki") {
                                    totals[key]["normalOtherCritical"].push({
                                        "value": 0.01 * skillAmounts["omega"][amount][slv - 1],
                                        "attackRatio": 0.5
                                    });
                                }

                                isOmegaIncluded[omegaType] = true;
                            }
                        }
                    } else if (stype === "gauphKey") {
                        // Gauph key is good on weapons, irrespective of attributes
                        var gauphKeyType = skillname.split("-")[1];

                        if (!isOmegaIncluded[gauphKeyType]) {
                            if (gauphKeyType === "alpha") {
                                totals[key]["omegaNormalDamageLimit"] += 0.1
                            } else if (gauphKeyType === "gamma") {
                                totals[key]["omegaOugiDamageLimit"] += 0.15
                            } else if (gauphKeyType === "delta") {
                                totals[key]["chainDamageLimit"] += 50
                            }
                            isOmegaIncluded[gauphKeyType] = true;
                        }
                    } else if (stype === "opusKey") {
                        // Opus key is good on weapons, irrespective of attributes
                        var opusKeyType = skillname.split("-")[1];

                        if (!isOmegaIncluded[opusKeyType]) {
                            if (opusKeyType === "alpha") {
                                totals[key]["omegaNormalDamageLimit"] += 0.1
                            } else if (opusKeyType === "gamma") {
                                totals[key]["omegaOugiDamageLimit"] += 0.15
                            } else if (opusKeyType === "delta") {
                                totals[key]["chainDamageLimit"] += 50
                            }
                            isOmegaIncluded[opusKeyType] = true;
                        }
                    } else if (stype == 'akasha') {
                        // Akasha Weapon
                        var akasha = skillname.split("-")[0];
                        var akashaType = skillname.split("-")[1];
                        if (akashaType == "axe" && amount == "fist") {
                            if (favCharaContains([akashaType, amount], totals[key])) {
                                if (!isAkashaIncludedGlobal || isAkashaIncludedLocal[akashaType]) {
                                    totals[key]["akashaATK"] += 20.0;
                                    totals[key]["normalOtherLesserSante"] += 10.0;
                                    isAkashaIncludedGlobal = true;
                                    isAkashaIncludedLocal[akashaType] = true;
                                }
                            }
                        } else if (akashaType == "sword" && amount == "dagger") {
                            if (favCharaContains([akashaType, amount], totals[key])) {
                                if (!isAkashaIncludedGlobal || isAkashaIncludedLocal[akashaType]) {
                                    totals[key]["akashaATK"] += 20.0;
                                    isAkashaIncludedGlobal = true;
                                    isAkashaIncludedLocal[akashaType] = true;
                                }
                            }
                        } else if (akashaType == "bow" && amount == "gun") {
                            if (favCharaContains([akashaType, amount], totals[key])) {
                                if (!isAkashaIncludedGlobal || isAkashaIncludedLocal[akashaType]) {
                                    totals[key]["akashaATK"] += 20.0;
                                    totals[key]["normalOtherCritical"].push({
                                        "value": 0.01 * 10.0,
                                        "attackRatio": 0.45
                                    });
                                    isAkashaIncludedGlobal = true;
                                    isAkashaIncludedLocal[akashaType] = true;
                                }
                            }
                        } else if (akashaType == "wand" && amount == "music") {
                            if (favCharaContains([akashaType, amount], totals[key])) {
                                if (!isAkashaIncludedGlobal || isAkashaIncludedLocal[akashaType]) {
                                    totals[key]["akashaATK"] += 20.0;
                                    totals[key]["akashaSensei"] = 10.0;
                                    isAkashaIncludedGlobal = true;
                                    isAkashaIncludedLocal[akashaType] = true;
                                }
                            }
                        } else if (akashaType == "spear" && amount == "katana") {
                            if (favCharaContains([akashaType, amount], totals[key])) {
                                if (!isAkashaIncludedGlobal || isAkashaIncludedLocal[akashaType]) {
                                    totals[key]["akashaATK"] += 20.0;
                                    totals[key]["akashaHP"] += 10.0;
                                    isAkashaIncludedGlobal = true;
                                    isAkashaIncludedLocal[akashaType] = true;
                                }
                            }
                        }
                    } else if (stype == 'covenant') {
                        // Akasha Weapon 2nd Skill
                        if (amount == "impervious") {
                            if (favCharaContains('spear/katana', totals[key])) {
                                totals[key]["covenant"] = amount;
                            }
                        } else if (amount == 'victorious') {
                            if (favCharaContains('wand/music', totals[key])) {
                                totals[key]["covenant"] = amount;
                                totals['Djeeta']['buffCount'] = arm[skillkey + "Detail"];
                            }
                        } else if (amount == 'contentious') {
                            if (favCharaContains('axe/fist', totals[key])) {
                                 totals[key]["covenant"] = amount;
                            }
                        } else if (amount == 'deleterious') {
                            if (favCharaContains('bow/gun', totals[key])) {
                                totals[key]["covenant"] = amount;
                            }
                        } else if (amount == 'calamitous') {
                            if (favCharaContains('sword/dagger', totals[key])) {
                                totals[key]["covenant"] = amount;
                                buff["enemyDebuffCount"] = arm[skillkey + "Detail"];
                            }
                        }
                    } else if (stype === 'epic') {
                        if (amount === 'count-epic') {
                            numGrandEpic += comb[i];
                        } else if (amount === 'count-wand' && !isResonanceStaffIncluded) {
                            totals[key]["normalOtherSante"] += Math.min(10, epic.countWandType(arml, comb));
                            isResonanceStaffIncluded = true;
                        } else if (amount === 'all-unique-type') {
                            if (epic.isAllUniqueArmType(arml, comb)) {
                                totals[key]["ex"] += 20.0;
                                totals[key]["normalDamageLimit"] += 0.10;
                                totals[key]["ougiDamageLimit"] += 0.10;
                            }
                        } else if (amount === 'all-unique') {
                            if (epic.isAllUniqueArm(arml, comb)) {
                                totals[key]["ex"] += 20.0;
                                totals[key]["normalDamageLimit"] += 0.10;
                                totals[key]["ougiDamageLimit"] += 0.10;
                            }
                        }
                    } else if (stype === 'wandCountHP') {
                        totals[key]["normalHP"] += amount * epic.countWandType(arml, comb);
                    } else if (stype == 'cherubimKonshin') {
                        totals[key]["normalSupportKonshinWeapon"] = Math.max(module.exports.calcHaisuiValue("normalSupportKonshin", "M", "1", totals["Djeeta"]["remainHP"]), totals[key]["normalSupportKonshinWeapon"]);
                    } else if (stype == 'sunbladeKonshin') {
                        totals[key]["normalSupportKonshinWeapon"] = Math.max(module.exports.calcHaisuiValue("normalSupportKonshin", "L", "1", totals["Djeeta"]["remainHP"]), totals[key]["normalSupportKonshinWeapon"]);
                    } else if (stype == 'diaboliHaisui') {
                        totals[key]["normalSupportHaisuiWeapon"] = Math.max(module.exports.calcHaisuiValue("normalSupportHaisui", "L", 27.5, totals["Djeeta"]["remainHP"]), totals[key]["normalSupportHaisuiWeapon"]);
                    } else if (stype == 'rigaiBishojo') {
                        // skill is all allies not restricted to element
                        totals[key]["criticalDamageLimit"] += comb[i] * 0.05;
                    } else if (stype == 'one_night_party') {
                        if (favCharaContains(['axe'], totals[key])) {
                            totals[key]["normalOther"] += comb[i] * skillAmounts["normal"][amount][slv - 1];
                            totals[key]["TAOther"] += comb[i] * skillAmounts["multiAttack"][amount][slv - 1];
                        }
                    } else if (stype == 'downfall_of_ignorance') {
                        if (favCharaContains(['bow'], totals[key])) {
                            totals[key]["normalOther"] += comb[i] * skillAmounts["normal"][amount][slv - 1];
                            totals[key]["exHP"] += comb[i] * skillAmounts["normalHP"][amount][slv - 1];
                        }
                    } else if (stype == 'succession_of_knighthood') {
                        if (favCharaContains(['sword'], totals[key])) {
                            totals[key]["normalOther"] += comb[i] * skillAmounts["normal"][amount][slv - 1];
                            totals[key]["TAOther"] += comb[i] * skillAmounts["multiAttack"][amount][slv - 1];
                        }
                    } else if (totals[key]["element"] == element) {
                        // Calculate if attribute matches
                        if (isHaisuiType(stype)) {
                            // Emnity/Stamina calculation part is another method
                            totals[key][stype] += comb[i] * module.exports.calcHaisuiValue(stype, amount, slv, totals[key]["remainHP"])
                        } else if (stype == 'normalKamui') {
                            // Kamui is equal in attack power and HP rise
                            totals[key]["normal"] += comb[i] * skillAmounts["normal"][amount][slv - 1];
                            totals[key]["normalHP"] += comb[i] * skillAmounts["normal"][amount][slv - 1];
                        } else if (stype == 'magnaKamui') {
                            // Kamui is equal in attack power and HP rise
                            totals[key]["magna"] += comb[i] * skillAmounts["magna"][amount][slv - 1];
                            totals[key]["magnaHP"] += comb[i] * skillAmounts["magna"][amount][slv - 1];
                        } else if (stype == 'unknown') {
                            totals[key]["unknown"] += comb[i] * skillAmounts["ex"][amount][slv - 1];
                        } else if (stype == 'unknownHP') {
                            totals[key]["unknownHP"] += comb[i] * skillAmounts["exHP"][amount][slv - 1];
                        } else if (stype == 'normalCritical') {
                            totals[key][stype] += comb[i] * skillAmounts['critical'][amount][slv - 1];
                        } else if (stype == 'magnaCritical') {
                            totals[key][stype] += comb[i] * skillAmounts['critical'][amount][slv - 1];
                        } else if (stype == 'normalJinkai') {
                            totals[key]["normalHP"] += comb[i] * skillAmounts["normalHP"][amount][slv - 1];
                            totals[key]["normalCritical"] += comb[i] * skillAmounts['critical'][amount][slv - 1];
                        } else if (stype == 'normalSetsuna') {
                            totals[key]["normal"] += comb[i] * skillAmounts["normal"][amount][slv - 1];
                            totals[key]["normalCritical"] += comb[i] * skillAmounts['critical'][amount][slv - 1];
                        } else if (stype == 'magnaSetsuna') {
                            totals[key]["magnaCritical"] += comb[i] * skillAmounts["critical"][amount][slv - 1];
                            totals[key]["magna"] += comb[i] * skillAmounts["magna"][amount][slv - 1];
                        } else if (stype == 'normalKatsumi') {
                            totals[key]["normalNite"] += comb[i] * skillAmounts["multiAttack"][amount][slv - 1];
                            totals[key]["normalCritical"] += comb[i] * skillAmounts['critical'][amount][slv - 1];
                        } else if (stype == 'normalNite') {
                            totals[key]["normalNite"] += comb[i] * skillAmounts["multiAttack"][amount][slv - 1];
                        } else if (stype == 'magnaNite') {
                            totals[key]["magnaNite"] += comb[i] * skillAmounts["multiAttack"][amount][slv - 1];
                        } else if (stype == 'exNite') {
                            totals[key]["exNite"] += comb[i] * skillAmounts["multiAttack"][amount][slv - 1];
                        } else if (stype == 'normalSante') {
                            totals[key]["normalSante"] += comb[i] * skillAmounts["multiAttack"][amount][slv - 1];
                        } else if (stype == 'magnaSante') {
                            totals[key]["magnaSante"] += comb[i] * skillAmounts["multiAttack"][amount][slv - 1];
                        } else if (stype == 'magnaKatsumi') {
                            totals[key]["magnaCritical"] += comb[i] * skillAmounts["critical"][amount][slv - 1];
                            totals[key]["magnaNite"] += comb[i] * skillAmounts["multiAttack"][amount][slv - 1];
                        } else if (stype == 'normalKatsumoku') {
                            totals[key]["normalNite"] += comb[i] * skillAmounts["multiAttack"][amount][slv - 1];
                        } else if (stype == 'magnaKatsumoku') {
                            totals[key]["magnaNite"] += comb[i] * skillAmounts["multiAttack"][amount][slv - 1];
                        } else if (stype == 'normalRasetsu') {
                            totals[key]["normal"] += comb[i] * skillAmounts["normal"][amount][slv - 1];
                            totals[key]["DAOther"] -= comb[i] * 10.0;
                        } else if (stype == 'magnaRasetsu') {
                            totals[key]["magna"] += comb[i] * skillAmounts["magna"][amount][slv - 1];
                            totals[key]["DAOther"] -= comb[i] * 10.0;
                        } else if (stype == 'normalMusou') {
                            totals[key]["normal"] += comb[i] * skillAmounts["normal"][amount][slv - 1];
                            totals[key]["normalNite"] += comb[i] * skillAmounts["multiAttack"][amount][slv - 1];
                        } else if (stype == 'magnaMusou') {
                            totals[key]["magna"] += comb[i] * skillAmounts["magna"][amount][slv - 1];
                            totals[key]["magnaNite"] += comb[i] * skillAmounts["multiAttack"][amount][slv - 1];
                        } else if (stype == 'normalRanbu') {
                            totals[key]["normal"] += comb[i] * skillAmounts["normal"][amount][slv - 1];
                            totals[key]["normalLesserSante"] += comb[i] * skillAmounts["normalRanbu"][amount][slv - 1];
                        } else if (stype == 'normalBoukun') {
                            if (amount == "L") {
                                totals[key]["HPdebuff"] += comb[i] * 0.10;
                                totals[key]["normal"] += comb[i] * skillAmounts["normal"][amount][slv - 1];
                            } else if (amount == "LLL") {
                                totals[key]["HPdebuff"] += comb[i] * 0.10;
                                totals[key]["normal"] += comb[i] * skillAmounts["normal"][amount][slv - 1];
                            }
                        } else if (stype == 'magnaBoukun') {
                            totals[key]["HPdebuff"] += comb[i] * 0.10;
                            totals[key]["magna"] += comb[i] * skillAmounts["magna"][amount][slv - 1];
                        } else if (stype == 'magnaHakai') {
                            totals[key]["magnaLesserSante"] += comb[i] * skillAmounts["magnaHakai"][amount][slv - 1];
                        } else if (stype == 'magnaRanbu') {
                            totals[key]["magna"] += comb[i] * skillAmounts["magna"][amount][slv - 1];
                            totals[key]["magnaLesserSante"] += comb[i] * skillAmounts["magnaRanbu"][amount][slv - 1];
                        } else if (stype == 'magnaGunshin') {
                            totals[key]["magnaHP"] += comb[i] * skillAmounts["normalHP"]["S"][slv - 1];
                            totals[key]["magnaNite"] += comb[i] * skillAmounts["magnaGunshin"][amount][slv - 1];
                        } else if (stype == 'magnaFukashin') {
                            // - not implement Counter
                            // - HP is 14% at slv15. amount refer normalHP(S)
                            totals[key]["magnaHP"] += comb[i] * skillAmounts["normalHP"]["S"][slv - 1];
                        } else if (stype == 'normalHiou') {
                            totals[key]["normalOugiDamage"] += comb[i] * skillAmounts["normalHiou"][amount][slv - 1];
                        } else if (stype == 'normalHissatsu') {
                            totals[key]["normalOugiDamage"] += comb[i] * skillAmounts["normalHiou"][amount][slv - 1];
                            totals[key]["normalOugiDamageLimit"] += 0.01 * comb[i] * skillAmounts["normalOugiDamageLimitHissatsu"][amount][slv - 1];
                        } else if (stype == 'normalEiketsu') {
                            // ougi DMG and Limit Up
                            totals[key]["normalOugiDamage"] += comb[i] * skillAmounts["normalHiou"][amount][slv - 1];
                            totals[key]["normalOugiDamageLimit"] += 0.01 * comb[i] * skillAmounts["normalOugiDamageLimitHissatsu"][amount][slv - 1];
                            // chain DMG and Limit Up
                            totals[key]["normalChainDamage"] += comb[i] * skillAmounts["normalEiketsu"][amount][slv - 1];
                            totals[key]["normalChainDamageLimit"] += comb[i] * skillAmounts["normalEiketsuDamageLimit"][amount][slv - 1];
                        } else if (stype == 'normalOntyou') {
                            totals[key]["normalHP"] += comb[i] * skillAmounts["normalHP"][amount][slv - 1];
                            totals[key]["debuffResistance"] += comb[i] * skillAmounts["normalOntyou"][amount][slv - 1];
                         } else if (stype == 'normalHigo') {
                            totals[key]["debuffResistance"] += comb[i] * skillAmounts["normalHigo"][amount][slv - 1];
                        } else if (stype == 'magnaHissatsu') {
                            totals[key]["magnaOugiDamage"] += comb[i] * skillAmounts["magnaHiou"][amount][slv - 1];
                            totals[key]["magnaOugiDamageLimit"] += 0.01 * comb[i] * skillAmounts["magnaOugiDamageLimitHissatsu"][amount][slv - 1];
                        } else if (stype == 'exBoukun') {
                            totals[key]["HPdebuff"] += comb[i] * 0.07;
                            totals[key]["ex"] += comb[i] * skillAmounts["ex"][amount][slv - 1];
                        } else if (stype == 'exATKandHP') {
                            totals[key]["ex"] += comb[i] * skillAmounts["ex"][amount][slv - 1];
                            totals[key]["exHP"] += comb[i] * skillAmounts["exHP"][amount][slv - 1];
                        } else if (stype == 'rankiShikku') {
                            if (index == 1) {
                                totals[key]["normalLesserSante"] += comb[i] * skillAmounts["multiAttack"][amount][slv - 1];
                                totals[key]["ATKDebuff"] += comb[i] * 0.15;
                            }
                        } else if (stype == 'gurenJuin') {
                            if (index == 2) {
                                totals[key]["normal"] += comb[i] * skillAmounts["normal"][amount][slv - 1];
                            }
                        } else if (stype == 'chiretsuSenwaku') {
                            if (index == 3) {
                                totals[key]["normalOugiDamage"] += comb[i] * skillAmounts["normal"][amount][slv - 1];
                            }
                        } else if (stype == 'muhyoTuiga') {
                            if (index == 4) {
                                totals[key]["additionalDamage"] += comb[i] * skillAmounts["tuiga"][amount][slv - 1];
                                totals[key]["ougiDebuff"] += comb[i] * 0.30;
                            }
                            // The Four Great Tenshi blessing
                        } else if (stype == 'tenshiShukufuku') {
                            if (amount == 'M') {
                                totals[key]["tenshiDamageUP"] += comb[i] * 0.10;
                            } else if (amount == 'L') {
                                totals[key]["tenshiDamageUP"] += comb[i] * 0.20;
                            } else if (amount == 'LL') {
                                totals[key]["tenshiDamageUP"] += comb[i] * 0.23;
                            }
                            // Damage upper limit up system works for both mystery and normal
                        } else if (stype == 'normalDamageLimit') {
                            totals[key]["normalDamageLimit"] += comb[i] * skillAmounts["normalDamageLimit"][amount];
                            totals[key]["ougiDamageLimit"] += comb[i] * skillAmounts["normalDamageLimit"][amount];
                        } else if (stype == 'ougiDamageLimit') {
                            totals[key]["ougiDamageLimit"] += comb[i] * skillAmounts["ougiDamageLimit"][amount];
                        } else if (stype == 'huanglongHissatsu') {
                            totals[key]["normalOugiDamage"] += 20; // for Zeus aura (Hiou)
                            totals[key]["ougiDamageLimit"] += 0.2;
                        } else if (stype == 'ougiDamageLimitExceed') {
                            totals[key]["exceedOugiDamageLimit"] += 0.01 * comb[i] * skillAmounts["ougiDamageLimitExceed"][amount][slv - 1];
                            // 4* Weapon Skills
                        } else if (stype == 'tsuranukiKiba') {
                            if (skillname == 'tsuranukiKibaMain') {
                                totals[key]["normalHP"] += comb[i] * skillAmounts["normalHP"][amount][slv - 1];
                                if (key == 'Djeeta') {
                                    totals[key]["normalCritical"] += comb[i] * skillAmounts['critical'][amount][slv - 1];
                                }
                            } else {
                                totals[key]["normalHP"] += comb[i] * skillAmounts["normalHP"][amount][slv - 1];
                            }
                        } else if (stype == 'washiouKekkai') {
                            if (key == 'Djeeta') {
                                totals[key]["DAOther"] += comb[i] * skillAmounts["washiouKekkai"][amount][slv - 1];
                            }
                        } else if (stype == 'maihimeEnbu') {
                            // Maihime's performance: normal attacker's large + upper limit up 7%
                            totals[key]["normal"] += comb[i] * skillAmounts["normal"]["L"][slv - 1];
                            totals[key]["normalDamageLimit"] += comb[i] * skillAmounts["normalDamageLimit"]["M"];
                            totals[key]["ougiDamageLimit"] += comb[i] * skillAmounts["normalDamageLimit"]["M"];
                        } else if (stype == 'extendedDjeetaNormalDATA') {
                            // Main only Additional DATA extension
                            if (key == 'Djeeta') {
                                totals[key]["normalOtherSante"] += amount;
                            }
                        } else if (stype == 'normalSoka') {
                            // Normal Soka is effective for up to one effect and the one with the larger effective amount has priority
                            if (skillAmounts[stype][amount][slv - 1] > totals[key]["normalSoka"]) {
                                totals[key]["normalSoka"] = skillAmounts[stype][amount][slv - 1];
                            }
                        } else if (stype == 'magnaSoka') {
                            // Magna Soka effect is effective up to one with greater effect size
                            if (skillAmounts[stype][amount][slv - 1] > totals[key]["magnaSoka"]) {
                                totals[key]["magnaSoka"] = skillAmounts[stype][amount][slv - 1];
                            }
                        } else if (stype == 'sensei') {
                            // Preemptive is effective up to 1, whichever is greater
                            if (skillAmounts[stype][amount][slv - 1] > totals[key]["sensei"]) {
                                totals[key]["sensei"] = skillAmounts[stype][amount][slv - 1];
                            }
                        } else if (stype == 'magnaKenbu') {
                            // Only applies to fist prof characters
                            if (favCharaContains(['fist'], totals[key])) {
                                totals[key]["magna"] += comb[i] * skillAmounts["magna"][amount][slv - 1];
                            }
                        } else if (stype == 'magnaJojutsu') {
                            // Only applies to staff prof characters
                            if (favCharaContains(['wand'], totals[key])) {
                                totals[key]["magna"] += comb[i] * skillAmounts["magna"][amount][slv - 1];
                            }
                        } else if (stype == 'normalSeisyou') {
                            // Only applies to primal characters and Djeeta
                            if (raceCharaContains.orDjeeta("seisho", totals, key)) {
                                totals[key]["normal"] += comb[i] * skillAmounts["normal"][amount][slv - 1];
                            }
                        } else if (stype == 'magnaSeisyou') {
                            // Only applies to primal characters and Djeeta
                            if (raceCharaContains.orDjeeta("seisho", totals, key)) {
                                totals[key]["magna"] += comb[i] * skillAmounts["magna"][amount][slv - 1];
                            }
                        } else if (stype == 'opusnormalElement') {
                            var turns2max = 0.15 / skillAmounts["elementATK"][amount][slv - 1];
                            totals[key][stype] += turns2max * skillAmounts["elementATK"][amount][slv - 1];
                        } else if (stype == 'opusmagnaElement') {
                            var turns2max = 0.15 / skillAmounts["elementATK"][amount][slv - 1];
                            totals[key][stype] += turns2max * skillAmounts["elementATK"][amount][slv - 1];
                        } else if (stype == 'dracoATK') {
                            var turns2max = 0.25 / (amount * slv);
                            totals[key][stype] += turns2max * (amount * slv);
                        } else if (stype == 'normalElement') {
                            var turns2max;
                            if (amount == 'M') {
                                turns2max = 0.10 / skillAmounts["elementATK"][amount][slv - 1];
                            } else if (amount == 'L') {
                                turns2max = 0.15 / skillAmounts["elementATK"][amount][slv - 1];
                            }
                            totals[key][stype] += comb[i] * turns2max * skillAmounts["elementATK"][amount][slv - 1];
                        } else if (stype == 'shinTenNoInori') {
                            totals[key][stype] = Math.max(totals[key][stype], amount * arm[skillkey + "Detail"]);
                        } else if (stype == 'echoThirdHit') {
                            totals[key][stype] = Math.min(0.20, amount);
                        } else if (stype == 'rightway_pathfinder') {
                            if (key == 'Djeeta') {
                                totals[key]["superOugiDamage"] += totals[key]["remainHP"] * 2;
                                if (amount == "II") {
                                    totals[key]["exceedOugiDamageLimit"] += 0.25;
                                }
                            }
                        } else if (stype == 'victorys_promise') {
                            if (key == 'Djeeta') {
                                totals[key][stype] = Math.max(totals[key][stype], amount * 20); // TODO: replace 20 when #342 is merged
                            }
                        } else if (stype == 'one_sting_one_kill') {
                            if (key == 'Djeeta') {
                                totals[key]["normalOtherCritical"].push({
                                    "value": 0.05,
                                    "attackRatio": 9.00
                                });
                                if (amount == "II") {
                                    totals[key]["criticalDamageLimit"] += 0.30;
                                }
                            }
                        } else if (stype == 'god_of_war') {
                            if (key == 'Djeeta') {
                                totals[key]["normalOtherCritical"].push({
                                    "value": 1.0,
                                    "attackRatio": 5.00
                                });
                                totals[key]["accuracyDebuff"] += 0.50;
                                if (amount == "II") {
                                    totals[key]["criticalDamageLimit"] += 0.30;
                                }
                            }
                        } else if (stype == 'apocalyptic_power') {
                            if (key == 'Djeeta') {
                                totals[key]["superTA"] += 1000.0;
                                if (amount == "II") {
                                    totals[key]["superAdditionalDamage"] += 0.30;
                                }
                            }
                        } else if (stype == 'slaysnakes_myth') {
                            if (key == 'Djeeta') {
                                // Verified by weapon users, not by wiki
                                totals[key][stype] = Math.max(totals[key][stype], 10.0 * arm[skillkey + "Detail"]);
                                if (amount == "II") {
                                    totals[key]["normalDamageLimit"] += 0.10;
                                    totals[key]["exceedOugiDamageLimit"] += 0.10;
                                }
                            }
                        } else {
                            totals[key][stype] += comb[i] * skillAmounts[stype][amount][slv - 1];
                        }
                    }
                }
            }
        }

        // new epic 2nd skills
        totals[key]["ex"] += Math.min(LIMIT.grandEpic, numGrandEpic * epic.countEpicWeapon(arml, comb) * 4.0);

        // Baha weapon duplicate upper limit
        if (totals[key]["bahaAT"] > 50) totals[key]["bahaAT"] = 50;
        if (totals[key]["bahaHP"] > 50) totals[key]["bahaHP"] = 50;
    }
};

module.exports.calcBaseATK = function (rank) {
    if (rank > 190) return 6650 + (rank - 190) * 5;
    if (rank > 175) return 6500 + (rank - 175) * 10;
    if (rank > 100) return 5000 + (rank - 100) * 20;
    if (rank > 1) return 1000 + rank * 40;

    // -> rank == 1
    return 1000;
};

module.exports.calcBaseHP = function (rank) {
    if (rank > 190) return 1730 + (rank - 190) * 1;
    if (rank > 175) return 1700 + (rank - 175) * 2;
    if (rank > 100) return 1400 + (rank - 100) * 4;
    if (rank > 1) return 600 + rank * 8;

    // -> rank == 1
    return 600;
};

function getCharaLB(chara) {
    var LB = {
        "ATK": 0,
        "HP": 0,
        "Element": 0,
        "OugiDamage": 0,
        "OugiDamageLimit": 0,
        "OugiGageBuff": 0,
        "DA": 0.0,
        "TA": 0.0,
        "Critical1": "none",
        "Critical2": "none",
        "Critical3": "none",
        "Critical4": "none",
    };

    Object.keys(LB).map((key) => {
        var exactKey = "LB" + key;
        if (exactKey in chara) {
            if (key == "Critical1" || key == "Critical2" || key == "Critical3" || key == "Critical4") {
                LB[key] = chara[exactKey];
            } else {
                LB[key] = parseFloat(chara[exactKey]);
            }
        }
    });

    return LB;
}

function getLBCriticalArray(charaLB) {
    // LB Critical support
    var LBCriticalKeys = ["Critical1", "Critical2", "Critical3", "Critical4"];
    var criticalArray = [];

    LBCriticalKeys.forEach((crit_key) => {
        if (charaLB[crit_key] !== "none") {
            var chara_lb_crit_type = charaLB[crit_key];
            criticalArray.push({
                "value": limitBonusCriticalList[chara_lb_crit_type].value,
                "attackRatio": limitBonusCriticalList[chara_lb_crit_type].attackRatio
            });
        }
    });

    return criticalArray;
}

function getCharaEXLB(chara) {
    var EXLB = {
        "ATK": 0,
        "HP": 0,
        "OugiDamage": 0,
        "OugiDamageLimit": 0,
        "Critical": "0",
        "Haisui": "0",
        "Konshin": "0",
        "DA": 0.0,
        "TA": 0.0,
        "WED": false
    };

    Object.keys(EXLB).map((key) => {
        var exactKey = "EXLB" + key;
        if (exactKey in chara) {
            if (key === "WED") {
                EXLB[key] = chara[exactKey];
            } else {
                EXLB[key] = parseInt(chara[exactKey], 10);
            }
        }
    });

    return EXLB;
}

function getEXLBCriticalArray(charaEXLB) {
    var criticalArray = [];

    if (charaEXLB != "0") {
        criticalArray.push({
            "value": charaEXLB * 0.01,
            "attackRatio": 0.30
        });
    }

    return criticalArray;
}

module.exports.getInitialTotals = function (prof, chara, summon) {
    var baseAttack = module.exports.calcBaseATK(parseInt(prof.rank));
    var baseHP = module.exports.calcBaseHP(parseInt(prof.rank));
    var element = prof.element != undefined ? prof.element : "fire";
    var sex = prof.sex != undefined ? prof.sex : "female";
    var djeetaRemainHP = prof.remainHP != undefined && parseInt(prof.remainHP) < parseInt(prof.hp) ? 0.01 * parseInt(prof.remainHP) : 0.01 * parseInt(prof.hp);
    var djeetaDA = prof.DA != undefined ? parseFloat(prof.DA) : 6.5;
    var djeetaTA = prof.TA != undefined ? parseFloat(prof.TA) : 3.0;
    var job = prof.job != undefined ? Jobs[prof.job] : Jobs["none"];
    var zenithATK = prof.zenithAttackBonus != undefined ? parseInt(prof.zenithAttackBonus) : 3000;
    var zenithHP = prof.zenithHPBonus != undefined ? parseInt(prof.zenithHPBonus) : 1000;
    var zenithPartyHP = prof.zenithPartyHPBonus != undefined ? parseInt(prof.zenithPartyHPBonus) : 0;

    var djeetaBuffList = {
        personalNormalBuff: 0.0,
        personalElementBuff: 0.0,
        personalOtherBuff: 0.0,
        personalOtherBuff2: 0.0,
        personalDamageUPOnlyNormalBuff: 0.0,
        personalHPBuff: 0.0,
        personalDABuff: 0.0,
        personalTABuff: 0.0,
        personalOugiDamageBuff: 0.0,
        personalOugiGageBuff: 0.0,
        personalAdditionalDamageBuff: 0.0,
        personalDamageLimitBuff: 0.0,
        personalOugiDamageLimitBuff: 0.0,
        personalUplift: 0.0,
        personalSupplementalDamageBuff: 0,
    };

    for (var djeetabuffkey in djeetaBuffList) {
        if (prof[djeetabuffkey] != undefined) {
            djeetaBuffList[djeetabuffkey] = 0.01 * parseFloat(prof[djeetabuffkey])
        }
    }

    var totals = {
        "Djeeta":
            {
                baseAttack: (baseAttack + zenithATK),
                baseHP: (baseHP + zenithPartyHP + zenithHP),
                baseDA: djeetaDA,
                baseTA: djeetaTA,
                remainHP: djeetaRemainHP,
                armAttack: 0,
                armHP: 0,
                fav1: job.favArm1,
                fav2: job.favArm2,
                race: "unknown",
                sex: sex,
                type: job.type,
                element: element,
                LB: getCharaLB({}),
                EXLB: getCharaEXLB({}),
                HPdebuff: 0.00,
                magna: 0,
                magnaSoka: 0,
                magnaHaisui: 0,
                magnaKonshin: 0,
                normal: 0,
                normalSoka: 0,
                normalOther: 0,
                normalHaisui: 0,
                normalOtherHaisui: 0,
                normalKonshin: 0,
                normalOtherKonshin: 0,
                normalSupportKonshin: 0,
                normalSupportKonshinWeapon: 0,
                normalSupportHaisuiWeapon: 0,
                ATKDebuff: 0,
                unknown: 0,
                ex: 0,
                exHaisui: 0,
                caimOther: 0,
                sensei: 0,
                akashaSensei: 0,
                bahaAT: 0,
                bahaHP: 0,
                bahaDA: 0,
                bahaTA: 0,
                magnaHP: 0,
                normalHP: 0,
                unknownHP: 0,
                exHP: 0,
                normalNite: 0,
                magnaNite: 0,
                normalSante: 0,
                normalLesserSante: 0,
                magnaSante: 0,
                magnaLesserSante: 0,
                exNite: 0,
                normalOtherNite: 0,
                normalOtherSante: 0,
                normalOtherLesserSante: 0,
                superTA: 0,
                normalCritical: 0,
                normalOtherCritical: [],
                magnaCritical: 0,
                cosmosAT: 0,
                cosmosBL: 0,
                omegaNormal: 0,
                omegaNormalHP: 0,
                akashaATK: 0,
                akashaHP: 0,
                opusnormalElement: 0,
                opusmagnaElement: 0,
                dracoATK: 0,
                normalElement: 0,
                shinTenNoInori: 0,
                slaysnakes_myth: 0,
                victorys_promise: 0,
                normalOugiDamage: 0,
                magnaOugiDamage: 0,
                superOugiDamage: 0,
                chainDamage: 0,
                normalChainDamage: 0,
                normalDamageLimit: 0,
                cosmosNormalDamageLimit: 0,
                omegaNormalDamageLimit: 0,
                caimDamageLimit: 0,
                criticalDamageLimit: 0,
                ougiDamageLimit: 0,
                magnaOugiDamageLimit: 0,
                normalOugiDamageLimit: 0,
                exceedOugiDamageLimit: 0,
                omegaOugiDamageLimit: 0,
                chainDamageLimit: 0,
                normalChainDamageLimit: 0,
                additionalDamage: 0,
                additionalDamageXA: [0, 0, 0],
                superAdditionalDamage: 0,
                ougiDebuff: 0,
                isConsideredInAverage: true,
                job: job,
                normalBuff: djeetaBuffList["personalNormalBuff"],
                elementBuff: djeetaBuffList["personalElementBuff"],
                elementBuffBoostBuff: 0,
                otherBuff: djeetaBuffList["personalOtherBuff"],
                otherBuff2: djeetaBuffList["personalOtherBuff2"],
                damageUPOnlyNormalBuff: djeetaBuffList["personalDamageUPOnlyNormalBuff"],
                HPBuff: djeetaBuffList["personalHPBuff"],
                DABuff: djeetaBuffList["personalDABuff"],
                TABuff: djeetaBuffList["personalTABuff"],
                DASupport: 0,
                TASupport: 0,
                ougiRatio: !isNaN(prof.ougiRatio) ? parseFloat(prof.ougiRatio) : DEFAULT.ougiRatio,
                ougiBonusPlainDamage: 0,
                ougiGageBuff: djeetaBuffList["personalOugiGageBuff"],
                gainOugiGage: 0,
                uplift: djeetaBuffList["personalUplift"],
                ougiDamageBuff: djeetaBuffList["personalOugiDamageBuff"],
                additionalDamageBuff: djeetaBuffList["personalAdditionalDamageBuff"],
                DAOther: 0,
                TAOther: 0,
                damageLimitBuff: djeetaBuffList["personalDamageLimitBuff"],
                ougiDamageLimitBuff: djeetaBuffList["personalOugiDamageLimitBuff"],
                ougiLimitValues: 0,
                normalOtherCriticalBuff: [],
                support: "none",
                support2: "none",
                support3: "none",
                charaHaisui: 0,
                debuffResistance: 0,
                debuffResistanceBuff: 0,
                cosmosDebuffResistance: 0,
                charaDamageUP: 0,
                tenshiDamageUP: 0,
                charaUniqueDamageUP: 0,
                aegisUP: 0,
                criticalBuff: prof.personalCriticalBuff,
                supplementalDamageBuff: 100 * djeetaBuffList['personalSupplementalDamageBuff'],
                supplementalThirdHit: [],
                covenant: null,
                buffCount: 0,
                echoThirdHit: 0,
                //debuffCount: 0,
                accuracyDebuff: 0,
            }
    };

    for (var i = 0; i < chara.length; i++) {
        if (chara[i].name != "") {
            var charaelement = chara[i].element != undefined ? chara[i].element : "fire";
            var charaDA = chara[i].DA != undefined ? chara[i].DA : 6.5;
            var charaTA = chara[i].TA != undefined ? chara[i].TA : 3.0;
            var charasex = chara[i].sex != undefined ? chara[i].sex : "female";
            var charaRemainHP = chara[i].remainHP != undefined && parseInt(chara[i].remainHP) < parseInt(prof.hp) ? 0.01 * parseInt(chara[i].remainHP) : 0.01 * parseInt(prof.hp);
            var charaConsidered = chara[i].isConsideredInAverage != undefined ? chara[i].isConsideredInAverage : true;

            // key duplicate consistenc
            var charakey = chara[i].name;
            var k = 1;
            while (charakey in totals) {
                charakey = chara[i].name + k;
                k++;
            }

            var charaBuffList = {
                normalBuff: 0.0,
                elementBuff: 0.0,
                otherBuff: 0.0,
                otherBuff2: 0.0,
                damageUPOnlyNormalDamageBuff: 0.0,
                hpBuff: 0.0,
                daBuff: 0.0,
                taBuff: 0.0,
                ougiGageBuff: 0.0,
                ougiDamageBuff: 0.0,
                additionalDamageBuff: 0.0,
                damageLimitBuff: 0.0,
                ougiDamageLimitBuff: 0.0,
                uplift: 0,
                supplementalDamageBuff: 0
            };

            for (var charabuffkey in charaBuffList) {
                if (chara[i][charabuffkey] != undefined) {
                    charaBuffList[charabuffkey] = 0.01 * parseFloat(chara[i][charabuffkey])
                }
            }

            var charaLB = getCharaLB(chara[i]);
            var charaEXLB = getCharaEXLB(chara[i]);

            totals[charakey] = {
                baseAttack: parseInt(chara[i].attack),
                baseHP: parseInt(chara[i].hp) + zenithPartyHP,
                baseDA: parseFloat(charaDA),
                baseTA: parseFloat(charaTA),
                plusBonus: chara[i].plusBonus != undefined ? parseInt(chara[i].plusBonus) : 0,
                remainHP: charaRemainHP,
                armAttack: 0,
                armHP: 0,
                fav1: chara[i].favArm,
                fav2: chara[i].favArm2,
                race: chara[i].race,
                sex: chara[i].sex,
                type: chara[i].type,
                element: charaelement,
                LB: charaLB,
                EXLB: charaEXLB,
                HPdebuff: 0.00,
                magna: 0,
                magnaSoka: 0,
                magnaHaisui: 0,
                magnaKonshin: 0,
                normal: 0,
                normalSoka: 0,
                normalOther: 0,
                normalHaisui: 0,
                normalOtherHaisui: 0,
                normalKonshin: 0,
                normalOtherKonshin: 0,
                normalSupportKonshin: 0,
                normalSupportKonshinWeapon: 0,
                normalSupportHaisuiWeapon: 0,
                ATKDebuff: 0,
                unknown: 0,
                ex: 0,
                exHaisui: 0,
                caimOther: 0,
                sensei: 0,
                akashaSensei: 0,
                bahaAT: 0,
                bahaHP: 0,
                bahaDA: 0,
                bahaTA: 0,
                magnaHP: 0,
                normalHP: 0,
                unknownHP: 0,
                exHP: 0,
                normalNite: 0,
                magnaNite: 0,
                normalSante: 0,
                normalLesserSante: 0,
                magnaSante: 0,
                magnaLesserSante: 0,
                exNite: 0,
                normalOtherNite: 0,
                normalOtherSante: 0,
                normalOtherLesserSante: 0,
                superTA: 0,
                normalCritical: 0,
                normalOtherCritical: [],
                magnaCritical: 0,
                cosmosAT: 0,
                cosmosBL: 0,
                omegaNormal: 0,
                omegaNormalHP: 0,
                akashaATK: 0,
                akashaHP: 0,
                opusnormalElement: 0,
                opusmagnaElement: 0,
                dracoATK: 0,
                normalElement: 0,
                shinTenNoInori: 0,
                slaysnakes_myth: 0,
                victorys_promise: 0,
                chainDamage: 0,
                normalOugiDamage: 0,
                magnaOugiDamage: 0,
                superOugiDamage: 0,
                normalChainDamage: 0,
                normalDamageLimit: 0,
                cosmosNormalDamageLimit: 0,
                omegaNormalDamageLimit: 0,
                caimDamageLimit: 0,
                criticalDamageLimit: 0,
                ougiDamageLimit: 0,
                chainDamageLimit: 0,
                magnaOugiDamageLimit: 0,
                normalOugiDamageLimit: 0,
                exceedOugiDamageLimit: 0,
                omegaOugiDamageLimit: 0,
                normalChainDamageLimit: 0,
                additionalDamage: 0,
                additionalDamageXA: [0, 0, 0],
                superAdditionalDamage: 0,
                ougiDebuff: 0,
                isConsideredInAverage: charaConsidered,
                normalBuff: charaBuffList["normalBuff"],
                elementBuff: charaBuffList["elementBuff"],
                elementBuffBoostBuff: 0,
                otherBuff: charaBuffList["otherBuff"],
                otherBuff2: charaBuffList["otherBuff2"],
                damageUPOnlyNormalBuff: charaBuffList["damageUPOnlyNormalDamageBuff"],
                HPBuff: charaBuffList["hpBuff"],
                DABuff: charaBuffList["daBuff"],
                TABuff: charaBuffList["taBuff"],
                DASupport: 0,
                TASupport: 0,
                ougiRatio: !isNaN(chara[i].ougiRatio) ? parseFloat(chara[i].ougiRatio) : DEFAULT.ougiRatio,
                ougiBonusPlainDamage: chara[i].ougiBonusPlainDamage != undefined ? parseInt(chara[i].ougiBonusPlainDamage) : 0,
                ougiGageBuff: charaBuffList["ougiGageBuff"],
                gainOugiGage: 0,
                uplift: charaBuffList["uplift"],
                ougiDamageBuff: charaBuffList["ougiDamageBuff"],
                additionalDamageBuff: charaBuffList["additionalDamageBuff"],
                DAOther: 0,
                TAOther: 0,
                damageLimitBuff: charaBuffList["damageLimitBuff"],
                ougiDamageLimitBuff: charaBuffList["ougiDamageLimitBuff"],
                ougiLimitValues: 0,
                normalOtherCriticalBuff: [],
                support: chara[i].support,
                support2: chara[i].support2,
                support3: chara[i].support3,
                charaHaisui: 0,
                debuffResistance: 0,
                debuffResistanceBuff: 0,
                cosmosDebuffResistance: 0,
                charaDamageUP: 0,
                tenshiDamageUP: 0,
                charaUniqueDamageUP: 0,
                aegisUP: 0,
                criticalBuff: chara[i].criticalBuff,
                supplementalDamageBuff: 100 * charaBuffList['supplementalDamageBuff'],
                supplementalThirdHit: [],
                covenant: null,
                echoThirdHit: 0,
                //buffCount: 0,
                //debuffCount: 0,
                accuracyDebuff: 0,
            };
        }
    }

    var races = module.exports.checkNumberOfRaces(chara);
    for (var key in totals) {
        totals[key]["totalSummon"] = [];
        for (var s = 0; s < summon.length; s++) {
            var selfElement = summon[s].selfElement != undefined ? summon[s].selfElement : "fire";
            var friendElement = summon[s].friendElement != undefined ? summon[s].friendElement : "fire";

            var totalSummon = {
                magna: 1.0,
                element: 1.0,
                elementTurn: 1.0,
                zeus: 1.0,
                chara: 0.0,
                ranko: 1.0,
                attack: 0,
                hp: 0.0,
                hpBonus: 0.0,
                da: 0,
                ta: 0,
                ougiDamage: 0,
                tenshiDamageUP: 0,
                damageLimit: 0,
                shivaBuff: false
            };

            if (summonElementTypes[selfElement]["type"].indexOf(totals[key]["element"]) >= 0 || selfElement == "all") {
                if (summon[s].selfSummonType == "odin") {
                    // Processing in multiple cases such as odin (attribute + character attack)
                    totalSummon["element"] += 0.01 * parseInt(summon[s].selfSummonAmount);
                    totalSummon["chara"] += 0.01 * parseInt(summon[s].selfSummonAmount2)
                } else if (summon[s].selfSummonType == "elementByRace") {
                    totalSummon["element"] += 0.01 * module.exports.getTesukatoripokaAmount(parseInt(summon[s].selfSummonAmount), races)
                } else {
                    // Main summon protection
                    totalSummon[summon[s].selfSummonType] += 0.01 * parseInt(summon[s].selfSummonAmount)
                }
            }
            if (summonElementTypes[friendElement]["type"].indexOf(totals[key]["element"]) >= 0 || friendElement == "all") {
                if (summon[s].friendSummonType == "odin") {
                    // Processing in multiple cases such as odin (attribute + character attack)
                    totalSummon["element"] += 0.01 * parseInt(summon[s].friendSummonAmount);
                    totalSummon["chara"] += 0.01 * parseInt(summon[s].friendSummonAmount2)
                } else if (summon[s].friendSummonType == "elementByRace") {
                    totalSummon["element"] += 0.01 * module.exports.getTesukatoripokaAmount(parseInt(summon[s].friendSummonAmount), races)
                } else {
                    // Friend Summon protection
                    totalSummon[summon[s].friendSummonType] += 0.01 * parseInt(summon[s].friendSummonAmount)
                }
            }

            // Since it was added later, it is judged whether it is not NaN
            if (!isNaN(summon[s].attack)) totalSummon["attack"] = parseInt(summon[s].attack);
            if (!isNaN(summon[s].hp)) totalSummon["hp"] = parseInt(summon[s].hp);
            if (!isNaN(summon[s].hpBonus)) totalSummon["hpBonus"] = 0.01 * parseInt(summon[s].hpBonus);
            if (!isNaN(summon[s].DA)) totalSummon["da"] = 0.01 * parseInt(summon[s].DA);
            if (!isNaN(summon[s].TA)) totalSummon["ta"] = 0.01 * parseInt(summon[s].TA);
            if (!isNaN(summon[s].ougiDamage)) totalSummon["ougiDamage"] = 0.01 * parseInt(summon[s].ougiDamage);
            if (!isNaN(summon[s].tenshiDamageUP)) totalSummon["tenshiDamageUP"] = parseInt(summon[s].tenshiDamageUP);
            if (!isNaN(summon[s].damageLimit)) totalSummon["damageLimit"] = parseInt(summon[s].damageLimit);
            if (!isNaN(summon[s].shivaBuff)) totalSummon["shivaBuff"] = summon[s].shivaBuff;

            totals[key]["totalSummon"][s] = totalSummon
        }
    }

    for (var key in totals) {
        totals[key]["typeBonus"] = module.exports.getTypeBonus(totals[key]["element"], prof.enemyElement)
    }

    return totals
};

module.exports.calcOneCombination = function (comb, summon, prof, chara, arml, totals, buff) {
    module.exports.addSkilldataToTotals(totals, comb, arml, buff);
    module.exports.treatSupportAbility(totals, chara, comb, arml, buff);
    var result = [];
    for (var i = 0; i < summon.length; i++) {
        // Make an array of associative arrays containing results such as attacks
        result.push(module.exports.calcBasedOneSummon(i, prof, buff, totals));
    }

    return result
};

// Overwrite the content of totals with what reflects chara's support
module.exports.treatSupportAbility = function (totals, chara, comb, arml, buff) {
    var index = 0;
    for (var key in totals) {
        index = index + 1 | 0;
        for (let support of eachSupport(totals[key])) {
            // Processing of special supporter abilities
            switch (support.type) {
                case "normalBuff_doraf":
                    if (totals[key].isConsideredInAverage) {
                        for (var key2 in totals) {
                            // Draph, Unknown and Primal characters only (Fortified Vigor)
                            if (bahaRaceContains(["doraf"], totals[key2]["race"])) {
                                totals[key2]["normalBuff"] += support.value;
                            }
                        }
                    } else {
                        // Calculate yourself only if you do not put it in the average
                        totals[key]["normalBuff"] += support.value;
                    }
                    continue;
                case "normalBuff_depends_races":
                    var races = Math.min(3, module.exports.checkNumberOfRaces(chara));
                    totals[key]["otherBuff"] = (1.0 + totals[key]["otherBuff"]) * (1.0 + races * 0.10) - 1.0;
                    continue;
                case "normalBuff_depends_member":
                    continue;
                case "DATASupport":
                    let [daRate, taRate] = support.value;
                    if (totals[key].isConsideredInAverage) {
                        for (let key2 in totals) {
                            if (totals[key2]["element"] === support.range
                              || support.range === "all"
                              || (support.range === "own" && key === key2)) {
                                totals[key2]["DASupport"] += daRate;
                                totals[key2]["TASupport"] += taRate;
                            }
                        }
                    } else {
                        // Calculate yourself only if you do not put it in the average
                        totals[key]["DASupport"] += daRate;
                        totals[key]["TASupport"] += taRate;
                    }
                    continue;
                case "daBuff_fist":
                    if (totals[key].isConsideredInAverage) {
                        for (var key2 in totals) {
                            if (favContains("fist", [totals[key2]["fav1"], totals[key2]["fav2"]])) {
                                totals[key2]["DASupport"] += support.value;
                            }
                        }
                    } else {
                        // Calculate yourself only if you do not put it in the average
                        totals[key]["DASupport"] += support.value;
                    }
                    continue;
                case "shinryu_to_no_kizuna":
                    if (when.element_buff(chara, buff)) {
                        totals[key]["normalBuff"] += support.value;
                    }
                    continue;
                case "hanged_man_reversed":
                    if (index > 4) {
                        if (epic.isAllUniqueArm(arml, comb)) {
                            if (totals[key].isConsideredInAverage) {
                                for (var key2 in totals) {
                                    if (totals[key2]["element"] === support.range) {
                                        totals[key2]["caimOther"] += 0.20;
                                        totals[key2]["caimDamageLimit"] += 0.10;
                                    }
                                }
                            } else {
                                // Calculate yourself only if you do not put it in the average
                                totals[key]["caimOther"] += 0.20;
                                totals[key]["caimDamageLimit"] += 0.10;
                            }
                        }
                    }
                    continue;
                case "element_buff_boost":
                    for (let [name, chara] of support.range(totals, key)) {
                        if (when.element_buff(chara, buff)) {
                            chara["elementBuffBoostBuff"] = Math.max(support.value, chara["elementBuffBoostBuff"]);
                        }
                    }
                    continue;
                case "eternal_wisdom":
                    if (totals[key]["elementBuff"] > 0 || buff["element"] > 0) {
                        totals[key]["normalBuff"] += 0.30;
                        totals[key]["DASupport"] += 0.35;
                        totals[key]["TASupport"] += 0.10;
                    }
                    continue;
                case "emnity_all_SL10":
                    // Refer to HP of Zahlhamelina/Yuisis (Fire)
                    var charaHaisuiValue = module.exports.calcHaisuiValue("charaHaisui", "L", 10, totals[key]["remainHP"]);
                    for (let [name, chara] of range[support.range](totals, key)) {
                        chara["charaHaisui"] = Math.max(chara["charaHaisui"], charaHaisuiValue);
                    }
                    continue;
                case "emnity_own_SL20":
                    totals[key]["charaHaisui"] += module.exports.calcHaisuiValue("charaHaisui", "L", 27.5, totals[key]["remainHP"]);
                    continue;
                case "emnity_own_SL20_steps":
                    if (totals[key]["remainHP"] < 0.75 && totals[key]["remainHP"] >= 0.50) {
                        totals[key]["charaHaisui"] += 15;
                    } else if (totals[key]["remainHP"] < 0.50 && totals[key]["remainHP"] >= 0.25) {
                        totals[key]["charaHaisui"] += 30;
                    } else if (totals[key]["remainHP"] < 0.25) {
                        totals[key]["charaHaisui"] += 45;
                    }
                    continue;
                case "envoy_meditation":
                    var elements = Math.min(4, module.exports.checkNumberOfElements(totals));
                    // number of elements * attack 15% DA 10% TA 3%
                    totals[key]["normalBuff"] += elements * 0.15;
                    totals[key]["DASupport"] += elements * 0.10;
                    totals[key]["TASupport"] += elements * 0.03;
                    continue;
                case "ideal_vassals":
                    var countBattleMembers = Math.min(4, Object.values(totals).filter((x) => x.name != "" && x.isConsideredInAverage).length);
                    switch (countBattleMembers) {
                        case 1:
                            break;
                        case 2:
                            totals[key]["normalBuff"] += 0.05;
                            break;
                        case 3:
                            totals[key]["normalBuff"] += 0.10;
                            totals[key]["DASupport"] += 0.03;
                            break;
                        case 4:
                            totals[key]["normalBuff"] += 0.15;
                            totals[key]["DASupport"] += 0.10;
                            totals[key]["TASupport"] += 0.06;
                            break;
                        default:
                            break;
                    }
                    continue;
                case "dance_of_nataraja":
                    totals[key]["ougiGageBuff"] -= 0.35;
                    totals[key]["charaUniqueDamageUP"] += 0.15;
                    continue;
                case "recklessness_incarnate":
                    totals[key]["ougiGageBuff"] -= 0.35;
                    totals[key]["charaUniqueDamageUP"] += 0.15;
                    totals[key]["HPBuff"] += 0.20;
                    continue;
                case "knightmare_frame":
                    totals[key]["HPBuff"] += 0.15;
                    totals[key]["ougiGageBuff"] -= 0.25;
                    continue;
                case "sumizome_sakura":
                    if (totals[key]['remainHP'] < 0.25) {
                        totals[key]["DASupport"] += 10.00;
                        totals[key]["TASupport"] += 10.00;
                        totals[key]["additionalDamageXA"] = support.value;
                    }
                    continue;
                case "charaDamageUP_OugiCap":
                    // obsolete
                    totals[key]["charaDamageUP"] += support.value;
                    totals[key]["ougiDamageLimitBuff"] += support.value;
                    continue;
                case "additionalDamageXA":
                    // currently, range: own only, and no chances to stack.
                    totals[key]["additionalDamageXA"] = support.value;
                    // Implemented Stacking. Can someone verify?
                    // for (let [name, chara] of support.range(totals, key)) {
                    //     for (let i = 0; i < support.value.length; i++) {
                    //         chara["additionalDamageXA"][i] += support.value[i];
                    //     }
                    // }
                    continue;
                case "element_buff_boost_damageUP_own_10":
                    if (when.element_buff(totals[key], buff)) {
                        totals[key]["charaDamageUP"] += support.value;
                    }
                    continue;
                case "critical_cap_up":
                    for (let [name, chara] of support.range(totals, key)) {
                        chara["criticalDamageLimit"] += support.value;
                    }
                    continue;
                case "no_normal_attack":
                    continue;
                case "normalSupportKonshin_hpDebuff":
                    totals[key]["HPdebuff"] += support.hpDebuff;
                    // falls through
                case "normalSupportKonshin":
                    let supportKonshinValue = module.exports.calcHaisuiValue("normalSupportKonshin", support.value, 1, totals[key]["remainHP"]);
                    if (totals[key].isConsideredInAverage) {
                        for (let key2 in totals) {
                            totals[key2]["normalSupportKonshin"] = Math.max(totals[key2]["normalSupportKonshin"], supportKonshinValue);
                        }
                    } else {
                        totals[key]["normalSupportKonshin"] = Math.max(totals[key]["normalSupportKonshin"], supportKonshinValue);
                    }
                    continue;
                case "supplemental_third_hit":
                    if (support.range == "own") {
                        totals[key]["supplementalThirdHit"].push({"source": "サポアビ", value: support.value});
                    }
                    continue;
                // case "tousou_no_chishio":
                //     if (totals[key]['remainHP'] <= 0.6 && totals[key]['remainHP'] > 0.4) {
                //         totals[key]["DASupport"] += 0.20;
                //         totals[key]["TASupport"] += 0.10;
                //         totals[key]["damageLimitBuff"] += 0.10;
                //         totals[key]["ougiDamageLimitBuff"] += 0.0;
                //     } else if (totals[key]['remainHP'] <= 0.4 && totals[key]['remainHP'] > 0.2) {
                //         totals[key]["DABuff"] += 0.30;
                //         totals[key]["TASupport"] += 0.15;
                //         totals[key]["damageLimitBuff"] += 0.20;
                //         totals[key]["ougiDamageLimitBuff"] += 0.15;
                //     } else if (totals[key]['remainHP'] <= 0.2 && totals[key]['remainHP'] >= 0.0) {
                //         totals[key]["DASupport"] += 0.50;
                //         totals[key]["TASupport"] += 0.25;
                //         totals[key]["damageLimitBuff"] += 0.30;
                //         totals[key]["ougiDamageLimitBuff"] += 0.20;
                //     }
                //     continue;
                // case "fumetsu_no_mikiri":
                //     if (totals[key].remainHP <= 0.6) {
                //         totals[key]["normalOtherCriticalBuff"].push({
                //             "value": (-1/3) * totals[key]["remainHP"] + 0.40,
                //             "attackRatio": 0.50,
                //         });
                //     }
                //     continue;
                case "kenkyaku_no_koou":
                    if (totals[key]['remainHP'] == 1.0) {
                        totals[key]["ougiDamageBuff"] += 0.30;
                    } else if (totals[key]['remainHP'] < 1.0 && totals[key]['remainHP'] >= 0.75) {
                        totals[key]["ougiDamageBuff"] += 0.15;
                    } else if (totals[key]['remainHP'] < 0.75 && totals[key]['remainHP'] >= 0.5) {
                        totals[key]["ougiDamageBuff"] += 0.10;
                    }
                    continue;
                case "benedikutosu_soure":
                    if (buff["retsujitsuNoRakuen"]) {
                        var [ougiDamageBuff, ougiDamageLimitBuff] = support.value;
                        totals[key]["ougiDamageBuff"] += ougiDamageBuff;
                        totals[key]["ougiDamageLimitBuff"] += ougiDamageLimitBuff;
                    }
                    continue;
                default:
                    break;
            }

            // Processing in case of simple buff system

            // FIXME: restrict filtering range function lookup
            //   currently support "all", "own", "others", "Djeeta"
            //   not work well with, range: "element" etc .. use range function
            let range_filter = range[support.range] || support.range;

            for (let [name, chara] of range_filter(totals, key)) {
                if (support.when && !support.when(chara, buff))
                    continue;
                switch (support.assign || "add") {
                case "push":
                    chara[support.type].push(support.value);
                    break;
                case "max":
                    chara[support.type] = Math.max(support.value, chara[support.type]);
                    break;
                case "add":
                    chara[support.type] += support.value;
                    break;
                case "set":
                    chara[support.type] = support.value;
                    break;
                case "multiply":
                    chara[support.type] = ((1.0 + chara[support.type]) * (1.0 + support.value)) - 1.0;
                }
            }
        }
    }
};

module.exports.generateHaisuiData = function (res, arml, summon, prof, chara, storedCombinations, storedNames, displayRealHP, locale) {
    var data = {};

    var minMaxArr = {
        "totalAttack": {"max": 0, "min": 0},
        "totalHP": {"max": 0, "min": 0},
        "criticalAttack": {"max": 0, "min": 0},
        "totalExpected": {"max": 0, "min": 0},
        "expectedCycleDamagePerTurn": {"max": 0, "min": 0},
        "averageAttack": {"max": 0, "min": 0},
        "averageTotalExpected": {"max": 0, "min": 0},
        "averageCyclePerTurn": {"max": 0, "min": 0},
        "averageCriticalAttack": {"max": 0, "min": 0},
    };
    var cnt = 1;
    var considerAverageArray = {};
    for (var ch = 0; ch < chara.length; ch++) {
        var charaConsidered = chara[ch].isConsideredInAverage != undefined ? chara[ch].isConsideredInAverage : true;
        if (charaConsidered && chara[ch].name != "") {
            cnt++;
            considerAverageArray[chara[ch].name] = true
        } else {
            considerAverageArray[chara[ch].name] = false
        }
    }

    if (res.length > 1) {
        var AllTotalAttack = [[(displayRealHP ? intl.translate("残りHP", locale) : intl.translate("残HP割合", locale))]];
        var AllCycleDamagePerTurn = [[(displayRealHP ? intl.translate("残りHP", locale) : intl.translate("残HP割合", locale))]];
        var AllCriticalAttack = [[(displayRealHP ? intl.translate("残りHP", locale) : intl.translate("残HP割合", locale))]];
        var AllTotalExpected = [[(displayRealHP ? intl.translate("残りHP", locale) : intl.translate("残HP割合", locale))]];
        var AllAverageTotalAttack = [[(displayRealHP ? intl.translate("残りHP", locale) : intl.translate("残HP割合", locale))]];
        var AllAverageTotalExpected = [[(displayRealHP ? intl.translate("残りHP", locale) : intl.translate("残HP割合", locale))]];
        var AllAverageCycleDamagePerTurn = [[(displayRealHP ? intl.translate("残りHP", locale) : intl.translate("残HP割合", locale))]];
        var AllAverageCriticalAttack = [[(displayRealHP ? intl.translate("残りHP", locale) : intl.translate("残HP割合", locale))]];
        var AllTotalHP = [[(displayRealHP ? intl.translate("残りHP", locale) : intl.translate("残HP割合", locale))]]
    }

    // Because the character formation is unchanged every weapon organization, it can be calculated earlier
    var charaHaisuiBuff = [];
    for (let k = 0; k <= 100; k++) {
        let charaHaisuiValue = module.exports.recalcCharaHaisui(chara, 0.01 * k);
        charaHaisuiBuff.push(charaHaisuiValue);
    }

    var normalSupportKonshin = [];
    for (let k = 0; k <= 100; k++) {
        let normalSupportKonshinValue = module.exports.recalcNormalSupportKonshin(chara, 0.01 * k);
        normalSupportKonshin.push(normalSupportKonshinValue);
    }

    var allAlreadyUsedHP = {};

    for (var s = 0; s < res.length; s++) {
        var oneresult = res[s];
        var summonHeader = module.exports.makeSummonHeaderString(summon[s], locale, s+1);
        var TotalAttack = [[(displayRealHP ? intl.translate("残りHP", locale) : intl.translate("残HP割合", locale))]];
        var TotalHP = [[(displayRealHP ? intl.translate("残りHP", locale) : intl.translate("残HP割合", locale))]];
        var CriticalAttack = [[(displayRealHP ? intl.translate("残りHP", locale) : intl.translate("残HP割合", locale))]];
        var TotalExpected = [[(displayRealHP ? intl.translate("残りHP", locale) : intl.translate("残HP割合", locale))]];
        var CycleDamagePerTurn = [[(displayRealHP ? intl.translate("残りHP", locale) : intl.translate("残HP割合", locale))]];
        var AverageTotalExpected = [[(displayRealHP ? intl.translate("残りHP", locale) : intl.translate("残HP割合", locale))]];
        var AverageTotalAttack = [[(displayRealHP ? intl.translate("残りHP", locale) : intl.translate("残HP割合", locale))]];
        var AverageCriticalAttack = [[(displayRealHP ? intl.translate("残りHP", locale) : intl.translate("残HP割合", locale))]];
        var AverageCycleDamagePerTurn = [[(displayRealHP ? intl.translate("残りHP", locale) : intl.translate("残HP割合", locale))]];

        var alreadyUsedHP = {};

        for (var j = 0; j < oneresult.length; j++) {
            var onedata = oneresult[j].data;
            var title = storedNames[j];

            TotalAttack[0].push(title);
            TotalHP[0].push(title);
            CriticalAttack[0].push(title);
            TotalExpected[0].push(title);
            CycleDamagePerTurn[0].push(title);
            AverageTotalExpected[0].push(title);
            AverageTotalAttack[0].push(title);
            AverageCycleDamagePerTurn[0].push(title);
            AverageCriticalAttack[0].push(title);

            // In the case of two or more summons
            if (res.length > 1) {
                AllTotalAttack[0].push("[" + summonHeader + "] " + title);
                AllTotalHP[0].push("[" + summonHeader + "] " + title);
                AllCriticalAttack[0].push("[" + summonHeader + "] " + title);
                AllTotalExpected[0].push("[" + summonHeader + "] " + title);
                AllCycleDamagePerTurn[0].push("[" + summonHeader + "] " + title);
                AllAverageTotalExpected[0].push("[" + summonHeader + "] " + title);
                AllAverageTotalAttack[0].push("[" + summonHeader + "] " + title);
                AllAverageCriticalAttack[0].push("[" + summonHeader + "] " + title);
                AllAverageCycleDamagePerTurn[0].push("[" + summonHeader + "] " + title)
            }

            for (var key in onedata) {
                var totalSummon = onedata[key].totalSummon;
                var normalHaisuiOrig = onedata[key].skilldata.normalHaisui;
                var magnaHaisuiOrig = onedata[key].skilldata.magnaHaisui;
                var magnaKonshinOrig = onedata[key].skilldata.magnaKonshin;
                var charaHaisuiOrig = onedata[key].skilldata.charaHaisui;
                var normalKonshinOrig = onedata[key].skilldata.normalKonshin;
                var exHaisuiOrig = onedata[key].skilldata.exHaisui;
                var lbHaisuiOrig = onedata[key].skilldata.LBHaisui;
                var lbKonshinOrig = onedata[key].skilldata.LBKonshin;
                var totalSkillWithoutHaisui = onedata[key].totalSkillCoeff / (normalHaisuiOrig * magnaHaisuiOrig * normalKonshinOrig * charaHaisuiOrig * exHaisuiOrig * magnaKonshinOrig * lbHaisuiOrig * lbKonshinOrig);

                var lbHaisuiBuff = [],
                    lbKonshinBuff = [];
                for (let k = 0; k <= 100; k++) {
                    let hp = 0.01 * k;
                    let exlbHaisuiValue = 1.0 + module.exports.calcLBHaisuiValue("EXLBHaisui", onedata[key].exlbHaisui, hp);
                    let exlbKonshinValue = 1.0 + module.exports.calcLBHaisuiValue("EXLBKonshin", onedata[key].exlbKonshin, hp);
                    lbHaisuiBuff.push(exlbHaisuiValue);
                    lbKonshinBuff.push(exlbKonshinValue);
                }

                var haisuiBuff = [];
                // Character emnity should be calculated for each character
                for (var k = 0; k <= 100; k++) {
                    haisuiBuff.push({
                        normalHaisui: 1.0,
                        magnaHaisui: 1.0,
                        normalKonshin: 1.0,
                        magnaKonshin: 1.0,
                        exHaisui: 1.0,
                        charaHaisui: charaHaisuiBuff[k],
                        normalSupportKonshin: normalSupportKonshin[k],
                        lbHaisui: lbHaisuiBuff[k],
                        lbKonshin: lbKonshinBuff[k],
                    })
                }

                // Prevent omega weapons skills from being computed in duplicate
                var omegaHaisuiIncluded = false;
                var omegaKonshinIncluded = false;

                // Weapon data calculation
                for (var i = 0; i < arml.length; i++) {
                    var arm = arml[i];

                    if (storedCombinations[j][i] === 0) continue;

                    for (let [skillkey, skillname, element] of eachSkill(arm)) {
                        var stype = skilltypes[skillname].type;
                        var amount = skilltypes[skillname].amount;
                        var slv = parseInt(arm.slv);

                        slv = maskInvalidSkillLevel(slv, stype, amount);

                        if (skillname === "omega-gekijou") {
                            if (!omegaHaisuiIncluded && favCharaContains(arm.armType, onedata[key])) {
                                for (var l = 0; l < haisuiBuff.length; l++) {
                                    var remainHP = 0.01 * (l + 1);
                                    haisuiBuff[l]["normalHaisui"] += 0.01 * module.exports.calcHaisuiValue("normalHaisui", amount, slv, remainHP)
                                }
                                omegaHaisuiIncluded = true;
                            }
                        } else if (skillname === "omega-kyousou") {
                            if (!omegaKonshinIncluded && favCharaContains(arm.armType, onedata[key])) {
                                for (var l = 0; l < haisuiBuff.length; l++) {
                                    var remainHP = 0.01 * (l + 1);
                                    haisuiBuff[l]["normalKonshin"] += 0.01 * module.exports.calcHaisuiValue("omegaKonshin", amount, slv, remainHP)
                                }
                                omegaKonshinIncluded = true;
                            }
                        } else if (stype == 'cherubimKonshin') {
                            for (var l = 0; l < haisuiBuff.length; l++) {
                                let normalSupportKonshinValue = 0.01 * module.exports.calcHaisuiValue("normalSupportKonshin", "M", "1", 0.01 * (l + 1));
                                haisuiBuff[l]["normalSupportKonshin"] = Math.max(haisuiBuff[l]["normalSupportKonshin"], normalSupportKonshinValue);
                            }
                        } else if (stype == 'sunbladeKonshin') {
                            for (var l = 0; l < haisuiBuff.length; l++) {
                                let normalSupportKonshinValue = 0.01 * module.exports.calcHaisuiValue("normalSupportKonshin", "L", "1", 0.01 * (l + 1));
                                haisuiBuff[l]["normalSupportKonshin"] = Math.max(haisuiBuff[l]["normalSupportKonshin"], normalSupportKonshinValue);
                            }
                        } else if (onedata[key].element == element) {
                            if (isHaisuiType(stype)) {
                                if (stype === "normalHaisui" || stype === "normalKonshin") {
                                    for (var l = 0; l < haisuiBuff.length; l++) {
                                        var remainHP = 0.01 * (l + 1);
                                        haisuiBuff[l][stype] += storedCombinations[j][i] * 0.01 * module.exports.calcHaisuiValue(stype, amount, slv, remainHP) * totalSummon.zeus
                                    }
                                } else if (stype === "normalOtherKonshin") {
                                    for (var l = 0; l < haisuiBuff.length; l++) {
                                        var remainHP = 0.01 * (l + 1);
                                        haisuiBuff[l]["normalKonshin"] += storedCombinations[j][i] * 0.01 * module.exports.calcHaisuiValue(stype, amount, slv, remainHP)
                                    }
                                } else if (stype === "magnaHaisui" || stype === "magnaKonshin") {
                                    for (var l = 0; l < haisuiBuff.length; l++) {
                                        var remainHP = 0.01 * (l + 1);
                                        haisuiBuff[l][stype] += storedCombinations[j][i] * 0.01 * module.exports.calcHaisuiValue(stype, amount, slv, remainHP) * totalSummon.magna
                                    }
                                } else {
                                    for (var l = 0; l < haisuiBuff.length; l++) {
                                        var remainHP = 0.01 * (l + 1);
                                        haisuiBuff[l][stype] += storedCombinations[j][i] * 0.01 * module.exports.calcHaisuiValue(stype, amount, slv, remainHP)
                                    }
                                }
                            }
                        }
                    }
                }
                for (var k = 0; k <= 100; k++) {
                    var newTotalSkillCoeff = totalSkillWithoutHaisui * haisuiBuff[k].normalHaisui * haisuiBuff[k].magnaHaisui * (haisuiBuff[k].normalKonshin + haisuiBuff[k].normalSupportKonshin) * haisuiBuff[k].magnaKonshin * haisuiBuff[k].charaHaisui * haisuiBuff[k].exHaisui * haisuiBuff[k].lbHaisui * haisuiBuff[k].lbKonshin;
                    var summedAttack = onedata[key].displayAttack;
                    var newTotalAttack = summedAttack * newTotalSkillCoeff;
                    var newTotalExpected = newTotalAttack * onedata[key].criticalRatio * onedata[key].expectedAttack;

                    var newDamage = module.exports.calcDamage(summedAttack, newTotalSkillCoeff, onedata[key].criticalRatio, prof.enemyDefense, prof.defenseDebuff, onedata[key].skilldata.enemyResistance, onedata[key].skilldata.additionalDamage, onedata[key].skilldata.damageUP + onedata[key].skilldata.damageUPOnlyNormalDamage, onedata[key].normalDamageLimitValues)
                    var accuracy = 1.0;
                    accuracy -= (onedata[key].skilldata.accuracyDebuff - 1.0);
                    newDamage *= accuracy;
                    var newOugiDamage = module.exports.calcOugiDamage(summedAttack, newTotalSkillCoeff, onedata[key].criticalRatio, prof.enemyDefense, prof.defenseDebuff, onedata[key].skilldata.enemyResistance, onedata[key].ougiRatio, onedata[key].skilldata.ougiDamageUP, onedata[key].skilldata.damageUP, onedata[key].ougiFixedDamage, onedata[key].ougiBonusPlainDamage, onedata[key].ougiDamageLimitValues)

                    var chainBurstSupplemental = 0;
                    var newDamageWithoutCritical = 0; //just a placeholder. not to be used in any calculation.
                    [newDamage, newDamageWithoutCritical, newOugiDamage, chainBurstSupplemental] = supplemental.calcOthersDamage(onedata[key].skilldata.supplementalDamageArray, [newDamage, newDamageWithoutCritical, newOugiDamage, chainBurstSupplemental], {remainHP: k/100});

                    var chainNumber = !isNaN(prof.chainNumber) ? parseInt(prof.chainNumber) : 1;
                    var newChainBurst = chainBurstSupplemental + module.exports.calcChainBurst(chainNumber * newOugiDamage, chainNumber, module.exports.getTypeBonus(onedata[key].element, prof.enemyElement), onedata[key].skilldata.enemyResistance, onedata[key].skilldata.chainDamageUP, onedata[key].skilldata.chainDamageLimit) / chainNumber;

                    var newExpectedCycleDamagePerTurn = (onedata[key].expectedTurn === Infinity)
                    ? onedata[key].expectedAttack * newDamage
                    : newChainBurst + newOugiDamage + onedata[key].expectedTurn * onedata[key].expectedAttack * newDamage;


                    [newDamage, newExpectedCycleDamagePerTurn] = supplemental.calcThirdHitDamage(onedata[key].skilldata.supplementalDamageArray, [newDamage, newExpectedCycleDamagePerTurn], {expectedTurn: onedata[key].expectedTurn});

                    newExpectedCycleDamagePerTurn /= (onedata[key].expectedTurn === Infinity ? 1 : onedata[key].expectedTurn + 1);

                    var hp;
                    if (displayRealHP) {
                        // Actual HP
                        hp = parseInt(0.01 * k * onedata["Djeeta"].totalHP);
                    } else {
                        // Residual HP ratio
                        hp = k;
                    }

                    if (key == "Djeeta") {
                        var index;
                        if (hp in alreadyUsedHP) {
                            index = alreadyUsedHP[hp] - 1
                        } else {
                            alreadyUsedHP[hp] = TotalAttack.push([hp]);
                            TotalHP.push([hp]);
                            TotalExpected.push([hp]);
                            CriticalAttack.push([hp]);
                            CycleDamagePerTurn.push([hp]);
                            AverageTotalAttack.push([hp]);
                            AverageTotalExpected.push([hp]);
                            AverageCycleDamagePerTurn.push([hp]);
                            AverageCriticalAttack.push([hp]);
                            index = alreadyUsedHP[hp] - 1;

                            for (var subj = 0; subj < oneresult.length; subj++) {
                                // In order to make a scatter diagram, we will create a result field first
                                TotalAttack[index].push(null);
                                CycleDamagePerTurn[index].push(null);
                                CriticalAttack[index].push(null);
                                TotalExpected[index].push(null);
                                TotalHP[index].push(null);
                                AverageTotalAttack[index].push(null);
                                AverageTotalExpected[index].push(null);
                                AverageCycleDamagePerTurn[index].push(null);
                                AverageCriticalAttack[index].push(null)
                            }

                            if (res.length > 1) {
                                var allindex;
                                if (hp in allAlreadyUsedHP) {
                                    allindex = allAlreadyUsedHP[hp] - 1
                                } else {
                                    allAlreadyUsedHP[hp] = AllTotalAttack.push([hp]);
                                    AllTotalHP.push([hp]);
                                    AllTotalExpected.push([hp]);
                                    AllCriticalAttack.push([hp]);
                                    AllCycleDamagePerTurn.push([hp]);
                                    AllAverageTotalAttack.push([hp]);
                                    AllAverageTotalExpected.push([hp]);
                                    AllAverageCycleDamagePerTurn.push([hp]);
                                    AllAverageCriticalAttack.push([hp]);
                                    allindex = allAlreadyUsedHP[hp] - 1;

                                    // To put it together, prepare it by res.length * oneres.length
                                    for (var subj = 0; subj < res.length * oneresult.length; subj++) {
                                        AllTotalAttack[allindex].push(null);
                                        AllCycleDamagePerTurn[allindex].push(null);
                                        AllCriticalAttack[allindex].push(null);
                                        AllTotalExpected[allindex].push(null);
                                        AllTotalHP[allindex].push(null);
                                        AllAverageTotalAttack[allindex].push(null);
                                        AllAverageTotalExpected[allindex].push(null);
                                        AllAverageCycleDamagePerTurn[allindex].push(null);
                                        AllAverageCriticalAttack[allindex].push(null)
                                    }
                                }
                            }
                        }

                        TotalHP[index][j + 1] = displayRealHP ? hp : parseInt(hp * onedata[key].totalHP);
                        TotalAttack[index][j + 1] = parseInt(newTotalAttack);
                        TotalExpected[index][j + 1] = parseInt(newTotalExpected);
                        CriticalAttack[index][j + 1] = parseInt(onedata[key].criticalRatio * newTotalAttack);
                        CycleDamagePerTurn[index][j + 1] = parseInt(newExpectedCycleDamagePerTurn);
                        AverageTotalAttack[index][j + 1] += parseInt(newTotalAttack / cnt);
                        AverageTotalExpected[index][j + 1] += parseInt(newTotalExpected / cnt);
                        AverageCycleDamagePerTurn[index][j + 1] += parseInt(newExpectedCycleDamagePerTurn / cnt);
                        AverageCriticalAttack[index][j + 1] += parseInt(onedata[key].criticalRatio * newTotalAttack / cnt)
                    } else if (considerAverageArray[key]) {
                        var index = alreadyUsedHP[hp] - 1;
                        AverageTotalAttack[index][j + 1] += parseInt(newTotalAttack / cnt);
                        AverageTotalExpected[index][j + 1] += parseInt(newTotalExpected / cnt);
                        AverageCycleDamagePerTurn[index][j + 1] += parseInt(newExpectedCycleDamagePerTurn / cnt);
                        AverageCriticalAttack[index][j + 1] += parseInt(onedata[key].criticalRatio * newTotalAttack / cnt)
                    }
                }
            }

            if (res.length > 1) {
                for (var k = 0; k <= 100; k++) {
                    var hp;
                    if (displayRealHP) {
                        // Actual HP
                        hp = parseInt(0.01 * k * onedata["Djeeta"].totalHP);
                    } else {
                        // Residual HP ratio
                        hp = k;
                    }

                    index = alreadyUsedHP[hp] - 1;
                    allindex = allAlreadyUsedHP[hp] - 1;
                    var allj = s * oneresult.length + j + 1;

                    AllTotalAttack[allindex][allj] = TotalAttack[index][j + 1];
                    AllTotalHP[allindex][allj] = TotalHP[index][j + 1];
                    AllCriticalAttack[allindex][allj] = CriticalAttack[index][j + 1];
                    AllTotalExpected[allindex][allj] = TotalExpected[index][j + 1];
                    AllCycleDamagePerTurn[allindex][allj] = CycleDamagePerTurn[index][j + 1];
                    AllAverageTotalExpected[allindex][allj] = AverageTotalExpected[index][j + 1];
                    AllAverageTotalAttack[allindex][allj] = AverageTotalAttack[index][j + 1];
                    AllAverageCriticalAttack[allindex][allj] = AverageCriticalAttack[index][j + 1];
                    AllAverageCycleDamagePerTurn[allindex][allj] = AverageCycleDamagePerTurn[index][j + 1]
                }
            }
        }

        data[summonHeader] = {};
        data[summonHeader]["totalAttack"] = TotalAttack;
        data[summonHeader]["expectedCycleDamagePerTurn"] = CycleDamagePerTurn;
        data[summonHeader]["criticalAttack"] = CriticalAttack;
        data[summonHeader]["totalExpected"] = TotalExpected;
        data[summonHeader]["averageCriticalAttack"] = AverageCriticalAttack;
        data[summonHeader]["averageAttack"] = AverageTotalAttack;
        data[summonHeader]["averageCyclePerTurn"] = AverageCycleDamagePerTurn;
        data[summonHeader]["averageTotalExpected"] = AverageTotalExpected;
        data[summonHeader]["totalHP"] = TotalHP
    }

    if (res.length > 1) {
        var matomete = intl.translate("まとめて比較", locale);
        data[matomete] = {};
        data[matomete]["totalAttack"] = AllTotalAttack;
        data[matomete]["totalHP"] = AllTotalHP;
        data[matomete]["criticalAttack"] = AllCriticalAttack;
        data[matomete]["totalExpected"] = AllTotalExpected;
        data[matomete]["expectedCycleDamagePerTurn"] = AllCycleDamagePerTurn;
        data[matomete]["averageAttack"] = AllAverageTotalAttack;
        data[matomete]["averageCriticalAttack"] = AllAverageCriticalAttack;
        data[matomete]["averageCyclePerTurn"] = AllAverageCycleDamagePerTurn;
        data[matomete]["averageTotalExpected"] = AllAverageTotalExpected
    }

    // Extract graph maximum value minimum value
    for (var key in minMaxArr) {
        for (var summonkey in data) {
            for (var k = 0; k <= 100; k++) {
                for (var j = 1; j <= res[0].length; j++) {
                    // Save maximum graph minimum value
                    if (data[summonkey][key][k][j] > minMaxArr[key]["max"]) minMaxArr[key]["max"] = data[summonkey][key][k][j];
                    if (data[summonkey][key][k][j] < minMaxArr[key]["min"] || minMaxArr[key]["min"] == 0) minMaxArr[key]["min"] = data[summonkey][key][k][j]
                }
            }
        }
    }

    data["minMaxArr"] = minMaxArr;
    return data
};

module.exports.generateSimulationData = function (res, turnBuff, arml, summon, prof, buff, chara, storedCombinations, storedNames, locale) {
    var data = {};
    var minMaxArr = {
        "averageAttack": {"max": 0, "min": 0},
        "averageTotalExpected": {"max": 0, "min": 0},
        "expectedDamage": {"max": 0, "min": 0},
        "averageExpectedDamage": {"max": 0, "min": 0},
        "summedAverageExpectedDamage": {"max": 0, "min": 0},
    };
    var cnt = 1;
    var considerAverageArray = {};
    for (var ch = 0; ch < chara.length; ch++) {
        var charaConsidered = chara[ch].isConsideredInAverage != undefined ? chara[ch].isConsideredInAverage : true;
        if (charaConsidered && chara[ch].name != "") {
            cnt++;
            considerAverageArray[chara[ch].name] = true
        } else {
            considerAverageArray[chara[ch].name] = false
        }
    }

    if (res.length > 1) {
        var AllAverageTotalAttack = [["ターン"]];
        var AllAverageTotalExpected = [["ターン"]];
        var AllExpectedDamage = [["ターン"]];
        var AllAverageExpectedDamage = [["ターン"]];
        var AllSummedAverageExpectedDamage = [["ターン"]];

        for (var m = 1; m <= turnBuff.maxTurn; m++) {
            AllAverageTotalAttack.push([m]);
            AllAverageTotalExpected.push([m]);
            AllExpectedDamage.push([m]);
            AllAverageExpectedDamage.push([m]);
            AllSummedAverageExpectedDamage.push([m])
        }
    }

    for (var s = 0; s < res.length; s++) {
        var oneresult = res[s];
        var summonHeader = module.exports.makeSummonHeaderString(summon[s], locale);
        var AverageTotalAttack = [["ターン"]];
        var AverageTotalExpected = [["ターン"]];
        var ExpectedDamage = [["ターン"]];
        var AverageExpectedDamage = [["ターン"]];
        var SummedAverageExpectedDamage = [["ターン"]];

        for (var m = 1; m <= turnBuff.maxTurn; m++) {
            AverageTotalAttack.push([m]);
            AverageTotalExpected.push([m]);
            ExpectedDamage.push([m]);
            AverageExpectedDamage.push([m]);
            SummedAverageExpectedDamage.push([m]);

            for (var j = 0; j < oneresult[0].length; j++) {
                AverageExpectedDamage[m].push(0);
                SummedAverageExpectedDamage[m].push(0)
            }
        }

        for (var t = 1; t <= turnBuff.maxTurn; t++) {
            var turndata = oneresult[t - 1];
            for (var j = 0; j < turndata.length; j++) {
                var onedata = turndata[j].data;

                AverageTotalAttack[t].push(onedata["Djeeta"].averageAttack);
                AverageTotalExpected[t].push(onedata["Djeeta"].averageTotalExpected);

                for (var key in onedata) {
                    if (turnBuff.buffs["全体バフ"][t - 1].turnType == "ougi" || turnBuff.buffs[key][t - 1].turnType == "ougi") {
                        // Basically, setting of mystery takes precedence
                        var newOugiDamage = module.exports.calcOugiDamage(onedata[key].displayAttack, onedata[key].totalSkillCoeff, onedata[key].criticalRatio, prof.enemyDefense, prof.defenseDebuff, onedata[key].skilldata.enemyResistance, prof.ougiRatio, onedata[key].skilldata.ougiDamageUP, onedata[key].skilldata.damageUP, onedata[key].ougiFixedDamage, onedata[key].ougiBonusPlainDamage, onedata[key].ougiDamageLimitValues);
                        if (key == "Djeeta") {
                            ExpectedDamage[t].push(parseInt(newOugiDamage));
                            AverageExpectedDamage[t][j + 1] += parseInt(newOugiDamage / cnt)
                        } else if (considerAverageArray[key]) {
                            AverageExpectedDamage[t][j + 1] += parseInt(newOugiDamage / cnt)
                        }

                    } else if (turnBuff.buffs["全体バフ"][t - 1].turnType == "ougiNoDamage" || turnBuff.buffs[key][t - 1].turnType == "ougiNoDamage") {
                        // Korwa
                        if (key == "Djeeta") {
                            ExpectedDamage[t].push(0)
                        }
                    } else {
                        // Regular attack
                        var newDamage = module.exports.calcDamage(onedata[key].displayAttack, onedata[key].totalSkillCoeff, onedata[key].criticalRatio, prof.enemyDefense, prof.defenseDebuff, onedata[key].skilldata.enemyResistance, onedata[key].skilldata.additionalDamage, onedata[key].skilldata.damageUP + onedata[key].skilldata.damageUPOnlyNormalDamage, onedata[key].normalDamageLimitValues);
                        var accuracy = 1.0;
                        accuracy -= (onedata[key].skilldata.accuracyDebuff - 1.0);
                        newDamage *= accuracy;
                        if (key == "Djeeta") {
                            ExpectedDamage[t].push(parseInt(newDamage * onedata[key].expectedAttack));
                            AverageExpectedDamage[t][j + 1] += parseInt(onedata[key].expectedAttack * newDamage / cnt)
                        } else if (considerAverageArray[key]) {
                            AverageExpectedDamage[t][j + 1] += parseInt(onedata[key].expectedAttack * newDamage / cnt)
                        }
                    }
                }

                if (t == 1) {
                    var title = storedNames[j];

                    AverageTotalAttack[0].push(title);
                    AverageTotalExpected[0].push(title);
                    ExpectedDamage[0].push(title);
                    AverageExpectedDamage[0].push(title);
                    SummedAverageExpectedDamage[0].push(title);

                    // In the case of two or more summons
                    if (res.length > 1) {
                        AllAverageTotalAttack[0].push("[" + summonHeader + "] " + title);
                        AllAverageTotalExpected[0].push("[" + summonHeader + "] " + title);
                        AllExpectedDamage[0].push("[" + summonHeader + "] " + title);
                        AllAverageExpectedDamage[0].push("[" + summonHeader + "] " + title);
                        AllSummedAverageExpectedDamage[0].push("[" + summonHeader + "] " + title)
                    }
                    SummedAverageExpectedDamage[t][j + 1] = AverageExpectedDamage[t][j + 1]
                } else {
                    SummedAverageExpectedDamage[t][j + 1] = SummedAverageExpectedDamage[t - 1][j + 1] + AverageExpectedDamage[t][j + 1]
                }

                if (res.length > 1) {
                    AllAverageTotalAttack[t].push(AverageTotalAttack[t][j + 1]);
                    AllAverageTotalExpected[t].push(AverageTotalExpected[t][j + 1]);
                    AllExpectedDamage[t].push(ExpectedDamage[t][j + 1]);
                    AllAverageExpectedDamage[t].push(AverageExpectedDamage[t][j + 1]);
                    AllSummedAverageExpectedDamage[t].push(SummedAverageExpectedDamage[t][j + 1])
                }
            }
        }

        data[summonHeader] = {};
        data[summonHeader]["averageAttack"] = AverageTotalAttack;
        data[summonHeader]["averageTotalExpected"] = AverageTotalExpected;
        data[summonHeader]["expectedDamage"] = ExpectedDamage;
        data[summonHeader]["averageExpectedDamage"] = AverageExpectedDamage;
        data[summonHeader]["summedAverageExpectedDamage"] = SummedAverageExpectedDamage
    }

    if (res.length > 1) {
        var matomete = intl.translate("まとめて比較", locale);
        data[matomete] = {};
        data[matomete]["averageAttack"] = AllAverageTotalAttack;
        data[matomete]["averageTotalExpected"] = AllAverageTotalExpected;
        data[matomete]["expectedDamage"] = AllExpectedDamage;
        data[matomete]["averageExpectedDamage"] = AllAverageExpectedDamage;
        data[matomete]["summedAverageExpectedDamage"] = AllSummedAverageExpectedDamage
    }

    // Extract graph maximum value minimum value
    for (var key in minMaxArr) {
        for (var summonkey in data) {
            for (var k = 1; k <= turnBuff.maxTurn; k++) {
                for (var j = 1; j <= res[0][0].length; j++) {
                    // グラフ最大値最小値を保存
                    if (data[summonkey][key][k][j] > minMaxArr[key]["max"]) minMaxArr[key]["max"] = data[summonkey][key][k][j];
                    if (data[summonkey][key][k][j] < minMaxArr[key]["min"] || minMaxArr[key]["min"] == 0) minMaxArr[key]["min"] = data[summonkey][key][k][j]
                }
            }
        }
    }

    data["minMaxArr"] = minMaxArr;
    return data
};

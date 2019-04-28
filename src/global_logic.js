var intl = require('./translate.js');
var GlobalConst = require('./global_const.js');
var elementRelation = GlobalConst.elementRelation;
var bahamutRelation = GlobalConst.bahamutRelation;
var bahamutFURelation = GlobalConst.bahamutFURelation;
var supportAbilities = GlobalConst.supportAbilities;
var zenith = GlobalConst.zenith;
var Jobs = GlobalConst.Jobs;
var armTypes = GlobalConst.armTypes;
var jobTypes = GlobalConst.jobTypes;
var keyTypes = GlobalConst.keyTypes;
var skilltypes = GlobalConst.skilltypes;
var skillAmounts = GlobalConst.skillAmounts;
var elementTypes = GlobalConst.elementTypes;
var summonTypes = GlobalConst.summonTypes;
var summonElementTypes = GlobalConst.summonElementTypes;
var raceTypes = GlobalConst.raceTypes;
var sexTypes = GlobalConst.sexTypes;
var filterElementTypes = GlobalConst.filterElementTypes;
var enemyDefenseType = GlobalConst.enemyDefenseType;

module.exports.isCosmos = function (arm) {
    return (skilltypes[arm.skill1] != undefined && skilltypes[arm.skill1].type == "cosmosArm") ||
        (skilltypes[arm.skill2] != undefined && skilltypes[arm.skill2].type == "cosmosArm") ||
        (skilltypes[arm.skill3] != undefined && skilltypes[arm.skill3].type == "cosmosArm");
};

function isHaisuiType(stype) {
    return (stype === "normalHaisui" || stype === "magnaHaisui" ||
        stype === "normalKonshin" || stype === "magnaKonshin" ||
        stype === "normalOtherKonshin" || stype === "exHaisui");
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

module.exports.calcCombinations = function (arml) {
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

    // isCosmos advance judgment
    var isCosmosArray = [];
    for (var i = 0; i < arml.length; i++) {
        isCosmosArray[i] = module.exports.isCosmos(arml[i])
    }

    for (var i = 0; i < totalItr; i = (i + 1) | 0) {
        var temp = [];
        var num = 0;
        var isCosmosIncluded = false;
        var isValidCombination = true;
        for (var j = 0; j < armNumArray.length; j = (j + 1) | 0) {
            if (!isCosmosArray[j]) {
                temp.push(armNumArray[j][index[j]]);
                num += parseInt(armNumArray[j][index[j]])
            } else {
                // cosmos weapons
                if (armNumArray[j][index[j]] == 0) {
                    temp.push(armNumArray[j][index[j]]);
                } else if (armNumArray[j][index[j]] > 0 && !isCosmosIncluded) {
                    temp.push(armNumArray[j][index[j]]);
                    num += parseInt(armNumArray[j][index[j]]);
                    isCosmosIncluded = true;
                } else {
                    isValidCombination = false;
                }
            }
        }
        if (isValidCombination && ((totalItr <= 1024 && num <= 10) || num == 10)) combinations.push(temp);
        index = module.exports.proceedIndex(index, armNumArray, 0)
    }
    return combinations
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

module.exports.makeSummonHeaderString = function (summon, locale) {
    var summonHeader = "";
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

module.exports.calcDamage = function (summedAttack, totalSkillCoeff, criticalRatio, enemyDefense, defenseDebuff, additionalDamage, damageUP, damageLimit) {
    // Damage calculation
    var def = module.exports.calcDefenseDebuff(enemyDefense, defenseDebuff);
    var damage = Math.ceil(Math.ceil(summedAttack / def) * totalSkillCoeff) * criticalRatio;
    var overedDamage = 0;

    var limitValues = [[600000, 0.01], [500000, 0.05], [400000, 0.60], [300000, 0.80]];

    for (var index = 0; index < 4; index++) {
        // Damage cap calculation
        var limitValue = limitValues[index][0] * (1.0 + damageLimit);
        var limitRatio = limitValues[index][1];

        // Subtract only by the extent exceeding the attenuation line
        if (damage > limitValue) {
            overedDamage += limitRatio * (damage - limitValue);
            damage = limitValue;
        }
    }

    var res = damage + overedDamage;

    if (additionalDamage > 0) {
        res *= 1.0 + additionalDamage
    }

    // "Granted Damage Increase" is a correction after attenuation
    if (damageUP > 0) {
        res *= 1.0 + damageUP
    }

    return res
};

module.exports.calcOugiDamage = function (summedAttack, totalSkillCoeff, criticalRatio, enemyDefense, defenseDebuff, ougiRatio, ougiDamageUP, damageUP, ougiDamageLimit) {
    // Damage calculation
    var def = module.exports.calcDefenseDebuff(enemyDefense, defenseDebuff);
    var ratio = ougiRatio != undefined ? ougiRatio : 4.5;
    var damage = (1.0 + ougiDamageUP) * ratio * Math.ceil(Math.ceil(summedAttack / def) * totalSkillCoeff) * criticalRatio;
    var overedDamage = 0.0;

    var limitValues = [[2500000, 0.01], [1800000, 0.05], [1700000, 0.30], [1500000, 0.60]];

    for (var index = 0; index < 4; index++) {
        // Damage cap calculation
        var limitValue = limitValues[index][0] * (1.0 + ougiDamageLimit);
        var limitRatio = limitValues[index][1];

        // Subtract only by the extent exceeding the attenuation line
        if (damage > limitValue) {
            overedDamage += limitRatio * (damage - limitValue);
            damage = limitValue;
        }
    }

    // The final damage becomes the correction amount + the minimum attenuation line
    damage = damage + overedDamage;

    // Damage raised
    if (damageUP > 0) {
        return (1.0 + damageUP) * damage;
    }
    return damage
};

module.exports.calcChainBurst = function (ougiDamage, chainNumber, typeBonus, chainDamageUP, chainDamageLimitUP) {
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
        var limitValues = [[2000000, 0.01], [1600000, 0.05], [1400000, 0.30], [1200000, 0.60]]
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
    return damage;
};

module.exports.calcCriticalArray = function (normalCritical, _magnaCritical, normalOtherCritical, summon) {
    // Store each occurrence probability
    var probability = [];
    // Store the corresponding magnification
    var damageRatio = [];

    var magnaCritical = 0.01 * _magnaCritical * summon["magna"];
    if (magnaCritical > 1.0) {
        probability.push(1.0);
        damageRatio.push(0.5);
    } else if (magnaCritical > 0.0) {
        probability.push(magnaCritical);
        damageRatio.push(0.5);
    }

    // Normal critical skill array is passed in the form of [probability 1, probability 2, probability 3, ...]
    for (var j = 0; j < normalCritical.length; j++) {
        // Since it is a simple skill, you do not have to check whether a value of 1.0 or more comes
        probability.push(0.01 * normalCritical[j]["value"] * summon["zeus"]);
        damageRatio.push(normalCritical[j]["attackRatio"]);
    }

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

        // Calculation of various attack coefficients
        var magnaCoeff = 1.0 + (0.01 * totals[key]["magna"] + 0.01 * totals[key]["magnaSoka"]) * totalSummon["magna"];
        var magnaHaisuiCoeff = 1.0 + 0.01 * (totals[key]["magnaHaisui"] * totalSummon["magna"]);
        var magnaKonshinCoeff = 1.0 + 0.01 * (totals[key]["magnaKonshin"] * totalSummon["magna"]);
        var exCoeff = 1.0 + 0.01 * totals[key]["unknown"] * totalSummon["ranko"];
        exCoeff += 0.01 * totals[key]["ex"];
        exCoeff += 0.01 * totals[key]["akashaATK"];
        exCoeff += 0.01 * totals[key]["akashaSensei"];
        var exHaisuiCoeff = 1.0 + 0.01 * totals[key]["exHaisui"];
        var normalCoeff = 1.0 + (0.01 * totals[key]["normal"] + 0.01 * totals[key]["normalSoka"]) * totalSummon["zeus"];
        normalCoeff += 0.01 * totals[key]["normalOther"];
        normalCoeff += 0.01 * totals[key]["bahaAT"];
        normalCoeff += 0.01 * totals[key]["omegaNormal"];
        normalCoeff += totalSummon["chara"];
        normalCoeff += buff["normal"];
        normalCoeff += totals[key]["normalBuff"];
        // Add pre-emptive to normal attack
        normalCoeff += 0.01 * totals[key]["sensei"];

        var normalHaisuiCoeff = 1.0 + 0.01 * totals[key]["normalHaisui"] * totalSummon["zeus"];
        normalHaisuiCoeff += 0.01 * totals[key]["normalOtherHaisui"];

        var normalKonshinCoeff = 1.0 + 0.01 * totals[key]["normalKonshin"] * totalSummon["zeus"];
        normalKonshinCoeff += 0.01 * totals[key]["normalOtherKonshin"];
        // Also calculate the attribute (elapsed turn) with the maximum value
        var elementCoeff = totals[key]["typeBonus"];
        elementCoeff += totalSummon["element"] - 1.0;
        elementCoeff += totalSummon["elementTurn"] - 1.0;
        elementCoeff += buff["element"];
        elementCoeff += totals[key]["elementBuff"];
        elementCoeff += 0.01 * totals[key]["LB"].Element;

        var otherCoeff = 1.0 + buff["other"];
        otherCoeff *= 1.0 + buff["other2"];
        otherCoeff *= 1.0 + totals[key]["otherBuff"];
        otherCoeff *= 1.0 + totals[key]["otherBuff2"];

        // Character Emnity
        var charaHaisuiCoeff = 1.0 + 0.01 * totals[key]["charaHaisui"];

        // hp magnification
        var hpCoeff = 1.0;
        hpCoeff += 0.01 * totals[key]["normalHP"] * totalSummon["zeus"];
        hpCoeff += 0.01 * totals[key]["magnaHP"] * totalSummon["magna"];
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
        hpCoeff *= 1.0 + totals[key]["HPBuff"];
        hpCoeff *= 1.0 - totals[key]["HPdebuff"];

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
            // HP
            displayHP += totals[key]["LB"].HP;
            var totalHP = displayHP * hpCoeff
        }

        var totalSkillCoeff = normalCoeff * normalHaisuiCoeff * normalKonshinCoeff;
        totalSkillCoeff *= magnaCoeff * magnaHaisuiCoeff * magnaKonshinCoeff;
        totalSkillCoeff *= exCoeff * exHaisuiCoeff;
        totalSkillCoeff *= elementCoeff;
        totalSkillCoeff *= otherCoeff;
        totalSkillCoeff *= charaHaisuiCoeff;
        var totalAttack = summedAttack * totalSkillCoeff;

        // Lowest HP limit = 1
        if (totalHP <= 0) totalHP = 1;

        // for DA and TA
        var normalNite = totals[key]["normalNite"] * totalSummon["zeus"];
        var magnaNite = totals[key]["magnaNite"] * totalSummon["magna"];
        var normalSante = totals[key]["normalSante"] * totalSummon["zeus"] + totals[key]["normalOtherSante"];
        var magnaSante = totals[key]["magnaSante"] * totalSummon["magna"];
        var exNite = totals[key]["exNite"];

        // DATA upper limit
        // Normal * Magna * EX * Baha * Cosmos BL
        // DATA debuff for Rasetsu
        var armDAupNormal = normalNite + normalSante <= 50.0 ? normalNite + normalSante : 50.0;
        var armDAupMagna = magnaNite + magnaSante <= 50.0 ? magnaNite + magnaSante : 50.0;
        var armDAupBaha = totals[key]["bahaDA"] <= 50.0 ? totals[key]["bahaDA"] : 50.0;
        var armDAupCosmos = totals[key]["cosmosBL"] <= 50.0 ? totals[key]["cosmosBL"] : 50.0;

        // Special skills etc
        var armDAupOther = totals[key]["DAbuff"] <= 50.0 ? totals[key]["DAbuff"] : 50.0;

        // unknown never reaches 50% of the current situation
        var totalDA = 0.01 * totals[key]["baseDA"];
        totalDA += 0.01 * totals[key]["LB"]["DA"];
        totalDA += buff["da"];
        totalDA += totals[key]["DABuff"];
        totalDA += totalSummon["da"];
        totalDA += 0.01 * (armDAupNormal + armDAupMagna + exNite + armDAupBaha + armDAupCosmos + armDAupOther);
        totalDA = totalDA >= 0.0 ? totalDA : 0.0;
        totalDA = totalDA <= 1.0 ? totalDA : 1.0;
       

        // skill that rises only TA is called LesserSante
        var normalLesserSante = totals[key]["normalLesserSante"] * totalSummon["zeus"];
        normalLesserSante += totals[key]["normalOtherLesserSante"];
        var magnaLesserSante = totals[key]["magnaLesserSante"] * totalSummon["magna"];
        var armTAupNormal = normalSante + normalLesserSante <= 50.0 ? normalSante + normalLesserSante : 50.0;
        var armTAupMagna = magnaSante + magnaLesserSante <= 50.0 ? magnaSante + magnaLesserSante : 50.0;
        var armTAupBaha = totals[key]["bahaTA"] <= 50.0 ? totals[key]["bahaTA"] : 50.0;
        var armTAupOther = totals[key]["TAbuff"] <= 50.0 ? totals[key]["TAbuff"] : 50.0;
        var totalTA = 0.01 * totals[key]["baseTA"];
        totalTA += 0.01 * totals[key]["LB"]["TA"];
        totalTA += buff["ta"];
        totalTA += totals[key]["TABuff"];
        totalTA += totalSummon["ta"];
        totalTA += 0.01 * (armTAupNormal + armTAupMagna + armTAupBaha + armTAupOther);
        totalTA = totalTA >= 0.0 ? totalTA : 0.0;
        totalTA = totalTA <= 1.0 ? totalTA : 1.0;
        
        // master bonus of Djeeta(DA,TA)
        if (key == "Djeeta") {
            totalDA += buff["masterDA"];
            totalTA += buff["masterTA"];
        }

        var taRate = parseFloat(totalTA) < 1.0 ? parseFloat(totalTA) : 1.0;
        var daRate = parseFloat(totalDA) < 1.0 ? parseFloat(totalDA) : 1.0;
        var expectedAttack = 3.0 * taRate + (1.0 - taRate) * (2.0 * daRate + (1.0 - daRate));

        if (totals[key]["typeBonus"] == 1.5) {
            // Supplemental damage rise support ability does not overlap with Tenshi skill (the strongest effect overwrites the lesser)
            var damageUP = totals[key]["tenshiDamageUP"] > totals[key]["charaDamageUP"] ? totals[key]["tenshiDamageUP"] : totals[key]["charaDamageUP"];
            damageUP += 0.01 * totalSummon["tenshiDamageUP"]
            damageUP += totals[key]["charaUniqueDamageUP"];

            // Generate normal critical skill arrays.
            var LBCriticalArray = getLBCriticalArray(totals[key]["LB"]);
            var normalOtherCriticalBuffArray = totals[key]["normalOtherCriticalBuff"];
            var normalOtherCriticalArray = totals[key]["normalOtherCritical"].concat(LBCriticalArray, normalOtherCriticalBuffArray);

            var criticalArray = module.exports.calcCriticalArray(totals[key]["normalCritical"], totals[key]["magnaCritical"], normalOtherCriticalArray, totalSummon);
            var criticalRatio = module.exports.calcCriticalRatio(criticalArray)
        } else if (prof.enemyElement == "non-but-critical") {
            // Processing in the case of "Non (with critical)"
            var damageUP = 0.0;

            var LBCriticalArray = getLBCriticalArray(totals[key]["LB"]);
            var normalOtherCriticalBuffArray = totals[key]["normalOtherCriticalBuff"];
            var normalOtherCriticalArray = totals[key]["normalOtherCritical"].concat(LBCriticalArray, normalOtherCriticalBuffArray);

            var criticalArray = module.exports.calcCriticalArray(totals[key]["normalCritical"], totals[key]["magnaCritical"], normalOtherCriticalArray, totalSummon);
            var criticalRatio = module.exports.calcCriticalRatio(criticalArray)
        } else {
            var damageUP = 0.0;
            var criticalArray = {};
            var criticalRatio = 1.0
        }

        var criticalAttack = parseInt(totalAttack * criticalRatio);
        var expectedOugiGage = buff["ougiGage"] + totals[key]["ougiGageBuff"] - totals[key]["ougiDebuff"];
        expectedOugiGage *= taRate * 37.0 + (1.0 - taRate) * daRate * 22.0 + (1.0 - daRate) * 10.0;

        var minimumTurn = Math.ceil(100.0 / (37.0 * (buff["ougiGage"] + totals[key]["ougiGageBuff"] - totals[key]["ougiDebuff"])));
        var expectedTurn = 100.0 / expectedOugiGage > minimumTurn ? 100.0 / expectedOugiGage : minimumTurn;

        // "additionalDamage" considers the Fourth Pursuit effect as a normal frame
        var additionalDamage = 0.01 * totals[key]["additionalDamage"] * totalSummon["zeus"];
        additionalDamage += totals[key]["additionalDamageBuff"];
        additionalDamage += buff["additionalDamage"];

        // Damage limit UP = Overall buff + Personal buff + skill
        var damageLimit = buff["damageLimit"];
        damageLimit += totals[key]["damageLimitBuff"];
        damageLimit += totals[key]["normalDamageLimit"];
        damageLimit += 0.01 * totalSummon["damageLimit"];

        // Mystery damage upper limit UP = whole buff + individual buff + skill + damage upper limit UP minutes
        // The upper limit of skill of mystery damage is 30%
        var ougiDamageLimitByExceed = Math.min(0.30, totals[key]["exceedOugiDamageLimit"]);
        var ougiDamageLimitByNormal = Math.min(0.30, totals[key]["normalOugiDamageLimit"] * totalSummon["zeus"]);
        var ougiDamageLimitByMagna = Math.min(0.30, totals[key]["magnaOugiDamageLimit"] * totalSummon["magna"]);
        var ougiDamageLimit = Math.min(0.20, totals[key]["ougiDamageLimit"]);
        ougiDamageLimit += Math.min(0.15, totals[key]["omegaOugiDamageLimit"]);
        ougiDamageLimit += Math.min(0.60, (ougiDamageLimitByMagna + ougiDamageLimitByNormal + ougiDamageLimitByExceed));
        ougiDamageLimit += buff["ougiDamageLimit"] + totals[key]["ougiDamageLimitBuff"];
        ougiDamageLimit += 0.01 * totalSummon["damageLimit"];

        var chainDamageLimit = 0.01 * (totals[key]["chainDamageLimit"] + (totals[key]["normalChainDamageLimit"] * totalSummon["zeus"]));
        chainDamageLimit = chainDamageLimit <= 0.50 ? chainDamageLimit : 0.50;
        
        // master bonus of Djeeta(limit)
        if (key == "Djeeta") {
            damageLimit += buff["masterDamageLimit"];
            ougiDamageLimit += buff["masterDamageLimit"];
        }

        // "damage" is a single attack damage without additional damage (with attenuation and skill correction)
        var damage = module.exports.calcDamage(summedAttack, totalSkillCoeff, criticalRatio, prof.enemyDefense, prof.defenseDebuff, additionalDamage, damageUP, damageLimit);

        // Use damage in case of no critical to correct skill expectation
        var damageWithoutCritical = module.exports.calcDamage(summedAttack, totalSkillCoeff, 1.0, prof.enemyDefense, prof.defenseDebuff, additionalDamage, damageUP, damageLimit);

        // Expected critical skill ratio
        var effectiveCriticalRatio = damage / damageWithoutCritical;

        // Comprehensive attack power * Expected skill expectation * Multi-shot expected value
        var sougou_kaisuu_gikou = parseInt(totalAttack * criticalRatio * expectedAttack);

        // Mystery damage = magnification * (1 + mystery damage buff frame) * (1 + mystery damage rise skill frame)
        // Save only the coefficient part (100% + delta of delta) for common processing
        var ougiDamageByMystery = totals[key]["ougiDamage"] * totalSummon["zeus"];
        var ougiDamageByNormal = totals[key]["normalOugiDamage"] * totalSummon["zeus"];
        ougiDamageByNormal = ougiDamageByNormal <= 100 ? ougiDamageByNormal : 100;
        var ougiDamageByMagna = totals[key]["magnaOugiDamage"] * totalSummon["magna"];
        ougiDamageByMagna = ougiDamageByMagna <= 100 ? ougiDamageByMagna : 100;
        var ougiDamageUP = 1.0 + totals[key]["ougiDamageBuff"];
        ougiDamageUP *= 1.0 + 0.01 * (ougiDamageByMagna + ougiDamageByNormal + ougiDamageByMystery + totalSummon["ougiDamage"] + totals[key]["cosmosAT"]);
        ougiDamageUP -= 1.0;

        var chainDamageUP = 0.01 * (totals[key]["chainDamage"] + (totals[key]["normalChainDamage"] * totalSummon["zeus"]));
        chainDamageUP = chainDamageUP <= 1.20 ? chainDamageUP : 1.20;

        var ougiDamage = module.exports.calcOugiDamage(summedAttack, totalSkillCoeff, criticalRatio, prof.enemyDefense, prof.defenseDebuff, totals[key]["ougiRatio"], ougiDamageUP, damageUP, ougiDamageLimit);

        // Chain burst damage is calculated based on the assumption that "there is only one who has the same damage as that character has chain number people"
        var chainBurst = module.exports.calcChainBurst(buff["chainNumber"] * ougiDamage, buff["chainNumber"], module.exports.getTypeBonus(totals[key].element, prof.enemyElement), chainDamageUP, chainDamageLimit);

        // Normal attack * n times
        var expectedCycleDamage = expectedTurn * expectedAttack * damage;
        // Ougi + chain burst (buff ["chainNumber"] is 1 or more so division OK)
        expectedCycleDamage += ougiDamage + chainBurst / buff["chainNumber"];
        var expectedCycleDamagePerTurn = expectedCycleDamage / (expectedTurn + 1.0);
        
        
        // Display array
        var coeffs = {};
        coeffs["normal"] = normalCoeff;
        coeffs["normalHaisui"] = normalHaisuiCoeff;
        coeffs["normalKonshin"] = normalKonshinCoeff;
        coeffs["magna"] = magnaCoeff;
        coeffs["magnaHaisui"] = magnaHaisuiCoeff;
        coeffs["magnaKonshin"] = magnaKonshinCoeff;
        coeffs["element"] = elementCoeff;
        coeffs["ex"] = exCoeff;
        coeffs["exHaisui"] = exHaisuiCoeff;
        coeffs["charaHaisui"] = charaHaisuiCoeff;
        coeffs["other"] = otherCoeff;
        coeffs["hpRatio"] = hpCoeff;
        coeffs["additionalDamage"] = additionalDamage;
        coeffs["ougiDamageUP"] = ougiDamageUP;
        coeffs["chainDamageUP"] = chainDamageUP;
        coeffs["damageUP"] = damageUP;
        coeffs["damageLimit"] = damageLimit;
        coeffs["ougiDamageLimit"] = ougiDamageLimit;
        coeffs["chainDamageLimit"] = chainDamageLimit;
        coeffs["criticalArray"] = criticalArray;

        // Consecutive shooting information
        coeffs["normalDA"] = armDAupNormal;
        coeffs["magnaDA"] = armDAupMagna;
        coeffs["exDA"] = exNite;
        coeffs["cosmosDA"] = armDAupCosmos;
        coeffs["bahaDA"] = armDAupBaha;
        coeffs["otherDA"] = armDAupOther;
        coeffs["normalTA"] = armTAupNormal;
        coeffs["magnaTA"] = armTAupMagna;
        coeffs["bahaTA"] = armTAupBaha;
        coeffs["otherTA"] = armTAupOther;

        res[key] = {
            totalAttack: Math.ceil(totalAttack),
            displayAttack: Math.ceil(summedAttack),
            totalSkillCoeff: totalSkillCoeff,
            totalHP: Math.round(totalHP),
            displayHP: Math.round(displayHP),
            remainHP: totals[key]["remainHP"],
            totalDA: totalDA,
            totalTA: totalTA,
            debuffResistance: totals[key]["debuffResistance"],
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
            chainBurst: chainBurst,
            expectedTurn: expectedTurn,
            expectedCycleDamagePerTurn: expectedCycleDamagePerTurn,
        };
    }

    var average = 0.0;
    var crit_average = 0.0;
    var totalExpected_average = 0.0;
    var averageCyclePerTurn = 0.0;
    var averageChainBurst = 0.0;

    var cnt = 0.0;
    for (key in res) {
        if (totals[key]["isConsideredInAverage"]) {
            average += res[key].totalAttack;
            crit_average += res[key].criticalAttack;
            totalExpected_average += res[key].totalExpected;
            averageCyclePerTurn += res[key].expectedCycleDamagePerTurn;
            averageChainBurst += res[key].chainBurst;
            cnt += 1.0
        }
    }

    res["Djeeta"]["averageAttack"] = parseInt(average / cnt);
    res["Djeeta"]["averageCriticalAttack"] = parseInt(crit_average / cnt);
    res["Djeeta"]["averageTotalExpected"] = parseInt(totalExpected_average / cnt);
    res["Djeeta"]["averageCyclePerTurn"] = parseInt(averageCyclePerTurn / cnt);
    res["Djeeta"]["averageChainBurst"] = parseInt(averageChainBurst / cnt);
    return res
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

    if (haisuiType == 'normalHaisui' || haisuiType == 'magnaHaisui' || haisuiType == 'exHaisui' || haisuiType == "charaHaisui") {
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

module.exports.recalcCharaHaisui = function (chara, remainHP) {
    var charaHaisuiValue = 1.0;

    for (var ch = 0; ch < chara.length; ch++) {
        if (chara[ch].name != "" && chara[ch].isConsideredInAverage) {
            for (var i = 0; i < 3; i++) {
                if (i == 0) {
                    if (chara[ch]["support"] == undefined) continue;
                    var support = supportAbilities[chara[ch]["support"]];
                } else if (i == 1) {
                    if (chara[ch]["support2"] == undefined) continue;
                    var support = supportAbilities[chara[ch]["support2"]];
                } else {
                    if (chara[ch]["support3"] == undefined) continue;
                    var support = supportAbilities[chara[ch]["support3"]];
                }

                if (support.type == "none") continue;

                // Treatment of emnity supplements only
                switch (support.type) {
                    case "emnity_all_SL10":
                        // Refer to Zahlhamelina's HP
                        charaHaisuiValue += 0.01 * module.exports.calcHaisuiValue("charaHaisui", "L", 10, remainHP);
                        continue;
                    case "emnity_own_SL20":
                        // Refer to Dark Jeanne's HP
                        charaHaisuiValue += 0.01 * module.exports.calcHaisuiValue("charaHaisui", "L", 20, remainHP);
                        continue;
                    default:
                        break;
                }
            }
        }
    }

    return charaHaisuiValue;
};

module.exports.getTotalBuff = function (prof) {
    var totalBuff = {
        master: 0.0,
        masterHP: 0.0,
        masterDA: 0.0,
        masterTA: 0.0,
        masterDamageLimit: 0.0,
        normal: 0.0,
        element: 0.0,
        other: 0.0,
        other2: 0.0,
        zenith1: 0.0,
        zenith2: 0.0,
        hp: 0.0,
        da: 0.0,
        ta: 0.0,
        ougiGage: 1.0,
        additionalDamage: 0.0,
        damageLimit: 0.0,
        ougiDamageLimit: 0.0,
        chainNumber: 1,
    };

    if (!isNaN(prof.masterBonus)) totalBuff["master"] += 0.01 * parseInt(prof.masterBonus);
    if (!isNaN(prof.masterBonusHP)) totalBuff["masterHP"] += 0.01 * parseInt(prof.masterBonusHP);
    if (!isNaN(prof.masterBonusDA)) totalBuff["masterDA"] += 0.01 * parseInt(prof.masterBonusDA);
    if (!isNaN(prof.masterBonusTA)) totalBuff["masterTA"] += 0.01 * parseInt(prof.masterBonusTA);
    if (!isNaN(prof.masterBonusDamageLimit)) totalBuff["masterDamageLimit"] += 0.01 * parseInt(prof.masterBonusDamageLimit);
    if (!isNaN(prof.hpBuff)) totalBuff["hp"] += 0.01 * parseInt(prof.hpBuff);
    if (!isNaN(prof.daBuff)) totalBuff["da"] += 0.01 * parseFloat(prof.daBuff);
    if (!isNaN(prof.taBuff)) totalBuff["ta"] += 0.01 * parseFloat(prof.taBuff);
    if (!isNaN(prof.otherBuff2)) totalBuff["other2"] += 0.01 * parseInt(prof.otherBuff2);
    if (!isNaN(prof.additionalDamageBuff)) totalBuff["additionalDamage"] += 0.01 * parseInt(prof.additionalDamageBuff);
    if (!isNaN(prof.ougiGageBuff)) totalBuff["ougiGage"] += 0.01 * parseInt(prof.ougiGageBuff);
    if (!isNaN(prof.chainNumber)) totalBuff["chainNumber"] = parseInt(prof.chainNumber);
    if (!isNaN(prof.damageLimitBuff)) totalBuff["damageLimit"] = 0.01 * parseFloat(prof.damageLimitBuff);
    if (!isNaN(prof.ougiDamageLimitBuff)) totalBuff["ougiDamageLimit"] = 0.01 * parseFloat(prof.ougiDamageLimitBuff);
    totalBuff["normal"] += 0.01 * parseInt(prof.normalBuff);
    totalBuff["element"] += 0.01 * parseInt(prof.elementBuff);
    totalBuff["other"] += 0.01 * parseInt(prof.otherBuff);
    totalBuff["zenith1"] += zenith[prof.zenithBonus1];
    totalBuff["zenith2"] += zenith[prof.zenithBonus2];

    return totalBuff
};

function maskInvalidSkillLevel(slv, stype, amount) {
    if (slv < 1) return 1;
    if (slv > 20) return 20;
    return slv;
}

module.exports.addSkilldataToTotals = function (totals, comb, arml, buff) {
    // Check whether there is a cosmos weapon
    var cosmosType = '';
    for (var i = 0; i < arml.length; i++) {
        if (comb[i] > 0) {
            var arm = arml[i];
            if (module.exports.isCosmos(arm)) {
                if (skilltypes[arm.skill1].type == "cosmosArm") {
                    cosmosType = skilltypes[arm.skill1].cosmosArm;
                } else if (skilltypes[arm.skill2].type == "cosmosArm") {
                    cosmosType = skilltypes[arm.skill2].cosmosArm;
                } else {
                    cosmosType = skilltypes[arm.skill3].cosmosArm;
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
                if (arm.armType == cosmosType) {
                    armSup += 0.3;
                    hpSup += 0.3
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
                for (var j = 1; j <= 3; j++) {
                    var skillname = '';
                    var element = '';
                    arm.element != undefined ? arm.element : "fire";
                    if (j == 1) {
                        skillname = arm.skill1;
                        element = arm.element != undefined ? arm.element : "fire"
                    } else if (j == 2) {
                        skillname = arm.skill2;
                        element = arm.element2 != undefined ? arm.element2 : "fire"
                    } else {
                        skillname = arm.skill3;
                        element = arm.element3 != undefined ? arm.element3 : "fire"
                    }

                    if (skillname != 'non') {
                        var stype = skilltypes[skillname].type;
                        var amount = skilltypes[skillname].amount;
                        var slv = parseInt(arm.slv);

                        // SLv20 compatible
                        slv = maskInvalidSkillLevel(slv, stype, amount);

                        // Baha, cosmos and omega weapons have no attribute relation
                        if (stype == 'bahaAT') {
                            if (!isBahaAtIncluded) {
                                // Baha dagger etc.
                                if (totals[key]["race"] === "unknown" ||
                                    totals[key]["race"] === "seisho" ||
                                    totals[key]["support"] === "wildcard") {
                                    totals[key]["bahaAT"] += comb[i] * skillAmounts["bahaAT"][amount][slv - 1];
                                    isBahaAtIncluded = true;
                                } else {
                                    var bahatype = skillname.split("-");
                                    if (bahamutRelation[bahatype[1]]["type1"] == totals[key]["race"]) {
                                        totals[key]["bahaAT"] += comb[i] * skillAmounts["bahaAT"][amount][slv - 1];
                                        isBahaAtIncluded = true;
                                    }
                                }
                            }
                        } else if (stype == 'bahaATHP') {
                            if (!isBahaAthpIncluded) {
                                // Baha sword etc.
                                if (totals[key]["race"] === "unknown" ||
                                    totals[key]["race"] === "seisho" ||
                                    totals[key]["support"] === "wildcard") {
                                    totals[key]["bahaAT"] += comb[i] * skillAmounts["bahaAT"][amount][slv - 1];
                                    totals[key]["bahaHP"] += comb[i] * skillAmounts["bahaHP"][amount][slv - 1];
                                    isBahaAthpIncluded = true;
                                } else {
                                    var bahatype = skillname.split("-");
                                    if (bahamutRelation[bahatype[1]]["type1"] == totals[key]["race"] ||
                                        bahamutRelation[bahatype[1]]["type2"] == totals[key]["race"]) {
                                        totals[key]["bahaAT"] += comb[i] * skillAmounts["bahaAT"][amount][slv - 1];
                                        totals[key]["bahaHP"] += comb[i] * skillAmounts["bahaHP"][amount][slv - 1];
                                        isBahaAthpIncluded = true;
                                    }
                                }
                            }
                        } else if (stype == 'bahaHP') {
                            if (!isBahaHpIncluded) {
                                // Baha Fist etc
                                if (totals[key]["race"] === "unknown" ||
                                    totals[key]["race"] === "seisho" ||
                                    totals[key]["support"] === "wildcard") {
                                    totals[key]["bahaHP"] += comb[i] * skillAmounts["bahaHP"][amount][slv - 1];
                                    isBahaHpIncluded = true;
                                } else {
                                    var bahatype = skillname.split("-");
                                    if (bahamutRelation[bahatype[1]]["type1"] == totals[key]["race"] ||
                                        bahamutRelation[bahatype[1]]["type2"] == totals[key]["race"]) {
                                        totals[key]["bahaHP"] += comb[i] * skillAmounts["bahaHP"][amount][slv - 1];
                                        isBahaHpIncluded = true;
                                    }
                                }
                            }
                        } else if (stype == 'bahaFUATHP') {
                            if (totals[key]["race"] === "unknown" ||
                                totals[key]["race"] === "seisho" ||
                                totals[key]["support"] === "wildcard") {
                                totals[key]["bahaAT"] += comb[i] * skillAmounts["bahaFUATHP"]["AT"][slv - 1];
                                totals[key]["bahaHP"] += comb[i] * skillAmounts["bahaFUATHP"]["HP"][slv - 1];
                            } else {
                                var bahatype = skillname.split("-");
                                if (bahamutFURelation[bahatype[1]]["type1"] == totals[key]["race"] ||
                                    bahamutFURelation[bahatype[1]]["type2"] == totals[key]["race"]) {
                                    totals[key]["bahaAT"] += comb[i] * skillAmounts["bahaFUATHP"]["AT"][slv - 1];
                                    totals[key]["bahaHP"] += comb[i] * skillAmounts["bahaFUATHP"]["HP"][slv - 1];
                                }
                            }
                        } else if (stype == 'bahaFUHP') {
                            if (totals[key]["race"] === "unknown" ||
                                totals[key]["race"] === "seisho" ||
                                totals[key]["support"] === "wildcard") {
                                totals[key]["bahaHP"] += comb[i] * skillAmounts["bahaFUHP"]["HP"][slv - 1];
                                totals[key]["bahaDA"] += comb[i] * skillAmounts["bahaFUHP"]["DA"][slv - 1];
                                totals[key]["bahaTA"] += comb[i] * skillAmounts["bahaFUHP"]["TA"][slv - 1];
                            } else {
                                var bahatype = skillname.split("-");
                                if (bahamutFURelation[bahatype[1]]["type1"] == totals[key]["race"] ||
                                    bahamutFURelation[bahatype[1]]["type2"] == totals[key]["race"]) {
                                    totals[key]["bahaHP"] += comb[i] * skillAmounts["bahaFUHP"]["HP"][slv - 1];
                                    totals[key]["bahaDA"] += comb[i] * skillAmounts["bahaFUHP"]["DA"][slv - 1];
                                    totals[key]["bahaTA"] += comb[i] * skillAmounts["bahaFUHP"]["TA"][slv - 1];
                                }
                            }
                        } else if (stype == 'cosmos') {
                            // Cosmos weapons
                            if ((skillname == 'cosmosAT' && totals[key]["type"] == "attack") || totals[key]["support"] === "wildcard") {
                                totals[key]["cosmosAT"] += comb[i] * 20.0;
                            } else if ((skillname == 'cosmosDF' && totals[key]["type"] == "defense") || totals[key]["support"] === "wildcard") {
                                totals[key]["HPdebuff"] -= comb[i] * 0.10
                            } else if ((skillname == 'cosmosBL' && totals[key]["type"] == "balance") || totals[key]["support"] === "wildcard") {
                                totals[key]["cosmosBL"] = comb[i] * 20.0
                            } else if ((skillname == 'cosmosPC' && totals[key]["type"] == "pecu") || totals[key]["support"] === "wildcard") {
                                totals[key]["debuffResistance"] = comb[i] * 20.0
                            }
                        } else if (stype == 'cosmosArm') {
                            // Skip Cosmos Weapons Skill
                        } else if (stype == 'chainForce') {
                            // Chainforce weapons, chain DMG and Limit Up
                            totals[key]["chainDamage"] += comb[i] * skillAmounts["chainDamage"][amount][slv - 1];
                            totals[key]["chainDamageLimit"] += comb[i] * skillAmounts["chainDamageLimit"][amount][slv - 1];
                        } else if (stype == 'omega') {
                            // Omega Weapon
                            var omegaType = skillname.split("-")[1];
                            if (arm.armType === totals[key]["fav1"] ||
                                arm.armType === totals[key]["fav2"] ||
                                totals[key]["support"] === "wildcard") {

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
                                    totals[key]["normalDamageLimit"] += 0.1
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
                                    totals[key]["normalDamageLimit"] += 0.1
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
                                if (akashaType === totals[key]["fav1"] || akashaType === totals[key]["fav2"] ||
                                    amount === totals[key]["fav1"] || amount === totals[key]["fav2"] || totals[key]["support"] === "wildcard") {
                                    if (!isAkashaIncludedGlobal || isAkashaIncludedLocal[akashaType]) {
                                        totals[key]["akashaATK"] += 20.0;
                                        totals[key]["normalOtherLesserSante"] += 10.0;
                                        isAkashaIncludedGlobal = true;
                                        isAkashaIncludedLocal[akashaType] = true;
                                    }
                                }
                            } else if (akashaType == "sword" && amount == "dagger") {
                                if (akashaType === totals[key]["fav1"] || akashaType === totals[key]["fav2"] ||
                                    amount === totals[key]["fav1"] || amount === totals[key]["fav2"] || totals[key]["support"] === "wildcard") {
                                    if (!isAkashaIncludedGlobal || isAkashaIncludedLocal[akashaType]) {
                                        totals[key]["akashaATK"] += 20.0;
                                        isAkashaIncludedGlobal = true;
                                        isAkashaIncludedLocal[akashaType] = true;
                                    }
                                }
                            } else if (akashaType == "bow" && amount == "gun") {
                                if (akashaType === totals[key]["fav1"] || akashaType === totals[key]["fav2"] ||
                                    amount === totals[key]["fav1"] || amount === totals[key]["fav2"] || totals[key]["support"] === "wildcard") {
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
                                if (akashaType === totals[key]["fav1"] || akashaType === totals[key]["fav2"] ||
                                    amount === totals[key]["fav1"] || amount === totals[key]["fav2"] || totals[key]["support"] === "wildcard") {
                                    if (!isAkashaIncludedGlobal || isAkashaIncludedLocal[akashaType]) {
                                        totals[key]["akashaATK"] += 20.0;
                                        totals[key]["akashaSensei"] = 10.0;
                                        isAkashaIncludedGlobal = true;
                                        isAkashaIncludedLocal[akashaType] = true;
                                    }
                                }
                            } else if (akashaType == "spear" && amount == "katana") {
                                if (akashaType === totals[key]["fav1"] || akashaType === totals[key]["fav2"] ||
                                    amount === totals[key]["fav1"] || amount === totals[key]["fav2"] || totals[key]["support"] === "wildcard") {
                                    if (!isAkashaIncludedGlobal || isAkashaIncludedLocal[akashaType]) {
                                        totals[key]["akashaATK"] += 20.0;
                                        totals[key]["akashaHP"] += 10.0;
                                        isAkashaIncludedGlobal = true;
                                        isAkashaIncludedLocal[akashaType] = true;
                                    }
                                }
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
                                // As normal skill will activate multiple, leave it without adding the probability
                                for (var setu = 0; setu < comb[i]; setu++) {
                                    totals[key]["normalCritical"].push({
                                        "value": skillAmounts["critical"][amount][slv - 1],
                                        "attackRatio": 0.5
                                    });
                                }
                            } else if (stype == 'normalJinkai') {
                                totals[key]["normalHP"] += comb[i] * skillAmounts["normalHP"][amount][slv - 1];
                                for (var setu = 0; setu < comb[i]; setu++) {
                                    totals[key]["normalCritical"].push({
                                        "value": skillAmounts["critical"][amount][slv - 1],
                                        "attackRatio": 0.5
                                    });
                                }
                            } else if (stype == 'normalSetsuna') {
                                for (var setu = 0; setu < comb[i]; setu++) {
                                    totals[key]["normalCritical"].push({
                                        "value": skillAmounts["critical"][amount][slv - 1],
                                        "attackRatio": 0.5
                                    });
                                }
                                totals[key]["normal"] += comb[i] * skillAmounts["normal"][amount][slv - 1];
                            } else if (stype == 'magnaSetsuna') {
                                totals[key]["magnaCritical"] += comb[i] * skillAmounts["critical"][amount][slv - 1];
                                totals[key]["magna"] += comb[i] * skillAmounts["magna"][amount][slv - 1];
                            } else if (stype == 'normalKatsumi') {
                                for (var setu = 0; setu < comb[i]; setu++) {
                                    totals[key]["normalCritical"].push({
                                        "value": skillAmounts["critical"][amount][slv - 1],
                                        "attackRatio": 0.5
                                    });
                                }
                                totals[key]["normalNite"] += comb[i] * skillAmounts["multiAttack"][amount][slv - 1];
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
                                totals[key]["DAbuff"] -= comb[i] * 10.0;
                            } else if (stype == 'magnaRasetsu') {
                                totals[key]["magna"] += comb[i] * skillAmounts["magna"][amount][slv - 1];
                                totals[key]["DAbuff"] -= comb[i] * 10.0;
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
                                totals[key]["magnaHP"] += comb[i] * skillAmounts["magnaHP"][amount][slv - 1];
                                totals[key]["magnaNite"] += comb[i] * skillAmounts["magnaGunshin"][amount][slv - 1];
                            } else if (stype == 'normalHiou') {
                                totals[key]["ougiDamage"] += comb[i] * skillAmounts["normalHiou"][amount][slv - 1];
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
                                totals[key]["debuffResistance"] = comb[i] * skillAmounts["normalOntyou"][amount][slv - 1];
                            } else if (stype == 'magnaHissatsu') {
                                totals[key]["magnaOugiDamage"] += comb[i] * skillAmounts["magnaHiou"][amount][slv - 1];
                                totals[key]["magnaOugiDamageLimit"] += 0.01 * comb[i] * skillAmounts["magnaOugiDamageLimitHissatsu"][amount][slv - 1];
                            } else if (stype == 'exBoukun') {
                                totals[key]["HPdebuff"] += comb[i] * 0.07;
                                totals[key]["ex"] += comb[i] * skillAmounts["ex"][amount][slv - 1];
                            } else if (stype == 'exATKandHP') {
                                totals[key]["ex"] += comb[i] * skillAmounts["ex"][amount][slv - 1];
                                totals[key]["exHP"] += comb[i] * skillAmounts["exHP"][amount][slv - 1];
                            } else if (stype == 'gurenJuin') {
                                if (index == 2) {
                                    totals[key]["normal"] += comb[i] * skillAmounts["normal"][amount][slv - 1];
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
                            } else if (stype == 'ougiDamageLimitExceed') {
                                totals[key]["exceedOugiDamageLimit"] += 0.01 * comb[i] * skillAmounts["ougiDamageLimitExceed"][amount][slv - 1];
                                // 4* Weapon Skills
                            } else if (stype == 'tsuranukiKiba') {
                                if (skillname == 'tsuranukiKibaMain') {
                                    totals[key]["normalHP"] += comb[i] * skillAmounts["normalHP"][amount][slv - 1];
                                    if (key == 'Djeeta') {
                                        for (var setu = 0; setu < comb[i]; setu++) {
                                            totals[key]["normalCritical"].push({
                                                "value": skillAmounts["critical"][amount][slv - 1],
                                                "attackRatio": 0.5
                                            });
                                        }
                                    }
                                } else {
                                    totals[key]["normalHP"] += comb[i] * skillAmounts["normalHP"][amount][slv - 1];
                                }
                            } else if (stype == 'washiouKekkai') {
                                if (key == 'Djeeta') totals[key]["DAbuff"] += comb[i] * skillAmounts["washiouKekkai"][amount][slv - 1];
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
                                if (totals[key]["fav1"] == "fist" || totals[key]["fav2"] == "fist" || totals[key]["support"] === "wildcard") {
                                    totals[key]["magna"] += comb[i] * skillAmounts["magna"][amount][slv - 1];
                                }
                            } else if (stype == 'magnaJojutsu') {
                                // Only applies to staff prof characters
                                if (totals[key]["fav1"] == "wand" || totals[key]["fav2"] == "wand" || totals[key]["support"] === "wildcard") {
                                    totals[key]["magna"] += comb[i] * skillAmounts["magna"][amount][slv - 1];
                                }
                            } else if (stype == 'normalSeisyou') {
                                // Only applies to primal characters
                                if (totals[key]["race"] === "seisho" || totals[key]["support"] === "wildcard") {
                                    totals[key]["normal"] += comb[i] * skillAmounts["normal"][amount][slv - 1];
                                }
                            } else if (stype == 'magnaSeisyou') {
                                // Only applies to primal characters
                                if (totals[key]["race"] === "seisho" || totals[key]["support"] === "wildcard") {
                                    totals[key]["magna"] += comb[i] * skillAmounts["magna"][amount][slv - 1];
                                }
                            } else if (stype == 'magnaCritical') {
                                totals[key][stype] += comb[i] * skillAmounts['critical'][amount][slv - 1];
                            } else {
                                totals[key][stype] += comb[i] * skillAmounts[stype][amount][slv - 1];
                            }
                        }
                    }
                }
            }
        }

        // Baha weapon duplicate upper limit
        if (totals[key]["bahaAT"] > 50) totals[key]["bahaAT"] = 50;
        if (totals[key]["bahaHP"] > 50) totals[key]["bahaHP"] = 50
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
            if (key == "ATK" || key == "HP" || key == "Element") {
                LB[key] = parseInt(chara[exactKey]);
            } else if (key == "DA" || key == "TA") {
                LB[key] = parseFloat(chara[exactKey]);
            } else {
                LB[key] = chara[exactKey];
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
                "value": GlobalConst.limitBonusCriticalList[chara_lb_crit_type].value,
                "attackRatio": GlobalConst.limitBonusCriticalList[chara_lb_crit_type].attackRatio
            });
        }
    });

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
        personalHPBuff: 0.0,
        personalDABuff: 0.0,
        personalTABuff: 0.0,
        personalOugiGageBuff: 0.0,
        personalAdditionalDamageBuff: 0.0,
        personalDamageLimitBuff: 0.0,
        personalOugiDamageLimitBuff: 0.0
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
                unknown: 0,
                ex: 0,
                exHaisui: 0,
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
                normalCritical: [],
                normalOtherCritical: [],
                magnaCritical: 0,
                cosmosAT: 0,
                cosmosBL: 0,
                omegaNormal: 0,
                omegaNormalHP: 0,
                akashaATK: 0,
                akashaHP: 0,
                ougiDamage: 0,
                normalOugiDamage: 0,
                magnaOugiDamage: 0,
                chainDamage: 0,
                normalChainDamage: 0,
                normalDamageLimit: 0,
                ougiDamageLimit: 0,
                magnaOugiDamageLimit: 0,
                normalOugiDamageLimit: 0,
                exceedOugiDamageLimit: 0,
                omegaOugiDamageLimit: 0,
                chainDamageLimit: 0,
                normalChainDamageLimit: 0,
                additionalDamage: 0,
                ougiDebuff: 0,
                isConsideredInAverage: true,
                job: job,
                normalBuff: djeetaBuffList["personalNormalBuff"],
                elementBuff: djeetaBuffList["personalElementBuff"],
                otherBuff: djeetaBuffList["personalOtherBuff"],
                otherBuff2: djeetaBuffList["personalOtherBuff2"],
                HPBuff: djeetaBuffList["personalHPBuff"],
                DABuff: djeetaBuffList["personalDABuff"],
                TABuff: djeetaBuffList["personalTABuff"],
                ougiRatio: prof.ougiRatio,
                ougiGageBuff: djeetaBuffList["personalOugiGageBuff"],
                ougiDamageBuff: 0,
                additionalDamageBuff: djeetaBuffList["personalAdditionalDamageBuff"],
                DAbuff: 0,
                TAbuff: 0,
                damageLimitBuff: djeetaBuffList["personalDamageLimitBuff"],
                ougiDamageLimitBuff: djeetaBuffList["personalOugiDamageLimitBuff"],
                normalOtherCriticalBuff: [],
                support: "none",
                support2: "none",
                support3: "none",
                charaHaisui: 0,
                debuffResistance: 0,
                charaDamageUP: 0,
                tenshiDamageUP: 0,
                charaUniqueDamageUP: 0
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
                hpBuff: 0.0,
                daBuff: 0.0,
                taBuff: 0.0,
                ougiGageBuff: 0.0,
                additionalDamageBuff: 0.0,
                damageLimitBuff: 0.0,
                ougiDamageLimitBuff: 0.0,
            };

            for (var charabuffkey in charaBuffList) {
                if (chara[i][charabuffkey] != undefined) {
                    charaBuffList[charabuffkey] = 0.01 * parseFloat(chara[i][charabuffkey])
                }
            }

            var charaLB = getCharaLB(chara[i]);

            totals[charakey] = {
                baseAttack: parseInt(chara[i].attack),
                baseHP: parseInt(chara[i].hp) + zenithPartyHP,
                baseDA: parseFloat(charaDA),
                baseTA: parseFloat(charaTA),
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
                unknown: 0,
                ex: 0,
                exHaisui: 0,
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
                normalCritical: [],
                normalOtherCritical: [],
                magnaCritical: 0,
                cosmosAT: 0,
                cosmosBL: 0,
                omegaNormal: 0,
                omegaNormalHP: 0,
                akashaATK: 0,
                akashaHP: 0,
                ougiDamage: 0,
                chainDamage: 0,
                normalOugiDamage: 0,
                magnaOugiDamage: 0,
                normalChainDamage: 0,
                normalDamageLimit: 0,
                ougiDamageLimit: 0,
                chainDamageLimit: 0,
                magnaOugiDamageLimit: 0,
                normalOugiDamageLimit: 0,
                exceedOugiDamageLimit: 0,
                omegaOugiDamageLimit: 0,
                normalChainDamageLimit: 0,
                additionalDamage: 0,
                ougiDebuff: 0,
                isConsideredInAverage: charaConsidered,
                normalBuff: charaBuffList["normalBuff"],
                elementBuff: charaBuffList["elementBuff"],
                otherBuff: charaBuffList["otherBuff"],
                otherBuff2: charaBuffList["otherBuff2"],
                HPBuff: charaBuffList["hpBuff"],
                DABuff: charaBuffList["daBuff"],
                TABuff: charaBuffList["taBuff"],
                ougiRatio: chara[i].ougiRatio,
                ougiGageBuff: charaBuffList["ougiGageBuff"],
                ougiDamageBuff: 0,
                additionalDamageBuff: charaBuffList["additionalDamageBuff"],
                DAbuff: 0,
                TAbuff: 0,
                damageLimitBuff: charaBuffList["damageLimitBuff"],
                ougiDamageLimitBuff: charaBuffList["ougiDamageLimitBuff"],
                normalOtherCriticalBuff: [],
                support: chara[i].support,
                support2: chara[i].support2,
                support3: chara[i].support3,
                charaHaisui: 0,
                debuffResistance: 0,
                charaDamageUP: 0,
                tenshiDamageUP: 0,
                charaUniqueDamageUP: 0
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
                damageLimit: 0
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
            if (!isNaN(summon[s].ougiDamage)) totalSummon["ougiDamage"] = parseInt(summon[s].ougiDamage);
            if (!isNaN(summon[s].tenshiDamageUP)) totalSummon["tenshiDamageUP"] = parseInt(summon[s].tenshiDamageUP);
            if (!isNaN(summon[s].damageLimit)) totalSummon["damageLimit"] = parseInt(summon[s].damageLimit);

            totals[key]["totalSummon"][s] = totalSummon
        }
    }

    for (var key in totals) {
        totals[key]["typeBonus"] = module.exports.getTypeBonus(totals[key]["element"], prof.enemyElement)
    }

    return totals
};

module.exports.initializeTotals = function (totals) {
    // Initialize values that change according to weapon organization
    for (var key in totals) {
        totals[key]["armAttack"] = 0;
        totals[key]["armHP"] = 0;
        totals[key]["HPdebuff"] = 0;
        totals[key]["magna"] = 0;
        totals[key]["magnaSoka"] = 0;
        totals[key]["magnaHaisui"] = 0;
        totals[key]["magnaKonshin"] = 0;
        totals[key]["normal"] = 0;
        totals[key]["Soka"] = 0;
        totals[key]["normalOther"] = 0;
        totals[key]["normalHaisui"] = 0;
        totals[key]["normalOtherHaisui"] = 0;
        totals[key]["normalKonshin"] = 0;
        totals[key]["normalOtherKonshin"] = 0;
        totals[key]["unknown"] = 0;
        totals[key]["ex"] = 0;
        totals[key]["exHaisui"] = 0;
        totals[key]["sensei"] = 0;
        totals[key]["akashaSensei"] = 0;
        totals[key]["bahaAT"] = 0;
        totals[key]["bahaHP"] = 0;
        totals[key]["bahaDA"] = 0;
        totals[key]["bahaTA"] = 0;
        totals[key]["magnaHP"] = 0;
        totals[key]["normalHP"] = 0;
        totals[key]["unknownHP"] = 0;
        totals[key]["exHP"] = 0;
        totals[key]["normalNite"] = 0;
        totals[key]["magnaNite"] = 0;
        totals[key]["normalSante"] = 0;
        totals[key]["normalLesserSante"] = 0;
        totals[key]["magnaSante"] = 0;
        totals[key]["magnaLesserSante"] = 0;
        totals[key]["exNite"] = 0;
        totals[key]["normalCritical"] = [];
        totals[key]["normalOtherCritical"] = [];
        totals[key]["magnaCritical"] = 0;
        totals[key]["cosmosBL"] = 0;
        totals[key]["cosmosAT"] = 0;
        totals[key]["omegaNormal"] = 0;
        totals[key]["omegaNormalHP"] = 0;
        totals[key]["akashaATK"] = 0;
        totals[key]["akashaHP"] = 0;
        totals[key]["normalOtherNite"] = 0;
        totals[key]["normalOtherSante"] = 0;
        totals[key]["normalOtherLesserSante"] = 0;
        totals[key]["ougiDamage"] = 0;
        totals[key]["normalOugiDamage"] = 0;
        totals[key]["magnaOugiDamage"] = 0;
        totals[key]["chainDamage"] = 0;
        totals[key]["normalDamageLimit"] = 0;
        totals[key]["ougiDamageLimit"] = 0;
        totals[key]["normalChainDamage"] = 0;
        totals[key]["chainDamageLimit"] = 0;
        totals[key]["magnaOugiDamageLimit"] = 0;
        totals[key]["normalOugiDamageLimit"] = 0;
        totals[key]["exceedOugiDamageLimit"] = 0;
        totals[key]["omegaOugiDamageLimit"] = 0;
        totals[key]["normalChainDamageLimit"] = 0;
        totals[key]["additionalDamage"] = 0;
        totals[key]["ougiDebuff"] = 0;
        totals[key]["DAbuff"] = 0;
        totals[key]["TAbuff"] = 0;
        totals[key]["debuffResistance"] = 0;
        totals[key]["tenshiDamageUP"] = 0;
    }
};

module.exports.calcOneCombination = function (comb, summon, prof, arml, totals, buff) {
    module.exports.addSkilldataToTotals(totals, comb, arml, buff);
    var result = [];
    for (var i = 0; i < summon.length; i++) {
        // Make an array of associative arrays containing results such as attacks
        result.push(module.exports.calcBasedOneSummon(i, prof, buff, totals));
    }

    return result
};

// Overwrite the content of totals with what reflects charap's support
module.exports.treatSupportAbility = function (totals, chara) {
    for (var key in totals) {
        for (var i = 0; i < 3; i++) {
            if (i == 0) {
                if (totals[key]["support"] == undefined) continue;
                var support = supportAbilities[totals[key]["support"]];
            } else if (i == 1) {
                if (totals[key]["support2"] == undefined) continue;
                var support = supportAbilities[totals[key]["support2"]];
            } else {
                if (totals[key]["support3"] == undefined) continue;
                var support = supportAbilities[totals[key]["support3"]];
            }

            if (support.type == "none") continue;

            // Processing of special supporter abilities
            switch (support.type) {
                case "normalBuff_doraf":
                    if (totals[key].isConsideredInAverage) {
                        for (var key2 in totals) {
                            // Draph, Unknown and Primal characters only (Fortified Vigor)
                            if (totals[key2]["race"] === "doraf" ||
                                totals[key2]["race"] === "unknown" ||
                                totals[key2]["race"] === "seisho") {
                                totals[key2]["normalBuff"] += support.value
                            }
                        }
                    } else {
                        // Calculate yourself only if you do not put it in the average
                        totals[key]["normalBuff"] += support.value
                    }
                    continue;
                case "normalBuff_depends_races":
                    var races = Math.min(4, module.exports.checkNumberOfRaces(chara));
                    // 50% for 4 races, otherwise 10% for each race
                    totals[key]["normalBuff"] += races == 4 ? 0.50 : races * 0.10;
                    continue;
                case "normalBuff_depends_member":
                    continue;
                case "dataBuff_wind":
                    if (totals[key].isConsideredInAverage) {
                        for (var key2 in totals) {
                            if (totals[key2]["element"] === "wind") {
                                totals[key2]["DABuff"] += 0.10;
                                totals[key2]["TABuff"] += 0.05;
                            }
                        }
                    } else {
                        // Calculate yourself only if you do not put it in the average
                        totals[key]["DABuff"] += 0.10;
                        totals[key]["TABuff"] += 0.05;
                    }
                    continue;
                case "daBuff_fist":
                    if (totals[key].isConsideredInAverage) {
                        for (var key2 in totals) {
                            if (totals[key2]["fav1"] === "fist" || totals[key2]["fav2"] === "fist") {
                                totals[key2]["DABuff"] += support.value;
                            }
                        }
                    } else {
                        // Calculate yourself only if you do not put it in the average
                        totals[key]["DABuff"] += support.value;
                    }
                    continue;
                case "emnity_all_SL10":
                    // Refer to HP of Zahlhamelina
                    var charaHaisuiValue = module.exports.calcHaisuiValue("charaHaisui", "L", 10, totals[key]["remainHP"]);
                    if (totals[key].isConsideredInAverage) {
                        for (var key2 in totals) {
                            totals[key2]["charaHaisui"] += charaHaisuiValue
                        }
                    } else {
                        totals[key]["charaHaisui"] += charaHaisuiValue
                    }
                    continue;
                case "emnity_own_SL20":
                    // Refer to Dark Jeanne's HP
                    totals[key]["charaHaisui"] += module.exports.calcHaisuiValue("charaHaisui", "L", 20, totals[key]["remainHP"]);
                    continue;
                case "envoy_meditation":
                    var elements = Math.min(4, module.exports.checkNumberOfElements(totals));
                    // number of elements * attack 15% DA 10% TA 3%
                    totals[key]["normalBuff"] += elements * 0.15;
                    totals[key]["DABuff"] += elements * 0.10;
                    totals[key]["TABuff"] += elements * 0.03;
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
                case "charaDamageUP_OugiCap":
                    totals[key]["charaDamageUP"] += support.value;
                    totals[key]["ougiDamageLimitBuff"] += support.value;
                    continue;
                case "ougiDamageBuff_capBuff":
                    if (totals[key].isConsideredInAverage) {
                        for (var key2 in totals) {
                            totals[key2]["ougiDamageBuff"] += support.value;
                            totals[key2]["ougiDamageLimitBuff"] += 0.10;
                        }
                    } else {
                        // Calculate yourself only if you do not put it in the average
                        totals[key]["ougiDamageBuff"] += support.value;
                        totals[key]["ougiDamageLimitBuff"] += 0.10;
                    }
                    continue;
                default:
                    break;
            }

            // Critical processing
            if (support.type == "criticalBuff") {
                if (support.range == "own") {
                    totals[key]["normalOtherCriticalBuff"].push({
                        "value": support.value,
                        "attackRatio": support.attackRatio
                    })
                } else {
                    if (totals[key].isConsideredInAverage) {
                        for (var key2 in totals) {
                            totals[key2]["normalOtherCriticalBuff"].push({
                                "value": support.value,
                                "attackRatio": support.attackRatio
                            })
                        }
                    } else {
                        totals[key]["normalOtherCriticalBuff"].push({
                            "value": support.value,
                            "attackRatio": support.attackRatio
                        })
                    }
                }
                continue;
            }

            // Processing in case of simple buff system
            if (support.range == "own") {
                totals[key][support.type] += support.value
            } else {
                // range == "all"
                // If it is included in the average it affects the whole
                if (totals[key].isConsideredInAverage) {
                    for (var key2 in totals) {
                        totals[key2][support.type] += support.value
                    }
                } else {
                    totals[key][support.type] += support.value
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
        var AllTotalAttack = [["残りHP(%)"]];
        var AllCycleDamagePerTurn = [["残りHP(%)"]];
        var AllCriticalAttack = [["残りHP(%)"]];
        var AllTotalExpected = [["残りHP(%)"]];
        var AllAverageTotalAttack = [["残りHP(%)"]];
        var AllAverageTotalExpected = [["残りHP(%)"]];
        var AllAverageCycleDamagePerTurn = [["残りHP(%)"]];
        var AllAverageCriticalAttack = [["残りHP(%)"]];
        var AllTotalHP = [["残りHP(%)"]]
    }

    // Because the character formation is unchanged every weapon organization, it can be calculated earlier
    var charaHaisuiBuff = [];
    for (var k = 0; k < 100; ++k) {
        var charaHaisuiValue = module.exports.recalcCharaHaisui(chara, 0.01 * (k + 1));
        charaHaisuiBuff.push(charaHaisuiValue);
    }

    var allAlreadyUsedHP = {};

    for (var s = 0; s < res.length; s++) {
        var oneresult = res[s];
        var summonHeader = module.exports.makeSummonHeaderString(summon[s], locale);
        var TotalAttack = [["残りHP(%)"]];
        var TotalHP = [["残りHP(%)"]];
        var CriticalAttack = [["残りHP(%)"]];
        var TotalExpected = [["残りHP(%)"]];
        var CycleDamagePerTurn = [["残りHP(%)"]];
        var AverageTotalExpected = [["残りHP(%)"]];
        var AverageTotalAttack = [["残りHP(%)"]];
        var AverageCriticalAttack = [["残りHP(%)"]];
        var AverageCycleDamagePerTurn = [["残りHP(%)"]];

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
                var totalSkillWithoutHaisui = onedata[key].totalSkillCoeff / (normalHaisuiOrig * magnaHaisuiOrig * normalKonshinOrig * charaHaisuiOrig * exHaisuiOrig * magnaKonshinOrig);

                var haisuiBuff = [];
                // Character emnity should be calculated for each character
                for (var k = 0; k < 100; k++) {
                    haisuiBuff.push({
                        normalHaisui: 1.0,
                        magnaHaisui: 1.0,
                        normalKonshin: 1.0,
                        magnaKonshin: 1.0,
                        exHaisui: 1.0,
                        charaHaisui: charaHaisuiBuff[k]
                    })
                }

                // Prevent omega weapons skills from being computed in duplicate
                var omegaHaisuiIncluded = false;
                var omegaKonshinIncluded = false;

                // Weapon data calculation
                for (var i = 0; i < arml.length; i++) {
                    var arm = arml[i];

                    if (storedCombinations[j][i] === 0) continue;

                    for (var jj = 1; jj <= 3; jj++) {
                        var skillname = '';
                        var element = '';
                        arm.element != undefined ? arm.element : "fire";
                        if (jj == 1) {
                            skillname = arm.skill1;
                            element = arm.element != undefined ? arm.element : "fire"
                        } else if (jj == 2) {
                            skillname = arm.skill2;
                            element = arm.element2 != undefined ? arm.element2 : "fire"
                        } else {
                            skillname = arm.skill3;
                            element = arm.element3 != undefined ? arm.element3 : "fire"
                        }

                        if (skillname != 'non') {
                            var stype = skilltypes[skillname].type;
                            var amount = skilltypes[skillname].amount;
                            var slv = parseInt(arm.slv);

                            slv = maskInvalidSkillLevel(slv, stype, amount);

                            if (skillname === "omega-gekijou") {
                                if (!omegaHaisuiIncluded && (arm.armType === onedata[key].fav1 || arm.armType === onedata[key].fav2)) {
                                    for (var l = 0; l < haisuiBuff.length; l++) {
                                        var remainHP = 0.01 * (l + 1);
                                        haisuiBuff[l]["normalHaisui"] += 0.01 * module.exports.calcHaisuiValue("normalHaisui", amount, slv, remainHP)
                                    }
                                    omegaHaisuiIncluded = true;
                                }
                            } else if (skillname === "omega-kyousou") {
                                if (!omegaKonshinIncluded && (arm.armType === onedata[key].fav1 || arm.armType === onedata[key].fav2)) {
                                    for (var l = 0; l < haisuiBuff.length; l++) {
                                        var remainHP = 0.01 * (l + 1);
                                        haisuiBuff[l]["normalKonshin"] += 0.01 * module.exports.calcHaisuiValue("omegaKonshin", amount, slv, remainHP)
                                    }
                                    omegaKonshinIncluded = true;
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
                }

                for (var k = 0; k < 100; k++) {
                    var newTotalSkillCoeff = totalSkillWithoutHaisui * haisuiBuff[k].normalHaisui * haisuiBuff[k].magnaHaisui * haisuiBuff[k].normalKonshin * haisuiBuff[k].magnaKonshin * haisuiBuff[k].charaHaisui * haisuiBuff[k].exHaisui;
                    var summedAttack = onedata[key].displayAttack;
                    var newTotalAttack = summedAttack * newTotalSkillCoeff;
                    var newTotalExpected = newTotalAttack * onedata[key].criticalRatio * onedata[key].expectedAttack;

                    var newDamage = module.exports.calcDamage(summedAttack, newTotalSkillCoeff, onedata[key].criticalRatio, prof.enemyDefense, prof.defenseDebuff, onedata[key].skilldata.additionalDamage, onedata[key].skilldata.damageUP, onedata[key].skilldata.damageLimit)
                    var newOugiDamage = module.exports.calcOugiDamage(summedAttack, newTotalSkillCoeff, onedata[key].criticalRatio, prof.enemyDefense, prof.defenseDebuff, onedata[key].ougiRatio, onedata[key].skilldata.ougiDamageUP, onedata[key].skilldata.damageUP, onedata[key].skilldata.ougiDamageLimit)

                    var chainNumber = !isNaN(prof.chainNumber) ? parseInt(prof.chainNumber) : 1;
                    var newChainBurst = module.exports.calcChainBurst(chainNumber * newOugiDamage, chainNumber, module.exports.getTypeBonus(onedata[key].element, prof.enemyElement), onedata[key].skilldata.chainDamageUP, onedata[key].skilldata.chainDamageLimit) / chainNumber;
                    var newExpectedCycleDamagePerTurn = (newChainBurst + newOugiDamage
                        + onedata[key].expectedTurn * onedata[key].expectedAttack * newDamage) / (onedata[key].expectedTurn + 1);

                    var hp;
                    if (displayRealHP) {
                        // Actual HP
                        hp = parseInt(0.01 * (k + 1) * onedata["Djeeta"].totalHP);
                    } else {
                        // Residual HP ratio
                        hp = k + 1
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
                for (var k = 0; k < 100; k++) {
                    var hp;
                    if (displayRealHP) {
                        // Actual HP
                        hp = parseInt(0.01 * (k + 1) * onedata["Djeeta"].totalHP);
                    } else {
                        // Residual HP ratio
                        hp = k + 1
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
            for (var k = 1; k <= 100; k++) {
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
                        var newOugiDamage = module.exports.calcOugiDamage(onedata[key].displayAttack, onedata[key].totalSkillCoeff, onedata[key].criticalRatio, prof.enemyDefense, prof.defenseDebuff, prof.ougiRatio, onedata[key].skilldata.ougiDamageUP, onedata[key].skilldata.damageUP, onedata[key].skilldata.ougiDamageLimit);

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
                        var newDamage = module.exports.calcDamage(onedata[key].displayAttack, onedata[key].totalSkillCoeff, onedata[key].criticalRatio, prof.enemyDefense, prof.defenseDebuff, onedata[key].skilldata.additionalDamage, onedata[key].skilldata.damageUP, onedata[key].skilldata.damageLimit);
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

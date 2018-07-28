var intl = require('./translate.js')
var GlobalConst = require('./global_const.js')
var elementRelation = GlobalConst.elementRelation
var bahamutRelation = GlobalConst.bahamutRelation
var bahamutFURelation = GlobalConst.bahamutFURelation
var supportAbilities = GlobalConst.supportAbilities
var zenith = GlobalConst.zenith
var Jobs = GlobalConst.Jobs
var armTypes = GlobalConst.armTypes
var jobTypes = GlobalConst.jobTypes
var keyTypes = GlobalConst.keyTypes
var skilltypes = GlobalConst.skilltypes
var skillAmounts = GlobalConst.skillAmounts
var elementTypes = GlobalConst.elementTypes
var summonTypes = GlobalConst.summonTypes
var summonElementTypes = GlobalConst.summonElementTypes
var raceTypes = GlobalConst.raceTypes
var filterElementTypes = GlobalConst.filterElementTypes
var enemyDefenseType = GlobalConst.enemyDefenseType

module.exports.isCosmos = function(arm){
    var isCos = false;
    if(skilltypes[arm.skill1] != undefined && skilltypes[arm.skill1].type == "cosmosArm") {
        isCos = true;
    } else if(skilltypes[arm.skill2] != undefined && skilltypes[arm.skill2].type == "cosmosArm") {
        isCos = true;
    }

    return isCos
};

function isHaisuiType(stype) {
    if (
        stype === "normalHaisui" ||
        stype === "magnaHaisui" ||
        stype === "normalKonshin" ||
        stype === "normalOtherKonshin" ||
        stype === "magnaKonshin" ||
        stype === "exHaisui"
    ) {
        return true;
    }

    return false;
}

module.exports.isValidResult = function(res, minHP){
    // 結果の前処理用の関数

    // 最低保証HP
    if(minHP != undefined) {
        if (minHP > res.Djeeta.totalHP) return false
    }
    return true
};

module.exports.proceedIndex = function(index, ana, i){
    if(i == ana.length){
        return index;
    } else {
        index[i] = (index[i] + 1)|0;
        if(index[i] > ana[i].length - 1){
            index[i] = 0;
            index = arguments.callee(index, ana, i + 1);
        }
        return index
    }
};

module.exports.calcCombinations = function(arml) {
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
        isCosmosArray[i] = module.exports.isCosmos(arml[i])
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
        index = module.exports.proceedIndex(index, armNumArray, 0)
    }
    return combinations
};

module.exports.getTypeBonus = function(self_elem, enemy_elem) {
    var t_enemy_elem = (enemy_elem == undefined) ? "fire" : enemy_elem
    var t_elem = (self_elem == undefined) ? "fire" : self_elem

    if(elementRelation[ t_elem ]["weak"] == t_enemy_elem) {
        return 0.75
    } else if(elementRelation[ t_elem ]["strong"] == t_enemy_elem) {
        return 1.5
    } else {
        return 1.0
    }
},

module.exports.getTypeBonusStr = function(self_elem, enemy_elem) {
    switch(module.exports.getTypeBonus(self_elem, enemy_elem)) {
        case 1.0:
            return "非有利"
        case 1.5:
            return "有利"
        case 0.75:
            return "不利"
        default:
            return "非有利"
    }
};

module.exports.makeSummonHeaderString = function(summon, locale) {
    var summonHeader = ""
    if (summon.selfSummonType == "odin") {
        summonHeader += intl.translate("属性攻", locale) + summon.selfSummonAmount + intl.translate("キャラ攻", locale) + summon.selfSummonAmount2
    } else {
        summonHeader += intl.translate(summonElementTypes[summon.selfElement].name, locale) + intl.translate(summonTypes[summon.selfSummonType], locale) + summon.selfSummonAmount
    }

    summonHeader += " + "
    if (summon.friendSummonType == "odin") {
        summonHeader += intl.translate("属性攻", locale) + summon.friendSummonAmount + intl.translate("キャラ攻", locale) + summon.friendSummonAmount2
    } else {
        summonHeader += intl.translate(summonElementTypes[summon.friendElement].name, locale) + intl.translate(summonTypes[summon.friendSummonType], locale) + summon.friendSummonAmount
    }
    return summonHeader;
}

module.exports.calcDamage = function(summedAttack, totalSkillCoeff, criticalRatio, enemyDefense, additionalDamage, damageUP, damageLimit) {
    // ダメージ計算
    var def = (enemyDefense == undefined) ? 10.0 : enemyDefense
    var damage = Math.ceil(Math.ceil(summedAttack / def) * totalSkillCoeff) * criticalRatio
    var overedDamage = 0

    var limitValues = [[600000, 0.01], [500000, 0.05], [400000, 0.60], [300000, 0.80]];

    for ( var index = 0; index < 4; index++ ) {
        // 減衰ライン算出
        var limitValue = limitValues[index][0] * (1.0 + damageLimit);
        var limitRatio = limitValues[index][1];

        // 減衰ラインを超えている分だけ減算
        if ( damage > limitValue ) {
            overedDamage += limitRatio * ( damage - limitValue );
            damage = limitValue;
        }
    }

    var res = damage + overedDamage;

    if(additionalDamage > 0) {
        res *= 1.0 + additionalDamage
    }

    // "与ダメージアップ"は減衰後の補正
    if(damageUP > 0) {
        res *= 1.0 + damageUP
    }

    return res
};

module.exports.calcOugiDamage = function(summedAttack, totalSkillCoeff, criticalRatio, enemyDefense, ougiRatio, ougiDamageUP, damageUP, ougiDamageLimit) {
    // ダメージ計算
    var def = (enemyDefense == undefined) ? 10.0 : enemyDefense
    var ratio = (ougiRatio == undefined) ? 4.5 : ougiRatio
    var damage = (1.0 + ougiDamageUP) * ratio * Math.ceil(Math.ceil(summedAttack / def) * totalSkillCoeff) * criticalRatio
    var overedDamage = 0.0

    var limitValues = [[2500000, 0.01], [1800000, 0.05], [1700000, 0.30], [1500000, 0.60]];

    for ( var index = 0; index < 4; index++ ) {
        // 減衰ライン算出
        var limitValue = limitValues[index][0] * (1.0 + ougiDamageLimit);
        var limitRatio = limitValues[index][1];

        // 減衰ラインを超えている分だけ減算
        if ( damage > limitValue ) {
            overedDamage += limitRatio * ( damage - limitValue );
            damage = limitValue;
        }
    }

    // 最終的なダメージは補正分 + 最低減衰ラインになる
    damage = damage + overedDamage

    // 与ダメージアップ
    if(damageUP > 0) {
        return (1.0 + damageUP) * damage;
    } else {
        return damage
    }
};

module.exports.calcChainBurst = function(ougiDamage, chainNumber, typeBonus) {
    if(chainNumber <= 1) return 0.0;

    var chainCoeff = 0.0;
    if(chainNumber === 2) {
        chainCoeff = 0.25;
    } else if (chainNumber === 3) {
        chainCoeff = 1.0/3.0;
    } else {
        // full or over chain
        chainCoeff = 0.50;
    }

    var chainDamageLimitUP = 0.0
    var damage = typeBonus * chainCoeff * ougiDamage
    var overedDamage = 0.0

    if (chainNumber <= 2) {
        var limitValues = [[1500000, 0.01], [1300000, 0.05], [1200000, 0.30], [1000000, 0.60]]
    } else if ( chainNumber === 3) {
        var limitValues = [[2000000, 0.01], [1600000, 0.05], [1400000, 0.30], [1200000, 0.60]]
    } else {
        var limitValues = [[2500000, 0.01], [1800000, 0.05], [1700000, 0.30], [1500000, 0.60]]
    }

    for ( var index = 0; index < 4; index++ ) {
        // 減衰ライン算出
        var limitValue = limitValues[index][0] * (1.0 + chainDamageLimitUP)
        var limitRatio = limitValues[index][1]

        // 減衰ラインを超えている分だけ減算
        if ( damage > limitValue ) {
            overedDamage += limitRatio * ( damage - limitValue )
            damage = limitValue
        }
    }

    // 最終的なダメージは補正分 + 最低減衰ラインになる
    damage = damage + overedDamage
    return damage;
}

module.exports.calcCriticalArray = function(normalCritical, _magnaCritical, normalOtherCritical, summon) {
    var probability = [] // それぞれの発生確率を格納する
    var damageRatio = [] // 対応する倍率を格納する

    var magnaCritical = 0.01 * _magnaCritical * summon["magna"]
    if(magnaCritical > 1.0) {
        probability.push(1.0);
        damageRatio.push(0.5);
    } else if (magnaCritical > 0.0) {
        probability.push(magnaCritical);
        damageRatio.push(0.5);
    }

    // 通常技巧配列は[確率1, 確率2, 確率3, ... ]という形式で渡される
    for(var j = 0; j < normalCritical.length; j++){
        // 単体スキル分なので1.0以上の値が来ないか確認しなくて良い
        probability.push(0.01 * normalCritical[j]["value"] * summon["zeus"]);
        damageRatio.push(normalCritical[j]["attackRatio"]);
    }

    // LBやサポアビ分の技巧
    for(var j = 0; j < normalOtherCritical.length; j++){
        probability.push(normalOtherCritical[j]["value"]);
        damageRatio.push(normalOtherCritical[j]["attackRatio"]);
    }

    // 最大10要素 + LB + キャラ技巧の技巧配列が来る
    // それぞれ倍率と発動率は違う
    // n要素とした時、最大2^n個の発動確率がある
    // {発動率: {発動本数: x, ケース: 1}}という配列にすればそのあとkeysを使うことで期待値が出せる
    // {ダメージ倍率: {発動確率: x}}という配列にして、
    // 同じ倍率の場合は発動確率を加算すればよい
    var criticalRatioArray = {}

    if(probability.length > 0){
        var bitmask = []
        for(var i = 0; i < probability.length; i++) {
            bitmask.push(1 << i);
        }

        for(var i = 0; i < Math.pow(2, probability.length); i++) {
            var eachProb = 1.0
            var attackRatio = 1.0

            for(var j = 0; j < probability.length; j++) {
                if((bitmask[j] & i) > 0) {
                    // j番目の技巧が発動
                    eachProb *= probability[j]
                    attackRatio += damageRatio[j]
                } else {
                    // j番目の技巧は非発動
                    eachProb *= 1.0 - probability[j]
                }
            }

            // ここまでである1ケースの発動率が算出できた
            if(eachProb > 0.0) {
                if(eachProb > 1.0) eachProb = 1.0

                if(!(attackRatio in criticalRatioArray)) {
                    // ratioが存在しない場合
                    criticalRatioArray[attackRatio] = eachProb
                } else {
                    // ratioが存在する場合
                    criticalRatioArray[attackRatio] += eachProb
                }
            }
        }
    }
    return criticalRatioArray;
}

module.exports.calcCriticalRatio = function(criticalRatioArray) {
    var criticalRatio = 0.0

    if (Object.keys(criticalRatioArray).length > 0) {
        for(var attackRatio in criticalRatioArray) {
            criticalRatio += attackRatio * criticalRatioArray[attackRatio]
        }
    } else {
        criticalRatio = 1.0
    }

    return criticalRatio
};

module.exports.calcCriticalDeviation = function(criticalRatioArray) {
    var expectedValue = module.exports.calcCriticalRatio(criticalRatioArray);
    var variance = 0.0;

    for (var attackRatio in criticalRatioArray) {
        variance += criticalRatioArray[attackRatio] * Math.pow((attackRatio - expectedValue), 2)
    }

    return Math.sqrt(variance);
}

module.exports.calcBasedOneSummon = function(summonind, prof, buff, totals) {
    var res = {}

    for(var key in totals) {
        var totalSummon = totals[key]["totalSummon"][summonind]

        // 各種攻刃係数の計算
        var magnaCoeff = 1.0 + 0.01 * totals[key]["magna"] * totalSummon["magna"] + 0.01 * totals[key]["magnaSoka"] * totalSummon["magna"]
        var magnaHaisuiCoeff = 1.0 + 0.01 * (totals[key]["magnaHaisui"] * totalSummon["magna"])
        var magnaKonshinCoeff = 1.0 + 0.01 * (totals[key]["magnaKonshin"] * totalSummon["magna"])
        var exCoeff = 1.0 + 0.01 * totals[key]["unknown"] * totalSummon["ranko"] + 0.01 * totals[key]["ex"]
        var exHaisuiCoeff = 1.0 + 0.01 * totals[key]["exHaisui"]
        var normalCoeff = 1.0 + 0.01 * totals[key]["normal"] * totalSummon["zeus"] + 0.01 * totals[key]["normalSoka"] * totalSummon["zeus"] + 0.01 * totals[key]["bahaAT"] + 0.01 * totals[key]["normalOther"] + 0.01 * totals[key]["cosmosAT"] + 0.01 * totals[key]["omegaNormal"] + totalSummon["chara"] + buff["normal"] + totals[key]["normalBuff"]
            // 先制を通常攻刃へ加算
            normalCoeff += 0.01 * totals[key]["sensei"]
        var normalHaisuiCoeff = 1.0 + 0.01 * (totals[key]["normalHaisui"]) * totalSummon["zeus"] + 0.01 * (totals[key]["normalOtherHaisui"])
        var normalKonshinCoeff = 1.0 + 0.01 * (totals[key]["normalKonshin"]) * totalSummon["zeus"] + 0.01 * (totals[key]["normalOtherKonshin"])
        // 属性(経過ターン)も最大値で計算する
        var elementCoeff = totals[key]["typeBonus"] + (totalSummon["element"] - 1.0 + totalSummon["elementTurn"] - 1.0) + buff["element"] + totals[key]["elementBuff"] + 0.01 * totals[key]["LB"].Element
        var otherCoeff = (1.0 + buff["other"]) * (1.0 + buff["other2"]) * (1.0 + totals[key]["otherBuff"]) * (1.0 + totals[key]["otherBuff2"])

        // キャラ背水枠
        var charaHaisuiCoeff = 1.0 + 0.01 * totals[key]["charaHaisui"]

        // hp倍率
        var hpCoeff = (1.0 + buff["hp"] + totalSummon["hpBonus"] + 0.01 * totals[key]["bahaHP"] + 0.01 * totals[key]["omegaNormalHP"] + 0.01 * totals[key]["magnaHP"] * totalSummon["magna"] + 0.01 * totals[key]["normalHP"] * totalSummon["zeus"] + 0.01 * totals[key]["unknownHP"] * totalSummon["ranko"] + 0.01 * totals[key]["exHP"])

        if (key == "Djeeta") hpCoeff += 0.01 * totals["Djeeta"]["job"].shugoBonus
        hpCoeff *= 1.0 - totals[key]["HPdebuff"]

        // ベースHP
        var displayHP = totals[key]["baseHP"] + totals[key]["armHP"] + totalSummon["hp"]

        if(key == "Djeeta") {
            // for Djeeta
            var summedAttack = (totals[key]["baseAttack"] + totals[key]["armAttack"] + totalSummon["attack"] + totals["Djeeta"]["job"].atBonus) * (1.0 + buff["master"])
            // 主人公HP計算
            displayHP += totals["Djeeta"]["job"].hpBonus
            displayHP *= (1.0 + buff["masterHP"])
            var totalHP = displayHP * hpCoeff
        } else {
            // for chara
            var summedAttack = totals[key]["baseAttack"] + totals[key]["armAttack"] + totalSummon["attack"] + totals[key]["LB"].ATK
            displayHP += totals[key]["LB"].HP
            var totalHP = displayHP* hpCoeff
        }

        var totalSkillCoeff = magnaCoeff * magnaHaisuiCoeff * magnaKonshinCoeff * normalCoeff * normalHaisuiCoeff * elementCoeff * exCoeff * otherCoeff * exHaisuiCoeff * normalKonshinCoeff * charaHaisuiCoeff
        var totalAttack = summedAttack * totalSkillCoeff

        // HPの下限は 1
        if( totalHP <= 0 ) totalHP = 1

        // for DA and TA
        var normalNite = totals[key]["normalNite"] * totalSummon["zeus"];
        var magnaNite = totals[key]["magnaNite"] * totalSummon["magna"];
        var normalSante = totals[key]["normalSante"] * totalSummon["zeus"] + totals[key]["normalOtherSante"];
        var magnaSante = totals[key]["magnaSante"] * totalSummon["magna"];
        var exNite = totals[key]["exNite"]

        // DATA 上限
        // 通常・方陣・EX・バハ・コスモスBLで別枠とする
        // DATA debuff は羅刹用
        var armDAupNormal = (normalNite + normalSante > 50.0) ? 50.0 : normalNite + normalSante
        var armDAupMagna = (magnaNite + magnaSante > 50.0) ? 50.0 : magnaNite + magnaSante
        var armDAupBaha = (totals[key]["bahaDA"] > 50.0) ? 50.0 : totals[key]["bahaDA"]
        var armDAupCosmos = (totals[key]["cosmosBL"] > 50.0) ? 50.0 : totals[key]["cosmosBL"]
        var armDAupOther = (totals[key]["DAbuff"] > 50.0) ? 50.0 : totals[key]["DAbuff"] // 特殊スキルなどの分
        // unknownは現状50%に届くことはない
        var totalDA = 0.01 * (totals[key]["baseDA"] + totals[key]["LB"]["DA"]) + buff["da"] + totals[key]["DABuff"] + totalSummon["da"] + 0.01 * (armDAupNormal + armDAupMagna + exNite + armDAupBaha + armDAupCosmos + armDAupOther)
        if (totalDA < 0.0) totalDA = 0.0

        // TAのみ上昇するスキルを LesserSante と呼ぶ
        var normalLesserSante = totals[key]["normalLesserSante"] * totalSummon["zeus"];
        var magnaLesserSante = totals[key]["magnaLesserSante"] * totalSummon["magna"];
        var armTAupNormal = (normalSante + normalLesserSante > 50.0) ? 50.0 : normalSante + normalLesserSante
        var armTAupMagna  = (magnaSante > 50.0)  ? 50.0 : magnaSante + magnaLesserSante
        var armTAupBaha = (totals[key]["bahaTA"] > 50.0) ? 50.0 : totals[key]["bahaTA"]
        var armTAupOther = (totals[key]["TAbuff"] > 50.0) ? 50.0 : totals[key]["TAbuff"]
        var totalTA = 0.01 * (totals[key]["baseTA"] + totals[key]["LB"]["TA"]) + buff["ta"] + totals[key]["TABuff"] + totalSummon["ta"] + 0.01 * (armTAupNormal + armTAupMagna + armTAupBaha + armTAupOther)
        if(totalTA < 0.0) totalTA = 0.0

        var taRate = (parseFloat(totalTA) >= 1.0) ? 1.0 : parseFloat(totalTA)
        var daRate = (parseFloat(totalDA) >= 1.0) ? 1.0 : parseFloat(totalDA)
        var expectedAttack = 3.0 * taRate + (1.0 - taRate) * (2.0 * daRate + (1.0 - daRate))

        if (totals[key]["typeBonus"] == 1.5) {
            // 与ダメージ上昇サポアビは天司スキルと重複しない（効果の高い方のみ発揮）
            var damageUP = (totals[key]["tenshiDamageUP"] > totals[key]["charaDamageUP"]) ? totals[key]["tenshiDamageUP"] : totals[key]["charaDamageUP"]

            // 通常別枠の技巧スキル配列を生成
            var LBCriticalArray = getLBCriticalArray(totals[key]["LB"]);
            var normalOtherCriticalBuffArray = totals[key]["normalOtherCriticalBuff"];
            var normalOtherCriticalArray = totals[key]["normalOtherCritical"].concat(LBCriticalArray, normalOtherCriticalBuffArray);

            var criticalArray = module.exports.calcCriticalArray(totals[key]["normalCritical"], totals[key]["magnaCritical"], normalOtherCriticalArray, totalSummon)
            var criticalRatio = module.exports.calcCriticalRatio(criticalArray)
        } else if (prof.enemyElement == "non-but-critical") {
            // "無（技巧あり）"の場合の処理
            var damageUP = 0.0

            var LBCriticalArray = getLBCriticalArray(totals[key]["LB"]);
            var normalOtherCriticalBuffArray = totals[key]["normalOtherCriticalBuff"];
            var normalOtherCriticalArray = totals[key]["normalOtherCritical"].concat(LBCriticalArray, normalOtherCriticalBuffArray);

            var criticalArray = module.exports.calcCriticalArray(totals[key]["normalCritical"], totals[key]["magnaCritical"], normalOtherCriticalArray, totalSummon)
            var criticalRatio = module.exports.calcCriticalRatio(criticalArray)
        } else {
            var damageUP = 0.0
            var criticalArray = {}
            var criticalRatio = 1.0
        }

        var criticalAttack = parseInt(totalAttack * criticalRatio)
        var expectedOugiGage = (buff["ougiGage"] + totals[key]["ougiGageBuff"]- totals[key]["ougiDebuff"]) * (taRate * 37.0 + (1.0 - taRate) * (daRate * 22.0 + (1.0 - daRate) * 10.0))

        var minimumTurn = Math.ceil( 100.0 / (37.0 * (buff["ougiGage"] + totals[key]["ougiGageBuff"] - totals[key]["ougiDebuff"])) )
        var expectedTurn = ((100.0 / expectedOugiGage) > minimumTurn) ? (100.0 / expectedOugiGage) : minimumTurn;

        // "additionalDamage"はノーマル枠として神石効果を考慮
        var additionalDamage = (0.01 * totals[key]["additionalDamage"] * totalSummon["zeus"] + totals[key]["additionalDamageBuff"] + buff["additionalDamage"])

        // ダメージ上限UP = 全体バフ + 個人バフ + スキル
        var damageLimit = buff["damageLimit"] + totals[key]["damageLimitBuff"] + totals[key]["normalDamageLimit"]

        // 奥義ダメージ上限UP = 全体バフ + 個人バフ + スキル + ダメージ上限UP分
        // 奥義ダメージのスキル分上限は30%?
        var ougiDamageLimitByExceed = (totals[key]["ougiDamageLimit"] > 0.30) ? 0.30 : totals[key]["ougiDamageLimit"]
        var ougiDamageLimitByMagna = (totals[key]["magnaOugiDamageLimit"] * totalSummon["magna"] > 0.30) ? 0.30 : totals[key]["magnaOugiDamageLimit"] * totalSummon["magna"]
        var ougiDamageLimit = buff["ougiDamageLimit"] + totals[key]["ougiDamageLimitBuff"] + ougiDamageLimitByMagna + ougiDamageLimitByExceed

        // damageは追加ダメージなしの単攻撃ダメージ(減衰・技巧補正あり)
        var damage = module.exports.calcDamage(summedAttack, totalSkillCoeff, criticalRatio, prof.enemyDefense, additionalDamage, damageUP, damageLimit)

        // クリティカル無しの場合のダメージを技巧期待値の補正に使う
        var damageWithoutCritical = module.exports.calcDamage(summedAttack, totalSkillCoeff, 1.0, prof.enemyDefense, additionalDamage, damageUP, damageLimit)

        // 実質の技巧期待値
        var effectiveCriticalRatio = damage/damageWithoutCritical

        // 総合攻撃力 * 技巧期待値 * 連撃期待値
        var sougou_kaisuu_gikou = parseInt(totalAttack * criticalRatio * expectedAttack)

        // 奥義ダメージ = 倍率 * (1 + 奥義ダメージバフ枠) * (1 + 奥義ダメージ上昇スキル枠)
        // 処理共通化のため係数部分(100% + deltaのdelta)のみ保存
        var ougiDamageUP = (1.0 + totals[key]["ougiDamageBuff"]) * (1.0 + 0.01 * totals[key]["magnaOugiDamage"] * totalSummon["magna"] + 0.01 * totals[key]["normalOugiDamage"] * totalSummon["zeus"]) - 1.0
        var ougiDamage = module.exports.calcOugiDamage(summedAttack, totalSkillCoeff, criticalRatio, prof.enemyDefense, totals[key]["ougiRatio"], ougiDamageUP, damageUP, ougiDamageLimit)

        // チェインバーストダメージは「そのキャラと同じダメージを出すやつが chainNumber 人だけいたら」という仮定の元で計算する
        var chainBurst = module.exports.calcChainBurst(buff["chainNumber"] * ougiDamage, buff["chainNumber"], module.exports.getTypeBonus(totals[key].element, prof.enemyElement));

        var expectedCycleDamage = expectedTurn * expectedAttack * damage // 通常攻撃 * n回
            + ougiDamage + (chainBurst / buff["chainNumber"]) // 奥義 + チェインバースト (buff["chainNumber"] は 1 以上なので除算OK)
        var expectedCycleDamagePerTurn = expectedCycleDamage / (expectedTurn + 1.0)

        // 表示用配列
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
        coeffs["hpRatio"] = hpCoeff
        coeffs["additionalDamage"] = additionalDamage
        coeffs["ougiDamageUP"] = ougiDamageUP;
        coeffs["damageUP"] = damageUP
        coeffs["damageLimit"] = damageLimit
        coeffs["ougiDamageLimit"] = ougiDamageLimit
        coeffs["criticalArray"] = criticalArray

        // 連撃情報
        coeffs["normalDA"] = armDAupNormal
        coeffs["magnaDA"] = armDAupMagna
        coeffs["exDA"] = exNite
        coeffs["cosmosDA"] = armDAupCosmos
        coeffs["bahaDA"] = armDAupBaha
        coeffs["otherDA"] = armDAupOther
        coeffs["normalTA"] = armTAupNormal
        coeffs["magnaTA"] = armTAupMagna
        coeffs["bahaTA"] = armTAupBaha
        coeffs["otherTA"] = armTAupOther

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
            // グラフ用
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
            damage: damage * expectedAttack, // 技巧連撃
            pureDamage: damageWithoutCritical, // 純ダメージ
            damageWithCritical: damage, // 技巧のみ
            damageWithMultiple: damageWithoutCritical * expectedAttack, // 連撃のみ
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

    var cnt = 0.0
    for(key in res) {
        if(totals[key]["isConsideredInAverage"]) {
            average += res[key].totalAttack
            crit_average += res[key].criticalAttack
            totalExpected_average += res[key].totalExpected
            averageCyclePerTurn += res[key].expectedCycleDamagePerTurn
            averageChainBurst += res[key].chainBurst;
            cnt += 1.0
        }
    }

    res["Djeeta"]["averageAttack"] = parseInt(average/cnt)
    res["Djeeta"]["averageCriticalAttack"] = parseInt(crit_average/cnt)
    res["Djeeta"]["averageTotalExpected"] = parseInt(totalExpected_average/cnt)
    res["Djeeta"]["averageCyclePerTurn"] = parseInt(averageCyclePerTurn/cnt)
    res["Djeeta"]["averageChainBurst"] = parseInt(averageChainBurst/cnt)
    return res
};

module.exports.getTesukatoripokaAmount = function(amount, numOfRaces){
    if (amount != 100 && amount != 120 && amount != 130) return 0;

    var resultAmount = 10;
    switch(numOfRaces) {
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
};

module.exports.checkNumberofRaces = function(chara){
    // check num of races
    var includedRaces = {
        "human": false,
        "erune": false,
        "doraf": false,
        "havin": false,
        "seisho": false,
        "unknown": true,
    }
    // ジータがいるのでunknown枠は常にtrue
    // indの初期値も1からで良い
    var ind = 1;
    for(var key in chara) {
        if(chara[key].name != "" && chara[key].isConsideredInAverage) {
            if(ind < 4) {
                includedRaces[chara[key]["race"]] = true
            }
            ind++;
        }
    }

    var races = 0
    for(var key in includedRaces) {
        if(includedRaces[key]) races++;
    }
    return races
};

module.exports.calcHaisuiValue = function(haisuiType, haisuiAmount, haisuiSLv, haisuiRemainHP){
    var remainHP = haisuiRemainHP
    var baseRate = 0.0

    if (haisuiType == 'normalHaisui' || haisuiType == 'magnaHaisui' || haisuiType == 'exHaisui' || haisuiType == "charaHaisui")
    {
        // 背水倍率の実装は日比野さんのところのを参照
        // baseRate: HP50%の時の値
        if(haisuiAmount == "S") {
            // 小
            if (haisuiSLv < 10) {
                baseRate = -0.3 + haisuiSLv * 1.8;
            } else if (haisuiSLv <= 15) {
                baseRate = 18.0 + 3.0 * ((haisuiSLv - 10) / 5.0)
            } else {
                baseRate = 21.0 + 0.3 * (haisuiSLv - 15)
            }
        } else if ( haisuiAmount == "M" ){
            // 中
            if(haisuiSLv < 10) {
                baseRate = -0.4 + haisuiSLv * 2.4;
            } else {
                baseRate = 24 + 6.0 * ((haisuiSLv - 10) / 5.0)
            }
        } else {
            // 大
            if(haisuiSLv < 10) {
                baseRate = -0.5 + haisuiSLv * 3.0;
            } else {
                baseRate = 30 + 7.5 * ((haisuiSLv - 10) / 5.0)
            }
        }
        return (baseRate / 3.0) * ( 2.0 * remainHP * remainHP - 5.0 * remainHP + 3.0 )
    } else if (haisuiType === "normalKonshin" || haisuiType === "normalOtherKonshin"){
        if (remainHP >= 0.25) {
            if (haisuiAmount === "S") {
                return 0.0;
            } else if (haisuiAmount === "M"){
                // 通常渾身(中)
                return Math.pow(100.0 * remainHP / (65.0 - haisuiSLv), 2.9) + 2.1;
            } else {
                // 通常渾身(大)
                // ref: http://binarysblog.blog.fc2.com/blog-entry-1.html
                return Math.pow(100.0 * remainHP / (56.4 - haisuiSLv), 2.9) + 2.1;
            }
        } else {
            return 0.0;
        }
    } else if (haisuiType === "magnaKonshin") {
        if (remainHP >= 0.25) {
            if (haisuiAmount === "S") {
                return 0.0;
            } else if (haisuiAmount === "M"){
                // マグナ渾身(中)
                return Math.pow(100.0 * remainHP / (60.4 - haisuiSLv), 2.9) + 2.1;
            } else {
                return 0.0;
            }
        } else {
            return 0.0;
        }
    } else if (haisuiType === "omegaKonshin"){
        if (remainHP >= 0.25) {
            return Math.pow(100.0 * remainHP / (53.7 - haisuiSLv), 2.9) + 2.1;
        } else {
            return 0.0;
        }
    } else {
        console.error("Unknown Haisui Type Passed: " + haisuiType)
        return 0.0;
    }
};

module.exports.recalcCharaHaisui = function(chara, remainHP) {
    var charaHaisuiValue = 1.0;

    for(var ch = 0; ch < chara.length; ch++){
        if(chara[ch].name != "" && chara[ch].isConsideredInAverage) {
            for(var i = 0; i < 2; i++) {
                if(i == 0) {
                    if(chara[ch]["support"] == undefined) continue;
                    var support = supportAbilities[chara[ch]["support"]];
                } else {
                    if(chara[ch]["support2"] == undefined) continue;
                    var support = supportAbilities[chara[ch]["support2"]];
                }

                if(support.type == "none") continue;

                // 背水サポアビのみ処理
                switch(support.type){
                    case "taiyou_sinkou":
                        // ザルハメリナのHPを参照する
                        charaHaisuiValue += 0.01 * module.exports.calcHaisuiValue("charaHaisui", "L", 10, remainHP)
                        continue;
                    default:
                        break;
                }
            }
        }
    }

    return charaHaisuiValue;
};

module.exports.getTotalBuff = function(prof) {
    var totalBuff = {
        master: 0.0,
        masterHP: 0.0,
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

    if(!isNaN(prof.masterBonus)) totalBuff["master"] += 0.01 * parseInt(prof.masterBonus);
    if(!isNaN(prof.masterBonusHP)) totalBuff["masterHP"] += 0.01 * parseInt(prof.masterBonusHP);
    if(!isNaN(prof.hpBuff)) totalBuff["hp"] += 0.01 * parseInt(prof.hpBuff);
    if(!isNaN(prof.daBuff)) totalBuff["da"] += 0.01 * parseFloat(prof.daBuff);
    if(!isNaN(prof.taBuff)) totalBuff["ta"] += 0.01 * parseFloat(prof.taBuff);
    if(!isNaN(prof.otherBuff2)) totalBuff["other2"] += 0.01 * parseInt(prof.otherBuff2);
    if(!isNaN(prof.additionalDamageBuff)) totalBuff["additionalDamage"] += 0.01 * parseInt(prof.additionalDamageBuff);
    if(!isNaN(prof.ougiGageBuff)) totalBuff["ougiGage"] += 0.01 * parseInt(prof.ougiGageBuff);
    if(!isNaN(prof.chainNumber)) totalBuff["chainNumber"] = parseInt(prof.chainNumber);
    if(!isNaN(prof.damageLimitBuff)) totalBuff["damageLimit"] = 0.01 * parseFloat(prof.damageLimitBuff);
    if(!isNaN(prof.ougiDamageLimitBuff)) totalBuff["ougiDamageLimit"] = 0.01 * parseFloat(prof.ougiDamageLimitBuff);
    totalBuff["normal"] += 0.01 * parseInt(prof.normalBuff);
    totalBuff["element"] += 0.01 * parseInt(prof.elementBuff);
    totalBuff["other"] += 0.01 * parseInt(prof.otherBuff);
    totalBuff["zenith1"] += zenith[prof.zenithBonus1];
    totalBuff["zenith2"] += zenith[prof.zenithBonus2];

    return totalBuff
};

function maskInvalidSkillLevel(slv, stype, amount) {
    if (slv < 1) return 1;
    if (slv > 15) {
        if (stype === 'magna') return slv;

        if (stype === 'magnaHaisui') {
            if (amount === 'S') return slv;
        }

        if (stype === 'normal') {
            if (amount === 'S') return slv;
        }

        if (stype === 'magnaKamui') {
            if (amount === 'S') return slv;
        }

        // 該当しない場合はSLv15を上限とする
        return 15;
    }
    return slv;
}

module.exports.addSkilldataToTotals = function(totals, comb, arml, buff) {
    // cosmos武器があるかどうかを確認しておく
    var cosmosType = '';
    for(var i = 0; i < arml.length; i++){
        if(comb[i] > 0) {
            var arm = arml[i];
            if(module.exports.isCosmos(arm)) {
                if(skilltypes[arm.skill1].type == "cosmosArm") {
                    cosmosType = skilltypes[arm.skill1].cosmosArm
                } else {
                    cosmosType = skilltypes[arm.skill2].cosmosArm
                }
            }
        }
    }

    var index = 0;
    for(var key in totals ) {
        index = (index + 1)|0;
        var isBahaAtIncluded = false
        var isBahaAthpIncluded = false
        var isBahaHpIncluded = false

        // オメガウェポンは別スキルなら複数効果発動可能
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
        };

        for(var i = 0; i < arml.length; i++){
            if(comb[i] == 0) continue

            var arm = arml[i];
            var armSup= 1.0
            var hpSup = 1.0

            if (arm.armType == cosmosType){
                armSup += 0.3
                hpSup += 0.3
            }

            if(key == "Djeeta" ) {
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
                } else if(arm.armType == totals[key]["fav2"]){
                    armSup += 0.2
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
                    var stype = skilltypes[skillname].type;
                    var amount = skilltypes[skillname].amount;
                    var slv = parseInt(arm.slv)

                    // SLv20対応
                    slv = maskInvalidSkillLevel(slv, stype, amount);

                    // バハとコスモスとオメガ武器は属性関係なし
                    if(stype == 'bahaAT') {
                        if(!isBahaAtIncluded) {
                            // バハ短剣など
                            if(totals[key]["race"] === "unknown" || totals[key]["race"] === "seisho") {
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
                            if(totals[key]["race"] === "unknown" || totals[key]["race"] === "seisho") {
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
                    } else if(stype == 'bahaHP') {
                        if(!isBahaHpIncluded) {
                            // バハ拳など
                            if(totals[key]["race"] === "unknown" || totals[key]["race"] === "seisho") {
                                totals[key]["bahaHP"] += comb[i] * skillAmounts["bahaHP"][amount][slv - 1];
                                isBahaHpIncluded = true;
                            } else {
                                var bahatype = skillname.split("-")
                                if( bahamutRelation[bahatype[1]]["type1"] == totals[key]["race"] || bahamutRelation[ bahatype[1]]["type2"] == totals[key]["race"] ) {
                                    totals[key]["bahaHP"] += comb[i] * skillAmounts["bahaHP"][amount][slv - 1];
                                    isBahaHpIncluded = true;
                                }
                            }
                        }
                    } else if(stype == 'bahaFUATHP') {
                        if(totals[key]["race"] === "unknown" || totals[key]["race"] === "seisho") {
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
                        if(totals[key]["race"] === "unknown" || totals[key]["race"] === "seisho") {
                            totals[key]["bahaHP"] += comb[i] * skillAmounts["bahaFUHP"]["HP"][slv - 1];
                            totals[key]["bahaDA"] += comb[i] * skillAmounts["bahaFUHP"]["DA"][slv - 1];
                            totals[key]["bahaTA"] += comb[i] * skillAmounts["bahaFUHP"]["TA"][slv - 1];
                        } else {
                            var bahatype = skillname.split("-")
                            if( bahamutFURelation[bahatype[1]]["type1"] == totals[key]["race"] || bahamutFURelation[ bahatype[1] ]["type2"] == totals[key]["race"] ) {
                                totals[key]["bahaHP"] += comb[i] * skillAmounts["bahaFUHP"]["HP"][slv - 1];
                                totals[key]["bahaDA"] += comb[i] * skillAmounts["bahaFUHP"]["DA"][slv - 1];
                                totals[key]["bahaTA"] += comb[i] * skillAmounts["bahaFUHP"]["TA"][slv - 1];
                            }
                        }
                    } else if(stype == 'cosmos') {
                        // コスモス武器
                        if(skillname == 'cosmosAT' && totals[key]["type"] == "attack") {
                            totals[key]["cosmosAT"] += comb[i] * 20.0;
                            totals[key]["HPdebuff"] += comb[i] * 0.40
                        } else if(skillname == 'cosmosDF' && totals[key]["type"] == "defense") {
                            totals[key]["HPdebuff"] -= comb[i] * 0.10
                        } else if(skillname == 'cosmosBL' && totals[key]["type"] == "balance") {
                            totals[key]["cosmosBL"] = comb[i] * 20.0
                        } else if(skillname == 'cosmosPC' && totals[key]["type"] == "pecu") {
                            totals[key]["debuffResistance"] = comb[i] * 20.0
                        }
                    } else if(stype == 'cosmosArm') {
                        // コスモス武器スキルはスキップ
                    } else if(stype == 'omega') {
                        // オメガウェポン
                        var omegaType = skillname.split("-")[1]
                        if (arm.armType === totals[key]["fav1"] || arm.armType === totals[key]["fav2"]) {

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
                                    totals[key]["normalOtherCritical"].push({"value": 0.01 * skillAmounts["omega"][amount][slv - 1], "attackRatio": 0.5});
                                }

                                isOmegaIncluded[omegaType] = true;
                            }
                        }
                    } else if(stype === "gauphKey") {
                        // ガフスキーは得意武器、属性に関係なく発動する
                        var gauphKeyType = skillname.split("-")[1]

                        if (!isOmegaIncluded[gauphKeyType]) {
                            if (gauphKeyType === "alpha") {
                                totals[key]["normalDamageLimit"] += 0.1
                            } else if (gauphKeyType === "gamma") {
                                totals[key]["ougiDamageLimit"] += 0.15
                            }
                            isOmegaIncluded[gauphKeyType] = true;
                        }

                    } else if(totals[key]["element"] == element){
                        // 属性一致してれば計算
                        if ( isHaisuiType(stype) ) {
                            // 背水/渾身計算部分は別メソッドで
                            totals[key][stype] += comb[i] * module.exports.calcHaisuiValue(stype, amount, slv, totals[key]["remainHP"])
                        } else if(stype == 'normalKamui') {
                            if (amount == 'S') {
                                // 神威小は攻撃力とHPの上昇量が等しい
                                totals[key]["normal"] += comb[i] * skillAmounts["normal"][amount][slv - 1];
                                totals[key]["normalHP"] += comb[i] * skillAmounts["normal"][amount][slv - 1];
                            } else {
                                // 神威中は攻刃(中) & 守護(中)
                                totals[key]["normal"] += comb[i] * skillAmounts["normal"][amount][slv - 1];
                                totals[key]["normalHP"] += comb[i] * skillAmounts["normalHP"][amount][slv - 1];
                            }
                        } else if(stype == 'magnaKamui') {
                            // 神威は攻撃力とHPの上昇量が等しい
                            totals[key]["magna"] += comb[i] * skillAmounts["magna"][amount][slv - 1];
                            totals[key]["magnaHP"] += comb[i] * skillAmounts["magna"][amount][slv - 1];
                        } else if(stype == 'normalCritical') {
                            // 通常技巧は複数発動するので確率を加算しないで残しておく
                            for(var setu = 0; setu < comb[i]; setu++){
                                totals[key]["normalCritical"].push({"value": skillAmounts["normalCritical"][amount][slv - 1], "attackRatio": 0.5});
                            }
                        } else if(stype == 'normalJinkai') {
                            totals[key]["normalHP"] += comb[i] * skillAmounts["normalHP"][amount][slv - 1];
                            for(var setu = 0; setu < comb[i]; setu++){
                                totals[key]["normalCritical"].push({"value": skillAmounts["normalCritical"][amount][slv - 1], "attackRatio": 0.5});
                            }
                        } else if(stype == 'normalSetsuna') {
                            for(var setu = 0; setu < comb[i]; setu++){
                                totals[key]["normalCritical"].push({"value": skillAmounts["normalCritical"][amount][slv - 1], "attackRatio": 0.5});
                            }
                            totals[key]["normal"] += comb[i] * skillAmounts["normal"][amount][slv - 1];
                        } else if(stype == 'magnaSetsuna') {
                            totals[key]["magnaCritical"] += comb[i] * skillAmounts["magnaCritical"][amount][slv - 1];
                            totals[key]["magna"] += comb[i] * skillAmounts["magna"][amount][slv - 1];
                        } else if(stype == 'normalKatsumi') {
                            for(var setu = 0; setu < comb[i]; setu++){
                                totals[key]["normalCritical"].push({"value": skillAmounts["normalCritical"][amount][slv - 1], "attackRatio": 0.5});
                            }
                            totals[key]["normalNite"] += comb[i] * skillAmounts["normalNite"][amount][slv - 1];
                        } else if(stype == 'magnaKatsumi') {
                            totals[key]["magnaCritical"] += comb[i] * skillAmounts["magnaCritical"][amount][slv - 1];
                            totals[key]["magnaNite"] += comb[i] * skillAmounts["magnaNite"][amount][slv - 1];
                        } else if(stype == 'normalKatsumoku') {
                            totals[key]["normalNite"] += comb[i] * skillAmounts["normalNite"][amount][slv - 1];
                        } else if(stype == 'magnaKatsumoku') {
                            totals[key]["magnaNite"] += comb[i] * skillAmounts["magnaNite"][amount][slv - 1];
                        } else if(stype == 'normalRasetsu') {
                            totals[key]["normal"] += comb[i] * skillAmounts["normal"][amount][slv - 1];
                            totals[key]["DAbuff"] -= comb[i] * 10.0;
                        } else if(stype == 'magnaRasetsu') {
                            totals[key]["magna"] += comb[i] * skillAmounts["magna"][amount][slv - 1];
                            totals[key]["DAbuff"] -= comb[i] * 10.0;
                        } else if(stype == 'normalMusou') {
                            totals[key]["normal"] += comb[i] * skillAmounts["normal"][amount][slv - 1];
                            totals[key]["normalNite"] += comb[i] * skillAmounts["normalNite"][amount][slv - 1];
                        } else if(stype == 'magnaMusou') {
                            totals[key]["magna"] += comb[i] * skillAmounts["magna"][amount][slv - 1];
                            totals[key]["magnaNite"] += comb[i] * skillAmounts["magnaNite"][amount][slv - 1];
                        } else if (stype == 'normalRanbu') {
                            totals[key]["normal"] += comb[i] * skillAmounts["normal"][amount][slv - 1];
                            totals[key]["normalLesserSante"] += comb[i] * skillAmounts["normalRanbu"][amount][slv - 1];
                        } else if(stype == 'normalBoukun') {
                            if(amount == "L") {
                                totals[key]["HPdebuff"] += comb[i] * 0.10
                                totals[key]["normal"] += comb[i] * skillAmounts["normal"][amount][slv - 1];
                            } else if(amount == "LLL") {
                                totals[key]["HPdebuff"] += comb[i] * 0.10
                                totals[key]["normal"] += comb[i] * skillAmounts["normal"][amount][slv - 1];
                            }
                        } else if(stype == 'magnaBoukun') {
                            totals[key]["HPdebuff"] += comb[i] * 0.10
                            totals[key]["magna"] += comb[i] * skillAmounts["magna"][amount][slv - 1];
                        } else if (stype == 'magnaHakai') {
                            totals[key]["magnaLesserSante"] += comb[i] * skillAmounts["magnaHakai"][amount][slv - 1];
                        } else if (stype == 'magnaRanbu') {
                            totals[key]["magna"] += comb[i] * skillAmounts["magna"][amount][slv - 1];
                            totals[key]["magnaLesserSante"] += comb[i] * skillAmounts["magnaRanbu"][amount][slv - 1];
                        } else if(stype == 'magnaGunshin') {
                            totals[key]["magnaHP"] += comb[i] * skillAmounts["magnaHP"][amount][slv - 1];
                            totals[key]["magnaNite"] += comb[i] * skillAmounts["magnaNite"][amount][slv - 1];
                        } else if(stype == 'normalHiou') {
                            totals[key]["normalOugiDamage"] += comb[i] * skillAmounts["normalHiou"][amount][slv - 1];
                        } else if(stype == 'magnaHissatsu') {
                            totals[key]["magnaOugiDamage"] += comb[i] * skillAmounts["magnaHissatsu"][amount][slv - 1];
                            totals[key]["magnaOugiDamageLimit"] += 0.01 * comb[i] * skillAmounts["magnaHissatsu"][amount][slv - 1];
                        } else if(stype == 'exBoukun'){
                            totals[key]["HPdebuff"] += comb[i] * 0.07
                            totals[key]["ex"] += comb[i] * skillAmounts["ex"][amount][slv - 1];
                        } else if(stype == 'exATKandHP'){
                            totals[key]["ex"] += comb[i] * skillAmounts["exATKandHP"][amount]["ATK"][slv - 1];
                            totals[key]["exHP"] += comb[i] * skillAmounts["exATKandHP"][amount]["HP"][slv - 1];
                        } else if(stype == 'gurenJuin'){
                            if(index == 2){
                                totals[key]["normal"] += comb[i] * skillAmounts["normal"][amount][slv - 1];
                            }
                        } else if(stype == 'muhyoTuiga'){
                            if(index == 4){
                                totals[key]["additionalDamage"] += comb[i] * slv;
                                totals[key]["ougiDebuff"] += comb[i] * 0.30;
                            }
                        //! 四大天司の祝福
                        } else if(stype == 'tenshiShukufuku'){
                            if(amount == 'M') {
                                totals[key]["tenshiDamageUP"] += comb[i] * 0.10;
                            } else if (amount == 'L') {
                                totals[key]["tenshiDamageUP"] += comb[i] * 0.20;
                            }
                        //! ダメージ上限アップ系は奥義と通常どちらにも効く
                        } else if (stype == 'normalDamageLimit') {
                            totals[key]["normalDamageLimit"] += comb[i] * skillAmounts["normalDamageLimit"][amount];
                            totals[key]["ougiDamageLimit"] += comb[i] * skillAmounts["normalDamageLimit"][amount];
                        } else if (stype == 'ougiDamageLimit') {
                            totals[key]["ougiDamageLimit"] += comb[i] * skillAmounts["ougiDamageLimit"][amount];
                        } else if (stype == 'ougiDamageLimitExceed') {
                            totals[key]["ougiDamageLimit"] += 0.01 * comb[i] * skillAmounts["ougiDamageLimitExceed"][amount][slv - 1];
                        //! 4凸武器スキル
                        } else if(stype == 'tsuranukiKiba'){
                            if(skillname == 'tsuranukiKibaMain'){
                                totals[key]["normalHP"] += comb[i] * skillAmounts["normalHP"][amount][slv - 1];
                                if(key == 'Djeeta') {
                                    for(var setu = 0; setu < comb[i]; setu++){
                                        totals[key]["normalCritical"].push({"value": skillAmounts["normalCritical"][amount][slv - 1], "attackRatio": 0.5});
                                    }
                                }
                            } else {
                                totals[key]["normalHP"] += comb[i] * skillAmounts["normalHP"][amount][slv - 1];

                            }
                        } else if(stype == 'washiouKekkai'){
                            if(key == 'Djeeta') totals[key]["DAbuff"] += comb[i] * skillAmounts["washiouKekkai"][amount][slv - 1];
                        } else if(stype == 'maihimeEnbu'){
                            // 舞姫の演武: 通常攻刃大 + 上限アップ7%
                            totals[key]["normal"] += comb[i] * skillAmounts["normal"]["L"][slv - 1];
                            totals[key]["normalDamageLimit"] += comb[i] * skillAmounts["normalDamageLimit"]["M"];
                            totals[key]["ougiDamageLimit"] += comb[i] * skillAmounts["normalDamageLimit"]["M"];
                        // メインのみDATA追加拡張
                        } else if (stype == 'extendedDjeetaNormalDATA') {
                            if (key == 'Djeeta') {
                                totals[key]["normalOtherSante"] += amount;
                            }
                        // 通常楚歌 効果は1本まで有効 かつ 効果量が大きい方を優先
                        } else if (stype == 'normalSoka') {
                            totals[key]["normalSoka"] = (skillAmounts[stype][amount][slv - 1] > totals[key]["normalSoka"] )? skillAmounts[stype][amount][slv - 1]:totals[key]["normalSoka"];
                        // マグナ楚歌 効果は1本まで有効 かつ 効果量が大きい方を優先
                        } else if (stype == 'magnaSoka') {
                            totals[key]["magnaSoka"] = (skillAmounts[stype][amount][slv - 1] > totals[key]["magnaSoka"] )? skillAmounts[stype][amount][slv - 1]:totals[key]["magnaSoka"];
                        // 先制 効果は1本まで有効 かつ 効果量が大きい方を優先
                        } else if (stype == 'sensei') {
                            totals[key]["sensei"] = (skillAmounts[stype][amount][slv - 1] > totals[key]["sensei"] )? skillAmounts[stype][amount][slv - 1]:totals[key]["sensei"];
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
};

module.exports.calcBaseATK = function(rank) {
    if ( rank > 190 ) return 6650 + (rank - 190) * 5
    if ( rank > 175 ) return 6500 + (rank - 175) * 10
    if ( rank > 100 ) return 5000 + (rank - 100) * 20
    if ( rank > 1 ) return 1000 + rank * 40

    // -> rank == 1
    return 1000;
}

module.exports.calcBaseHP = function(rank) {
    if ( rank > 190 ) return 1730 + (rank - 190) * 1
    if ( rank > 175 ) return 1700 + (rank - 175) * 2
    if ( rank > 100 ) return 1400 + (rank - 100) * 4
    if ( rank > 1 ) return 600 + rank * 8

    // -> rank == 1
    return 600;
}

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
    // LBCritical対応
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
    })

    return criticalArray;
}

module.exports.getInitialTotals = function(prof, chara, summon) {
    var baseAttack = module.exports.calcBaseATK(parseInt(prof.rank))
    var baseHP = module.exports.calcBaseHP(parseInt(prof.rank))
    var element = (prof.element == undefined) ? "fire" : prof.element
    var djeetaRemainHP = (prof.remainHP != undefined && parseInt(prof.remainHP) < parseInt(prof.hp)) ? 0.01 * parseInt(prof.remainHP) : 0.01 * parseInt(prof.hp)
    var djeetaDA = (prof.DA == undefined) ? 6.5 : parseFloat(prof.DA)
    var djeetaTA = (prof.TA == undefined) ? 3.0 : parseFloat(prof.TA)
    var job = (prof.job == undefined) ? Jobs["none"] : Jobs[prof.job]
    var zenithATK = (prof.zenithAttackBonus == undefined) ? 3000 : parseInt(prof.zenithAttackBonus)
    var zenithHP = (prof.zenithHPBonus == undefined) ? 1000 : parseInt(prof.zenithHPBonus)
    var zenithPartyHP = (prof.zenithPartyHPBonus == undefined) ? 0 : parseInt(prof.zenithPartyHPBonus)

    var djeetaBuffList = {
        personalNormalBuff: 0.0,
        personalElementBuff: 0.0,
        personalOtherBuff: 0.0,
        personalOtherBuff2: 0.0,
        personalDABuff: 0.0,
        personalTABuff: 0.0,
        personalOugiGageBuff: 0.0,
        personalAdditionalDamageBuff: 0.0,
        personalDamageLimitBuff: 0.0,
        personalOugiDamageLimitBuff: 0.0
    };

    for(var djeetabuffkey in djeetaBuffList) {
        if (prof[djeetabuffkey] != undefined) {
            djeetaBuffList[djeetabuffkey] = 0.01 * parseFloat(prof[djeetabuffkey])
        }
    }

    var totals = {"Djeeta":
        {
            baseAttack: (baseAttack + zenithATK),
            baseHP: (baseHP + zenithPartyHP + zenithHP),
            baseDA: djeetaDA,
            baseTA: djeetaTA,
            remainHP: djeetaRemainHP,
            armAttack: 0,
            armHP:0,
            fav1: job.favArm1,
            fav2: job.favArm2,
            race: "unknown",
            type: job.type,
            element: element,
            LB: getCharaLB({}),
            HPdebuff: 0.00,
            magna: 0,
            magnaSoka:0,
            magnaHaisui: 0,
            magnaKonshin: 0,
            normal: 0,
            normalSoka:0,
            normalOther: 0,
            normalHaisui: 0,
            normalOtherHaisui: 0,
            normalKonshin: 0,
            normalOtherKonshin: 0,
            unknown: 0,
            ex: 0,
            exHaisui: 0,
            sensei: 0,
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
            normalCritical: [],
            normalOtherCritical: [],
            magnaCritical: 0,
            cosmosAT: 0,
            cosmosBL: 0,
            omegaNormal: 0,
            omegaNormalHP: 0,
            normalOugiDamage: 0,
            magnaOugiDamage: 0,
            normalDamageLimit: 0,
            ougiDamageLimit: 0,
            magnaOugiDamageLimit: 0,
            additionalDamage: 0,
            ougiDebuff: 0,
            isConsideredInAverage: true,
            job: job,
            normalBuff: djeetaBuffList["personalNormalBuff"],
            elementBuff: djeetaBuffList["personalElementBuff"],
            otherBuff: djeetaBuffList["personalOtherBuff"],
            otherBuff2: djeetaBuffList["personalOtherBuff2"],
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
            charaHaisui: 0,
            debuffResistance: 0,
            charaDamageUP: 0,
            tenshiDamageUP: 0
        }
    };

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

            var charaBuffList = {
                normalBuff: 0.0,
                elementBuff: 0.0,
                otherBuff: 0.0,
                otherBuff2: 0.0,
                daBuff: 0.0,
                taBuff: 0.0,
                ougiGageBuff: 0.0,
                additionalDamageBuff: 0.0,
                damageLimitBuff: 0.0,
                ougiDamageLimitBuff: 0.0,
            }

            for(var charabuffkey in charaBuffList) {
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
                armHP:0,
                fav1: chara[i].favArm,
                fav2: chara[i].favArm2,
                race: chara[i].race,
                type: chara[i].type,
                element: charaelement,
                LB: charaLB,
                HPdebuff: 0.00,
                magna: 0,
                magnaSoka: 0,
                magnaHaisui: 0,
                magnaKonshin: 0,
                normal: 0,
                normalSoka:0,
                normalOther: 0,
                normalHaisui: 0,
                normalOtherHaisui: 0,
                normalKonshin: 0,
                normalOtherKonshin: 0,
                unknown: 0,
                ex: 0,
                exHaisui: 0,
                sensei: 0,
                bahaAT: 0,
                bahaHP: 0,
                bahaDA: 0,
                bahaTA: 0,
                magnaHP: 0,
                normalHP: 0,
                unknownHP: 0,
                exHP: 0,
                bahaHP: 0,
                normalNite: 0,
                magnaNite: 0,
                normalSante: 0,
                normalLesserSante: 0,
                magnaSante: 0,
                magnaLesserSante: 0,
                exNite: 0,
                normalOtherNite: 0,
                normalOtherSante: 0,
                normalCritical: [],
                normalOtherCritical: [],
                magnaCritical: 0,
                cosmosAT: 0,
                cosmosBL: 0,
                omegaNormal: 0,
                omegaNormalHP: 0,
                normalOugiDamage: 0,
                magnaOugiDamage: 0,
                normalDamageLimit: 0,
                ougiDamageLimit: 0,
                magnaOugiDamageLimit: 0,
                additionalDamage: 0,
                ougiDebuff: 0,
                isConsideredInAverage: charaConsidered,
                normalBuff: charaBuffList["normalBuff"],
                elementBuff: charaBuffList["elementBuff"],
                otherBuff: charaBuffList["otherBuff"],
                otherBuff2: charaBuffList["otherBuff2"],
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
                charaHaisui: 0,
                debuffResistance: 0,
                charaDamageUP: 0,
                tenshiDamageUP: 0
            };
        }
    }

    var races = module.exports.checkNumberofRaces(chara)
    for(var key in totals) {
        totals[key]["totalSummon"] = []
        for(var s = 0; s < summon.length; s++) {
            var selfElement = (summon[s].selfElement == undefined) ? "fire" : summon[s].selfElement
            var friendElement = (summon[s].friendElement == undefined) ? "fire" : summon[s].friendElement

            var totalSummon = {magna: 1.0, element: 1.0, elementTurn: 1.0, zeus: 1.0, chara: 0.0, ranko: 1.0, attack: 0, hp: 0.0, hpBonus: 0.0, da: 0, ta: 0};

            if((summonElementTypes[selfElement]["type"].indexOf(totals[key]["element"]) >= 0) || selfElement == "all" ){
                if(summon[s].selfSummonType == "odin") {
                    // odin(属性+キャラ攻撃)など、複数の場合の処理
                    totalSummon["element"] += 0.01 * parseInt(summon[s].selfSummonAmount)
                    totalSummon["chara"] += 0.01 * parseInt(summon[s].selfSummonAmount2)
                } else if(summon[s].selfSummonType == "elementByRace") {
                    totalSummon["element"] += 0.01 * module.exports.getTesukatoripokaAmount(parseInt(summon[s].selfSummonAmount), races)
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
                } else if(summon[s].friendSummonType == "elementByRace") {
                    totalSummon["element"] += 0.01 * module.exports.getTesukatoripokaAmount(parseInt(summon[s].friendSummonAmount), races)
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

    for(var key in totals){
        totals[key]["typeBonus"] = module.exports.getTypeBonus(totals[key]["element"], prof.enemyElement)
    }

    return totals
};

module.exports.initializeTotals = function(totals) {
    // 武器編成によって変わる値を初期化する
    for(var key in totals){
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
        totals[key]["normalOtherNite"] = 0;
        totals[key]["normalOtherSante"] = 0;
        totals[key]["normalOugiDamage"] = 0;
        totals[key]["magnaOugiDamage"] = 0;
        totals[key]["normalDamageLimit"] = 0;
        totals[key]["ougiDamageLimit"] = 0;
        totals[key]["magnaOugiDamageLimit"] = 0;
        totals[key]["additionalDamage"] = 0;
        totals[key]["ougiDebuff"] = 0;
        totals[key]["DAbuff"] = 0;
        totals[key]["TAbuff"] = 0;
        totals[key]["debuffResistance"] = 0;
        totals[key]["tenshiDamageUP"] = 0;
    }
};

module.exports.calcOneCombination = function(comb, summon, prof, arml, totals, buff){
    module.exports.addSkilldataToTotals(totals, comb, arml, buff)
    var result = []
    for(var i = 0; i < summon.length; i++){
        // 攻撃などの結果を入れた連想配列の配列を作る
        result.push(module.exports.calcBasedOneSummon(i, prof, buff, totals));
    }

    return result
};

// totalsの内容をcharaのサポアビを反映したものに上書きする
module.exports.treatSupportAbility = function(totals, chara) {
    for(var key in totals){
        for(var i = 0; i < 2; i++) {
            if(i == 0) {
                if(totals[key]["support"] == undefined) continue;
                var support = supportAbilities[totals[key]["support"]];
            } else {
                if(totals[key]["support2"] == undefined) continue;
                var support = supportAbilities[totals[key]["support2"]];
            }

            if (support.type == "none") continue;

            // 特殊なサポアビの処理
            switch(support.type){
                case "normalBuff_doraf":
                    if(totals[key].isConsideredInAverage) {
                        // ドラフと種族不明のみキャラ攻刃
                        for(var key2 in totals){
                            if(totals[key2]["race"] === "doraf" || totals[key2]["race"] === "unknown" || totals[key2]["race"] === "seisho") {
                                totals[key2]["normalBuff"] += support.value
                            }
                        }
                    } else {
                        // 平均に入れない場合は自分だけ計算
                        totals[key]["normalBuff"] += support.value
                    }
                    continue;
                case "normalBuff_depends_races":
                    var races = module.exports.checkNumberofRaces(chara);
                    // 4種族なら50%, それ以外なら種族数*10%
                    totals[key]["normalBuff"] += (races == 4 ? 0.50 : races * 0.10);
                    continue;
                case "normalBuff_depends_member":
                    continue;
                case "taiyou_sinkou":
                    // ザルハメリナのHPを参照する
                    var charaHaisuiValue = module.exports.calcHaisuiValue("charaHaisui", "L", 10, totals[key]["remainHP"])
                    if(totals[key].isConsideredInAverage) {
                        for(var key2 in totals){
                            totals[key2]["charaHaisui"] += charaHaisuiValue
                        }
                    } else {
                        totals[key]["charaHaisui"] += charaHaisuiValue
                    }
                    continue;
                default:
                    break;
            }

            // 技巧系処理
            if(support.type == "criticalBuff") {
                if(support.range == "own") {
                    totals[key]["normalOtherCriticalBuff"].push({"value": support.value, "attackRatio": support.attackRatio})
                } else {
                    if(totals[key].isConsideredInAverage) {
                        for(var key2 in totals){
                            totals[key2]["normalOtherCriticalBuff"].push({"value": support.value, "attackRatio": support.attackRatio})
                        }
                    } else {
                        totals[key]["normalOtherCriticalBuff"].push({"value": support.value, "attackRatio": support.attackRatio})
                    }
                }
                continue;
            }

            // 単純なバフ系の場合の処理
            if(support.range == "own") {
                totals[key][support.type] += support.value
            } else {
                // range == "all"
                // 平均に含める場合は全体に影響する
                if(totals[key].isConsideredInAverage) {
                    for(var key2 in totals){
                        totals[key2][support.type] += support.value
                    }
                } else {
                    totals[key][support.type] += support.value
                }
            }
        }
    }
};

module.exports.generateHaisuiData = function(res, arml, summon, prof, chara, storedCombinations, storedNames, displayRealHP, locale) {
    var data = {}

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
    }
    var cnt = 1
    var considerAverageArray = {}
    for(var ch = 0; ch < chara.length; ch++) {
        var charaConsidered = (chara[ch].isConsideredInAverage == undefined) ? true : chara[ch].isConsideredInAverage
        if(charaConsidered && chara[ch].name != "") {
            cnt++;
            considerAverageArray[chara[ch].name] = true
        } else {
            considerAverageArray[chara[ch].name] = false
        }
    }

    if(res.length > 1) {
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

    // キャラ編成は武器編成毎には変わらないので先に計算することができる
    var charaHaisuiBuff = []
    for(var k = 0; k < 100; ++k){
        var charaHaisuiValue = module.exports.recalcCharaHaisui(chara, 0.01 * (k + 1));
        charaHaisuiBuff.push(charaHaisuiValue);
    }

    var allAlreadyUsedHP = {};

    for(var s = 0; s < res.length; s++) {
        var oneresult = res[s]
        var summonHeader = module.exports.makeSummonHeaderString(summon[s], locale);
        var TotalAttack = [["残りHP(%)"]];
        var TotalHP = [["残りHP(%)"]]
        var CriticalAttack = [["残りHP(%)"]];
        var TotalExpected = [["残りHP(%)"]];
        var CycleDamagePerTurn = [["残りHP(%)"]];
        var AverageTotalExpected = [["残りHP(%)"]];
        var AverageTotalAttack = [["残りHP(%)"]];
        var AverageCriticalAttack = [["残りHP(%)"]];
        var AverageCycleDamagePerTurn = [["残りHP(%)"]];

        var alreadyUsedHP = {};

        for(var j = 0; j < oneresult.length; j++){
            var onedata = oneresult[j].data
            var title = storedNames[j]

            TotalAttack[0].push(title)
            TotalHP[0].push(title)
            CriticalAttack[0].push(title)
            TotalExpected[0].push(title)
            CycleDamagePerTurn[0].push(title)
            AverageTotalExpected[0].push(title)
            AverageTotalAttack[0].push(title)
            AverageCycleDamagePerTurn[0].push(title)
            AverageCriticalAttack[0].push(title)

            // 召喚石2組以上の場合
            if(res.length > 1) {
                AllTotalAttack[0].push("[" + summonHeader + "] " + title)
                AllTotalHP[0].push("[" + summonHeader + "] " + title)
                AllCriticalAttack[0].push("[" + summonHeader + "] " + title)
                AllTotalExpected[0].push("[" + summonHeader + "] " + title)
                AllCycleDamagePerTurn[0].push("[" + summonHeader + "] " + title)
                AllAverageTotalExpected[0].push("[" + summonHeader + "] " + title)
                AllAverageTotalAttack[0].push("[" + summonHeader + "] " + title)
                AllAverageCriticalAttack[0].push("[" + summonHeader + "] " + title)
                AllAverageCycleDamagePerTurn[0].push("[" + summonHeader + "] " + title)
            }

            for(var key in onedata){
                var totalSummon = onedata[key].totalSummon
                var normalHaisuiOrig = onedata[key].skilldata.normalHaisui
                var magnaHaisuiOrig = onedata[key].skilldata.magnaHaisui
                var magnaKonshinOrig = onedata[key].skilldata.magnaKonshin
                var charaHaisuiOrig = onedata[key].skilldata.charaHaisui
                var normalKonshinOrig = onedata[key].skilldata.normalKonshin
                var exHaisuiOrig = onedata[key].skilldata.exHaisui
                var totalSkillWithoutHaisui = onedata[key].totalSkillCoeff / (normalHaisuiOrig * magnaHaisuiOrig * normalKonshinOrig * charaHaisuiOrig * exHaisuiOrig * magnaKonshinOrig)

                var haisuiBuff = []
                // キャラ背水はキャラ個別で計算するべき
                for(var k = 0; k < 100; k++){
                    haisuiBuff.push({normalHaisui: 1.0, magnaHaisui: 1.0, normalKonshin: 1.0, magnaKonshin: 1.0, exHaisui: 1.0, charaHaisui: charaHaisuiBuff[k]})
                }

                // オメガ武器スキルが重複して計算されるのを防ぐ
                var omegaHaisuiIncluded = false;
                var omegaKonshinIncluded = false;

                // 武器データ計算
                for (var i = 0; i < arml.length; i++) {
                    var arm = arml[i];

                    if (storedCombinations[j][i] === 0) continue;

                    for (var jj = 1; jj <= 2; jj++) {
                        var skillname = '';
                        var element = ''; (arm.element == undefined) ? "fire" : arm.element
                        if(jj == 1) {
                            skillname = arm.skill1
                            element = (arm.element == undefined) ? "fire" : arm.element
                        } else {
                            skillname = arm.skill2
                            element = (arm.element2 == undefined) ? "fire" : arm.element2
                        }

                        if (skillname != 'non') {
                            var stype = skilltypes[skillname].type;
                            var amount = skilltypes[skillname].amount;
                            var slv = parseInt(arm.slv)

                            slv = maskInvalidSkillLevel(slv, stype, amount);

                            if (skillname === "omega-gekijou") {
                                if (!omegaHaisuiIncluded && (arm.armType === onedata[key].fav1 || arm.armType === onedata[key].fav2)) {
                                    for(var l = 0; l < haisuiBuff.length; l++) {
                                        var remainHP = 0.01 * (l + 1);
                                        haisuiBuff[l]["normalHaisui"] += 0.01 * module.exports.calcHaisuiValue("normalHaisui", amount, slv, remainHP)
                                    }
                                    omegaHaisuiIncluded = true;
                                }
                            } else if (skillname === "omega-kyousou") {
                                if (!omegaKonshinIncluded && (arm.armType === onedata[key].fav1 || arm.armType === onedata[key].fav2)) {
                                    for(var l = 0; l < haisuiBuff.length; l++) {
                                        var remainHP = 0.01 * (l + 1);
                                        haisuiBuff[l]["normalKonshin"] += 0.01 * module.exports.calcHaisuiValue("omegaKonshin", amount, slv, remainHP)
                                    }
                                    omegaKonshinIncluded = true;
                                }
                            } else if (onedata[key].element == element) {
                                if ( isHaisuiType(stype) ) {
                                    if (stype === "normalHaisui" || stype === "normalKonshin") {
                                        for(var l = 0; l < haisuiBuff.length; l++) {
                                            var remainHP = 0.01 * (l + 1)
                                            haisuiBuff[l][stype] += storedCombinations[j][i] * 0.01 * module.exports.calcHaisuiValue(stype, amount, slv, remainHP) * totalSummon.zeus
                                        }
                                    } else if (stype === "normalOtherKonshin") {
                                        for(var l = 0; l < haisuiBuff.length; l++) {
                                            var remainHP = 0.01 * (l + 1)
                                            haisuiBuff[l]["normalKonshin"] += storedCombinations[j][i] * 0.01 * module.exports.calcHaisuiValue(stype, amount, slv, remainHP)
                                        }
                                    } else if (stype === "magnaHaisui" || stype === "magnaKonshin") {
                                        for(var l = 0; l < haisuiBuff.length; l++) {
                                            var remainHP = 0.01 * (l + 1)
                                            haisuiBuff[l][stype] += storedCombinations[j][i] * 0.01 * module.exports.calcHaisuiValue(stype, amount, slv, remainHP) * totalSummon.magna
                                        }
                                    } else {
                                        for(var l = 0; l < haisuiBuff.length; l++) {
                                            var remainHP = 0.01 * (l + 1)
                                            haisuiBuff[l][stype] += storedCombinations[j][i] * 0.01 * module.exports.calcHaisuiValue(stype, amount, slv, remainHP)
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                for(var k = 0; k < 100; k++){
                    var newTotalSkillCoeff = totalSkillWithoutHaisui * haisuiBuff[k].normalHaisui * haisuiBuff[k].magnaHaisui * haisuiBuff[k].normalKonshin * haisuiBuff[k].magnaKonshin * haisuiBuff[k].charaHaisui * haisuiBuff[k].exHaisui
                    var summedAttack = onedata[key].displayAttack
                    var newTotalAttack = summedAttack * newTotalSkillCoeff
                    var newTotalExpected = newTotalAttack * onedata[key].criticalRatio * onedata[key].expectedAttack

                    var newDamage = module.exports.calcDamage(summedAttack, newTotalSkillCoeff, onedata[key].criticalRatio, prof.enemyDefense, onedata[key].skilldata.additionalDamage, onedata[key].skilldata.damageUP, onedata[key].skilldata.damageLimit)
                    var newOugiDamage = module.exports.calcOugiDamage(summedAttack, newTotalSkillCoeff, onedata[key].criticalRatio, prof.enemyDefense, onedata[key].ougiRatio, onedata[key].skilldata.ougiDamageUP, onedata[key].skilldata.damageUP, onedata[key].skilldata.ougiDamageLimit)

                    var chainNumber = isNaN(prof.chainNumber) ? 1 : parseInt(prof.chainNumber);
                    var newChainBurst = module.exports.calcChainBurst(chainNumber * newOugiDamage, chainNumber, module.exports.getTypeBonus(onedata[key].element, prof.enemyElement)) / chainNumber;
                    var newExpectedCycleDamagePerTurn = (newChainBurst + newOugiDamage
                    + onedata[key].expectedTurn * onedata[key].expectedAttack * newDamage) / (onedata[key].expectedTurn + 1)

                    var hp;
                    if (displayRealHP) {
                        // 実HP
                        hp = parseInt(0.01 * (k + 1) * onedata["Djeeta"].totalHP);
                    } else {
                        // 残HP割合
                        hp = k + 1
                    }

                    if(key == "Djeeta") {
                        var index;
                        if(hp in alreadyUsedHP) {
                            index = alreadyUsedHP[hp] - 1
                        } else {
                            alreadyUsedHP[hp] = TotalAttack.push([hp]);
                            TotalHP.push([hp])
                            TotalExpected.push([hp])
                            CriticalAttack.push([hp])
                            CycleDamagePerTurn.push([hp])
                            AverageTotalAttack.push([hp])
                            AverageTotalExpected.push([hp])
                            AverageCycleDamagePerTurn.push([hp])
                            AverageCriticalAttack.push([hp])
                            index = alreadyUsedHP[hp] - 1;

                            for(var subj = 0; subj < oneresult.length; subj++){
                                // 散布図とするため、先にresult分の欄を作っておく
                                TotalAttack[index].push(null)
                                CycleDamagePerTurn[index].push(null)
                                CriticalAttack[index].push(null)
                                TotalExpected[index].push(null)
                                TotalHP[index].push(null)
                                AverageTotalAttack[index].push(null)
                                AverageTotalExpected[index].push(null)
                                AverageCycleDamagePerTurn[index].push(null)
                                AverageCriticalAttack[index].push(null)
                            }

                            if(res.length > 1) {
                                var allindex;
                                if(hp in allAlreadyUsedHP) {
                                allindex = allAlreadyUsedHP[hp] - 1
                                } else {
                                allAlreadyUsedHP[hp] = AllTotalAttack.push([hp]);
                                AllTotalHP.push([hp])
                                AllTotalExpected.push([hp])
                                AllCriticalAttack.push([hp])
                                AllCycleDamagePerTurn.push([hp])
                                AllAverageTotalAttack.push([hp])
                                AllAverageTotalExpected.push([hp])
                                AllAverageCycleDamagePerTurn.push([hp])
                                AllAverageCriticalAttack.push([hp])
                                allindex = allAlreadyUsedHP[hp] - 1;

                                // まとめる場合はres.length*oneres.lengthの分だけ先に用意
                                for(var subj = 0; subj < res.length * oneresult.length; subj++){
                                    AllTotalAttack[allindex].push(null)
                                    AllCycleDamagePerTurn[allindex].push(null)
                                    AllCriticalAttack[allindex].push(null)
                                    AllTotalExpected[allindex].push(null)
                                    AllTotalHP[allindex].push(null)
                                    AllAverageTotalAttack[allindex].push(null)
                                    AllAverageTotalExpected[allindex].push(null)
                                    AllAverageCycleDamagePerTurn[allindex].push(null)
                                    AllAverageCriticalAttack[allindex].push(null)
                                }
                                }
                            }
                        }

                        TotalHP[index][j+1] = (displayRealHP ? hp : parseInt(hp * onedata[key].totalHP));
                        TotalAttack[index][j+1] = parseInt(newTotalAttack)
                        TotalExpected[index][j+1] = parseInt(newTotalExpected)
                        CriticalAttack[index][j+1] = parseInt(onedata[key].criticalRatio * newTotalAttack)
                        CycleDamagePerTurn[index][j+1] = parseInt(newExpectedCycleDamagePerTurn)
                        AverageTotalAttack[index][j+1] += parseInt(newTotalAttack / cnt)
                        AverageTotalExpected[index][j+1] += parseInt(newTotalExpected / cnt)
                        AverageCycleDamagePerTurn[index][j+1] += parseInt(newExpectedCycleDamagePerTurn / cnt)
                        AverageCriticalAttack[index][j+1] += parseInt(onedata[key].criticalRatio * newTotalAttack / cnt)
                    } else if (considerAverageArray[key]) {
                        var index = alreadyUsedHP[hp] - 1
                        AverageTotalAttack[index][j+1] += parseInt(newTotalAttack / cnt)
                        AverageTotalExpected[index][j+1] += parseInt(newTotalExpected / cnt)
                        AverageCycleDamagePerTurn[index][j+1] += parseInt(newExpectedCycleDamagePerTurn / cnt)
                        AverageCriticalAttack[index][j+1] += parseInt(onedata[key].criticalRatio * newTotalAttack / cnt)
                    }
                }
            }

            if(res.length > 1) {
                for(var k = 0; k < 100; k++) {
                    var hp;
                    if (displayRealHP) {
                        // 実HP
                        hp = parseInt(0.01 * (k + 1) * onedata["Djeeta"].totalHP);
                    } else {
                        // 残HP割合
                        hp = k + 1
                    }

                    index = alreadyUsedHP[hp] - 1
                    allindex = allAlreadyUsedHP[hp] - 1
                    var allj = s * oneresult.length + j + 1;

                    AllTotalAttack[allindex][allj] = TotalAttack[index][j + 1]
                    AllTotalHP[allindex][allj] = TotalHP[index][j + 1]
                    AllCriticalAttack[allindex][allj] = CriticalAttack[index][j + 1]
                    AllTotalExpected[allindex][allj] = TotalExpected[index][j + 1]
                    AllCycleDamagePerTurn[allindex][allj] = CycleDamagePerTurn[index][j + 1]
                    AllAverageTotalExpected[allindex][allj] = AverageTotalExpected[index][j + 1]
                    AllAverageTotalAttack[allindex][allj] = AverageTotalAttack[index][j + 1]
                    AllAverageCriticalAttack[allindex][allj] = AverageCriticalAttack[index][j + 1]
                    AllAverageCycleDamagePerTurn[allindex][allj] = AverageCycleDamagePerTurn[index][j + 1]
                }
            }
        }

        data[summonHeader] = {}
        data[summonHeader]["totalAttack"] = TotalAttack
        data[summonHeader]["expectedCycleDamagePerTurn"] = CycleDamagePerTurn
        data[summonHeader]["criticalAttack"] = CriticalAttack
        data[summonHeader]["totalExpected"] = TotalExpected
        data[summonHeader]["averageCriticalAttack"] = AverageCriticalAttack
        data[summonHeader]["averageAttack"] = AverageTotalAttack
        data[summonHeader]["averageCyclePerTurn"] = AverageCycleDamagePerTurn
        data[summonHeader]["averageTotalExpected"] = AverageTotalExpected
        data[summonHeader]["totalHP"] = TotalHP
    }

    if(res.length > 1){
        var matomete = intl.translate("まとめて比較", locale)
        data[matomete] = {}
        data[matomete]["totalAttack"] = AllTotalAttack
        data[matomete]["totalHP"] = AllTotalHP
        data[matomete]["criticalAttack"] = AllCriticalAttack
        data[matomete]["totalExpected"] = AllTotalExpected
        data[matomete]["expectedCycleDamagePerTurn"] = AllCycleDamagePerTurn
        data[matomete]["averageAttack"] = AllAverageTotalAttack
        data[matomete]["averageCriticalAttack"] = AllAverageCriticalAttack
        data[matomete]["averageCyclePerTurn"] = AllAverageCycleDamagePerTurn
        data[matomete]["averageTotalExpected"] = AllAverageTotalExpected
    }

    // グラフ最大値最小値を抽出
    for(var key in minMaxArr) {
        for(var summonkey in data) {
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
};

module.exports.generateSimulationData = function(res, turnBuff, arml, summon, prof, buff, chara, storedCombinations, storedNames, locale) {
    var data = {}
    var minMaxArr = {
        "averageAttack": {"max": 0, "min": 0},
        "averageTotalExpected": {"max": 0, "min": 0},
        "expectedDamage": {"max": 0, "min": 0},
        "averageExpectedDamage": {"max": 0, "min": 0},
        "summedAverageExpectedDamage": {"max": 0, "min": 0},
    }
    var cnt = 1
    var considerAverageArray = {}
    for(var ch = 0; ch < chara.length; ch++) {
        var charaConsidered = (chara[ch].isConsideredInAverage == undefined) ? true : chara[ch].isConsideredInAverage
        if(charaConsidered && chara[ch].name != "") {
            cnt++;
            considerAverageArray[chara[ch].name] = true
        } else {
            considerAverageArray[chara[ch].name] = false
        }
    }

    if(res.length > 1) {
        var AllAverageTotalAttack = [["ターン"]];
        var AllAverageTotalExpected = [["ターン"]];
        var AllExpectedDamage = [["ターン"]];
        var AllAverageExpectedDamage = [["ターン"]];
        var AllSummedAverageExpectedDamage = [["ターン"]];

        for(var m = 1; m <= turnBuff.maxTurn; m++){
            AllAverageTotalAttack.push([m])
            AllAverageTotalExpected.push([m])
            AllExpectedDamage.push([m])
            AllAverageExpectedDamage.push([m])
            AllSummedAverageExpectedDamage.push([m])
        }
    }

    for(var s = 0; s < res.length; s++) {
        var oneresult = res[s]
        var summonHeader = module.exports.makeSummonHeaderString(summon[s], locale);
        var AverageTotalAttack = [["ターン"]];
        var AverageTotalExpected = [["ターン"]];
        var ExpectedDamage = [["ターン"]];
        var AverageExpectedDamage = [["ターン"]];
        var SummedAverageExpectedDamage = [["ターン"]];

        for(var m = 1; m <= turnBuff.maxTurn; m++){
            AverageTotalAttack.push([m])
            AverageTotalExpected.push([m])
            ExpectedDamage.push([m])
            AverageExpectedDamage.push([m])
            SummedAverageExpectedDamage.push([m])

            for(var j = 0; j < oneresult[0].length; j++) {
                AverageExpectedDamage[m].push(0)
                SummedAverageExpectedDamage[m].push(0)
            }
        }

        for(var t = 1; t <= turnBuff.maxTurn; t++){
            var turndata = oneresult[t - 1]
            for(var j = 0; j < turndata.length; j++){
                var onedata = turndata[j].data

                AverageTotalAttack[t].push( onedata["Djeeta"].averageAttack )
                AverageTotalExpected[t].push( onedata["Djeeta"].averageTotalExpected )

                for(var key in onedata) {
                    if(turnBuff.buffs["全体バフ"][t-1].turnType == "ougi" || turnBuff.buffs[key][t-1].turnType == "ougi") {
                        // 基本的に奥義の設定が優先
                        var newOugiDamage = module.exports.calcOugiDamage(onedata[key].displayAttack, onedata[key].totalSkillCoeff, onedata[key].criticalRatio, prof.enemyDefense, prof.ougiRatio, onedata[key].skilldata.ougiDamageUP, onedata[key].skilldata.damageUP, onedata[key].skilldata.ougiDamageLimit)

                        if(key == "Djeeta") {
                            ExpectedDamage[t].push( parseInt(newOugiDamage) )
                            AverageExpectedDamage[t][j + 1] += parseInt(newOugiDamage/cnt)
                        } else if(considerAverageArray[key]) {
                            AverageExpectedDamage[t][j + 1] += parseInt(newOugiDamage/cnt)
                        }

                    } else if(turnBuff.buffs["全体バフ"][t-1].turnType == "ougiNoDamage" || turnBuff.buffs[key][t-1].turnType == "ougiNoDamage") {
                        // しコルワ
                        if(key == "Djeeta") {
                            ExpectedDamage[t].push(0)
                        }
                    } else {
                        // 通常攻撃
                        var newDamage = module.exports.calcDamage(onedata[key].displayAttack, onedata[key].totalSkillCoeff, onedata[key].criticalRatio, prof.enemyDefense, onedata[key].skilldata.additionalDamage, onedata[key].skilldata.damageUP, onedata[key].skilldata.damageLimit)
                        if(key == "Djeeta") {
                            ExpectedDamage[t].push( parseInt(newDamage * onedata[key].expectedAttack) )
                            AverageExpectedDamage[t][j + 1] += parseInt(onedata[key].expectedAttack * newDamage/cnt)
                        } else if(considerAverageArray[key]) {
                            AverageExpectedDamage[t][j + 1] += parseInt(onedata[key].expectedAttack * newDamage/cnt)
                        }
                    }
                }

                if(t == 1) {
                    var title = storedNames[j]

                    AverageTotalAttack[0].push(title)
                    AverageTotalExpected[0].push(title)
                    ExpectedDamage[0].push(title)
                    AverageExpectedDamage[0].push(title)
                    SummedAverageExpectedDamage[0].push(title)

                    // 召喚石2組以上の場合
                    if(res.length > 1) {
                        AllAverageTotalAttack[0].push("[" + summonHeader + "] " + title)
                        AllAverageTotalExpected[0].push("[" + summonHeader + "] " + title)
                        AllExpectedDamage[0].push("[" + summonHeader + "] " + title)
                        AllAverageExpectedDamage[0].push("[" + summonHeader + "] " + title)
                        AllSummedAverageExpectedDamage[0].push("[" + summonHeader + "] " + title)
                    }
                    SummedAverageExpectedDamage[t][j + 1] = AverageExpectedDamage[t][j + 1]
                } else {
                    SummedAverageExpectedDamage[t][j + 1] = SummedAverageExpectedDamage[t - 1][j + 1] + AverageExpectedDamage[t][j + 1]
                }

                if(res.length > 1) {
                    AllAverageTotalAttack[t].push(AverageTotalAttack[t][j + 1])
                    AllAverageTotalExpected[t].push(AverageTotalExpected[t][j + 1])
                    AllExpectedDamage[t].push(ExpectedDamage[t][j + 1])
                    AllAverageExpectedDamage[t].push(AverageExpectedDamage[t][j + 1])
                    AllSummedAverageExpectedDamage[t].push(SummedAverageExpectedDamage[t][j + 1])
                }
            }
        }

        data[summonHeader] = {}
        data[summonHeader]["averageAttack"] = AverageTotalAttack
        data[summonHeader]["averageTotalExpected"] = AverageTotalExpected
        data[summonHeader]["expectedDamage"] = ExpectedDamage
        data[summonHeader]["averageExpectedDamage"] = AverageExpectedDamage
        data[summonHeader]["summedAverageExpectedDamage"] = SummedAverageExpectedDamage
    }

    if(res.length > 1){
        var matomete = intl.translate("まとめて比較", locale);
        data[matomete] = {}
        data[matomete]["averageAttack"] = AllAverageTotalAttack
        data[matomete]["averageTotalExpected"] = AllAverageTotalExpected
        data[matomete]["expectedDamage"] = AllExpectedDamage
        data[matomete]["averageExpectedDamage"] = AllAverageExpectedDamage
        data[matomete]["summedAverageExpectedDamage"] = AllSummedAverageExpectedDamage
    }

    // グラフ最大値最小値を抽出
    for(var key in minMaxArr) {
        for(var summonkey in data) {
            for(var k = 1; k <= turnBuff.maxTurn; k++){
                for(var j = 1; j <= res[0][0].length; j++){
                    // グラフ最大値最小値を保存
                    if(data[summonkey][key][k][j] > minMaxArr[key]["max"]) minMaxArr[key]["max"] = data[summonkey][key][k][j]
                    if(data[summonkey][key][k][j] < minMaxArr[key]["min"] || minMaxArr[key]["min"] == 0) minMaxArr[key]["min"] = data[summonkey][key][k][j]
                }
            }
        }
    }

    data["minMaxArr"] = minMaxArr
    return data
};

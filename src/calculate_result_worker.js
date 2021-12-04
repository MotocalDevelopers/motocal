const {isCosmos, getTotalBuff, isHollowsky, isDarkOpus, calcCombinations, getInitialTotals, calcOneCombination, isValidResult} = require("./global_logic.js");
const {keyTypes} = require("./global_const.js");

const calculateResult = (prof, arml, summon, chara, sortkey = "averageCyclePerTurn", previousArmlist, previousCombinations) => {
    if (prof != undefined && arml != undefined && summon != undefined && chara != undefined) {
        // Since the parameter added later may be NaN, additional processing
        // If sortKey is not a NaN, use that, NaN if it's general attack power
        var sortkeyname =
            keyTypes[sortkey] || "予想ターン毎ダメージのパーティ平均値";

        // If combinations have not been changed, use old guys
        if (previousArmlist != null) {
            var isCombinationChanged = false;
            if (previousArmlist.length != arml.length || prof.filterOptionsChanged) {
                isCombinationChanged = true;
                prof.filterOptionsChanged = false;
            }
            if (!isCombinationChanged) {
                for (var i = 0; i < arml.length; i = (i + 1) | 0) {
                    if (
                        arml[i].considerNumberMax != previousArmlist[i].considerNumberMax ||
                        arml[i].considerNumberMin != previousArmlist[i].considerNumberMin
                    ) {
                        isCombinationChanged = true;
                    }
                    // Combination changes depending on whether it became a cosmos weapon, or it was not a cosmos weapon
                    if (isCosmos(arml[i]) != isCosmos(previousArmlist[i])) {
                        isCombinationChanged = true;
                    }
                    if (isHollowsky(arml[i]) != isHollowsky(previousArmlist[i])) {
                        isCombinationChanged = true;
                    }
                    if (isDarkOpus(arml[i]) != isDarkOpus(previousArmlist[i])) {
                        isCombinationChanged = true;
                    }
                }
            }
            if (isCombinationChanged) {
                var combinations = calcCombinations(arml, prof.ruleMaxSize);
                previousArmlist = JSON.parse(JSON.stringify(arml));
                previousCombinations = JSON.parse(JSON.stringify(combinations));
            } else {
                var combinations = previousCombinations;
            }
        } else {
            var combinations = calcCombinations(arml, prof.ruleMaxSize);
            previousArmlist = JSON.parse(JSON.stringify(arml));
            previousCombinations = JSON.parse(JSON.stringify(combinations));
        }

        var res = [];
        var minSortKey = [];
        for (var i = 0; i < summon.length; i++) {
            res[i] = [];
            minSortKey[i] = -1;
        }

        var itr = combinations.length;
        var totalItr = itr * summon.length * Object.keys(getInitialTotals(prof, chara, summon)).length;

        // If necessary values for preprocessing are prepared here
        var minHP =
            prof.minimumHP == undefined ? undefined : parseInt(prof.minimumHP);

        for (var i = 0; i < itr; i = (i + 1) | 0) {
            var totals = getInitialTotals(prof, chara, summon);
            var totalBuff = getTotalBuff(prof);
            var oneres = calcOneCombination(combinations[i], summon, prof, chara, arml, totals, totalBuff);
            for (var j = 0; j < summon.length; j++) {
                // For each result preprocessing
                if (isValidResult(oneres[j], minHP)) {
                    if (res[j].length < 10) {
                        // First update minSortkey
                        if (
                            minSortKey[j] < 0 ||
                            minSortKey[j] > oneres[j].Djeeta[sortkey]
                        ) {
                            minSortKey[j] = oneres[j].Djeeta[sortkey];
                        }
                        res[j].push({data: oneres[j], armNumbers: combinations[i]});
                    } else {
                        // Only those larger than minSortkey push
                        if (oneres[j].Djeeta[sortkey] >= minSortKey[j]) {
                            // Add to eleventh
                            res[j].push({data: oneres[j], armNumbers: combinations[i]});

                            // Erase what matches minSortkey [j] up to the 10th
                            var spliceid = -1;
                            for (var k = 0; k < 10; k = (k + 1) | 0) {
                                if (res[j][k].data.Djeeta[sortkey] == minSortKey[j]) {
                                    spliceid = k;
                                }
                            }
                            res[j].splice(spliceid, 1);
                            minSortKey[j] = -1;

                            // Since it became an array of ten, once again calculate the minimum value
                            for (var k = 0; k < 10; k = (k + 1) | 0) {
                                if (
                                    minSortKey[j] < 0 ||
                                    minSortKey[j] > res[j][k].data.Djeeta[sortkey]
                                ) {
                                    minSortKey[j] = res[j][k].data.Djeeta[sortkey];
                                }
                            }
                        }
                    }
                }
            }
        }
        // At this point, summonres should be an array of "array of associative arrays of result data corresponding to each summon"
        for (var i = 0; i < summon.length; i++) {
            if (sortkey == "ATKandHP") {
                res[i].sort(function (a, b) {
                    if (a.data.Djeeta.displayAttack + a.data.Djeeta.displayHP < b.data.Djeeta.displayAttack + b.data.Djeeta.displayHP)
                        return 1;
                    if (a.data.Djeeta.displayAttack + a.data.Djeeta.displayHP > b.data.Djeeta.displayAttack + b.data.Djeeta.displayHP)
                        return -1;
                    return 0;
                });
            } else {
                res[i].sort(function (a, b) {
                    if (a["data"]["Djeeta"][sortkey] < b["data"]["Djeeta"][sortkey])
                        return 1;
                    if (a["data"]["Djeeta"][sortkey] > b["data"]["Djeeta"][sortkey])
                        return -1;
                    return 0;
                });
            }
            while (res[i].length > 10) {
                res[i].pop();
            }
        }

        return {
            result: {
                summon: summon,
                result: res,
                sortkeyname: sortkeyname,
                totalItr: totalItr
            },
            previousArmlist,
            previousCombinations
        };
    } else {
        return {result: {summon: summon, result: []}};
    }
};

self.onmessage = function (
    {
        data: {profile, armlist, summon, chara, sortKey, previousArmlist, previousCombinations}
    }) {
    const result = calculateResult(profile, armlist, summon, chara, sortKey, previousArmlist, previousCombinations);
    self.postMessage(result);
};

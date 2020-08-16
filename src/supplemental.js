function calcSupplementalDamage(
    types,
    damageArray,
    vals,
    { remainHP = 1.0, expectedTurn = 1 } = {}
) {
    for (let supplemental of Object.values(damageArray)) {
        if (!types.includes(supplemental.type))
            continue;

        switch (supplemental.type) {
            case "third_hit":
            case "multi_hit":
                if (expectedTurn === Infinity) {
                    expectedTurn = 1;
                }
                vals[0] += supplemental.damage;
                vals[1] += supplemental.damage * expectedTurn;
                break;
            case "hp_based":
                if (!("threshold" in supplemental)) {
                    console.error("Missing HP threshold in: " + supplemental);
                    continue;
                }
                if (remainHP < supplemental.threshold) {
                    continue;
                }
            /* FALLTHROUGH */
            default:
                // case "boss_debuff_based", "djeeta_buff_based", "on_critical", "on_ougi"
                vals[0] += supplemental.damage;
                vals[1] += supplemental.damageWithoutCritical;
                vals[2] += supplemental.ougiDamage;
                vals[3] += supplemental.chainBurst;
                break;
        }
    }
    return vals;
}

function collectSkillInfo(damageArray, {remainHP = 1.0}={}) {
    const isAvailable = ([key, val]) =>
        !((val.type == "hp_based") && (remainHP < val.threshold)) &&
        !(val.type != "on_ougi" && val.damage == 0);
    const xs = Object.entries(damageArray)
        .filter(isAvailable)
        .sort();
    return {
        headers: xs.map(([key, val]) => [key, val.type, val.extraValue]),
        values: xs.map(([key, val]) => [key, val.type != "on_ougi" ? val.damage : val.ougiDamage]),
        total: xs.reduce((total, [key,val]) => total + (val.type != "on_ougi" ? val.damage : val.ougiDamage), 0),
    };
}

//exports
module.exports._calcDamage = calcSupplementalDamage;
module.exports.calcOthersDamage = calcSupplementalDamage.bind(null, [
    "other",
    "hp_based",
    "on_critical",
    "on_ougi",
    "boss_debuff_based",
    "djeeta_buff_based"
]);
module.exports.calcThirdHitDamage = calcSupplementalDamage.bind(null, [
    "third_hit",
    "multi_hit"
]);

module.exports.collectSkillInfo = collectSkillInfo;


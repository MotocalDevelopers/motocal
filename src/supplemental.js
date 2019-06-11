function calcSupplementalDamage(types, damageArray, vals, {remainHP = 1.0, expectedTurn = 1}={}) {
    for (let supplemental of Object.values(damageArray)) {
        if (! types.includes(supplemental.type))
            continue;

        switch (supplemental.type) {
            case "hp_based":
                if (!("threshold" in supplemental)) {
                    console.error("Missing HP threshold in: " + supplemental);
                    continue;
                }
                if (remainHP < supplemental.threshold)
                    continue;
                /* FALLTHROUGH */
            case "other":
                vals[0] += supplemental.damage;
                vals[1] += supplemental.damageWithoutCritical;
                vals[2] += supplemental.ougiDamage;
                vals[3] += supplemental.chainBurst;
                break;
            case "third_hit":
                if (expectedTurn === Infinity) {
                    expectedTurn = 1;
                }
                vals[0] += supplemental.damage;
                vals[1] += supplemental.damage * expectedTurn;
                break;
            default:
                console.error("unknown supplemental damage type: " + supplemental.type); //does not reach here typically, if ever.
                break;
        }
    }
    return vals;
}

function collectSkillInfo(damageArray, {remainHP = 1.0}={}) {
    const isAvailable = ([key, val]) => !((val.type == "hp_based") && (remainHP < val.threshold));
    const xs = Object.entries(damageArray).filter(isAvailable).sort();
    return {
        keys: xs.map(([key, val]) => key),
        values: xs.map(([key, val]) => val.damage),
        total: xs.reduce((total, [key,val]) => total + val.damage, 0),
    };
}

//exports
module.exports._calcDamage = calcSupplementalDamage;
module.exports.calcOthersDamage = calcSupplementalDamage.bind(null, ["other", "hp_based"]);
module.exports.calcThirdHitDamage = calcSupplementalDamage.bind(null, ["third_hit"]);

module.exports.collectSkillInfo = collectSkillInfo;
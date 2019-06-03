var {getTypeBonus, calcDefenseDebuff, calcLBHaisuiValue, isDarkOpus, opusNames} = require('./global_logic.js');

describe('#getTypeBonus', () => {
    test('when self element and enemy element is not set, type bonus is 1', () => {
        expect(getTypeBonus(undefined, undefined)).toBe(1)
    });
});


describe('#calcDefenseDebuff', () => {
    test('when enemyDefense and defenseDebuff is not set, defense is 10', () => {
        expect(calcDefenseDebuff(undefined, undefined)).toBe(10);
    });

    test('when enemyDefense is not set, the default value is 10', () => {
        expect(calcDefenseDebuff(undefined, 0)).toBe(10);
        expect(calcDefenseDebuff(undefined, 50)).toBe(5);
    });

    test('when defenseDebuff is not set, the default value is 0', () => {
        expect(calcDefenseDebuff(10, undefined)).toBe(10);
        expect(calcDefenseDebuff(20, undefined)).toBe(20);
    });

    test('when defenseDebuff was negative numbers, defense is up', () => {
        expect(calcDefenseDebuff(10, -50)).toBe(15);
    });

    test('when defense debuff is over 100, defense is 1', () => {
        expect(calcDefenseDebuff(10, 100)).toBe(1);
    });
});


describe('#calcLBHaisui', () => {
    const haisui = calcLBHaisuiValue.bind(null, 'EXLBHaisui');
    const konshin = calcLBHaisuiValue.bind(null, 'EXLBKonshin');

    const exlbHaisuiMaxTable = [
        [1, 0.05],
        [2, 0.06],
        [3, 0.075],
        [4, 0.09],
        [5, 0.10],
        [6, 0.11],
        [7, 0.12],
        [8, 0.125],
        [9, 0.1375],
        [10, 0.15],
    ];
    const exlbHaisuiMinTable = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const exlbKonshinMaxTable = [
        [1, 0.03],
        [2, 0.04],
        [3, 0.05],
        [4, 0.06],
        [5, 0.07],
        [6, 0.08],
        [7, 0.09],
        [8, 0.10],
        [9, 0.11],
        [10, 0.12],
    ];
    const exlbKonshinMinTable = [
        [1, 0.01],
        [2, 0.01],
        [3, 0.02],
        [4, 0.02],
        [5, 0.03],
        [6, 0.03],
        [7, 0.03],
        [8, 0.04],
        [9, 0.04],
        [10, 0.04],
    ];

    test.each(exlbHaisuiMaxTable, 'Haisui max value', (amount, expected) => {
        expect(haisui(amount, 0.0)).toBeCloseTo(expected);
    });

    test.each(exlbHaisuiMinTable, 'Haisui min value (until HP 75.1%)', (amount) => {
        expect(haisui(amount, 1.0)).toBeCloseTo(0.01);
        expect(haisui(amount, 0.751)).toBeCloseTo(0.01);
    });

    test.each(exlbKonshinMaxTable, 'konshin max value', (amount, expected) => {
        expect(konshin(amount, 1.0)).toBeCloseTo(expected);
    });

    test.each(exlbKonshinMinTable, 'konshin min value', (amount, expected) => {
        expect(konshin(amount, 0.0)).toBeCloseTo(expected);
    });

    test('ignore unknown type arguments', () => {
        expect(calcLBHaisuiValue('unknown-type', 10, 0.0)).toBeCloseTo(0.0);
    });

    test('illegal amount numbers return 0.0', () => {
        expect(haisui(0, 0.0)).toBeCloseTo(0.0);
        expect(haisui(11, 0.0)).toBeCloseTo(0.0);
        expect(konshin(0, 0.0)).toBeCloseTo(0.0);
        expect(konshin(11, 0.0)).toBeCloseTo(0.0);
    });

    test.skip('illegal remainHP return ?', () => {
        // TODO: what illegal remainHP should return?
    });
});

describe('#isDarkOpus', () => {
    const darkOpusArms = [
        [{"name": "絶対否定の剣"}, true],
        [{"name": "Sword of Renunciation"}, true],
        [{"name": "永遠拒絶の槍"}, true],
        [{"name": "Scythe of Repudiation"}, true],
        [{"name": "Katana of Renunciation.Lvl185.Sl18+78"}, true],
        [{"name": "永遠拒絶の杖Lv.26SLv.6+17"}, true]
    ];

    const invalidArms = [
        [undefined ,false],
        [{}, false],
        [{"name":""}, false],
    ];

    const nonDarkOpusArms = [
        [{"name": "Ultima Bow"}, false],
        [{"name": "バハムートソード・フツルスLv.60SLv.4+13"}, false],
        [{"name": "Katana of Repudiatio"}, false],
        [{"name": "永遠拒絶大鎌"}, false],
        [{"name": "Katana f Repudiation"}, false],
        [{"name": "遠拒絶の太刀"}, false],
        [{"name": "Staff of Repudition"}, false],
        [{"name": "絶対力定の竪琴"}, false],
        [{"name": "Staff of epudiation"}, false],
    ];

    test.each(darkOpusArms)('Checking Dark Opus arm: %s}', (arm, expected) => {
        expect(isDarkOpus(arm)).toBe(expected);
    });

    test.each(invalidArms)('Checking invalid arms: %s', (arm, expected) => {
        expect(isDarkOpus(arm)).toBe(expected);
    });

    test.each(nonDarkOpusArms)('Checking non dark opus arms: %s', (arm, expected) => {
        expect(isDarkOpus(arm)).toBe(expected);
    });

});
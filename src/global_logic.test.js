var {getTypeBonus, calcDefenseDebuff, calcLBHaisuiValue} = require('./global_logic.js');

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

    test('Haisui max value', () => {
        expect(haisui(1, 0.0)).toBeCloseTo(0.05);
        expect(haisui(2, 0.0)).toBeCloseTo(0.06);
        expect(haisui(3, 0.0)).toBeCloseTo(0.075);
        expect(haisui(4, 0.0)).toBeCloseTo(0.09);
        expect(haisui(5, 0.0)).toBeCloseTo(0.10);
        expect(haisui(6, 0.0)).toBeCloseTo(0.11);
        expect(haisui(7, 0.0)).toBeCloseTo(0.12);
        expect(haisui(8, 0.0)).toBeCloseTo(0.125);
        expect(haisui(9, 0.0)).toBeCloseTo(0.1375);
        expect(haisui(10, 0.0)).toBeCloseTo(0.15);
    });

    test('Haisui min value', () => {
        expect(haisui(1, 0.751)).toBeCloseTo(0.01);
        expect(haisui(2, 0.751)).toBeCloseTo(0.01);
        expect(haisui(3, 0.751)).toBeCloseTo(0.01);
        expect(haisui(4, 0.751)).toBeCloseTo(0.01);
        expect(haisui(5, 0.751)).toBeCloseTo(0.01);
        expect(haisui(6, 0.751)).toBeCloseTo(0.01);
        expect(haisui(7, 0.751)).toBeCloseTo(0.01);
        expect(haisui(8, 0.751)).toBeCloseTo(0.01);
        expect(haisui(9, 0.751)).toBeCloseTo(0.01);
        expect(haisui(10, 0.751)).toBeCloseTo(0.01);
    });

    test('konshin max value', () => {
        expect(konshin(1, 1.0)).toBeCloseTo(0.03);
        expect(konshin(2, 1.0)).toBeCloseTo(0.04);
        expect(konshin(3, 1.0)).toBeCloseTo(0.05);
        expect(konshin(4, 1.0)).toBeCloseTo(0.06);
        expect(konshin(5, 1.0)).toBeCloseTo(0.07);
        expect(konshin(6, 1.0)).toBeCloseTo(0.08);
        expect(konshin(7, 1.0)).toBeCloseTo(0.09);
        expect(konshin(8, 1.0)).toBeCloseTo(0.10);
        expect(konshin(9, 1.0)).toBeCloseTo(0.11);
        expect(konshin(10, 1.0)).toBeCloseTo(0.12);
    });

    test('konshin min value', () => {
        expect(konshin(1, 0.0)).toBeCloseTo(0.01);
        expect(konshin(2, 0.0)).toBeCloseTo(0.01);
        expect(konshin(3, 0.0)).toBeCloseTo(0.02);
        expect(konshin(4, 0.0)).toBeCloseTo(0.02);
        expect(konshin(5, 0.0)).toBeCloseTo(0.03);
        expect(konshin(6, 0.0)).toBeCloseTo(0.03);
        expect(konshin(7, 0.0)).toBeCloseTo(0.03);
        expect(konshin(8, 0.0)).toBeCloseTo(0.04);
        expect(konshin(9, 0.0)).toBeCloseTo(0.04);
        expect(konshin(10, 0.0)).toBeCloseTo(0.04);
    });

    test('ignore unexpected type arguments', () => {
        expect(calcLBHaisuiValue('unknown-type', 10, 0.0)).toBeCloseTo(0.0);
    });

    test('illegal amount numbers return 0.0', () => {
        expect(haisui(0, 0.0)).toBeCloseTo(0.0);
        expect(haisui(11, 0.0)).toBeCloseTo(0.0);
        expect(konshin(0, 0.0)).toBeCloseTo(0.0);
        expect(konshin(11, 0.0)).toBeCloseTo(0.0);
    });

    test('illegal remainHP return ?', () => {
        // TODO
    });
});
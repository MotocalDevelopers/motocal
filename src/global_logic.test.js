var {getTypeBonus, calcDefenseDebuff} = require('./global_logic.js');

describe('#getTypeBonus', () => {
    test('when self element and enemy element is not set, type bonus is 1', () => {
        expect(getTypeBonus(undefined, undefined)).toBe(1)
    })
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
    })
});
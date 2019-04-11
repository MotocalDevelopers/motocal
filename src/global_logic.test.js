var { getTypeBonus, calcDefenseDebuff } = require('./global_logic.js');

describe('#getTypeBonus', () => {
  test('when self element and enemy element is not set, type bonus is 1', () => {
      expect(getTypeBonus(undefined, undefined)).toBe(1)
  })
})


describe('#calcDefenseDebuff', () => {
  test('when defense debuff is over 100, enemy defense is 1', () => {
      expect(calcDefenseDebuff(10, 100)).toBe(1)
  })
})
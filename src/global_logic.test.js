var { getTypeBonus } = require('./global_logic.js');

describe('#getTypeBonus', () => {
  test('when self element and enemy element is not set, type bonus is 1', () => {
      expect(getTypeBonus(undefined, undefined)).toBe(1)
  })
})

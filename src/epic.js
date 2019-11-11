'use strict';


// ported from #201 (not-merged yet)
const zip = (arr, ...args) =>
    arr.map((val, idx) => args.reduce((x, xs) => [...x, xs[idx]], [val]));

const sumBy = (arr, key) =>
    arr.reduce((total, item) => total + item[key], 0);


const _strip_arm_name = (name) => name.replace(/\s*\+\s*\w+\s*/, '');

/**
 * @param {Array<Arm>} arml arm list
 * @param {Array<number>} comb combinations
 * @return {Array<Arm>} arm list with "count"
 */
const armListWithCount = (arml, comb) =>
    zip(arml, comb).map(([arm, count]) => Object.assign({}, arm, {count}));

/**
 * TODO: how to document Types for "higher-order function"
 */
const genCountWeaponFunc = (func) => (arml, comb) =>
    sumBy(armListWithCount(arml, comb).filter(func), "count");


// #326 discussion for how to detect epic weapon
const isEpicWeapon = (arm) => arm.series && arm.series === "epic";


const isWandType = (arm) => arm.armType === "wand";


// public

/**
 * @param {Array<Arm>} arml arm list
 * @param {Array<number>} comb combinations
 * @return {number} count of epic weapon
 */
const countEpicWeapon = genCountWeaponFunc(isEpicWeapon);

/**
 * @param {Array<Arm>} arml arm list
 * @param {Array<number>} comb combinations
 * @return {number} count of wand type weapon
 */
const countWandType = genCountWeaponFunc(isWandType);


/**
 * @param {Array<Arm>} arml arm list
 * @param {Array<number>} comb combinations
 * @return {number} is all unique arm name
 */
const countUniqueArm = (arml, comb) => (new Set(
    armListWithCount(arml, comb)
        .filter(arm => arm.name && arm.count === 1)
        .map(arm => _strip_arm_name(arm.name)))).size;

/**
 * @param {Array<Arm>} arml arm list
 * @param {Array<number>} comb combinations
 * @return {number} is all unique arm type
 */
const countUniqueArmType = (arml, comb) => (new Set(
    armListWithCount(arml, comb)
        .filter(arm => arm.name && arm.count === 1)
        .map(arm => arm.armType))).size;

/**
 * @param {Array<number>} comb combinations
 * @return {number} count unique arm
 */
const countComb = (arml, comb) =>
    armListWithCount(arml, comb)
        .filter(arm => arm.name && arm.count > 0).length;


/**
 * @param {Array<Arm>} arml arm list
 * @param {Array<number>} comb combinations
 * @return {boolean} is all unique arm
 */
const isAllUniqueArm = (arml, comb) =>
    countUniqueArm(arml, comb) === countComb(arml, comb);


/**
 * @param {Array<Arm>} arml arm list
 * @param {Array<number>} comb combinations
 * @return {boolean} is all unique arm type
 */
const isAllUniqueArmType = (arml, comb) =>
    countUniqueArmType(arml, comb) === 10 && countComb(arml, comb) === 10;


// FIXME: it is not enough completed implementation, yet.
// - if arml contained blank data
// - if comb contained value 0

// FIXME: this logic can't check following:
// - if same weapon was added as different item, with different Lv or plug bonus etc.
// - Omega, JMP, different colors can be different weapon? Cosmos types too.


module.exports = {
    _strip_arm_name: _strip_arm_name,
    isEpicWeapon: isEpicWeapon,
    isWandType: isWandType,
    countEpicWeapon: countEpicWeapon,
    countWandType: countWandType,
    countUniqueArm: countUniqueArm,
    countUniqueArmType: countUniqueArmType,
    countComb: countComb,
    isAllUniqueArm: isAllUniqueArm,
    isAllUniqueArmType: isAllUniqueArmType,
};

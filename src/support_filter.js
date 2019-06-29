"use strict";


const _entries = Object.entries;

// no need to care isConsideredInAverage, and default for isConsideredInAverage: off case.
const range_own = (totals, key) => [[key, totals[key]]];

// no use range_custom_func because no need ".filter"
const range_all = (totals, key) => 
  (!totals[key].isConsideredInAverage) ? range_own(totals, key) : _entries(totals);

// no use range_custom_func because need "key"
const range_others = (totals, key) =>
  (!totals[key].isConsideredInAverage) ? range_own(totals, key) : _entries(totals).filter(([k,v]) => k != key);

// Base filtering function takes parameter totals and key
// if totals[key].isConsideredInAverage then return range_own
const range_custom_func = (func) => (totals, key) => 
  (!totals[key].isConsideredInAverage) ? range_own(totals, key) : _entries(totals).filter(func);

// Wrapper for range_custom, for simplify the function argument specs.
const range_custom = (func) => range_custom_func(([k,v]) => func(v));


// sample filters commonly use

const range_element = (element) => range_custom(v => v.element == element);

const range_race = (race) => range_custom(v => v.race == race);

// TODO: Support two favorite weapons.
const range_fav = (fav) => range_custom(v => [v.fav1, v.fav2].includes(fav));

const range_sex = (sex) => range_custom(v => v.sex === sex);


const when_element_buff = (chara, buff) => (chara.elementBuff > 0 || buff.element > 0);


module.exports = {
    range: {
        own: range_own,
        all: range_all,
        others: range_others,

        element: range_element,
        race: range_race,
        fav: range_fav,
        sex: range_sex,

        custom: range_custom,
        custom_func: range_custom_func,
    },
    when: {
        element_buff: when_element_buff,
    }
};

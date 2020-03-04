"use strict";


const _entries = Object.entries;

const range_none = (totals, key) => [];

// no need to care isConsideredInAverage, and default for isConsideredInAverage: off case.
const range_own = (totals, key) => [[key, totals[key]]];

// no use range_custom_func because no need ".filter"
const range_all = (totals, key) => 
  (!totals[key].isConsideredInAverage) ? range_own(totals, key) : _entries(totals);

// no use range_custom_func because need "key"
const range_others = (totals, key) =>
  (!totals[key].isConsideredInAverage) ? range_own(totals, key) : _entries(totals).filter(([name, chara]) => name != key);

const range_Djeeta = (totals, key) =>
  (!totals[key].isConsideredInAverage) ? range_none(totals, key) : range_own(totals, "Djeeta");


// Base filtering function takes parameter totals and key
// if totals[key].isConsideredInAverage then return range_own
const range_custom_func = (func) => (totals, key) => 
  (!totals[key].isConsideredInAverage) ? range_own(totals, key) : _entries(totals).filter(func);

// Wrapper for range_custom_func, for simplify the function argument specs.
const range_custom = (func) => range_custom_func(([name, chara]) => func(chara));


// sample filters commonly use

const range_element = (element) => range_custom(chara => chara.element == element);

Object.assign(range_element, {
    fire: range_element("fire"),
    water: range_element("water"),
    wind: range_element("wind"),
    earth: range_element("earth"),
    light: range_element("light"),
    dark: range_element("dark"),
});

// FIXME: This race check is now not completed.
// e.g. baha race check will match to "unknown", "seisho"
const range_race = (race) => range_custom(chara => chara.race == race);

// TODO: Support two favorite weapons.
const range_fav = (fav) => range_custom(chara => [chara.fav1, chara.fav2].includes(fav));

const range_sex = (sex) => range_custom(chara => chara.sex === sex);

Object.assign(range_sex, {
    male: range_sex("male"),
    female: range_sex("female"),
    other: range_sex("other"),
    male_female: range_sex("male/female"),
});


const when_element_buff = (chara, buff) => (chara.elementBuff > 0 || buff.element > 0);


module.exports = {
    range: {
        own: range_own,
        all: range_all,
        others: range_others,
        none: range_none,
        Djeeta: range_Djeeta,

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

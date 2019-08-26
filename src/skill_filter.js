"use strict";

const {bahamutRelation, bahamutFURelation} = require('./global_const');

// TODO: move to global_const, and eachSupport in global_logic
const SUPPORT_KEYS = ["support", "support2", "support3"];

const FAV_KEYS = ["fav1", "fav2"];


/**
 * @param {string} key for totals[key]
 * @return {boolean} key is Djeeta
 */
function _isDjeeta(key) {
    return key === "Djeeta";
}

/**
 * Decorator to add helper function
 * @param {Function} func to check chara function
 * @return {Function} function.withDjeeta
 */
function _withDjeeta(func) {
    func.orDjeeta = (args, totals, key) => _isDjeeta(key) || func(args, totals[key]);
    return func;
}


/**
 * @param {Object} chara
 * @return {boolean} has wildcard support
 */
function _hasWildcardSupport(chara, keys=SUPPORT_KEYS) {
    return keys.some(key => chara[key] === "wildcard");
}

/**
 * function decorator
 * @param {function} func
 * @return {function} decorated function with check support for wildcard feature.
 */
function _withWildcardCheck(func, keys=SUPPORT_KEYS) {
    return (args, chara) => func(args, chara) || _hasWildcardSupport(chara, keys);
}

/**
 * base logic for races/types check (but not favs)
 * @param {string|Array<string>} args
 * @param {string} value
 * @return {boolean} value is contained in expected args.
 */
function _contains(args, value) {
    if (typeof value === "undefined") {
        return false;
    }
    if (Array.isArray(args)) {
        return args.some(arg => value.includes(arg));
    }
    return value.includes(args);
}

/**
 * Wrapper for baha weapon race checking
 * race check contains always "unknown" and "seisho" 
 *
 * @param {Array<string>} races
 * @param {string} value
 * @return {boolean} bahaRaceValueContains
 *
 * XXX: limitation races must be array
 */
function bahaRaceContains(races, value) {
    // console.assert(Array.isArray(races));
    return _contains(["unknown", "seisho", ...races], value);
}

/**
 * @param {string} skillname
 * @return {Array<string>} races array
 */
function _lookupBahaRaces(skillname, relation=bahamutRelation) {
    return Object.values(relation[skillname.split("-")[1]]);
}

/**
 * @param {string} skillname
 * @param {Object} chara
 * @return {boolean}
 */
function bahaRaceCharaContains(skillname, chara, relation=bahamutRelation) {
    const races = _lookupBahaRaces(skillname, relation);
    return bahaRaceContains(races, chara["race"]);
}

/**
 * Wrapper function for bahaRaceCharaContains with bahamutFURelation table.
 */
function bahaFURaceCharaContains(skillname, chara) {
    return bahaRaceCharaContains(skillname, chara, bahamutFURelation);
}

/**
 * @param {string|Array<string>} races
 * @param {Object} chara
 * @return {boolean} match chara["race"]
 */
function raceCharaContains(races, chara) {
    return _contains(races, chara["race"]);
}

/**
 * @param {string|Array<string>} types
 * @param {Object} chara
 * @return {boolean} match chara["type"]
 */
function typeCharaContains(types, chara) {
    return _contains(types, chara["type"]);
}

/**
 * @param {Array<string>} values
 * @return {Array<string>} filtered array omit "none" element.
 */
function _skip_none_filter(values) {
    return values.filter(val => val !== "none");
}

/**
 * @param {string|Array<string>} favs
 * @param {Array<string>} values must be array, at least chara has fav1,fav2
 * @return {boolean} match chara["fav1"] or chara["fav2"]
 *
 * XXX: limitation, favs MUST not contains "none"
 *      to avoid "none" === "none" matching.
 */
function favContains(favs, values) {
    // console.assert(Array.isArray(values));
    return values.some(val => favs.includes(val));
}

/**
 * @param {string|Array<string>} favs
 * @param {Object} chara
 * @return {boolean} match chara["fav1"] or chara["fav2"]
 */
function favCharaContains(favs, chara, keys=FAV_KEYS) {
    return favContains(favs, _skip_none_filter(keys.map(key => chara[key])));
}


module.exports.favContains = favContains;
module.exports.typeContains = _contains;
module.exports.raceContains = _contains;
module.exports.bahaRaceContains = bahaRaceContains;

// function with naming "Chara" which takes chara object as parameter,
// can check chara["support"] === "wildcard"
module.exports.raceCharaContains = _withDjeeta(_withWildcardCheck(raceCharaContains));
module.exports.bahaRaceCharaContains = _withWildcardCheck(bahaRaceCharaContains);
module.exports.bahaFURaceCharaContains = _withWildcardCheck(bahaFURaceCharaContains);
module.exports.favCharaContains = _withWildcardCheck(favCharaContains);
module.exports.typeCharaContains = _withWildcardCheck(typeCharaContains);

// export private for Unit tests
module.exports._contains = _contains;
module.exports._hasWildcardSupport = _hasWildcardSupport;
module.exports._withWildcardCheck = _withWildcardCheck;
module.exports._lookupBahaRaces = _lookupBahaRaces;
module.exports._skip_none_filter = _skip_none_filter;
module.exports._isDjeeta = _isDjeeta;
module.exports._withDjeeta = _withDjeeta;

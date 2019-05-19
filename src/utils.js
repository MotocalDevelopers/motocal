'use strict';
/**
 * Porting common utility functions. 
 */


/**
 * dict_get
 * @param {object} obj A container object.
 * @param {string} key A name of field to get.
 * @param {object} val An initial value when key was not exists.
 * @param {any}
 * 
 * This function improve the case key exists check and initial value.
 * 
 * ```js
 * let val = (something_long_var_name[key] != undefined)
 *          ? something_long_var_name[key] : initial_value;
 * ```
 * 
 * 
 * ```js
 * let val = dict_get(something_long_var_name, key, initial_value);
 * ```
 * 
 * @see Python dict.get
 */
function dict_get(obj, key, val) {
    return (key in obj) ? obj[key] : val;
}


/**
 * do_nothing - dummy function
 */
function do_nothing() {
    // pass
}


/**
 * obj_fromEntries
 * 
 * @param {array} xs array of (key, value) pairs
 * @return {object} obj
 * @see Object.fromEntries (ES2019) 
 *
 * - obj_fromEntries([[1,2],[3,4]]) => {1:2, 3:4}
 *
 * TODO: add polyfill to Object.prototypes chain
 */
function obj_fromEntries(xs) {
    var obj = {};
    for (let [key, val] of xs) {
        obj[key] = val;
    }
    return obj;
}


/**
 * zip([a], [b]) -> [(a,b)]
 * 
 * @param {array} a list
 * @param {array} b list
 * @return {array} array of pair [(a,b)]
 * 
 * - zip([1,2,3],[4,5,6]) => [[1,4],[2,5],[3,6]]
 * - zip([1,2,3],[4,5]) => [[1,4],[2,5],[3,6,undefined]]
 * 
 * @see _.zip (lodash, underscore libraries)
 * @see __builtins__.zip Python
 */
const zip = (arr, ...args) =>
    arr.map((val, idx) => args.reduce((x, xs) => [...x, xs[idx]], [val]));


/**
 * zip_longest([a], [b]) -> [(a,b)]
 * 
 * @param {array} a list
 * @param {array} b list
 * @return {array} array of pair [(a,b)] fit to longest
 * 
 * - zip([1,2,3],[4,5,6]) => [[1,4],[2,5],[3,6]]
 * - zip([1,2,3],[4,5]) => [[1,4],[2,5],[3,undefined]]
 * - zip([1,2],[3,4,5]) => [[1,3],[2,4],[undefined,5]]
 * - zip([1,2],[3,4,5],fillvalue=0) => [[1,3],[2,4],[0,5]]
 * 
 * @see Python itertools.zip_longest
 */
function zip_longest(a, b, fillvalue=undefined) {
    const fill = (val) => typeof(val) !== 'undefined' ? val : fillvalue;
    const args = [].slice.call([a, b]);
    const longest = args.reduce((a,b) => (a.length>b.length ? a : b), []);
    return longest.map((_,idx) => args.map((xs) => fill(xs[idx])));
}


module.exports.dict_get = dict_get;
module.exports.do_nothing = do_nothing;
module.exports.obj_fromEntries = obj_fromEntries;
module.exports.zip = zip;
module.exports.zip_longest = zip_longest;
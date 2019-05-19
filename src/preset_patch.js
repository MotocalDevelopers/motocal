'use strict';

var {zip_longest, dict_get, do_nothing} = require('./utils');
const {CATEGORIES} = require('./preset_consts');


/**
 * partial_patch_array
 * @param {object} root old state data
 * @param {string} category "all" or {"profile", "summon", "chara", "armlist"}
 * @param {object} data new state data
 * @return {object} root patched new state data
 * @private
 */
function partial_patch_array(orig, patch, merge=Object.assign) {
    const merge_list = [];

    for (let [a, b] of zip_longest(orig, patch)) {
        if (typeof(b) === 'undefined' || Object.keys(b).length == 0) {
            // skip
        } else if (typeof(a) !== 'undefined') {
            merge(a, b);
        } else {
            merge_list.push(b);
        }
    }
  
    // NOTE: do not change the length of 'orig'
    // in the for-loop.
    orig.push(...merge_list);
  
    return orig;
}


/**
 * command_replace
 * @param {object} root old state data
 * @param {string} category "all" or {"profile", "summon", "chara", "armlist"}
 * @param {object} data new state data
 * @return {object} root patched new state data
 * @private
 */
function command_merge(root, category, data) {
    if (category == "all") {
        for (let key in CATEGORIES) {
            if (key in data) {
                // Call recursive to expand category names.
                apply_patch_processor(root, command, key, data[key]);
            }
        }
    } else if (category in root) {
        let obj = root[category];
        if (Array.isArray(obj)) {
            // category: summon, chara, armlist
            partial_patch_array(obj, data);
        } else {
            // category: profile
            Object.assign(obj, data);
        }
    }
    return root;
}


/**
 * _has_all_keys
 * @param {object} data object
 * @return {boolean} has all required keys.
 * @private
 */
function _has_all_keys(data) {
    return CATEGORIES.every((key) => key in data);
}


/**
 * command_replace
 * @param {object} root old state data
 * @param {string} category "all" or {"profile", "summon", "chara", "armlist"}
 * @param {object} data new state data
 * @return {object} root patched new state data
 * @private
 */
function command_replace(root, category, data) {
    if (category == "all" && _has_all_keys(data)) {
        root = data;
    } else if (category in root) {
        root[category] = data;
    }
    return root;
}

/**
 * command_append
 * @param {object} root old state data
 * @param {string} category "all" or {"profile", "summon", "chara", "armlist"}
 * @param {object} data new state data
 * @private
 */
function command_append(root, category, data) {
    if (category in root) {
        let obj = root[category];
        if (Array.isArray(obj)) {
            obj.push(...data);
        }
        // Nothing to append for category "profile"
    }
}


const _PATCH_PROCESSOR_COMMAND = {
    "REPLACE": command_replace,
    "MERGE": command_merge,
    "APPEND": command_append,
};



/**
 * apply_patch_processor
 * @param {object} root old state data
 * @param {string} command {"REPLACE", "MERGE", "APPEND"}
 * @param {string} category "all" or {"profile", "summon", "chara", "armlist"}
 * @param {object} data new state data
 * @return {object} root patched new state data
 */
export function apply_patch_processor(root, command, category, data) {
    // reject error data
    if (typeof(data) === "undefined" || Object.keys(data).length == 0)
        return root;

    const patch = dict_get(_PATCH_PROCESSOR_COMMAND, command, do_nothing);
    return patch(root, category, data);
}

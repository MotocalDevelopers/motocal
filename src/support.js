"use strict";

const {supportAbilities} = require("./global_const");


// The stack will not reach this depth, just for safty of the logic.
const _MAX_STACK_LENGTH = 10;

// A list of support field name in character data.
const _SUPPORT_NAMES = ["support", "support2", "support3"];


/**
 * flatten composite support
 *
 * - look up support by ID
 * - skip 'none' support
 * - filtering invalid support
 * - flatten nested composite support
 *
 * @param {support[]} array of support object
 * @param {Object} _support_loopup supportAbilities or dummy support table for tests
 * @return {Generator}
 */
function* flattenCompositeSupport(root, _support_lookup=supportAbilities) {
    let stack = [root.values()];
    let used = new Set();

    while (_MAX_STACK_LENGTH > stack.length && stack.length > 0) {
        let {value, done} = stack[stack.length-1].next();

        if (done) {
            stack.pop();
            continue;
        }

        if (value.ID && !(value.ID in _support_lookup)) {
            // in this case, may be typo ID name
            console.error("unknown support ability ID:", value.ID);
            continue;
        }

        let support = _support_lookup[value.ID] || value;

        if (typeof support === 'undefined') {
            // in this case, need to fix support declaration
            console.error("Skip invalid support ability");
            continue;
        }

        if (support.type === 'none') {
            continue; // Safe for skip
        }

        // Avoid look-up recursive loop
        if (used.has(support)) {
            continue;
        } else {
            used.add(support);
        }

        if (support.type === 'composite') {
            if (Array.isArray(support.value)) {
                stack.push(support.value.values());
            } else {
                console.error("cmposite value must be array");
            }
            continue;
        }

        yield support;
    }

    if (stack.length > _MAX_STACK_LENGTH) {
        console.error("too deep nested of composite support");
    }
}


/**
 * Iterate support abilities over characters
 *
 * @param {Object} chara character object
 * @param {function} _flatten function to flatten composite data
 * @param {string[]} _support_names support field name list
 * @return {Generator}
 */
function* eachSupport(chara,
                      _flatten=flattenCompositeSupport,
                      _support_names=_SUPPORT_NAMES) {
    for (let key of _support_names) {
        yield *_flatten([{ID: chara[key]}]);
    }
}


module.exports.eachSupport = eachSupport;
module.exports.flattenCompositeSupport = flattenCompositeSupport; 

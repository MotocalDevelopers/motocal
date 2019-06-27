const saveFilterMaskList = require('./global_const').saveFilterMaskList;

/**
 * Parses value according to rules and returns a valid value.
 * @param value Text
 * @param min Minimum integer value
 * @param max Maximum integer value
 * @param def Default value
 * @returns {number} Parsed value
 */
const parseNumberInput = function (value, min, max, def) {
    value = parseFloat(value);
    // Empty Check
    if (isNaN(value)) {
        value = parseFloat(def);
    }
    // Boundary Check
    if (value > max) {
        value = max;
    } else if (value < min) {
        value = min
    }
    return value;
};

/**
 * Wrapper to parse Typeahead objects.
 * @param {String|number} value Text of typeahead value.
 * @param {Object} props Props data of typeahead value.
 * @param {String|number} def Default value to assign if value is NaN
 * @returns {String|number} valid value according to specs.
 */
module.exports.parseNumberInputField = function (value, props, def = 0) {
    let max = parseFloat(props.max);
    let min = parseFloat(props.min);
    return parseNumberInput(value, min, max, def);
};

/**
 * Finds labels from id for given list.
 * @param selector Selector data to be scan.
 * @param id Id to be search.
 * @returns {string|*} Label that has id or id itself.
 */
module.exports.getLabelFromId = function (selector, id) {
    for (let select of selector) {
        if (select.id === id.toString()) {
            return select.label
        }
    }
    return id.toString();
};

/**
 * Returns whatever an array contains an object or not.
 * @param {Array<Object>} arr Array to be checked.
 * @param {Object} obj Object that contains the value.
 * @returns {Boolean} true if array contains value, false if it does not.
 */
module.exports.arrayContainsValue = function (arr, obj) {
    for (let item of arr) {
        if ((typeof obj.includes === "function" && obj.includes(item)) ||
            (typeof item.includes === "function" && item.includes(obj)) ||
            item === obj) {
            return true;
        }
    }
    return false;
};

/**
 * Filters unnecessary objects from save data.
 * @param {Object} save Any json object to be filtered.
 * @param {Array<Object>} list Data contains filter rules.
 */
module.exports.filterObjectsFromSave = function (save, list=saveFilterMaskList) {
    for (let item in save) {
        if (this.arrayContainsValue(list, item)) {
            delete save[item];
        }
        if (save[item] !== null && typeof (save[item]) == "object") {
            this.filterObjectsFromSave(save[item], list);
        }
    }
};
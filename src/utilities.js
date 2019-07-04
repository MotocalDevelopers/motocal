/**
 * Finds labels from id for given list.
 * @param selector Selector data to be scan.
 * @param id Id to be search.
 * @returns {string|*} Label that has id or id itself.
 */
const getLabelFromId = function (selector, id) {
    for (let select of selector) {
        if (select.id === id.toString()) {
            return select.label
        }
    }
    return id.toString();
};

module.exports.getLabelFromId = getLabelFromId;

/**
 * Returns whatever an array contains an object or not.
 * @param {Array<Object>} arr Array to be checked.
 * @param {Object} obj Object that contains the value.
 * @returns {Boolean} true if array contains value, false if it does not.
 */
const arrayContainsValue = function (arr, obj) {
    for (let item of arr) {
        if ((typeof obj.includes === "function" && obj.includes(item)) ||
            (typeof item.includes === "function" && item.includes(obj)) ||
            item === obj) {
            return true;
        }
    }
    return false;
};

module.exports.arrayContainsValue = arrayContainsValue;

/**
 * Filters unnecessary objects from save data.
 * @param {Object} save Any json object to be filtered.
 * @param {Array<Object>} list Data contains filter rules.
 */
const filterObjectsFromSave = function (save, list) {
    for (let item in save) {
        if (arrayContainsValue(list, item)) {
            delete save[item];
        }
        if (save[item] !== null && typeof (save[item]) == "object") {
            filterObjectsFromSave(save[item], list);
        }
    }
};

module.exports.filterObjectsFromSave = filterObjectsFromSave;

/**
 * Returns if object is number or not
 * @param {string}n String to be checked
 * @returns {boolean}
 */
const isNumeric = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

module.exports.isNumeric = isNumeric;

/**
 * Returns a valid number within constrains
 * @param selected value to be checked
 * @param min minimum value allowed for numbers
 * @param max maximum value allowed for numbers
 * @returns {number|float} valid number
 */
const clampNumber = function (selected, min, max) {
    if (selected < min) {
        selected = min;
    } else if (selected > max) {
        selected = max;
    }
    return selected;
};

module.exports.clampNumber = clampNumber;


/**
 * Validator for number fields
 * @param {*}num value to be checked
 * @param {number}min minimum value allowed for numbers
 * @param {number}max maximum value allowed for numbers
 * @param {number|string}defaultValue default value to be passed
 * @returns {number} valid number
 */
const getValidNumber = function (num, min, max, defaultValue = 0) {
    if (!isNumeric(num)) {
        num = getValidNumber(defaultValue, min, max);
    } else if (typeof num !== "number") {
        num = parseFloat(num);
    }
    return clampNumber(num, min, max);
};

module.exports.getValidNumber = getValidNumber;

/**
 * Returns a valid text
 * @param val Value to be check
 * @param defaultValue Default value to be passed
 * @returns {*} Valid String
 */
const getValidText = function (val, defaultValue = "") {
    if (val === undefined) {
        val = getValidText(defaultValue);
    } else if (typeof val !== "string") {
        val = val.toString();
    }
    return val;
};

module.exports.getValidText = getValidText;

/**
 * Returns maximum scroll length of a scrollable DOM
 * @param {HTMLElement} input scrollable element
 * @returns {number} maximum scroll length
 */
const getMaxScrollLength = function (input) {
    return input.scrollTopMax || input.scrollHeight - input.clientHeight;
};

module.exports.getMaxScrollLength = getMaxScrollLength;

/**
 * Creates data structure to satisfy event based data fetcher events (e.target.value)
 * @param value data to be posted
 * @returns {{target: {value: *}}}
 */
const createDataPlaceholder = function (value) {
    return {target: {value: value}};
};

module.exports.createDataPlaceholder = createDataPlaceholder;
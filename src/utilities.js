/**
 * Wrapper to parse Typeahead objects.
 * @param {String|number} value Text of typeahead value.
 * @param {Object} props Props data of typeahead value.
 * @param {String|number} def Default value to assign if value is NaN
 * @returns {String|number} valid value according to specs.
 */
const parseNumberInputField = function (value, props, def = 0) {
    value = parseFloat(value);
    let max = parseFloat(props.max);
    let min = parseFloat(props.min);
    return validateNumber(value, min, max, def);
};

module.exports.parseNumberInputField = parseNumberInputField;

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
 *
 * @param {string} type type of validation that is requested
 * @param {float|number} min minimum value a "number" type that can take
 * @param {float|number} max maximum value a "number" type that can take
 * @param selected item value to be checked
 * @param previous default value if item is undefined&NaN
 * @returns {string|*} valid result
 */
const getValidData = function (type, min, max, selected, previous) {
    switch (type) {
        case "number":
            return validateNumber(parseFloat(selected), min, max, previous);
        case "text":
            if (selected) {
                return selected.toString();
            } else if (previous) {
                return previous.toString();
            } else {
                return "";
            }
        default:
            return selected;
    }
};

module.exports.getValidData = getValidData;

/**
 * Returns a valid number within constrains
 * @param selected value to be checked
 * @param min minimum value allowed for numbers
 * @param max maximum value allowed for numbers
 * @param previous last valid entry
 * @returns {number|float} valid number
 */
const validateNumber = function (selected, min, max, previous) {
    if (isNaN(selected)) {
        if (previous !== undefined) {
            if (!isNaN(parseFloat(previous))) {
                return validateNumber(parseFloat(previous), min, max, undefined);
            } else {
                return 0;
            }
        } else {
            if (min !== undefined) {
                return min;
            } else {
                return 0;
            }
        }
    } else {
        if (selected < min) {
            return min;
        } else if (selected > max) {
            return max;
        } else {
            return selected;
        }
    }
};

module.exports.validateNumber = validateNumber;

/**
 * Returns maximum scroll length of a scrollable DOM
 * @param {HTMLElement} input scrollable element
 * @returns {number} maximum scroll length
 */
const getMaxScrollLength = function (input) {
    if ('scrollTopMax' in input) {
        return input.scrollTopMax;
    } else {
        return input.scrollHeight - input.clientHeight;
    }
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
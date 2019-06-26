const parseNumberInputField = function (value, min, max, def) {
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

module.exports.parseNumberInputField = function (value, props, def = 0) {
    let max = parseFloat(props.max);
    let min = parseFloat(props.min);
    return parseNumberInputField(value, min, max, def);
};

module.exports.getLabelFromId = function (selector, id) {
    for (let select of selector) {
        if (select.id == id) {
            return select.label
        }
    }
    return "";
};

module.exports.filterObjectsFromSave = function (save) {
    for (let item in save) {
        if (item.includes("FieldTypeahead")) {
            delete save[item];
        }
        if (save[item] !== null && typeof (save[item]) == "object") {
            this.filterObjectsFromSave(save[item]);
        }
    }
};
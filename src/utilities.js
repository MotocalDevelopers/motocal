const parseNumberInputField = function(value, min, max, def) {
    value = parseFloat(value);
    // Empty Check
    if (isNaN(value)) {
        value = def;
    }
    // Boundary Check
    if (value > max) {
        value = max;
    } else if (value < min) {
        value = min
    }
    return value;
};

module.exports.parseNumberInputField = function(target, def=0) {
    let value = parseFloat(target.value);
    let max = parseFloat(target.max);
    let min = parseFloat(target.min);
    return parseNumberInputField(value, min, max, def);
};
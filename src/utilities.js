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

module.exports.parseNumberInputField = function(value, props, def=0) {
    let max = parseFloat(props.max);
    let min = parseFloat(props.min);
    return parseNumberInputField(value, min, max, def);
};
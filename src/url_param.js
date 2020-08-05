'use strict';

const {obj_fromEntries} = require('./utils');

/**
 * parse_query
 * 
 * @param {string} query string
 * @return {object} array of key-value pairs
 * 
 * This parser allow multi fields, like:
 * parse "key=1&key=2" => [["key","1"], [["key","2"]]]
 *
 * XXX: no escape, currently this code assume ASCII only.
 * no need until implement a "name" parameter.
 *
 * NOTE: this function does not treat "?",
 * make a slice argument caller side:
 * `parse_query("?id=0".slice(1))``
 */
function *parse_query(query) {
    for (let token of query.split(/[\&\;]/)) {
        yield token.split(/=/);
    }
}


/**
 * get_url_parameter
 *
 * @param {string} query string
 * @return {object} parameters
 */
function get_url_parameter(query) {
    return obj_fromEntries(parse_query(query));
}

module.exports.parse_query = parse_query;
module.exports.get_url_parameter = get_url_parameter;
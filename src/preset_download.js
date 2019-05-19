'use strict';

import {dict_get} from './utils';

// NOTE: This file use jquery $.ajax and location.hash
// I do not make unittest for now, need to install mock.


/**
 * download_getdata
 * @param {string} category UNUSED
 * @param {string} id
 * @return {Promise}
 *
 * An original server get data method used for ?id= parameger.
 * Server return Base64 encoded JSON data.
 */
function download_getdata(category, id) {
    let param = {
        url: "getdata.php",
        type: 'POST',
        dataType: 'text',
        cache: false,
        timeout: 10000,
        data: {id: id}
    };
    return $.ajax(param).then(Base64.decode);
}


/**
 * download_getjson
 * @param {string} category "all" for preset, or "summon", "chara", "armlist"
 * @param {string} name file name (without .json extension)
 * @return {Promise}
 *
 * - Directory layout under ./json
 *   - ./preset for preset and load=FILE
 *   - ./profile ./summon ./chara ./armlist for load=PART
 *
 * NOTE: this may require server setting MIME type for .json
 */
function download_getjson(category, name) {
    const path = "./json/" + category.replace("all", "preset") + "/" + name + ".json";
    let param = {
        url: path,
        type: 'GET',
        dataType: 'text',
        cache: false,
        timeout: 10000
    };
    return $.ajax(param);
}


/**
 * download_fragment
 * @param {string} category UNUSED
 * @param {string} _ UNUSED
 * @return {string} base64 decoded URL fragment.
 */
async function download_fragment(category, _) {
    return Base64.decode(location.hash);
}


const _DOWNLOAD_METHOD = {
    "post-id": download_getdata,
    "get-json": download_getjson,
    "fragment": download_fragment,
};


/**
 * promise_download
 * @param {string} request_type "post-id", "get-json", "fragment"
 * @param {string} category "all" or {"profile", "summon", "chara", "armlist"}
 * @param {string} args argument pass to download method.
 * @return {Promise}
 *
 * - Success case: result data is pass to JSON parse
 * - Error case: an empty object is returned as the result.
 *   - when request_type key not found -> return "{}" pass to JSON parse.
 *   - download failed -> an empty object
 *
 * TODO: report error to console, now it's a quick dirty way.
 */
export function promise_download(request_type, category, args) {
    let download = dict_get(_DOWNLOAD_METHOD, request_type, async () => "{}");
    return download(category, args).then(JSON.parse).catch(() => {});
}

'use strict';

import {Base64} from 'js-base64';
import {dict_get} from './utils';

// NOTE: This file use jquery $.ajax and location.hash
// I do not make unittest for now, need to install mock.



const DESERIALIZE_METHOD = JSON.parse;

const DECODE_METHOD = Base64.decode;


/**
 * download_getdata
 * @param {string} directory UNUSED
 * @param {string} id
 * @return {Promise}
 *
 * An original server get data method used for ?id= parameger.
 * Server return Base64 encoded JSON data.
 */
function download_getdata(directory, id) {
    let param = {
        url: "getdata.php",
        type: 'POST',
        dataType: 'text',
        cache: false,
        timeout: 10000,
        data: {id: id}
    };
    return $.ajax(param).then(DECODE_METHOD);
}


/**
 * download_getjson
 * @param {string} directory {"preset", "test", "profile", "summon", "chara", "armlist"}
 * @param {string} name file name (without .json extension)
 * @return {Promise}
 *
 * - Directory layout under ./json
 *   - ./preset for preset and load=FILE
 *   - ./profile ./summon ./chara ./armlist for load=PART
 *
 * NOTE: this may require server setting MIME type for .json
 */
function download_getjson(directory, name) {
    const path = "./json/" + directory + "/" + name + ".json";
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
 * @param {string} directory UNUSED
 * @param {string} _ UNUSED
 * @return {string} base64 decoded URL fragment.
 */
async function download_fragment(directory, _) {
    return DECODE_METHOD(location.hash);
}


const _DOWNLOAD_METHOD = {
    "post-id": download_getdata,
    "get-json": download_getjson,
    "fragment": download_fragment,
};


/**
 * promise_download
 * @param {string} request_type "post-id", "get-json", "fragment"
 * @param {string} directory {"preset", "test", "profile", "summon", "chara", "armlist"}
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
export function promise_download(request_type, directory, args) {
    let download = dict_get(_DOWNLOAD_METHOD, request_type, async () => "{}");
    return download(directory, args).then(DESERIALIZE_METHOD).catch(() => {});
}

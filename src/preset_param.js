'use strict';

import {CATEGORIES} from './preset_consts';

/**
 * represent_load_command
 * @param {object} param
 * @param {number} loadLimist=2
 *
 * param type
 *   - id: number
 *   - preset: string
 *   - load:
 *     - FILE: require "file" field
 *     - PART:
 *     - HASH: url fragment
 *     - PATCH: url fragment
 *
 * @return {array} token [command, category, request, args]
 *
 * retuen type
 *   - command: "REPLACE", "MERGE", "APPEND" ("APPEND" is not used now)
 *   - category: "all" or {"profile", "summon", "chara", "armlist"}
 *   - directory: 
 *   - request:
 *     - "post-id": is used in the original save to server method.
 *     - "get-json": require "category" field.
 *     - "fragment": read from URL fragment
 *
 * NOTE: loadLimit block invalid parameter like FILE,FILE,FILE ...
 * It's only two type is allowed.
 */
export function *represent_load_command(param, loadLimit=2) {
    if ("id" in param) {
        yield ["REPLACE", "all", undefined, "post-id", param.id];
    } else if ("test" in param) {
        yield ["REPLACE", "all", "test", "get-json", param.test];
    } else if ("preset" in param) {
        yield ["REPLACE", "all", "preset", "get-json", param.preset];
    } else if ("load" in param) {
        for (let load_type of param.load.split(/,/, loadLimit)) {
            switch (load_type) {
            case "PART":
                for (let key of CATEGORIES) {
                    if (key in param) {
                        yield ["MERGE", key, key, "get-json", param[key]];
                    }
                }
                break;
            case "PATCH":
                yield ["MERGE", "all", undefined, "fragment", undefined];
                break;
            case "HASH":
                yield ["REPLACE", "all", undefined, "fragment", undefined];
                break;
            case "FILE":
                load_type = ("file" in param) ? param.file : "";
                // fallthrough for "?load=name"
            default:
                yield ["REPLACE", "all", "preset", "get-json", load_type];
                break;
            }
        }
    }
}

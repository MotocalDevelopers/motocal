'use strict';

import {represent_load_command} from './preset_param';
import {promise_download} from './preset_download';
import {apply_patch_processor} from './preset_patch';
import {make_state} from './preset_state';


describe('preset_param', () => {
    test("represent_load_command", () => {
        expect(Array.from(represent_load_command({id:0}))[0])
            .toEqual(["REPLACE", "all", undefined, "post-id", 0]);
        expect(Array.from(represent_load_command({preset:"name"}))[0])
            .toEqual(["REPLACE", "all", "preset", "get-json", "name"]);
        expect(Array.from(represent_load_command({load:"name"}))[0])
            .toEqual(["REPLACE", "all", "preset", "get-json", "name"]);
        expect(Array.from(represent_load_command({load:"FILE", file:"name"}))[0])
            .toEqual(["REPLACE", "all", "preset", "get-json", "name"]);
        expect(Array.from(represent_load_command({test:"name"}))[0])
            .toEqual(["REPLACE", "all", "test", "get-json", "name"]);
    });
});


describe('preset_download', () => {
    test("promise_download", () => {

    });
});


describe('preset_patch', () => {
    test("apply_patch_processor", () => {

    });
});


describe('preset_state', () => {
    test("make_state", () => {

    });
});

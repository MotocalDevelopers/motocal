'use strict';

// XXX: This test has an issue:
// SyntaxError on import statement,
// Because no babel transform in current configuration.

// import {represent_load_command} from './preset_param';
// import {promise_download} from './preset_download';
// import {apply_patch_processor} from './preset_patch';
// import {make_state} from './preset_state';


describe.skip('preset_param', () => {
    test("represent_load_command", () => {
        expect(Array.from(represent_load_command({id:0})))
            .toEquals(["REPLACE","all","post-id","0"]);
        expect(Array.from(represent_load_command({preset:"name"})))
            .toEquals(["REPLACE","all","get-json","name"]);
        expect(Array.from(represent_load_command({load:"name"})))
            .toEquals(["REPLACE","all","get-json","name"]);
        expect(Array.from(represent_load_command({load:"FILE",name:"name"})))
            .toEquals(["REPLACE","all","get-json","name"]);
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

'use strict';

const {zip, zip_longest, dict_get, obj_fromEntries, do_nothing} = require('./utils');


describe("utils.zip", () => {
    test("zip tow even list", () => {
        expect(zip([1,2,3],[4,5,6])).toEqual([[1,4],[2,5],[3,6]]);
    });

    test("a list is short", () => {
        expect(zip([1,2],[3,4,5])).toEqual([[1,3],[2,4]]);
    });

    test("a list is long", () => {
        expect(zip([1,2,3],[4,5])).toEqual([[1,4],[2,5],[3,undefined]]);
    });
});


describe("utils.zip_longest", () => {
    test("zip_longest", () => {
        expect(zip_longest([1,2,3],[4,5,6])).toEqual([[1,4],[2,5],[3,6]]);
    });

    test("a list is short", () => {
        // NOTE: zip_longest fit to the longest list
        expect(zip_longest([1,2],[3,4,5])).toEqual([[1,3],[2,4],[undefined,5]]);
    });

    test("a list is long", () => {
        expect(zip_longest([1,2,3],[4,5])).toEqual([[1,4],[2,5],[3,undefined]]);
    });

    test("fill value", () => {
        expect(zip_longest([1,2,3],[4,5],0)).toEqual([[1,4],[2,5],[3,0]]);
    });
});


describe("utils.dict_get", () => {
    test("dict_get", () => {
        expect(dict_get({a:10}, "a", 20)).toEqual(10);
        expect(dict_get({a:10}, "b", 20)).toEqual(20);
        expect(dict_get({}, "a", 20)).toEqual(20);
    });

    test("key in undefined throw error", () => {
        expect(() => dict_get(undefined, "a", 20)).toThrowError(TypeError);
    });
});


describe("utils.obj_fromEntries", () => {
    test("obj_fromEntries", () => {
        expect(obj_fromEntries([[1,2],[3,4]])).toEqual({1:2, 3:4});
    });
});


describe("utils.do_nothing", () => {
    test("pass", () => {
        // how to test this? just for coverage.
        expect(do_nothing()).toBe(undefined);
    });
});

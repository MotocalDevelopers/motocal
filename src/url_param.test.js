'use strict';

const {parse_query, get_url_parameter} = require('./url_param');


describe("parse_query", () => {
    test("parse simple key-value query", () => {
        expect(Array.from(parse_query("key=val"))).toEqual([["key","val"]]);
    });

    test("parse & separated fields", () => {
        expect(Array.from(parse_query("key1=val&key2=val"))).toEqual([["key1","val"],["key2","val"]]);
    });
    test("parse ; separated fields", () => {
        expect(Array.from(parse_query("key1=val;key2=val"))).toEqual([["key1","val"],["key2","val"]]);
    });

    test("empty value", () => {
        expect(Array.from(parse_query("key1=&key2&key3=val")))
            .toEqual([["key1",""],["key2"],["key3","val"]]);
    });

    test("empty value to object", () => {
        expect(get_url_parameter("key1=&key2&key3=val"))
            .toEqual({key1:"", key2:undefined, key3:"val"});
    });

    test("parse multi keys support", () => {
        // Currently, URL parameter is stored into a object.
        // so only the last key is available.
        // In future, if users wants to load several fileds.
        const query = "key=1&key=2&key=3";
        expect(Array.from(parse_query(query))).toEqual([["key","1"], ["key","2"], ["key","3"]]);
    });

    test("get simple key-value parameter object", () => {
        expect(get_url_parameter("key=val")).toEqual({"key":"val"});
    });

    test("parse actual query", () => {

        expect(get_url_parameter("id=0")).toEqual({id:"0"});
        expect(get_url_parameter("preset=test")).toEqual({preset:"test"});
        expect(get_url_parameter("load=FILE&name=test")).toEqual({load:"FILE",name:"test"});
        expect(get_url_parameter("load=FILE,PART&name=test&summon=magna-fire"))
            .toEqual({load:"FILE,PART",name:"test",summon:"magna-fire"});
        expect(get_url_parameter("load=FILE,PATCH&name=test"))
            .toEqual({load:"FILE,PATCH",name:"test"});
        expect(get_url_parameter("load=HASH")).toEqual({load:"HASH"});
        expect(get_url_parameter("load=PATCH")).toEqual({load:"PATCH"});

        // NOTE: URL fragment (location.hash) does not appear in location.search
        // no need to test the long encoded test.

        // NOTE: does not check invalid parameter e.g. load=FILE,HASH
    });
});


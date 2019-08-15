"use strict";

const {
    favContains,
    typeContains,
    raceContains,
    bahaRaceContains,

    raceCharaContains,
    bahaRaceCharaContains,
    bahaFURaceCharaContains,
    favCharaContains,
    typeCharaContains,

    // _contains, // no need, typeContains,raceContains are alias
    _hasWildcardSupport,
    _withWildcardCheck,
    _lookupBahaRaces,
    _skip_none_filter,
    _isDjeeta,
    _withDjeeta,
} = require('./skill_filter.js');

describe('internal utility functions', () => {
    // mock SUPPORT_KEYS for test
    const supportKeys = ["A", "B", "C"];

    // test data
    const charaA = {A: "none", B: "none", C: "wildcard"};
    const charaB = {A: "none", B: "none", C: "none", D: "wildcard"};

    describe('#_hasWildcardSupport', () => {
        it('should check wildcard in supports', () => {
            expect(_hasWildcardSupport(charaA, supportKeys)).toBeTruthy();
            expect(_hasWildcardSupport(charaB, supportKeys)).toBeFalsy(); // "D" is out of search path.
            expect(_hasWildcardSupport(charaB, ["D", ...supportKeys])).toBeTruthy(); // add "D" to search path.
        });
    });

    describe('#_withWildcardCheck', () => {
        it('should return true when wildcard', () => {
            let isTest = (args, chara) => args === "test";
            let isTestOrWildcard = _withWildcardCheck(isTest, supportKeys);
            // the decorater add wildcard check feature to the function,
            // it's like a generate wrapper for this case.

            expect(isTest("test", null)).toBeTruthy();
            expect(isTest("none", null)).toBeFalsy();
            expect(isTestOrWildcard("test", charaA)).toBeTruthy(); // "test" and "wildcard"
            expect(isTestOrWildcard("none", charaA)).toBeTruthy(); // "none" but "wildcard"
            expect(isTestOrWildcard("test", charaB)).toBeTruthy(); // non-wildcard, but "test"
            expect(isTestOrWildcard("none", charaB)).toBeFalsy();
        });
    });

    describe('#_lookupBahaRaces', () => {
        const relation = {
            "dagger": {"type1": "human", "type2": "erune"}
        };

        it('should return bafa races', () => {
            expect(_lookupBahaRaces("bahaFU-dagger", relation).sort()).toEqual(["erune", "human"]);
        });
    });

    describe('#_skip_none_filter', () => {
        expect(_skip_none_filter(["none", "A", "B", "non"])).toEqual(["A", "B", "non"]);
    });

    describe('#_isDjeeta', () => {
        expect(_isDjeeta('Djeeta')).toBeTruthy(); // only exact match
        expect(_isDjeeta('Gran')).toBeFalsy();
        expect(_isDjeeta('djeeta')).toBeFalsy();
        expect(_isDjeeta('Djeeta ')).toBeFalsy();
        expect(_isDjeeta(' Djeeta')).toBeFalsy();
    });

    describe('#_withDjeeta', () => {
        const checkFlag = _withDjeeta((flag, chara) => flag);
        expect(checkFlag.orDjeeta(false, {}, "Djeeta")).toBeTruthy(); // is Djeeta
        expect(checkFlag.orDjeeta(false, {}, "Gran")).toBeFalsy();
        expect(checkFlag.orDjeeta(true, {}, "Gran")).toBeTruthy();
    });
});


describe('low layer funcs', () => {
    describe('#typeContains', function() {
        // it's internally same with raceContains alias of _contains
        // here test different use case for "type"

        it('should be attack', () => {
            expect(typeContains("attack", "attack")).toBeTruthy();
        });

        it('should take array parameter', () => {
            // currently, no actual use case
            const types = ["attack", "defense"];
            expect(typeContains(types, "attack")).toBeTruthy();
            expect(typeContains(types, "defense")).toBeTruthy();
            expect(typeContains(types, "pecu")).toBeFalsy();
        });

        it('should take multiple type', () => {
            // currently, no actual use case
            const types = ["attack", "defense"];
            expect(typeContains("attack", "attack/defense")).toBeTruthy();
            expect(typeContains("defense", "attack/defense")).toBeTruthy();
            expect(typeContains("pecu", "attack/defense")).toBeFalsy();
        });

        // it's now unnecessary flexibility, if do not aim this behavior,
        // then we can export another function as typeContains()
    });

    describe('#raceContains', function() {
        it('should be human', () => {
            expect(raceContains("human", "human")).toBeTruthy();
            expect(raceContains("human", "erune")).toBeFalsy();
        });
        
        it('should check multiple races token', () => {
            expect(raceContains("human", "human/erune")).toBeTruthy();
            expect(raceContains("erune", "human/erune")).toBeTruthy();
        });

        it('should check array races parameter', () => {
            const races = ["human", "erune"];
            expect(raceContains(races, "human")).toBeTruthy();
            expect(raceContains(races, "erune")).toBeTruthy();
            expect(raceContains(races, "human/erune")).toBeTruthy();
            expect(raceContains(races, "unknown")).toBeFalsy();
        });
        
        // illegal cases, code review should avoid those usage.
        
        it('should false when value was undefined', () => {
            expect(raceContains(undefined, "human/erune")).toBeFalsy();
            expect(raceContains(undefined, undefined)).toBeFalsy();
        });
        
        it('does not care multiple race separator', () => {
            // XXX: should not use in global_logic.js
            // but this code will pass those notations.
            // we can check this at code review, function no need to be so strict.
            expect(raceContains("erune", "human|erune")).toBeTruthy();
            expect(raceContains("erune", "human_erune")).toBeTruthy();
            expect(raceContains("erune", "humanerune")).toBeTruthy();
        });
    });

    describe('#bahaRaceContains', () => {
        it('should check human/erune (baha)', () => {
            // baha: contains unknown,seisho implicitly
            const races = ["human", "erune"]; // baha dagger
            expect(bahaRaceContains(races, "unknown")).toBeTruthy();
            expect(bahaRaceContains(races, "seisho")).toBeTruthy();
            expect(bahaRaceContains(races, "human")).toBeTruthy();
            expect(bahaRaceContains(races, "erune")).toBeTruthy();
            expect(bahaRaceContains(races, "human/erune")).toBeTruthy();
            expect(bahaRaceContains(races, "havin")).toBeFalsy();
            expect(bahaRaceContains(races, "doraf")).toBeFalsy();
        });
    });

    describe('#favContains', () => {
        it('should check none', () => {
            expect(favContains("sword", ["fist", "sword"])).toBeTruthy();
            expect(favContains("fist", ["fist", "sword"])).toBeTruthy();
            expect(favContains("wand", ["fist", "sword"])).toBeFalsy();
        });

        // Illegal use case

        it('should check none', () => {
            // this function does not skip "none", it's an epected behavior.
            expect(favContains("none", ["fist", "none"])).toBeTruthy();
        });
    });
});


describe('chara check', () => {

    const charaData = {
        "Djeeta": {
            name: "Djeeta",
            race: "unknown",
            type: "pecu",
            fav1: "sword",
            fav2: "dagger",
            support: "none",
            support2: "none",
            support3: "none",
        },
        "A-erune-pecu": {
            name: "A",
            race: "erune",
            type: "pecu",
            fav1: "sword",
            fav2: "katana",
            support: "none",
            support2: "none",
            support3: "none",
        },
        "B-human-attack": {
            name: "B",
            race: "human",
            type: "attack",
            fav1: "fist",
            fav2: "none",
            support: "none",
            support2: "none",
            support3: "none",
        },
        "C-wildcard": {
            name: "C",
            race: "human",
            type: "attack",
            fav1: "fist",
            fav2: "wand",
            support: "none",
            support2: "wildcard", // set in support2 field for test case
            support3: "none",
        },
        "D-havin-pecu": {
            name: "D",
            race: "havin",
            type: "pecu",
            fav1: "sword",
            fav2: "none",
            support: "none",
            support2: "none",
            support3: "none",
        },
    };

    describe('#raceCharaContains', () => {
        it('should check race human (string parameter)', () => {
            const races = "human";
            expect(raceCharaContains(races, charaData["Djeeta"])).toBeFalsy();
            expect(raceCharaContains(races, charaData["A-erune-pecu"])).toBeFalsy();
            expect(raceCharaContains(races, charaData["B-human-attack"])).toBeTruthy();
            expect(raceCharaContains(races, charaData["C-wildcard"])).toBeTruthy();
        });

        it('should check race human (array parameter)', () => {
            const races = ["human"];
            expect(raceCharaContains(races, charaData["Djeeta"])).toBeFalsy();
            expect(raceCharaContains(races, charaData["A-erune-pecu"])).toBeFalsy();
            expect(raceCharaContains(races, charaData["B-human-attack"])).toBeTruthy();
            expect(raceCharaContains(races, charaData["C-wildcard"])).toBeTruthy();
        });
    });

    describe('#typeCharaContains', () => {
        it('should check type attack', () => {
            expect(typeCharaContains("attack", charaData["Djeeta"])).toBeFalsy();
            expect(typeCharaContains("attack", charaData["A-erune-pecu"])).toBeFalsy();
            expect(typeCharaContains("attack", charaData["B-human-attack"])).toBeTruthy();
            expect(typeCharaContains("attack", charaData["C-wildcard"])).toBeTruthy();
        });
    });

    describe('#favCharaContains', () => {
        it('should check fav katana (string parameter)', () => {
            const favs = "katana";
            expect(favCharaContains(favs, charaData["Djeeta"])).toBeFalsy();
            expect(favCharaContains(favs, charaData["A-erune-pecu"])).toBeTruthy();
            expect(favCharaContains(favs, charaData["B-human-attack"])).toBeFalsy();
            expect(favCharaContains(favs, charaData["C-wildcard"])).toBeTruthy();
        });

        it('should check fav sword/dagger (array parameter)', () => {
            const favs = ["sword", "dagger"];
            expect(favCharaContains(favs, charaData["Djeeta"])).toBeTruthy();
            expect(favCharaContains(favs, charaData["A-erune-pecu"])).toBeTruthy();
            expect(favCharaContains(favs, charaData["B-human-attack"])).toBeFalsy();
            expect(favCharaContains(favs, charaData["C-wildcard"])).toBeTruthy();
        });

        it('should check fav sword/dagger (string parameter)', () => {
            const favs = "sword/dagger";
            expect(favCharaContains(favs, charaData["Djeeta"])).toBeTruthy();
            expect(favCharaContains(favs, charaData["A-erune-pecu"])).toBeTruthy();
            expect(favCharaContains(favs, charaData["B-human-attack"])).toBeFalsy();
            expect(favCharaContains(favs, charaData["C-wildcard"])).toBeTruthy();
        });

        // Illegal use case (reviewers should check such wrong usage)

        it('should skip none', () => {
            const favs = "none"; // XXX: must not none
            expect(favCharaContains(favs, charaData["Djeeta"])).toBeFalsy();
            expect(favCharaContains(favs, charaData["A-erune-pecu"])).toBeFalsy();
            expect(favCharaContains(favs, charaData["B-human-attack"])).toBeFalsy(); // has none but skipped
            expect(favCharaContains(favs, charaData["C-wildcard"])).toBeTruthy(); // does not have none, but wildcard
        });

        // XXX: Production code must not do such "none" checking,
        // it's useful only for utility script check "none" fields, require "none" matching.
        // but useless for wildcard (it's race case)
    });

    describe('baha weapons', () => {
        describe('#raceBahaCharaContains', () => {
            it('should check baha dagger', () => {
                const skillname = "bahaAT-dagger";
                expect(bahaRaceCharaContains(skillname, charaData["Djeeta"])).toBeTruthy();
                expect(bahaRaceCharaContains(skillname, charaData["A-erune-pecu"])).toBeFalsy();
                expect(bahaRaceCharaContains(skillname, charaData["B-human-attack"])).toBeTruthy();
                expect(bahaRaceCharaContains(skillname, charaData["C-wildcard"])).toBeTruthy();
                expect(bahaRaceCharaContains(skillname, charaData["D-havin-pecu"])).toBeFalsy();
            });
        });

        describe('#raceFUBahaCharaContains', () => {
            it('should check baha dagger FU', () => {
                const skillname = "bahaFUATHP-dagger";
                expect(bahaFURaceCharaContains(skillname, charaData["Djeeta"])).toBeTruthy();
                expect(bahaFURaceCharaContains(skillname, charaData["A-erune-pecu"])).toBeTruthy();
                expect(bahaFURaceCharaContains(skillname, charaData["B-human-attack"])).toBeTruthy();
                expect(bahaFURaceCharaContains(skillname, charaData["C-wildcard"])).toBeTruthy();
                expect(bahaFURaceCharaContains(skillname, charaData["D-havin-pecu"])).toBeFalsy();
            });
        });
    });
});

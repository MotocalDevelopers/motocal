const {_generateCharaFilterFunc} = require("./template.js");

describe("_generateCharaFilterFunc", () => {

    const defaultState = {
        filterText: "",
        filterElement: "all",
        filterSex: "all",
        filterType: "all",
        filterRace: "all",
        filterFav: "all",
    };

    const Chara = (name, element, sex, type, race, fav1="", fav2="") => ({
        ja: name, en: name, zh: name,
        element, sex, type, race,
        fav1: fav1, fav2: fav2,
    });

    const charaData = {
        "A": Chara("A", "fire", "male", "balance", "human", "sword", "dagger"),
        "B": Chara("B", "fire", "female", "balance", "human", "bow", "katana"),
        "C": Chara("C", "fire", "male", "balance", "human", "music", "staff"),
        "D": Chara("D", "dark", "male/female", "attack", "erune", "gun", "sword"),
    };

    it("filter by name", () => {
        const state = Object.assign({}, defaultState, {filterText: "A"});
        const func = _generateCharaFilterFunc(state);
        const result = Array.from(Object.entries(charaData).filter(func));

        expect(result.length).toBe(1);
    });

    it("filter by fire element", () => {
        const state = Object.assign({}, defaultState, {filterElement: "fire"});
        const func = _generateCharaFilterFunc(state);
        const result = Array.from(Object.entries(charaData).filter(func));

        expect(result.length).toBe(3);
    });

    it("filter by sex", () => {
        const state = Object.assign({}, defaultState, {filterSex: "female"});
        const func = _generateCharaFilterFunc(state);
        const result = Array.from(Object.entries(charaData).filter(func));

        expect(result.length).toBe(2);
    });

    it("filter by type", () => {
        const state = Object.assign({}, defaultState, {filterType: "balance"});
        const func = _generateCharaFilterFunc(state);
        const result = Array.from(Object.entries(charaData).filter(func));

        expect(result.length).toBe(3);
    });

    it("filter by race", () => {
        const state = Object.assign({}, defaultState, {filterRace: "human"});
        const func = _generateCharaFilterFunc(state);
        const result = Array.from(Object.entries(charaData).filter(func));

        expect(result.length).toBe(3);
    });

    it("filter by favorite weapon", () => {
        const state = Object.assign({}, defaultState, {filterFav: "sword"});
        const func = _generateCharaFilterFunc(state);
        const result = Array.from(Object.entries(charaData).filter(func));

        expect(result.length).toBe(2);
    });
});
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

    const search = (userSelect) => {
        const state = Object.assign({}, defaultState, userSelect);
        const func = _generateCharaFilterFunc(state);
        return Array.from(Object.entries(charaData).filter(func));
    };

    test("filter by name", () => {
        const result = search({filterText: "A"});
        expect(result.length).toBe(1);
    });

    test("filter by fire element", () => {
        const result = search({filterElement: "fire"});
        expect(result.length).toBe(3);
    });

    test("filter by sex", () => {
        expect(search({filterSex: "male"}).length).toBe(3);
        expect(search({filterSex: "female"}).length).toBe(2);
        expect(search({filterSex: "male/female"}).length).toBe(1);
    });

    test("filter by type", () => {
        const result = search({filterType: "balance"});
        expect(result.length).toBe(3);
    });

    test("filter by race", () => {
        const result = search({filterRace: "human"});
        expect(result.length).toBe(3);
    });

    test("filter by favorite weapon", () => {
        const result = search({filterFav: "sword"});
        expect(result.length).toBe(2);
    });
});
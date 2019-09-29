const {_generateArmFilterFunc} = require("./template.js");


describe("_generateArmFilterFunc", () => {

    // generate arm entry data for this test.
    const Arm = (name, element, series, type) => ({
        ja: name, en: name, zh: name, element, series, type});

    const defaultState = {
        filterText: "",
        filterElement: "all",
        filterArmType: "all",
        filterSeries: "all",
    };

    const armData = {
        "A": Arm("A", "dark", "vintage", "sword"),
        "B": Arm("B", "light", "grand", "sword"),
        "C": Arm("C", "dark", "vintage", "sword"),
        "D": Arm("D", "dark", "vintage", "sword"),
        "E": Arm("E", "all", "grand", "sword"),
    };

    it("filter arm by text", () => {
        const state = Object.assign({}, defaultState, {filterText: "A"});
        const func = _generateArmFilterFunc(state);
        const result = Array.from(Object.entries(armData).filter(func));

        expect(result.length).toBe(1);
    });

    it("filter arm by dark element", () => {
        const state = Object.assign({}, defaultState, {filterElement: "dark"});
        const func = _generateArmFilterFunc(state);
        const result = Array.from(Object.entries(armData).filter(func));

        expect(result.length).toBe(4); // 3 dark + 1 all
    });

    it("filter arm by series", () => {
        const state = Object.assign({}, defaultState, {filterSeries: "grand"});
        const func = _generateArmFilterFunc(state);
        const result = Array.from(Object.entries(armData).filter(func));

        expect(result.length).toBe(2);
    });

    it("filter arm by type", () => {
        const state = Object.assign({}, defaultState, {filterArmType: "sword"});
        const func = _generateArmFilterFunc(state);
        const result = Array.from(Object.entries(armData).filter(func));

        expect(result.length).toBe(5);
    });
});

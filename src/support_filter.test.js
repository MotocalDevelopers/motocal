const {range, when} = require("./support_filter.js");


describe("support.range", () => {
    
    const totals = {
        "Djeeta": {
            element: "light",
            fav1: "sword",
            fav2: "axe",
            race: "unknown",
            sex: "female",
            isConsideredInAverage: true,
        },
        "CharaA": {
            element: "light",
            fav1: "sword",
            fav2: "",
            race: "unknown",
            sex: "female",
            isConsideredInAverage: true,
        },
        "CharaB": {
            element: "fire",
            fav1: "sword",
            fav2: "fist",
            race: "doraf",
            sex: "male",
            isConsideredInAverage: true,
        },
        "CharaC": {
            element: "wind",
            fav1: "katana",
            fav2: "fist",
            race: "havin",
            sex: "other",
            isConsideredInAverage: true,
        },
    }
    
    it("range_own", () => {
        const result = range.own(totals, "Djeeta");
        const [name, chara] = result[0];
        expect(chara).toBe(totals["Djeeta"]);
    });
    
    it("range_all", () => {
        expect(range.all(totals, "Djeeta").length).toBe(4);
    });
    
    it("range_others", () => {
        expect(range.others(totals, "Djeeta").length).toBe(3);
    });

    it("range_none", () => {
        expect(range.none(totals, "Djeeta").length).toBe(0);
    })

    it("range_Djeeta", () => {
        expect(range.Djeeta(totals, "CharaA").length).toBe(1);
    })
    
    it("range_light", () => {
        expect(range.element.light(totals, "Djeeta").length).toBe(2);
    });
    
    it("range_fist", () => {
        expect(range.fav("fist")(totals, "Djeeta").length).toBe(2);
    });

    it("range_race", () => {
        expect(range.race("unknown")(totals, "Djeeta").length).toBe(2);
    });
    
    it("range_custom", () => {
        const range_female = range.custom(v => v.sex === "female");
        expect(range_female(totals, "Djeeta").length).toBe(2);
    });
});


describe("support.when", () => {
    it("when.element_buff", () => {
        expect(when.element_buff({elementBuff:0}, {element:0})).toBeFalsy();
        expect(when.element_buff({elementBuff:1}, {element:0})).toBeTruthy();
        expect(when.element_buff({elementBuff:0}, {element:1})).toBeTruthy();
    });
});

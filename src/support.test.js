const {eachSupport, flattenCompositeSupport} = require("./support");

const dummy_supportAbilities = {
    "none": {
        name: "none",
        type: "none",
        value: null
    },
    "supportA": {
        name: "A",
        type: "normalBuff",
        value: 0.25
    },
    "supportB": {
        name: "B",
        type: "damageUP",
        value: 0.5
    },
    "supportC": {
        name: "C",
        type: "elementBuffBoostBuff",
        when: "element_buff",
        range: "all",
        value: 0.3
    },
    "supportD": {
        name: "D",
        type: "critical",
        value: {value: 0.2, attackRatio: 0.2}
    },
    "test-composite": {
        type: "composite",
        value: [
            {ID: "supportA"},
            {ID: "supportB"},
        ]
    },
    "test-recursive": { // for test Bad data
        type: "composite",
        value: [
            {ID: "supportA"},
            {ID: "test-recursive"},
        ] 
    }
};

// Mock environment
// supportAbilities table may be changed, we use dummy table for tests.
// -> function argument is designed to be weak-dependency (no use global, or at least plugable)


// bind 2nd argument for this test.
const _flattenCompositeSupport = (root) => flattenCompositeSupport(root, dummy_supportAbilities);

// bind _flatten argument for this test (_eachSupport also use dummy_supportAbilities table)
const _eachSupport = (chara) => eachSupport(chara, _flattenCompositeSupport);


describe("#flattenCompositeSupport", () => {

    it("test simple support array", () => {
        const root = ["none", "supportA", "supportB", "supportA", "supportC"].map(val => ({ID: val}));
        // skip: none
        // skip: dupplicated supportA within composite
        // result will be supportA, supportB, supportC
        const result = _flattenCompositeSupport(root);

        expect(Array.from(result).length).toBe(3);
    });

    it("test nested composite", () => {
        const support = {
            type: "composite",
            value: [{ID: "test-composite"}],
        };
        const result = _flattenCompositeSupport([support]);

        expect(Array.from(result).length).toBe(2);
    });

    it("test recursive composite", () => {
        const result = _flattenCompositeSupport([{ID:"test-recursive"}]);

        expect(Array.from(result).length).toBe(1);
    });
});

describe("#eachSupport", () => {

    const chara = {
        "Djeeta": {
            "support": "supportA",
            "support2": "none",
            "support3": "none",
        },
        "A": {
            "support": "supportA",
            "support2": "supportB",
            "support3": "supportC",
        },
        "B": {
            "support": "supportA",
            "support2": "supportB",
            "support3": "test-composite",
        },
    };

    it("count total supports", () => {
        expect(Array.from(_eachSupport(chara["Djeeta"])).length).toBe(1);
        expect(Array.from(_eachSupport(chara["A"])).length).toBe(3);
        expect(Array.from(_eachSupport(chara["B"])).length).toBe(4);
    });
});

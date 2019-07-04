const Utilities = require('./utilities');

describe("#Utility Methods", () => {
    describe("#getLabelFromId", () => {
        test('Empty selector', () => {
            expect(Utilities.getLabelFromId([], "1")).toBe("1");
        });

        test('Empty Id', () => {
            expect(Utilities.getLabelFromId([{label: "a", id: "1"}, {label: "b", id: "2"}, {
                label: "c",
                id: "3"
            }], "")).toBe("");
        });

        test('No Match', () => {
            expect(Utilities.getLabelFromId([{label: "a", id: "1"}, {label: "b", id: "2"}, {
                label: "c",
                id: "3"
            }], "4")).toBe("4");
        });

        test('Match', () => {
            expect(Utilities.getLabelFromId([{label: "a", id: "1"}, {label: "b", id: "2"}, {
                label: "c",
                id: "3"
            }], "1")).toBe("a");
            expect(Utilities.getLabelFromId([{label: "a", id: "1"}, {label: "b", id: "2"}, {
                label: "c",
                id: "3"
            }], "2")).toBe("b");
            expect(Utilities.getLabelFromId([{label: "a", id: "1"}, {label: "b", id: "2"}, {
                label: "c",
                id: "3"
            }], "3")).toBe("c");
        });
    });

    describe("#arrayContainsValue", () => {
        let arr = ["banana", "manana", "messi", "saviola", "ronaldo"];
        test('Exact Match', () => {
            expect(Utilities.arrayContainsValue(arr, "manana")).toBeTruthy()
        });

        test('No Match', () => {
            expect(Utilities.arrayContainsValue(arr, "time")).toBeFalsy()
        });

        test('String item contains key', () => {
            expect(Utilities.arrayContainsValue(arr, "lionel messi")).toBeTruthy()
        });

        test('String key contains item', () => {
            expect(Utilities.arrayContainsValue(arr, "ola")).toBeTruthy()
        });
    });

    describe("#filterObjectsFromSave", () => {
        let save = [];

        beforeEach(() => {
            save = {
                name: "mike", surname: "tyson", body: {
                    height: "177", heightField: "heightRef",
                    weight: "86kg", weightField: "weightRef"
                }, boxerField: "boxRef", gloves: "red",
                ui: [{time: 10, timeField: "tk"}, {time: 5, timeField: "aj"}]
            };
        });

        test('Filter', () => {
            Utilities.filterObjectsFromSave(save, ["Field"]);
            expect(save.hasOwnProperty("name")).toBeTruthy();
            expect(save.hasOwnProperty("surname")).toBeTruthy();
            expect(save.body.hasOwnProperty("height")).toBeTruthy();
            expect(save.body.hasOwnProperty("heightField")).toBeFalsy();
            expect(save.body.hasOwnProperty("weight")).toBeTruthy();
            expect(save.body.hasOwnProperty("weightField")).toBeFalsy();
            expect(save.hasOwnProperty("boxerField")).toBeFalsy();
            expect(save.hasOwnProperty("gloves")).toBeTruthy();
            expect(save.ui[0].hasOwnProperty("time")).toBeTruthy();
            expect(save.ui[0].hasOwnProperty("timeField")).toBeFalsy();
            expect(save.ui[1].hasOwnProperty("time")).toBeTruthy();
            expect(save.ui[1].hasOwnProperty("timeField")).toBeFalsy();
        });
    });

    describe("#getValidData", () => {

        describe('#getValidText', () => {
            test('Invalid String', () => {
                expect(Utilities.getValidText(undefined, undefined)).toBe("");
                expect(Utilities.getValidText(undefined, "TEXT")).toBe("TEXT");
                expect(Utilities.getValidText([], undefined)).toBe("");
                expect(Utilities.getValidText(undefined, [])).toBe("");
                expect(Utilities.getValidText(undefined)).toBe("");
            });

            test('Valid String', () => {
                expect(Utilities.getValidText("VALID", "NOT VALID")).toBe("VALID");
                expect(Utilities.getValidText("VALID", "")).toBe("VALID");
                expect(Utilities.getValidText("VALID", undefined)).toBe("VALID");
                expect(Utilities.getValidText("VALID")).toBe("VALID");
            });
        });

        describe('#getValidNumber', () => {
            test('Invalid Number', () => {
                expect(Utilities.getValidNumber("ABC", undefined, undefined, 1)).toBe(1);
                expect(Utilities.getValidNumber("ABC", undefined, undefined, "ABC")).toBe(0);
                expect(Utilities.getValidNumber(NaN, undefined, undefined, 1)).toBe(1);
                expect(Utilities.getValidNumber(Infinity, undefined, undefined, 1)).toBe(1);
                expect(Utilities.getValidNumber([], undefined, undefined, 1)).toBe(1);
                expect(Utilities.getValidNumber({}, undefined, undefined, 1)).toBe(1);
            });

            test('Valid Number', () => {
                expect(Utilities.getValidNumber(0, -100, 100, 5)).toBe(0);
                expect(Utilities.getValidNumber(101, -100, 100, 5)).toBe(100);
                expect(Utilities.getValidNumber(-101, -100, 100, 5)).toBe(-100);
                expect(Utilities.getValidNumber("ABC", -100, 100, -101)).toBe(-100);
                expect(Utilities.getValidNumber("ABC", -100, 100, 101)).toBe(100);
                expect(Utilities.getValidNumber(undefined, -100, 100, 5)).toBe(5);
            });
        });
    });
});
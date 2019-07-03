
const fix = require("./fix-options");


describe("#fix-options", () => {
    test("skip empty text and flatten", () => {
        expect(fix(["", [1,2,3], ""])).toEqual([1, 2, 3]);
    });

    test("valid case", () => {
        expect(fix([1, 2, 3])).toEqual([1, 2, 3]);
    });
});

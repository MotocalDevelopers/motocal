const supplemental = require('./supplemental.js');
//{calcOthersDamage, calcThirdHitDamage, calcSupplementalDamage}
describe("#calcSupplementalDamage", () => {
    // generate temporary vals: [0, 0, 0, 0]
    const INITIAL_VALS = (length=4, value=0) => (new Array(length)).fill(value);

    let supplementalDamageArray;

    beforeEach(() => {
        supplementalDamageArray = {
            "test-buff-a": {
                damage: 10,
                damageWithoutCritical: 10,
                ougiDamage: 100,
                chainBurst: 200,
                type: "other",
            },
            "test-buff-b": {
                damage: 20,
                damageWithoutCritical: 20,
                ougiDamage: 200,
                chainBurst: 300,
                type: "other",
            },
        };
    });
  
    describe("#calcOthersDamage", () => {
        it("test single hit supplemental damage", () => {
            let vals = supplemental.calcOthersDamage(supplementalDamageArray, INITIAL_VALS());
            expect(vals.length).toBe(4);
            expect(vals).toEqual([30, 30, 300, 500]);
        });
  
        it("test hp based supplemental damage", () => {
            supplementalDamageArray['test-buff-a']['type'] = 'hp_based';
            supplementalDamageArray['test-buff-a']['threshold'] = 0.80;
            
            let vals = supplemental.calcOthersDamage(supplementalDamageArray, INITIAL_VALS());
            expect(vals).toEqual([30, 30, 300, 500]);
        
            // border check
            //
            // NG: if (! remainHP >= 0.80) ... this expression true in remainHP=0.79
            // OK: if (! (remainHP >= 0.80))
            //
            // Why not (remainHP < 0.80) ... Spec explains it's 80%+
            vals = supplemental.calcOthersDamage(supplementalDamageArray, INITIAL_VALS(), {remainHP:0.80});
            expect(vals).toEqual([30, 30, 300, 500]);
            vals = supplemental.calcOthersDamage(supplementalDamageArray, INITIAL_VALS(), {remainHP:0.79});
            expect(vals).toEqual([20, 20, 200, 300]);
        
            vals = supplemental.calcOthersDamage(supplementalDamageArray, INITIAL_VALS(), {remainHP:0.00});
            expect(vals).toEqual([20, 20, 200, 300]);
        });
      
        it("test unknown type is ignored", () => {
            supplementalDamageArray['test-buff-a']['type'] = undefined;
            supplementalDamageArray['test-buff-b']['type'] = 'othr'; // assume typo case       
            
            // I noticed in this test.
            // Switch/Default case DOES NOT report thise typo, because "types" filter them.
            // So It never happen, If bind types parameter and export the partialed functions.
            //
            // Solution:
            //   - Enum in TypeScript can check the typo,
            //     but no Enum in JavaScript. (not run-time syntax emulation, compile/parse time check)
            //   - Flow enum?
            //
            // they are both heavy solution for this small issue.
            // E2E tests can check the typo.
          
            let vals = supplemental.calcOthersDamage(supplementalDamageArray, INITIAL_VALS());
            expect(vals).toEqual([0, 0, 0, 0]);
        });
    });

    describe("#calcThirdHitDamage", () => {
        it("test third hit supplemental damage", () => {
            supplementalDamageArray['test-buff-a']['type'] = 'third_hit';
 
            // default expectedTurn: 1
            let vals = supplemental.calcThirdHitDamage(supplementalDamageArray, INITIAL_VALS(2));
            expect(vals).toEqual([10, 10]);

            // safe to pass Infinity
            vals = supplemental.calcThirdHitDamage(supplementalDamageArray, INITIAL_VALS(2), {expectedTurn:Infinity});
            expect(vals).toEqual([10, 10]);

            // but not -Infinity (currently, not happen in actual global_logic.js)
            vals = supplemental.calcThirdHitDamage(supplementalDamageArray, INITIAL_VALS(2), {expectedTurn:-Infinity});
            expect(vals).toEqual([10, -Infinity]);
          
            vals = supplemental.calcThirdHitDamage(supplementalDamageArray, INITIAL_VALS(2), {expectedTurn:3});
            expect(vals).toEqual([10, 30]);
        });
    });
  
    // xit -> Skip test, `test.skip` for Jest
    xit("test unknown report", () => {
        supplementalDamageArray["test-buff-a"]["type"] = "unknown";
      
        let vals = supplemental._calcDamage(["unknown"], supplementalDamageArray, INITIAL_VALS());
        expect(vals).toEqual([0, 0, 0, 0]);
      
        // Console will show switch/default case, unknown supplemental damage type.
        // no much chances to typo those types.
    });
});

describe("#collectSkillInfo", () => {

    let supplementalDamageArray;

    beforeEach(() => {
        supplementalDamageArray = {
            "D": { // for checking sort headers
                damage: 10,
                type: "other", 
            },
            "B": {
                damage: 20,
                type: "hp_based",
                threshold: 0.80,
            },
            "E": {
                damage: 20,
                type: "on_critical",
                extraValue: 50.0
            },
            "C": {
                damage: 30,
                type: "third_hit",
            },
            "A": {
                damage: 0,
                type: "other",
            },
        };
    });
  
    it("test empty damageArray", () => {
        let supplementalInfo = supplemental.collectSkillInfo({});
 
        // This test show no chances supplementalInfo missing those headers.
        expect(supplementalInfo.headers).toEqual([]);
        expect(supplementalInfo.values).toEqual([]);
        expect(supplementalInfo.total).toEqual(0);
      
        // XXX: but not for collectSkillInfo(undefined), it throws TypeError
        // Lodash library has _.castArray function, that can ensure any object as array.
        // then omit the undefined check.
    });
  
    // TODO:
    // Jest has `test.each` to test similar cases for different data set.
    // https://jestjs.io/docs/ja/api#testeachtable-name-fn-timeout
    // (Jasmine in codepen.io did not support the same method)
    it("test damageArray remainHP 100%,50%", () => {
        const toKey = ([key, type, extraValue]) => key;
      
        let supplementalInfo = supplemental.collectSkillInfo(supplementalDamageArray, {remainHP: 1.00});
        expect(supplementalInfo.total).toEqual(80);
        expect(supplementalInfo.headers.map(toKey)).toEqual(["B", "C", "D", "E"]);
      
        supplementalInfo = supplemental.collectSkillInfo(supplementalDamageArray, {remainHP: 0.50});
        expect(supplementalInfo.total).toEqual(60);
        expect(supplementalInfo.headers.map(toKey)).toEqual(["C", "D", "E"]);
    });
});

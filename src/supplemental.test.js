var {calcSingleHitSupplementalDamage, calcThirdHitSupplementalDamage} = require('./supplemental.js');
describe("#calcSupplementalDamage", () => {
    // generate temporary vals: [0, 0, 0, 0]
    const INITIAL_VALS = (length=4, value=0) => (new Array(length)).fill(value);

    beforeEach(() => {
        this.supplementalDamageArray = {
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
  
    describe("#calcSingleHitSupplementalDamage", () => {
        it("test single hit supplemental damage", () => {
            let {supplementalDamageArray} = this;
            let vals = calcSingleHitSupplementalDamage(supplementalDamageArray, INITIAL_VALS());
            expect(vals.length).toBe(4);
            expect(vals).toEqual([30, 30, 300, 500]);
        });
  
        it("test hp based supplemental damage", () => {
            let {supplementalDamageArray} = this;
            supplementalDamageArray['test-buff-a']['type'] = 'hp_based';
            supplementalDamageArray['test-buff-a']['threshold'] = 0.80;
        
            let vals = calcSingleHitSupplementalDamage(supplementalDamageArray, INITIAL_VALS());
            expect(vals.length).toBe(4);
            expect(vals).toEqual([30, 30, 300, 500]);
        
            // border check, I correct code
            //
            // NG: if (! remainHP >= 0.80) ... this expression true in remainHP=0.79
            // OK: if (! (remainHP >= 0.80))
            //
            // Why not (remainHP < 0.80) ... Spec explains it's 80%+
            vals = calcSingleHitSupplementalDamage(supplementalDamageArray, INITIAL_VALS(), {remainHP:0.80});
            expect(vals).toEqual([30, 30, 300, 500]);
            vals = calcSingleHitSupplementalDamage(supplementalDamageArray, INITIAL_VALS(), {remainHP:0.79});
            expect(vals).toEqual([20, 20, 200, 300]);
        
            vals = calcSingleHitSupplementalDamage(supplementalDamageArray, INITIAL_VALS(), {remainHP:0.00});
            expect(vals).toEqual([20, 20, 200, 300]);
        });
      
        it("test unknown type", () => {
            let {supplementalDamageArray} = this;
            supplementalDamageArray['test-buff-a']['type'] = undefined;
            supplementalDamageArray['test-buff-b']['type'] = 'othr'; // assume typo case            
            
            // I noticed in this test.
            // Switch/Default case DOES NOT report thise typo, because "types" filter them.
            // So It never happen, If bind types parameter and export the partialed functions.
          
            let vals = calcSingleHitSupplementalDamage(supplementalDamageArray, INITIAL_VALS());
            expect(vals).toEqual([0, 0, 0, 0]);
        });
    });

    describe("#calcThirdHitSupplementalDamage", () => {
        it("test third hit supplemental damage", () => {
            let {supplementalDamageArray} = this;
            supplementalDamageArray['test-buff-a']['type'] = 'third_hit';
 
            // default expectedTurn: 1
            let vals = calcThirdHitSupplementalDamage(supplementalDamageArray, INITIAL_VALS(2));
            expect(vals).toEqual([10, 10]);

            // safe to pass Infinity
            vals = calcThirdHitSupplementalDamage(supplementalDamageArray, INITIAL_VALS(2), {expectedTurn:Infinity});
            expect(vals).toEqual([10, 10]);

            // bat not -Infinity (currently, not happen in actual global_logic.js)
            vals = calcThirdHitSupplementalDamage(supplementalDamageArray, INITIAL_VALS(2), {expectedTurn:-Infinity});
            expect(vals).toEqual([10, -Infinity]);
          
            vals = calcThirdHitSupplementalDamage(supplementalDamageArray, INITIAL_VALS(2), {expectedTurn:3});
            expect(vals).toEqual([10, 30]);
        });
    });
});
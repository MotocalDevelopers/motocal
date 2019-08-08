
const {
    isEpicWeapon,
    isWandType,
    countEpicWeapon,
    countWandType,
    isAllUniqueArm,
    countUniqueArmType,
    countUniqueComb,
    isAllUniqueArmType,
} = require('./epic');


// Dummy arm data for tests
const Arm = (armType) => ({armType});
const EpicArm = (armType) => ({series:"epic", armType});


describe('New Epic Weapons skills', () => {
  
    const ALL_ARM_TYPES = ["spear", "bow", "axe", "dagger", "wand", "fist", "sword", "katana", "music", "gun"];
    // console.assert(ALL_ARM_TYPES.length === 10);
    
    const allUniqueTypes = {
        arml: ALL_ARM_TYPES.map(EpicArm),
        comb: ALL_ARM_TYPES.map(() => 1),
    };
    
    describe('#isEpicWeapon', () => {
        it('checks the series is "epic"', () => {
            expect(isEpicWeapon(EpicArm("sword"))).toBeTruthy();
            expect(isEpicWeapon(Arm("sword"))).toBeFalsy();
        });
    });
    
    describe('#isWandType', () => {
        it('checks armType is "wand"', () => {
            expect(isWandType(EpicArm("wand"))).toBeTruthy();
            expect(isWandType(Arm("wand"))).toBeTruthy();
            expect(isWandType(EpicArm("sword"))).toBeFalsy();
            expect(isWandType(Arm("dagger"))).toBeFalsy();
        });
    });
    
    describe('#countEpicWeapon', () => {
        it('checks total 3 epic weapons', () => {
            const arml = [EpicArm(), EpicArm(), Arm(), Arm()];
            const comb = [1, 2, 2, 1];
            expect(countEpicWeapon(arml, comb)).toBe(3);
        });
    });

    describe('#countWandWeapon', () => {
        it('checks total 3 wand weapons', () => {
            const arml = [EpicArm("sword"), EpicArm("wand"), Arm("dagger"), Arm("wand")];
            const comb = [1, 2, 2, 1];
            expect(countEpicWeapon(arml, comb)).toBe(3);
        });
    });
    
    describe('#countUniqueArmType', () => {
        it('checks all unique armType', () => {
            const {arml, comb} = allUniqueTypes;
            expect(countUniqueArmType(arml, comb)).toBe(10);
            expect(countUniqueComb(comb)).toBe(10);
            expect(isAllUniqueArmType(arml, comb)).toBeTruthy();
        });
    });
});

// TODO: add more unit tests, exception cases.

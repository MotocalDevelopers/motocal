
const {
    _strip_arm_name,
    isEpicWeapon,
    isWandType,
    countEpicWeapon,
    countWandType,
    countUniqueArm,
    countUniqueArmType,
    countUniqueComb,
    isAllUniqueArm,
    isAllUniqueArmType,
} = require('./epic');


// Dummy arm data for tests
const Arm = (armType, name="") => ({name:name||armType, armType});
const EpicArm = (armType, name="") => Object.assign(Arm(armType, name), {series:"epic"})


describe('New Epic Weapons skills', () => {
  
    const ALL_ARM_TYPES = ["spear", "bow", "axe", "dagger", "wand", "fist", "sword", "katana", "music", "gun"];
    // console.assert(ALL_ARM_TYPES.length === 10);
    
    const allUniqueTypes = {
        arml: ALL_ARM_TYPES.map(EpicArm),
        comb: ALL_ARM_TYPES.map(() => 1),
    };

    describe('#_strip_arm_name', () => {
        it('checks ignore plus and whitespaces', () => {
            expect(_strip_arm_name("AAA+99")).toBe("AAA");
            expect(_strip_arm_name("AAA +99")).toBe("AAA");
            expect(_strip_arm_name("AAA + 99")).toBe("AAA");
            expect(_strip_arm_name("AAA + 99 ")).toBe("AAA");
        });
        // TODO: ignore lv/slv
        // TODO: ignore uncap? (require verification)
        // TODO: ignore element change name (require verification)
    });
    
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
            expect(countUniqueComb(arml, comb)).toBe(10);
            expect(isAllUniqueArmType(arml, comb)).toBeTruthy();
        });

        it('should ignore blank slots', () => {
            // initial setting has blank slots
            const arml = [Arm("sword"), Arm("dagger"), Arm("axe"), Arm(), Arm(), Arm()];
            const comb = [1, 1, 1, 1, 1, 1];
            expect(countUniqueArmType(arml, comb)).toBe(3);
            expect(countUniqueComb(arml, comb)).toBe(3);
            expect(isAllUniqueArmType(arml, comb)).toBeTruthy();
        });

        it('should detect same weapon in different entry', () => {
            const arml = [Arm("sword"), Arm("axe", name="AAA"), Arm("axe", name="AAA+99")];
            const comb = [1, 1, 1];
            expect(countUniqueArm(arml, comb)).toBe(2);
            expect(countUniqueComb(arml, comb)).toBe(3);
        });
    });
});

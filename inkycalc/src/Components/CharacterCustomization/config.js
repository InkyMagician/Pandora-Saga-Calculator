// config.js

export const gearWithEnchantAndSoul = [
    'helmet',
    'torso',
    'pants',
    'gloves',
    'boots',
    'shield',
    'weapon'
];

export const armorEnchantmentRules = {
    1: 1,
    2: 2,
    3: 3,
    4: 5,
    5: 7,
    6: 9,
    7: 12,
    8: 16,
    9: 21,
    10: 27
};

export const defaultBaseStats = {
    Human: {
        Warrior: { STA: 7, STR: 8, AGI: 4, DEX: 6, SPI: 4, INT: 5 },
        Scout: { STA: 5, STR: 7, AGI: 6, DEX: 7, SPI: 4, INT: 5 },
        Priest: { STA: 5, STR: 7, AGI: 4, DEX: 5, SPI: 6, INT: 7 },
        Mage: { STA: 4, STR: 6, AGI: 4, DEX: 6, SPI: 6, INT: 8 }
    },
    Elf: {
        Warrior: { STA: 5, STR: 6, AGI: 5, DEX: 5, SPI: 6, INT: 7 },
        Scout: { STA: 3, STR: 5, AGI: 7, DEX: 6, SPI: 6, INT: 7 },
        Priest: { STA: 3, STR: 5, AGI: 5, DEX: 4, SPI: 8, INT: 9 },
        Mage: { STA: 2, STR: 4, AGI: 5, DEX: 5, SPI: 8, INT: 10 }
    },
    Dwarf: {
        Warrior: { STA: 8, STR: 10, AGI: 4, DEX: 7, SPI: 2, INT: 3 },
        Scout: { STA: 6, STR: 9, AGI: 6, DEX: 8, SPI: 2, INT: 3 },
        Priest: { STA: 6, STR: 9, AGI: 4, DEX: 6, SPI: 4, INT: 5 },
        Mage: { STA: 5, STR: 8, AGI: 4, DEX: 7, SPI: 4, INT: 6 }
    },
    Myrine: {
        Warrior: { STA: 7, STR: 8, AGI: 8, DEX: 7, SPI: 2, INT: 2 },
        Scout: { STA: 5, STR: 7, AGI: 10, DEX: 8, SPI: 2, INT: 2 },
        Priest: { STA: 5, STR: 7, AGI: 8, DEX: 6, SPI: 4, INT: 4 },
        Mage: { STA: 4, STR: 6, AGI: 8, DEX: 7, SPI: 4, INT: 6 }
    }
};

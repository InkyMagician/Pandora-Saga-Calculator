import { useState, useEffect, useCallback } from 'react';
import Header from './Header';
import GearSection from './GearSection';
import StatsSection from './StatsSection';
import PresetsSection from './PresetsSection';
import GearModal from './Modals/GearModal';
import MoonModal from './Modals/MoonModal';
import SoulSlotModal from './Modals/SoulSlotModal';
import PresetModal from './Modals/PresetModal';
import './styles/global.css';
import './styles/layout.css';
import './styles/header.css';
import './styles/gear-section.css';
import './styles/stats-section.css';
import './styles/presets-section.css';
import './styles/modals.css';
import './styles/buttons.css';
import './styles/inputs.css';
import './styles/responsive.css';
import './styles/animations.css';

const gearWithEnchantAndSoul = ['Helmet', 'Torso', 'Pants', 'Gloves', 'Boots', 'Shield', 'Weapon'];
const enchantmentRules = {
    1: 1, 2: 2, 3: 3, 4: 5, 5: 7, 6: 9, 7: 12, 8: 16, 9: 21, 10: 27,
};

const defaultBaseStats = {
    Human: {
        Warrior: { STA: 7, STR: 8, AGI: 4, DEX: 6, SPI: 4, INT: 5 },
        Scout: { STA: 5, STR: 7, AGI: 6, DEX: 7, SPI: 4, INT: 5 },
        Priest: { STA: 5, STR: 7, AGI: 4, DEX: 5, SPI: 6, INT: 7 },
        Mage: { STA: 4, STR: 6, AGI: 4, DEX: 6, SPI: 6, INT: 8 },
    },
    Elf: {
        Warrior: { STA: 5, STR: 6, AGI: 5, DEX: 5, SPI: 6, INT: 7 },
        Scout: { STA: 3, STR: 5, AGI: 7, DEX: 6, SPI: 6, INT: 7 },
        Priest: { STA: 3, STR: 5, AGI: 5, DEX: 4, SPI: 8, INT: 9 },
        Mage: { STA: 2, STR: 4, AGI: 5, DEX: 5, SPI: 8, INT: 10 },
    },
    Dwarf: {
        Warrior: { STA: 8, STR: 10, AGI: 4, DEX: 7, SPI: 2, INT: 3 },
        Scout: { STA: 6, STR: 9, AGI: 6, DEX: 8, SPI: 2, INT: 3 },
        Priest: { STA: 6, STR: 9, AGI: 4, DEX: 6, SPI: 4, INT: 5 },
        Mage: { STA: 5, STR: 8, AGI: 4, DEX: 7, SPI: 4, INT: 6 },
    },
    Myrine: {
        Warrior: { STA: 7, STR: 8, AGI: 8, DEX: 7, SPI: 2, INT: 2 },
        Scout: { STA: 5, STR: 7, AGI: 10, DEX: 8, SPI: 2, INT: 2 },
        Priest: { STA: 5, STR: 7, AGI: 8, DEX: 6, SPI: 4, INT: 4 },
        Mage: { STA: 4, STR: 6, AGI: 8, DEX: 7, SPI: 4, INT: 5 },
    },
    Enkidu: {
        Warrior: { STA: 10, STR: 9, AGI: 3, DEX: 5, SPI: 5, INT: 2 },
        Scout: { STA: 8, STR: 8, AGI: 5, DEX: 6, SPI: 5, INT: 2 },
        Priest: { STA: 8, STR: 8, AGI: 3, DEX: 4, SPI: 7, INT: 4 },
        Mage: { STA: 7, STR: 7, AGI: 3, DEX: 5, SPI: 7, INT: 5 },
    },
    Lapin: {
        Warrior: { STA: 5, STR: 4, AGI: 5, DEX: 6, SPI: 8, INT: 6 },
        Scout: { STA: 3, STR: 3, AGI: 7, DEX: 7, SPI: 8, INT: 6 },
        Priest: { STA: 3, STR: 3, AGI: 5, DEX: 5, SPI: 10, INT: 8 },
        Mage: { STA: 2, STR: 2, AGI: 5, DEX: 6, SPI: 10, INT: 9 },
    },
};
const CharacterCustomization = () => {
    const [selectedRace, setSelectedRace] = useState('');
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedMoon1, setSelectedMoon1] = useState(null);
    const [selectedMoon3, setSelectedMoon3] = useState(null);
    const [baseStats, setBaseStats] = useState({ STA: 0, STR: 0, AGI: 0, DEX: 0, SPI: 0, INT: 0 });
    const [equipmentStats, setEquipmentStats] = useState({ STA: 0, STR: 0, AGI: 0, DEX: 0, SPI: 0, INT: 0 });
    const [manualStats, setManualStats] = useState({ STA: 0, STR: 0, AGI: 0, DEX: 0, SPI: 0, INT: 0 });
    const [totalStats, setTotalStats] = useState({ STA: 0, STR: 0, AGI: 0, DEX: 0, SPI: 0, INT: 0 });
    const [statPoints, setStatPoints] = useState(584);
    const [additionalStats, setAdditionalStats] = useState({});
    const [gear, setGear] = useState({});
    const [showGearModal, setShowGearModal] = useState(false);
    const [showMoonModal, setShowMoonModal] = useState(false);
    const [selectedGearSlot, setSelectedGearSlot] = useState('');
    const [selectedMoonSlot, setSelectedMoonSlot] = useState('');
    const [gearName, setGearName] = useState('');
    const [gearStats, setGearStats] = useState({ STA: 0, STR: 0, AGI: 0, DEX: 0, SPI: 0, INT: 0 });
    const [additionalStatsInputs, setAdditionalStatsInputs] = useState([]);
    const [gearEnchantment, setGearEnchantment] = useState(0);
    const [gearSoulSlots, setGearSoulSlots] = useState(0);
    const [gearArmor, setGearArmor] = useState(0);
    const [totalArmor, setTotalArmor] = useState(0);
    const [moonStats, setMoonStats] = useState({ STA: 0, STR: 0, AGI: 0, DEX: 0, SPI: 0, INT: 0 });
    const [moonAdditionalStats, setMoonAdditionalStats] = useState([]);
    const [selectedSoulSlot, setSelectedSoulSlot] = useState(null);
    const [soulSlotData, setSoulSlotData] = useState({});
    const [showSoulSlotModal, setShowSoulSlotModal] = useState(false);
    const [soulSlotStats, setSoulSlotStats] = useState({ STA: 0, STR: 0, AGI: 0, DEX: 0, SPI: 0, INT: 0 });
    const [soulSlotAdditionalStats, setSoulSlotAdditionalStats] = useState([]);
    const [presets, setPresets] = useState([]);
    const [presetName, setPresetName] = useState('');
    const [showPresetModal, setShowPresetModal] = useState(false);

    const updateTotalStats = useCallback((base, equipment, manual) => {
        setTotalStats({
            STA: base.STA + manual.STA + equipment.STA,
            STR: base.STR + manual.STR + equipment.STR,
            AGI: base.AGI + manual.AGI + equipment.AGI,
            DEX: base.DEX + manual.DEX + equipment.DEX,
            SPI: base.SPI + manual.SPI + equipment.SPI,
            INT: base.INT + manual.INT + equipment.INT
        });
    }, []);

    const updateEquipmentStats = useCallback((newGear, newMoon1 = selectedMoon1, newMoon3 = selectedMoon3) => {
        const newEquipmentStats = { STA: 0, STR: 0, AGI: 0, DEX: 0, SPI: 0, INT: 0 };
        const newAdditionalStats = {};

        const processStats = (item) => {
            if (item) {
                const { stats, additionalStats } = item;
                Object.entries(stats).forEach(([stat, value]) => {
                    if (['STA', 'STR', 'AGI', 'DEX', 'SPI', 'INT'].includes(stat)) {
                        newEquipmentStats[stat] += value;
                    }
                });
                additionalStats.forEach(({ key, value }) => {
                    if (key && value) {
                        const numValue = parseFloat(value);
                        if (!isNaN(numValue)) {
                            newAdditionalStats[key] = (newAdditionalStats[key] || 0) + numValue;
                        }
                    }
                });
            }
        };

        Object.values(newGear).forEach(processStats);
        processStats(newMoon1);
        processStats(newMoon3);

        Object.values(soulSlotData).forEach((slotData) => {
            Object.values(slotData).forEach(processStats);
        });

        setEquipmentStats(newEquipmentStats);
        updateTotalStats(baseStats, newEquipmentStats, manualStats);
        setAdditionalStats(newAdditionalStats);
    }, [selectedMoon1, selectedMoon3, soulSlotData, baseStats, manualStats, updateTotalStats]);

    useEffect(() => {
        if (selectedRace && selectedClass) {
            const newBaseStats = defaultBaseStats[selectedRace][selectedClass];
            setBaseStats(newBaseStats);
            updateTotalStats(newBaseStats, equipmentStats, manualStats);
        }
    }, [selectedRace, selectedClass, equipmentStats, manualStats, updateTotalStats]);

    useEffect(() => {
        updateEquipmentStats(gear);
    }, [gear, updateEquipmentStats]);

    useEffect(() => {
        const savedPresets = JSON.parse(localStorage.getItem('characterPresets')) || [];
        setPresets(savedPresets);
    }, []);

    const calculateStatCost = (currentValue) => {
        if (currentValue < 30) return 2;
        if (currentValue < 50) return 3;
        if (currentValue < 70) return 4;
        if (currentValue < 90) return 5;
        return 6;
    };

    const handleStatChange = (stat, value) => {
        const baseValue = baseStats[stat];
        const manualValue = manualStats[stat];
        const newManualValue = Math.max(0, Math.min(manualValue + value, 99 - baseValue));

        if (value > 0 && (baseValue + newManualValue > 99 || statPoints < calculateStatCost(baseValue + manualValue))) {
            return;
        }

        const costDifference = value > 0
            ? calculateStatCost(baseValue + manualValue)
            : -calculateStatCost(baseValue + manualValue - 1);

        setManualStats(prevManualStats => ({
            ...prevManualStats,
            [stat]: newManualValue
        }));

        updateTotalStats(baseStats, equipmentStats, {
            ...manualStats,
            [stat]: newManualValue
        });

        setStatPoints(prevPoints => prevPoints - costDifference);
    };
    // ... (continued from part 1)

    const handleGearClick = (slot) => {
        setSelectedGearSlot(slot);
        const existingGear = gear[slot];
        if (existingGear) {
            setGearName(existingGear.name);
            setGearStats(existingGear.stats);
            setAdditionalStatsInputs(existingGear.additionalStats || []);
            setGearEnchantment(existingGear.enchantment || 0);
            setGearSoulSlots(existingGear.soulSlots || 0);
            setGearArmor(existingGear.armor || 0);
        } else {
            setGearName('');
            setGearStats({ STA: 0, STR: 0, AGI: 0, DEX: 0, SPI: 0, INT: 0 });
            setAdditionalStatsInputs([]);
            setGearEnchantment(0);
            setGearSoulSlots(0);
            setGearArmor(0);
        }
        setShowGearModal(true);
    };

    const handleMoonClick = (moonSlot) => {
        setSelectedMoonSlot(moonSlot);
        const existingMoon = moonSlot === 'moon1' ? selectedMoon1 : selectedMoon3;
        if (existingMoon) {
            setGearName(existingMoon.name);
            setMoonStats(existingMoon.stats);
            setMoonAdditionalStats(existingMoon.additionalStats || []);
        } else {
            setGearName('');
            setMoonStats({ STA: 0, STR: 0, AGI: 0, DEX: 0, SPI: 0, INT: 0 });
            setMoonAdditionalStats([]);
        }
        setShowMoonModal(true);
    };

    const handleGearStatChange = (stat, value) => {
        setGearStats(prevGearStats => ({
            ...prevGearStats,
            [stat]: Math.max(0, prevGearStats[stat] + value)
        }));
    };

    const handleMoonStatChange = (stat, value) => {
        setMoonStats(prevStats => ({
            ...prevStats,
            [stat]: Math.max(0, prevStats[stat] + value)
        }));
    };

    const addAdditionalStatInput = () => {
        setAdditionalStatsInputs([...additionalStatsInputs, { key: '', value: '' }]);
    };

    const removeAdditionalStatInput = (index) => {
        setAdditionalStatsInputs(additionalStatsInputs.filter((_, i) => i !== index));
    };

    const handleAdditionalStatChange = (index, field, value) => {
        const newInputs = [...additionalStatsInputs];
        newInputs[index][field] = value;
        setAdditionalStatsInputs(newInputs);
    };

    const addMoonAdditionalStat = () => {
        setMoonAdditionalStats([...moonAdditionalStats, { key: '', value: '' }]);
    };

    const removeMoonAdditionalStat = (index) => {
        setMoonAdditionalStats(moonAdditionalStats.filter((_, i) => i !== index));
    };

    const handleMoonAdditionalStatChange = (index, field, value) => {
        const newInputs = [...moonAdditionalStats];
        newInputs[index][field] = value;
        setMoonAdditionalStats(newInputs);
    };

    const updateTotalArmor = useCallback((newGear) => {
        const totalArmor = Object.values(newGear).reduce((sum, item) => {
            const baseArmor = item.armor || 0;
            const enchantmentBonus = enchantmentRules[item.enchantment] || 0;
            return sum + baseArmor + enchantmentBonus;
        }, 0);
        setTotalArmor(totalArmor);
    }, []);

    const handleGearSave = () => {
        const newGear = {
            ...gear,
            [selectedGearSlot]: {
                name: gearName,
                stats: gearStats,
                additionalStats: additionalStatsInputs,
                enchantment: gearEnchantment,
                soulSlots: gearSoulSlots,
                armor: gearArmor
            }
        };
        setGear(newGear);
        updateEquipmentStats(newGear);
        updateTotalArmor(newGear);
        setShowGearModal(false);
    };

    const handleMoonSave = () => {
        const moonData = {
            name: gearName,
            stats: moonStats,
            additionalStats: moonAdditionalStats
        };
        if (selectedMoonSlot === 'moon1') {
            setSelectedMoon1(moonData);
        } else {
            setSelectedMoon3(moonData);
        }
        updateEquipmentStats(gear, selectedMoonSlot === 'moon1' ? moonData : selectedMoon1, selectedMoonSlot === 'moon3' ? moonData : selectedMoon3);
        setShowMoonModal(false);
    };

    const handleGearUnload = (slot) => {
        const newGear = { ...gear };
        delete newGear[slot];
        setGear(newGear);
        updateEquipmentStats(newGear);
        updateTotalArmor(newGear);
    };

    const handleSoulSlotClick = (slot, index) => {
        setSelectedSoulSlot({ slot, index });
        const existingSoulSlot = soulSlotData[slot]?.[index];
        if (existingSoulSlot) {
            setGearName(existingSoulSlot.name);
            setSoulSlotStats(existingSoulSlot.stats);
            setSoulSlotAdditionalStats(existingSoulSlot.additionalStats || []);
        } else {
            setGearName('');
            setSoulSlotStats({ STA: 0, STR: 0, AGI: 0, DEX: 0, SPI: 0, INT: 0 });
            setSoulSlotAdditionalStats([]);
        }
        setShowSoulSlotModal(true);
    };

    const handleSoulSlotStatChange = (stat, value) => {
        setSoulSlotStats(prevStats => ({
            ...prevStats,
            [stat]: Math.max(0, prevStats[stat] + value)
        }));
    };

    const addSoulSlotAdditionalStat = () => {
        setSoulSlotAdditionalStats([...soulSlotAdditionalStats, { key: '', value: '' }]);
    };

    const removeSoulSlotAdditionalStat = (index) => {
        setSoulSlotAdditionalStats(soulSlotAdditionalStats.filter((_, i) => i !== index));
    };

    const handleSoulSlotAdditionalStatChange = (index, field, value) => {
        const newInputs = [...soulSlotAdditionalStats];
        newInputs[index][field] = value;
        setSoulSlotAdditionalStats(newInputs);
    };

    const handleSoulSlotSave = () => {
        const soulSlotDataItem = {
            name: gearName,
            stats: soulSlotStats,
            additionalStats: soulSlotAdditionalStats
        };
        setSoulSlotData(prevData => ({
            ...prevData,
            [selectedSoulSlot.slot]: {
                ...prevData[selectedSoulSlot.slot],
                [selectedSoulSlot.index]: soulSlotDataItem
            }
        }));
        updateEquipmentStats(gear);
        setShowSoulSlotModal(false);
    };

    const savePreset = () => {
        if (!presetName) {
            alert('Please enter a name for your preset');
            return;
        }

        const newPreset = {
            name: presetName,
            race: selectedRace,
            class: selectedClass,
            gear,
            manualStats,
            moon1: selectedMoon1,
            moon3: selectedMoon3,
            soulSlotData
        };

        const updatedPresets = [...presets, newPreset];
        setPresets(updatedPresets);
        localStorage.setItem('characterPresets', JSON.stringify(updatedPresets));
        setPresetName('');
        setShowPresetModal(false);
    };

    const loadPreset = (preset) => {
        setSelectedRace(preset.race);
        setSelectedClass(preset.class);
        setGear(preset.gear);
        setManualStats(preset.manualStats);
        setSelectedMoon1(preset.moon1);
        setSelectedMoon3(preset.moon3);
        setSoulSlotData(preset.soulSlotData);

        updateEquipmentStats(preset.gear, preset.moon1, preset.moon3);
        updateTotalArmor(preset.gear);
    };

    const deletePreset = (presetToDelete) => {
        const updatedPresets = presets.filter(preset => preset.name !== presetToDelete.name);
        setPresets(updatedPresets);
        localStorage.setItem('characterPresets', JSON.stringify(updatedPresets));
    };

    const renderSoulSlots = (slot) => {
        const numSlots = gear[slot]?.soulSlots || 0;
        return Array.from({ length: numSlots }, (_, index) => (
            <div
                key={`${slot}-${index}`}
                className={`soul-slot ${soulSlotData[slot]?.[index] ? 'filled' : ''}`}
                onClick={() => handleSoulSlotClick(slot, index)}
            />
        ));
    };

    return (
        <div className="character-customization">
            <Header
                selectedRace={selectedRace}
                setSelectedRace={setSelectedRace}
                selectedClass={selectedClass}
                setSelectedClass={setSelectedClass}
                selectedMoon1={selectedMoon1}
                selectedMoon3={selectedMoon3}
                handleMoonClick={handleMoonClick}
                setShowPresetModal={setShowPresetModal}
            />
            <div className="content">
                <GearSection
                    gear={gear}
                    handleGearClick={handleGearClick}
                    handleGearUnload={handleGearUnload}
                    renderSoulSlots={renderSoulSlots}
                    totalArmor={totalArmor}
                />
                <StatsSection
                    statPoints={statPoints}
                    totalStats={totalStats}
                    baseStats={baseStats}
                    manualStats={manualStats}
                    equipmentStats={equipmentStats}
                    handleStatChange={handleStatChange}
                    additionalStats={additionalStats}
                />
            </div>
            <PresetsSection
                presets={presets}
                loadPreset={loadPreset}
                deletePreset={deletePreset}
            />
            {showGearModal && (
                <GearModal
                    gearName={gearName}
                    setGearName={setGearName}
                    gearStats={gearStats}
                    handleGearStatChange={handleGearStatChange}
                    additionalStatsInputs={additionalStatsInputs}
                    handleAdditionalStatChange={handleAdditionalStatChange}
                    removeAdditionalStatInput={removeAdditionalStatInput}
                    addAdditionalStatInput={addAdditionalStatInput}
                    gearArmor={gearArmor}
                    setGearArmor={setGearArmor}
                    selectedGearSlot={selectedGearSlot}
                    gearWithEnchantAndSoul={gearWithEnchantAndSoul}
                    gearEnchantment={gearEnchantment}
                    setGearEnchantment={setGearEnchantment}
                    gearSoulSlots={gearSoulSlots}
                    setGearSoulSlots={setGearSoulSlots}
                    handleGearSave={handleGearSave}
                    setShowGearModal={setShowGearModal}
                />
            )}
            {showMoonModal && (
                <MoonModal
                    gearName={gearName}
                    setGearName={setGearName}
                    moonStats={moonStats}
                    handleMoonStatChange={handleMoonStatChange}
                    moonAdditionalStats={moonAdditionalStats}
                    handleMoonAdditionalStatChange={handleMoonAdditionalStatChange}
                    removeMoonAdditionalStat={removeMoonAdditionalStat}
                    addMoonAdditionalStat={addMoonAdditionalStat}
                    handleMoonSave={handleMoonSave}
                    setShowMoonModal={setShowMoonModal}
                />
            )}
            {showSoulSlotModal && (
                <SoulSlotModal
                    gearName={gearName}
                    setGearName={setGearName}
                    soulSlotStats={soulSlotStats}
                    handleSoulSlotStatChange={handleSoulSlotStatChange}
                    soulSlotAdditionalStats={soulSlotAdditionalStats}
                    handleSoulSlotAdditionalStatChange={handleSoulSlotAdditionalStatChange}
                    removeSoulSlotAdditionalStat={removeSoulSlotAdditionalStat}
                    addSoulSlotAdditionalStat={addSoulSlotAdditionalStat}
                    handleSoulSlotSave={handleSoulSlotSave}
                    setShowSoulSlotModal={setShowSoulSlotModal}
                />
            )}
            {showPresetModal && (
                <PresetModal
                    presetName={presetName}
                    setPresetName={setPresetName}
                    savePreset={savePreset}
                    setShowPresetModal={setShowPresetModal}
                />
            )}
        </div>
    );
};

export default CharacterCustomization;
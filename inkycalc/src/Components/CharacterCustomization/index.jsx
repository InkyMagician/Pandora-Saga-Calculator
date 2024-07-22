import { useState, useEffect, useCallback } from 'react';
import Header from './Header';
import GearSection from './GearSection';
import StatsSection from './StatsSection';
import PresetsSection from './PresetsSection';
import GearModal from './Modals/GearModal';
import MoonModal from './Modals/MoonModal';
import SoulSlotModal from './Modals/SoulSlotModal';
import PresetModal from './Modals/PresetModal';
import { gearWithEnchantAndSoul, armorEnchantmentRules, defaultBaseStats } from './config';
import './styles/global.css';
import './styles/layout.css';
import './styles/header.css';
import './styles/gear-section.css';
import './styles/stats-section.css';
import './styles/presets-section.css';
import './styles/Modals.css';
import './styles/buttons.css';
import './styles/inputs.css';
import './styles/responsive.css';
import './styles/animations.css';

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
    const [enchantmentConditions, setEnchantmentConditions] = useState({});
    const [comboEffects, setComboEffects] = useState({});
    useEffect(() => {
        if (selectedRace && selectedClass) {
            const newBaseStats = defaultBaseStats[selectedRace][selectedClass];
            setBaseStats(newBaseStats);
            updateTotalStats(newBaseStats, equipmentStats, manualStats);
        }
    }, [selectedRace, selectedClass, equipmentStats, manualStats]);

    useEffect(() => {
        // Load presets when the component mounts
        if (window.electronAPI) {
            window.electronAPI.loadPresets().then(loadedPresets => {
                setPresets(loadedPresets);
            });
        }
    }, []);

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

    const applyEnchantmentConditions = useCallback((gearItem, allGear) => {
        if (!gearItem.enchantmentConditions && !gearItem.comboEffects) return { main: {}, additional: {} };

        const appliedStats = { main: {}, additional: {} };

        const applyCondition = (condition) => {
            let shouldApply = false;
            let multiplier = 1;

            if (condition.type === 'combo') {
                shouldApply = true;
            } else {
                switch (condition.type) {
                    case 'onEnchant':
                        shouldApply = gearItem.enchantment === condition.enchantmentLevel;
                        break;
                    case 'every1Enchant':
                        multiplier = Math.floor(gearItem.enchantment / 1);
                        shouldApply = gearItem.enchantment >= 1;
                        break;
                    case 'every2Enchant':
                        multiplier = Math.floor(gearItem.enchantment / 2);
                        shouldApply = gearItem.enchantment >= 2;
                        break;
                    case 'every3Enchant':
                        multiplier = Math.floor(gearItem.enchantment / 3);
                        shouldApply = gearItem.enchantment >= 3;
                        break;
                }
            }

            if (condition.isComboItem) {
                const comboApplies = condition.comboItems.every(comboItem => {
                    const foundItem = Object.values(allGear).find(item =>
                        item &&
                        item.name &&
                        item.name.toLowerCase() === comboItem.name.toLowerCase() &&
                        item.type &&
                        item.type.toLowerCase() === comboItem.type.toLowerCase()
                    );
                    return foundItem !== undefined;
                });
                shouldApply = shouldApply && comboApplies;
            }

            if (shouldApply) {
                if (condition.perkType === 'mainStat' || condition.perkType === 'both') {
                    Object.entries(condition.statValue).forEach(([stat, value]) => {
                        appliedStats.main[stat] = (appliedStats.main[stat] || 0) + value * multiplier;
                    });
                }
                if (condition.perkType === 'additionalStat' || condition.perkType === 'both') {
                    if (Array.isArray(condition.additionalStats)) {
                        condition.additionalStats.forEach(stat => {
                            const value = parseFloat(stat.value);
                            if (!isNaN(value)) {
                                appliedStats.additional[stat.name] = (appliedStats.additional[stat.name] || 0) + value * multiplier;
                            }
                        });
                    } else if (condition.additionalStatName && condition.additionalStatValue) {
                        const value = parseFloat(condition.additionalStatValue);
                        if (!isNaN(value)) {
                            appliedStats.additional[condition.additionalStatName] = (appliedStats.additional[condition.additionalStatName] || 0) + value * multiplier;
                        }
                    }
                }
            }
        };

        gearItem.enchantmentConditions?.forEach(applyCondition);
        gearItem.comboEffects?.forEach(applyCondition);

        return appliedStats;
    }, []);

    const updateEquipmentStats = useCallback((newGear, newMoon1 = selectedMoon1, newMoon3 = selectedMoon3) => {
        const newEquipmentStats = { STA: 0, STR: 0, AGI: 0, DEX: 0, SPI: 0, INT: 0 };
        const newAdditionalStats = {};

        const processStats = (item) => {
            if (item && typeof item === 'object') {
                const { stats = {}, additionalStats = [] } = item;

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

                const appliedConditions = applyEnchantmentConditions(item, newGear);
                Object.entries(appliedConditions.main).forEach(([stat, value]) => {
                    newEquipmentStats[stat] += value;
                });
                Object.entries(appliedConditions.additional).forEach(([stat, value]) => {
                    newAdditionalStats[stat] = (newAdditionalStats[stat] || 0) + value;
                });

                if (item.armor && item.enchantment) {
                    const armorBonus = armorEnchantmentRules[item.enchantment] || 0;
                    newAdditionalStats['Armor'] = (newAdditionalStats['Armor'] || 0) + armorBonus;
                }
            }
        };

        Object.values(newGear).forEach(processStats);
        processStats(newMoon1);
        processStats(newMoon3);

        Object.values(soulSlotData).forEach(slotData => {
            Object.values(slotData).forEach(processStats);
        });

        setEquipmentStats(newEquipmentStats);
        updateTotalStats(baseStats, newEquipmentStats, manualStats);
        setAdditionalStats(newAdditionalStats);
    }, [selectedMoon1, selectedMoon3, soulSlotData, baseStats, manualStats, updateTotalStats, applyEnchantmentConditions]);
    const updateTotalArmor = useCallback((newGear) => {
        const totalArmor = Object.values(newGear).reduce((sum, item) => {
            const baseArmor = item.armor || 0;
            const enchantmentBonus = armorEnchantmentRules[item.enchantment] || 0;
            return sum + baseArmor + enchantmentBonus;
        }, 0);
        setTotalArmor(totalArmor);
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

    const handleGearStatChange = (stat, value) => {
        setGearStats(prevStats => ({
            ...prevStats,
            [stat]: Math.max(0, prevStats[stat] + value)
        }));
    };

    const handleAdditionalStatChange = (index, field, value) => {
        const newInputs = [...additionalStatsInputs];
        newInputs[index][field] = value;
        setAdditionalStatsInputs(newInputs);
    };

    const removeAdditionalStatInput = (index) => {
        setAdditionalStatsInputs(additionalStatsInputs.filter((_, i) => i !== index));
    };

    const addAdditionalStatInput = () => {
        setAdditionalStatsInputs([...additionalStatsInputs, { key: '', value: '' }]);
    };

    const handleGearSave = () => {
        const newGearItem = {
            name: gearName,
            type: selectedGearSlot,
            stats: gearStats,
            additionalStats: additionalStatsInputs,
            enchantment: gearEnchantment,
            soulSlots: gearSoulSlots,
            armor: gearArmor,
            enchantmentConditions: enchantmentConditions[selectedGearSlot] || [],
            comboEffects: comboEffects[selectedGearSlot] || []
        };

        const newGear = {
            ...gear,
            [selectedGearSlot]: newGearItem
        };

        setGear(newGear);
        updateEquipmentStats(newGear);
        updateTotalArmor(newGear);
        setShowGearModal(false);
    };

    const handleEnchantmentConditionSave = (slot, newConditions) => {
        setEnchantmentConditions(prev => ({
            ...prev,
            [slot]: newConditions
        }));
        const updatedGear = {
            ...gear,
            [slot]: {
                ...(gear[slot] || {}),
                enchantmentConditions: newConditions
            }
        };
        updateEquipmentStats(updatedGear);
    };

    const handleComboEffectSave = (slot, newEffects) => {
        setComboEffects(prev => ({
            ...prev,
            [slot]: newEffects
        }));
        const updatedGear = {
            ...gear,
            [slot]: {
                ...(gear[slot] || {}),
                comboEffects: newEffects
            }
        };
        updateEquipmentStats(updatedGear);
    };

    const handleGearUnload = (slot) => {
        const newGear = { ...gear };
        delete newGear[slot];
        setGear(newGear);
        updateEquipmentStats(newGear);
        updateTotalArmor(newGear);
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

    const handleMoonStatChange = (stat, value) => {
        setMoonStats(prevStats => ({
            ...prevStats,
            [stat]: Math.max(0, prevStats[stat] + value)
        }));
    };

    const handleMoonAdditionalStatChange = (index, field, value) => {
        const newInputs = [...moonAdditionalStats];
        newInputs[index][field] = value;
        setMoonAdditionalStats(newInputs);
    };

    const removeMoonAdditionalStat = (index) => {
        setMoonAdditionalStats(moonAdditionalStats.filter((_, i) => i !== index));
    };

    const addMoonAdditionalStat = () => {
        setMoonAdditionalStats([...moonAdditionalStats, { key: '', value: '' }]);
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

    const handleSoulSlotAdditionalStatChange = (index, field, value) => {
        const newInputs = [...soulSlotAdditionalStats];
        newInputs[index][field] = value;
        setSoulSlotAdditionalStats(newInputs);
    };

    const removeSoulSlotAdditionalStat = (index) => {
        setSoulSlotAdditionalStats(soulSlotAdditionalStats.filter((_, i) => i !== index));
    };

    const addSoulSlotAdditionalStat = () => {
        setSoulSlotAdditionalStats([...soulSlotAdditionalStats, { key: '', value: '' }]);
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

    const savePreset = (presetName) => {
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
            soulSlotData,
            enchantmentConditions,
            comboEffects,
            remainingStatPoints: statPoints // Save remaining stat points
        };

        const updatedPresets = [...presets, newPreset];
        setPresets(updatedPresets);

        if (window.electronAPI) {
            window.electronAPI.savePresets(updatedPresets);
        }
    };

    const loadPreset = (preset) => {
        setSelectedRace(preset.race);
        setSelectedClass(preset.class);
        setGear(preset.gear);
        setManualStats(preset.manualStats);
        setSelectedMoon1(preset.moon1);
        setSelectedMoon3(preset.moon3);
        setSoulSlotData(preset.soulSlotData);
        setEnchantmentConditions(preset.enchantmentConditions || {});
        setComboEffects(preset.comboEffects || {});
        setStatPoints(preset.remainingStatPoints || 584); // Load remaining stat points or default to 584 if not found

        updateEquipmentStats(preset.gear, preset.moon1, preset.moon3);
        updateTotalArmor(preset.gear);
    };

    const updatePreset = (presetToUpdate) => {
        const updatedPreset = {
            ...presetToUpdate,
            race: selectedRace,
            class: selectedClass,
            gear,
            manualStats,
            moon1: selectedMoon1,
            moon3: selectedMoon3,
            soulSlotData,
            enchantmentConditions,
            comboEffects,
            remainingStatPoints: statPoints // Update remaining stat points
        };


        const updatedPresets = presets.map(preset =>
            preset.name === presetToUpdate.name ? updatedPreset : preset
        );

        setPresets(updatedPresets);

        if (window.electronAPI) {
            window.electronAPI.savePresets(updatedPresets);
        }
    };

    const deletePreset = (presetToDelete) => {
        const updatedPresets = presets.filter(preset => preset.name !== presetToDelete.name);
        setPresets(updatedPresets);

        if (window.electronAPI) {
            window.electronAPI.savePresets(updatedPresets);
        }
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
                    selectedRace={selectedRace}
                    selectedClass={selectedClass}
                />
            </div>
            <PresetsSection
                presets={presets}
                loadPreset={loadPreset}
                deletePreset={deletePreset}
                updatePreset={updatePreset}
                savePreset={savePreset}
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
                    enchantmentConditions={enchantmentConditions[selectedGearSlot] || []}
                    handleEnchantmentConditionSave={(newConditions) => handleEnchantmentConditionSave(selectedGearSlot, newConditions)}
                    comboEffects={comboEffects[selectedGearSlot] || []}
                    handleComboEffectSave={(newEffects) => handleComboEffectSave(selectedGearSlot, newEffects)}
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
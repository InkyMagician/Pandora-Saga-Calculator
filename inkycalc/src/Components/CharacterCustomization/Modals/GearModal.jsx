import { useState } from 'react';
import PropTypes from 'prop-types';
import EnchantmentConditionModal from './EnchantmentConditionModal';

const GearModal = ({
    gearName,
    setGearName,
    gearStats,
    handleGearStatChange,
    additionalStatsInputs,
    handleAdditionalStatChange,
    removeAdditionalStatInput,
    addAdditionalStatInput,
    gearArmor,
    setGearArmor,
    selectedGearSlot,
    gearWithEnchantAndSoul,
    gearEnchantment,
    setGearEnchantment,
    gearSoulSlots,
    setGearSoulSlots,
    enchantmentConditions,
    handleEnchantmentConditionSave,
    comboEffects,
    handleComboEffectSave,
    handleGearSave,
    setShowGearModal
}) => {
    const [showEnchantmentConditionModal, setShowEnchantmentConditionModal] = useState(false);
    const [editingCondition, setEditingCondition] = useState(null);
    const [isComboEffect, setIsComboEffect] = useState(false);

    const handleAddEnchantmentCondition = () => {
        setEditingCondition(null);
        setIsComboEffect(false);
        setShowEnchantmentConditionModal(true);
    };

    const handleEditEnchantmentCondition = (condition) => {
        setEditingCondition(condition);
        setIsComboEffect(false);
        setShowEnchantmentConditionModal(true);
    };

    const handleAddComboEffect = () => {
        setEditingCondition(null);
        setIsComboEffect(true);
        setShowEnchantmentConditionModal(true);
    };

    const handleEditComboEffect = (effect) => {
        setEditingCondition(effect);
        setIsComboEffect(true);
        setShowEnchantmentConditionModal(true);
    };

    const handleSaveEnchantmentCondition = (condition) => {
        if (isComboEffect) {
            if (editingCondition) {
                const newEffects = comboEffects.map(e => e === editingCondition ? condition : e);
                handleComboEffectSave(newEffects);
            } else {
                handleComboEffectSave([...comboEffects, condition]);
            }
        } else {
            if (editingCondition) {
                const newConditions = enchantmentConditions.map(c => c === editingCondition ? condition : c);
                handleEnchantmentConditionSave(newConditions);
            } else {
                handleEnchantmentConditionSave([...enchantmentConditions, condition]);
            }
        }
        setShowEnchantmentConditionModal(false);
    };

    const handleRemoveEnchantmentCondition = (index) => {
        const newConditions = enchantmentConditions.filter((_, i) => i !== index);
        handleEnchantmentConditionSave(newConditions);
    };

    const handleRemoveComboEffect = (index) => {
        const newEffects = comboEffects.filter((_, i) => i !== index);
        handleComboEffectSave(newEffects);
    };

    const renderEnchantmentCondition = (condition, index) => {
        let conditionText = '';
        switch (condition.type) {
            case 'onEnchant':
                conditionText = `On Enchant ${condition.enchantmentLevel}: `;
                break;
            case 'every1Enchant':
                conditionText = 'Every 1 Enchant: ';
                break;
            case 'every2Enchant':
                conditionText = 'Every 2 Enchant: ';
                break;
            case 'every3Enchant':
                conditionText = 'Every 3 Enchant: ';
                break;
            default:
                conditionText = 'Unknown Condition: ';
        }

        if (condition.isComboItem) {
            conditionText += 'Combo with ';
            condition.comboItems.forEach((item, i) => {
                conditionText += `${item.type} "${item.name}"`;
                if (i < condition.comboItems.length - 1) conditionText += ', ';
            });
            conditionText += ': ';
        }

        if (condition.perkType === 'mainStat' || condition.perkType === 'both') {
            Object.entries(condition.statValue).forEach(([stat, value]) => {
                if (value > 0) {
                    conditionText += `+${value} ${stat} `;
                }
            });
        }
        if (condition.perkType === 'additionalStat' || condition.perkType === 'both') {
            condition.additionalStats.forEach((stat, i) => {
                conditionText += `+${stat.value} ${stat.name}`;
                if (i < condition.additionalStats.length - 1) conditionText += ', ';
            });
        }

        return (
            <div key={index} className="enchantment-condition">
                {conditionText}
                <button onClick={() => handleEditEnchantmentCondition(condition)}>Edit</button>
                <button onClick={() => handleRemoveEnchantmentCondition(index)}>Remove</button>
            </div>
        );
    };

    const renderComboEffect = (effect, index) => {
        let effectText = 'Combo: ';
        if (effect.isComboItem) {
            effect.comboItems.forEach((item, i) => {
                effectText += `${item.type} "${item.name}"`;
                if (i < effect.comboItems.length - 1) effectText += ', ';
            });
            effectText += ': ';
        }

        if (effect.perkType === 'mainStat' || effect.perkType === 'both') {
            Object.entries(effect.statValue).forEach(([stat, value]) => {
                if (value > 0) {
                    effectText += `+${value} ${stat} `;
                }
            });
        }
        if (effect.perkType === 'additionalStat' || effect.perkType === 'both') {
            effect.additionalStats.forEach((stat, i) => {
                effectText += `+${stat.value} ${stat.name}`;
                if (i < effect.additionalStats.length - 1) effectText += ', ';
            });
        }

        return (
            <div key={index} className="combo-effect">
                {effectText}
                <button onClick={() => handleEditComboEffect(effect)}>Edit</button>
                <button onClick={() => handleRemoveComboEffect(index)}>Remove</button>
            </div>
        );
    };

    return (
        <div className="modal gear-modal">
            <div className="modal-content">
                <h2>Gear Input</h2>
                <div className="gear-modal-scrollable-content">
                    <label>
                        Name:
                        <input
                            type="text"
                            value={gearName}
                            onChange={(e) => setGearName(e.target.value)}
                        />
                    </label>
                    <div className="modal-stats">
                        {Object.entries(gearStats).map(([stat, value]) => (
                            <div key={stat} className="modal-stat-row">
                                <span className="modal-stat-name">{stat}</span>
                                <span className="modal-stat-value">{value}</span>
                                <div className="modal-stat-buttons">
                                    <button onClick={() => handleGearStatChange(stat, -1)}>-</button>
                                    <button onClick={() => handleGearStatChange(stat, 1)}>+</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="additional-stats-inputs">
                        <h3>Additional Stats:</h3>
                        {additionalStatsInputs.map((input, index) => (
                            <div key={index} className="additional-stat-input">
                                <input
                                    type="text"
                                    value={input.key}
                                    onChange={(e) => handleAdditionalStatChange(index, 'key', e.target.value)}
                                    placeholder="Stat name"
                                />
                                <input
                                    type="text"
                                    value={input.value}
                                    onChange={(e) => handleAdditionalStatChange(index, 'value', e.target.value)}
                                    placeholder="Value"
                                />
                                <button onClick={() => removeAdditionalStatInput(index)}>-</button>
                            </div>
                        ))}
                        <button onClick={addAdditionalStatInput}>+ Add Stat</button>
                    </div>
                    <label>
                        Armor:
                        <input
                            type="number"
                            value={gearArmor}
                            onChange={(e) => setGearArmor(parseInt(e.target.value) || 0)}
                        />
                    </label>
                    {gearWithEnchantAndSoul.includes(selectedGearSlot) && (
                        <>
                            <label>
                                Enchantment:
                                <input
                                    type="number"
                                    min="0"
                                    max="10"
                                    value={gearEnchantment}
                                    onChange={(e) => setGearEnchantment(parseInt(e.target.value) || 0)}
                                />
                            </label>
                            <div className="scrollable-section">
                                <h3>Enchantment Conditions</h3>
                                <div className="scrollable-content">
                                    {enchantmentConditions.map(renderEnchantmentCondition)}
                                </div>
                                <button onClick={handleAddEnchantmentCondition}>Add Enchantment Condition</button>
                            </div>
                            <label>
                                Soul Slots:
                                <input
                                    type="number"
                                    value={gearSoulSlots}
                                    onChange={(e) => setGearSoulSlots(parseInt(e.target.value) || 0)}
                                />
                            </label>
                        </>
                    )}
                    <div className="scrollable-section">
                        <h3>Combo Effects</h3>
                        <div className="scrollable-content">
                            {comboEffects.map(renderComboEffect)}
                        </div>
                        <button onClick={handleAddComboEffect}>Add Combo Effect</button>
                    </div>
                </div>
                <div className="modal-buttons">
                    <button onClick={handleGearSave}>Save</button>
                    <button onClick={() => setShowGearModal(false)}>Close</button>
                </div>
            </div>
            {showEnchantmentConditionModal && (
                <EnchantmentConditionModal
                    onSave={handleSaveEnchantmentCondition}
                    onClose={() => setShowEnchantmentConditionModal(false)}
                    initialCondition={editingCondition}
                    isComboEffect={isComboEffect}
                />
            )}
        </div>
    );
};

GearModal.propTypes = {
    gearName: PropTypes.string.isRequired,
    setGearName: PropTypes.func.isRequired,
    gearStats: PropTypes.object.isRequired,
    handleGearStatChange: PropTypes.func.isRequired,
    additionalStatsInputs: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string,
        value: PropTypes.string
    })).isRequired,
    handleAdditionalStatChange: PropTypes.func.isRequired,
    removeAdditionalStatInput: PropTypes.func.isRequired,
    addAdditionalStatInput: PropTypes.func.isRequired,
    gearArmor: PropTypes.number.isRequired,
    setGearArmor: PropTypes.func.isRequired,
    selectedGearSlot: PropTypes.string.isRequired,
    gearWithEnchantAndSoul: PropTypes.arrayOf(PropTypes.string).isRequired,
    gearEnchantment: PropTypes.number.isRequired,
    setGearEnchantment: PropTypes.func.isRequired,
    gearSoulSlots: PropTypes.number.isRequired,
    setGearSoulSlots: PropTypes.func.isRequired,
    enchantmentConditions: PropTypes.array.isRequired,
    handleEnchantmentConditionSave: PropTypes.func.isRequired,
    comboEffects: PropTypes.array.isRequired,
    handleComboEffectSave: PropTypes.func.isRequired,
    handleGearSave: PropTypes.func.isRequired,
    setShowGearModal: PropTypes.func.isRequired
};

export default GearModal;
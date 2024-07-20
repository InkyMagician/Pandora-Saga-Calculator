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
    handleGearSave,
    setShowGearModal
}) => {
    const [showEnchantmentConditionModal, setShowEnchantmentConditionModal] = useState(false);

    const handleAddEnchantmentCondition = () => {
        console.log('Opening enchantment condition modal');
        setShowEnchantmentConditionModal(true);
    };

    const handleSaveEnchantmentCondition = (condition) => {
        console.log('Saving new enchantment condition:', condition);
        const newConditions = [...enchantmentConditions, condition];
        console.log('Updated enchantment conditions:', newConditions);
        handleEnchantmentConditionSave(newConditions);
        setShowEnchantmentConditionModal(false);
    };

    const handleCloseEnchantmentConditionModal = () => {
        console.log('Closing enchantment condition modal');
        setShowEnchantmentConditionModal(false);
    };

    const handleRemoveEnchantmentCondition = (index) => {
        console.log('Removing enchantment condition at index:', index);
        const newConditions = enchantmentConditions.filter((_, i) => i !== index);
        console.log('New enchantment conditions after removal:', newConditions);
        handleEnchantmentConditionSave(newConditions);
    };

    const renderEnchantmentCondition = (condition, index) => {
        console.log('Rendering enchantment condition:', condition);
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
            conditionText += `with ${condition.comboItemType} "${condition.comboItemName}" `;
        }

        if (condition.perkType === 'mainStat' || condition.perkType === 'both') {
            Object.entries(condition.statValue).forEach(([stat, value]) => {
                if (value > 0) {
                    conditionText += `+${value} ${stat} `;
                }
            });
        }
        if (condition.perkType === 'additionalStat' || condition.perkType === 'both') {
            conditionText += `+${condition.additionalStatValue} ${condition.additionalStatName} `;
        }

        return (
            <div key={index} className="enchantment-condition">
                {conditionText}
                <button onClick={() => handleRemoveEnchantmentCondition(index)}>Remove</button>
            </div>
        );
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Gear Input</h2>
                <label>
                    Name:
                    <input
                        type="text"
                        value={gearName}
                        onChange={(e) => {
                            console.log('Gear name changed:', e.target.value);
                            setGearName(e.target.value);
                        }}
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
                        onChange={(e) => {
                            console.log('Gear armor changed:', e.target.value);
                            setGearArmor(parseInt(e.target.value) || 0);
                        }}
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
                                onChange={(e) => {
                                    console.log('Gear enchantment changed:', e.target.value);
                                    setGearEnchantment(parseInt(e.target.value) || 0);
                                }}
                            />
                        </label>
                        <button onClick={handleAddEnchantmentCondition}>Add Enchantment Condition</button>
                        {enchantmentConditions.map(renderEnchantmentCondition)}
                        <label>
                            Soul Slots:
                            <input
                                type="number"
                                value={gearSoulSlots}
                                onChange={(e) => {
                                    console.log('Gear soul slots changed:', e.target.value);
                                    setGearSoulSlots(parseInt(e.target.value) || 0);
                                }}
                            />
                        </label>
                    </>
                )}
                <div className="modal-buttons">
                    <button onClick={() => {
                        console.log('Saving gear:', {
                            name: gearName,
                            stats: gearStats,
                            additionalStats: additionalStatsInputs,
                            armor: gearArmor,
                            enchantment: gearEnchantment,
                            soulSlots: gearSoulSlots,
                            enchantmentConditions
                        });
                        handleGearSave();
                    }}>Save</button>
                    <button onClick={() => setShowGearModal(false)}>Close</button>
                </div>
            </div>
            {showEnchantmentConditionModal && (
                <EnchantmentConditionModal
                    onSave={handleSaveEnchantmentCondition}
                    onClose={handleCloseEnchantmentConditionModal}
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
    handleGearSave: PropTypes.func.isRequired,
    setShowGearModal: PropTypes.func.isRequired
};

export default GearModal;
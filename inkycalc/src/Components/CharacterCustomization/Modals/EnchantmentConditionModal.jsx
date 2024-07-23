import { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/EnchantmentConditionModal.css';

const EnchantmentConditionModal = ({ onSave, onClose, initialCondition, isComboEffect }) => {
    const [conditionType, setConditionType] = useState(initialCondition?.type || '');
    const [enchantmentLevel, setEnchantmentLevel] = useState(initialCondition?.enchantmentLevel || 0);
    const [perkType, setPerkType] = useState(initialCondition?.perkType || '');
    const [statValue, setStatValue] = useState(initialCondition?.statValue || { STA: 0, STR: 0, AGI: 0, DEX: 0, SPI: 0, INT: 0 });
    const [additionalStats, setAdditionalStats] = useState(initialCondition?.additionalStats || []);
    const [isComboItem, setIsComboItem] = useState(initialCondition?.isComboItem || false);
    const [comboItems, setComboItems] = useState(initialCondition?.comboItems || []);
    const [startingValue, setStartingValue] = useState(initialCondition?.startingValue || 1);

    const handleSave = () => {
        const condition = {
            type: isComboEffect ? 'combo' : conditionType,
            enchantmentLevel: isComboEffect ? null : enchantmentLevel,
            perkType,
            statValue,
            additionalStats,
            isComboItem,
            comboItems,
            startingValue: conditionType === 'fromXEvery1Enchant' ? startingValue : null,
        };
        onSave(condition);
        onClose();
    };

    const handleMainStatChange = (stat, value) => {
        setStatValue(prevStats => ({
            ...prevStats,
            [stat]: Math.max(0, (prevStats[stat] || 0) + value)
        }));
    };

    const handleAdditionalStatChange = (index, field, value) => {
        setAdditionalStats(prevStats => {
            const newStats = [...prevStats];
            newStats[index] = { ...newStats[index], [field]: value };
            return newStats;
        });
    };

    const addAdditionalStat = () => {
        setAdditionalStats([...additionalStats, { name: '', value: '' }]);
    };

    const removeAdditionalStat = (index) => {
        setAdditionalStats(additionalStats.filter((_, i) => i !== index));
    };

    const addComboItem = () => {
        setComboItems([...comboItems, { type: '', name: '' }]);
    };

    const updateComboItem = (index, field, value) => {
        const updatedComboItems = [...comboItems];
        updatedComboItems[index][field] = value;
        setComboItems(updatedComboItems);
    };

    const removeComboItem = (index) => {
        setComboItems(comboItems.filter((_, i) => i !== index));
    };

    return (
        <div className="modal enchantment-condition-modal">
            <div className="modal-content">
                <h2>{isComboEffect ? 'Add Combo Effect' : 'Add Enchantment Condition'}</h2>
                <div className="scrollable-content">
                    {!isComboEffect && (
                        <select value={conditionType} onChange={(e) => setConditionType(e.target.value)}>
                            <option value="">Select Condition Type</option>
                            <option value="onEnchant">On Enchant</option>
                            <option value="every1Enchant">Every 1 Enchant</option>
                            <option value="every2Enchant">Every 2 Enchant</option>
                            <option value="every3Enchant">Every 3 Enchant</option>
                            <option value="fromXEvery1Enchant">From X Every 1 Enchant</option>
                        </select>
                    )}

                    {conditionType === 'onEnchant' && !isComboEffect && (
                        <input
                            type="number"
                            min="0"
                            max="10"
                            value={enchantmentLevel}
                            onChange={(e) => setEnchantmentLevel(parseInt(e.target.value))}
                            placeholder="Enchantment Level"
                        />
                    )}

                    {conditionType === 'fromXEvery1Enchant' && (
                        <input
                            type="number"
                            min="1"
                            max="10"
                            value={startingValue}
                            onChange={(e) => setStartingValue(parseInt(e.target.value))}
                            placeholder="Starting Value"
                        />
                    )}

                    <select value={perkType} onChange={(e) => setPerkType(e.target.value)}>
                        <option value="">Select Perk Type</option>
                        <option value="mainStat">Main Stat</option>
                        <option value="additionalStat">Additional Stat</option>
                        <option value="both">Both</option>
                    </select>

                    {(perkType === 'mainStat' || perkType === 'both') && (
                        <>
                            {['STA', 'STR', 'AGI', 'DEX', 'SPI', 'INT'].map(stat => (
                                <div key={stat} className="modal-stat-row">
                                    <span className="modal-stat-name">{stat}</span>
                                    <div className="modal-stat-buttons">
                                        <button onClick={() => handleMainStatChange(stat, -1)}>-</button>
                                        <span className="modal-stat-value">{statValue[stat] || 0}</span>
                                        <button onClick={() => handleMainStatChange(stat, 1)}>+</button>
                                    </div>
                                </div>
                            ))}
                        </>
                    )}

                    {(perkType === 'additionalStat' || perkType === 'both') && (
                        <>
                            {additionalStats.map((stat, index) => (
                                <div key={index} className="additional-stat-input">
                                    <input
                                        type="text"
                                        value={stat.name}
                                        onChange={(e) => handleAdditionalStatChange(index, 'name', e.target.value)}
                                        placeholder="Additional Stat Name"
                                    />
                                    <input
                                        type="text"
                                        value={stat.value}
                                        onChange={(e) => handleAdditionalStatChange(index, 'value', e.target.value)}
                                        placeholder="Additional Stat Value"
                                    />
                                    <button onClick={() => removeAdditionalStat(index)}>Remove</button>
                                </div>
                            ))}
                            <button onClick={addAdditionalStat}>Add Additional Stat</button>
                        </>
                    )}

                    <label>
                        <input
                            type="checkbox"
                            checked={isComboItem}
                            onChange={() => setIsComboItem(!isComboItem)}
                        />
                        Combo Item
                    </label>

                    {isComboItem && (
                        <>
                            {comboItems.map((item, index) => (
                                <div key={index} className="combo-item">
                                    <select
                                        value={item.type}
                                        onChange={(e) => updateComboItem(index, 'type', e.target.value)}
                                    >
                                        <option value="">Select Combo Item Type</option>
                                        <option value="helmet">Helmet</option>
                                        <option value="torso">Torso</option>
                                        <option value="pants">Pants</option>
                                        <option value="gloves">Gloves</option>
                                        <option value="boots">Boots</option>
                                        <option value="shield">Shield</option>
                                        <option value="weapon">Weapon</option>
                                    </select>
                                    <input
                                        type="text"
                                        value={item.name}
                                        onChange={(e) => updateComboItem(index, 'name', e.target.value)}
                                        placeholder="Combo Item Name"
                                    />
                                    <button onClick={() => removeComboItem(index)}>Remove</button>
                                </div>
                            ))}
                            <button onClick={addComboItem}>Add Combo Item</button>
                        </>
                    )}
                </div>
                <div className="modal-buttons">
                    <button onClick={handleSave}>Save</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

EnchantmentConditionModal.propTypes = {
    onSave: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    initialCondition: PropTypes.object,
    isComboEffect: PropTypes.bool
};

export default EnchantmentConditionModal;
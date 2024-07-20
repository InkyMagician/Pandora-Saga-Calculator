import { useState } from 'react';
import PropTypes from 'prop-types';

const EnchantmentConditionModal = ({ onSave, onClose }) => {
    const [conditionType, setConditionType] = useState('');
    const [enchantmentLevel, setEnchantmentLevel] = useState(0);
    const [perkType, setPerkType] = useState('');
    const [statValue, setStatValue] = useState({ STA: 0, STR: 0, AGI: 0, DEX: 0, SPI: 0, INT: 0 });
    const [additionalStatName, setAdditionalStatName] = useState('');
    const [additionalStatValue, setAdditionalStatValue] = useState(0);
    const [isComboItem, setIsComboItem] = useState(false);
    const [comboItemType, setComboItemType] = useState('');
    const [comboItemName, setComboItemName] = useState('');

    const handleSave = () => {
        const condition = {
            type: conditionType,
            enchantmentLevel: enchantmentLevel,
            perkType: perkType,
            statValue: statValue,
            additionalStatName: additionalStatName,
            additionalStatValue: additionalStatValue,
            isComboItem,
            comboItemType: isComboItem ? comboItemType : '',
            comboItemName: isComboItem ? comboItemName : '',
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

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Add Enchantment Condition</h2>
                <select value={conditionType} onChange={(e) => setConditionType(e.target.value)}>
                    <option value="">Select Condition Type</option>
                    <option value="onEnchant">On Enchant</option>
                    <option value="every1Enchant">Every 1 Enchant</option>
                    <option value="every2Enchant">Every 2 Enchant</option>
                    <option value="every3Enchant">Every 3 Enchant</option>
                </select>

                {conditionType === 'onEnchant' && (
                    <input
                        type="number"
                        min="0"
                        max="10"
                        value={enchantmentLevel}
                        onChange={(e) => setEnchantmentLevel(parseInt(e.target.value))}
                        placeholder="Enchantment Level"
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
                        <input
                            type="text"
                            value={additionalStatName}
                            onChange={(e) => setAdditionalStatName(e.target.value)}
                            placeholder="Additional Stat Name"
                        />
                        <input
                            type="number"
                            value={additionalStatValue}
                            onChange={(e) => setAdditionalStatValue(parseInt(e.target.value))}
                            placeholder="Additional Stat Value"
                        />
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
                        <select value={comboItemType} onChange={(e) => setComboItemType(e.target.value)}>
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
                            value={comboItemName}
                            onChange={(e) => setComboItemName(e.target.value)}
                            placeholder="Combo Item Name"
                        />
                    </>
                )}

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
};

export default EnchantmentConditionModal;
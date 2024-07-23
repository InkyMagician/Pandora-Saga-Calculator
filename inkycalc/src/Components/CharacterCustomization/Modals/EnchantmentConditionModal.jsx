import { useState } from 'react';
import PropTypes from 'prop-types';
import translations from '../translations';
import '../styles/EnchantmentConditionModal.css';

const EnchantmentConditionModal = ({ onSave, onClose, initialCondition, isComboEffect, currentLanguage }) => {
    const [conditionType, setConditionType] = useState(initialCondition?.type || '');
    const [enchantmentLevel, setEnchantmentLevel] = useState(initialCondition?.enchantmentLevel || 0);
    const [perkType, setPerkType] = useState(initialCondition?.perkType || '');
    const [statValue, setStatValue] = useState(initialCondition?.statValue || { STA: 0, STR: 0, AGI: 0, DEX: 0, SPI: 0, INT: 0 });
    const [additionalStats, setAdditionalStats] = useState(initialCondition?.additionalStats || []);
    const [isComboItem, setIsComboItem] = useState(initialCondition?.isComboItem || false);
    const [comboItems, setComboItems] = useState(initialCondition?.comboItems || []);
    const [startingValue, setStartingValue] = useState(initialCondition?.startingValue || 1);

    const t = translations[currentLanguage];

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
                <h2>{isComboEffect ? t.addComboEffect : t.addEnchantmentCondition}</h2>
                <div className="scrollable-content">
                    {!isComboEffect && (
                        <select value={conditionType} onChange={(e) => setConditionType(e.target.value)}>
                            <option value="">{t.selectConditionType}</option>
                            <option value="onEnchant">{t.onEnchant}</option>
                            <option value="every1Enchant">{t.every1Enchant}</option>
                            <option value="every2Enchant">{t.every2Enchant}</option>
                            <option value="every3Enchant">{t.every3Enchant}</option>
                            <option value="fromXEvery1Enchant">{t.fromXEvery1Enchant}</option>
                        </select>
                    )}

                    {conditionType === 'onEnchant' && !isComboEffect && (
                        <input
                            type="number"
                            min="0"
                            max="10"
                            value={enchantmentLevel}
                            onChange={(e) => setEnchantmentLevel(parseInt(e.target.value))}
                            placeholder={t.enchantmentLevel}
                        />
                    )}

                    {conditionType === 'fromXEvery1Enchant' && (
                        <input
                            type="number"
                            min="1"
                            max="10"
                            value={startingValue}
                            onChange={(e) => setStartingValue(parseInt(e.target.value))}
                            placeholder={t.startingValue}
                        />
                    )}

                    <select value={perkType} onChange={(e) => setPerkType(e.target.value)}>
                        <option value="">{t.selectPerkType}</option>
                        <option value="mainStat">{t.mainStat}</option>
                        <option value="additionalStat">{t.additionalStat}</option>
                        <option value="both">{t.both}</option>
                    </select>

                    {(perkType === 'mainStat' || perkType === 'both') && (
                        <>
                            {['STA', 'STR', 'AGI', 'DEX', 'SPI', 'INT'].map(stat => (
                                <div key={stat} className="modal-stat-row">
                                    <span className="modal-stat-name">{t[stat]}</span>
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
                                        placeholder={t.additionalStatName}
                                    />
                                    <input
                                        type="text"
                                        value={stat.value}
                                        onChange={(e) => handleAdditionalStatChange(index, 'value', e.target.value)}
                                        placeholder={t.additionalStatValue}
                                    />
                                    <button onClick={() => removeAdditionalStat(index)}>{t.remove}</button>
                                </div>
                            ))}
                            <button onClick={addAdditionalStat}>{t.addAdditionalStat}</button>
                        </>
                    )}

                    <label>
                        <input
                            type="checkbox"
                            checked={isComboItem}
                            onChange={() => setIsComboItem(!isComboItem)}
                        />
                        {t.comboItem}
                    </label>

                    {isComboItem && (
                        <>
                            {comboItems.map((item, index) => (
                                <div key={index} className="combo-item">
                                    <select
                                        value={item.type}
                                        onChange={(e) => updateComboItem(index, 'type', e.target.value)}
                                    >
                                        <option value="">{t.selectComboItemType}</option>
                                        <option value="helmet">{t.helmet}</option>
                                        <option value="torso">{t.torso}</option>
                                        <option value="pants">{t.pants}</option>
                                        <option value="gloves">{t.gloves}</option>
                                        <option value="boots">{t.boots}</option>
                                        <option value="shield">{t.shield}</option>
                                        <option value="weapon">{t.weapon}</option>
                                    </select>
                                    <input
                                        type="text"
                                        value={item.name}
                                        onChange={(e) => updateComboItem(index, 'name', e.target.value)}
                                        placeholder={t.comboItemName}
                                    />
                                    <button onClick={() => removeComboItem(index)}>{t.remove}</button>
                                </div>
                            ))}
                            <button onClick={addComboItem}>{t.addComboItem}</button>
                        </>
                    )}
                </div>
                <div className="modal-buttons">
                    <button onClick={handleSave}>{t.save}</button>
                    <button onClick={onClose}>{t.cancel}</button>
                </div>
            </div>
        </div>
    );
};

EnchantmentConditionModal.propTypes = {
    onSave: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    initialCondition: PropTypes.object,
    isComboEffect: PropTypes.bool,
    currentLanguage: PropTypes.string.isRequired
};

export default EnchantmentConditionModal;
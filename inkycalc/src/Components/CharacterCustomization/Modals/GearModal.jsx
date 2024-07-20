
import PropTypes from 'prop-types';

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
    handleGearSave,
    setShowGearModal
}) => {
    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Gear Input</h2>
                <label>
                    Name:
                    <input type="text" value={gearName} onChange={(e) => setGearName(e.target.value)} />
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
                    <input type="number" value={gearArmor} onChange={(e) => setGearArmor(parseInt(e.target.value) || 0)} />
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
                        <label>
                            Soul Slots:
                            <input type="number" value={gearSoulSlots} onChange={(e) => setGearSoulSlots(parseInt(e.target.value) || 0)} />
                        </label>
                    </>
                )}
                <div className="modal-buttons">
                    <button onClick={handleGearSave}>Save</button>
                    <button onClick={() => setShowGearModal(false)}>Close</button>
                </div>
            </div>
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
    handleGearSave: PropTypes.func.isRequired,
    setShowGearModal: PropTypes.func.isRequired
};
export default GearModal;
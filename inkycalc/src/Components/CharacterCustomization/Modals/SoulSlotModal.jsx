
import PropTypes from 'prop-types';

const SoulSlotModal = ({
    gearName,
    setGearName,
    soulSlotStats,
    handleSoulSlotStatChange,
    soulSlotAdditionalStats,
    handleSoulSlotAdditionalStatChange,
    removeSoulSlotAdditionalStat,
    addSoulSlotAdditionalStat,
    handleSoulSlotSave,
    setShowSoulSlotModal
}) => {
    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Soul Slot</h2>
                <label>
                    Name:
                    <input type="text" value={gearName} onChange={(e) => setGearName(e.target.value)} />
                </label>
                <div className="modal-stats">
                    {Object.entries(soulSlotStats).map(([stat, value]) => (
                        <div key={stat} className="modal-stat-row">
                            <span className="modal-stat-name">{stat}</span>
                            <span className="modal-stat-value">{value}</span>
                            <div className="modal-stat-buttons">
                                <button onClick={() => handleSoulSlotStatChange(stat, -1)}>-</button>
                                <button onClick={() => handleSoulSlotStatChange(stat, 1)}>+</button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="additional-stats-inputs">
                    <h3>Additional Stats:</h3>
                    {soulSlotAdditionalStats.map((input, index) => (
                        <div key={index} className="additional-stat-input">
                            <input
                                type="text"
                                value={input.key}
                                onChange={(e) => handleSoulSlotAdditionalStatChange(index, 'key', e.target.value)}
                                placeholder="Stat name"
                            />
                            <input
                                type="text"
                                value={input.value}
                                onChange={(e) => handleSoulSlotAdditionalStatChange(index, 'value', e.target.value)}
                                placeholder="Value"
                            />
                            <button onClick={() => removeSoulSlotAdditionalStat(index)}>-</button>
                        </div>
                    ))}
                    <button onClick={addSoulSlotAdditionalStat}>+ Add Stat</button>
                </div>
                <div className="modal-buttons">
                    <button onClick={handleSoulSlotSave}>Save</button>
                    <button onClick={() => setShowSoulSlotModal(false)}>Close</button>
                </div>
            </div>
        </div>
    );
};
SoulSlotModal.propTypes = {
    gearName: PropTypes.string.isRequired,
    setGearName: PropTypes.func.isRequired,
    soulSlotStats: PropTypes.object.isRequired,
    handleSoulSlotStatChange: PropTypes.func.isRequired,
    soulSlotAdditionalStats: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string,
        value: PropTypes.string
    })).isRequired,
    handleSoulSlotAdditionalStatChange: PropTypes.func.isRequired,
    removeSoulSlotAdditionalStat: PropTypes.func.isRequired,
    addSoulSlotAdditionalStat: PropTypes.func.isRequired,
    handleSoulSlotSave: PropTypes.func.isRequired,
    setShowSoulSlotModal: PropTypes.func.isRequired
};
export default SoulSlotModal;
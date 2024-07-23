import PropTypes from 'prop-types';
import translations from '../translations';

const MoonModal = ({
    gearName,
    setGearName,
    moonStats,
    handleMoonStatChange,
    moonAdditionalStats,
    handleMoonAdditionalStatChange,
    removeMoonAdditionalStat,
    addMoonAdditionalStat,
    handleMoonSave,
    setShowMoonModal,
    currentLanguage
}) => {
    const t = translations[currentLanguage];

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>{t.moonSelection}</h2>
                <label>
                    {t.name}:
                    <input type="text" value={gearName} onChange={(e) => setGearName(e.target.value)} />
                </label>
                <div className="modal-stats">
                    {Object.entries(moonStats).map(([stat, value]) => (
                        <div key={stat} className="modal-stat-row">
                            <span className="modal-stat-name">{t[stat]}</span>
                            <span className="modal-stat-value">{value}</span>
                            <div className="modal-stat-buttons">
                                <button onClick={() => handleMoonStatChange(stat, -1)}>-</button>
                                <button onClick={() => handleMoonStatChange(stat, 1)}>+</button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="additional-stats-inputs">
                    <h3>{t.additionalStats}:</h3>
                    {moonAdditionalStats.map((input, index) => (
                        <div key={index} className="additional-stat-input">
                            <input
                                type="text"
                                value={input.key}
                                onChange={(e) => handleMoonAdditionalStatChange(index, 'key', e.target.value)}
                                placeholder={t.statName}
                            />
                            <input
                                type="text"
                                value={input.value}
                                onChange={(e) => handleMoonAdditionalStatChange(index, 'value', e.target.value)}
                                placeholder={t.value}
                            />
                            <button onClick={() => removeMoonAdditionalStat(index)}>{t.remove}</button>
                        </div>
                    ))}
                    <button onClick={addMoonAdditionalStat}>{t.addStat}</button>
                </div>
                <div className="modal-buttons">
                    <button onClick={handleMoonSave}>{t.save}</button>
                    <button onClick={() => setShowMoonModal(false)}>{t.close}</button>
                </div>
            </div>
        </div>
    );
};

MoonModal.propTypes = {
    gearName: PropTypes.string.isRequired,
    setGearName: PropTypes.func.isRequired,
    moonStats: PropTypes.object.isRequired,
    handleMoonStatChange: PropTypes.func.isRequired,
    moonAdditionalStats: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string,
        value: PropTypes.string
    })).isRequired,
    handleMoonAdditionalStatChange: PropTypes.func.isRequired,
    removeMoonAdditionalStat: PropTypes.func.isRequired,
    addMoonAdditionalStat: PropTypes.func.isRequired,
    handleMoonSave: PropTypes.func.isRequired,
    setShowMoonModal: PropTypes.func.isRequired,
    currentLanguage: PropTypes.string.isRequired
};

export default MoonModal;
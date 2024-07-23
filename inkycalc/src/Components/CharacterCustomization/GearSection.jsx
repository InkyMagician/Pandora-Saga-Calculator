import PropTypes from 'prop-types';
import translations from './translations';

const gearSlots = [
    'helmet', 'torso', 'pants',
    'gloves', 'boots', 'shield',
    'necklace', 'ring1', 'ring2',
    'earrings1', 'earrings2', 'belt',
    'cloak', 'weapon', 'clock'
];

const GearSection = ({ gear, handleGearClick, handleGearUnload, renderSoulSlots, totalArmor, currentLanguage }) => {
    const t = translations[currentLanguage];

    return (
        <div className="gear-section">
            <h3>{t.gear}</h3>
            <div className="gear-buttons">
                {gearSlots.map(slot => (
                    <button
                        key={slot}
                        onClick={() => handleGearClick(slot)}
                        className="gear-button"
                    >
                        {gear[slot]?.name || t[slot]}
                        {gear[slot] && (
                            <>
                                <span
                                    className="unload-gear"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleGearUnload(slot);
                                    }}
                                >
                                    {t.unload}
                                </span>
                                <div className="soul-slots">
                                    {renderSoulSlots(slot)}
                                </div>
                            </>
                        )}
                    </button>
                ))}
            </div>
            <div className="total-armor">{t.totalArmor}: {totalArmor}</div>
        </div>
    );
};

GearSection.propTypes = {
    gear: PropTypes.objectOf(PropTypes.shape({
        name: PropTypes.string
    })).isRequired,
    handleGearClick: PropTypes.func.isRequired,
    handleGearUnload: PropTypes.func.isRequired,
    renderSoulSlots: PropTypes.func.isRequired,
    totalArmor: PropTypes.number.isRequired,
    currentLanguage: PropTypes.string.isRequired
};

export default GearSection;
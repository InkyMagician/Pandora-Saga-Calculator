import PropTypes from 'prop-types';

const gearSlots = ['Helmet', 'Torso', 'Pants', 'Gloves', 'Boots', 'Shield', 'Necklace', 'Ring 1', 'Ring 2', 'Earrings 1', 'Earrings 2', 'Belt', 'Cloak', 'Weapon', 'Clock'];

const GearSection = ({ gear, handleGearClick, handleGearUnload, renderSoulSlots, totalArmor }) => {
    return (
        <div className="gear-section">
            <h3>Gear</h3>
            <div className="gear-buttons">
                {gearSlots.map(slot => (
                    <button
                        key={slot}
                        onClick={() => handleGearClick(slot)}
                        className="gear-button"
                    >
                        {gear[slot]?.name || slot}
                        {gear[slot] && (
                            <>
                                <span
                                    className="unload-gear"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleGearUnload(slot);
                                    }}
                                >
                                    ❌
                                </span>
                                <div className="soul-slots">
                                    {renderSoulSlots(slot)}
                                </div>
                            </>
                        )}
                    </button>
                ))}
            </div>
            <div className="total-armor">Total Armor: {totalArmor}</div>
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
    totalArmor: PropTypes.number.isRequired
};
export default GearSection;
import PropTypes from 'prop-types';
const races = ['Human', 'Elf', 'Dwarf', 'Myrine', 'Enkidu', 'Lapin'];
const classes = ['Warrior', 'Scout', 'Priest', 'Mage'];

const Header = ({
    selectedRace,
    setSelectedRace,
    selectedClass,
    setSelectedClass,
    selectedMoon1,
    selectedMoon3,
    handleMoonClick,
    setShowPresetModal
}) => {
    return (
        <div className="header">
            <select
                value={selectedRace}
                onChange={(e) => setSelectedRace(e.target.value)}
                className="race-select"
            >
                <option value="">Select Race</option>
                {races.map(race => (
                    <option key={race} value={race}>{race}</option>
                ))}
            </select>

            <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="class-select"
            >
                <option value="">Select Class</option>
                {classes.map(cls => (
                    <option key={cls} value={cls}>{cls}</option>
                ))}
            </select>

            <button
                onClick={() => handleMoonClick('moon1')}
                className="moon-button"
            >
                {selectedMoon1?.name || 'Select Moon 1'}
            </button>

            <button
                onClick={() => handleMoonClick('moon3')}
                className="moon-button"
            >
                {selectedMoon3?.name || 'Select Moon 3'}
            </button>

            <button
                onClick={() => setShowPresetModal(true)}
                className="preset-button"
            >
                Save Preset
            </button>
        </div>
    );
};
Header.propTypes = {
    selectedRace: PropTypes.string.isRequired,
    setSelectedRace: PropTypes.func.isRequired,
    selectedClass: PropTypes.string.isRequired,
    setSelectedClass: PropTypes.func.isRequired,
    selectedMoon1: PropTypes.shape({
        name: PropTypes.string
    }),
    selectedMoon3: PropTypes.shape({
        name: PropTypes.string
    }),
    handleMoonClick: PropTypes.func.isRequired,
    setShowPresetModal: PropTypes.func.isRequired
};
export default Header;
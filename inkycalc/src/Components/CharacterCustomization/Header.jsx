import PropTypes from 'prop-types';
import translations from './translations';

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
    currentLanguage,
    children
}) => {
    const t = translations[currentLanguage];

    return (
        <div className="header">
            <select
                value={selectedRace}
                onChange={(e) => setSelectedRace(e.target.value)}
                className="race-select"
            >
                <option value="">{t.selectRace}</option>
                {races.map(race => (
                    <option key={race} value={race}>{t[race.toLowerCase()]}</option>
                ))}
            </select>

            <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="class-select"
            >
                <option value="">{t.selectClass}</option>
                {classes.map(cls => (
                    <option key={cls} value={cls}>{t[cls.toLowerCase()]}</option>
                ))}
            </select>

            <button
                onClick={() => handleMoonClick('moon1')}
                className="moon-button"
            >
                {selectedMoon1?.name || t.selectMoon1}
            </button>

            <button
                onClick={() => handleMoonClick('moon3')}
                className="moon-button"
            >
                {selectedMoon3?.name || t.selectMoon3}
            </button>

            {children}
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
    currentLanguage: PropTypes.string.isRequired,
    children: PropTypes.node
};

export default Header;
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import translations from '../translations';

const GearSelectionModal = ({ gearType, savedGear, onSelectGear, onClose, onDeleteGear, currentLanguage }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredGear, setFilteredGear] = useState([]);

    const t = translations[currentLanguage];

    useEffect(() => {
        const filtered = savedGear.filter(gear =>
            gear.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredGear(filtered);
    }, [savedGear, searchTerm]);

    return (
        <div className="modal gear-selection-modal">
            <div className="modal-content">
                <h2>{t.select} {t[gearType.toLowerCase()]}</h2>
                <input
                    type="text"
                    placeholder={t.searchGear}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
                <div className="gear-list">
                    {filteredGear.map((gear, index) => (
                        <div key={index} className="gear-item">
                            <h3>{gear.name}</h3>
                            <div className="gear-item-actions">
                                <button onClick={() => onSelectGear(gear)}>{t.select}</button>
                                <button onClick={() => onDeleteGear(gearType, index)}>{t.delete}</button>
                            </div>
                        </div>
                    ))}
                </div>
                <button onClick={onClose} className="close-button">{t.close}</button>
            </div>
        </div>
    );
};

GearSelectionModal.propTypes = {
    gearType: PropTypes.string.isRequired,
    savedGear: PropTypes.array.isRequired,
    onSelectGear: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    onDeleteGear: PropTypes.func.isRequired,
    currentLanguage: PropTypes.string.isRequired
};

export default GearSelectionModal;
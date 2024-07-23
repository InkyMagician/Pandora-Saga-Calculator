import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const GearSelectionModal = ({ gearType, savedGear, onSelectGear, onClose, onDeleteGear }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredGear, setFilteredGear] = useState([]);

    useEffect(() => {
        const filtered = savedGear.filter(gear =>
            gear.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredGear(filtered);
    }, [savedGear, searchTerm]);

    return (
        <div className="modal gear-selection-modal">
            <div className="modal-content">
                <h2>Select {gearType}</h2>
                <input
                    type="text"
                    placeholder="Search gear..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
                <div className="gear-list">
                    {filteredGear.map((gear, index) => (
                        <div key={index} className="gear-item">
                            <h3>{gear.name}</h3>
                            <div className="gear-item-actions">
                                <button onClick={() => onSelectGear(gear)}>Select</button>
                                <button onClick={() => onDeleteGear(gearType, index)}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
                <button onClick={onClose} className="close-button">Close</button>
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
};

export default GearSelectionModal;

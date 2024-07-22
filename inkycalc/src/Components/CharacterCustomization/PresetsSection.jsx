import { useState } from 'react';
import PropTypes from 'prop-types';

const PresetsSection = ({ presets, loadPreset, deletePreset, updatePreset, savePreset }) => {
    const [newPresetName, setNewPresetName] = useState('');

    const handleSavePreset = () => {
        if (newPresetName.trim()) {
            savePreset(newPresetName.trim());
            setNewPresetName('');
        } else {
            alert('Please enter a name for the preset');
        }
    };

    return (
        <div className="presets-section">
            <h3>Saved Presets</h3>
            <div className="new-preset">
                <input
                    type="text"
                    value={newPresetName}
                    onChange={(e) => setNewPresetName(e.target.value)}
                    placeholder="New preset name"
                />
                <button onClick={handleSavePreset}>Save New Preset</button>
            </div>
            {presets.length === 0 ? (
                <p>No presets saved yet.</p>
            ) : (
                presets.map((preset, index) => (
                    <div key={index} className="preset-item">
                        <span className="preset-name">{preset.name}</span>
                        <div className="preset-buttons">
                            <button
                                className="load-preset-button"
                                onClick={() => loadPreset(preset)}
                            >
                                Load
                            </button>
                            <button
                                className="update-preset-button"
                                onClick={() => updatePreset(preset)}
                            >
                                Update
                            </button>
                            <button
                                className="delete-preset-button"
                                onClick={() => deletePreset(preset)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

PresetsSection.propTypes = {
    presets: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        // Add other preset properties here
    })).isRequired,
    loadPreset: PropTypes.func.isRequired,
    deletePreset: PropTypes.func.isRequired,
    updatePreset: PropTypes.func.isRequired,
    savePreset: PropTypes.func.isRequired
};

export default PresetsSection;
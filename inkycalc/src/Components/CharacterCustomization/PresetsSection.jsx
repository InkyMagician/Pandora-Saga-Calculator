import { useState } from 'react';
import PropTypes from 'prop-types';
import translations from './translations';

const PresetsSection = ({ presets, loadPreset, deletePreset, updatePreset, savePreset, currentLanguage }) => {
    const [newPresetName, setNewPresetName] = useState('');
    const t = translations[currentLanguage];

    const handleSavePreset = () => {
        if (newPresetName.trim()) {
            savePreset(newPresetName.trim());
            setNewPresetName('');
        } else {
            alert(t.enterPresetName);
        }
    };

    return (
        <div className="presets-section">
            <h3>{t.savedPresets}</h3>
            <div className="new-preset">
                <input
                    type="text"
                    value={newPresetName}
                    onChange={(e) => setNewPresetName(e.target.value)}
                    placeholder={t.newPresetName}
                />
                <button onClick={handleSavePreset}>{t.saveNewPreset}</button>
            </div>
            {presets.length === 0 ? (
                <p>{t.noPresets}</p>
            ) : (
                presets.map((preset, index) => (
                    <div key={index} className="preset-item">
                        <span className="preset-name">{preset.name}</span>
                        <div className="preset-buttons">
                            <button
                                className="load-preset-button"
                                onClick={() => loadPreset(preset)}
                            >
                                {t.load}
                            </button>
                            <button
                                className="update-preset-button"
                                onClick={() => updatePreset(preset)}
                            >
                                {t.update}
                            </button>
                            <button
                                className="delete-preset-button"
                                onClick={() => deletePreset(preset)}
                            >
                                {t.delete}
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
    savePreset: PropTypes.func.isRequired,
    currentLanguage: PropTypes.string.isRequired
};

export default PresetsSection;
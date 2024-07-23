import PropTypes from 'prop-types';
import translations from '../translations';

const PresetModal = ({
    presetName,
    setPresetName,
    savePreset,
    setShowPresetModal,
    currentLanguage
}) => {
    const t = translations[currentLanguage];

    const handleSave = () => {
        if (presetName.trim()) {
            savePreset();
        } else {
            alert(t.enterPresetName);
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>{t.savePreset}</h2>
                <input
                    type="text"
                    value={presetName}
                    onChange={(e) => setPresetName(e.target.value)}
                    placeholder={t.enterPresetName}
                />
                <div className="modal-buttons">
                    <button onClick={handleSave}>{t.save}</button>
                    <button onClick={() => setShowPresetModal(false)}>{t.cancel}</button>
                </div>
            </div>
        </div>
    );
};

PresetModal.propTypes = {
    presetName: PropTypes.string.isRequired,
    setPresetName: PropTypes.func.isRequired,
    savePreset: PropTypes.func.isRequired,
    setShowPresetModal: PropTypes.func.isRequired,
    currentLanguage: PropTypes.string.isRequired
};

export default PresetModal;
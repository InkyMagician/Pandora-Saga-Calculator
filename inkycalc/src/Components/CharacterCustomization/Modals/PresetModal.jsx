import PropTypes from 'prop-types';

const PresetModal = ({
    presetName,
    setPresetName,
    savePreset,
    setShowPresetModal
}) => {
    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Save Preset</h2>
                <input
                    type="text"
                    value={presetName}
                    onChange={(e) => setPresetName(e.target.value)}
                    placeholder="Enter preset name"
                />
                <div className="modal-buttons">
                    <button onClick={savePreset}>Save</button>
                    <button onClick={() => setShowPresetModal(false)}>Cancel</button>
                </div>
            </div>
        </div>
    );
};
PresetModal.propTypes = {
    presetName: PropTypes.string.isRequired,
    setPresetName: PropTypes.func.isRequired,
    savePreset: PropTypes.func.isRequired,
    setShowPresetModal: PropTypes.func.isRequired
};
export default PresetModal;
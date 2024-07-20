
import PropTypes from 'prop-types';

const PresetsSection = ({ presets, loadPreset, deletePreset }) => {
    return (
        <div className="presets-section">
            <h3>Saved Presets</h3>
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
    deletePreset: PropTypes.func.isRequired
};
export default PresetsSection;
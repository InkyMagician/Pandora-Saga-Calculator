import { ChevronUp, ChevronDown } from 'lucide-react';
import PropTypes from 'prop-types';

const StatsSection = ({
    statPoints,
    totalStats,
    baseStats,
    manualStats,
    equipmentStats,
    handleStatChange,
    additionalStats,
    selectedRace,
    selectedClass
}) => {
    const calculateStatCost = (currentValue) => {
        if (currentValue < 30) return 2;
        if (currentValue < 50) return 3;
        if (currentValue < 70) return 4;
        if (currentValue < 90) return 5;
        return 6;
    };

    const isStatChangeEnabled = selectedRace && selectedClass;

    const renderStat = (stat) => {
        const baseValue = baseStats[stat] || 0;
        const manualValue = manualStats[stat] || 0;
        const equipmentValue = equipmentStats[stat] || 0;
        const totalValue = totalStats[stat] || 0;

        const increaseCost = calculateStatCost(baseValue + manualValue);
        const decreaseCost = calculateStatCost(baseValue + manualValue - 1);

        return (
            <div key={stat} className="stat-row">
                <span className="stat-name">{stat}</span>
                <div className="stat-details">
                    <span className="stat-value">{totalValue}</span>
                    <span className="stat-breakdown">
                        ({baseValue + manualValue}
                        {equipmentValue > 0 && `+${equipmentValue}`})
                    </span>
                </div>
                <div className="stat-buttons">
                    <button
                        onClick={() => handleStatChange(stat, 1)}
                        disabled={!isStatChangeEnabled || baseValue + manualValue >= 99 || statPoints < increaseCost}
                    >
                        <ChevronUp size={16} />
                        <span className="cost-indicator">{increaseCost}</span>
                    </button>
                    <button
                        onClick={() => handleStatChange(stat, -1)}
                        disabled={!isStatChangeEnabled || manualValue <= 0}
                    >
                        <ChevronDown size={16} />
                        <span className="cost-indicator">{decreaseCost}</span>
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className="stats-section">
            <div className="primary-stats-box">
                <div className="stats-header">
                    <div className="stat-points">Stat Points: {statPoints}</div>
                </div>
                {!isStatChangeEnabled && (
                    <div className="stats-warning">Select a race and class to modify stats</div>
                )}
                <div className="primary-stats">
                    {Object.keys(totalStats).map(renderStat)}
                </div>
            </div>
            <div className="additional-stats-box">
                <h3>Additional Stats</h3>
                <ul>
                    {Object.entries(additionalStats).map(([stat, value]) => (
                        <li key={stat}>{stat}: {value}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

StatsSection.propTypes = {
    statPoints: PropTypes.number.isRequired,
    totalStats: PropTypes.object.isRequired,
    baseStats: PropTypes.object.isRequired,
    manualStats: PropTypes.object.isRequired,
    equipmentStats: PropTypes.object.isRequired,
    handleStatChange: PropTypes.func.isRequired,
    additionalStats: PropTypes.object.isRequired,
    selectedRace: PropTypes.string.isRequired,
    selectedClass: PropTypes.string.isRequired
};

export default StatsSection;
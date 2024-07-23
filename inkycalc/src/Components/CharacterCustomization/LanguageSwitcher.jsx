import { useState } from 'react';
import PropTypes from 'prop-types';

const LanguageSwitcher = ({ onLanguageChange }) => {
    const [currentLanguage, setCurrentLanguage] = useState('en');

    const toggleLanguage = () => {
        const newLanguage = currentLanguage === 'en' ? 'ru' : 'en';
        setCurrentLanguage(newLanguage);
        onLanguageChange(newLanguage);
    };

    return (
        <button onClick={toggleLanguage} className="language-switcher">
            {currentLanguage === 'en' ? '🇷🇺' : 'EN'}
        </button>
    );
};

LanguageSwitcher.propTypes = {
    onLanguageChange: PropTypes.func.isRequired,
};

export default LanguageSwitcher;
import React, { useState } from 'react';

const LanguageSwitcher = () => {
    const [selectedLanguage, setSelectedLanguage] = useState('en');

    const handleLanguageChange = (event) => {
        const language = event.target.value;
        setSelectedLanguage(language);

        // Load Google Translate
        window.googleTranslateElementInit = function () {
            new window.google.translate.TranslateElement({
                pageLanguage: 'en', // Set your default page language
                includedLanguages: 'en,hi,te,ta,bn,ml,gu,kn,pa,or,ma,ur,as,ne,sd,sa,ar', // List of Indian languages to include
                layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            }, 'google_translate_element');
        };

        // Initialize translation
        if (window.google) {
            const translateElement = new window.google.translate.TranslateElement();
            translateElement.setEnabled(true);
            translateElement.setLanguage(language);
        } else {
            const script = document.createElement('script');
            script.src = "//translate.google.com/translate_static/core/element/bridge.js";
            script.type = 'text/javascript';
            script.onload = () => {
                handleLanguageChange({ target: { value: language } });
            };
            document.body.appendChild(script);
        }
    };

    return (
        <div>
            <h2>Select Language</h2>
            <select value={selectedLanguage} onChange={handleLanguageChange}>
                <option value="en">English</option>
                <option value="hi">Hindi</option>
                <option value="te">Telugu</option>
                <option value="ta">Tamil</option>
                <option value="bn">Bengali</option>
                <option value="ml">Malayalam</option>
                <option value="gu">Gujarati</option>
                <option value="kn">Kannada</option>
                <option value="pa">Punjabi</option>
                <option value="or">Odia</option>
                <option value="ma">Marathi</option>
                <option value="ur">Urdu</option>
                <option value="as">Assamese</option>
                <option value="ne">Nepali</option>
                <option value="sd">Sindhi</option>
                <option value="sa">Sanskrit</option>
                <option value="ar">Arabic</option>
            </select>
        </div>
    );
};

export default LanguageSwitcher;

document.addEventListener("DOMContentLoaded", function() {
    // Fetch the selected language from localStorage or default to 'en'
    const lang = getCurrentLang();

    // If no language is set, default to English
    if (!lang) {
        lang = 'en';  // Default language
        localStorage.setItem('lang', lang);  // Save the default language to localStorage
    }
    
    // Fetch the language data from the JSON file
    fetch('../assets/languages.json')
    .then(response => response.json())
    .then(languageData => {
        if (languageData[lang]) {
            injectHeaderContent(lang, languageData);
            injectFooterContent(lang, languageData);
        } else {
            console.error("Language data not found for language: " + lang);
        }
    })
    .catch(error => {
        console.error("Error loading language JSON:", error);
    });

// Initialize language selector dropdown based on the stored language
const langSelector = document.getElementById('language-selector');
if (langSelector) {
    // Set the dropdown value to the current language from localStorage
    langSelector.value = lang;

    langSelector.addEventListener('change', function() {
        const selectedLang = this.value;
        localStorage.setItem('lang', selectedLang);  // Save the selected language to localStorage
        location.reload();  // Reload the page to apply the new language
    });
} else {
    console.error('Language selector not found!');
}
});
// Function to inject content into the header based on the selected language
function injectHeaderContent(lang, languageData) {
    const header = document.getElementById('header-placeholder');
    
    // Inject dynamic content like page titles, menu items, etc.
    header.innerHTML = `
        <nav>
            <ul>
                <li><a href="index.html" id="home">${languageData[lang].index.h1}</a></li>
                <li><a href="about.html" id="about">${languageData[lang].about.h1}</a></li>
                <li><a href="products.html" id="products">${languageData[lang].products.h1}</a></li>
                <li><a href="contact.html" id="contact">${languageData[lang].contact.h1}</a></li>
            </ul>
        </nav>
    `;
}

// Function to inject content into the footer based on the selected language
function injectFooterContent(lang, languageData) {
    const footer = document.getElementById('footer-placeholder');
    
    // Inject footer content dynamically based on the language
    footer.innerHTML = `
        <p>${languageData[lang].footer.line1}</p>
        <p>${languageData[lang].footer.line2}</p>
        <p>${languageData[lang].footer.line3}</p>
        <p>${languageData[lang].footer.line4}</p>
        <p>${languageData[lang].footer.line5}</p>
    `;
}

// Function to get the currently selected language from localStorage or default to 'en'
function getCurrentLang() {
    return localStorage.getItem('lang') || 'en';  // Default to 'en' if no language is set
}

// Function to set the selected language in localStorage
function setLang(language) {
    localStorage.setItem('lang', language);
    location.reload();  // Reload the page to apply the language change
}

// Function to handle language selection change (dropdown change event)
document.getElementById('language-selector').addEventListener('change', function() {
    const selectedLang = this.value;  // Get selected language from the dropdown
    setLang(selectedLang);  // Set the selected language in localStorage
});

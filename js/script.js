document.addEventListener("DOMContentLoaded", function() {
    // Get the selected language (default to 'en')
    const lang = getCurrentLang();
    
    // Fetch the language data from the JSON file
    fetch('/assets/languages.json')
        .then(response => response.json())
        .then(languageData => {
            // Ensure the language data exists for the selected language
            if (languageData[lang]) {
                // Inject content based on the current page
                injectContent('index', lang, languageData);
                
                // Inject content for other pages if applicable
                if (document.getElementById("h1about")) {
                    document.getElementById("h1about").textContent = languageData[lang].about.h1;
                }
                if (document.getElementById("p1about")) {
                    document.getElementById("p1about").textContent = languageData[lang].about.p1;
                }
                if (document.getElementById("h1products")) {
                    document.getElementById("h1products").textContent = languageData[lang].products.h1;
                }
                if (document.getElementById("p1products")) {
                    document.getElementById("p1products").textContent = languageData[lang].products.p1;
                }
                if (document.getElementById("h1contact")) {
                    document.getElementById("h1contact").textContent = languageData[lang].contact.h1;
                }
                if (document.getElementById("p1contact")) {
                    document.getElementById("p1contact").textContent = languageData[lang].contact.p1;
                }
            } else {
                console.error("Language data not found for language: " + lang);
            }
        })
        .catch(error => {
            console.error("Error loading language JSON:", error);
        });
});

// Helper function to inject content based on page section and language
function injectContent(page, lang, languageData) {
    const pageData = languageData[lang][page];
    Object.keys(pageData).forEach(key => {
        const element = document.getElementById(`${key}${page}`);
        if (element) {
            element.textContent = pageData[key];
        }
    });
}

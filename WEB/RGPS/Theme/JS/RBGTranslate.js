const API_KEY = 'YOUR_API_KEY';

// Function to translate text
async function translateHindiToEnglish(hindiText) {
    const response = await fetch(`https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            q: hindiText,
            source: 'hi',
            target: 'en',
            format: 'text'
        })
    });

    const data = await response.json();
    return data.data.translations[0].translatedText;
}

// Example usage
async function translateAndLog(hindiText) {
    const translatedText = await translateHindiToEnglish(hindiText);
    console.log(translatedText);
}

// Call the function with your Hindi text
translateAndLog('मैं इंग्लिश सीखना चाहता हूं।');
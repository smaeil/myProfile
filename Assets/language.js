// Registerd language files with thier loacations. remeber the value of the new language must be added tho select list in html as well
const langs = [en , de, fa, ar, tr];

// Language slot with english language as a default:
let contents = en;

// changing the language from select list
function changeLanguage(lang) {
    
    const target = langs.find(item => item.name === lang);

    if (target) {
        contents = target;
    }
    
    //updating the page with new language
    updateLanguage(contents.payload, contents.code);
    const body = document.querySelector('body');
    body.dir = contents.dir;
}



// updating the language for entire document
function updateLanguage(data, code) {

    

    for (const [key, value] of Object.entries(data)) {

        // if the key is an object it recurs to itself
        if (typeof value === 'object' && value !== null) {
            updateLanguage(value, code);
        } else {

            const element = document.querySelector(`[data-bind="${key}"]`);
            element.innerHTML = value;
            element.lang = code;
        }
    }
}
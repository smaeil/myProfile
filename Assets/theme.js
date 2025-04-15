let particleColor = '#eaeaea';

// themeData
const themes = [
    {name: 'light', href: './Assets/themes/light/light.css', particleColor: '#cccccc'},
    {name: 'dark', href: './Assets/themes/dark/dark.css', particleColor: '#404040'},
    {name: 'sunnySide', href: './Assets/themes/sunnySide/sunnySide.css', particleColor: '#ffae00'}
];

// theme selector head element
const themeSelector = document.querySelector('#themes-selector');
const themeMenu = document.querySelector('#themes');

function changeTheme(theme) {
    const target = themes.find(item => item.name === theme);

    if (!target) {
        return;
    }

    // Setting the theme:
    themeSelector.href = target.href;
    particleColor = target.particleColor;

    // saving the selected theme to local storage:
    localStorage.setItem('theme', target.name);

}

function themeOnload () {
    const storedTheme = localStorage.getItem('theme');

    if (storedTheme) {
        themeMenu.value = storedTheme;
        changeTheme(storedTheme);
    } else {
        changeTheme('light');
    }
    
}

themeOnload();
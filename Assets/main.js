// Global Variables: ********************************************

const navDropDown = document.querySelector('#nav-dropdown');




// interface control: *******************************************

// nav
function toggleDropdown() {
    if (navDropDown.classList.contains('flex')) {
        navDropDown.classList.remove('flex');
    } else {
        navDropDown.classList.add('flex');
    }
}

// Page contents: ***********************************************


// App Listeners: ***********************************************

// closes the menus on click:
window.addEventListener('click', e => {
    if (e.target.classList.contains('menu-btn')) {
        toggleDropdown();
    } else {
        navDropDown.classList.remove('flex');
    }
});

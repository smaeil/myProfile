// Global Variables and objects: ********************************************

const navDropDown = document.querySelector('#nav-dropdown');
const pagesCollection = document.querySelectorAll('.page');
const pages = Array.from(pagesCollection);
let currentPageIndex = 0;

// sounds:
const flipCard = document.querySelector('#flip-card');





// interface control: *******************************************

// nav menu
function toggleDropdown() {
    if (navDropDown.classList.contains('flex')) {
        navDropDown.classList.remove('flex');
    } else {
        navDropDown.classList.add('flex');
    }
}

// Dark mode:

// Language Change:


// recalling the lang from local storage:

// navigation: *************************************************

let inMove = false;
async function getPage(pageId) {
    try {

        // checks if the page is in move deactivate the function 
        if (inMove) return;
        inMove = true;

        if (!pageId) {
            return;
        }
        flipCard.volume = 0.2;
        const targetPage = document.querySelector(`#${pageId}`);
        const targetPageIndex = pages.indexOf(targetPage);
        
        // finding the navigation direction:
        const isForward = targetPageIndex - currentPageIndex > 0 ? true : false;
        // finding the number of steps:
        const steps = Math.abs(targetPageIndex - currentPageIndex);
        
        if (steps === 0) return;
        
        if(isForward) {
            for(let i = 0; i < steps; i++) {
                // setting the currentpage and next page
                const currentPage = pagesCollection[currentPageIndex];
                const nextPage = pagesCollection[currentPageIndex + 1];
    
                nextPage.classList.add('top');
                nextPage.classList.add('cover');
                nextPage.classList.remove('hide');

                // playing the sound
                flipCard.play();
    
                await delay(401);
                currentPage.classList.add('hide');
                nextPage.classList.remove('cover');
                nextPage.classList.remove('top');
    
                // setting the new current page index
                currentPageIndex++;

                // updating scroll spy
                document.querySelector('#scroll-spy').style.width = `${currentPageIndex * 25}%`;


                // resetting the inMove
                inMove = false;

                // updating the history ???
            }
        } else {
            for(let i = 0; i < steps; i++) {
                // setting the currentpage and next page
                const currentPage = pagesCollection[currentPageIndex];
                const nextPage = pagesCollection[currentPageIndex - 1];
    
                nextPage.classList.add('top');
                nextPage.classList.add('uncover');
                nextPage.classList.remove('hide');

                // playing the sound
                flipCard.play();
    
                await delay(401);
                currentPage.classList.add('hide');
                nextPage.classList.remove('uncover');
                nextPage.classList.remove('top');
    
                // setting the new current page index
                currentPageIndex--;

                // updating scroll spy
                document.querySelector('#scroll-spy').style.width = `${currentPageIndex * 25}%`;

                //resetting the inMove
                inMove = false;

                // updating the history ???
            }
    
        }
    } catch (error) {
        console.log(error);
        inMove = false;
    }
}


// Page contents: ***********************************************

// core functions: *********************************************

function delay(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}
// App Listeners: ***********************************************

// closes the menus on click:
window.addEventListener('click', e => {
    if (e.target.classList.contains('menu-btn')) {
        toggleDropdown();
    } else {
        navDropDown.classList.remove('flex');
    }
});


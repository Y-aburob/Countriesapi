const body = document.getElementById('body');
const darkMode = document.getElementById("dark-mode");

const header = document.getElementById('header');
const input = document.getElementById('search');
const cards = document.getElementById('cards');

const cardInfo = document.getElementById('info');
const searchButtonDarkMode = document.getElementById('search-button');
const searchContainer = document.querySelector('.search');
const searchImg = document.getElementById('searchImg');
const darkModeInfo = document.getElementById('info');
const backButtonDarkMode = document.getElementById('back');
const darkmoon = document.getElementById('darkmoon');
const contanerselect = document.getElementById('contanerselect');
const selectButton = document.getElementById('select-button');

const remover = document.getElementById('remover');
const africa = document.getElementById('Africa')
const america = document.getElementById('America')
const oceania = document.getElementById('Oceania')
const europe = document.getElementById('Europe')
const asia = document.getElementById('Asia')




let datalist = [];
let dd = []
// let searchlist = [];


// fetching data from API 

// reloadDarkMode();

fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(data => {

        datalist = data
        
        for (let i = 0; i < datalist.length; i++) {

            if(datalist[i].name.common === 'Israel' || datalist[i].name.common === 'New Zealand' || datalist[i].name.common === 'Nicaragua' || datalist[i].name.common === 'Anguilla') {
                continue
            }

            cards.innerHTML += `
                <span class="order" id="card${i}"> 
                    <div class="card">
                        <img src="${datalist[i].flags.png}" width="20px" alt="oops">
                        <div class="text">
                        <h4>${datalist[i].name.common}</h4>
                        <p><span>Population:</span> ${datalist[i].population}</p>
                        <p><span>Region:</span> ${datalist[i].region}</p>
                        <p><span>Capital:</span> ${datalist[i].capital}</p>
                        </div>
                    </div>
                </span>
            `;

            // searchlist.push(datalist[i].name.common);
        }
        
        // if(localStorage.getItem('none') === 'none') {
            
        //     document.getElementById('detail-img').src = localStorage.getItem('detailImage');
        //     document.getElementById('detail-title').textContent = localStorage.getItem('detailTitle');
        //     document.getElementById('native-name').textContent = localStorage.getItem('nativeNamee');
        //     document.getElementById('population').textContent = localStorage.getItem('population');
        //     document.getElementById('region').textContent = localStorage.getItem('region');
        //     document.getElementById('Sub-region').textContent = localStorage.getItem('SubRegion');
        //     document.getElementById('capital').textContent = localStorage.getItem('capital');
        //     document.getElementById('top-level-domain').textContent = localStorage.getItem('topLevelDomain');
        // }

        if (localStorage.getItem('none') === 'none') {
            
            loadCardInfoFromStorage()

            backButtonDarkMode.addEventListener('click', function() {
                darkModeInfo.classList.toggle('none')
                localStorage.removeItem('none');
                localStorage.removeItem('detailImage');
                localStorage.removeItem('detailTitle');
                localStorage.removeItem('nativeNamee');
                localStorage.removeItem('population');
                localStorage.removeItem('region');
                localStorage.removeItem('SubRegion');
                localStorage.removeItem('capital');
                localStorage.removeItem('topLevelDomain');
            })
        }
        
        reloadDarkMode();
        cardsInfos();

    });





function loadCardInfoFromStorage() {
    document.getElementById('detail-img').src = localStorage.getItem('detailImage');
    document.getElementById('detail-title').textContent = localStorage.getItem('detailTitle');
    document.getElementById('native-name').textContent = localStorage.getItem('nativeNamee');
    document.getElementById('population').textContent = localStorage.getItem('population');
    document.getElementById('region').textContent = localStorage.getItem('region');
    document.getElementById('Sub-region').textContent = localStorage.getItem('SubRegion');
    document.getElementById('capital').textContent = localStorage.getItem('capital');
    document.getElementById('top-level-domain').textContent = localStorage.getItem('topLevelDomain');

    darkModeInfo.classList.add('none');
}

// saving DarkMode if reload localStorage

function reloadDarkMode() {
    if (localStorage.getItem('dark') === 'dark') {
        DarkMode();
    }
    darkMode.addEventListener('click', DarkMode);
}

// dark mode

function DarkMode() {
    
    const currentMode = body.classList.toggle('dark') ? 'dark' : 'light';
    localStorage.setItem('dark', currentMode);
    
    cardInfo.classList.toggle('dark');
    searchContainer.classList.toggle('light-dark1');
    searchButtonDarkMode.classList.toggle('light-dark1');
    input.classList.toggle('light-dark1');
    header.classList.toggle('headerdark');
    darkMode.classList.toggle('light-dark');
    contanerselect.classList.toggle('light-dark');
    selectButton.classList.toggle('light-dark');
    remover.classList.toggle('light-dark');
    
    africa.classList.toggle('light-dark')
    america.classList.toggle('light-dark')
    oceania.classList.toggle('light-dark')
    europe.classList.toggle('light-dark')
    asia.classList.toggle('light-dark')


    searchImg.src = currentMode === 'dark' ? 'icons8-search-50-white.png' : 'icons8-searchsvg.svg';
    darkmoon.src = currentMode === 'dark' ? 'icons8-moon-50white.png' : 'icons8-moon-24.png';
    
    const elements = document.querySelectorAll('.search-sort select, .cards .card');
    for (let i = 0; i < elements.length; i++) {
        elements[i].classList.toggle('box-shadow-darkmode');
    }
    
    if (darkModeInfo.style.display !== 'none') {

        let backImg = document.getElementById('backimg');
        backButtonDarkMode.classList.toggle('box-shadow-darkmode');
        backImg.src = currentMode === 'dark' ? 'icons8-left-arrow-50white.png' : 'icons8-left-arrow-50.png';
        
        const borderCountries = document.querySelectorAll('.border-countries');
        for (let i = 0; i < borderCountries.length; i++) {
            borderCountries[i].classList.toggle('box-shadow-darkmode');

        }
    }
}

function cardsInfos() {
    
    for (let i = 0; i < datalist.length; i++) {

        const card = document.getElementById(`card${i}`);
        
        card.addEventListener('click', function() {

            const nativeName = datalist[i].name.nativeName?.eng?.official || datalist[i].name.common;
            
            const detailImg = localStorage.setItem('detailImage', `${datalist[i].flags.png}`);
            const detailTitle = localStorage.setItem('detailTitle', `${datalist[i].name.common}`);
            const nativeNamee = localStorage.setItem('nativeNamee', nativeName);
            const population = localStorage.setItem('population', `${datalist[i].population}`);

            const region = localStorage.setItem('region', `${datalist[i].region}`);

            const SubRegion = localStorage.setItem('SubRegion', `${datalist[i].subregion || 'no subregion'}`);
            const capital = localStorage.setItem('capital', `${datalist[i].capital}`);
            const topLevelDomain = localStorage.setItem('topLevelDomain', `${datalist[i].tld}`);

            localStorage.setItem('none', 'none');
            darkModeInfo.classList.add('none');


            document.getElementById('detail-img').src = datalist[i].flags.png;
            document.getElementById('detail-title').textContent = datalist[i].name.common;
            document.getElementById('native-name').textContent = nativeName;
            document.getElementById('population').textContent = datalist[i].population;
            document.getElementById('region').textContent = datalist[i].region;
            document.getElementById('Sub-region').textContent = datalist[i].subregion || 'no subregion';
            document.getElementById('capital').textContent = datalist[i].capital;
            document.getElementById('top-level-domain').textContent = datalist[i].tld;



            backButtonDarkMode.addEventListener('click', function() {
                darkModeInfo.classList.remove('none');
                localStorage.removeItem('none');
                localStorage.removeItem('detailImage');
                localStorage.removeItem('detailTitle');
                localStorage.removeItem('nativeNamee');
                localStorage.removeItem('population');
                localStorage.removeItem('region');
                localStorage.removeItem('SubRegion');
                localStorage.removeItem('capital');
                localStorage.removeItem('topLevelDomain');
            });
        });
    }
}


// Debounce function for search
function debounce(callback, delay) {
    let timer;
    return function () {
        clearTimeout(timer);
        timer = setTimeout(callback, delay);
    }
}

input.addEventListener('input', debounce(searchCountries, 300));

function searchCountries() {

    const inputValue = input.value.toLowerCase();

  // if(inputValue) {
  //   cards.style.justifyContent = 'flex-start';
  //   cards.style.columnGap = '30px'
  // }

  // else {
  //   cards.style.justifyContent = 'around';
  //   cards.style.columnGap = '13px'
  // }

    for (let i = 0; i < datalist.length; i++) {
    
        const showall = document.getElementById(`card${i}`);

        if(datalist[i].name.common.toLowerCase().includes(inputValue)) {
            showall.style.display = 'inline-block';
        }
        else {
            showall.style.display = 'none';
        }
        
    }
}


// -----------------------------------------------
// filter (dropdown)

let filterButton = document.getElementById('select-button');
let contanerSelect = document.getElementById('contanerselect');
let dropdownItems = document.querySelectorAll('.dropdown-item');


// Toggle dropdown visibility when clicking the button
filterButton.addEventListener('click', function(event) {
    event.stopPropagation(); // Prevent the click event from propagating to the document
    contanerSelect.classList.toggle('none1');
});

for (let i = 0; i < dropdownItems.length; i++) {
    dropdownItems[i].addEventListener('click', function(event) {
        event.stopPropagation(); 
        contanerSelect.classList.remove('none1');
        filterButton.innerText = dropdownItems[i].innerText;

        let hiddenH3 = document.getElementById('hidden-h3');

        for (let index = 0; index < datalist.length; index++) {
            let selected = document.getElementById(`card${index}`);

            if (dropdownItems[i].innerHTML === datalist[index].region) {
                hiddenH3.style.display = 'none';
                selected.style.display = 'flex';
            } else if (dropdownItems[i].innerHTML === 'No Filter') {
                hiddenH3.style.display = 'none';
                selected.style.display = 'flex';
            } else {
                selected.style.display = 'none';
                if (dropdownItems[i].innerHTML === 'America') {
                    hiddenH3.style.display = 'flex';
                }
            }
        }
    });
}

// Close the dropdown if kabaset ay mkan fl document, use event and event.stoppropagation 3shan ma e5rbo 3la b3d.
document.addEventListener('click', function(event) {
    if (!contanerSelect.contains(event.target) && event.target !== filterButton) {     // i used help to get this condition :(
        contanerSelect.classList.remove('none1'); 
    }
});
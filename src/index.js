import { debounce } from 'lodash';
import './styles.css';
import countriesList from './templates/countries-list.hbs'
import countryCard from './templates/country-card.hbs'
import '@pnotify/core/dist/BrightTheme.css';
import { alert, notice, info, success, error} from '@pnotify/core';


console.log(countryCard);


console.log(countriesList);

const refs = {
    input: document.querySelector('.input'),
    countriesField: document.querySelector('.country-field')
}

console.log(refs.countriesField);


console.dir(refs.input);

function fetchCountries (name) {
        return  fetch(`https:restcountries.eu/rest/v2/name/${name}`)
        .then(response => response.json())
    
}

refs.input.addEventListener('input', debounce(fetchCountriesList, 1000))

function fetchCountriesList(e) {
    const name = e.target.value

    if (e.target.value === '') {
        refs.countriesField.innerHTML = ''
    }
    else {
        fetchCountries(name).then(countries => {
            if (countries.length === 1) {
                makeCountryCard(countries[0]);
            }
            else if (countries.length > 10) {
                console.log('library');
            }
            else {
                makeCountryMarkupList(countries)
                
                
            }
        })
    }
    

}

function makeCountryCard(country) {
     refs.countriesField.innerHTML = countryCard(country)
}

        
        
        
    
                function makeCountryMarkupList(countriesArray) {
    
                    refs.countriesField.innerHTML = countriesList(countriesArray)
                }
import { debounce } from 'lodash';
import './styles.css';
import countriesList from './templates/countries-list.hbs'
import countryCard from './templates/country-card.hbs'
import { error, Stack } from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";
import * as Confirm from "@pnotify/confirm";
import "@pnotify/confirm/dist/PNotifyConfirm.css";





console.log(countryCard);


console.log(countriesList);

const refs = {
    input: document.querySelector('.input'),
    countriesField: document.querySelector('.country-field')
}

console.log(refs.countriesField);


console.dir(refs.input);

function fetchCountries (name) {
        return  fetch(`https:restcountries.eu/rest/v2/name1/${name}`)
        .then(response => response.json())
    
}

refs.input.addEventListener('input', debounce(fetchCountriesList, 500))

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
    error({
  title: 'Oh No!',
        text: 'Something terrible happened.',
        stack: new Stack({
    dir1: 'down',
    modal: true,
    firstpos1: 25,
    overlayClose: false
  }),
  modules: new Map([
      [
        Confirm,
        {
          confirm: true,
          buttons: [
            {
              text: "Ok",
              primary: true,
              click: notice => {
                notice.close();
              }
            }
          ]
        }
      ]
    ])
  });

 
              
                
            }
            else {
                makeCountryMarkupList(countries)
                
                
            }
        }).catch(() =>  refs.countriesField.innerHTML = '<p>Sorry! Can not find the page</p>')
    }
    

}

function makeCountryCard(country) {
     refs.countriesField.innerHTML = countryCard(country)
}

        
        
        
    
                function makeCountryMarkupList(countriesArray) {
    
                    refs.countriesField.innerHTML = countriesList(countriesArray)
                }
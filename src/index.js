import { debounce } from 'lodash';
import './styles.css';
import countriesList from './templates/countries-list.hbs'
import countryCard from './templates/country-card.hbs'
import refs from './js/refs'
import fetchCountries from './js/fetchCountries'
import makeCountryCard from './js/makeCountryMarkupList'
import makeError from './js/makeError'

refs.input.addEventListener('input', debounce(fetchCountriesList, 1000))

function fetchCountriesList(e) {
    const name = e.target.value

    if (e.target.value === '') {
      makeCountryCard('');
    }
    else {
      fetchCountries(name)
        .then(countries => {
          if (countries.length === 1) {
            makeCountryCard(countryCard(countries[0]));
          }
          else if (countries.length > 10) {
            makeError();
          }
          else {
            makeCountryCard(countriesList(countries));
          }
        })
        .catch(error => makeCountryCard('<h1>Sorry! Could not find this page</h1>'));
      }
    }


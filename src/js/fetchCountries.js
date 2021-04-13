

export default (searchQuery) => {
    const BASE_URL = 'https:restcountries.eu/rest/v2/name';
    return  fetch(`${BASE_URL}/${searchQuery}`)
        .then(response => {
            if (!response.ok) {
                throw error;
            }
            return response.json();
            })
}
    

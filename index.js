const fetchData = async (searchTerm) => {
  const response = await axios.get('http://www.omdbapi.com/', {
    params: {
      apikey: '4be7587f',
      s: searchTerm
    }
  });

  if (response.data.Error) {
    return [];
  }

  return response.data.Search;
};

const root = document.querySelector('.autocomplete');
root.innerHTML = `
  <label><b>Search for a Movie</b></label>
  <input class="input" />
  <div class="dropdown">
    <div class="dropdown-menu">
      <div class="dropdown-content results">
    </div>
  </div>
`;

const input = document.querySelector('input');
const dropdown = document.querySelector('.dropdown');
const resultsWrapper = document.querySelector('.results');



const onInput = async event => {
  const movies = await fetchData(event.target.value);
  //make dropdown visble
  dropdown.classList.add('is-active');

  for (let movie of movies) {
    const listOption = document.createElement('a');
    listOption.classList.add('dropdown-item');
    listOption.innerHTML = `
      <img src="${movie.Poster}" />
      <h1>${movie.Title}</h1>
    `;

    resultsWrapper.appendChild(listOption);
  }
};

input.addEventListener('input', debounce(onInput, 500))



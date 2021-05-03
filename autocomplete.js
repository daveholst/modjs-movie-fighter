const createAutoComplete = ({
  root,
  renderOption,
  onOptionSelect,
  inputValue,
  fetchData }) => {
  // const root = document.querySelector('.autocomplete');
root.innerHTML = `
  <label><b>Search</b></label>
  <input class="input" />
  <div class="dropdown">
    <div class="dropdown-menu">
      <div class="dropdown-content results">
    </div>
  </div>
`;

const input = root.querySelector('input');
const dropdown = root.querySelector('.dropdown');
const resultsWrapper = root.querySelector('.results');




const onInput = async event => {
  const items = await fetchData(event.target.value);

  if (!items.length) {
    dropdown.classList.remove('is-active');
    return;
  }
  resultsWrapper.innerHTML = '';
  //make dropdown visble
  dropdown.classList.add('is-active');

  for (let item of items) {
    const listOption = document.createElement('a');

    listOption.classList.add('dropdown-item');
    listOption.innerHTML = renderOption(item);
    listOption.addEventListener('click', () => {
      dropdown.classList.remove('is-active');
      input.value = inputValue(item);
      onOptionSelect(item);
    });
    resultsWrapper.appendChild(listOption);
  }
};

  input.addEventListener('input', debounce(onInput, 500));

  document.addEventListener('click', event => {
    if (!root.contains(event.target)) {
      dropdown.classList.remove('is-active');
    }
  });
}
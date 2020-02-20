const pokedex = document.getElementById('pokedex')

const pokemon = document.getElementById('pokemon-name');

const selectTypeEl = document.querySelector('#select-type');

const fetchPokemon = () => {
  let loader = `<div class="loader"></div>`;
  document.getElementById('pokedex').innerHTML = loader;
  const promises = [];
  for(let i = 1; i <= 150; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`
    promises.push(fetch(url).then(res => res.json()))
  }
  Promise.all(promises).then(results => {
    const pokemon = results.map(data => ({
        name: data.name,
        id: data.id,
        image: data.sprites['front_default'],
        type: data.types.map(type => type.type.name).join(', ')
    }))
    displayPokemon(pokemon);
  });
};  

const displayPokemon = (pokemon) => {
  pokedex.style.justifyContent = 'flex-start';

  const pokemonHTMLString = pokemon.map(pokemon=> `
    <li class="card">
      <img class="card-image" src="${pokemon.image}"/>
      <h2 class="card-title">${pokemon.id} . ${pokemon.name}</h2>
      <p class="card-subtitule">Type: ${pokemon.type}</p>
    </li>
  `
  ).join('');
  pokedex.innerHTML = pokemonHTMLString;

}

const fetchTypes = async (e) => {
  const fetchTypes = await fetch(`http://pokeapi.co/api/v2/type`);

  const responseData = await fetchTypes.json();

  return responseData.results;
}

const filterPokemonName = (e) => {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll('.card').forEach(card => {
    const itemText = card.firstElementChild.nextElementSibling.textContent;
    console.log(itemText.toLowerCase().indexOf(text));
    if(itemText.toLowerCase().indexOf(text) != -1) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  })
}

const createTypesOptions = (data) => {
  data.forEach(type => {
    const optionEl = document.createElement('option');
    const valueOption = type.name;
    const textValue = type.name;
    optionEl.appendChild(document.createTextNode(textValue));
    optionEl.setAttribute('value', valueOption);
    selectTypeEl.appendChild(optionEl);
  })
}



fetchTypes()
  .then(data => {
    createTypesOptions(data);
  });

const filterPokemon = (e) => {
  const optionValue = e.target.value;
  document.querySelectorAll('.card').forEach(card => {
    const typePokemonCard = card.querySelector('.card-subtitule').textContent.substring(6,);
    if(typePokemonCard.includes(optionValue)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  })
}

fetchPokemon();

selectTypeEl.addEventListener('change', filterPokemon);

pokemon.addEventListener('keyup', filterPokemonName);


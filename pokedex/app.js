const pokedex = document.getElementById('pokedex')

const pokemon = document.getElementById('pokemon');


const fetchPokemon = () => {
  let loader = `<div class="loader"></div>`;
  document.getElementById('pokedex').innerHTML = loader;
  const promises = [];
  for(let i = 1; i <= 150; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    
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
  })
    
  const displayPokemon = (pokemon) => {
    console.log(pokemon);

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
  
  
};  

const filterPokemon = (e) => {
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



fetchPokemon();
pokemon.addEventListener('keyup', filterPokemon);
export default class Ui {
  constructor() {
    this.pokedex = document.getElementById('pokedex');
    this.colors = {
      fire: '#FDDFDF',
      grass: '#DEFDE0',
      eletric: '#FCF7DE',
      water: '#DEF3FD',
      ground: '#F4E7D4',
      rock: '#D5D5D4',
      fairy: '#FCEAFF',
      poison: '#98D7A5',
      bug: '#F8D5A3',
      dragon: '#97B3E6',
      psychic: '#EAEDA1',
      flying: '#F5F5F5',
      fighting: '#E6E0D4',
      normal: '#F5F5F5' 
    }
    this.mainTypes = Object.keys(this.colors);
  }
  createPokemonCard(pokemon) {
    const pokemonEl = document.createElement('div');
    pokemonEl.classList.add('pokemon');

    const pokeTypes = pokemon.types.map(el => el.type.name);
    const type = this.mainTypes.find(type => pokeTypes.indexOf(type) > - 1);
    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const color = this.colors[type];
    pokemonEl.style.backgroundColor = color;
    const pokeInnerHTML = `
    <div class="img-container">
      <img src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png">
    </div>
    <div class="info">
      <span class="number">#${pokemon.id.toString().padStart(3, '0')}</span>
      <h3 class="name">${name}</h3>
      <small class="type">Type: <span>${type}</span></small> 
    </div>
    `;

    pokemonEl.innerHTML = pokeInnerHTML;

    this.pokedex.appendChild(pokemonEl);
  }
}


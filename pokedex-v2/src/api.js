export default class Api {
  constructor() {

  }
  async getPokemon(id) {
    const responseUrl = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokemon = await responseUrl.json();
    return {
      pokemon
    }
  }
  async fetchAllPokemons() {
    const pokemons = [];
    for (let i = 1; i <= 150; i++) {
      const pokemon = await this.getPokemon(i);
      pokemons.push(pokemon);
    }
    return pokemons;
  }
}
import Api from "./api";
import Ui from "./ui";

const ui = new Ui();
const api = new Api();

api.fetchAllPokemons()
  .then(results => {
    results.forEach(result => {
      ui.createPokemonCard(result.pokemon);
    })
  })

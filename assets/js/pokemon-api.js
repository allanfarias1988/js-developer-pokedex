let limit = 24;
let offset = 0;
let maxOffset = 168;
let id = 0;


async function getUrlsOfPokemons(offset = 0, limit = 20) {
  const URL = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
  const response = await fetch(URL);
  const json = await response.json();
  const arr = json.results;
  return arr.map((pokemon) => pokemon.url);
}

async function getPokemonDetails(id) {
  const pokemonURL = await getUrlsOfPokemons(offset, limit);
  const response = await fetch(pokemonURL[id]);
  const PokemonDetails = await response.json();
  return PokemonDetails
}

async function createNewPokemon(id) {
  const details = await getPokemonDetails(id);
  const pokemon = new Pokemon();
  pokemon.id = details.id;
  pokemon.name = details.name;
  pokemon.base_experience = details.base_experience;
  pokemon.types = details.types.map(item => item.type.name);
  pokemon.abilities = details.abilities.map(item => item.ability.name);
  pokemon.img = details.sprites.other.dream_world.front_default;
  return pokemon
}

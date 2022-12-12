
const cardList = document.querySelector('#cards-list');

let li = '';

async function convertPokemonToLi(limit) {
  for (let i = 0; i < limit; i++) {
    const pokemon = await createNewPokemon(i);
    li += `
        <li class="pokemon ${pokemon.types.join(' ')}" id="${pokemon.id}">
              <div class="head">
                <h2 class="name">${pokemon.name}</h2>
                <h3 class="number">#${pokemon.id}</h3>
              </div>
                <ol>
                  ${pokemon.types.map((type) => `<li class="types">${type}</li>`).join(' ')}
                </ol>
              <div>
              <div class="img">
                <img src="${pokemon.img}" alt="${pokemon.name}" id="${pokemon.id}">
              </div>
                <p class="xp">Experience: ${pokemon.base_experience}</p>
                <ol class="abilities">
                <li>Abilities: </li>
                  ${pokemon.abilities.map((ability) => `<li>${ability}</li>`).join('')}
                </ol>
              </div>
        </li>`
  }
  cardList.innerHTML += li;

}

convertPokemonToLi(limit);

const btnMore = document.querySelector('#btn-more')

btnMore.addEventListener('click', () => {
  if (offset < (maxOffset - limit)) {
    li = '';
    offset += limit;
    getUrlsOfPokemons(offset);
    getPokemonDetails(id);
    createNewPokemon(id);
    convertPokemonToLi(limit);
  } else {
    alert("Limite máximo de pokemons atingido: Afim de evitar sobrecarga na API, limitamos o limite de requisições!");
    btnMore.remove();
  }

})

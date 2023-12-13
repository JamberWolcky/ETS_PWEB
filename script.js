const Url = "https://pokeapi.co/api/v2/pokemon";

function createCard(pokemon) {
  return `
  <div class="col-md-3 col-sm-6">
  <div class="card">
    <div class="card-body flex-column d-flex" >
        <h5 class="card-title"  style="text-align: center;">${pokemon.name}</h5>
        <a href="${pokemon.species.url}" class="btn-primary w3-blue btn">Detail</a>
    </div>
  </div>
 </div>
    `;
}

fetch(Url)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response error");
    }
    return response.json();
  })
  .then((data) => {
    const pokemons = data.results || []; // Assuming the results contain Pokémon data

    const newPokemon = document.getElementById('newPokemon');
    pokemons.slice(0, 20).forEach((pokemon) => {
      fetch(pokemon.url) // Fetch detailed information of each Pokemon
        .then((response) => response.json())
        .then((detailedPokemon) => {
          const cardHTML = createCard(detailedPokemon);
          newPokemon.innerHTML += cardHTML;
        })
        .catch((error) => console.error("Error fetching Pokémon details:", error));
    });
  })
  .catch((error) => console.error("Error:", error));

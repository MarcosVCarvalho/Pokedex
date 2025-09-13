const pokemonNome = document.querySelector('.pokemon_nome')
const PokemonNum = document.querySelector('.pokemon_num')
const PokemonImag = document.querySelector('.pokemon_imagem')
const pokemonBusca = document.querySelector(".form")
const input = document.querySelector(".input_search")
const inputPrev = document.querySelector(".button.btn-prev")
const inputNext = document.querySelector(".button.btn-next")
let numPoke = 1;


const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`)
    if (APIResponse.status == 200) {
        const data = await APIResponse.json();
        return data;
    }}
const renderPokemon = async (pokemon) => {
    pokemonNome.innerHTML = 'Buscando...';
    PokemonNum.innerHTML = '';
    console.log(pokemon)
    const data = await fetchPokemon(pokemon)
    if (data) {
        pokemonNome.innerHTML = (`${data.name}`);
        PokemonNum.innerHTML = (`${data.id} - `);
        PokemonImag.style.display = '';
        PokemonImag.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = '';
        numPoke = data.id
    } else{
        PokemonImag.style.display = 'none';
        pokemonNome.innerHTML = 'Não Encontrado';
        PokemonNum.innerHTML = '';
    }
    
}
pokemonBusca.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase())
});

inputPrev.addEventListener('click', () => {
    if (numPoke > 1) {
        numPoke -= 1;
        renderPokemon(numPoke)
    }
});

inputNext.addEventListener('click', () => {
    numPoke += 1;
    renderPokemon(numPoke)
});



renderPokemon(numPoke);
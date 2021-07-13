import {get_pokemon_weaknesses} from "./pokemon-types.js"

chrome.runtime.onMessage.addListener((request) => {
    const pokemon = document.getElementById(request.msg);
    if (request.pokemon != null) {
        pokemon.innerHTML = "<h1>" + request.pokemon + "</h1>";
        let weaknesses = get_pokemon_weaknesses(request);
    } else {
        pokemon.innerHTML = "<h1>None<h1>";
    }
});
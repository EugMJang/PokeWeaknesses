import {get_pokemon_weaknesses} from "./pokemon-types.js"

chrome.runtime.onMessage.addListener((request) => {
    const pokemon = document.getElementById(request.msg); // Could be left side or right side depending on pokemon
    if (request.pokemon != null && pokemon.innerHTML == "") {
        pokemon.innerHTML = "<h1>" + request.pokemon + "</h1>";
        get_pokemon_weaknesses(request).then(stats => display_pokemon_stats(pokemon, stats)); // 2d array containing strengths, weaknesses, and immunities
    } else if (request.pokemon == null) {
        pokemon.innerHTML = "";
    }
});

function display_pokemon_stats(screen, stats) {
    // Display strengths
    screen.innerHTML += "<p>Strengths: ";
    if (stats[0].length != 0) {
        for (let i = 0; i < stats[0].length - 1; i++) {
            screen.innerHTML += stats[0][i] + ", ";
        }
        screen.innerHTML += stats[0][stats[0].length - 1] + "</p>"
    } else {
        screen.innerHTML += "None</p>";
    }

    // Display weaknesses
    screen.innerHTML += "<p>Weaknesses: ";
    if (stats[1].length != 0) {
        for (let i = 0; i < stats[1].length - 1; i++) {
            screen.innerHTML += stats[1][i] + ", ";
        }
        screen.innerHTML += stats[1][stats[1].length - 1] + "</p>"
    } else {
        screen.innerHTML += "None</p>";
    }

    // Display immunities
    screen.innerHTML += "<p>Immunities: ";
    if (stats[2].length != 0) {
        for (let i = 0; i < stats[2].length - 1; i++) {
            screen.innerHTML += stats[2][i] + ", ";
        }
        screen.innerHTML += stats[2][stats[2].length - 1] + "</p>"
    } else {
        screen.innerHTML += "None</p>"
    }
}
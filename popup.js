import {get_pokemon_weaknesses} from "./pokemon-types.js"

chrome.runtime.onMessage.addListener((request) => {
    const pokemon = document.getElementById(request.msg); // Could be left side or right side depending on pokemon
    if (request.pokemon != null && pokemon.innerHTML == "") {
        pokemon.innerHTML = "<h1 class=\"display-3\">" + request.pokemon + "</h1>";
        get_pokemon_weaknesses(request).then(stats => display_pokemon_stats(pokemon, stats)); // 2d array containing strengths, weaknesses, and immunities
    } else if (request.pokemon == null) {
        pokemon.innerHTML = "";
    }
});

function display_pokemon_stats(screen, stats) {
    let content = ""
    // Display strengths
    content += "<h2>Strengths:</h2><p>";
    if (stats[0].length != 0) {
        for (let i = 0; i < stats[0].length - 1; i++) {
            content += stats[0][i] + ", ";
        }
        content += stats[0][stats[0].length - 1] + "</p>"
    } else {
        content += "None</p>";
    }

    // Display weaknesses
    content += "<h2>Weaknesses:</h2><p>";
    if (stats[1].length != 0) {
        for (let i = 0; i < stats[1].length - 1; i++) {
            content += stats[1][i] + ", ";
        }
        content += stats[1][stats[1].length - 1] + "</p>"
    } else {
        content += "None</p>";
    }

    // Display immunities
    content += "<h2>Immunities:</h2><p>";
    if (stats[2].length != 0) {
        for (let i = 0; i < stats[2].length - 1; i++) {
            content += stats[2][i] + ", ";
        }
        content += stats[2][stats[2].length - 1] + "</p>"
    } else {
        content += "None</p>"
    }
    screen.innerHTML += content;
}
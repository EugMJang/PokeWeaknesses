function _send_message(msg, pokemon) {
    chrome.runtime.sendMessage({msg: msg, pokemon: pokemon})
}

function _get_name_of_pokemon() {
    const leftstatbar = document.getElementsByClassName("rstatbar")[0];
    const rightstatbar = document.getElementsByClassName("lstatbar")[0];

    let leftpokemon; //Your pokemon
    let rightpokemon; //Their pokemon
    if (leftstatbar != undefined) {
        leftpokemon = leftstatbar.getElementsByTagName("strong")[0].textContent.split(" ")[0];
        console.log(leftpokemon);

        _send_message("leftpokemon", leftpokemon);
    } else {
        _send_message("leftpokemon", null);
    }
    if (rightstatbar != undefined) {
        rightpokemon = rightstatbar.getElementsByTagName("strong")[0].textContent.split(" ")[0];
        console.log(rightpokemon);

        _send_message("rightpokemon", rightpokemon);
    } else {
        _send_message("rightpokemon", null);
    }
    setTimeout(_get_name_of_pokemon, 1000); //Recursive loop of this function using setTimeout
}

_get_name_of_pokemon()
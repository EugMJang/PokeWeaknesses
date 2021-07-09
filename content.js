function get_name_of_pokemon() {
    const rstatbar = document.getElementsByClassName("rstatbar")[0];
    const lstatbar = document.getElementsByClassName("lstatbar")[0];

    let pokemon1; //Your pokemon
    let pokemon2; //Their pokemon
    if (rstatbar != null) {
        pokemon1 = rstatbar.getElementsByTagName("strong")[0].textContent.split(" ")[0];
        console.log(pokemon1);
        
    }
    if (lstatbar != null) {
        pokemon2 = lstatbar.getElementsByTagName("strong")[0].textContent.split(" ")[0];
        console.log(pokemon2);

    }
    setTimeout(get_name_of_pokemon, 1000); //Recursive loop of this function using setTimeout
}

get_name_of_pokemon()
chrome.runtime.onMessage.addListener((request) => {
    console.log(request.pokemon);
    pokemon = document.getElementById(request.msg);
    if (request.pokemon != null) {
        pokemon.innerHTML = request.pokemon;
    } else {
        pokemon.innerHTML = "";
    }
});
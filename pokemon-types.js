async function get_pokemon_weaknesses(request) {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${request.pokemon.toLowerCase()}`); // Get request from pokeapi
    if (response.status != 200) {
        response = await fetch(`https://pokeapi.co/api/v2/pokemon/${request.pokemon.toLowerCase()}-standard`); // Try putting -standard if the request doesnt work
    }
    // If that fails, return
    if (response.status != 200) {
        return;
    }

    let multipliers = new Map()
    const json = await response.json(); 
    const pokemon_types = json.types;

    // Iterate through pokemon's types and extract strengths/weaknesses
    for (let i = 0; i < pokemon_types.length; i++) {
        const type_response = await fetch(pokemon_types[i].type.url).then(response => response.json());
        const damage_relations = type_response.damage_relations;

        update_multipliers(multipliers, damage_relations);
    }

    // Separate multipliers into strengths, weaknesses, and immunities
    let strengths = [];
    let weaknesses = [];
    let immunities = [];
    for (let [type, multiplier] of multipliers) {
        if (multiplier > 1) {
            weaknesses.push(type);
        } else if (multiplier == 0) {
            immunities.push(type);
        } else if (multiplier < 1) {
            strengths.push(type);
        }
    }

    return [strengths, weaknesses, immunities];
}

function update_multipliers(multipliers, damage_relations) {
    // Iterate through types that deal double damage to pokemon
    const double_damage = damage_relations.double_damage_from;
    for (let j = 0; j < double_damage.length; j++) {
        // Multiply by 2 if the type is in map, otherwise set key, value to type, 2
        if (multipliers.has(double_damage[j].name)) {
            multipliers.set(double_damage[j].name, multipliers.get(double_damage[j].name) * 2);
        } else {
            multipliers.set(double_damage[j].name, 2.0)
        }
    }

    // Iterate through types that deal half damage to pokemon
    const half_damage = damage_relations.half_damage_from;
    for (let i = 0; i < half_damage.length; i++) {
        // Divide by 2 if the type is in map, otherwise set key, value to type, 0.5
        if (multipliers.has(half_damage[i].name)) {
            multipliers.set(half_damage[i].name, multipliers.get(half_damage[i].name) / 2);
        } else {
            multipliers.set(half_damage[i].name, 0.5);
        }
    }

    // Iterate through types that do no damage to pokemon
    const no_damage = damage_relations.no_damage_from;
    for (let i = 0; i < no_damage.length; i++) {
        multipliers.set(no_damage[i].name, 0);
    }
}

export {get_pokemon_weaknesses}
// to show first 10 Pokemon.
export const pokemonListTen = async (limit = 10) => {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
        const data = await response.json();
        return data.results;
    } catch (e) {
        console.error('Error fetching initial Pokémon list: ', e);
        return [];
    }
};

// to show details pokemon
export const pokemonDetails = async (url) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return {
            name: data.name,
            image1: data.sprites.front_default,
            image2: data.sprites.back_default, // for more details in PokemonDetailsPage
            weight: data.weight,
            number: data.id,
            height: data.height,
            base_experience: data.base_experience // for more details in PokemonDetailsPage
        };
    } catch (error) {
        console.error('Error retrieving Pokémon details: ', error);
        return null;
    }
};

export default pokemonDetails;



const pokemonDetails = async (url) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return {
            name: data.name,
            image: data.sprites.front_default,
            weight: data.weight,
            number: data.id,
            height: data.height
        };
    } catch (e) {
        console.e('Error al obtener detalles de Pokémon:', e);
        return null;
    }
};

export default pokemonDetails;

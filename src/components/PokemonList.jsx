import React, { useState, useEffect } from 'react';
import pokemonDetails from "../services/pokemonDetails.js";

const PokemonList = () => {
    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10');
                const data = await response.json();

                const pokemonData = await Promise.all(
                    data.results.map(pokemon => pokemonDetails(pokemon.url))
                );

                setPokemons(pokemonData.filter(pokemon => pokemon !== null));
            } catch (e) {
                console.e('Error al obtener datos de la API de Pokémon:', e);
            }
        })();
    }, []);


    return (
        <div>
            <h1>Pokemon</h1>
            <ul>
                {pokemons.map(pokemon => (
                    <li key={pokemon.number}>
                        <img src={pokemon.image} alt={pokemon.name}/>
                        <p>Name: {pokemon.name}</p>
                        <p>Number: {pokemon.number}</p>
                        <p>Weight: {pokemon.weight}</p>
                        <p>Height: {pokemon.height}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PokemonList;

// PokemonDetailsPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { pokemonDetails } from "../services/pokemonAPI.js";

const PokemonDetailsPage = () => {
    const { id } = useParams();
    const [pokemon, setPokemon] = useState(null);

    useEffect(() => {
        const fetchPokemon = async () => {
            const details = await pokemonDetails(`https://pokeapi.co/api/v2/pokemon/${id}`);
            setPokemon(details);
        };
        fetchPokemon();
    }, [id]);

    if (!pokemon) return <p>Loading...</p>;

    return (
        <div>
            <h1>{pokemon.name}</h1>
            <img src={pokemon.image1} alt={pokemon.name}/>
            <img src={pokemon.image2} alt={pokemon.name}/>
            <p>Number: {pokemon.number}</p>
            <p>Experience: {pokemon.base_experience}</p>
            <p>Weight: {pokemon.weight}</p>
            <p>Height: {pokemon.height}</p>


        </div>
    );
};

export default PokemonDetailsPage;

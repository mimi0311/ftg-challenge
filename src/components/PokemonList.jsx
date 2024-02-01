import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {pokemonListTen, pokemonDetails} from "../services/pokemonAPI.js";



const PokemonList = () => {
    const [pokemons, setPokemons] = useState([]);
    const [sortField, setSortField] = useState('number');
    const [sortOrder, setSortOrder] = useState('asc');

    useEffect(() => {
        const getPokemons = async () => {
            try {
                const pokemonList = await pokemonListTen(10);
                const pokemonDetailsList = await Promise.all(
                    pokemonList.map(pokemon => pokemonDetails(pokemon.url))
                );
                setPokemons(pokemonDetailsList.filter(pokemon => pokemon !== null));
            } catch (error) {
                console.error('Error fetching data from the Pokémon API: ', error);
            }
        };

        getPokemons();
    }, []);

    const sortPokemons = (a, b) => {
        if (a[sortField] < b[sortField]) return sortOrder === 'asc' ? -1 : 1;
        if (a[sortField] > b[sortField]) return sortOrder === 'asc' ? 1 : -1;
        return 0;
    };


    return (
        <div>
            <h1>Pokemon</h1>
            <div>
                <label>Sort by: </label>
                <select onChange={(e) => setSortField(e.target.value)}>
                    <option value="number">Number</option>
                    <option value="weight">Weight</option>
                    <option value="height">Height</option>
                </select>
                <select onChange={(e) => setSortOrder(e.target.value)}>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </div>
            <ul>
                {pokemons.sort(sortPokemons).map(pokemon => (
                    <li key={pokemon.number}>
                        <Link to={`/pokemon/${pokemon.number}`}>
                            <img src={pokemon.image1} alt={pokemon.name}/>
                            <p>Name: {pokemon.name}</p>
                            <p>Number: {pokemon.number}</p>
                            <p>Weight: {pokemon.weight}</p>
                            <p>Height: {pokemon.height}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PokemonList;

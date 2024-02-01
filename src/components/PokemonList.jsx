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
        <div className="flex flex-col items-center w-full min-h-screen bg-[#FFE5D9]">
            <h1 className="text-5xl font-bold p-4 my-4 bg-[#D8E2DC] border rounded-3xl text-gray-900">Pokemon</h1>
            <div
                className="flex flex-col md:flex-row items-center space-x-0 md:space-x-4 p-4 rounded my-4 bg-[#D8E2DC] border rounded-3xl text-[#9D8189]">
                <label className="font-semibold text-gray-700 ">Sort by:</label>
                <select
                    className="border border-gray-300 rounded p-2 text-gray-700 hover:border-blue-500 focus:outline-none focus:border-blue-500"
                    onChange={(e) => setSortField(e.target.value)}>
                    <option value="number">Number</option>
                    <option value="weight">Weight</option>
                    <option value="height">Height</option>
                </select>
                <select
                    className="border border-gray-300 rounded p-2 text-gray-700 hover:border-blue-500 focus:outline-none focus:border-blue-500"
                    onChange={(e) => setSortOrder(e.target.value)}>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-[%70] px-4 bg-transparent"
                style={{
                    boxShadow: "0px 4px 12px 0px rgba(0, 0, 0, 0.03)",
                }}
            >
                {pokemons.sort(sortPokemons).map(pokemon => (
                    <li key={pokemon.number}
                        className="flex flex-col items-center border rounded-3xl p-4 border-[2px] border-white bg-[#D8E2DC]">
                        <Link to={`/pokemon/${pokemon.number}`}>
                            <img src={pokemon.image1} alt={pokemon.name} className="w-full"/>
                        </Link>
                        <p className="font-bold">Name: {pokemon.name}</p>
                        <p className="font-bold">Number: {pokemon.number}</p>
                        <p className="font-bold">Weight: {pokemon.weight}</p>
                        <p className="font-bold">Height: {pokemon.height}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PokemonList;

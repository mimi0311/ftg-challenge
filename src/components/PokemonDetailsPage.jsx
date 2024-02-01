// PokemonDetailsPage.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
        <div className="bg-[#D8E2DC] w-full min-h-screen flex justify-center items-center flex-col px-4">
            <div
                className="bg-[#FFE5D9] hover:bg-[#FFCAD4] border border-[#F1F1F2] shadow-lg p-6 rounded-xl w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-2/6 mb-4"
                style={{
                    boxShadow: "0px 4px 12px 0px rgba(0, 0, 0, 0.03)",
                }}
            >
                <div className="flex flex-col md:flex-row justify-evenly items-center">
                    <div className="text-center mb-4 md:mb-0 md:mr-4">
                        <h1 className="font-bold text-xl mb-4">{pokemon.name}</h1>
                        <img src={pokemon.image1} alt={pokemon.name} className="w-full mb-2"/>
                        <img src={pokemon.image2} alt={pokemon.name} className="w-full"/>
                    </div>
                    <div>
                        <p className="mb-2 font-bold">Number: {pokemon.number}</p>
                        <p className="mb-2 font-bold">Experience: {pokemon.base_experience}</p>
                        <p className="mb-2 font-bold">Weight: {pokemon.weight}</p>
                        <p className="mb-2 font-bold">Height: {pokemon.height}</p>
                    </div>
                </div>
            </div>

            <Link to="/"
                  className="bg-[#F4ACB7] hover:bg-[#FFCAD4] text-black font-bold py-2 px-4 rounded inline-block">
                Volver
            </Link>
        </div>


    )
};
export default PokemonDetailsPage;

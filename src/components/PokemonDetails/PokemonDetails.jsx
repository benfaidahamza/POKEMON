import NavbarApp from "../Navbar/NavbarApp";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PokemonDetails.css';

const PokemonDetails = ({ id }) => {
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = response.data;
        setPokemonDetails(data);
      } catch (error) {
        console.log('Erreur lors de la récupération des détails du Pokémon:', error);
      }
    };

    fetchPokemonDetails();
  }, [id]);

  if (!pokemonDetails) {
    return <div>Chargement des détails du Pokémon...</div>;
  }

  const artwork = pokemonDetails.sprites.other["official-artwork"].front_default;
  const pokemonImages = Object.values(pokemonDetails.sprites).filter((sprite) => typeof sprite === 'string');

  const switchImage = () => {
    setActiveImageIndex((prevIndex) => (prevIndex + 1) % pokemonImages.length);
  };

  return (
    <div className="pokemon-details-container">
      <div className="pokemon-details-content">
        <NavbarApp />
        <div>
          <h2>Détails du Pokémon</h2>
        </div>
        <div className="pokemon-card">
          <div className="pokemon-image-card" onClick={switchImage}>
            <img src={pokemonImages[activeImageIndex]} alt={pokemonDetails.name} className="pokemon-image" />
          </div>
          <div className="pokemon-info">
          <div className="pokemon-name-container">
                <h3 className="pokemon-name">{pokemonDetails.name}</h3>
          </div>

            <ul className="pokemon-details-list">
                  <li className="pokemon-type">Types: {pokemonDetails.types.map((type) => type.type.name).join(', ')}</li>
                  <li className="pokemon-weight">Poids: {pokemonDetails.weight}</li>
                  <li className="pokemon-height">Taille: {pokemonDetails.height}</li>
                  <li className="pokemon-experience">Expérience de base: {pokemonDetails.base_experience}</li>
                  <li className="pokemon-speed">Vitesse: {pokemonDetails.stats[5].base_stat}</li>
            </ul>
         </div>
        </div>
      </div>
      <div className="pokemon-images">
      <img src={artwork} alt={pokemonDetails.name} className="pokemon-artwork" />
      </div>
    </div>
  );
};

export default PokemonDetails;

import React from 'react';
import { useParams } from 'react-router-dom';
import PokemonDetails from './PokemonDetails';

const PokemonDetailsPage = () => {
  const { id } = useParams();

  return (
    <>
      <div>{id}</div>
      <PokemonDetails id={id} />
    </>
  );
};

export default PokemonDetailsPage;
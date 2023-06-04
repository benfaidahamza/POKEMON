import { useParams } from 'react-router-dom';
import PokemonDetails from './PokemonDetails';

const PokemonDetailsPage = () => {
  const { id } = useParams();

  return(<PokemonDetails id={id} />);
};

export default PokemonDetailsPage;
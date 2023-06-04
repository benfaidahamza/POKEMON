import './App.css';
import {Route,Routes} from "react-router-dom";
import Accueil from './components/Accueil/Accueil';
import ListePokemon from './components/ListePokemon/ListePokemon';
import MonPokedex from './components/Monpokedex/MonPokedex';
import PokemonDetailsPage from './components/PokemonDetails/PokemonDetailsPage';
import PokemonComparison from './components/comparaison/PokemonComparaison';

function App() {
  return(
      <div>
        <Routes>
          <Route path="/"  element={<Accueil/>}/>
          <Route path="/ListePokemon"  element={<ListePokemon/>}/>
          <Route path="/MonPokedex"  element={<MonPokedex/>}/>
          <Route path="/PokemonComparaison"  element={<PokemonComparison/>}/>
          <Route path="/pokemon/:id" element={<PokemonDetailsPage/>} />
        </Routes>
        </div>
  )
}

export default App;

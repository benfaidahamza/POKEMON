import NavbarApp from "../Navbar/NavbarApp";
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './MonPokedex.css'

function MonPokedex(){
  const [favorites, setFavorites] = useState([])
  const [search, setSearch] = useState('');
  const [pokemonData, setPokemonData] = useState(null);

  const handleAdd = (pokemon) => {
      const isExisting = favorites.some((fav) => fav.id === pokemon.id);
      const { id, name, sprites, types } = pokemon;
      const formattedPokemonData = {
         id,
         name,
         image: sprites.front_default,
         types: types.map((type) => type.type.name),
         };
      if (!isExisting) {
        console.log(favorites)
        setFavorites(prevFav => [ ...prevFav, formattedPokemonData])
        if(localStorage.getItem('favorites')=== null){
         localStorage.setItem('favorites',JSON.stringify([]))
        }
        console.log(localStorage.getItem('favorites'))
        let fav=JSON.parse(localStorage.getItem('favorites'))      
        fav.push(formattedPokemonData)
        localStorage.setItem('favorites',JSON.stringify(fav))
      }
    }
  const handleClearFavorites = () => {
      setFavorites([]); 
      localStorage.removeItem('favorites'); 
    };
  const handleChange = (e) => {
      setSearch(e.target.value)
  }
  const handleSearch = async () => {
    try {
      let response;
      if(search.length!==0){
        if (isNaN(search)) {
        response = await fetch(`https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`);
        } else {
        response = await fetch(`https://pokeapi.co/api/v2/pokemon/${search}`);
        }
      const data = await response.json();
      setPokemonData(data); 
      }

    } catch (error) {
      console.log('Erreur lors de la recherche du Pokémon:', error);
    }
   };
    useEffect(() => {
        const favs = localStorage.getItem('favorites')
        if (favs) {
            setFavorites(JSON.parse(favs))
        }
    }, [])
    
    const handleDelete = (name) => {
      setFavorites((prevFav) => {
        const updatedFavorites= favorites.filter((fav) => fav.name !== name)
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        return updatedFavorites;
      });  
    }
    return (
      <>
        <div>
          <NavbarApp />
          <div className="top">
          </div>
          <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="Entrer le nom ou Id du pokémon souhaité" value={search}
              onChange={(e) => handleChange(e)} aria-describedby="button-addon2"/>
          <button class="btn btn-primary" type="button" id="button-addon2" onClick={() => handleSearch()}>
              Rechercher
          </button>
         </div>
          <div className="pokemon-layout">
             <div className="pokemon-search">
             {pokemonData && (
              <div key={pokemonData.name} className="pokemon-card1">
              <img src={pokemonData.sprites.front_default} alt={pokemonData.name} className="pokemon-image"/>
              <div className="pokemon-details">
                  <h3 className="pokemon-name">{pokemonData.id}</h3>
                  <h3 className="pokemon-name">{pokemonData.name}</h3>
                  <p className="pokemon-types">
                   Types: {pokemonData.types.map((type) => type.type.name).join(", ")}
              </p>
              <Link to={`/pokemon/${pokemonData.id}`} className="pokemon-link"> <button className="pokemon-button" > Détails </button></Link>
              <button className="pokemon-button" onClick={() => handleAdd(pokemonData)} >Favoris</button>
              </div>
            </div>
              )}
            </div>
            <hr className="horizontal-line" />
            {favorites.length>0 &&(
            <div className="favorites-header">
                <h3 className="titre">Liste de mes favoris</h3>
                <button className="btn btn-primary" onClick={handleClearFavorites}>
                     Vider les favoris
                </button>
            </div>
            )}
            <br></br>
            <div className="pokemon-grid">
                    {favorites.map((pokemon) => (
                      <div key={pokemon.name} className="pokemon-card">
                        <img src={pokemon.image} alt={pokemon.name} className="pokemon-image" />
                        <div className="pokemon-details">
                          <h3 className="pokemon-name">{pokemon.id}</h3>
                          <h3 className="pokemon-name">{pokemon.name}</h3>
                          <p className="pokemon-types">Types: {pokemon.types.join(', ')}</p>
                          <Link to={`/pokemon/${pokemon.id}`} className="pokemon-link"> <button className="pokemon-button" > Détails </button></Link>
                          <button className="pokemon-button" onClick={() => handleDelete(pokemon.name)} > Supprimer</button>
                        </div>
              </div>
              ))}
            </div>
          </div>
        </div>
      </>
    );
    
}
export default MonPokedex;
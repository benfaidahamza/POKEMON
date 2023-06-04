import NavbarApp from "../Navbar/NavbarApp"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ListePokemon.css'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';


function ListePokemon(){
       const limit=12;
       const [pokemonList, setPokemonList] = useState([]);
       const [search,setSearch]=useState([''])
       const [searchResults, setSearchResults] = useState([]);
       const [favorites, setFavorites] = useState([])
       
       const [offset, setOffset] = useState(() => {
        const storedOffset = localStorage.getItem('offset');
        return storedOffset ? parseInt(storedOffset) : 0;
       });
       
       useEffect(() => {
        const favs = localStorage.getItem('favorites')
        console.log(favs)
        if (favs) {
            setFavorites(JSON.parse(favs))
        }
       }, [])
      // ce bloc de code pose un problème, comme on a déjà vu en semaine de cours, il vide le local storage
      //  useEffect(() => {
      //   // setFavorites(favorites)
      //   console.log(favorites)
      //   localStorage.setItem('favorites', JSON.stringify(favorites))
      //   }, [favorites])

      useEffect(() => {
        localStorage.setItem('offset', offset.toString());
        fetchPokemonList();
       }, [offset]);

       useEffect(() => {
        fetchPokemonList();
        }, [offset]);
    
        useEffect(() => {
            if (search.length % 3 === 0) {
             fetchPokemonListTotal();
             }
         }, [search]);
         
        const handleAdd = (pokemon) => {
          const isExisting = favorites.some((fav) => fav.id === pokemon.id);
          if (!isExisting) {
            console.log(favorites)
            setFavorites(prevFav => [ ...prevFav, pokemon])
            if(localStorage.getItem('favorites')=== null){
             localStorage.setItem('favorites',JSON.stringify([]))
            }
            console.log(localStorage.getItem('favorites'))
            let fav=JSON.parse(localStorage.getItem('favorites'))      
            fav.push(pokemon)
            localStorage.setItem('favorites',JSON.stringify(fav))
          }
        }

        const handleNextPage = () => {
          setOffset((prevOffset) => prevOffset + 12);
          fetchPokemonList()
         };
    
         const handlePreviousPage = () => {
         if(offset>0){
         setOffset((prevOffset) => prevOffset - 12);
         fetchPokemonList();
         }
         
         };
        const fetchPokemonList = async () => {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`);
        const results = response.data.results;
        const updatedPokemonList = await Promise.all(results.map(async (pokemon) => {
        const pokemonData = await fetchPokemonDetails(pokemon.url);
          return {
            id: pokemonData.id,
            name: pokemon.name,
            url: pokemon.url,
            image: pokemonData.sprites.front_default,
            types: pokemonData.types.map((type) => type.type.name),
          };
         }));
         setPokemonList(updatedPokemonList);
         };
    
         const fetchPokemonDetails = async (url) => {
         const response = await axios.get(url);
         return response.data;
         };
         
        const handleChange = (e) => {
            setSearch(e.target.value)
        }
    
        const handleSearch = () => {
          fetchSearchResults()
        }
        const fetchSearchResults = () => {
            if(search % 3 !==0){
                const filteredResults = searchResults.filter((pokemon) =>
                pokemon.name.startsWith(search.toLowerCase())
              ).concat(
                pokemonList.filter((pokemon) =>
                  pokemon.name.includes(search.toLowerCase()) && !pokemon.name.startsWith(search.toLowerCase())
                )
              );
            setSearchResults(filteredResults);
            }
        };

        const fetchPokemonListTotal = async () => {
            const reponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=1281`);
            const results = reponse.data.results;
            const filteredResults = results.filter((pokemon) =>
                pokemon.name.startsWith(search.toLowerCase())
              ).concat(
                pokemonList.filter((pokemon) =>
                  pokemon.name.includes(search.toLowerCase()) && !pokemon.name.startsWith(search.toLowerCase())
                )
              );
            const updatedPokemonList = await Promise.all(filteredResults.map(async (pokemon) => {
            const pokemonData = await fetchPokemonDetails(pokemon.url);
              return {
                id: pokemonData.id,
                name: pokemon.name,
                url: pokemon.url,
                image: pokemonData.sprites.front_default,
                types: pokemonData.types.map((type) => type.type.name),
              };
             }));
            setSearchResults(updatedPokemonList);
             };
        
        return (
            <>
              <div>
                <NavbarApp />
                <div className="top">
                </div>
                <div class="input-group mb-3">
                  <input type="text" class="form-control" placeholder="Entrer le nom du pokémon souhaité" value={search} onChange={(e) => handleChange(e)}  aria-describedby="button-addon2"/>
                  <button class="btn btn-primary" type="button" id="button-addon2" onClick={() => handleSearch()}>Rechercher</button>
                  <div className="pagination">
                    <button onClick={handlePreviousPage}>
                      <FiChevronLeft />
                    </button>
                    <button onClick={handleNextPage}>
                      <FiChevronRight />
                    </button>
                  </div>
                </div>
                <div className="pokemon-grid">
                  {search.length <3 ? (
                    pokemonList.map((pokemon) => (
                      <div key={pokemon.name} className="pokemon-card">
                        <img src={pokemon.image} alt={pokemon.name} className="pokemon-image" />
                        <div className="pokemon-details">
                          <h3 className="pokemon-name">{pokemon.id}</h3>
                          <h3 className="pokemon-name">{pokemon.name}</h3>
                          <p className="pokemon-types">Types: {pokemon.types.join(', ')}</p>
                          <Link to={`/pokemon/${pokemon.id}`} className="pokemon-link"> <button className="pokemon-button" > Détails </button></Link>
                          <button className="pokemon-button" onClick={() => handleAdd(pokemon)}>Favoris</button>
                        </div>
                      </div>
                    ))
                  ) : (
                    searchResults.map((pokemon) => (
                      <div key={pokemon.name} className="pokemon-card">
                        <img src={pokemon.image} alt={pokemon.name} className="pokemon-image" />
                        <div className="pokemon-details">
                          <h3 className="pokemon-name">{pokemon.id}</h3>
                          <h3 className="pokemon-name">{pokemon.name}</h3>
                          <p className="pokemon-types">Types: {pokemon.types.join(', ')}</p>
                          <Link to={`/pokemon/${pokemon.id}`} className="pokemon-link"> <button className="pokemon-button" > Détails </button></Link>
                          <button className="pokemon-button" onClick={() => handleAdd(pokemon)}>Favoris</button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </>
          );
}

export default ListePokemon;

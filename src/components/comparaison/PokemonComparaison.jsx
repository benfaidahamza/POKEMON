import React, { useState } from 'react';
import NavbarApp from '../Navbar/NavbarApp';
import './PokemonComparaison.css';

const PokemonComparison = () => {
  const [pokemon1, setPokemon1] = useState('');
  const [pokemon2, setPokemon2] = useState('');
  const [comparaisonResult, setComparaisonResult] = useState('');
  const [pokemon1Stats, setPokemon1Stats] = useState(null);
  const [pokemon2Stats, setPokemon2Stats] = useState(null);
  const [src, setSrc] = useState('');
  const [src2, setSrc2] = useState('');
  const [name, setName] = useState('');
  const [name2, setName2] = useState('');
  const [total1, settotal1] = useState();
  const [total2, settotal2] = useState();

  const calculateTotal = (stats) => {
    const hp = stats.find((stat) => stat.stat.name === 'hp')?.base_stat;
    const attack = stats.find((stat) => stat.stat.name === 'attack')?.base_stat;
    const defense = stats.find((stat) => stat.stat.name === 'defense')?.base_stat;
    const specialAttack = stats.find((stat) => stat.stat.name === 'special-attack')?.base_stat;
    const specialDefense = stats.find((stat) => stat.stat.name === 'special-defense')?.base_stat;
    const speed = stats.find((stat) => stat.stat.name === 'speed')?.base_stat;

    const total = (hp || 0) * 0.4 + (attack || 0) * 0.1 + (defense || 0) * 0.1 +
                  (specialAttack || 0) * 0.2 + (specialDefense || 0) * 0.2 + (speed || 0) * 0.1;
    return Math.round(total);
  };

  const handlePokemon1Change = (event) => {
    setPokemon1(event.target.value);
  };

  const handlePokemon2Change = (event) => {
    setPokemon2(event.target.value);
  };

  const handleCompare = async () => {
    try {
      if (pokemon1 !== pokemon2 && pokemon1 !== '' && pokemon2 !== '') {
        const response1 = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon1}`);
        const data1 = await response1.json();
        const stats1 = data1.stats;
        setSrc(data1.sprites.other["official-artwork"].front_default);
        setName(data1.name);
        const response2 = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon2}`);
        const data2 = await response2.json();
        const stats2 = data2.stats;
        setSrc2(data2.sprites.other["official-artwork"].front_default);
        setName2(data2.name);
        settotal1(calculateTotal(stats1)) ;
        settotal2(calculateTotal(stats2)) ;
        setPokemon1Stats(stats1);
        setPokemon2Stats(stats2);
        if (calculateTotal(stats1) > calculateTotal(stats2)) {
          console.log(1)
          setComparaisonResult(`${data1.name} est plus fort que ${data2.name}`);
        } else if (calculateTotal(stats1) < calculateTotal(stats2)) {
          console.log(2)
          setComparaisonResult(`${data2.name} est plus fort que ${data1.name}`);
        } else if (calculateTotal(stats1) === calculateTotal(stats2)) {
          console.log(0)
          setComparaisonResult("C'est un match nul !");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="barre">
      <NavbarApp />
      <div className="top1">
      <h4>Comparaison entre deux Pokémons</h4>
      <div className="input-container">
        <input
          type="text"
          className="form-control"
          placeholder="Entrer le numéro du premier Pokémon"
          id="pokemon1"
          value={pokemon1}
          onChange={handlePokemon1Change}
          aria-describedby="button-addon2"
        />
      </div>
      <div className="input-container">
        <input
          type="text"
          className="form-control"
          placeholder="Entrer le numéro du deuxième Pokémon"
          id="pokemon2"
          value={pokemon2}
          onChange={handlePokemon2Change}
          aria-describedby="button-addon2"
        />
      </div>
      <div className="input-container">
        <button className="btn btn-primary" onClick={handleCompare}>
          Comparer
        </button>
      </div>
      </div>
      <div className="pokemon-comparison-container">
        {pokemon1Stats && pokemon2Stats && (
          <div className="pokemon-card pokemon1-card">
            <img src={src} alt="Pokemon 1" />
            <h3>{name}</h3>
            <div className="pokemon-stats">
              <p>Points de vie : {pokemon1Stats.find((stat) => stat.stat.name === 'hp')?.base_stat}</p>
              <p>Attaque : {pokemon1Stats.find((stat) => stat.stat.name === 'attack')?.base_stat}</p>
              <p>Défense : {pokemon1Stats.find((stat) => stat.stat.name === 'defense')?.base_stat}</p>
              <p>Attaque spéciale : {pokemon1Stats.find((stat) => stat.stat.name === 'special-attack')?.base_stat}</p>
              <p>Défense spéciale : {pokemon1Stats.find((stat) => stat.stat.name === 'special-defense')?.base_stat}</p>
              <p>Vitesse : {pokemon1Stats.find((stat) => stat.stat.name === 'speed')?.base_stat}</p>
            </div>
          </div>
        )}
        {pokemon2Stats && pokemon1Stats && (
          <div className="pokemon-card pokemon2-card">
            <img src={src2} alt="Pokemon 2" />
            <h3>{name2}</h3>
            <div className="pokemon-stats">
              <p>Points de vie : {pokemon2Stats.find((stat) => stat.stat.name === 'hp')?.base_stat}</p>
              <p>Attaque : {pokemon2Stats.find((stat) => stat.stat.name === 'attack')?.base_stat}</p>
              <p>Défense : {pokemon2Stats.find((stat) => stat.stat.name === 'defense')?.base_stat}</p>
              <p>Attaque spéciale : {pokemon2Stats.find((stat) => stat.stat.name === 'special-attack')?.base_stat}</p>
              <p>Défense spéciale : {pokemon2Stats.find((stat) => stat.stat.name === 'special-defense')?.base_stat}</p>
              <p>Vitesse : {pokemon2Stats.find((stat) => stat.stat.name === 'speed')?.base_stat}</p>
            </div>
          </div>
        )}
      </div>
      <div>
        <br></br>
      </div>
      {comparaisonResult && (
        <h5 className="comparison-result">
          Résultat de la comparaison - Total: &nbsp;
            <span>
             {comparaisonResult} , Pokémon {name} : {total1}  || Pokémon  {name2} : {total2} <br></br>
            </span>
        </h5>
      )}
    </div>
  );
  
};

export default PokemonComparison;

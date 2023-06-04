import NavbarApp from '../Navbar/NavbarApp'
import React from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '../../assets/pok.png';
import './Accueil.css' 

function Accueil() {
  return (
    <>
    <div className="home">
        <NavbarApp></NavbarApp> 
      <div className="content">
        <h1 className='stylish-text'>Bienvenue sur notre site</h1>
        <div className="centered-content">
          <div className="buttons">
            <Link to="/ListePokemon">
              <button className="btn-primary1">Voir les Pokémons</button>
            </Link>
            <Link to="/MonPokedex">
              <button className="btn-secondary1">Voir Mon pokédex</button>
            </Link>
          </div>
          <img src={backgroundImage} alt="Background" />
        </div>
      </div>
    </div>
    </>
  );
}

export default Accueil;
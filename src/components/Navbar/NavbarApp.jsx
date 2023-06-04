import logo from '../../assets/pokemon-logo-png-1447.png';
import './NavbarApp.css'
import { Link } from 'react-router-dom';

function NavbarApp() {
  return (
    <>
    <nav class="navbar navbar-expand-lg  fixed-top navbar-light bg-primary">
        <div class="container-fluid">
            <Link  class="navbar-brand" to="/">
                <img src={logo} alt="" width="30" height="100" class="d-inline-block align-text-top"/>
                <span class="stylish-text">Pokémon</span>
            </Link>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav">
        <li class="nav-item">
        <Link class="nav-link stylish" to="/ListePokemon">Liste Pokémon</Link>
        </li>
        <li class="nav-item">
        <Link class="nav-link stylish" to="/Monpokedex">Mon Pokédex</Link>
        </li>
        <li class="nav-item">
        <Link class="nav-link stylish" to="/PokemonComparaison">Comparaison</Link>
        </li>
       </ul>
      </div>     
    </div>
    </nav>
    </>
  );
}
export default NavbarApp;
import React from 'react';
import './Nav.css'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { accessOff } from '../redux/actions';

export default function Nav() {
  const location = useLocation();
  const dispatch = useDispatch()

  const headerSelector = () => {
    switch (location.pathname) {
      case '/home':
        return <img className='imgHeader' src="./images/Pokedex.png" alt="Pokedex" />;
      case '/profile':
        return <img className='imgHeader' src="./images/Perfil.png" alt="Perfil" />;
      case '/team':
        return <img className='imgHeader' src="./images/Equipo.png" alt="Equipo" />;
      case '/about':
        return <img className='imgHeader' src="./images/AcercaDe.png" alt="AcercaDe" />;
      case '/create':
        return <img className='imgHeader' src="./images/CrearPokemon.png" alt="CrearPokemon" />;
      default:
        return <img className='imgHeader' src="../images/DetallesPokemon.png" alt="DetallesPokemon" />;
    }
  }

  if (location.pathname !== '/') {
    return (
      <nav>
        {headerSelector()}
        <div className='linkBox'>
          {location.pathname !== '/home' ? <Link to="home" className='enlaces'>Pokédex</Link> : null}
          {location.pathname !== '/profile' ? <Link to="profile" className='enlaces'>Perfil</Link> : null}
          {location.pathname !== '/team' ? <Link to="team" className='enlaces'>Equipo</Link> : null}
          {location.pathname !== '/about' ? <Link to="about" className='enlaces'>Acerca de</Link> : null}
          <button className='enlaces enlacesBoton' onClick={() => { dispatch(accessOff()) }}>LogOut</button>
        </div>
      </nav>

    )
  }
}
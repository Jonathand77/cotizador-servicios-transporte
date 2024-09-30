import React from 'react';
import '../styles.css';
import logo from '../assets/img/logo-cootraespeciales.svg';

const NavBar = () => {
  return (
    <nav className="navbar">
      <img src={logo} alt="Logo" />
      <ul>
        <li><a href="#home">Inicio</a></li>
        <li><a href="#cotizar">Cotizar</a></li>
        <li><a href="#contact">Contacto</a></li>
      </ul>
    </nav>
  );
};

export default NavBar;

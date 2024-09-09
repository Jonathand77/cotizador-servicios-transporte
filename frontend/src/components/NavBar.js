import React from 'react';
import '../styles.css';

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li><a href="#home">Inicio</a></li>
        <li><a href="#cotizar">Cotizar</a></li>
        <li><a href="#contact">Contacto</a></li>
      </ul>
    </nav>
  );
};

export default NavBar;

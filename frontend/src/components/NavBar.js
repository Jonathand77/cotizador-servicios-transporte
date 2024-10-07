import React from 'react';
import '../styles.css';
import { RiHome2Line } from "react-icons/ri";
import { GiMoneyStack } from "react-icons/gi";
import { IoIosContact } from "react-icons/io";
import logo from '../assets/img/logo-cootraespeciales.svg';

const NavBar = () => {
  return (
    <nav className="navbar">
      <img src={logo} alt="Logo" />
      <ul>
        <li><a href="#home"><RiHome2Line style={{ marginRight: '8px', fontSize: '24px' }} />Inicio</a></li>
        <li><a href="#cotizar"><GiMoneyStack style={{ marginRight: '8px', fontSize: '30px' }} />Cotizar</a></li>
        <li><a href="#contact"><IoIosContact style={{ marginRight: '8px', fontSize: '24px' }} />Contacto</a></li>
      </ul>
    </nav>
  );
};

export default NavBar;

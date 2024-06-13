// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/presentar">Presentar</Link>
        </li>
        <li>
          <Link to="/completar">Completar</Link>
        </li>
        <li>
          <Link to="/textos">textos</Link>
        </li>
        <li>
          <Link to="/diccionario">diccionario</Link>
        </li>
        <li>
          <Link to="/subir">subir</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

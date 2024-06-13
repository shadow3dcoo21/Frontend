// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Presentacion from './components/Presentacion';
import Completar from './components/Completar';
import Navbar from './components/Navbar';
import Textos from './components/textos'
import Diccionario from './components/diccionario'
import Subir from './components/subir'
const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/presentar" element={<Presentacion />} />
          <Route path="/completar" element={<Completar />} />
          <Route path="/textos" element={<Textos />} />
          <Route path="/diccionario" element={<Diccionario />} />
          <Route path="/subir" element={<Subir />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

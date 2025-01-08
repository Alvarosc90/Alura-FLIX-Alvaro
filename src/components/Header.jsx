// Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Header.css';

const Header = () => {
  return (
    <header className="header">
      <img src="/LogoMain.png" alt="LuraFlix Logo" className="logo" />
      <nav className="nav">
        <Link to="/" className="nav-button">Home</Link>
        <Link to="/new-video" className="nav-button-1">Registrar Video</Link>
      </nav>
    </header>
  );
};

export default Header;

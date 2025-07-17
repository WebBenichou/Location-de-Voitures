import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FaCar, FaBars, FaTimes, FaUser } from 'react-icons/fa';
import './NavBar.css'; // Nous créerons ce fichier ensuite

const NavBar = ({ isAdmin, toggleAdminMode }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="navbar">
      {/* Logo et nom de l'entreprise */}
      <div className="navbar-logo">
        <FaCar className="car-icon" />
        <Link to="/" className="logo-text">Benichou Lux Car</Link>
      </div>

      {/* Menu desktop */}
      <div className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
        <Link to="/" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Accueil</Link>
        <Link to="/reservation" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Réservation</Link>
        <Link to="/apropos" className="nav-link" onClick={() => setMobileMenuOpen(false)}>À propos</Link>
        <Link to="/contact" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
        
        {/* Bouton Admin */}
        <button 
          className="admin-toggle" 
          onClick={() => {
            toggleAdminMode();
            setMobileMenuOpen(false);
          }}
        >
          <FaUser /> {isAdmin ? 'Mode Client' : 'Mode Admin'}
        </button>
      </div>

      {/* Menu mobile (hamburger) */}
      <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
        {mobileMenuOpen ? <FaTimes /> : <FaBars />}
      </div>
    </nav>
  );
};

export default NavBar;
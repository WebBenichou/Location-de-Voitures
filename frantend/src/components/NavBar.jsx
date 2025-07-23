import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FaCar, FaUser } from 'react-icons/fa';

const NavBar = ({ isAdmin, toggleAdminMode }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleNavbar = () => setExpanded(!expanded);

  // Ferme le menu mobile après clic sur un lien
  const closeMenu = () => setExpanded(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3 py-4">
      <Link to="/" className="navbar-brand d-flex align-items-center fw-bold fs-4" style={{ color: '#eba40cff' }}>
  <img
    src="images/Lux-Car.png"
    alt=""
    style={{ height: '100px', marginRight: '20px', borderRadius: "5px" }}
  />
  <FaCar className="me-2" />
  Benichou Lux Car
</Link>


      <button
        className="navbar-toggler"
        type="button"
        aria-controls="navbarNav"
        aria-expanded={expanded}
        aria-label="Toggle navigation"
        onClick={toggleNavbar}
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className={`collapse navbar-collapse${expanded ? ' show' : ''}`} id="navbarNav">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={closeMenu}>Accueil</Link>
          </li>
          <li className="nav-item">
            <Link to="/voitures" className="nav-link" onClick={closeMenu}>Voitures</Link>
          </li>
          <li className="nav-item">
            <Link to="/reservation" className="nav-link" onClick={closeMenu}>Réservation</Link>
          </li>
          <li className="nav-item">
            <Link to="/apropos" className="nav-link" onClick={closeMenu}>À propos</Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="nav-link" onClick={closeMenu}>Contact</Link>
          </li>
        </ul>

        <button
          className="btn btn-outline-light d-flex align-items-center"
          onClick={() => {
            toggleAdminMode();
            closeMenu();
          }}
        >
          <FaUser className="me-2" />
          {isAdmin ? 'Mode Client' : 'Mode Admin'}
        </button>


      </div>
    </nav>
  );
};

export default NavBar;

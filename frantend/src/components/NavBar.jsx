import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { FaCar, FaUser } from 'react-icons/fa';

const NavBar = ({ user }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleNavbar = () => setExpanded(!expanded);

  // Ferme le menu mobile après clic sur un lien
  const closeMenu = () => setExpanded(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3 py-4">
      <Link to="/" className="navbar-brand d-flex align-items-center fw-bold fs-4" style={{ color: '#f1aa10ff' }}>
        <img
          src="images/Lux-Car.png"
          alt=""
          style={{ height: '100px', marginRight: '20px', borderRadius: "5px" }}
        />
        <FaCar className="me-2" />
        Benichou Lux Car
      </Link>


      

      <div className={`collapse navbar-collapse${expanded ? ' show' : ''}`} id="navbarNav">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={closeMenu}><strong>Accueil</strong></Link>
          </li>
          <li className="nav-item">
            <Link to="/voitures" className="nav-link" onClick={closeMenu}><strong>Voitures</strong></Link>
          </li>
          <li className="nav-item">
            <Link to="/reservation" className="nav-link" onClick={closeMenu}><strong>Réservation</strong></Link>
          </li>
          <li className="nav-item">
            <Link to="/apropos" className="nav-link" onClick={closeMenu}><strong>À propos</strong></Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="nav-link" onClick={closeMenu}><strong>Contact</strong></Link>
          </li>
        </ul>
        <div className="d-flex align-items-center">
          {!user ? (
            <>
              <NavLink to="/login"
                className="btn btn-outline-warning me-2"
                
              >
                <FaUser className="me-2" />
                Login
              </NavLink>
              <NavLink to={"/register"}
                className="btn btn-outline-warning"
          
              >
                Signup
              </NavLink>
            </>
          ) : (
            <div className="dropdown">
              <NavLink
                className="btn btn-outline-warning dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <FaUser className="me-2" />
                {user.name}
              </NavLink>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <button className="dropdown-item">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>


      </div>
    </nav>
  );
};

export default NavBar;

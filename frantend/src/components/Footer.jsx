import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
    FaFacebook,
    FaTwitter,
    FaInstagram,
    FaMapMarkerAlt,
    FaPhone,
    FaEnvelope,
    FaCar
} from "react-icons/fa";
import { Link } from "react-router-dom";
 

const Footer = () => {
    return (
        <footer className="bg-dark text-white mt-5 py-4 footer">
            <Container>
                <Row className="g-4">
                    {/* Logo et description */}
                    <Col lg={3} md={6} className="mb-4 mb-md-0">
                        <div className="d-flex align-items-center mb-3">
                            <FaCar className="text-primary fs-3 me-2" />
                            <span className="h5 mb-0 text-white">Benichou Lux Car</span>
                        </div>
                        <p className="text-muted">
                            Location de véhicules haut de gamme à Casablanca. Service premium et tarifs compétitifs.
                        </p>
                        <div className="social-icons">
                            <a href="#" aria-label="Facebook" className="text-white me-3 transition">
                                <FaFacebook className="fs-5" />
                            </a>
                            <a href="#" aria-label="Twitter" className="text-white me-3 transition">
                                <FaTwitter className="fs-5" />
                            </a>
                            <a href="#" aria-label="Instagram" className="text-white transition">
                                <FaInstagram className="fs-5" />
                            </a>
                        </div>
                    </Col>

                    {/* Liens rapides */}
                    <Col lg={3} md={6} className="mb-4 mb-md-0">
                        <h5 className="text-uppercase mb-4">Liens rapides</h5>
                        <ul className="list-unstyled">
                            <li className="mb-2">
                                <Link to="/" className="text-muted transition">Accueil</Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/apropos" className="text-muted transition">À propos</Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/reservation" className="text-muted transition">Réservation</Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/contact" className="text-muted transition">Contact</Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/admin" className="text-muted transition">Espace Admin</Link>
                            </li>
                        </ul>
                    </Col>

                    {/* Contact */}
                    <Col lg={3} md={6} className="mb-4 mb-md-0">
                        <h5 className="text-uppercase mb-4">Contactez-nous</h5>
                        <ul className="list-unstyled text-muted">
                            <li className="mb-3 d-flex align-items-start">
                                <FaMapMarkerAlt className="me-2 mt-1" />
                                <span>123 Rue Principale, Casablanca, Maroc</span>
                            </li>
                            <li className="mb-3 d-flex align-items-center">
                                <FaPhone className="me-2" />
                                <a href="tel:+212612345678" className="text-muted">+212 6 12 34 56 78</a>
                            </li>
                            <li className="mb-3 d-flex align-items-center">
                                <FaEnvelope className="me-2" />
                                <a href="mailto:contact@benichouluxcar.com" className="text-muted">
                                    contact@benichouluxcar.com
                                </a>
                            </li>
                        </ul>
                    </Col>

                    {/* Horaires */}
                    <Col lg={3} md={6}>
                        <h5 className="text-uppercase mb-4">Horaires d'ouverture</h5>
                        <ul className="list-unstyled text-muted">
                            <li className="mb-2">Lundi - Vendredi: 8h - 19h</li>
                            <li className="mb-2">Samedi: 9h - 17h</li>
                            <li className="mb-2">Dimanche: 10h - 15h</li>
                            <li className="mb-2">24/7 pour urgences</li>
                        </ul>
                    </Col>
                </Row>

                <hr className="my-4 bg-light opacity-25" />

                <Row>
                    <Col className="text-center text-muted">
                        <p className="mb-0 small">
                            &copy; {new Date().getFullYear()} Benichou Lux Car.
                            Tous droits réservés. |
                            <Link to="/mentions-legales" className="text-muted ms-2">Mentions légales</Link> |
                            <Link to="/politique-confidentialite" className="text-muted ms-2">Politique de confidentialité</Link>
                        </p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
    FaFacebook,
    FaTwitter,
    FaInstagram,
    FaMapMarkerAlt,
    FaPhone,
    FaEnvelope,
    FaCar,
    FaWhatsapp
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-dark text-warning mt-5 py-4 px-5 footer">
            
                <Row className="g-4">
                    {/* Logo et description */}
                    <Col lg={3} md={6} className="mb-4 mb-md-0">
                        <div className="d-flex align-items-center mb-3 text-warning">
                            <img
                                src="images/Lux-Car.png"
                                alt=""
                                style={{ height: '100px', marginRight: '20px', borderRadius: "5px" }}                            />                            

                            <span className="h5 mb-0"  style={{ color: '#f1aa10ff' }} ><strong>Benichou Lux Car</strong></span>
                        </div>
                        <p className="text-light">
                            Location de véhicules haut de gamme à Azilal. Service premium et tarifs compétitifs.
                        </p>
                        <div className="social-icons">
                            <a href="#" aria-label="Facebook" className="text-light me-3">
                                <FaFacebook className="fs-5" />
                            </a>
                            <a href="#" aria-label="Twitter" className="text-light me-3">
                                <FaTwitter className="fs-5" />
                            </a>
                            <a href="#" aria-label="Instagram" className="text-light me-3">
                                <FaInstagram className="fs-5" />
                            </a>
                            <a
                                href="https://wa.me/+212693534625"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="WhatsApp"
                                className="text-light"
                            >
                                <FaWhatsapp className="fs-5" />
                            </a>
                        </div>
                    </Col>
                    {/* Liens rapides */}
                    <Col lg={3} md={6} className="mb-4 mb-md-0">
                        <h5 className="text-uppercase mb-4">Liens rapides</h5>
                        <ul className="list-unstyled">
                            <li className="mb-2">
                                <Link to="/" className="text-light">Accueil</Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/apropos" className="text-light">À propos</Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/reservation" className="text-light">Réservation</Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/contact" className="text-light">Contact</Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/admin" className="text-light">Espace Admin</Link>
                            </li>
                        </ul>
                    </Col>

                    {/* Contact */}
                    <Col lg={3} md={6} className="mb-4 mb-md-0">
                        <h5 className="text-uppercase mb-4">Contactez-nous</h5>
                        <ul className="list-unstyled text-light">
                            <li className="mb-3 d-flex align-items-start">
                                <FaMapMarkerAlt className="me-2 mt-1" />
                                <span>12 Rue Principale, Azilal, Maroc</span>
                            </li>
                            <li className="mb-3 d-flex align-items-center">
                                <FaPhone className="me-2" />
                                <a href="tel:+212612345678" className="text-light">+212 6 93 53 46 25</a>
                            </li>
                            <li className="mb-3 d-flex align-items-center">
                                <FaEnvelope className="me-2" />
                                <a href="mailto:contact@benichouluxcar.com" className="text-light">
                                    contact@benichouluxcar.com
                                </a>
                            </li>
                        </ul>
                    </Col>

                    {/* Horaires */}
                    <Col lg={3} md={6}>
                        <h5 className="text-uppercase mb-4">Horaires d'ouverture</h5>
                        <ul className="list-unstyled text-light">
                            <li className="mb-2">Lundi - Vendredi: 8h - 19h</li>
                            <li className="mb-2">Samedi: 9h - 17h</li>
                            <li className="mb-2">Dimanche: 10h - 15h</li>
                            <li className="mb-2">24/7 pour urgences</li>
                        </ul>
                    </Col>
                </Row>

                <hr className="my-4 bg-light opacity-25" />

                <Row>
                    <Col className="text-center text-light">
                        <p className="mb-0 small">
                            &copy; {new Date().getFullYear()} Benichou Lux Car. Tous droits réservés. |
                            <Link to="/mentions-legales" className="text-light ms-2">Mentions légales</Link> |
                            <Link to="/politique-confidentialite" className="text-light ms-2">Politique de confidentialité</Link>
                        </p>
                    </Col>
                </Row>
            
        </footer>
    );
};

export default Footer;

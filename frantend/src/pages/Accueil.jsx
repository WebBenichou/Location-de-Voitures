import React from "react";
import { Carousel, Card, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Accueil({ voitures }) {
    return (
        <div>
            {/* Carrousel principal */}
            <Carousel fade>
                <Carousel.Item>
                    <img className="d-block w-100" src="images/Lux-Car.png" alt="voiture" />
                    <Carousel.Caption>
                        <h3>Louez la voiture de vos rêves</h3>
                        <p>Rapide, facile et à petit prix.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img className="d-block w-100" src="images/Car Logo.png" alt="voiture luxe" />
                    <Carousel.Caption>
                        <h3>Confort et sécurité</h3>
                        <p>Nos voitures sont bien entretenues et assurées.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img className="d-block w-100" src="https://source.unsplash.com/1600x500/?road-trip" alt="route" />
                    <Carousel.Caption>
                        <h3>Partez à l'aventure</h3>
                        <p>Réservez maintenant votre prochain trajet !</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>

            {/* Liste des voitures en card */}
            <Container className="mt-5">
                <h2 className="text-center mb-4">Nos voitures disponibles</h2>
                <Row>
                    {voitures && voitures.length > 0 ? (
                        voitures.map(voiture => (
                            <Col md={4} sm={6} xs={12} key={voiture.id} className="mb-4">
                                <Card>
                                    <Card.Img
                                        variant="top"
                                        src={
                                            voiture.image_url
                                                ? `http://localhost:9000${voiture.image_url}`
                                                : "https://via.placeholder.com/300x200.png?text=Pas+de+photo"
                                        }
                                        style={{ height: "200px", objectFit: "cover" }}
                                    />
                                    <Card.Body>
                                        <Card.Title>{voiture.marque} {voiture.modele}</Card.Title>
                                        <Card.Text>
                                            Année : {voiture.annee}<br />
                                            Prix : {voiture.prix_par_jour} DH/jour<br />
                                            Disponibilité : {voiture.disponible ? "Oui" : "Non"}
                                        </Card.Text>
                                        <Link to="/reservation">
                                            <Button variant="primary" disabled={!voiture.disponible}>
                                                Réserver
                                            </Button>
                                        </Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    ) : (
                        <p>Aucune voiture disponible pour le moment.</p>
                    )}
                </Row>
            </Container>
        </div>
    );
}

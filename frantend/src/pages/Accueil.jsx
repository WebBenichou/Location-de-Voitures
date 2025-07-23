import React from "react";
import { Carousel, Card, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";


export default function Accueil({ voitures }) {
    return (
        <div>
            {/* Carrousel principal */}
            <Carousel fade>
                <Carousel.Item>
                    <img className="d-block w-100" src="images/location-2.jpg" alt="voiture" />
                    <Carousel.Caption>
                        <h1>Louez la voiture de vos rêves</h1>
                        <p>Rapide, facile et à petit prix.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img className="d-block w-100" src="images/location-1.jpg" alt="voiture luxe" style={{ height: "850px", width: "100%" }} />
                    <Carousel.Caption>
                        <h1>Confort et sécurité</h1>
                        <p>Nos voitures sont bien entretenues et assurées.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img className="d-block w-100" src="images/location-3.jpg" alt="route" />
                    <Carousel.Caption>
                        <h1>Partez à l'aventure</h1>
                        <p>Réservez maintenant votre prochain trajet !</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>

            {/* Liste des voitures en cards */}
            <Container className="py-5">
                <h2 className="text-center mb-4">Nos voitures disponibles</h2>
                <Row>
                    {voitures && voitures.map((voiture) => (
                        <Col md={4} className="mb-4" key={voiture.id}>
                            <Card className="h-100 shadow-sm">
                                <Card.Img variant="top" src={voiture.image_url} alt={voiture.marque} style={{ height: "200px", objectFit: "cover" }} />
                                <Card.Body>
                                    <Card.Title>{voiture.marque} {voiture.modele}</Card.Title>
                                    <div className="d-flex justify-content-between">
                                        <Link to={`/voitures/${voiture.id}`}>
                                            <Button variant="outline-primary">Voir plus</Button>
                                        </Link>
                                        <Link to={`/reservation?car=${voiture._id}`}>
                                            <Button variant="primary">Réserver</Button>
                                        </Link>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
}



/*
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
*/
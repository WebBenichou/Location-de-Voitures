import React from "react";
import { Carousel, Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Accueil({ voitures }) {
    return (
        <div>
            {/* Carrousel principal */}
            <Carousel fade>
                <Carousel.Item>
                    <img className="d-block w-100" src="images/location-2.jpg" alt="voiture" />
                    <Carousel.Caption>
                        <div className="text-warning">
                            <h1>Louez la voiture de vos rêves</h1>
                            <p>Rapide, facile et à petit prix.</p>
                        </div>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img className="d-block w-100" src="images/location-1.jpg" alt="voiture luxe" style={{ height: "850px", width: "100%", objectFit: "cover" }} />
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

            {/* Liste des voitures */}
            <Container className="py-5">
                <h2 className="text-center mb-4">Nos voitures disponibles</h2>
                <Row>
                    {voitures.map(voiture => (
                        <Col key={voiture.id} md={4} className="mb-5">
                            <Card className="h-100 shadow-sm">
                                <Card.Img
                                    variant="top"
                                    src={`http://localhost:9000/uploads/${voiture.image_url}`}
                                    alt={voiture.marque}
                                    style={{ height: "200px", objectFit: "cover" }}
                                />
                                <Card.Body className="d-flex flex-column justify-content-between bg-light">
                                    <div>
                                        <Card.Title>{voiture.marque} {voiture.modele}</Card.Title>
                                        <p>{voiture.prix_par_jour} DH / jour</p>
                                    </div>
                                    <div className="d-flex justify-content-between mt-3">
                                        {/* <Link to={`/voitures/${voiture.id}`}>
                                            <Button variant="outline-warning" size="sm">Voir plus</Button>
                                        </Link> */}
                                        <Link to={`/reservation?car=${voiture.id}`}>
                                            <Button variant="warning" size="sm">Réserver</Button>
                                        </Link>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>

            {/* Section info en bas */}
            <div className="card mb-3">
                <img src="images/location-4.jpg" className="card-img-top" alt="Voiture" style={{ height: "650px", objectFit: "cover" }} />
                <div className="card-body bg-secondary text-light p-5 fs-4">
                    <h5 className="card-title text-center fs-1">Roulez avec Classe – Découvrez l’Excellence Automobile</h5>
                    <p className="card-text">
                        Nos véhicules de luxe offrent un confort inégalé, une performance remarquable et un style raffiné. Idéal pour les occasions spéciales ou les trajets haut de gamme.
                    </p>
                    <p className="card-text">
                        <small className="text-muted">Mis à jour récemment</small>
                    </p>
                </div>

            </div>
        </div>
    );
}

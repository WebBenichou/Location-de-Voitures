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
            
           
            Liste des voitures en cards
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

             {/* <div className="container mt-5">
                <h2 className="mb-4">Benichou Lux Car : trouvez une location de voiture pas chère</h2>
                <div className="row">
                    {voitures.map((voiture, index) => (
                        <div className="col-md-4 mb-4" key={index}>
                            <Card className="h-100">
                                <Card.Img
                                    variant="top"
                                    src={voiture.image}
                                    style={{ height: "180px", objectFit: "contain" }}
                                />
                                <Card.Body className="d-flex flex-column justify-content-between">
                                    <Card.Title>{voiture.categorie}</Card.Title>
                                    <Card.Text>{voiture.portes}</Card.Text>
                                    <div className="d-flex justify-content-between mb-2">
                                        <span>
                                            <i className="bi bi-person-fill"></i> {voiture.passagers}
                                        </span>
                                        <span>
                                            <i className="bi bi-suitcase-fill"></i> {voiture.bagages}
                                        </span>
                                    </div>
                                    <div className="text-end fw-bold">
                                        À partir de {voiture.prix} DH<br />
                                        <small className="text-muted">par jour</small>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </div>
            </div> */}
        </div>
    );
}



import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Card, Container, Spinner, Alert, Button } from "react-bootstrap";

const VoitureForm = () => {
    const { id } = useParams(); // récupère l'id depuis l'URL
    const [voiture, setVoiture] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:9000/voitures/${id}`)
            .then((res) => {
                setVoiture(res.data);
                setLoading(false);
            })
            .catch((err) => {
                setError("Erreur lors du chargement de la voiture.");
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <div className="text-center py-5"><Spinner animation="border" variant="primary" /></div>;
    }

    if (error) {
        return <Alert variant="danger" className="mt-5 text-center">{error}</Alert>;
    }

    if (!voiture) {
        return <Alert variant="warning" className="mt-5 text-center">Voiture introuvable.</Alert>;
    }

    return (
        <Container className="py-5">
            <Card className="mx-auto shadow" style={{ maxWidth: '600px' }}>
                <Card.Img variant="top" src={voiture.image_url} style={{ height: '300px', objectFit: 'cover' }} />
                <Card.Body>
                    <Card.Title>{voiture.marque} {voiture.modele}</Card.Title>
                    <ul className="list-group list-group-flush mb-3">
                        <li className="list-group-item"><strong>Carburant :</strong> {voiture.carburant}</li>
                        <li className="list-group-item"><strong>Boîte de vitesses :</strong> {voiture.boite_vitesse}</li>
                        <li className="list-group-item"><strong>Prix par jour :</strong> {voiture.prix_par_jour} DH</li>
                    </ul>

                    {/* Bouton de réservation */}
                    <div className="d-grid">
                        <Link to={`/reservation?car=${voiture._id}`}>
                            <Button variant="success" size="lg">
                                Réserver cette voiture
                            </Button>
                        </Link>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default VoitureForm;

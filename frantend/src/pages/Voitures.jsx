import React from 'react';
import { Link } from 'react-router-dom';

const Voitures = ({ voitures }) => {
    const featuredCars = voitures.slice(0, 9); // Affiche les 9 premières voitures

    return (
        <div className="accueil">
            <section className="hero-section">
                <h1>Bienvenue chez Benichou Lux Car</h1>
                <p>Découvrez notre collection exclusive de véhicules haut de gamme</p>
                <Link to="/reservation" className="btn btn-primary">Réserver maintenant</Link>
            </section>

            <section className="featured-cars">
                <h2>Nos véhicules phares</h2>
                <div className="row">
                    {featuredCars.map(voiture => (
                        <div key={voiture._id} className="col-md-4 mb-4">
                            <div className="card">
                                <img src={voiture.image_url} className="card-img-top" alt={voiture.marque} />
                                <div className="card-body">
                                    <h5 className="card-title">{voiture.marque} {voiture.modele}</h5>
                                    <p className="card-text">{voiture.prix_par_jour}DH/jour</p>
                                    <Link to={`/reservation?car=${voiture._id}`} className="btn btn-outline-primary">
                                        Réserver
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Voitures;
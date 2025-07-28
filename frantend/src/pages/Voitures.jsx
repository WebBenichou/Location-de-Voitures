import React from 'react';
import { Link } from 'react-router-dom';

const Voitures = ({ voitures }) => {
  const featuredCars = voitures.slice(0, 9); // Affiche les 9 premières voitures

  return (
    <div className="accueil">
      <section className="hero-section text-center py-5 bg-light">
        <h1>Bienvenue chez Benichou Lux Car</h1>
        <p>Découvrez notre collection exclusive de véhicules haut de gamme</p>
        <Link to="/reservation" className="btn btn-warning mt-3">Réserver maintenant</Link>
      </section>

      <section className="featured-cars mt-5 px-4">
        <h2 className="mb-4 text-center">Nos véhicules phares</h2>
        <div className="row">
          {featuredCars.map(voiture => (
            <div key={voiture.id} className="col-md-4 mb-4">
              <div className="card h-100">
                <img
                  src={`http://localhost:9000/uploads/${voiture.image_url}`}
                  className="card-img-top"
                  alt={voiture.marque}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="card-title">{voiture.marque} {voiture.modele}</h5>
                    <p className="card-text">{voiture.prix_par_jour} DH / jour</p>
                  </div>
                  <div className="d-flex justify-content-between mt-3">
                    <Link to={`/reservation?car=${voiture.id}`} className="btn btn-outline-warning btn-sm">
                      Réserver
                    </Link>
                    <Link to={`/voitures/${voiture.id}`} className="btn btn-outline-warning btn-sm">
                      Voir plus
                    </Link>
                  </div>
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

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Reservation = ({ voitures }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const carId = queryParams.get('car');

    const [selectedCar, setSelectedCar] = useState(null);
    const [formData, setFormData] = useState({
        nom: '',
        email: '',
        telephone: '',
        dateDebut: '',
        dateFin: ''
    });

    useEffect(() => {
        if (carId) {
            const car = voitures.find(v => v._id === carId);
            setSelectedCar(car);
        }
    }, [carId, voitures]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Ici vous ajouteriez la logique pour enregistrer la réservation
        console.log('Réservation:', { car: selectedCar, ...formData });
        alert('Votre réservation a été enregistrée avec succès!');
        navigate('/');
    };

    return (
        <div className="reservation">
            <h1>Réserver un véhicule</h1>

            <div className="row">
                <div className="col-md-6">
                    <form onSubmit={handleSubmit}>
                        {selectedCar ? (
                            <div className="mb-4 p-3 bg-light rounded">
                                <h4>Vous réservez: {selectedCar.marque} {selectedCar.modele}</h4>
                                <p>Prix: {selectedCar.prix}€/jour</p>
                            </div>
                        ) : (
                            <div className="mb-3">
                                <label className="form-label">Choisir un véhicule</label>
                                <select
                                    className="form-select"
                                    onChange={(e) => setSelectedCar(voitures.find(v => v._id === e.target.value))}
                                    required
                                >
                                    <option value="">Sélectionnez un véhicule</option>
                                    {voitures.map(voiture => (
                                        <option key={voiture._id} value={voiture._id}>
                                            {voiture.marque} {voiture.modele} - {voiture.prix}€/jour
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        <div className="mb-3">
                            <label htmlFor="nom" className="form-label">Nom complet</label>
                            <input
                                type="text"
                                className="form-control"
                                id="nom"
                                name="nom"
                                value={formData.nom}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="telephone" className="form-label">Téléphone</label>
                                <input
                                    type="tel"
                                    className="form-control"
                                    id="telephone"
                                    name="telephone"
                                    value={formData.telephone}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="dateDebut" className="form-label">Date de début</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="dateDebut"
                                    name="dateDebut"
                                    value={formData.dateDebut}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="dateFin" className="form-label">Date de fin</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="dateFin"
                                    name="dateFin"
                                    value={formData.dateFin}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary">
                            Confirmer la réservation
                        </button>
                    </form>
                </div>

                <div className="col-md-6">
                    {selectedCar && (
                        <div className="card">
                            <img src={selectedCar.image} className="card-img-top" alt={selectedCar.marque} />
                            <div className="card-body">
                                <h5 className="card-title">{selectedCar.marque} {selectedCar.modele}</h5>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">Prix: {selectedCar.prix}€/jour</li>
                                    <li className="list-group-item">Année: {selectedCar.annee}</li>
                                    <li className="list-group-item">Carburant: {selectedCar.carburant}</li>
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Reservation;
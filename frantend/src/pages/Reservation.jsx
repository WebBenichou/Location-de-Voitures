import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Reservation = ({ voitures, userId }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const carId = queryParams.get('car');

    const [selectedCar, setSelectedCar] = useState(null);
    const [formData, setFormData] = useState({
        nom: '',
        telephone: '',
        dateDebut: '',
        dateFin: ''
    });

    useEffect(() => {
        if (carId) {
            const car = voitures.find(v => String(v.id) === String(carId));
            setSelectedCar(car);
        }
    }, [carId, voitures]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedCar || !formData.dateDebut || !formData.dateFin) {
            alert("Veuillez remplir tous les champs.");
            return;
        }

        const date1 = new Date(formData.dateDebut);
        const date2 = new Date(formData.dateFin);
        const diffDays = Math.ceil((date2 - date1) / (1000 * 60 * 60 * 24));

        if (diffDays <= 0) {
            alert("La date de fin doit être après la date de début.");
            return;
        }

        const montant_total = diffDays * selectedCar.prix_par_jour;

        try {
            const res = await axios.post("http://localhost:9000/reservations", {
                user_id: userId || 1,
                voiture_id: selectedCar.id,
                date_debut: formData.dateDebut,
                date_fin: formData.dateFin,
                montant_total
            });

            console.log(res.data);
            alert("Réservation enregistrée avec succès !");
            navigate("/");
        } catch (err) {
            console.error(err);
            alert("Erreur lors de la réservation !");
        }
    };

    return (
        <div className="reservation">
            <h1>Réserver un véhicule</h1>

            <div className="row">
                <div className="col-md-6">
                    <form onSubmit={handleSubmit}>
                        {selectedCar ? (
                            <div className="mb-4 p-3 bg-light rounded">
                                <h4>Vous réservez : {selectedCar.marque} {selectedCar.modele}</h4>
                                <p>Prix : {selectedCar.prix_par_jour} DH/jour</p>
                            </div>
                        ) : (
                            <div className="mb-3">
                                <label className="form-label">Choisir un véhicule</label>
                                <select
                                    className="form-select"
                                    onChange={(e) =>
                                        setSelectedCar(voitures.find(v => String(v.id) === e.target.value))
                                    }
                                    required
                                >
                                    <option value="">Sélectionnez un véhicule</option>
                                    {voitures.map(voiture => (
                                        <option key={voiture.id} value={voiture.id}>
                                            {voiture.marque} {voiture.modele} - {voiture.prix_par_jour} DH/jour
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

                        <div className="mb-3">
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
                        <br></br>
                        <button type="submit" className="btn btn-warning ">
                            Confirmer la réservation
                        </button>
                    </form>
                </div>

                <div className="col-md-6">
                    {selectedCar && (
                        <div className="card">
                            <img
                                src={`http://localhost:9000/uploads/${selectedCar.image_url}`}
                                className="card-img-top"
                                alt={`${selectedCar.marque} ${selectedCar.modele}`}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{selectedCar.marque} {selectedCar.modele}</h5>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">Prix : {selectedCar.prix_par_jour} DH/jour</li>
                                    <li className="list-group-item">Année : {selectedCar.annee}</li>
                                    <li className="list-group-item">Carburant : {selectedCar.carburant}</li>
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

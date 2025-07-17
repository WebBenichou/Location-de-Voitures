import React, { useEffect, useState } from "react";
import axios from "axios";

export default function VoituresList() {
    const [voitures, setVoitures] = useState([]);

    const charger = () => {
        axios.get("http://localhost:9000/voitures")
            .then(res => setVoitures(res.data))
            .catch(err => console.error(err));
    };

    const supprimer = (id) => {
        if (window.confirm("Voulez-vous vraiment supprimer cette voiture ?")) {
            axios.delete(`http://localhost:9000/voitures/${id}`)
                .then(() => charger());
        }
    };

    useEffect(() => {
        charger();
    }, []);

    return (
        <div>
            <h2>Liste des voitures</h2>
            {voitures.length === 0 ? (
                <p>Aucune voiture disponible.</p>
            ) : (
                <table border="1" cellPadding={10}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Marque</th>
                            <th>Modèle</th>
                            <th>Année</th>
                            <th>Prix/Jour</th>
                            <th>Disponible</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {voitures.map(v => (
                            <tr key={v.id}>
                                <td>{v.id}</td>
                                <td>{v.marque}</td>
                                <td>{v.modele}</td>
                                <td>{v.annee}</td>
                                <td>{v.prix_par_jour} MAD</td>
                                <td>{v.disponible ? "Oui" : "Non"}</td>
                                <td>
                                    <button onClick={() => supprimer(v.id)}>🗑 Supprimer</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

 import React, { useEffect, useState } from "react";
import axios from "axios";

export default function VoituresListe() {
    const [voitures, setVoitures] = useState([]);
    const [erreur, setErreur] = useState("");

    const charger = () => {
        axios.get("http://localhost:9000/voitures")
            .then(res => {
                setVoitures(res.data);
                setErreur("");
            })
            .catch(err => {
                console.error(err);
                setErreur("Erreur lors du chargement des voitures.");
            });
    };

    const supprimer = (id) => {
        if (window.confirm("Voulez-vous vraiment supprimer cette voiture ?")) {
            axios.delete(`http://localhost:9000/voitures/${id}`)
                .then(() => charger())
                .catch(err => {
                    console.error(err);
                    alert("Erreur lors de la suppression.");
                });
        }
    };

    useEffect(() => {
        charger();
    }, []);

    return (
        <div>
            <h2>Liste des voitures</h2>
            {erreur && <p style={{ color: "red" }}>{erreur}</p>}
            {voitures.length === 0 ? (
                <p>Aucune voiture disponible.</p>
            ) : (
                <table className="table-voitures" border="1" cellPadding="10">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Image</th>
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
                                <td>
                                    {v.image_url ? (
                                        <img src={`http://localhost:9000${v.image_url}`} alt={v.modele} width="80" />
                                    ) : "Aucune"}
                                </td>
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

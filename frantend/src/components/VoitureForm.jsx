import React, { useState } from "react";
import axios from "axios";

export default function VoitureForm() {
    const [form, setForm] = useState({
        marque: "",
        modele: "",
        annee: "",
        prix_par_jour: "",
        disponible: false,
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:9000/voitures", form)
            .then(() => {
                setForm({ marque: "", modele: "", annee: "", prix_par_jour: "", disponible: false });
                setMessage("🚗 Voiture ajoutée avec succès !");
            })
            .catch((err) => {
                console.error(err);
                setMessage("❌ Une erreur est survenue.");
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Ajouter une voiture</h2>

            <input
                name="marque"
                placeholder="Marque"
                value={form.marque}
                onChange={handleChange}
                required
            /><br />

            <input
                name="modele"
                placeholder="Modèle"
                value={form.modele}
                onChange={handleChange}
                required
            /><br />

            <input
                name="annee"
                type="number"
                placeholder="Année"
                value={form.annee}
                onChange={handleChange}
                required
            /><br />

            <input
                name="prix_par_jour"
                type="number"
                placeholder="Prix/Jour"
                value={form.prix_par_jour}
                onChange={handleChange}
                required
            /><br />

            <label>
                Disponible :
                <input
                    type="checkbox"
                    name="disponible"
                    checked={form.disponible}
                    onChange={handleChange}
                />
            </label><br />

            <button type="submit">Ajouter</button>

            {message && <p>{message}</p>}
        </form>
    );
}


import React, { useState } from "react";
import axios from "axios";

export default function VoitureForm() {
    const [form, setForm] = useState({
        marque: "",
        modele: "",
        annee: "",
        prix_par_jour: "",
        disponible: false,
        image_url: null
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleFileChange = (e) => {
        setForm((prev) => ({
            ...prev,
            image_url: e.target.files[0],
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("marque", form.marque);
        formData.append("modele", form.modele);
        formData.append("annee", form.annee);
        formData.append("prix_par_jour", form.prix_par_jour);
        formData.append("disponible", form.disponible);
        formData.append("image", form.image_url);

        axios.post("http://localhost:9000/voitures", formData)
            .then(() => {
                setForm({
                    marque: "",
                    modele: "",
                    annee: "",
                    prix_par_jour: "",
                    disponible: false,
                    image_url: null
                });
                setMessage("🚗 Voiture ajoutée avec succès !");
            })
            .catch((err) => {
                console.error(err);
                setMessage("❌ Une erreur est survenue.");
            });
    };

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <h2>Ajouter une voiture</h2>

            <input name="marque" placeholder="Marque" value={form.marque} onChange={handleChange} required /><br />
            <input name="modele" placeholder="Modèle" value={form.modele} onChange={handleChange} required /><br />
            <input name="annee" type="number" placeholder="Année" value={form.annee} onChange={handleChange} required /><br />
            <input name="prix_par_jour" type="number" placeholder="Prix/Jour" value={form.prix_par_jour} onChange={handleChange} required /><br />

            <label>
                Disponible :
                <input type="checkbox" name="disponible" checked={form.disponible} onChange={handleChange} />
            </label><br />

            <input type="file" accept="image/*" name="image_url" onChange={handleFileChange} required /><br />

            <button type="submit">Ajouter</button>

            {message && <p>{message}</p>}
        </form>
    );
}

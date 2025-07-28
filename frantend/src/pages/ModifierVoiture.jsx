import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function ModifierVoiture() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        marque: "",
        modele: "",
        annee: "",
        prix_par_jour: "",
        disponible: true,
        image: null,
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Charger les infos de la voiture
    useEffect(() => {
        const fetchVoiture = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`http://localhost:9000/voitures/${id}`);
                const voiture = res.data;
                setForm({
                    marque: voiture.marque,
                    modele: voiture.modele,
                    annee: voiture.annee,
                    prix_par_jour: voiture.prix_par_jour,
                    disponible: voiture.disponible,
                    image: null,
                });
                setError(null);
            } catch (err) {
                setError("Erreur lors du chargement de la voiture");
            }
            setLoading(false);
        };

        fetchVoiture();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (name === "image") {
            setForm((prev) => ({ ...prev, image: files[0] }));
        } else {
            setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(form);

        setLoading(true);


        const formData = new FormData();
        formData.append("username", "Chris");

        console.log("formdata ", formData);

        try {
            formData.append("marque", "test");
            formData.append("modele", form.modele);
            formData.append("annee", form.annee);
            formData.append("prix_par_jour", form.prix_par_jour);
            formData.append("disponible", form.disponible);
            if (form.image) formData.append("image", form.image);

            console.log(formData);
            console.log(formData.marque);

            await axios.put(`http://localhost:9000/voitures/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            navigate("/admin");
        } catch (err) {
            setError("Erreur lors de la mise à jour de la voiture");
            console.log(err);

        }
        setLoading(false);
    };

    return (
        <div className="container mt-4">
            <h2>Modifier la voiture</h2>

            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="mb-3">
                    <label>Marque</label>
                    <input
                        type="text"
                        name="marque"
                        className="form-control"
                        value={form.marque}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label>Modèle</label>
                    <input
                        type="text"
                        name="modele"
                        className="form-control"
                        value={form.modele}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label>Année</label>
                    <input
                        type="number"
                        name="annee"
                        className="form-control"
                        value={form.annee}
                        onChange={handleChange}
                        min="1900"
                        max={new Date().getFullYear()}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label>Prix par jour (MAD)</label>
                    <input
                        type="number"
                        name="prix_par_jour"
                        className="form-control"
                        value={form.prix_par_jour}
                        onChange={handleChange}
                        min="0"
                        required
                    />
                </div>

                <div className="form-check mb-3">
                    <input
                        type="checkbox"
                        name="disponible"
                        className="form-check-input"
                        checked={form.disponible}
                        onChange={handleChange}
                    />
                    <label className="form-check-label">Disponible</label>
                </div>

                <div className="mb-3">
                    <label>Changer l’image (optionnel)</label>
                    <input type="file" name="image" className="form-control" onChange={handleChange} accept="image/*" />
                </div>

                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? "Enregistrement..." : "Mettre à jour"}
                </button>
            </form>
        </div>
    );
}

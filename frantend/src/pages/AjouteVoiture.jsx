import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaSignInAlt, FaUserPlus, FaSignOutAlt } from "react-icons/fa";

export default function AjouteVoiture() {
    const navigate = useNavigate();

    // Simuler l'état de l'utilisateur
    const [user, setUser] = useState(null);

    const handleLogin = () => {
        setUser({ name: "Admin Redouane" });
    };

    const handleLogout = () => {
        setUser(null);
        navigate("/");
    };

    const [voitures, setVoitures] = useState([]);
    const [form, setForm] = useState({
        marque: "",
        modele: "",
        annee: "",
        prix_par_jour: "",
        disponible: true,
        image: null,
    });
    const [editId, setEditId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchVoitures();
    }, []);

    const fetchVoitures = async () => {
        setLoading(true);
        try {
            const res = await axios.get("http://localhost:9000/voitures");
            setVoitures(res.data);
            setError(null);
        } catch (err) {
            setError("Erreur lors du chargement des voitures");
        }
        setLoading(false);
    };

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
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("marque", form.marque);
            formData.append("modele", form.modele);
            formData.append("annee", form.annee);
            formData.append("prix_par_jour", form.prix_par_jour);
            formData.append("disponible", form.disponible);
            if (form.image) formData.append("image", form.image);

            if (editId) {
                await axios.put(`http://localhost:9000/voitures/${editId}`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            } else {
                await axios.post("http://localhost:9000/voitures", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            }

            setForm({
                marque: "",
                modele: "",
                annee: "",
                prix_par_jour: "",
                disponible: true,
                image: null,
            });
            setEditId(null);
            fetchVoitures();
            setError(null);
            navigate("/admin");
        } catch (err) {
            setError("Erreur lors de l'enregistrement");
        }
        setLoading(false);
    };

    return (
        <>
            {/* Barre Login / Logout */}
            <div className="d-flex justify-content-end mb-3">
                {!user ? (
                    <>
                        <button className="btn btn-outline-primary me-2" onClick={handleLogin}>
                            <FaSignInAlt className="me-2" />
                            Login
                        </button>
                        <button className="btn btn-outline-secondary">
                            <FaUserPlus className="me-2" />
                            Signup
                        </button>
                    </>
                ) : (
                    <div className="d-flex align-items-center">
                        <span className="me-3">
                            Bienvenue, <strong>{user.name}</strong>
                        </span>
                        <button className="btn btn-outline-danger" onClick={handleLogout}>
                            <FaSignOutAlt className="me-2" />
                            Logout
                        </button>
                    </div>
                )}
            </div>

            <h2>Espace Admin - Gestion des voitures</h2>

            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit} encType="multipart/form-data" className="mb-4 p-4 bg-light rounded-3 shadow-sm">
                <h4 className="mb-4">{editId ? "Modifier le véhicule" : "Ajouter un nouveau véhicule"}</h4>

                <div className="row g-3">
                    {/* Marque */}
                    <div className="col-md-6 col-lg-3">
                        <label htmlFor="marque" className="form-label">Marque*</label>
                        <input
                            type="text"
                            id="marque"
                            name="marque"
                            placeholder="Ex: Renault"
                            value={form.marque}
                            onChange={handleChange}
                            required
                            className="form-control"
                        />
                        <div className="invalid-feedback">Veuillez saisir la marque</div>
                    </div>

                    {/* Modèle */}
                    <div className="col-md-6 col-lg-3">
                        <label htmlFor="modele" className="form-label">Modèle*</label>
                        <input
                            type="text"
                            id="modele"
                            name="modele"
                            placeholder="Ex: Clio"
                            value={form.modele}
                            onChange={handleChange}
                            required
                            className="form-control"
                        />
                        <div className="invalid-feedback">Veuillez saisir le modèle</div>
                    </div>

                    {/* Année */}
                    <div className="col-md-6 col-lg-2">
                        <label htmlFor="annee" className="form-label">Année*</label>
                        <input
                            type="number"
                            id="annee"
                            name="annee"
                            placeholder="2020"
                            value={form.annee}
                            onChange={handleChange}
                            required
                            className="form-control"
                            min="1900"
                            max={new Date().getFullYear()}
                        />
                        <div className="invalid-feedback">Année invalide</div>
                    </div>

                    {/* Prix */}
                    <div className="col-md-6 col-lg-2">
                        <label htmlFor="prix_par_jour" className="form-label">Prix/jour (MAD)*</label>
                        <div className="input-group">
                            <input
                                type="number"
                                id="prix_par_jour"
                                name="prix_par_jour"
                                placeholder="300"
                                value={form.prix_par_jour}
                                onChange={handleChange}
                                required
                                className="form-control"
                                min="0"
                                step="10"
                            />
                            <span className="input-group-text">MAD</span>
                        </div>
                        <div className="invalid-feedback">Prix invalide</div>
                    </div>

                    {/* Disponibilité */}
                    <div className="col-md-6 col-lg-2 d-flex align-items-end">
                        <div className="form-check form-switch">
                            <input
                                type="checkbox"
                                id="disponibleCheck"
                                name="disponible"
                                checked={form.disponible}
                                onChange={handleChange}
                                className="form-check-input"
                                role="switch"
                            />
                            <label htmlFor="disponibleCheck" className="form-check-label ms-2">Disponible</label>
                        </div>
                    </div>

                    {/* Image */}
                    <div className="col-md-6 col-lg-4">
                        <label htmlFor="image" className="form-label">Image du véhicule</label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            accept="image/*"
                            onChange={handleChange}
                            className="form-control"
                        />
                        <div className="form-text">Formats acceptés: JPG, PNG</div>
                    </div>

                    {/* Bouton */}
                    <div className="col-12 mt-3">
                        <button
                            type="submit"
                            className="btn btn-warning px-4"
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            ) : null}
                            {editId ? "Enregistrer les modifications" : "Ajouter le véhicule"}
                        </button>

                        {editId && (
                            <button
                                type="button"
                                className="btn btn-outline-secondary ms-2"
                                onClick={handleCancelEdit}
                            >
                                Annuler
                            </button>
                        )}
                    </div>
                </div>
            </form>
        </>
    );
}

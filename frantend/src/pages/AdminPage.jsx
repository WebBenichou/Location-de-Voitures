import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminPage = () => {
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

  // Chargement initial des voitures
  useEffect(() => {

    fetchVoitures();
  }, []);

  const fetchVoitures = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:9000/voitures");
      console.log(res);
      
      setVoitures(res.data);
      setError(null);
    } catch (err) {
      setError("Erreur lors du chargement des voitures");
    }
    setLoading(false);
  };

  // Gérer les changements dans le formulaire
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (name === "image") {
      setForm((prev) => ({ ...prev, image: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    }
  };

  // Soumettre formulaire ajout ou modification
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
        // Modifier voiture
        await axios.put(`http://localhost:9000/voitures/${editId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        // Ajouter voiture
        await axios.post("http://localhost:9000/voitures", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      setForm({ marque: "", modele: "", annee: "", prix_par_jour: "", disponible: true, image: null });
      setEditId(null);
      fetchVoitures();
      setError(null);
    } catch (err) {
      setError("Erreur lors de l'enregistrement");
    }
    setLoading(false);
  };

  // Préparer édition voiture
  const handleEdit = (voiture) => {
    setForm({
      marque: voiture.marque,
      modele: voiture.modele,
      annee: voiture.annee,
      prix_par_jour: voiture.prix_par_jour,
      disponible: voiture.disponible,
      image: null,
    });
    setEditId(voiture.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Supprimer voiture
  const handleDelete = async (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cette voiture ?")) {
      setLoading(true);
      try {
        await axios.delete(`http://localhost:9000/voitures/${id}`);
        fetchVoitures();
        setError(null);
      } catch (err) {
        setError("Erreur lors de la suppression");
      }
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Espace Admin - Gestion des voitures</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} encType="multipart/form-data" className="mb-4">
        <div className="row g-2 align-items-center">
          <div className="col-md-2">
            <input
              type="text"
              name="marque"
              placeholder="Marque"
              value={form.marque}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="col-md-2">
            <input
              type="text"
              name="modele"
              placeholder="Modèle"
              value={form.modele}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="col-md-2">
            <input
              type="number"
              name="annee"
              placeholder="Année"
              value={form.annee}
              onChange={handleChange}
              required
              className="form-control"
              min="1900"
              max={new Date().getFullYear()}
            />
          </div>
          <div className="col-md-2">
            <input
              type="number"
              name="prix_par_jour"
              placeholder="Prix par jour (MAD)"
              value={form.prix_par_jour}
              onChange={handleChange}
              required
              className="form-control"
              min="0"
            />
          </div>
          <div className="col-md-2 d-flex align-items-center">
            <input
              type="checkbox"
              name="disponible"
              checked={form.disponible}
              onChange={handleChange}
              className="form-check-input"
              id="disponibleCheck"
            />
            <label htmlFor="disponibleCheck" className="ms-2">
              Disponible
            </label>
          </div>
          <div className="col-md-3">
            <input type="file" name="image" accept="image/*" onChange={handleChange} className="form-control" />
          </div>
          <div className="col-md-1">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {editId ? "Modifier" : "Ajouter"}
            </button>
          </div>
        </div>
      </form>

      {loading ? (
        <p>Chargement...</p>
      ) : (
        <table className="table table-bordered">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Marque</th>
              <th>Modèle</th>
              <th>Année</th>
              <th>Prix / jour</th>
              <th>Disponible</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {voitures.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center">
                  Aucune voiture trouvée.
                </td>
              </tr>
            )}
            {voitures.map((v) => (
              <tr key={v.id}>
                <td>{v.id}</td>
                <td>{v.marque}</td>
                <td>{v.modele}</td>
                <td>{v.annee}</td>
                <td>{v.prix_par_jour} MAD</td>
                <td>{v.disponible ? "Oui" : "Non"}</td>
                <td>
                  {v.image_url ? (
                    <img src={"http://localhost:9000/uploads/"+v.image_url} alt="voiture" style={{ width: "80px" }} />
                  ) : (
                    "—"
                  )}
                </td>
                <td>
                  <button onClick={() => handleEdit(v)} className="btn btn-warning btn-sm me-2">
                    Modifier
                  </button>
                  <button onClick={() => handleDelete(v.id)} className="btn btn-danger btn-sm">
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminPage;

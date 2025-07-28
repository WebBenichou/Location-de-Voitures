import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { FaSignInAlt, FaUserPlus, FaSignOutAlt } from "react-icons/fa";
import ReservationsPage from "./ReservationsPage";
import ClientsPage from "./ClientsPage";

const Sidebar = ({ active, setActive }) => {
  return (
    <div style={{
      width: 220,
      backgroundColor: "hsla(213, 16%, 14%, 1.00)",
      color: "white",
      minHeight: "100vh",
      padding: 20,
      boxSizing: "border-box",
      borderRadius:"0 80px"
    }}>
      <h2 style={{ textAlign: "center", marginBottom: 30 }}><strong>Admin Panel</strong></h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li
          onClick={() => setActive("voitures")}
          style={{
            padding: "10px 15px",
            marginBottom: 10,
            cursor: "pointer",
            backgroundColor: active === "voitures" ? "#f0b40eff" : "transparent",
            borderRadius: 5,
          }}
        >Voitures</li>
        <li
          onClick={() => setActive("reservations")}
          style={{
            padding: "10px 15px",
            marginBottom: 10,
            cursor: "pointer",
            backgroundColor: active === "reservations" ? "#f0b40eff" : "transparent",
            borderRadius: 5,
          }}
        >Réservations</li>
        <li
          onClick={() => setActive("clients")}
          style={{
            padding: "10px 15px",
            marginBottom: 10,
            cursor: "pointer",
            backgroundColor: active === "clients" ? "#f0b40eff" : "transparent",
            borderRadius: 5,
          }}
        >Clients</li>
      </ul>
    </div>
  );
};

const AdminPage = () => {
  const [activeSection, setActiveSection] = useState("voitures");
  const [voitures, setVoitures] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Simuler utilisateur connecté
  const [user, setUser] = useState(null);
  const handleLogin = () => setUser({ name: "Admin Redouane" });
  const handleLogout = () => setUser(null);

  useEffect(() => {
    if (activeSection === "voitures") {
      fetchVoitures();
    }
  }, [activeSection]);

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

  /*  ---------- voitutre --------------- */

  const renderVoitures = () => (
    <>
      <div>
        <NavLink to={"/ajoute"} className="btn btn-warning mb-3">Ajouter une voiture</NavLink>
      </div>
      {loading ? (
        <p>Chargement...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
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
            {voitures.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center">Aucune voiture trouvée.</td>
              </tr>
            ) : (
              voitures.map((v) => (
                <tr key={v.id}>
                  <td>{v.id}</td>
                  <td>{v.marque}</td>
                  <td>{v.modele}</td>
                  <td>{v.annee}</td>
                  <td>{v.prix_par_jour} MAD</td>
                  <td>{v.disponible ? "Oui" : "Non"}</td>
                  <td>
                    {v.image_url ? (
                      <img
                        src={`http://localhost:9000/uploads/${v.image_url}`}
                        alt="voiture"
                        style={{ width: "80px" }}
                      />
                    ) : "—"}
                  </td>
                  <td>
                    <NavLink to={`/modifier/${v.id}`} className="btn btn-warning btn-sm me-2">
                      Modifier
                    </NavLink>
                    <button onClick={() => handleDelete(v.id)} className="btn btn-danger btn-sm">
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </>
  );

  /* ------------- Résérvations ---------- */
  return (
     <div style={{ display: "flex" }}>
      <Sidebar active={activeSection} setActive={setActiveSection} />

      <div style={{ flex: 1, padding: 30 }}>
        {/* Barre Login / Logout */}
        <div className="d-flex justify-content-end mb-3">
          {!user ? (
            <>
              <button className="btn btn-outline-warning me-2" onClick={handleLogin}>
                <FaSignInAlt className="me-2" /> Login
              </button>
              <button className="btn btn-outline-secondary">
                <FaUserPlus className="me-2" /> Signup
              </button>
            </>
          ) : (
            <div className="d-flex align-items-center">
              <span className="me-3">
                Bienvenue, <strong>{user.name}</strong>
              </span>
              <button className="btn btn-outline-warning" onClick={handleLogout}>
                <FaSignOutAlt className="me-2" /> Logout
              </button>
            </div>
          )}
        </div>

        {/* Affichage des sections */}
        {activeSection === "voitures" && renderVoitures()}
        {activeSection === "reservations" && <ReservationsPage />}
        {activeSection === "clients" && <ClientsPage />}
      </div>
    </div>
  );
};

export default AdminPage;

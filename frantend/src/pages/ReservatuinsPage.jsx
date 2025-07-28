import React, { useEffect, useState } from "react";
import axios from "axios";

const ReservationsPage = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:9000/reservations");
      setReservations(res.data);
      setError(null);
    } catch (err) {
      setError("Erreur lors du chargement des réservations");
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Liste des Réservations</h2>
      {loading ? (
        <p>Chargement...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : reservations.length === 0 ? (
        <p>Aucune réservation trouvée.</p>
      ) : (
        <table className="table table-bordered">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Client</th>
              <th>Voiture</th>
              <th>Date de début</th>
              <th>Date de fin</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((r) => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.client_name || r.client?.name || "N/A"}</td>
                <td>{r.voiture_marque || r.voiture?.marque || "N/A"}</td>
                <td>{new Date(r.date_debut).toLocaleDateString()}</td>
                <td>{new Date(r.date_fin).toLocaleDateString()}</td>
                <td>{r.statut}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ReservationsPage;

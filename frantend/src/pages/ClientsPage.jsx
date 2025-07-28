import React, { useEffect, useState } from "react";
import axios from "axios";
import ClientsTable from "../components/ClientsTable"; // <-- On va le créer juste après

const ClientsPage = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:9000/users");
      setClients(res.data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Erreur lors du chargement des clients");
    }
    setLoading(false);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Liste des Clients</h2>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Chargement...</span>
          </div>
          <p>Chargement des clients...</p>
        </div>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : clients.length === 0 ? (
        <p>Aucun client trouvé.</p>
      ) : (
        <ClientsTable clients={clients} />
      )}
    </div>
  );
};

export default ClientsPage;

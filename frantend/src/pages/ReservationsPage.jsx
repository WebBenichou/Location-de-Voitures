import React, { useEffect, useState } from "react";
import axios from "axios";

const STATUS = {
  ALL: "tous",
  PENDING: "en attente",
  ACCEPTED: "acceptée",
  REJECTED: "rejetée"
};

const statusColors = {
  [STATUS.PENDING]: "warning",
  [STATUS.ACCEPTED]: "success",
  [STATUS.REJECTED]: "danger"
};

const statusLabels = {
  [STATUS.PENDING]: "En attente",
  [STATUS.ACCEPTED]: "Confirmer",
  [STATUS.REJECTED]: "Rejeter"
};

const ReservationsPage = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoadingId, setActionLoadingId] = useState(null);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState(STATUS.ALL);

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
      console.error(err);
    }
    setLoading(false);
  };

  const updateReservationStatus = async (id, status) => {
    setActionLoadingId(id);
    try {
      await axios.put(`http://localhost:9000/reservations/${id}`, {
        statut: status,
      });
      setReservations(prev =>
        prev.map(res => 
          res.id === id ? { ...res, statut: status } : res
        )
      );
    } catch (err) {
      setError(`Erreur lors de la mise à jour du statut: ${err.message}`);
      console.error(err);
    }
    setActionLoadingId(null);
  };

  const filteredReservations =
    statusFilter === STATUS.ALL
      ? reservations
      : reservations.filter((r) => r.statut === statusFilter);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Liste des Réservations</h2>
      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Chargement...</span>
          </div>
        </div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : filteredReservations.length === 0 ? (
        <div className="alert alert-info">Aucune réservation trouvée.</div>
      ) : (
        <div className="row g-4">
          {filteredReservations.map((reservation) => (
            <div key={reservation.id} className="col-md-6 col-lg-4">
              <div className="card h-100 shadow-sm">
                <div className="card-header d-flex justify-content-between align-items-center bg-light">
                  <div>
                    <span className="text-muted small">N°: {reservation.id}</span>
                  </div>
                  <span className={`badge bg-${statusColors[reservation.statut]} text-capitalize`}>
                    {reservation.statut}
                  </span>
                </div>
                
                <div className="card-body">
                  <div className="mb-3">
                    <h5 className="card-title mb-1">
                      {reservation.voiture_marque || reservation.voiture?.marque || "Marque non spécifiée"}
                    </h5>
                    <h6 className="card-subtitle text-muted">
                      {reservation.client_name || reservation.client?.name || "Client inconnu"}
                    </h6>
                  </div>
                  
                  <div className="d-flex justify-content-between mb-2">
                    <div>
                      <small className="text-muted">Début:</small>
                      <div className="fw-bold">{formatDate(reservation.date_debut)}</div>
                    </div>
                    <div className="text-end">
                      <small className="text-muted">Fin:</small>
                      <div className="fw-bold">{formatDate(reservation.date_fin)}</div>
                    </div>
                  </div>
                </div>
                
                <div className="card-footer bg-white border-top-0">
                  <div className="d-flex justify-content-between gap-2">
                    {Object.entries(STATUS)
                      .filter(([key]) => key !== 'ALL')
                      .map(([key, status]) => (
                        <button
                          key={key}
                          onClick={() => updateReservationStatus(reservation.id, status)}
                          className={`btn btn-sm flex-grow-1 ${
                            reservation.statut === status 
                              ? `btn-${statusColors[status]}` 
                              : `btn-outline-${statusColors[status]}`
                          }`}
                          disabled={actionLoadingId === reservation.id}
                        >
                          {actionLoadingId === reservation.id ? (
                            <span className="spinner-border spinner-border-sm" role="status" />
                          ) : (
                            statusLabels[status]
                          )}
                        </button>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReservationsPage;
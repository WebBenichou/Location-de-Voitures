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
      console.log("Données des réservations:", res.data);
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

  // Fonction pour générer une clé unique
  const generateUniqueKey = (reservation) => {
    return [
      reservation.id,
      reservation.user?.id || 'no-user',
      reservation.voiture?.id || 'no-car',
      new Date(reservation.date_debut).getTime(),
      new Date(reservation.date_fin).getTime()
    ].join('-');
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Liste des Réservations</h2>
      
      {/* Filtre par statut */}
      <div className="mb-4">
        <label className="me-2">Filtrer par statut :</label>
        <select 
          className="form-select w-auto d-inline-block"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value={STATUS.ALL}>Tous</option>
          <option value={STATUS.PENDING}>En attente</option>
          <option value={STATUS.ACCEPTED}>Acceptées</option>
          <option value={STATUS.REJECTED}>Rejetées</option>
        </select>
      </div>

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
            <div 
              key={generateUniqueKey(reservation)}
              className="col-md-6 col-lg-4"
            >
              <div className="card h-100 shadow-sm">
                <div className="card-header d-flex justify-content-between align-items-center bg-light">
                  <div>
                    <span className="text-muted small">Réservation N° : {reservation.id}</span>
                  </div>
                  <span className={`badge bg-${statusColors[reservation.statut]} text-capitalize`}>
                    {reservation.statut}
                  </span>
                </div>
                
                <div className="card-body">
                  {/* Informations de la voiture */}
                  <div className="mb-3">
                    <h5 className="card-title mb-1">
                      {reservation.voiture?.marque || "Marque inconnue"} - {reservation.voiture?.model || "Modèle inconnu"}
                    </h5>
                    {reservation.voiture?.image_url && (
                      <img 
                        src={reservation.voiture.image_url} 
                        alt={`${reservation.voiture.marque} ${reservation.voiture.model}`}
                        className="img-fluid mb-2 rounded"
                        style={{maxHeight: '150px', objectFit: 'cover'}}
                      />
                    )}
                  </div>
                  
                  {/* Informations de l'utilisateur */}
                  <div className="mb-3 border-top pt-2">
                    <h6 className="card-subtitle mb-2">Client:</h6>
                    <p className="mb-1">
                      {reservation.user?.nom || "Nom inconnu"} {reservation.user?.prenom || "Prénom inconnu"}
                    </p>
                    <p className="text-muted small mb-0">
                      Tél: {reservation.user?.telephone || "Non renseigné"}
                    </p>
                  </div>
                  
                  {/* Dates de réservation */}
                  <div className="d-flex justify-content-between mb-2 border-top pt-2">
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
                
                {/* Actions */}
                <div className="card-footer bg-white border-top-0">
                  <div className="d-flex justify-content-between gap-2">
                    {Object.entries(STATUS)
                      .filter(([key]) => key !== 'ALL')
                      .map(([key, status]) => (
                        <button
                          key={`action-${reservation.id}-${key}`}
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
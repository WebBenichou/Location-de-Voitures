import React from "react";

const ClientsTable = ({ clients }) => {
  return (
    <table className="table table-bordered table-hover">
      <thead className="table-light">
        <tr>
          <th>ID</th>
          <th>Nom</th>
          <th>Prénom</th>
          <th>Email</th>
          <th>Téléphone</th>
          <th>Date d'inscription</th>
        </tr>
      </thead>
      <tbody>
        {clients.map((client) => (
          <tr key={client.id}>
            <td>{client.id}</td>
            <td>{client.nom}</td>
            <td>{client.prenom}</td>
            <td>{client.email}</td>
            <td>{client.telephone || "N/A"}</td>
            <td>{new Date(client.date_inscription).toLocaleDateString("fr-FR")}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ClientsTable;

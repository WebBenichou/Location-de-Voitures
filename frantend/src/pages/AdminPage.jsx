import React, { useEffect, useState } from "react";

const AdminPage = () => {
    const [admin, setAdmin] = useState(null);

    useEffect(() => {
        const adminData = localStorage.getItem("user");
        if (adminData) {
            const user = JSON.parse(adminData);
            if (user.role === "admin") {
                setAdmin(user);
            } else {
                setAdmin(null);
            }
        }
    }, []);

    if (!admin) {
        return <div className="text-center mt-5">Accès refusé ou non connecté en tant qu'administrateur</div>;
    }

    return (
        <div className="container mt-5">
            <h2>Espace Administrateur</h2>
            <ul className="list-group mt-3">
                <li className="list-group-item"><strong>ID :</strong> {admin.id}</li>
                <li className="list-group-item"><strong>Nom :</strong> {admin.nom}</li>
                <li className="list-group-item"><strong>Prénom :</strong> {admin.prenom}</li>
                <li className="list-group-item"><strong>Email :</strong> {admin.email}</li>
            </ul>
        </div>
    );
};

export default AdminPage;

import React, { useEffect, useState } from "react";

const UserPage = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {

        const userData = localStorage.getItem("user");
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    if (!user) {
        return <div className="text-center mt-5"> Aucun utilisateur connecté.</div>;
    }

    return (
        <div className="container mt-5">
            <h2> Espace utilisateur</h2>
            <ul className="list-group mt-3">
                <li className="list-group-item"><strong>ID :</strong> {user.id}</li>
                <li className="list-group-item"><strong>Nom :</strong> {user.nom}</li>
                <li className="list-group-item"><strong>Prénom :</strong> {user.prenom}</li>
                <li className="list-group-item"><strong>Email :</strong> {user.email}</li>
                <li className="list-group-item"><strong>Téléphone :</strong> {user.telephone}</li>
                <li className="list-group-item"><strong>Rôle :</strong> {user.role}</li>
            </ul>
        </div>
    );
};

export default UserPage;

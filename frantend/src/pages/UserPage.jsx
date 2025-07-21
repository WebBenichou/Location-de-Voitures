import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserPage = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        try {
            const userData = localStorage.getItem("user");
            if (userData) {
                const parsedUser = JSON.parse(userData);
                if (parsedUser && parsedUser.email) {
                    setUser(parsedUser);
                }
            }
        } catch (error) {
            console.error("Erreur de lecture des données utilisateur :", error);
        }
    }, []);

    function handleLogout() {
        localStorage.removeItem("user");
        navigate("/login");
    }

    if (!user) {
        return <div className="text-center mt-5"> Aucun utilisateur connecté.</div>;
    }

    return (
        <div className="container mt-5">
            <h2>Espace utilisateur</h2>
            <ul className="list-group mt-3">
                <li className="list-group-item"><strong>ID :</strong> {user.id || "Non défini"}</li>
                <li className="list-group-item"><strong>Nom :</strong> {user.nom || "Non défini"}</li>
                <li className="list-group-item"><strong>Prénom :</strong> {user.prenom || "Non défini"}</li>
                <li className="list-group-item"><strong>Email :</strong> {user.email}</li>
                <li className="list-group-item"><strong>Téléphone :</strong> {user.telephone || "Non défini"}</li>
                <li className="list-group-item"><strong>Rôle :</strong> {user.role}</li>
            </ul>
            <button className="btn btn-outline-danger mt-4" onClick={handleLogout}>
                Se déconnecter
            </button>
        </div>
    );
};

export default UserPage;

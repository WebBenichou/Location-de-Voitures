import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 

const Login = () => {
    const [email, setEmail] = useState("");
    const [motDePasse, setMotDePasse] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    function handleLogin(event) {
        event.preventDefault();

        axios.post("http://localhost:9000/identification/login", {
            email: email,
            mot_de_passe: motDePasse
        })
        .then(response => {
            const user = response.data;
            localStorage.setItem("user", JSON.stringify(user));
            if (user.role === 'admin') {
                navigate("/admin");
            } else {
                navigate("/user");
            }
        })
        .catch(error => {
            console.error("Erreur de connexion :", error);
            setMessage("Email ou mot de passe incorrect.");
        });
    }

    return (
        <div className="container mt-5">
            <h2>Connexion</h2>
            <form onSubmit={handleLogin}> {/* Correction ici */}
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        id="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="motDePasse" className="form-label">Mot de passe</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        id="motDePasse" 
                        value={motDePasse} 
                        onChange={(e) => setMotDePasse(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit" className="btn btn-primary">Se connecter</button>
            </form>
            {message && <div className="mt-3 alert alert-info">{message}</div>}
        </div>
    );
};

export default Login;

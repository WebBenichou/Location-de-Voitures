import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 

const Register = () => {
    const [email, setEmail] = useState("");
    const [motDePasse, setMotDePasse] = useState("");
    const [nom,setNom] = useState("")
    const [prenom,setPrenom]= useState("")
    const [telephone,setTelephone]= useState("")
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    function handleLogin(event) {
        event.preventDefault();

        axios.post("http://localhost:9000/identification/register", {
            email: email,
            mot_de_passe: motDePasse,
            nom:nom,
            prenom: prenom,
            telephone: telephone
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
                    <label htmlFor="email" className="form-label">Nom </label>
                    <input 
                        type="text" 
                        className="form-control" 
                        
                        value={nom} 
                        onChange={(e) => setNom(e.target.value)} 
                        required 
                    />
                </div>
                
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">prenom</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        
                        value={prenom} 
                        onChange={(e) => setPrenom(e.target.value)} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">telephone</label>
                    <input 
                        type="number" 
                        className="form-control" 
                       
                        value={telephone} 
                        onChange={(e) => setTelephone(e.target.value)} 
                        required 
                    />
                </div>
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
                <button type="submit" className="btn btn-warning">inscription </button>
            </form>
            {message && <div className="mt-3 alert alert-info">{message}</div>}
        </div>
    );
};

export default Register;

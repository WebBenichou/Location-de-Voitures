const express = require("express");
const router = express.Router();
const db = require("../data/db");
const bcrypt = require("bcrypt");

// Register
router.post("/register", async (req, res) => {
    const { nom, prenom, telephone, email, mot_de_passe } = req.body;

    if (!nom || !prenom || !telephone || !email || !mot_de_passe) {
        return res.status(401).json({ message: "Tous les champs sont requis !" });
    }

    const role = "client";
    const hashedPassword = await bcrypt.hash(mot_de_passe, 10);

    const sql = "INSERT INTO users(nom, prenom, telephone, email, mot_de_passe, role) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(sql, [nom, prenom, telephone, email, hashedPassword, role], (err, results) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({ message: "Utilisateur créé avec succès !" });
    });
});

// Login
router.post("/login", (req, res) => {
    const { email, mot_de_passe } = req.body;

    if (!email || !mot_de_passe) {
        return res.status(401).json({ message: "Email et mot de passe requis !" });
    }

    const sql = "SELECT * FROM users WHERE email = ?";
    db.query(sql, [email], async (err, result) => {
        if (err) return res.status(500).json(err);

        if (result.length === 0) {
            return res.status(401).json({ message: "Email ou mot de passe incorrect." });
        }

        const user = result[0];
        const match = await bcrypt.compare(mot_de_passe, user.mot_de_passe);

        if (match) {
            res.status(200).json({
                id: user.id,
                nom: user.nom,
                prenom: user.prenom,
                telephone: user.telephone,
                email: user.email,
                role: user.role
            });
        } else {
            res.status(401).json({ message: "Email ou mot de passe incorrect." });
        }
    });
});

module.exports = router;

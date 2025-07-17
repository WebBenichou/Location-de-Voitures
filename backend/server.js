const express = require("express");
const cors = require("cors");
const db = require('./data/db')
const bodyParser = require('body-parser');


const app = express();
const PORT = 9000;
app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.send('worked !')
})

app.use(cors());
app.use(express.json());

// Vérifie la connexion

db.connect((err) => {
    if (err) {
        console.error("Erreur de connexion à la base de données :", err);
        return;
    }
    console.log("Connecté à la base de données MySQL");
});

//  GET - Toutes les voitures

app.get("/voitures", (req, res) => {
    db.query("SELECT * FROM voitures", (err, result) => {
        if (err)
            res.status(500).send(err);
        res.json(result);
    });
});

// POST - Ajouter une voiture
app.post("/voitures", (req, res) => {
    const { marque, modele, annee, prix_par_jour, disponible } = req.body;
    db.query(
        "INSERT INTO voitures (marque, modele, annee, prix_par_jour, disponible) VALUES (?, ?, ?, ?, ?)",
        [marque, modele, annee, prix_par_jour, disponible],
        (err, result) => {

            if (err) return res.status(500).send(err);
            res.status(201).json({ message: "Voiture ajoutée avec succès" });
        }
    ); 
});


// PUT - Modifier une voiture
app.put("/voitures/:id", (req, res) => {
    const { id } = req.params;
    const { marque, modele, annee, prix_par_jour, disponible } = req.body;
    db.query(
        "UPDATE voitures SET marque = ?, modele = ?, annee = ?, prix_par_jour = ?, disponible = ? WHERE id = ?",
        [marque, modele, annee, prix_par_jour, disponible, id],
        (err, result) => {
            if (err) return res.status(500).send(err);
            res.json({ message: "Voiture mise à jour avec succès" });
        }
    );
});


// DELETE - Supprimer une voiture
app.delete("/voitures/:id", (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM voitures WHERE id=?", [id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ message: "Voiture supprimée avec succès" });
    });
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log('Serveur lancé sur http://localhost:' + PORT);
});

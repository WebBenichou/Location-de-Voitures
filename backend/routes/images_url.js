
const express = require("express");
const multer = require("multer");
const path = require("path");
const db = require("../data/db");
const router = express.Router();

// Configurer le stockage des fichiers
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "public/uploads"),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Ajouter une voiture avec image
router.post("/", upload.single("image_url"), (req, res) => {
    const { marque, modele, annee, prix_par_jour, disponible } = req.body;
    const image_url = req.file ? `/uploads/${req.file.filename}` : null;

    const sql = "INSERT INTO voitures (marque, modele, annee, prix_par_jour, disponible, image_url) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(sql, [marque, modele, annee, prix_par_jour, disponible, image_url], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(201).send("Voiture ajoutée !");
    });
});

// Obtenir toutes les voitures
router.get("/", (req, res) => {
    db.query("SELECT * FROM voitures", (err, result) => {
        if (err) return res.status(500).send(err);
        res.json(result);
    });
});

// Supprimer une voiture
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM voitures WHERE id = ?", [id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send("Voiture supprimée");
    });
});

module.exports = router;


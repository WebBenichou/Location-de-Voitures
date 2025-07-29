const express = require("express");
const router = express.Router();
const db = require("../data/db");
const multer = require("multer");
const path = require("path");

// Upload image config
const storage = multer.diskStorage({
    destination: (_, __, cb) => cb(null, 'uploads/'),
    filename: (_, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage, limits: { fileSize: 2 * 1024 * 1024 } });

// GET all
router.get("/", (_, res) => {
    db.query("SELECT * FROM voitures", (err, result) =>
        err ? res.status(500).send(err) : res.json(result)
    );
});

// GET one
router.get("/:id", (req, res) => {
    db.query("SELECT * FROM voitures WHERE id = ?", [req.params.id], (err, result) =>
        err ? res.status(500).send(err) :
        result.length === 0 ? res.status(404).json({ message: "Voiture non trouvée" }) :
        res.json(result[0])
    );
});

// POST create
router.post("/", upload.single("image"), (req, res) => {
    const { marque, modele, annee, prix_par_jour, disponible } = req.body;
    const dispo = disponible === 'true' || disponible === true ? 1 : 0;
    const sql = `INSERT INTO voitures (marque, modele, annee, prix_par_jour, disponible, image_url) VALUES (?, ?, ?, ?, ?, ?)`;
    db.query(sql, [marque, modele, annee, prix_par_jour, dispo, req.file.filename], (err) =>
        err ? res.status(500).json({ error: "Erreur serveur interne" }) :
        res.status(201).json({ message: "Voiture ajoutée" })
    );
});

// PUT update avec gestion image optionnelle
router.put("/:id", upload.single("image"), (req, res) => {
    const { marque, modele, annee, prix_par_jour, disponible } = req.body;
    const dispoInt = disponible === true || disponible === 'true' ? 1 : 0;

    // Construire la requête SQL dynamiquement selon s'il y a une image
    let sql = "UPDATE voitures SET marque = ?, modele = ?, annee = ?, prix_par_jour = ?, disponible = ?";
    const params = [marque, modele, annee, prix_par_jour, dispoInt];

    if (req.file) {
        sql += ", image_url = ?";
        params.push(req.file.filename);
    }

    sql += " WHERE id = ?";
    params.push(req.params.id);

    db.query(sql, params, (err, result) => {
        if (err) {
            console.error("Erreur lors de la mise à jour de la voiture:", err);
            return res.status(500).json({ message: "Erreur serveur lors de la mise à jour" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Voiture non trouvée" });
        }
        res.json({ message: "Voiture mise à jour avec succès" });
    });
});

// DELETE
router.delete("/:id", (req, res) => {
    db.query("DELETE FROM voitures WHERE id = ?", [req.params.id], err =>
        err ? res.status(500).send(err) : res.json({ message: "Voiture supprimée" })
    );
});

module.exports = router;

const express = require("express");
const router = express.Router();
const db = require("../data/db");

// POST /reservations
router.post("/", (req, res) => {
    const { voiture_id, user_id, date_debut, date_fin } = req.body;

    if (!voiture_id || !user_id || !date_debut || !date_fin) {
        return res.status(400).json({ message: "Champs requis manquants." });
    }

    const sql = `
    INSERT INTO reservations (voiture_id, user_id,  date_debut, date_fin)
    VALUES (?, ?, ?, ?)
  `;

    db.query(sql, [voiture_id, user_id, date_debut, date_fin], (err, result) => {
        if (err) {
            console.error("Erreur de la réservation :", err);
            return res.status(500).json({ message: "Erreur serveur." });
        }
        res.status(201).json({ message: "Réservation réussie", id: result.insertId });
    });
});
// GET all
router.get("/", (_, res) => {
    const sql = `SELECT 
        u.nom AS nom,
        u.prenom AS prenom,
        c.*,
        r.date_debut,
        r.date_fin
    FROM reservations r
    JOIN users u ON r.user_id = u.id
    JOIN voitures c ON r.voiture_id = c.id`;
    
    db.query(sql, (err, results) =>
        err ? res.status(500).send(err) : res.json(results)
    );
});



// GET one
router.get("/:id", (req, res) => {
    db.query("SELECT * FROM reservations WHERE id = ?", [req.params.id], (err, results) =>
        err ? res.status(500).send(err) :
            results.length === 0 ? res.status(404).send("Réservation non trouvée") :
                res.json(results[0])
    );
});

// PUT update
router.put("/:id", (req, res) => {
    const { date_debut, date_fin, statut, montant_total } = req.body;
    db.query(
        "UPDATE reservations SET date_debut=?, date_fin=?, statut=?, montant_total=? WHERE id=?",
        [date_debut, date_fin, statut, montant_total, req.params.id],
        err => err ? res.status(500).send(err) : res.json({ message: "Réservation mise à jour" })
    );
});

// PUT statut seulement
router.put("/:id/statut", (req, res) => {
    const { statut } = req.body;
    const statutsValides = ["acceptée", "rejetée", "en attente"];

    if (!statutsValides.includes(statut)) return res.status(400).json({ message: "Statut invalide" });

    db.query("UPDATE reservations SET statut = ? WHERE id = ?", [statut, req.params.id], (err) => {
        if (err) return res.status(500).send(err);

        if (statut === "acceptée") {
            db.query("SELECT voiture_id FROM reservations WHERE id = ?", [req.params.id], (err, results) => {
                if (err || results.length === 0) return res.status(500).send("Erreur sur la voiture");
                const voitureId = results[0].voiture_id;
                db.query("UPDATE voitures SET disponible = 0 WHERE id = ?", [voitureId], (err) =>
                    err ? res.status(500).send("Statut modifié mais erreur voiture") :
                        res.json({ message: "Réservation acceptée, voiture indisponible" })
                );
            });
        } else {
            res.json({ message: `Statut mis à jour en '${statut}'` });
        }
    });
});

// DELETE
router.delete("/:id", (req, res) => {
    db.query("DELETE FROM reservations WHERE id = ?", [req.params.id], err =>
        err ? res.status(500).send(err) : res.json({ message: "Réservation supprimée" })
    );
});

module.exports = router;


// router.get("/", (_, res) => {
//     const sql = `SELECT 
//     u.nom AS nom,
//     u.prenom AS prenom,
//     c.*,
//     r.date_debut,
//     r.date_fin
// FROM reservation 
// JOIN user u ON reservation.user_id = u.id
// JOIN voiture c ON rreservation.voiture_id = c.id;
// `
//     db.query("SELECT * FROM reservations", (err, results) =>
//         err ? res.status(500).send(err) : res.json(results)
//     );
// });

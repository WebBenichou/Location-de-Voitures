const express = require("express");
const router = express.Router();
const db = require("../data/db");

// POST create
// router.post("/", (req, res) => {
//     const { user_id, voiture_id, date_debut, date_fin, montant_total } = req.body;
//     db.query(
//         "INSERT INTO reservations (user_id, voiture_id, date_debut, date_fin, montant_total) VALUES (?, ?, ?, ?, ?)",
//         [user_id, voiture_id, date_debut, date_fin, montant_total],
//         (err, result) =>
//             err ? res.status(500).send(err) : res.status(201).json({ message: "Réservation créée", reservationId: result.insertId })
//     );
// });
// POST /reservations
router.post("/", (req, res) => {
  const { voiture_id, nom, email, telephone, date_debut, date_fin } = req.body;

  if (!voiture_id || !nom || !telephone || !date_debut || !date_fin) {
    return res.status(400).json({ message: "Champs requis manquants." });
  }

  const sql = `
    INSERT INTO reservations (voiture_id, nom, email, telephone, date_debut, date_fin)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [voiture_id, nom, email, telephone, date_debut, date_fin], (err, result) => {
    if (err) {
      console.error("Erreur lors de la réservation :", err);
      return res.status(500).json({ message: "Erreur serveur." });
    }
    res.status(201).json({ message: "Réservation réussie", id: result.insertId });
  });
});
// GET all
router.get("/", (_, res) => {
    db.query("SELECT * FROM reservations", (err, results) =>
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

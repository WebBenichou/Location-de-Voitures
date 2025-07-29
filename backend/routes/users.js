const express = require("express");
const router = express.Router();
const db = require("../data/db");
const bcrypt = require("bcrypt");

// GET all
router.get("/", (_, res) => {
    db.query("SELECT id, nom, prenom, telephone, email, role, date_inscription FROM users", (err, rows) =>
        err ? res.status(500).json(err) : res.json(rows)
    );
});

// GET one
router.get("/:id", (req, res) => {
    db.query("SELECT id, nom, prenom, telephone, email, role, date_inscription FROM users WHERE id = ?", [req.params.id], (err, rows) =>
        err ? res.status(500).json(err) :
        rows.length === 0 ? res.status(404).json({ message: "Utilisateur non trouvé" }) :
        res.json(rows[0])
    );
});

// POST create
router.post("/", (req, res) => {
    const { nom, prenom, telephone, email, mot_de_passe, role } = req.body;
    bcrypt.hash(mot_de_passe, 10, (err, hash) => {
        if (err) return res.status(500).send(err);
        db.query(
            "INSERT INTO users (nom, prenom, telephone, email, mot_de_passe, role) VALUES (?, ?, ?, ?, ?, ?)",
            [nom, prenom, telephone, email, hash, role],
            err => err ? res.status(500).send(err) : res.status(201).json({ message: "Utilisateur ajouté" })
        );
    });
});

// PUT update
router.put("/:id", async (req, res) => {
    try {
        const { nom, prenom, telephone, email, mot_de_passe, role } = req.body;
        let sql = "UPDATE users SET nom=?, prenom=?, telephone=?, email=?, role=?";
        const params = [nom, prenom, telephone, email, role];

        if (mot_de_passe) {
            const hash = await bcrypt.hash(mot_de_passe, 10);
            sql += ", mot_de_passe=?";
            params.push(hash);
        }

        sql += " WHERE id=?";
        params.push(req.params.id);

        db.query(sql, params, err => err ? res.status(500).json(err) : res.json({ message: "Utilisateur mis à jour" }));
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// DELETE
router.delete("/:id", (req, res) => {
    db.query("DELETE FROM users WHERE id = ?", [req.params.id], err =>
        err ? res.status(500).json(err) : res.json({ message: "Utilisateur supprimé" })
    );
});

module.exports = router;

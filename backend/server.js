const express = require("express");
const cors = require("cors");
const db = require('./data/db');
const bcrypt = require('bcrypt');
const identificationRoutes = require("./routes/identification");

const app = express();
const PORT = 9000;

// Middlewares
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

db.connect((err) => {
    if (err) {
        console.error("Erreur de connexion à la base de données :", err);
        return;
    }
    console.log(" Connecté à la base de données MySQL");
});
app.get('/', (req, res) => {
    res.send(' API de location de voitures opérationnelle');
});
app.use("/identification", identificationRoutes);


/*  VOITURES  */

// GET toutes les voitures
app.get("/voitures", (req, res) => {
    db.query("SELECT * FROM voitures", (err, result) => {
        if (err) return res.status(500).send(err);
        res.json(result);
    });
});
// GET- voiture ID
app.get("/voitures/:id", (req, res) => {
    const voitureId = req.params.id;

    const sql = "SELECT * FROM voitures WHERE id = ?";
    db.query(sql, [voitureId], (err, result) => {
        if (err) return res.status(500).send(err);

        if (result.length === 0) {
            return res.status(404).json({ message: "Voiture non trouvée" });
        }
        res.json(result[0]); // une seule voiture
    });
});

// POST ajouter une voiture
app.post("/voitures", (req, res) => {
    const { marque, modele, annee, prix_par_jour, disponible } = req.body;
    const sql = `INSERT INTO voitures (marque, modele, annee, prix_par_jour, disponible) VALUES (?, ?, ?, ?, ?)`;
    db.query(sql, [marque, modele, annee, prix_par_jour, disponible], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(201).json({ message: "Voiture ajoutée avec succès" });
    });
});

// PUT modifier une voiture
app.put("/voitures/:id", (req, res) => {
    const { id } = req.params;
    const { marque, modele, annee, prix_par_jour, disponible } = req.body;
    const sql = `UPDATE voitures SET marque = ?, modele = ?, annee = ?, prix_par_jour = ?, disponible = ? WHERE id = ?`;
    db.query(sql, [marque, modele, annee, prix_par_jour, disponible, id], (err) => {
        if (err) return res.status(500).send(err);
        res.json({ message: "Voiture mise à jour avec succès" });
    });
});

// DELETE voiture
app.delete("/voitures/:id", (req, res) => {
    db.query("DELETE FROM voitures WHERE id = ?", [req.params.id], (err) => {
        if (err) return res.status(500).send(err);
        res.json({ message: "Voiture supprimée avec succès" });
    });
});


/*   USERS   */

// GET - Tous les utilisateurs (sans mot de passe)
app.get('/users', (req, res) => {
    const sql = 'SELECT id, nom, prenom, telephone, email, role, date_inscription FROM users';
    db.query(sql, (err, rows) => {
        if (err) return res.status(500).json(err);
        res.json(rows);
    });
});

// GET - Un utilisateur par ID
app.get('/users/:id', (req, res) => {
    const sql = 'SELECT id, nom, prenom, telephone, email, role, date_inscription FROM users WHERE id = ?';
    db.query(sql, [req.params.id], (err, rows) => {
        if (err) return res.status(500).json(err);
        if (rows.length === 0) return res.status(404).json({ message: 'Utilisateur non trouvé' });
        res.json(rows[0]);
    });
});

// POST - Ajouter un utilisateur
app.post("/users", (req, res) => {
    const { nom, prenom, telephone, email, mot_de_passe, role } = req.body;

    bcrypt.hash(mot_de_passe, 10, (err, hashedPassword) => {
        if (err) return res.status(500).send(err);

        const sql = `INSERT INTO users (nom, prenom, telephone, email, mot_de_passe, role) VALUES (?, ?, ?, ?, ?, ?)`;
        db.query(sql, [nom, prenom, telephone, email, hashedPassword, role], (err) => {
            if (err) return res.status(500).send(err);
            res.status(201).json({ message: "Utilisateur ajouté avec succès" });
        });
    });
});

// PUT - Modifier un utilisateur
app.put('/users/:id', async (req, res) => {
    try {
        const { nom, prenom, telephone, email, mot_de_passe, role } = req.body;
        let sql = 'UPDATE users SET nom = ?, prenom = ?, telephone = ?, email = ?, role = ?';
        const params = [nom, prenom, telephone, email, role];

        if (mot_de_passe) {
            const hashedPassword = await bcrypt.hash(mot_de_passe, 10);
            sql += ', mot_de_passe = ?';
            params.push(hashedPassword);
        }

        sql += ' WHERE id = ?';
        params.push(req.params.id);

        db.query(sql, params, (err) => {
            if (err) return res.status(500).json(err);
            res.json({ message: 'Utilisateur mis à jour' });
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE - Supprimer un utilisateur
app.delete('/users/:id', (req, res) => {
    const sql = 'DELETE FROM users WHERE id = ?';
    db.query(sql, [req.params.id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: 'Utilisateur supprimé' });
    });
});


/*  RESERVATIONS */


// POST - Créer une réservation
app.post('/reservations', (req, res) => {
    const { user_id, voiture_id, date_debut, date_fin, montant_total } = req.body;
    const sql = `INSERT INTO reservations (user_id, voiture_id, date_debut, date_fin, montant_total) VALUES (?, ?, ?, ?, ?)`;
    db.query(sql, [user_id, voiture_id, date_debut, date_fin, montant_total], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(201).json({ message: 'Réservation créée', reservationId: result.insertId });
    });
});

// GET - Lister toutes les réservations
app.get('/reservations', (req, res) => {
    db.query('SELECT * FROM reservations', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// GET - Réservation par ID
app.get('/reservations/:id', (req, res) => {
    db.query('SELECT * FROM reservations WHERE id = ?', [req.params.id], (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0) return res.status(404).send('Réservation non trouvée');
        res.json(results[0]);
    });
});

// PUT - Modifier une réservation
app.put('/reservations/:id', (req, res) => {
    const { date_debut, date_fin, statut, montant_total } = req.body;
    const sql = `
        UPDATE reservations 
        SET date_debut = ?, date_fin = ?, statut = ?, montant_total = ?
        WHERE id = ?
    `;
    db.query(sql, [date_debut, date_fin, statut, montant_total, req.params.id], (err) => {
        if (err) return res.status(500).send(err);
        res.json({ message: 'Réservation mise à jour' });
    });
});

// DELETE - Supprimer une réservation
app.delete('/reservations/:id', (req, res) => {
    db.query('DELETE FROM reservations WHERE id = ?', [req.params.id], (err) => {
        if (err) return res.status(500).send(err);
        res.json({ message: 'Réservation supprimée' });
    });
});



// Lancer le serveur
app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});

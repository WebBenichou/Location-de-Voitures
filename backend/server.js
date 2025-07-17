const express = require("express");
const cors = require("cors");
const db = require('./data/db')
const bcrypt = require('bcrypt');


const app = express();
const PORT = 9000;

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

/*   VOITURE   */

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

/*  USERS   */

// GET- Lire tous les utilisateurs (sans mot_de_passe)
app.get('/users', (req, res) => {
    const sql = 'SELECT id, nom, prenom, email, role, date_inscription FROM users';
    db.query(sql, (err, rows) => {
        if (err) return res.status(500).json(err);
        res.json(rows);
    });
});
//  Lire un utilisateur par ID
app.get('/users/:id', (req, res) => {
    const sql = 'SELECT id, nom, prenom, email, role, date_inscription FROM users WHERE id = ?';
    db.query(sql, [req.params.id], (err, rows) => {
        if (err) return res.status(500).json(err);
        if (rows.length === 0) return res.status(404).json({ message: 'Utilisateur non trouvé' });
        res.json(rows[0]);
    });
});

// POST- Créer un utilisateur
app.post("/users", (req, res) => {
    const { nom, prenom, email, mot_de_passe, role } = req.body;

    // Hash the password before saving to DB
    bcrypt.hash(mot_de_passe, 10, (err, hashedPassword, result) => {
        if (err) return res.status(500).send(err, result);

        db.query(
            "INSERT INTO users (nom, prenom, email, mot_de_passe, role) VALUES (?, ?, ?, ?, ?)",
            [nom, prenom, email, hashedPassword, role],
            (err, result) => {
                if (err) return res.status(500).send(err);
                res.status(201).json({ message: "Utilisateur ajouté avec succès" });
            }
        );
    });
});

// PUT- Modifier un utilisateur
app.put('/users/:id', async (req, res) => {
    try {
        const { nom, prenom, email, mot_de_passe, role } = req.body;

        let sql = 'UPDATE users SET nom = ?, prenom = ?, email = ?, role = ?';
        const params = [nom, prenom, email, role];

        if (mot_de_passe) {
            const hashedPassword = await bcrypt.hash(mot_de_passe, 10);
            sql += ', mot_de_passe = ?';
            params.push(hashedPassword);
        }

        sql += ' WHERE id = ?';
        params.push(req.params.id);

        db.query(sql, params, (err, result) => {
            if (err) return res.status(500).json(err);
            res.json({ message: 'Utilisateur mis à jour' });
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELET- Supprimer un utilisateur
app.delete('/users/:id', (req, res) => {
    const sql = 'DELETE FROM users WHERE id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: 'Utilisateur supprimé' });
    });
});

/*  RESERVATION */

// POST- Créer une réservation

app.post('/reservations', (req, res) => {
    const { user_id, voiture_id, date_debut, date_fin, montant_total } = req.body;

    const sql = `INSERT INTO reservations (user_id, voiture_id, date_debut, date_fin, montant_total) VALUES (?, ?, ?, ?, ?)`;

    db.query(sql, [user_id, voiture_id, date_debut, date_fin, montant_total], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(201).json({ message: 'Réservation créée', reservationId: result.insertId });
    });
}); 


// GET- Lister toutes les réservations
app.get('/reservations', (req, res) => {
    db.query('SELECT * FROM reservations', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

//Obtenir une réservation par ID
app.get('/reservations/:id', (req, res) => {
    db.query('SELECT * FROM reservations WHERE id = ?', [req.params.id], (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0) return res.status(404).send('Réservation non trouvée');
        res.json(results[0]);
    });
});

// PUT- Mettre à jour une réservation
app.put('/reservations/:id', (req, res) => {
    const { date_debut, date_fin, statut, montant_total } = req.body;
    const sql = `
    UPDATE reservations 
    SET date_debut = ?, date_fin = ?, statut = ?, montant_total = ?
    WHERE id = ?
  `;

    db.query(sql, [date_debut, date_fin, statut, montant_total, req.params.id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ message: 'Réservation mise à jour' });
    });
});

// DELETE- Supprimer une réservation
app.delete('/reservations/:id', (req, res) => {
    db.query('DELETE FROM reservations WHERE id = ?', [req.params.id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ message: 'Réservation supprimée' });
    });
});


// Démarrer le serveur
app.listen(PORT, () => {
    console.log('Serveur lancé sur http://localhost:' + PORT);
});

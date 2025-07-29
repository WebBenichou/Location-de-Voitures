const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./data/db"); 

// Importation des routes
const voituresRoutes = require("./routes/voitures");
const usersRoutes = require("./routes/users");
const reservationsRoutes = require("./routes/reservations");
const identificationRoutes = require("./routes/identification");
const image_urlRoutes = require("./routes/images_url");

const app = express();
const PORT = 9000;

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json());

// images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// MYSQL
db.connect((err) => {
  if (err) {
    console.error(" Erreur de connexion à MySQL :", err);
    return;
  }
  console.log(" Connecté à la base de données MySQL");
});

// Routes principales

app.use("/voitures", voituresRoutes);
app.use("/users", usersRoutes);
app.use("/reservations", reservationsRoutes);
app.use("/identification", identificationRoutes);
app.use("/images_url", image_urlRoutes);


app.get("/", (_, res) => {
  res.send("API de location de voitures opérationnelle");
});

app.use((err, req, res, next) => {
  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(413).json({ error: "Fichier trop volumineux (max: 5 Mo)" });
  }
  console.error("Erreur serveur :", err);
  res.status(500).json({ error: "Erreur serveur interne" });
});




// Lancement du serveur
app.listen(PORT, () => {
  console.log(` Serveur lancé sur : http://localhost:${PORT}`);
});

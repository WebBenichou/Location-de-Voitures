import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import VoituresList from "./components/VoituresList";
import VoitureForm from "./components/VoitureForm";
import NavBar from "./components/NavBar";
import Accueil from "./pages/Accueil";
import APropos from "./pages/APropos";
import Contact from "./pages/Contact";
import Reservation from "./pages/Reservation";
import Login from "./componanets/Login";
import AdminPage from "./pages/AdminPage";
import UserPage from "./pages/UserPage";

function App() {
  const [voitures, setVoitures] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:9000/voitures")
      .then((res) => setVoitures(res.data))
      .catch((err) => {
        console.error(err);
        setError("Erreur de chargement des voitures");
      });
  }, []);


  return (
    <Router>
      <NavBar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Accueil voitures={voitures} />} />
          <Route path="/apropos" element={<APropos />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/reservation" element={<Reservation voitures={voitures} />} />
          <Route path="/admin/voitures" element={<VoituresList voitures={voitures} />} />
          <Route path="/admin/ajouter" element={<VoitureForm />} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/admin" element={<AdminPage/>}/>
          <Route path="/user" element={<UserPage/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
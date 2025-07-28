import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import NavBar from './components/NavBar';
import Accueil from "./pages/Accueil";
import APropos from "./pages/APropos";
import Contact from "./pages/Contact";
import Reservation from "./pages/reservation";
import VoituresList from "./components/VoituresList";
import VoitureForm from "./components/VoitureForm";
import Login from "./components/Login";
import AdminPage from "./pages/AdminPage";
import UserPage from "./pages/UserPage";
import Footer from "./components/Footer";
import Voitures from "./pages/Voitures";
import Register from "./pages/Register";
import AjouteVoiture from "./pages/AjouteVoiture";
import ModifierVoiture from "./pages/ModifierVoiture";



function App() {
  const [voitures, setVoitures] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:9000/voitures")
      .then((res) => setVoitures(res.data))
      .catch((err) => {
        console.error(err);
        setError("Erreur de chargement des voitures");
      });
  }, []);


  return (
    <>
      <NavBar />
      <div className="container mt-4">
        {error && <div className="alert alert-danger">{error}</div>}
        <Routes>
          <Route path="/" element={<Accueil voitures={voitures} />} />
          <Route path="/voitures" element={<Voitures voitures={voitures} />} />
          <Route path="/apropos" element={<APropos />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/reservation" element={<Reservation voitures={voitures} />} />
          <Route path="/admin/voitures" element={<VoituresList voitures={voitures} />} />
          <Route path="/voitures/:id" element={<VoitureForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/ajoute" element={<AjouteVoiture />} />
          <Route path="/modifier/:id" element={<ModifierVoiture />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}



export default App;

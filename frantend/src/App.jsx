import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import VoituresList from "./components/voituresList";
import VoitureForm from "./components/voitureForm";
import NavBar from "./componanets/NavBar";

function App() {
  const [voitures, setVoitures] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:9000/voitures")
      .then((res) => setVoitures(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <Router>
      <h2>Bienvenue sur AutoLoc !</h2>
    <NavBar/>
      <Routes>
        <Route path="/" element={<></>} />
        <Route path="/ajouter" element={<VoitureForm />} />
        <Route path="/voitures" element={<VoituresList voitures={voitures} />} />
      </Routes>
    </Router>
  );
}

export default App;

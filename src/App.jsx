import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PokemonList from "./components/PokemonList.jsx";
import PokemonDetailsPage from "./components/PokemonDetailsPage.jsx";


function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<PokemonList />} exact />
          <Route path="/pokemon/:id" element={<PokemonDetailsPage />} />
        </Routes>
      </Router>
  );
}

export default App

import FavoriteMovies from "@/pages/FavoriteMovies.jsx";
import Home from "@/pages/Home.jsx";
import MoviePage from "@/pages/MoviePage.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MoviePage />} />
        <Route path="/favorite-movies" element={<FavoriteMovies />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

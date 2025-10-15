import "./App.css";
import "./index.css";
import Home from "@/pages/Home.jsx";
import MoviePage from "@/pages/MoviePage.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MoviePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

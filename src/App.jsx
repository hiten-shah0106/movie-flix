import Home from "./pages/Home.jsx";
import Favs from "./pages/Favs.jsx";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import "./css/App.css";
import { MovieProvider } from "./contexts/MovieContext.jsx";
function App() {
    return (
        <MovieProvider>
            <Navbar />
            <main className="main-content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/favs" element={<Favs />} />
                </Routes>
            </main>
        </MovieProvider>
    );
}

export default App;

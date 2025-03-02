import { Routes, Route } from "react-router-dom";
import { MovieProvider } from "./contexts/MovieContext.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home.jsx";
import Favs from "./pages/Favs.jsx";
import MoviePage from "./pages/MoviePage.jsx";
import Navbar from "./components/Navbar.jsx";
import "./css/App.css";

const App = () => {
    return (
        <MovieProvider>
            <ToastContainer position="top-right" autoClose={2000} />
            <Navbar />
            <main className="main-content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/favs" element={<Favs />} />
                    <Route
                        path="/movie/:movieId/:movieName"
                        element={<MoviePage />}
                    />
                </Routes>
            </main>
        </MovieProvider>
    );
};

export default App;

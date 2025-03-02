import { createContext, useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
    const [favs, setFavs] = useState([]);

    useEffect(() => {
        const storedFavs = localStorage.getItem("favorites");
        if (storedFavs) setFavs(JSON.parse(storedFavs));
    }, []);

    useEffect(() => {
        if (favs.length > 0) {
            localStorage.setItem("favorites", JSON.stringify(favs));
        }
    }, [favs]);

    const addToFavorites = (movie) => {
        if (!isFavorite(movie.id)) {
            setFavs((prev) => [...prev, movie]);
            toast.success("Movie Added To Favs! ");
        }
    };

    const removeFromFavorites = (movieId) => {
        setFavs((prev) => prev.filter((movie) => movie.id !== movieId));
        toast.error("Movie Removed From Favs! ");
    };

    const isFavorite = (movieId) => {
        return favs.some((movie) => movie.id === movieId);
    };

    const value = {
        favs,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
    };

    return (
        <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
    );
};

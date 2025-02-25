import { createContext, useState, useContext, useEffect } from "react";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
    const [favs, setFavs] = useState([]);

    useEffect(() => {
        const storedFavs = localStorage.getItem("favorites");
        if (storedFavs) setFavs(JSON.parse(storedFavs));
    }, []);

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favs));
    }, [favs]);

    const addToFavorites = (movie) => {
        setFavs((prev) => [...prev, movie]);
    };

    const removeFromFavorites = (movieId) => {
        setFavs((prev) => prev.filter((movie) => movie.id !== movieId));
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

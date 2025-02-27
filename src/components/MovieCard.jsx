import { useState } from "react";
import { useMovieContext } from "../contexts/MovieContext";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
    const { isFavorite, addToFavorites, removeFromFavorites } =
        useMovieContext();

    const favorite = isFavorite(movie.id);
    function favToggle(e) {
        e.preventDefault();
        if (favorite) removeFromFavorites(movie.id);
        else addToFavorites(movie);
    }

    return (
        <Link to={`/movie/${movie.id}/${movie.title.split(" ").join("-")}`}>
            <div className="mt-8 text-black relative rounded-lg overflow-hidden bg-[#E9B44C] transition-transform duration-200 h-[400px] w-[200px] flex flex-col hover:translate-y-[-5px]">
                {/* Movie Poster */}
                <div className="relative aspect-[8/10] w-full">
                    <img
                        className="w-auto h-full object-fill"
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.name}
                    />

                    {/* Overlay */}
                    <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-[rgba(0,0,0,0.1)] to-[rgba(0,0,0,0.8)] opacity-0 transition-opacity duration-200 flex flex-col justify-end p-4 hover:opacity-100">
                        {/* Favorite Button */}
                        <button
                            className={`absolute top-4 right-4 text-2xl p-2 bg-black bg-opacity-50 rounded-full w-8 h-8 flex items-center justify-center transition-colors duration-200 hover:bg-opacity-80 ${
                                favorite ? "text-[#ff4757]" : "text-white"
                            }`}
                            onClick={favToggle}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-10 h-10"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Movie Info */}
                <div className="px-4 py-2 flex-1 flex flex-col gap-2 my-3 marquee-hover">
                    <div className="relative w-full overflow-hidden whitespace-nowrap">
                        <h3 className="text-lg font-semibold truncate">
                            {movie.title}
                        </h3>
                    </div>
                    <p className="text-black text-sm">
                        {movie.release_date?.split("-")[0]}
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default MovieCard;

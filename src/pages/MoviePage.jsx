import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieById } from "../services/api";
import { useMovieContext } from "../contexts/MovieContext";

const MoviePage = () => {
    const { movieId } = useParams();
    const [movie, setMovie] = useState({});
    const [loading, setLoading] = useState(true);
    const { isFavorite, addToFavorites, removeFromFavorites } =
        useMovieContext();

    const favorite = isFavorite(movie.id);

    function favToggle(e) {
        e.preventDefault();
        if (favorite) removeFromFavorites(movie.id);
        else addToFavorites(movie);
    }

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const data = await getMovieById(movieId);
                setMovie(data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };
        fetchMovie();
    }, [movieId]);

    if (loading) return <h1 className="text-center text-3xl">Loading...</h1>;

    return (
        <div className="movie-page p-8 text-black min-h-screen bg-[#E9B44C] flex flex-col items-center gap-10">
            <h1 className="text-4xl font-bold text-center text-[#1C110A] uppercase tracking-wide">
                {movie.title}
            </h1>
            <div className="w-[250px] shadow-lg rounded-lg overflow-hidden border-4 border-[#1C110A]">
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full object-cover"
                />
            </div>{" "}
            <button
                className={` text-2xl p-2 bg-black bg-opacity-50 rounded-full w-8 h-8 flex items-center justify-center transition-colors duration-200 hover:bg-opacity-80 ${
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[120px] w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg">
                <div>
                    <h2 className="text-2xl font-semibold text-[#1C110A] mb-4">
                        Overview
                    </h2>
                    <p className="text-lg text-[#3D3D3D] leading-relaxed">
                        {movie.overview}
                    </p>
                </div>

                <div className="flex flex-col gap-4 justify-center">
                    <div>
                        <span className="font-semibold text-lg text-[#1C110A]">
                            Release Date:
                        </span>
                        <span className="ml-2 text-lg text-[#3D3D3D]">
                            {movie.release_date}
                        </span>
                    </div>
                    <div>
                        <span className="font-semibold text-lg text-[#1C110A]">
                            Rating:
                        </span>
                        <span className="ml-2 text-lg text-[#3D3D3D]">
                            ⭐ {movie.vote_average}/10
                        </span>
                    </div>
                    <div>
                        <span className="font-semibold text-lg text-[#1C110A]">
                            Language:
                        </span>
                        <span className="ml-2 text-lg text-[#3D3D3D]">
                            {movie.original_language.toUpperCase()}
                        </span>
                    </div>
                </div>
            </div>
            <button
                onClick={() => window.history.back()}
                className="bg-[#1C110A] text-white px-6 py-3 rounded-lg hover:bg-[#3D3D3D] transition-all duration-300"
            >
                ⬅ Go Back
            </button>
        </div>
    );
};

export default MoviePage;

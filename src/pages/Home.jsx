import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard.jsx";
import { getPopularMovies, searchMovies } from "../services/api.js";

const Home = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies();
                setMovies(popularMovies);
            } catch (err) {
                console.log(err);
                setError("Failed to load movies...");
            } finally {
                setLoading(false);
            }
        };

        loadPopularMovies();
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) {
            return;
        }
        if (loading) return;
        setLoading(true);
        try {
            const searchResults = await searchMovies(searchQuery);
            setMovies(searchResults);
            setError(null);
        } catch (err) {
            console.log(err);
            setError("Failed to search Movies...");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <form
                onSubmit={handleSearch}
                className="search-form flex gap-6 justify-center"
            >
                <input
                    type="text"
                    placeholder="Search Movie"
                    className="search-input  px-4 py-2 w-[70%] bg-[#E9B44C] text-black font-semi outline-none rounded-md placeholder:text-gray-700"
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                    }}
                />
                <button
                    type="submit"
                    className="serach-btn bg-[#1C110A] text-white px-4 py-2 rounded-md border-none"
                >
                    Search
                </button>
            </form>

            {error && (
                <div className="">
                    {error}
                    An Error Occured.. Please Try Again Later...{" "}
                </div>
            )}

            {loading ? (
                <p className="mx-auto my-[100px] text-3xl font-bold">
                    {" "}
                    Loading....{" "}
                </p>
            ) : (
                <div className="movies-grid flex gap-10 flex-wrap">
                    {movies.map((film) => (
                        <MovieCard movie={film} key={film.id} />
                    ))}
                </div>
            )}
        </>
    );
};

export default Home;

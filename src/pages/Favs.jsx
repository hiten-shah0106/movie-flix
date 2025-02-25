import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";

function Favs() {
    const { favs } = useMovieContext();
    if (favs.length > 0) {
        return (
            <div>
                <h2 className="text-3xl font-extrabold">Your Favorites</h2>
                <hr className="mt-4 border border-[#1C110A]" />
                <div className="movies-grid flex gap-10 flex-wrap">
                    {favs.map((film) => (
                        <MovieCard movie={film} key={film.id} />
                    ))}
                </div>
            </div>
        );
    }
    return (
        <>
            <div className="fav-empty text-white bg-[#E9B44C] flex flex-col justify-center items-center p-10 rounded-lg my-10">
                <h2 className="text-3xl font-bold text-[#1C110A]">
                    No Favs Movie Yet
                </h2>
                <h4 className="text-lg font-bold my-3">
                    Start adding favs to show them here...
                </h4>
            </div>
        </>
    );
}

export default Favs;

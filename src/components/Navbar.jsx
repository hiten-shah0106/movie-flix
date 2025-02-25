import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar flex bg-[#1C110A] h-12 text-white items-center justify-between">
            <div className="navbar-brand text-[23px] p-5 font-bold mx-5">
                <Link to="/"> MovieFlix </Link>
            </div>
            <div className="navbar-links p-5 font-semibold flex gap-10 text-[17px] mx-5">
                <Link to="/" className="nav-link  hover:text-blue-500">
                    {" "}
                    Home{" "}
                </Link>
                <Link to="/favs" className="nav-link  hover:text-blue-500">
                    {" "}
                    Favorites{" "}
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;

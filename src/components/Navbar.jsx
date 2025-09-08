import { useNavigate } from "react-router";
import Searchbar from "./Searchbar";
import { useSelector } from "react-redux";

const Navbar = () => {
  const navigate = useNavigate();

  const { isLoggedIn } = useSelector((state) => state.auth);
  return (
    <nav className="bg-white shadow shadow-md sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <span
              onClick={() => navigate("/")}
              className="text-xl font-bold cursor-pointer text-blue-700 tracking-wide"
            >
              E-comm
            </span>
          </div>
          <div className="flex-1 flex justify-center">
            <Searchbar />
          </div>
          <div className="flex items-center gap-4">
            <a
              href="#"
              onClick={() => navigate("/")}
              className="text-gray-700 hover:text-blue-600 px-2"
            >
              Home
            </a>
            <a
              href="#"
              onClick={() => navigate("/cart")}
              className="text-gray-700 hover:text-blue-600 px-2"
            >
              Cart
            </a>
            {isLoggedIn ? (
              ""
            ) : (
              <button
                onClick={() => navigate("/auth")}
                className="ml-4 px-4 py-2 rounded border border-blue-600 text-blue-600 hover:bg-blue-50 transition"
              >
                Login
              </button>
            )}
            <button className="ml-2 px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition">
              Become a Seller
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

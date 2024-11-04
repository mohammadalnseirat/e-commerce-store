import { Link } from "react-router-dom";
import {
  ShoppingCart,
  UserPlus,
  Lock,
  LogIn,
  LogOut,
  Home,
  Loader,
} from "lucide-react";
import { useUserStore } from "../stores/useUserStore";

const Navbar = () => {
  const { user, logOut, loading } = useUserStore();
  const isAdmin = user?.role === "admin";
  return (
    <header className="fixed top-0 left-0 bg-gray-900 bg-opacity-80 w-full backdrop-blur-md shadow-lg z-40 transition-all duration-300 border-b border-b-emerald-500 ">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-wrap items-center justify-between">
          <Link
            to={"/"}
            className="text-2xl font-bold text-emerald-400 flex items-center space-x-2"
          >
            E-Commerce
          </Link>
          <nav className="flex items-center gap-4 flex-wrap">
            <Link
              to={"/"}
              className="text-gray-300 hover:text-emerald-400 transition-all duration-200 ease-in-out"
            >
              <Home />
            </Link>
            {user && (
              <Link
                to={"/cart"}
                className="relative group text-gray-300 hover:text-emerald-400 transition-all duration-200 ease-in-out"
              >
                <ShoppingCart
                  className="group-hover:text-emerald-400 inline-block mr-1"
                  size={20}
                />
                <span className="hidden sm:inline">Cart</span>
                <span className="absolute text-center -top-2 -left-2 bg-emerald-600 text-white rounded-full px-2 py-0.5 text-xs group-hover:bg-emerald-700 transition-all duration-200 ease-in-out">
                  4
                </span>
              </Link>
            )}
            {isAdmin && (
              <Link
                to={"/secret-dashboard"}
                className="text-gray-100 bg-emerald-700 hover:bg-emerald-800 px-3 py-1 font-medium rounded-md transition-all duration-200 ease-in-out flex items-center"
              >
                <Lock className="inline-block mr-1" size={20} />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
            )}
            {user ? (
              <button
                className="flex items-center py-2 px-4 rounded-md text-gray-100 bg-red-600 hover:bg-red-800 transition-all duration-200 ease-in-out"
                onClick={logOut}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader
                      className="mr-2 w-5 h-5 animate-spin"
                      aria-hidden="true"
                    />
                    <span className="ml-2">Logging Out...</span>
                  </>
                ) : (
                  <>
                    <LogOut className="inline-block mr-2" size={20} />
                    <span className="hidden sm:inline font-medium">Logout</span>
                  </>
                )}
              </button>
            ) : (
              <>
                <Link
                  to={"/sign-up"}
                  className="bg-emerald-600 hover:bg-emerald-700 text-gray-100 transition-all duration-200 ease-in-out flex items-center py-2 px-4 rounded-md"
                >
                  <UserPlus className="inline-block mr-2" size={20} />
                  <span className="hidden sm:inline">Sign Up</span>
                </Link>
                <Link
                  to={"/sign-in"}
                  className="bg-gray-100 hover:bg-emerald-600 text-emerald-600 hover:text-gray-100 transition-all duration-200 ease-in-out flex items-center py-2 px-4 rounded-md "
                >
                  <LogIn className="inline-block mr-2" size={20} />
                  <span className="hidden sm:inline">Sign In</span>
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

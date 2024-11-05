import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { logout, selectCurrentUser } from "../redux/feature/authSlice";
import { User2Icon } from "lucide-react";

const Navbar = () => {
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/signin");
  };

  return (
    <>
      <div className="navbar bg-base-100 p-7  mb-5 md:px-52">
        <div className="navbar-start ">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/cars">Cars</Link>
              </li>
              <li>
                <Link to="/cars">About u</Link>
              </li>
              <li>
                <Link to="/cars">Contact Us</Link>
              </li>
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost text-2xl font-bold">
            RideEasy
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/cars">Cars</Link>
            </li>
            <li>
              <Link to="/cars">About u</Link>
            </li>
            <li>
              <Link to="/cars">Contact Us</Link>
            </li>
          </ul>
        </div>
        {user ? (
          <>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded-md font-medium hover:bg-red-600 transition"
              onClick={handleLogout}
            >
              Logout
            </button>
            <div className="flex items-center justify-center gap-1">
              <div className="ml-2 p-3 bg-customBackground border-1 rounded-full ]">
                <User2Icon color="white" />
              </div>
              <p>{user?.name}</p>
              {user ? (
                <Link
                  to={`${user?.role}/dashboard`}
                  className="text-lg font-medium text-gray-700 hover:text-indigo-600 transition"
                >
                  Dashboard
                </Link>
              ) : null}
            </div>
          </>
        ) : (
          <Link to="/signin" className="text-lg">
            SignIn
          </Link>
        )}
      </div>
    </>
  );
};

export default Navbar;

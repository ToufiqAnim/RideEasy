import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Home, Menu } from "lucide-react";
import { verifyToken } from "../utils/verifyToken";
import { useCurrentToken } from "../redux/feature/authSlice";

import { adminPaths } from "../routes/AdminRoutes";
import { userPaths } from "../routes/UserRoutes";
import { USER_ROLE } from "../constant/UserConsatant";

const Sidebar = () => {
  const token = useSelector(useCurrentToken);
  const [isMobile, setIsMobile] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Decode the user token to get the role
  let user;
  if (token) {
    user = verifyToken(token);
  }

  // Select paths based on user role
  const sidebarItems =
    user?.role === USER_ROLE.admin
      ? adminPaths
      : user?.role === USER_ROLE.user
      ? userPaths
      : [];

  // Handle screen resize for mobile view
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Recursive function to render nested sidebar items
  const renderSidebarItems = (items) => {
    return items.map((item) => (
      <div key={item.path || item.name} className="space-y-1">
        {item.path ? (
          <Link
            to={item.path}
            className="block p-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            {item.name}
          </Link>
        ) : (
          <span className="block p-2 text-white font-semibold">
            {item.name}
          </span>
        )}
        {item.children && (
          <div className="pl-4 space-y-1">
            {renderSidebarItems(item.children)}
          </div>
        )}
      </div>
    ));
  };

  return (
    <div
      className={`h-full ${isMobile ? "absolute z-50" : "relative"} md:block`}
    >
      <div
        className={`bg-gray-800 text-white h-screen p-4 flex flex-col ${
          isMobile ? "w-64" : "w-72"
        }`}
      >
        <div className="flex items-center mb-4">
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
            <Home className="text-3xl" />
            Home
          </Link>
        </div>
        <nav className="space-y-2 flex-1 overflow-y-auto">
          {sidebarItems.length > 0 ? (
            renderSidebarItems(sidebarItems)
          ) : (
            <p className="text-gray-400">No items available</p>
          )}
        </nav>
        {/* Mobile view dropdown button */}
        {isMobile && (
          <div className="relative">
            <button
              className="btn btn-primary flex items-center gap-2"
              onClick={() => setIsDropdownOpen((prev) => !prev)}
            >
              <Menu className="text-xl" /> Menu
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg z-10">
                <ul className="py-2">
                  {sidebarItems.map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.path || "#"}
                        className="block px-4 py-2 hover:bg-gray-700 transition-colors"
                      >
                        {item.name}
                      </Link>
                      {item.children && (
                        <ul className="pl-2">
                          {item.children.map((child) => (
                            <li key={child.path}>
                              <Link
                                to={child.path || "#"}
                                className="block px-4 py-2 hover:bg-gray-700 transition-colors"
                              >
                                {child.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;

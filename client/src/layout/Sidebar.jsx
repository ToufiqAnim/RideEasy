import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { verifyToken } from "../../utils/verifyToken";

import { adminPaths } from "../../routes/adminRoutes";
import { generateSidebarItems } from "../../utils/GenerateSidebarItems";
import { userPaths } from "../../routes/userRoutes";
import { HiHome, HiMenu } from "react-icons/hi";
import { USER_ROLE } from "../constant/UserConsatant";
import { useSelector } from "react-redux";
import { useCurrentToken } from "../redux/feature/authSlice";

const Sidebar = () => {
  const token = useSelector(useCurrentToken);
  const [isMobile, setIsMobile] = useState(false);

  let user;
  if (token) {
    user = verifyToken(token);
  }

  let sidebarItems;
  switch (user?.role) {
    case USER_ROLE.admin:
      sidebarItems = generateSidebarItems(adminPaths, USER_ROLE.admin);
      break;
    case USER_ROLE.user:
      sidebarItems = generateSidebarItems(userPaths, USER_ROLE.user);
      break;
    default:
      break;
  }

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={`h-full ${isMobile ? "hidden" : "block"} md:block`}>
      <div className="bg-gray-800 text-white h-screen p-4 flex flex-col justify-between">
        <div className="space-y-4">
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
            <HiHome className="text-3xl" />
            Home
          </Link>
          <nav className="space-y-2">
            {sidebarItems.map((item) => (
              <Link
                key={item.name}
                to={item.path || "#"}
                className="block p-2 rounded-lg hover:bg-gray-700"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {isMobile && (
        <div className="p-4">
          <button className="btn btn-primary flex items-center gap-2">
            <HiMenu className="text-xl" /> Menu
          </button>
          <div className="dropdown dropdown-hover mt-2">
            <ul className="menu bg-gray-800 p-2 rounded-lg shadow-lg text-white">
              {sidebarItems.map((item) => (
                <li key={item.name}>
                  <Link to={item.path || "#"}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;

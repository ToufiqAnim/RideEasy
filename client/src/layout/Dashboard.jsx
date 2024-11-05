import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

import { Bell, UserCircle } from "lucide-react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../redux/feature/authSlice";

const Dashboard = () => {
  const currentUser = useSelector(selectCurrentUser);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-gray-100 p-4 border-b border-gray-300 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="avatar">
              <div className="w-10 rounded-full bg-gray-300">
                <UserCircle className="text-2xl m-auto" />
              </div>
            </div>
            <p>{currentUser?.name}</p>
          </div>
          <button className="text-gray-500 hover:text-gray-700">
            <Bell className="text-2xl" />
          </button>
        </header>

        {/* Content area */}
        <main className="flex-1 p-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

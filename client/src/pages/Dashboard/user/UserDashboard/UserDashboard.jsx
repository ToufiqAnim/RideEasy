import React from "react";

import { Link } from "react-router-dom";
import WelcomeHeaderUser from "./UserHeader.JSx";

const UserDashboard = () => {
  return (
    <div className="p-6">
      <WelcomeHeaderUser></WelcomeHeaderUser>

      <div className="mb-6">
        <Link to="/user/user-bookings">
          <button className="mr-4 btn btn-primary">My Bookings</button>
        </Link>
        <Link to="#">
          <button type="default" className="mr-4 btn btn-primary">
            Edit Profile
          </button>
        </Link>
        <Link to="#">
          <button type="default" className="mt-4 btn btn-primary">
            Change Password
          </button>
        </Link>
      </div>
    </div>
  );
};

export default UserDashboard;

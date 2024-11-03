/* 
import React from "react";
import AdminDashboard from "../pages/Dashboard/Admin/AdminDashboard/AdminDashboard";
import CreateFacility from "../pages/Dashboard/Admin/Facility/CreateFacility";
import AllBookings from "../pages/Dashboard/Admin/Bookings/AllBookings";
import AdminBookingDetails from "../pages/Dashboard/Admin/Bookings/AdminBookingDetails";
import UpdateFacility from "../pages/Dashboard/Admin/Facility/UpdateFacility";
import Facility from "../pages/Dashboard/Admin/Facility/Facility";
import CreateAdmin from "../pages/Dashboard/Admin/UserManagement/CreateAdmin";

export const adminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard></AdminDashboard>,
  },
  {
    name: "Facility Management",
    children: [
      {
        name: "Create Facility",
        path: "create-facility",
        element: <CreateFacility></CreateFacility>,
      },

      {
        path: "facility/:id",
        element: <UpdateFacility></UpdateFacility>,
      },
      {
        name: "Facility",
        path: "facility",
        element: <Facility></Facility>,
      },
    ],
  },
  {
    name: "Booking Management",
    children: [
      {
        name: "All Bookings",
        path: "all-bookings",
        element: <AllBookings></AllBookings>,
      },
      {
        path: "all-bookings/:bookingId",
        element: <AdminBookingDetails></AdminBookingDetails>,
      },
    ],
  },
  {
    name: "User Management",
    children: [
      {
        name: "Create Admin",
        path: "create-admin",
        element: <CreateAdmin></CreateAdmin>,
      },
    ],
  },
];
 */

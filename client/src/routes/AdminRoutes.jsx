import AdminDashboard from "../pages/Dashboard/Admin/AdminDashboard.jsx/AdminDashboardHome";
import AllBookings from "../pages/Dashboard/Admin/Bookings/Allbookings";
import BookingsDetails from "../pages/Dashboard/Admin/Bookings/BookingsDetails";
import Cars from "../pages/Dashboard/Admin/Cars/Cars";
import CreateCar from "../pages/Dashboard/Admin/Cars/CreateCar";
import UpdateCar from "../pages/Dashboard/Admin/Cars/UpdateCar";
import CreateAdmin from "../pages/Dashboard/Admin/UserManagement/CreateAdmin";

export const adminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard></AdminDashboard>,
  },
  {
    name: "Car Management",
    children: [
      {
        name: "Cars",
        path: "car",
        element: <Cars></Cars>,
      },
      {
        name: "Create Car",
        path: "create-car",
        element: <CreateCar></CreateCar>,
      },
      { name: "Update Car", path: "car/:id", element: <UpdateCar></UpdateCar> },
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
        name: "Booking Details",
        path: "all-bookings/:bookingId",
        element: <BookingsDetails></BookingsDetails>,
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

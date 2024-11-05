import MyBookingDetails from "../pages/Dashboard/user/MyBookings/MyBookingDetails";
import MyBookings from "../pages/Dashboard/user/MyBookings/MyBookings";
import UserDashboard from "../pages/Dashboard/user/UserDashboard/UserDashboard";

export const userPaths = [
  {
    name: "Dashboard",
    index: true,
    element: <UserDashboard></UserDashboard>,
  },
  {
    name: "Dashboard",
    path: "dashboard",
    element: <UserDashboard></UserDashboard>,
  },

  {
    name: "My Bookings",
    path: "user-bookings",
    element: <MyBookings></MyBookings>,
  },
  {
    path: "user-bookings/:bookingId",
    element: <MyBookingDetails></MyBookingDetails>,
  },
];

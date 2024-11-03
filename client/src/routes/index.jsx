import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home"; // Assuming you have a Home component
import Cars from "../pages/Cars/Cars";
import CarDetails from "../pages/Cars/CarDetails";
import SignIn from "../pages/Auth/SignIn";
import SignUp from "../pages/Auth/SignUp";
import ProtectedRoute from "./ProtectedRoutes";
import Bookings from "../pages/Bookings/Bookings";
import AllCars from "../pages/Cars/AllCars";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/cars",
        element: <AllCars />,
      },
      {
        path: "/cars/:id",
        element: <CarDetails />,
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "bookings/:carId",
        element: (
          <ProtectedRoute role="user">
            <Bookings></Bookings>
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

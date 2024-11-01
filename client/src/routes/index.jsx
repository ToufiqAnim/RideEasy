import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home"; // Assuming you have a Home component
import Cars from "../pages/Cars/Cars";
import CarDetails from "../pages/Cars/CarDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/cars", element: <Cars /> },
      { path: "/cars/:id", element: <CarDetails /> },
    ],
  },
]);

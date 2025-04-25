import { createBrowserRouter } from "react-router-dom";
import { BannerPage, Discounts, HomePage, ProductPage } from "../features";
import { Checking } from "../features/Checking";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/products",
    element: <ProductPage />,
  },
  {
    path: "/discount",
    element: <Discounts />,
  },
  {
    path: "/banner",
    element: <BannerPage />,
  },
  {
    path: "/checking",
    element: <Checking />,
  },
]);

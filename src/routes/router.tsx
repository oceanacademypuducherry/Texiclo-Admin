import { createBrowserRouter } from "react-router-dom";
import { BannerPage, Discounts, HomePage, ProductPage } from "../features";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/products",
    element:<ProductPage/>,
  },
  {
    path: "/discount",
    element: <Discounts />,
  },
  {
    path: "/banner",
    element: <BannerPage/>,
  },
]);

import { createBrowserRouter } from "react-router-dom";
import {
  BannerPage,
  Discounts,
  HomePage,
  Login,
  ProductPage,
} from "../features";
import { Checking } from "../features/Checking";
import { CollectionTypePage } from "../features/collectiontype/page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/category",
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
  {
    path: "/collectiontype",
    element: <CollectionTypePage/>,
  },
]);

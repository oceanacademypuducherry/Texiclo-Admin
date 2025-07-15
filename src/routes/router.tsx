import { createBrowserRouter } from "react-router-dom";
import {
  BannerPage,
  CategoryPage,
  CollectionTypePage,
  ColorPage,
  GsmPage,
  Login,
  SizePage,
} from "../features";
import { Checking } from "../features/Checking";
import {
  ProductAddPage,
  // ProductAddPage,
  ProductDetailsPage,
  ProductPage,
  ProductUpdatePage,
} from "../features/products";
import { PublicRoutes } from "./PublicRoutes";
import { ProtectedRoutes } from "./ProtectedRoutes";

export const router = createBrowserRouter([
  {
    path: "/checking",
    element: <Checking />,
  },
  {
    element: <PublicRoutes />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
    ],
  },
  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: "/products",
        element: <ProductPage />,
      },
      {
        path: "/products/:id",
        element: <ProductDetailsPage />,
      },
      {
        path: "/addproduct",
        element: <ProductAddPage />,
      },
      {
        path: "/updateproduct/:id",
        element: <ProductUpdatePage />,
      },
      {
        path: "/category",
        element: <CategoryPage />,
      },
      {
        path: "/banner",
        element: <BannerPage />,
      },
      {
        path: "/collectiontype",
        element: <CollectionTypePage />,
      },

      {
        path: "/gsm",
        element: <GsmPage />,
      },
      {
        path: "/color",
        element: <ColorPage />,
      },
      {
        path: "/size",
        element: <SizePage />,
      },
    ],
  },
]);

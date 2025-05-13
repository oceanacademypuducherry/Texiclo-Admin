import { createBrowserRouter } from "react-router-dom";
import {
  BannerPage,
  CategoryPage,
  CollectionTypePage,
  Discounts,
  HomePage,
  Login,
} from "../features";
import { Checking } from "../features/Checking";
import {
  ProductAddPage,
  ProductDetailsPage,
  ProductPage,
  ProductUpdatePage,
} from "../features/products";

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
    element: <CategoryPage />,
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
    path: "/collectiontype",
    element: <CollectionTypePage />,
  },
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
    path: "/checking",
    element: <Checking />,
  },
]);

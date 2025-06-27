import { RouterProvider } from "react-router-dom";
import { router } from "../routes";
import { Provider } from "react-redux";
import { store } from "./store";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
      <ToastContainer position="top-center" autoClose={3000} />
    </Provider>
  );
}

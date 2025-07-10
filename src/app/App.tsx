import { RouterProvider } from "react-router-dom";
import { router } from "../routes";
import { Provider } from "react-redux";
import { persistor, store } from "./store";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";

export function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </PersistGate>
    </Provider>
  );
}

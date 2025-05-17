import { FC, ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { AdminAPI } from "../services";
import { logout } from "../features";
// import Cookies from "js-cookie";
import { AppDispatch, RootState } from "./store";

interface DispatcherProps {
  children: ReactNode;
}

export const Dispatcher: FC<DispatcherProps> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    // Attach interceptor
    // const interceptorId = AdminAPI.interceptors.response.use(
    //   (response) => response,
    //   (error) => {
    //     console.log("Interceptor Error:", error); // Debugging line

    //     if (error.response?.data?.status === "INVALID_TOKEN") {
    //       console.log("Invalid token detected. Logging out.");
    //       dispatch(logout());
    //       navigate("/", { replace: true });
    //     }
    //     return Promise.reject(error);
    //   },
    // );

    // Function to check if the token exists
    const checkAuth = () => {
      console.log("Checking auth...");

      // const token = Cookies.get("token");
      if (!token) {
        console.log("No token found. Logging out.");
        dispatch(logout());
        navigate("/", { replace: true });
      }
    };

    // Define event listener function separately
    const handleVisibilityChange = () => {
      console.log("Visibility changed:", document.visibilityState);
      if (document.visibilityState === "visible") {
        checkAuth();
      }
    };

    // Listen for tab switch (visibility change)
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      // Remove the interceptor
      // AdminAPI.interceptors.response.eject(interceptorId);
      // Remove event listener correctly
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [dispatch, navigate, token]);

  return <>{children}</>;
};

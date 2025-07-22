import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { Dispatcher, RootState } from "../app";

export const ProtectedRoutes = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  return true ? (
    <Dispatcher>
      <Outlet />
    </Dispatcher>
  ) : (
    <Navigate to="/" replace />
  );
};

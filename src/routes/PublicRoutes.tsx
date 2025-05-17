import { Navigate, Outlet } from "react-router-dom";
import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app";

export const PublicRoutes: FC = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  return isAuthenticated ? <Navigate to="/home" replace /> : <Outlet />;
};

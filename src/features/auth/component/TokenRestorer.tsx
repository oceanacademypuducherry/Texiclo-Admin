// src/components/TokenRestorer.tsx
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import Cookies from "js-cookie";
import { AppDispatch } from "../../../app";
import { logout, setTokenFromCookie } from "../redux";


export const TokenRestorer = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      dispatch(setTokenFromCookie({ token }));
    } else {
      dispatch(logout());
    }
  }, [dispatch]);

  return null;
};

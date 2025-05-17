import { FiLogOut } from "react-icons/fi";
import { AppDispatch } from "../../../app";
import { useDispatch } from "react-redux";
import { logout } from "../../auth";
import { useNavigate } from "react-router-dom";

export const LogoutBtn = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/", { replace: true });
  };

  return (
    <button
      onClick={handleLogout}
      className="hover:text-primary flex w-full items-center gap-4 rounded-[7px] p-3 text-black transition-colors hover:cursor-pointer hover:bg-black"
    >
      <i>
        <FiLogOut className="text-xl" />
      </i>
      <span className="text-base font-medium">Logout</span>
    </button>
  );
};

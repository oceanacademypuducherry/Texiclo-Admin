import { FiLogOut } from "react-icons/fi";

export const LogoutBtn = () => {
  return (
    <button className="hover:text-primary flex w-full items-center gap-4 rounded-[7px] p-3 text-black transition-colors hover:cursor-pointer hover:bg-black">
      <i>
        <FiLogOut className="text-xl" />
      </i>
      <span className="text-base font-medium">Logout</span>
    </button>
  );
};

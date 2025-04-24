import { FiLogOut } from "react-icons/fi";

export const LogoutBtn = () => {
  return (
    <button className="hover:text-primary flex w-full items-center rounded-[7px] p-3 text-black transition-colors hover:cursor-pointer hover:bg-black">
      <i>
        <FiLogOut />
      </i>
      <span>Logout</span>
    </button>
  );
};

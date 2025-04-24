import { NavBar } from "./NavBar";

export const SideBar = () => {
  return (
    <div className="max-[770px]:hidden">
      <NavBar />
    </div>
  );
};

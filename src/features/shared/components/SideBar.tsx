import { NavBar } from "./NavBar";

export const SideBar = () => {
  return (
    <div className="sticky top-0 h-full max-[770px]:hidden">
      <NavBar />
    </div>
  );
};

import { FC, useState } from "react";
import { SideBar } from "./SideBar";
import { LOGO } from "../../../assets";
import { Drawer } from "./Drawer";
import { RiMenuUnfold2Line } from "react-icons/ri";

interface PlaceHolderProps {
  children: React.ReactNode;
}
export const PlaceHolder: FC<PlaceHolderProps> = ({ children }) => {
  const [isDrawer, setIsDrawer] = useState<boolean>(false);
  return (
    <div className="flex bg-neutral-100">
      <SideBar />
      <Drawer isDrawer={isDrawer} setIsDrawer={setIsDrawer} />
      <section className="w-full">
        {/* nav section */}
        <div className="flex w-full items-center justify-between bg-amber-200 px-2 min-[770px]:hidden">
          <i onClick={() => setIsDrawer(!isDrawer)}>
            <RiMenuUnfold2Line className="text-3xl" />
          </i>
          <div>
            <img src={LOGO} alt="logo" />
          </div>
        </div>
        {children}
      </section>
    </div>
  );
};

import { FC, useEffect, useRef } from "react";
import { CgClose } from "react-icons/cg";
import { NavBar } from "./NavBar";

interface DrawerProps {
  isDrawer: boolean;
  setIsDrawer: (state: boolean) => void;
}

export const Drawer: FC<DrawerProps> = ({ isDrawer, setIsDrawer }) => {
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isDrawer &&
        drawerRef.current &&
        !drawerRef.current.contains(event.target as Node)
      ) {
        setIsDrawer(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDrawer, setIsDrawer]);

  return (
    <main
      ref={drawerRef}
      className={`fixed top-0 z-[99] transition-all duration-300 min-[770px]:hidden ${
        isDrawer ? "left-0" : "-left-full"
      } h-screen w-full max-w-[250px]`}
    >
      <div
        onClick={() => setIsDrawer(false)}
        className="absolute top-1 right-1 h-fit w-fit rounded-full border p-1"
      >
        <CgClose />
      </div>
      <nav className="flex flex-col gap-5">
        <NavBar />
      </nav>
    </main>
  );
};

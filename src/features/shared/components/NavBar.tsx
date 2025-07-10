import { LOGO } from "../../../assets";
import { NavLink } from "react-router-dom";
import { BsBoxSeam } from "react-icons/bs";
import { FaRegImages } from "react-icons/fa";
import { LogoutBtn } from "./LogoutBtn";
import { AiFillProduct } from "react-icons/ai";
import { VscTypeHierarchy } from "react-icons/vsc";
import { GiRolledCloth } from "react-icons/gi";
import { IoColorPaletteSharp } from "react-icons/io5";
import { RxFontSize } from "react-icons/rx";

export const NavBar = () => {
  return (
    <div className="bg-primary sticky top-0 flex h-screen w-[250px] flex-col justify-between p-4 text-black shadow-lg">
      {/* Logo */}
      <div className="mb-6 flex items-center justify-center">
        <img
          src={LOGO}
          alt="Logo"
          className="h-auto w-32"
          draggable="false"
        ></img>
      </div>

      {/* Navigation Items */}
      <div className="flex flex-col gap-4">
        <NavLink
          to="/products"
          className={({ isActive }) =>
            `flex cursor-pointer items-center gap-3 rounded-lg p-3 transition ${
              isActive
                ? "text-primary bg-black font-semibold"
                : "text-black hover:bg-white/10"
            }`
          }
        >
          <AiFillProduct className="text-xl" />
          <span className="text-base font-medium">Products</span>
        </NavLink>

        <NavLink
          to="/category"
          className={({ isActive }) =>
            `flex cursor-pointer items-center gap-3 rounded-lg p-3 transition ${
              isActive
                ? "text-primary bg-black font-semibold"
                : "text-black hover:bg-white/10"
            }`
          }
        >
          <BsBoxSeam className="text-xl" />
          <span className="text-base font-medium">Categories</span>
        </NavLink>

        {/* <NavLink
          to="/discount"
          className={({ isActive }) =>
            `flex cursor-pointer items-center gap-3 rounded-lg p-3 transition ${
              isActive
                ? "text-primary bg-black font-semibold"
                : "text-black hover:bg-white/10"
            }`
          }
        >
          <TbRosetteDiscountFilled className="text-xl" />
          <span className="text-base font-medium">Discount</span>
        </NavLink> */}

        <NavLink
          to="/banner"
          className={({ isActive }) =>
            `flex cursor-pointer items-center gap-3 rounded-lg p-3 transition ${
              isActive
                ? "text-primary bg-black font-semibold"
                : "text-black hover:bg-white/10"
            }`
          }
        >
          <FaRegImages className="text-xl" />
          <span className="text-base font-medium">Banners</span>
        </NavLink>
        <NavLink
          to="/collectiontype"
          className={({ isActive }) =>
            `flex cursor-pointer items-center gap-3 rounded-lg p-3 transition ${
              isActive
                ? "text-primary bg-black font-semibold"
                : "text-black hover:bg-white/10"
            }`
          }
        >
          <VscTypeHierarchy className="text-xl" />
          <span className="text-base font-medium">Collection Type</span>
        </NavLink>
        <NavLink
          to="/gsm"
          className={({ isActive }) =>
            `flex cursor-pointer items-center gap-3 rounded-lg p-3 transition ${
              isActive
                ? "text-primary bg-black font-semibold"
                : "text-black hover:bg-white/10"
            }`
          }
        >
          <GiRolledCloth className="text-xl" />
          <span className="text-base font-medium">GSM</span>
        </NavLink>
        {/* <NavLink
          to="/color"
          className={({ isActive }) =>
            `flex cursor-pointer items-center gap-3 rounded-lg p-3 transition ${
              isActive
                ? "text-primary bg-black font-semibold"
                : "text-black hover:bg-white/10"
            }`
          }
        >
          <IoColorPaletteSharp className="text-xl" />

          <span className="text-base font-medium">Color</span>
        </NavLink> */}
        <NavLink
          to="/size"
          className={({ isActive }) =>
            `flex cursor-pointer items-center gap-3 rounded-lg p-3 transition ${
              isActive
                ? "text-primary bg-black font-semibold"
                : "text-black hover:bg-white/10"
            }`
          }
        >
          <RxFontSize className="text-xl" />
          <span className="text-base font-medium">Size</span>
        </NavLink>
      </div>

      {/* Logout Button */}
      <div className="mt-auto pt-6">
        <LogoutBtn />
      </div>
    </div>
  );
};

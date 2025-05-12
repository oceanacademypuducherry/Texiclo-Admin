import { MdOutlineCancel } from "react-icons/md";
import { FilterComponent } from "../component";

type Props = {
  onClose: () => void;
};

export const MobileFilterSidebar = ({ onClose }: Props) => {
  return (
    <div className="fixed inset-0 z-50 flex">
      <div
        className="fixed inset-0 bg-white/40 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Sidebar */}
      <div className="relative z-50 w-3/4 max-w-48 bg-white p-4 shadow-lg">
        <div>
          <FilterComponent isSidenav={true} isVisible={true} />
        </div>

        <div className="mt-10 flex items-center justify-center transition duration-100">
          <div
            className="cursor-pointer text-xl font-bold text-red-500"
            onClick={onClose}
          >
            <MdOutlineCancel />
          </div>
        </div>
      </div>
    </div>
  );
};

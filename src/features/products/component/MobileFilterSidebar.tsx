import { MdOutlineCancel } from "react-icons/md";
import { FilterComponent } from "../component";

type Props = {
  onClose: () => void;
};

export const MobileFilterSidebar = ({ onClose }: Props) => {
  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Blurred transparent background */}
      <div
        className="fixed inset-0 bg-white/40 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Sidebar */}
      <div className="relative z-50 w-3/4 max-w-48 bg-white p-4 shadow-lg">
        <div className="mb-4 flex items-center justify-end">
          <div
            className="cursor-pointer text-xl font-bold text-red-500"
            onClick={onClose}
          >
            <MdOutlineCancel />
          </div>
        </div>
        <FilterComponent />
      </div>
    </div>
  );
};

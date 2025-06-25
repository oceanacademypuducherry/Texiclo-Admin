import { HiPencilAlt } from "react-icons/hi";
import { MdDelete } from "react-icons/md";

export const GsmComponent = () => {
  return (
    <div className="flex max-w-[150px] flex-col items-center space-y-2.5 rounded-lg border-2 border-gray-300 p-1">
      <span className="text-xl font-bold"> 120 GSM</span>
      <div className="flex gap-2.5 pb-1">
        <HiPencilAlt className="hover:text-blue-400" />
        <MdDelete className="hover:text-secondary text-red-600" />
      </div>
    </div>
  );
};

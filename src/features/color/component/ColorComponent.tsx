import { HiPencilAlt } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import {
  ColorsData,
  setColor,
  setColorDelete,
  setColorId,
  setColorUpdate,
} from "../redux";
import { useDispatch } from "react-redux";

interface ColorProps {
  color: ColorsData;
}

export const ColorComponent = ({ color }: ColorProps) => {
  const dispatch = useDispatch();
  return (
    <div className="flex w-[150px] flex-col items-center space-y-2.5 rounded-lg border-2 border-gray-300 p-2">
      <span className="text-xl font-bold"> {color.colorName}</span>
      <div className="flex gap-2">
        <div
          className="h-[23px] w-[23px] rounded-3xl border-[1px]"
          style={{ backgroundColor: color.colorValue }}
        ></div>
        <span className="text-lg font-medium">{color.colorValue}</span>
      </div>
      <div className="flex gap-2.5 pb-1">
        <HiPencilAlt
          onClick={() => {
            dispatch(setColor(color));
            dispatch(setColorUpdate(true));
          }}
          className="cursor-pointer hover:text-blue-400"
        />
        <MdDelete
          onClick={() => {
            dispatch(setColorId(color.id));
            dispatch(setColorDelete(true));
          }}
          className="hover:text-secondary cursor-pointer text-red-600"
        />
      </div>
    </div>
  );
};

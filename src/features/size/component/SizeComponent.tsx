import React from "react";
import { HiPencilAlt } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import {
  setSize,
  setSizeDelete,
  setSizeId,
  setSizeUpdate,
  SizesData,
} from "../redux";
import { useDispatch } from "react-redux";

interface SizeProps {
  size: SizesData;
}

export const SizeComponent = ({ size }: SizeProps) => {
  const dispatch = useDispatch();
  return (
    <div className="flex w-[120px] flex-col items-center space-y-2.5 rounded-lg border-2 border-gray-300 p-2">
      <span className="text-xl font-bold">{size.size}</span>
      <div className="flex gap-2.5 pb-1">
        <HiPencilAlt
          onClick={() => {
            dispatch(setSize(size));
            dispatch(setSizeUpdate(true));
          }}
          className="cursor-pointer hover:text-blue-400"
        />
        <MdDelete
          onClick={() => {
            dispatch(setSizeId(size.id));
            dispatch(setSizeDelete(true));
          }}
          className="hover:text-secondary cursor-pointer text-red-600"
        />
      </div>
    </div>
  );
};

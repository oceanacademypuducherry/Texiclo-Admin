import React, { useEffect } from "react";
import { PlaceHolder } from "../../shared";
import {
  AddColorModal,
  ColorComponent,
  DeleteColormodal,
  UpdateColorModal,
} from "../component";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app";
import { setColorAdd, setColorData } from "../redux";
import { ColorData } from "../data/color";

export const ColorPage = () => {
  const dispatch = useDispatch();
  const { isAdd, isDelete, isUpdate, colors } = useSelector(
    (state: RootState) => state.color,
  );
  useEffect(() => {
    dispatch(setColorData(ColorData));
  }, []);
  return (
    <PlaceHolder>
      {isAdd && <AddColorModal />}
      {isUpdate && <UpdateColorModal />}
      {isDelete && <DeleteColormodal />}
      <div className="flex flex-col items-center gap-4 p-4">
        <h1 className="text-secondary text-center text-2xl font-bold">Color</h1>
      </div>
      <div className="mb-4 flex w-full justify-end">
        <button
          onClick={() => dispatch(setColorAdd(true))}
          className="bg-primary hover:bg-secondary hover:text-primary mr-4 rounded-xl px-6 py-3 text-sm font-medium sm:text-base lg:text-lg"
        >
          Add Color
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-4 p-4">
        {ColorData.length > 0 ? (
          colors.map((item) => <ColorComponent key={item.id} color={item} />)
        ) : (
          <p className="text-center text-gray-500">No Color data available.</p>
        )}
      </div>
    </PlaceHolder>
  );
};

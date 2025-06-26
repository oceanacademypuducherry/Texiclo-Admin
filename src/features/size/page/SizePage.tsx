import { useDispatch, useSelector } from "react-redux";
import { PlaceHolder } from "../../shared";
import { RootState } from "../../../app";
import { useEffect } from "react";
import { setSizeAdd, setSizeData } from "../redux";
import { SizeData } from "../data/size";
import {
  AddSizeModal,
  DeleteSizeModal,
  SizeComponent,
  UpdateSizeModal,
} from "../component";

export const SizePage = () => {
  const dispatch = useDispatch();
  const { isAdd, isDelete, isUpdate, sizes } = useSelector(
    (state: RootState) => state.size,
  );

  useEffect(() => {
    dispatch(setSizeData(SizeData));
  }, []);
  return (
    <PlaceHolder>
      {isAdd && <AddSizeModal />}
      {isUpdate && <UpdateSizeModal />}
      {isDelete && <DeleteSizeModal />}
      <div className="flex flex-col items-center gap-4 p-4">
        <h1 className="text-secondary text-center text-2xl font-bold">Size</h1>
      </div>
      <div className="mb-4 flex w-full justify-end">
        <button
          onClick={() => dispatch(setSizeAdd(true))}
          className="bg-primary hover:bg-secondary hover:text-primary mr-4 rounded-xl px-6 py-3 text-sm font-medium sm:text-base lg:text-lg"
        >
          Add size
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-4 p-4">
        {SizeData.length > 0 ? (
          sizes.map((item) => <SizeComponent key={item.id} size={item} />)
        ) : (
          <p className="text-center text-gray-500">No Size data available.</p>
        )}
      </div>
    </PlaceHolder>
  );
};

import { useDispatch, useSelector } from "react-redux";
import { PlaceHolder } from "../../shared";
import {
  AddGsmModal,
  DeleteGsmModal,
  GsmComponent,
  GsmSkeleton,
  UpdateGsmModal,
} from "../component";
import { AppDispatch, RootState } from "../../../app";
import { setGsmAdd } from "../redux";
import { useEffect } from "react";
import { GET_GSM } from "../service";

export const GsmPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAdd, isDelete, isUpdate, gsms, loading } = useSelector(
    (state: RootState) => state.gsm,
  );
  useEffect(() => {
    dispatch(GET_GSM());
  }, [dispatch]);
  return (
    <PlaceHolder>
      {isAdd && <AddGsmModal />}
      {isUpdate && <UpdateGsmModal />}
      {isDelete && <DeleteGsmModal />}
      <div className="flex flex-col items-center gap-4 p-4">
        <h1 className="text-secondary text-center text-2xl font-bold">GSM</h1>
      </div>
      <div className="mb-4 flex w-full justify-end">
        <button
          onClick={() => dispatch(setGsmAdd(true))}
          className="bg-primary hover:bg-secondary hover:text-primary mr-4 rounded-xl px-6 py-3 text-sm font-medium sm:text-base lg:text-lg"
        >
          Add GSM
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-4 p-4">
        {loading ? (
          [...Array(4)].map((_, idx) => <GsmSkeleton key={idx} />)
        ) : gsms.length > 0 ? (
          gsms.map((item) => <GsmComponent key={item._id} gsm={item} />)
        ) : (
          <p className="text-center text-gray-500">No GSM data available.</p>
        )}
      </div>
    </PlaceHolder>
  );
};

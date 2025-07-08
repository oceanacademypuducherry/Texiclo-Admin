import { HiPencilAlt } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { GsmsData } from "../redux"; // Your gsm type
import { setGsm, setGsmDelete, setGsm_id, setGsmUpdate } from "../redux";

interface GsmProps {
  gsm: GsmsData;
}

export const GsmComponent = ({ gsm }: GsmProps) => {
  const dispatch = useDispatch();

  return (
    <div className="flex max-w-[150px] flex-col items-center space-y-2.5 rounded-lg border-2 border-gray-300 p-2">
      <span className="text-xl font-bold">{gsm.gsm} GSM</span>
      <div className="flex gap-2.5 pb-1">
        <HiPencilAlt
          onClick={() => {
            dispatch(setGsm(gsm));
            dispatch(setGsmUpdate(true));
          }}
          className="cursor-pointer hover:text-blue-400"
        />
        <MdDelete
          onClick={() => {
            dispatch(setGsm_id(gsm._id));
            dispatch(setGsmDelete(true));
          }}
          className="hover:text-secondary cursor-pointer text-red-600"
        />
      </div>
    </div>
  );
};

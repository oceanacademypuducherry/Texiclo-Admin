import { PlaceHolder } from "../../shared";
import { AddGsmModal, GsmComponent } from "../component";

export const GsmPage = () => {
  return (
    <PlaceHolder>
      <div className="flex flex-col items-center gap-4 p-4">
        <h1 className="text-secondary text-center text-2xl font-bold">GSM</h1>
      </div>
      <div className="mb-4 flex w-full justify-end">
        <button className="bg-primary hover:bg-secondary hover:text-primary mr-4 rounded-xl px-6 py-3 text-sm font-medium sm:text-base lg:text-lg">
          Add GSM
        </button>
      </div>

      <GsmComponent />
      <AddGsmModal />
    </PlaceHolder>
  );
};

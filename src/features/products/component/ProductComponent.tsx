import { PRODUCT1 } from "../../../assets";

export const ProductComponent = () => {
  return (
    <div className="flex w-[300px] transform flex-col items-center rounded-lg bg-white p-4 shadow-lg transition-transform hover:scale-105">
      <div className="mb-4">
        <img
          src={PRODUCT1}
          alt="Polo shirt product image"
          className="h-48 w-48 rounded-md object-cover"
        />
      </div>
      <div className="flex flex-col items-center text-center">
        <span className="mb-2 text-lg font-semibold">Polo Shirt</span>
        <span className="text-xl font-bold text-gray-700">₹382</span>
      </div>
    </div>
  );
};

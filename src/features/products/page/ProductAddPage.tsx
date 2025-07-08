import { BackBtn, ProductForm } from "../component";
import { AddProductForm } from "../component/AddProductForm";

export const ProductAddPage = () => {
  return (
    <div>
      <div className="mx-8 mt-2">
        <BackBtn />
      </div>
      <div className="flex flex-col items-center gap-4 p-4">
        <h1 className="text-secondary text-center text-2xl font-bold">
          Add Products
        </h1>
      </div>

      {/* <ProductForm /> */}
      <AddProductForm />
    </div>
  );
};

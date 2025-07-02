import { BackBtn, ProductForm, ProductFormInputs } from "../component";

export const ProductAddPage = () => {
  const handleAddProduct = async (data: ProductFormInputs) => {
    console.log("Add Product:", data);
  };
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

      <ProductForm onSubmit={handleAddProduct} />
    </div>
  );
};

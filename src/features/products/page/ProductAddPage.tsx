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
      <ProductForm onSubmit={handleAddProduct} />
    </div>
  );
};

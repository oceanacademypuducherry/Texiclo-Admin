import { ProductForm, ProductFormInputs } from "../component";

export const ProductAddPage = () => {
  const handleAddProduct = async (data: ProductFormInputs) => {
    console.log("Add Product:", data);
  };
  return <ProductForm onSubmit={handleAddProduct} />;
};

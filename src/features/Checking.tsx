import { DeleteModal, ProductFormInputs } from "./products";
import { ProductForm } from "./products/component/ProductForm";

export const Checking = () => {
  const existingProductData = {
    productName: "Existing Product",
    collectionType: "Winter Collection",
    category: "Clothing",
    description: "A nice winter jacket.",
    previewImage: [], 
    products: [
      {
        productImage: [], 
        color: "Red",
        gsm: ["180gsm", "200gsm"],
        size: ["M", "L"],
        price: 500,
        discount: 10,
      },
    ],
  };
  
  const handleAddProduct = async (data: ProductFormInputs) => {
    
    console.log("Add Product:", data);
  };
  const handleUpdateProduct = async (data: ProductFormInputs) => {

    console.log("Update Product:", data);
  };

  return (
    <div>
      {/* <DeleteModal /> */}
      {/* <ProductForm onSubmit={handleAddProduct} /> */}
      <ProductForm onSubmit={handleUpdateProduct} existingProductData={existingProductData}/>
    </div>
  );
};

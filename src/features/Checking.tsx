import { useState } from "react";
import { DeleteModal, ProductComponent, ProductFormInputs } from "./products";
import { ProductForm } from "./products/component/ProductForm";
import { Pagination } from "./shared";
import { ProductsData } from "./products/data/productData";

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
  const [page, setPage] = useState(1);

  return (
    <div>
      {/* <Pagination current={1} onChange={setPage} total={10} />
      {/* <DeleteModal /> */}
      {/* <ProductForm onSubmit={handleAddProduct} /> */}
      {/* <ProductForm
        onSubmit={handleUpdateProduct}
        existingProductData={existingProductData}
      /> */}
      {ProductsData.map((product) => (
        <ProductComponent
          key={product.id}
          id={product.id}
          previewImage={product.previewImage}
          title={product.name}
          price={product.price}
          discount={product.discount}
          discountprice={product.discountPrice}
          colors={product.colors}
          type={`Polo | ${product.types?.join(", ")}`}
        />
      ))}
    </div>
  );
};

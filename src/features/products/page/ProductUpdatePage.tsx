import { useParams } from "react-router-dom";
import { BackBtn, ProductForm, ProductFormInputs } from "../component";
import { ProductsData } from "../data/productData";

export const ProductUpdatePage = () => {
  const { id } = useParams();

  // Find product by ID from your static product data
  const product = ProductsData.find((item) => item.id === id);
  console.log(product);

  if (!product) {
    return (
      <div className="mt-10 text-center text-xl font-semibold text-red-500">
        Product not found
      </div>
    );
  }

  const existingProductData = {
    productName: product.name,
    collectionType: product.collectionType,
    category: product.category,
    description: product.description,
    previewImage: [product.previewImage], // Handle according to your structure
    products: [
      {
        productImage: product.images || [],
        color: product.colors,
        gsm: product.gsm || [],
        size: product.sizes || [],
        price: product.price,
        discount: product.discount,
      },
    ],
  };
  const handleUpdateProduct = async (data: ProductFormInputs) => {
    console.log("Update Product:", data);
  };
  return (
    <div>
      <div className="mx-8 mt-2">
        <BackBtn />
      </div>
      <ProductForm
        onSubmit={handleUpdateProduct}
        existingProductData={existingProductData}
      />
    </div>
  );
};

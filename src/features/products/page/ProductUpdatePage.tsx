import { useParams } from "react-router-dom";
import { BackBtn, ProductForm, ProductFormInputs } from "../component";
import { ProductsData } from "../data/productData";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setFormData } from "../redux";

export const ProductUpdatePage = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  // Find product by ID from your static product data
  const product = ProductsData.find((item) => item.id === id);
  console.log(product);

  useEffect(() => {
    if (product) {
      dispatch(
        setFormData({
          productName: product.title,
          collectionType: product.collectionType,
          category: product.category,
          description: product.description,
          prices: product.prices,
          sizes: product.sizes,
          discount: product.discount,
          variants: product.variants.map((v) => ({
            color: v.color,
            previewImage: v.previewImage as any,
            frontImage: v.frontImage as any,
            backImage: v.backImage as any,
            otherImages: v.otherImages as any,
          })),
        }),
      );
    }
  }, [dispatch, product]);
  if (!product) {
    return (
      <div className="mt-10 text-center text-xl font-semibold text-red-500">
        Product not found
      </div>
    );
  }

  // const existingProductData = {
  //   productName: product.name,
  //   collectionType: product.collectionType,
  //   category: product.category,
  //   description: product.description,
  //   previewImage: [product.previewImage], // Handle according to your structure
  //   products: [
  //     {
  //       productImage: product.images || [],
  //       color: product.colors,
  //       gsm: product.gsm || [],
  //       size: product.sizes || [],
  //       price: product.price,
  //       discount: product.discount,
  //     },
  //   ],
  // };
  const handleUpdateProduct = async (data: ProductFormInputs) => {
    console.log("Update Product:", data);
  };
  return (
    <div>
      <div className="mx-8 mt-2">
        <BackBtn />
      </div>
      <h1 className="text-secondary text-center text-2xl font-bold">
        Update Products
      </h1>
      <ProductForm
        onSubmit={handleUpdateProduct}
        // existingProductData={existingProductData}
      />
    </div>
  );
};

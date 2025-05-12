import { ProductForm, ProductFormInputs } from '../component';

export const ProductUpdatePage = () => {


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
  const handleUpdateProduct = async (data: ProductFormInputs) => {
     
      console.log("Update Product:", data);
    };    
  return (
     <ProductForm onSubmit={handleUpdateProduct} existingProductData={existingProductData}/>
  )
}

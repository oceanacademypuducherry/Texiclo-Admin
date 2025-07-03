import { useDispatch } from "react-redux";
import { BackBtn, ProductForm, ProductFormInputs } from "../component";
import { useEffect } from "react";
import { addProduct, setFormData } from "../redux";
import { nanoid } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";

export const ProductAddPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(
  //     setFormData({
  //       productName: "",
  //       collectionType: "",
  //       category: "",
  //       description: "",
  //       prices: {},
  //       sizes: [],
  //       discount: 0,
  //       variants: [
  //         {
  //           color: { name: "", code: "" },
  //           previewImage: null,
  //           frontImage: null,
  //           backImage: null,
  //           otherImages: [],
  //         },
  //       ],
  //     }),
  //   );
  // }, [dispatch]);

  const handleAddProduct = async (data: ProductFormInputs) => {
    dispatch(
      addProduct({
        id: nanoid(),
        title: data.productName,
        collectionType: data.collectionType,
        category: data.category,
        description: data.description,
        prices: data.prices,
        sizes: data.sizes,
        discount: data.discount,
        variants: data.variants.map((v) => ({
          color: v.color,
          previewImage: URL.createObjectURL(v.previewImage!),
          frontImage: URL.createObjectURL(v.frontImage!),
          backImage: URL.createObjectURL(v.backImage!),
          otherImages: v.otherImages.map((f) => URL.createObjectURL(f)),
        })),
      }),
    );
    console.log("Add Product:", data);
    dispatch(setFormData(data));
    navigate(-1)
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

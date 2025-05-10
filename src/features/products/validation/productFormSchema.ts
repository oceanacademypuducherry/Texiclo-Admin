import * as yup from "yup";

export const productSchema = yup.object().shape({
  productName: yup.string().required("Product name is required"),
  collectionType: yup.string().required("Collection type is required"),
  category: yup.string().required("Category is required"),
  description: yup.string().required("Description is required"),
  previewImage: yup
    .array()
    .min(1, "At least one preview image is required")
    .required(),
  products: yup.array().of(
    yup.object().shape({
      productImage: yup
        .array()
        .min(1, "At least one product image is required")
        .required(),
      color: yup.string().required("Color is required"),
      gsm: yup
        .array()
        .min(1, "Select at least one GSM")
        .required("GSM is required"),
      size: yup
        .array()
        .min(1, "Select at least one size")
        .required("Size is required"),
      price: yup
        .number()
        .typeError("Price must be a number")
        .positive("Price must be positive")
        .required("Price is required"),
      discount: yup
        .number()
        .typeError("Discount must be a number")
        .min(0, "Discount can't be negative")
        .required("Discount is required"),
    }),
  ),
});

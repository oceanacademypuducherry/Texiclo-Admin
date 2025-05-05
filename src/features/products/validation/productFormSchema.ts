import * as yup from "yup";

export const productSchema = yup.object({
  productName: yup.string().required("Product name is required"),
  collectionType: yup.string().required("Collection type is required"),
  category: yup.string().required("Category is required"),
  description: yup.string().required("Description is required"),

  previewImage: yup
    .mixed()
    .required("Preview image is required")
    .nullable()
    .notOneOf([null, undefined], "Preview image is required"),

  productImage: yup
    .mixed()
    .required("Product image is required")
    .nullable()
    .notOneOf([null, undefined], "Product image is required"),

  color: yup.string().required("Color is required"),
  gsm: yup
    .array()
    .of(yup.string())
    .min(1, "Select at least one GSM value")
    .required("GSM is required"),

  size: yup
    .array()
    .of(yup.string())
    .min(1, "Select at least one Size")
    .required("Size is required"),

  price: yup
    .number()
    .typeError("Price must be a number")
    .required("Price is required"),

  discount: yup
    .number()
    .required("Discount is required")
    .typeError("Discount must be a number"),
});

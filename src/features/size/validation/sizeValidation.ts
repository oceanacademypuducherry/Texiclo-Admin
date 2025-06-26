import * as yup from "yup";

const sizeSchema = yup
  .string()
  .required("Size is required")
  .trim()
  .min(1, "Size cannot be empty")
  .matches(/[a-zA-Z]/, "Size must include at least one letter");

export const addSizeValidation = yup.object().shape({
  size: sizeSchema,
});

export const updateSizeValidation = yup.object().shape({
  size: sizeSchema,
});

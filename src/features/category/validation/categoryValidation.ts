import * as yup from "yup";

export const addCategoryValidation = yup.object().shape({
  name: yup.string().required("category name is required"),
  image: yup
    .mixed()
    .required("Image is required")
    .test("fileSize", "File size must be less than 350KB", (value) => {
      return value instanceof File ? value.size <= 350 * 1024 : false; // 350KB in bytes
    })
    .test("fileType", "Only image files are allowed", (value) => {
      return value instanceof File
        ? ["image/jpeg", "image/png", "image/gif"].includes(value.type)
        : false;
    })
    .nullable(),
});

export const updateCategoryValidation = yup.object().shape({
  name: yup.string().required("Category name is required"),
  image: yup
      .mixed()
      .test("required", "Image is required", (value) => {
        console.log(value)
        return (
          value instanceof File || (typeof value === "string" && value !== "")
        );
      })
      .test("fileSize", "File size must be less than 350KB", (value) => {
        if (value instanceof File) {
          return value.size <= 350 * 1024;
        }
        return true; // Allow strings
      })
      .test("fileType", "Only image files are allowed", (value) => {
        if (value instanceof File) {
          return ["image/jpeg", "image/png", "image/gif"].includes(value.type);
        }
        return true; // Allow strings
      }),
  });
  
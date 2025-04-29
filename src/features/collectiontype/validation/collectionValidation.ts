import * as yup from "yup";

export const addCollectionValidation = yup.object().shape({
  name: yup.string().required("collection name is required"),
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

export const updateCollectionValidation = yup.object().shape({
  name: yup.string().required("Collection name is required"),
  image: yup.mixed().test("required", "Image is required", (value) => {
    return value instanceof File || (typeof value === "string" && value !== "");
  }),
  // image: yup
  //   .mixed()
  //   .test("fileRequired", "Image is required", (value) => {
  //     return value instanceof File || typeof value === "string";
  //   })
  //   .test("fileSize", "File size must be less than 350KB", (value) => {
  //     if (value instanceof File) {
  //       return value.size <= 350 * 1024; // 350KB
  //     }
  //     return true; // If it's a string, skip size check
  //   })
  //   .test("fileType", "Only image files are allowed", (value) => {
  //     if (value instanceof File) {
  //       return ["image/jpeg", "image/png", "image/gif"].includes(value.type);
  //     }
  //     return true; // If it's a string, skip type check
  //   }),
});

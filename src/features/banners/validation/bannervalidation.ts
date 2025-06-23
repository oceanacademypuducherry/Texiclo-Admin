import * as yup from "yup";

export const addBannerValidation = yup.object().shape({
  image: yup
    .mixed()
    .required("Image is required")
    .test("fileType", "Only JPG, PNG, and GIF images are allowed", (value) => {
      if (!value || !(value instanceof File)) return false;
      const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
      return allowedTypes.includes(value.type);
    })
    .test("fileSize", "Image must be less than 350KB", (value) => {
      if (!value || !(value instanceof File)) return false;
      return value.size <= 350 * 1024;
    }),
});

// export const bulkEditValidation = yup.object().shape({
//   position: yup
//     .number()
//     .typeError("Position must be a number")
//     .required("Position is required")
//     .integer("Position must be an integer")
//     .min(1, "Position must be at least 1"),

//   image: yup
//     .mixed()
//     .required("Image is required")
//     .test("fileType", "Only JPG, PNG, and GIF images are allowed", (value) => {
//       if (!value || !(value instanceof File)) return false;
//       const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
//       return allowedTypes.includes(value.type);
//     })
//     .test("fileSize", "Image must be less than 350KB", (value) => {
//       if (!value || !(value instanceof File)) return false;
//       return value.size <= 350 * 1024;
//     }),
// });
// export const bulkEditValidation = yup.object().shape({
//   banners: yup.array().of(
//     yup.object().shape({
//       id: yup.string().required(),
//       position: yup
//         .number()
//         .typeError("Position must be a number")
//         .required("Position is required")
//         .integer("Must be an integer")
//         .min(1, "Minimum position is 1"),
//       image: yup
//         .mixed()
//         .required("Image is required")
//         .test("fileType", "Only JPG, PNG, and GIF allowed", (value) => {
//           if (!value || typeof value === "string") return true;
//           return ["image/jpeg", "image/png", "image/gif"].includes(value.type);
//         })
//         .test("fileSize", "Image must be less than 350KB", (value) => {
//           if (!value || typeof value === "string") return true;
//           return value.size <= 350 * 1024;
//         }),
//     }),
//   ),
// });

export const bulkEditValidation = yup.object().shape({
  banners: yup
    .array()
    .of(
      yup.object().shape({
        id: yup.string().required(),
        position: yup
          .number()
          .typeError("Position is required")
          .required("Position is required")
          .integer("Must be an integer")
          .min(1, "Minimum position is 1"),
        image: yup
          .mixed()
          .required("Image is required")
          .test("fileType", "Only JPG, PNG, and GIF allowed", (value) => {
            if (!value || typeof value === "string") return true;
            return ["image/jpeg", "image/png", "image/gif"].includes(
              value.type,
            );
          })
          .test("fileSize", "Image must be less than 350KB", (value) => {
            if (!value || typeof value === "string") return true;
            return value.size <= 350 * 1024;
          }),
      }),
    )
    .min(1, "At least one banner is required")
    .test("unique-positions", "Positions must be unique", (banners) => {
      if (!banners) return false;
      const positions = banners.map((b) => b.position);
      const unique = new Set(positions);
      return unique.size === positions.length;
    })
    .test(
      "sequential-positions",
      "Positions must be sequential starting from 1 (e.g. 1, 2, 3)",
      (banners) => {
        if (!banners) return false;
        const positions = banners.map((b) => b.position).sort((a, b) => a - b);
        return positions.every((val, idx) => val === idx + 1);
      },
    ),
});

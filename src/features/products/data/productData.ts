import { PRODUCT1, PRODUCT2, TSHIRT } from "../../../assets";

export const ProductsData = [
  {
    id: "1",
    name: "Mens printed t-shirts",
    image: TSHIRT,
    images: [TSHIRT, PRODUCT1, PRODUCT2],
    previewImage: PRODUCT1, // ✅ added
    price: 2899,
    discountPrice: 2562,
    discount: 9,
    gsm: [120, 140, 160, 180, 200, 220],
    colors: "Gray",
    sizes: ["XS", "M", "XL", "XXL", "3XL"],
    types: ["Half Sleeve", "Full Sleeve"],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tristique malesuada elit, ut facilisis tellus elementum id. Nullam id consectetur diam.",
    category: "Men", // ✅ added
    collectionType: "Summer", // ✅ added
  },
  {
    id: "2",
    name: "Casual Crew Neck T-Shirt",
    image: TSHIRT,
    images: [TSHIRT, TSHIRT, TSHIRT, TSHIRT],
    previewImage: TSHIRT,
    price: 1999,
    discountPrice: 1749,
    discount: 12,
    gsm: [140, 160, 180],
    colors: "White",
    sizes: ["S", "M", "L", "XL"],
    types: ["Half Sleeve"],
    description: "Comfortable and stylish crew neck t-shirt for everyday wear.",
    category: "Men",
    collectionType: "Casual",
  },
  {
    id: "3",
    name: "Graphic Print Tee",
    image: TSHIRT,
    images: [TSHIRT, TSHIRT, TSHIRT],
    previewImage: TSHIRT,
    price: 1499,
    discountPrice: 1249,
    discount: 17,
    gsm: [160, 180],
    colors: "Yellow",
    sizes: ["M", "L", "XL"],
    types: ["Full Sleeve"],
    description:
      "Trendy graphic print t-shirt designed for young fashion lovers.",
    category: "Unisex",
    collectionType: "Trendy",
  },
  {
    id: "4",
    name: "Plain Cotton T-Shirt",
    image: TSHIRT,
    images: [TSHIRT, TSHIRT],
    previewImage: TSHIRT,
    price: 899,
    discountPrice: 749,
    discount: 17,
    gsm: [140, 160],
    colors: "Gray",
    sizes: ["XS", "S", "M"],
    types: ["Half Sleeve"],
    description:
      "Soft and breathable plain t-shirt made of pure cotton fabric.",
    category: "Men",
    collectionType: "Essentials",
  },
  // You can uncomment and update product 5 similarly
];

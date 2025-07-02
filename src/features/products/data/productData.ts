import { PRODUCT1, PRODUCT2, TSHIRT } from "../../../assets";



export const ProductsData = [
  {
    id: "1",
    name: "Mens printed t-shirts",
    image: PRODUCT1,
    price: 2899,
    discountPrice: 2562,
    discount: 9,
    type: "Half Sleeve",
    colors: [
      { name: "Black", code: "#000000", image: PRODUCT1 },
      { name: "Red", code: "#ff0000", image: PRODUCT2 },
      { name: "Gray", code: "#808080", image: TSHIRT },
      { name: "Green", code: "#00ff00", image: TSHIRT },
      { name: "Beige", code: "#f5f5dc", image: TSHIRT },
    ],
    category: "Men",
    collectionType: "Summer",
  },

];
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetForm } from "../redux";

export const AddProductBtn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleAdd = () => {
    dispatch(resetForm());
    navigate("/addproduct");
  };

  return (
    <button
      onClick={handleAdd}
      className="bg-primary hover:bg-secondary hover:text-primary text-secondary lg:text-md rounded-md px-4 py-2 text-sm font-medium transition-all duration-300 sm:px-3 sm:py-2 sm:text-[16px] xl:px-3 xl:py-2 xl:text-lg"
    >
      Add Product
    </button>
  );
};

import { useNavigate } from "react-router-dom";

export const BackBtn = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <button
      onClick={handleBackClick}
      className="bg-secondary rounded px-4 py-2 text-white"
    >
      Back
    </button>
  );
};

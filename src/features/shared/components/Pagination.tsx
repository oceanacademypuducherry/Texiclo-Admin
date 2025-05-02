import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

export const Pagination = () => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 p-4">
      {[1, 2, 3, 4].map((num) => (
        <div
          key={num}
          className="bg-secondary flex h-[30px] min-w-[30px] items-center justify-center rounded-2xl px-2 text-sm text-white"
        >
          {num}
        </div>
      ))}
      <MdOutlineKeyboardDoubleArrowRight size={24} className="text-secondary" />
    </div>
  );
};

import { MdOutlineKeyboardDoubleArrowRight as Arrow } from "react-icons/md";

interface Props {
  current: number;
  total: number;
  onChange: (page: number) => void;
}

export const Pagination = ({ current, total, onChange }: Props) => {
  const nums = Array.from({ length: total }, (_, i) => i + 1);

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 p-4">
      {nums.map((n) => (
        <button
          key={n}
          onClick={() => onChange(n)}
          className={`flex h-[30px] min-w-[30px] items-center justify-center rounded-2xl px-2 text-sm ${n === current ? "bg-primary text-white" : "bg-secondary text-white/70"}`}
        >
          {n}
        </button>
      ))}
      <Arrow
        size={24}
        className={`text-secondary cursor-pointer ${current === total && "opacity-40"}`}
        onClick={() => current < total && onChange(current + 1)}
      />
    </div>
  );
};

import clsx from "clsx";
import { useState } from "react";

export default function PrevArrow({ onClick, className }) {
  const [onHover, setOnHover] = useState(false);
  const handleHover = () => setOnHover(!onHover);
  return (
    <svg
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
      stroke={onHover ? "white" : "black"}
      className={clsx(
        "w-[40px] h-[40px] rounded-full absolute top-50 left-1 z-10 cursor-pointer hover:bg-black hover:text-white text-black bg-white shadow-lg transition-all duration-300",
        className
      )}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 19.5 8.25 12l7.5-7.5"
      />
    </svg>
  );
}

import clsx from "clsx";
import { useState } from "react";

export default function NextArrow({ onClick, className }) {
  const [onHover, setOnHover] = useState(false);
  const handleHover = () => setOnHover(!onHover);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      onClick={onClick}
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
      stroke={onHover ? "white" : "black"}
      className={clsx(
        "w-[40px] h-[40px] rounded-full absolute top-50 right-1 cursor-pointer hover:bg-black hover:text-white text-black bg-white shadow-lg transition-all duration-300",
        className
      )}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m8.25 4.5 7.5 7.5-7.5 7.5"
      />
    </svg>
  );
}

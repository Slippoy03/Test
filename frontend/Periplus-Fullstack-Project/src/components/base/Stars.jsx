import clsx from "clsx";
import "./css/stars.css";
const Stars = ({ ratings, className }) => {
  const roundedRating = Math.round(ratings * 2) / 2;
  return (
    <div className="flex">
      {[...Array(5)].map((_, index) => {
        const starClass =
          index + 1 <= roundedRating
            ? "text-[#FFBA49]"
            : index + 0.5 === roundedRating
            ? "half-star"
            : "text-gray-400";

        return (
          <span
            key={index}
            className={clsx(`${starClass} text-lg relative`, className)}
            style={{ width: "1em" }}
          >
            ★
          </span>
        );
      })}
    </div>
  );
};
export default Stars;

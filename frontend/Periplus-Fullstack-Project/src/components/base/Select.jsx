import clsx from "clsx";

const SelectOption = ({ children, className, ...props }) => {
  return (
    <select {...props} className={clsx("outline-none", className)}>
      {children}
    </select>
  );
};

export default SelectOption;

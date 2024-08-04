import clsx from "clsx";

const FooterDetail = ({ children, title, className }) => {
  return (
    <div className="xl:px-[15%] xl:mt-3">
      <div className="bg-white py-4">
        <h1
          className={clsx(
            "text-orange-400 text-xl border-b border-b-gray-300 px-5 py-3 mb-4",
            className
          )}
        >
          {title}
        </h1>
        {children}
      </div>
    </div>
  );
};
export default FooterDetail;

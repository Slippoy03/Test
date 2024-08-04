import Button from "../../base/Button";
import Stars from "../../base/Stars";
const Testimonials = () => {
  const ratings = 3.5;
  return (
    <div className="bg-white py-10 font-poppins px-5">
      <h1 className="font-bold text-xl text-center">Customer Testimonials</h1>
      <div className="h-0.5 w-[50px] bg-main-red mx-auto my-4 "></div>
      {/* Disesuaikan dengan data dari backend */}
      <div className="xl:flex md:grid md:grid-cols-2 md:gap-x-5 md:px-10">
        {Array.from({ length: 5 }, (_, idx) => (
          <div className="flex flex-col gap-y-1 items-center mt-10" key={idx}>
            <p className="italic text-sm text-gray-700 font-semibold text-center">
              “best online book shop until now. where are the bargain books btw?
              there used to ...”
            </p>
            <Stars ratings={ratings} />
            <small className="text-red-900 font-semibold text-sm">
              Michael
            </small>
            <small className="text-gray-500 text-sm">Banten</small>
          </div>
        ))}
      </div>
      {/* Disesuaikan dengan data dari backend */}
      <div className="flex justify-center mt-10">
        <Button
          className={
            "mx-auto text-white rounded-full hover:animate-colorTransition hover:bg-orange-400 px-4 py-[7px]"
          }
        >
          View More
        </Button>
      </div>
    </div>
  );
};
export default Testimonials;

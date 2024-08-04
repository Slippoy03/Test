import images from "../../image/imageGalery";
import { contact, socialMedia, textFooter } from "./textFooter";

const Footer = () => {
  const image = [
    {
      title: "Delivery By:",
      img: images?.shipping,
    },
    {
      title: "Payment Methods:",
      img: images?.payments,
    },
    {
      title: "",
      img: images?.banks,
    },
    {
      title: "Secured By:",
      img: images?.digicert,
    },
  ];

  return (
    <main className="font-poppins bg-white py-8">
      <div className="flex flex-col gap-y-10 px-3 xl:flex-row xl:justify-between xl:px-[15%]">
        {image?.map((item, i) => (
          <div className="flex flex-col items-center xl:gap-y-3" key={i}>
            <h1 className="text-blue-400 font-bold text-xl">{item?.title}</h1>
            <img src={item?.img} alt="" />
          </div>
        ))}
      </div>
      <div className="flex flex-col xl:flex xl:flex-row xl:justify-between gap-y-4 px-5 mt-16 xl:px-[15%] md:grid md:grid-cols-2">
        {textFooter?.map((item, idx) => (
          <div className="flex flex-col gap-y-2" key={idx}>
            <h1 className="font-bold text-lg xl:text-xl">{item?.Title}</h1>
            <div>
              {item?.subTitle?.map((item, i) => (
                <p
                  className="w-1/2 xl:w-full my-2 text-sm xl:text-sm hover:translate-x-4 cursor-pointer hover:text-orange-400 transition-all duration-300 p-0.5"
                  key={i}
                  onClick={() => alert(`navigasi ke ${item?.link}${item?.sub}`)}
                >
                  {item?.sub}
                </p>
              ))}
            </div>
          </div>
        ))}
        {socialMedia?.map((item, idx) => (
          <div key={idx} className="flex flex-col gap-y-2">
            <h1 className="font-bold text-lg xl:text-xl">{item?.Title}</h1>
            <div>
              {item?.subTitle?.map((item, i) => (
                <div
                  key={i}
                  className={`${
                    item?.icon ? "flex items-center gap-x-1 my-2" : ""
                  }`}
                >
                  <img
                    src={item?.icon}
                    className={`${
                      item?.sub
                        ? "w-4  h-4"
                        : "mt-2 w-32 hover:translate-x-2 transition duration-300 cursor-pointer"
                    }`}
                  />
                  <p
                    className={`${
                      item?.icon &&
                      "hover:text-orange-400 hover:translate-x-2 transition-all duration-300 cursor-pointer "
                    } xl:text-sm`}
                  >
                    {item?.sub}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="flex flex-col gap-y-2">
          <h1 className="font-bold text-lg">Contact Us</h1>
          <div className="flex flex-col gap-y-3 xl:text-sm">
            <p>Monday - Sunday (08:00 - 17.00)</p>
            <div>
              <p>Customer Care : </p>
              (+62) 21 4682 1089
            </div>
            <p>Product Related :</p>
            <div>
              {contact?.map((item, i) => (
                <a
                  href={`${item?.link}${item?.number}`}
                  className="flex items-center gap-x-1 my-2 hover:text-orange-400 hover:translate-x-2 transition-all duration-300 w-2/3"
                >
                  <img src={images?.whatsapp} alt="" className="w-5 h-5" />
                  <p className="text-sm">{item?.number} (Text Only)</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Footer;

import { useState } from "react";
import images from "../../../image/imageGalery";


const NavMobile = ({ open }) => {
  const [menu, setMenu] = useState("");
  const handleMenu = (title) => {
    if (title === menu) {
      setMenu("");
      return;
    }
    setMenu(title);
  };
  //disesuaikan dengan root navigasi
  const NAVMENU = [
    {
      title: "Categories",
      subTitle: [
        {
          link: "/",
          sub: "Books",
        },
        {
          link: "/",
          sub: "Books On Indonesia",
        },
        {
          link: "/",
          sub: "Academic Books",
        },
        {
          link: "/",
          sub: "Magazine",
        },
        {
          link: "/",
          sub: "Stationery",
        },
        {
          link: "/",
          sub: "Travel Accessories",
        },
        {
          link: "/",
          sub: "Toys",
        },
        {
          link: "/",
          sub: "Greeting Card",
        },
        {
          link: "/",
          sub: "Gift Voucher",
        },
      ],
    },
    {
      title: "New Release",
    },
    {
      title: "Pre Orders",
      subTitle: [
        {
          link: "/",
          sub: "Down Payment",
        },
        {
          link: "/",
          sub: "Full Price",
        },
      ],
    },
    {
      title: "Bargain Books",
      subTitle: [
        {
          link: "/",
          sub: "Under Rp.50.000",
        },
        {
          link: "/",
          sub: "Rp. 50.000 - Rp.100.000",
        },
        {
          link: "/",
          sub: "Above Rp.100.000",
        },
      ],
    },
    {
      title: "Wishlist",
    },
    {
      title: "Store Location",
    },
    {
      title: "PEC Barcode",
    },
    {
      title: "My Account",
      subTitle: [
        {
          link: "/",
          sub: "Login",
        },
        {
          link: "/",
          sub: "Register",
        },
        {
          link: "/",
          sub: "Forgotten Password",
        },
        {
          link: "/",
          sub: "View Orders History",
        },
        {
          link: "/",
          sub: "Purchase Products Review",
        },
        {
          link: "/",
          sub: "Finalized Preorder Payments",
        },
        {
          link: "/",
          sub: "Payment Confirmation",
        },
        {
          link: "/",
          sub: "Write Testimonials",
        },
        {
          link: "/",
          sub: "PEC Member Details",
        },
      ],
    },
  ];
  return (
    <div
      className={`transition-max-height duration-300 ease-in-out ${
        open ? "max-h-screen" : "max-h-0 overflow-hidden"
      }`}
    >
      {NAVMENU?.map((item, i) => (
        <div key={i}>
          <div
            className="flex items-center gap-x-3 py-1"
            onClick={() => handleMenu(item?.title)}
          >
            <p className="hover:text-yellow-500 transition-colors duration-300 text-sm">
              {item?.title}
            </p>
            {item?.subTitle && (
              <img
                src={images?.arrownav}
                alt=""
                className={`${
                  menu === item?.title ? "rotate-90" : ""
                } h-3 w-3 transition-transform duration-300`}
              />
            )}
          </div>
          <div
            className={`overflow-hidden transition-max-height duration-300 ease-in-out ${
              menu === item?.title ? "max-h-72" : "max-h-0"
            } ml-4`}
          >
            {item?.subTitle?.map((subItem, j) => (
              <div
                onClick={() =>
                  alert(`navigasi ke : path ${subItem?.link} ${subItem?.sub}`)
                }
                key={j}
                className="text-gray-800 text-xs py-0.5 hover:text-yellow-500 transition-colors duration-300"
              >
                {subItem?.sub}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
export default NavMobile;

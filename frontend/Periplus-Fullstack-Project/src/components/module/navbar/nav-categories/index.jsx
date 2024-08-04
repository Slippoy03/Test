import { useState } from "react";

const NavCategories = () => {
  const [open, setOpen] = useState("");
  const handleOpen = (title) => {
    if (title === open) {
      return setOpen(null);
    }
    setOpen(title);
  };

  //navigasi
  const items = [
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
  ];
  return (
    <div className="hidden xl:relative xl:flex bg-gray-100 h-8 px-[18%] gap-x-5 font-poppins shadow-md">
      {items?.map((item, i) => (
        <div
          onMouseEnter={() => handleOpen(item?.title)}
          onMouseLeave={() => setOpen("")}
          className="relative flex gap-x-1 hover:bg-red-700 hover:text-white px-3 items-center transition-colors duration-300 cursor-pointer font-semibold"
          key={i}
        >
          <p className="text-sm">{item?.title}</p>
          {item?.subTitle && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          )}
          <div
            className={`${
              open === item?.title && item?.subTitle
                ? "bg-white min-w-[250px] py-2 animate-slideDown absolute top-8 left-0 shadow-xl"
                : "max-h-0 animate-slideUp hidden"
            } z-10 transition-all duration-300 text-black`}
          >
            {item?.subTitle?.map((subItem) => (
              <p
                onClick={() => alert(`navigasi ke: ${subItem?.link} ${subItem?.sub}`)}
                key={subItem}
                className="my-1 hover:bg-main-red hover:text-white px-5 py-2 transition-colors duration-200"
              >
                {subItem?.sub}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
export default NavCategories;

import { useState } from "react";
import { useScrollNav } from "../../../hooks/useScrollNav";
import Jumbotron from "../jumbotron";
import NavLogo from "./nav-logo";
import NavMobile from "./nav-mobile";
import NavSearch from "./nav-search";
import NavAuth from "./nav-auth";
import NavCategories from "./nav-categories";

const Navbar = ({ jumbotron }) => {
  const show = useScrollNav();
  const [open, setOpen] = useState(false);
  return (
    <nav>
      <div
        className={`sticky md:fixed xl:fixed top-0 w-full transition-transform duration-700 transform ${
          show ? "translate-y-0" : "-translate-y-full"
        } font-poppins !z-50`}
      >
        <div className="bg-main-red shadow-md xl:h-20 min-h-full xl:px-[15%] md:px-10 px-5 py-3 flex flex-col xl:flex-row justify-around xl:items-center gap-x-0 gap-y-2 xl:gap-x-2">
          <NavLogo open={open} setOpen={setOpen} />
          {/* list yang ada di hamburger menu */}
          <NavMobile open={open} />
          {/* list yang ada di hamburger menu */}
          <NavSearch />
          <NavAuth />
        </div>
        <NavCategories />
      </div>
      {jumbotron && (
        <div className="md:mt-36 xl:mt-28">
          <Jumbotron />
        </div>
      )}
    </nav>
  );
};

export default Navbar;

import { useEffect, useState } from "react";

export const useScrollNav = () => {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY <= 150 || currentScrollY >= 600) {
      setShow(true);
    } else if (currentScrollY > 150 && currentScrollY < 600) {
      if (currentScrollY < lastScrollY) {
        setShow(true); 
      } else {
        setShow(false);
      }
    }

    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  return show;
};

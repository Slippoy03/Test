import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

export const useSlideShow = () => {
  const [slideShow, setSlideShow] = useState(6);

  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 768px) and (max-width: 1023px)",
  });
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  useEffect(() => {
    if (isDesktop) {
      setSlideShow(6);
    } else if (isTablet) {
      setSlideShow(4);
    } else if (isMobile) {
      setSlideShow(2);
    }
  }, [isDesktop, isTablet, isMobile]);
  return slideShow;
};

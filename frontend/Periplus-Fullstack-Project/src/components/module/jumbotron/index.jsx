import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import images from "../../image/imageGalery";

const Jumbotron = () => {
  const banner = [
    images?.banner1,
    images?.banner2,
    images?.banner3,
    images?.banner4,
    images?.banner5,
  ];
  const settings = {
    infinite: true,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    cssEase: "linear",
    centerPadding: "0px",
  };

  return (
    <div className="max-w-screen overflow-hidden relative">
      <Slider {...settings}>
        {banner.map((item, idx) => (
          <div key={idx}>
            <img
              key={idx}
              className="object-fit xl:h-[400px] rounded max-w-full cursor-pointer"
              src={item}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Jumbotron;

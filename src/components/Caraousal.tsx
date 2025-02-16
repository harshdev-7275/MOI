import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import resultImage1 from "../assets/result-1.jpeg"
import resultImage2 from "../assets/result-2.jpeg"
import resultImage3 from "../assets/result-3.jpeg"
import resultImage4 from "../assets/result-4.jpeg"

const floorPlanViews = [
  { name: "Room 1", image: resultImage1, cameras: 2 },
  { name: "Room 2", image: resultImage2, cameras: 3 },
  { name: "Room 3", image: resultImage3, cameras: 2 },
  { name: "Room 4", image: resultImage4, cameras: 4 },
];

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="w-[calc(100vw-2rem)] mx-auto px-10 mt-6"> 
      <Slider {...settings} className="w-full h-full">
        {floorPlanViews.map((room, index) => (
          <div key={index} className="p-2">
            <div className="relative rounded-lg overflow-hidden shadow-lg w-[200px] h-[200px]">
              <img src={room.image} alt={room.name} className="w-64 h-64 object-cover" />
              <div className="p-4 bg-inherit absolute -top-10 left-0 bg-black w-fulll">
                <h3 className="text-lg font-semibold">{room.name}</h3>
                <p className="text-gray-600">Cameras: {room.cameras}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
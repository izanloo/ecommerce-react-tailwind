import image1 from '../../assest/images/carousel1920x440.jpeg'
import image2 from '../../assest/images/carousel2-1920x440.webp'
import image3 from '../../assest/images/carousel3-1920x440.webp'

import React from 'react'

const Slide = (props) => {
  return (
    <div className='carouselStyle relative h-72 pt-24 ' style= { {backgroundImage:`url(${props.image.link})`} } >
      <img src={props.image.link} alt="Sliderr_image" className='h-full w-full object-cover hidden' />
      <h3 className='absolute right-5 bottom-36 text-white'>
        {props.image.title}
      </h3>
      <span className='absolute bottom-0  inline-block ' >
        <button onClick={props.slidePrev} className="border text-white rounded-full px-2 py-0.5 bg-sky-800 mx-1">
          {"<"}
        </button>

        <button onClick={props.slideNext}  className="border text-white rounded-full px-2 py-0.5 bg-sky-800 mx-1">
          {">"}
        </button>
      </span>
    </div>
  );
};
const Carausel = (props) => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const slides = [
    {
      id: 1,
      title: "گوشی شیائومی",
      link: image1
    },
    {
      id: 2,
      title: "گوشی های سامسونگ مناسب باهر بودجه ای",
      link: image2
    },
    {
      id: 3,
      title: "50 تومان تخیف برای اولین سفارش شما",
      link: image3
    }
  ];
  const slideNext = (e) => {
    setCurrentSlide((prev) => {
      return prev + 1 === slides.length ? 0 : currentSlide + 1;
    });
  };
  const slidePrev = (e) => {
    setCurrentSlide((prev) => {
      return prev === 0 ? slides.length - 1 : currentSlide - 1;
    });
  };
  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSlide((prev) => {
        return prev + 1 === slides.length ? 0 : prev + 1;
      });
    }, 10000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  return (
    <>
      <Slide
        image={slides[currentSlide]}
        slideNext={slideNext}
        slidePrev={slidePrev}
        width="100%"
      />
    </>
  );
};


export default Carausel
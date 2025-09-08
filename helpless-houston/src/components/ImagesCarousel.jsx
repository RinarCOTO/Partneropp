import { useState } from "react";
import ArrowPrev from "../assets/icons/arrow-prev.svg";
import ArrowNext from "../assets/icons/arrow-next.svg";

const Carousel = ({ images }) => {
  const [current, setCurrent] = useState(0);
  const totalSlides = images.length;

  const nextSlide = () => setCurrent((prev) => (prev + 1) % totalSlides);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + totalSlides) % totalSlides);
  const goToSlide = (index) => setCurrent(index);

  return (
    <div className="relative w-full mx-auto">
      {/* Slides wrapper with clipping + rounded corners */}
      <div className="relative md:w-[1220px] md:h-[462px] mx-auto rounded-[30px] overflow-hidden">
        <img
          key={current}
          src={images[current].src}
          width={images[current].width}
          height={images[current].height}
          alt={`Slide ${current + 1}`}
          loading={current === 0 ? "eager" : "lazy"}
          fetchPriority={current === 0 ? "high" : undefined}
          className="w-full h-full object-contain transition-opacity duration-500 ease-in-out"
        />
      </div>

      {/* Navigation arrows (outside clipping) */}
      <button
        onClick={prevSlide}
        aria-label="Previous slide"
        className="absolute -left-2 top-1/2 -translate-y-1/2 px-3 py-2"
      >
        <img src={ArrowPrev.src} alt="" />
      </button>
      <button
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute -right-2 top-1/2 -translate-y-1/2 px-3 py-2"
      >
        <img src={ArrowNext.src} alt="" />
      </button>

      {/* Pagination */}
      <div className="absolute bottom-[-50px] w-full flex justify-center space-x-[20px]">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            className={`w-3 h-3 rounded-full transition-colors ${
              i === current ? "bg-[#8400FF]" : "bg-white"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;

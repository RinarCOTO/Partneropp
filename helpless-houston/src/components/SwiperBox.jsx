import React from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import ArrowOutward from '../assets/icons/arrow-outward.svg';
import '@splidejs/react-splide/css';
import '././swiper-box.css';
const SwiperBox = ({ slides }) => {
  return (
    <Splide
      aria-label="Featured Content Slider"
      options={{
        rewind: true,
        perPage: 3,
        gap: '30px',
        arrows: true,
        pagination: false,
        autoplay: true,
        interval: 3000,
        pauseOnHover: true,
        drag: true,
        classes: {
          arrows: 'splide__arrows splide-arrows',
          arrow: 'splide__arrow splide-arrow',
          prev: 'splide__arrow--prev splide-arrow-prev',
          next: 'splide__arrow--next splide-arrow-next',
        },
      }}
    >
      {slides.map((slide, index) => (
        <SplideSlide key={index} className="md:h-[218px] swiper-box-card pt-[30px] pb-[70px] px-[38px]">
          <div className="flex flex-col gap-[20px]">
              <img
                src={ArrowOutward.src}
                alt={slide.alt || 'Slide icon'}
                className="w-8 h-8 mr-4"
              />
            <p className="font-roboto text-[20px] text-white/80 leading-[33.221px]">
              {slide.text && (
                <span className="font-[800]">{slide.text}</span>
              )}
              {slide.content}
            </p>
          </div>
        </SplideSlide>
      ))}
    </Splide>
  );
};

export default SwiperBox;
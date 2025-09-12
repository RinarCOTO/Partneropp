import { useState, useEffect, useRef } from "react";
import { ArrowButton } from "./ArrowButton";

const Carousel = ({ images, autoplaySpeed = 5000, autoplay = true }) => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const totalSlides = images.length;
  const autoplayTimerRef = useRef(null);

  // Animation constants
  const ANIMATION_DURATION = 600;
  
  // Animation state tracking
  const [isAnimating, setIsAnimating] = useState(false);
  const [navAnimating, setNavAnimating] = useState(false);
  
  // Helper to handle animation state for all slide changes
  const handleSlideChange = (updateCurrentFn) => {
    if (isAnimating) return; // Prevent rapid clicking
    
    setIsAnimating(true);
    setNavAnimating(true);
    
    // Update slide with the provided function
    updateCurrentFn();
    
    // Release animation locks after transitions complete
    setTimeout(() => setIsAnimating(false), ANIMATION_DURATION);
    setTimeout(() => setNavAnimating(false), ANIMATION_DURATION);
  };
  
  // Navigation functions using the common handler
  const nextSlide = () => {
    handleSlideChange(() => setCurrent((prev) => (prev + 1) % totalSlides));
  };
  
  const prevSlide = () => {
    handleSlideChange(() => setCurrent((prev) => (prev - 1 + totalSlides) % totalSlides));
  };
  
  const goToSlide = (index) => {
    if (index === current) return; // Don't change if already on this slide
    handleSlideChange(() => setCurrent(index));
  };
  
  // Setup and cleanup for autoplay functionality
  useEffect(() => {
    if (!autoplay || isPaused) return;
    
    // Start the autoplay timer
    autoplayTimerRef.current = setInterval(() => {
      nextSlide();
    }, autoplaySpeed);
    
    // Clean up the timer when the component unmounts or dependencies change
    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
    };
  }, [autoplay, isPaused, autoplaySpeed, totalSlides]);

  // Pause autoplay when user interacts with carousel
  const pauseAutoplay = () => setIsPaused(true);
  const resumeAutoplay = () => setIsPaused(false);

  return (
    <div 
      className="relative w-full mx-auto mt-[50px]"
      onMouseEnter={pauseAutoplay}
      onMouseLeave={resumeAutoplay}
      onTouchStart={pauseAutoplay}
      onTouchEnd={resumeAutoplay}
    >
      {/* Slides wrapper with clipping + rounded corners */}
      <div className="relative md:w-[1228px] md:h-[462px] mx-auto rounded-[30px] overflow-hidden">
        {/* Overlay mask with border radius to ensure consistent rounded corners */}
        <div className="absolute inset-0 rounded-[30px] pointer-events-none z-10" 
          style={{
            boxShadow: "0 0 0 2px white",
            margin: "-1px"
          }}
        />
        {images.map((image, index) => {
          // Simple position logic - current slide at 0, all others at 100%
          const position = index === current ? 0 : 1;
          
          return (
            <div
              key={index}
              className="absolute w-full h-full will-change-transform rounded-[30px] overflow-hidden"
              style={{
                transform: `translateX(${position * 100}%)`,
                opacity: index === current ? 1 : 0.5,
                transition: `transform ${ANIMATION_DURATION}ms cubic-bezier(0.25, 0.1, 0.25, 1), opacity 500ms ease-out`,
                // Hide slides that aren't current or next for better performance
                display: index === current || index === (current + 1) % totalSlides ? 'block' : 'none',
                // Hardware acceleration for smoother animations
                WebkitBackfaceVisibility: 'hidden',
                backfaceVisibility: 'hidden'
              }}
            >
              <img
                src={image.src}
                width={image.width}
                height={image.height}
                alt={`Slide ${index + 1}`}
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : undefined}
                className="w-full h-full object-cover rounded-[30px]"
              />
            </div>
          );
        })}
      </div>

      {/* Navigation arrows (outside clipping) - with increased z-index */}
      <ArrowButton
        direction="prev"
        onClick={() => {
          prevSlide();
          pauseAutoplay();
        }}
        className={`absolute -left-2 px-3 py-2 z-20 transition-all duration-500 ease-in-out ${
          navAnimating 
            ? "top-[calc(50%+100px)] -translate-y-1/2" 
            : "top-1/2 -translate-y-1/2"
        }`}
      />
      <ArrowButton
        direction="next"
        onClick={() => {
          nextSlide();
          pauseAutoplay();
        }}
        className={`absolute -right-2 px-3 py-2 z-20 transition-all duration-500 ease-in-out ${
          navAnimating 
            ? "top-[calc(50%+100px)] -translate-y-1/2" 
            : "top-1/2 -translate-y-1/2"
        }`}
      />

      {/* Pagination - dynamically positioned with animation */}
      <div 
        className={`absolute w-full flex justify-center space-x-[20px] z-20 transition-all duration-500 ease-in-out ${
          navAnimating 
            ? "bottom-[-50px]" 
            : "top-[-50px]"
        }`}
      >
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              goToSlide(i);
              pauseAutoplay();
            }}
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

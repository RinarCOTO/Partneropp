import { useState, useEffect, useRef } from "react";
import { ArrowButton } from "./ArrowButton";

const Carousel = ({ images, autoplaySpeed = 5000, autoplay = true }) => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const totalSlides = images.length;
  const autoplayTimerRef = useRef(null);

  // Track animation state to prevent rapid clicks during transition
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Track when navigation buttons should animate
  const [navAnimating, setNavAnimating] = useState(false);
  
  // Function to advance to the next slide with animation lock
  const nextSlide = () => {
    if (isAnimating) return; // Prevent rapid clicking during animation
    setIsAnimating(true);
    setNavAnimating(true);
    
    // Move to next slide
    setCurrent((prev) => (prev + 1) % totalSlides);
    
    // Release animation locks after transitions complete
    setTimeout(() => setIsAnimating(false), 600);
    
    // Reset navigation and pagination animation after completion
    setTimeout(() => setNavAnimating(false), 600);
  };
  
  // Previous function with animation lock
  const prevSlide = () => {
    if (isAnimating) return; // Prevent rapid clicking during animation
    setIsAnimating(true);
    setNavAnimating(true);
    
    setCurrent((prev) => (prev - 1 + totalSlides) % totalSlides);
    
    // Release animation locks after transitions complete
    setTimeout(() => setIsAnimating(false), 600);
    
    // Reset navigation and pagination animation after completion
    setTimeout(() => setNavAnimating(false), 600);
  };
  
  // Direct navigation with animation lock
  const goToSlide = (index) => {
    if (isAnimating || index === current) return; // Prevent during animation or if clicking current
    setIsAnimating(true);
    setNavAnimating(true);
    
    setCurrent(index);
    
    // Release animation locks after transitions complete
    setTimeout(() => setIsAnimating(false), 600);
    
    // Reset navigation and pagination animation after completion 
    setTimeout(() => setNavAnimating(false), 600);
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
      <div className="relative md:w-[1220px] md:h-[462px] mx-auto rounded-[30px] overflow-hidden">
        {/* Overlay mask with border radius to ensure consistent rounded corners */}
        <div className="absolute inset-0 rounded-[30px] pointer-events-none z-10" 
          style={{
            boxShadow: "0 0 0 30px white",
            margin: "-1px"
          }}
        />
        {images.map((image, index) => {
          // Calculate the position more intelligently for a smoother right-to-left flow
          // Current slide is at 0%, next slide is at 100%, others are positioned intelligently
          let position;
          
          if (index === current) {
            position = 0; // Current slide centered
          } else if (index === (current + 1) % totalSlides) {
            position = 1; // Next slide to the right
          } else {
            position = 1; // All others to the right, but hidden with display:none
          }
          
          return (
            <div
              key={index}
              className="absolute w-full h-full will-change-transform rounded-[30px]"
              style={{
                transform: `translateX(${position * 100}%)`,
                opacity: index === current ? 1 : 0.5,
                // Improved animation timing function for smoother transitions
                transition: 'transform 600ms cubic-bezier(0.25, 0.1, 0.25, 1), opacity 500ms ease-out',
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
                className="w-full h-full object-contain rounded-[30px]"
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

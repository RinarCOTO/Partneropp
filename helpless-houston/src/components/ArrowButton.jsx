import { useState } from 'react';
import ArrowPrev from "../assets/icons/arrow-prev.svg";
import ArrowNext from "../assets/icons/arrow-next.svg";

export const ArrowButton = ({ direction, onClick, className }) => {
  const [isHovered, setIsHovered] = useState(false);
  const ArrowIcon = direction === 'prev' ? ArrowPrev : ArrowNext;
  
  const darkColor = '#6a00cc'; // Darker purple color for hover state
  const normalColor = '#8400FF'; // Original purple color
  
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={direction === 'prev' ? 'Previous slide' : 'Next slide'}
      className={className}
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="60" 
        height="60" 
        viewBox="0 0 60 60" 
        fill="none"
      >
        {/* Ellipse that changes color on hover */}
        <ellipse 
          cx="30" 
          cy="30" 
          rx="30" 
          ry="30" 
          fill={isHovered ? darkColor : normalColor}
          style={{ transition: 'fill 0.3s ease' }}
        />
        <path 
          d="M30 59.5C13.7076 59.5 0.5 46.2924 0.5 30C0.5 13.7076 13.7076 0.5 30 0.5C46.2924 0.5 59.5 13.7076 59.5 30C59.5 46.2924 46.2924 59.5 30 59.5Z" 
          stroke="black" 
          strokeOpacity="0.1"
        />
        
        {/* Arrow path - different for prev/next */}
        {direction === 'next' ? (
          <>
            <path 
              d="M17.5234 28.4833L17.5234 31.5293L38.4103 31.5293L29.0547 40.8849L31.2304 43.0606L44.2847 30.0063L31.2304 16.952L29.0547 19.1277L38.4103 28.4833L17.5234 28.4833Z" 
              fill="white"
            />
            <path 
              d="M43.5776 30.0063L31.2302 17.6589L29.7614 19.1276L39.6174 28.9836L38.4103 28.9836L18.0237 28.9843L18.0237 31.0297L38.4103 31.029L39.6174 31.029L29.7614 40.885L31.2302 42.3537L43.5776 30.0063Z" 
              stroke="black" 
              strokeOpacity="0.1"
            />
          </>
        ) : (
          <>
            <path 
              d="M42.4766 31.5167V28.4707L21.5897 28.4707L30.9453 19.1151L28.7696 16.9394L15.7153 29.9937L28.7696 43.048L30.9453 40.8723L21.5897 31.5167H42.4766Z" 
              fill="white"
            />
            <path 
              d="M16.4224 29.9937L28.7698 42.3411L30.2386 40.8724L20.3826 31.0164H21.5897L41.9763 31.0157V28.9703L21.5897 28.971H20.3826L30.2386 19.115L28.7698 17.6463L16.4224 29.9937Z" 
              stroke="black" 
              strokeOpacity="0.1"
            />
          </>
        )}
      </svg>
    </button>
  );
};

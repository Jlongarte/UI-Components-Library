import { useEffect, useState } from 'react';
import './CustomCursor1.css';

export interface CustomCursorProps {
  text?: string;
  spinDuration?: number;
}

export const CustomCursor: React.FC<CustomCursorProps> = ({
  text = '• DISEÑO • FULLSTACK • DEVELOPER ',
  spinDuration = 12,
}) => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []); 

  return (
    <div
      className="custom-cursor-container"
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        opacity: isVisible ? 1 : 0,
      }}
    >
      <div className="custom-cursor-wrapper">
        <svg
          viewBox="0 0 100 100"
          className="custom-cursor-svg"
          style={{ animationDuration: `${spinDuration}s` }}
        >
          <path
            id="circlePath"
            d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
            fill="none"
          />
          <text className="custom-cursor-text">
            <textPath href="#circlePath">{text}</textPath>
          </text>
        </svg>

        <div className="custom-cursor-dot" />
      </div>
    </div>
  );
};

export default CustomCursor;
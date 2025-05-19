
import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
  twinkleDelay: number;
}

export const CosmicBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const animationRef = useRef<number>(0);

  const generateStars = (count: number, width: number, height: number) => {
    const stars: Star[] = [];
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.7 + 0.3,
        twinkleSpeed: Math.random() * 0.03 + 0.01,
        twinkleDelay: Math.random() * 5000,
      });
    }
    return stars;
  };

  const drawStars = (
    ctx: CanvasRenderingContext2D,
    stars: Star[],
    time: number,
    width: number,
    height: number
  ) => {
    ctx.clearRect(0, 0, width, height);
    
    stars.forEach((star) => {
      ctx.beginPath();
      
      // Calculate opacity based on time and twinkle speed
      const twinkle = 
        Math.sin((time + star.twinkleDelay) * star.twinkleSpeed) * 0.5 + 0.5;
      
      ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * twinkle})`;
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fill();
    });
  };

  const animate = (time: number) => {
    if (canvasRef.current && containerRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        drawStars(
          ctx, 
          starsRef.current, 
          time, 
          containerRef.current.offsetWidth, 
          containerRef.current.offsetHeight
        );
      }
    }
    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (containerRef.current && canvasRef.current) {
      const updateSize = () => {
        const { offsetWidth, offsetHeight } = containerRef.current!;
        canvasRef.current!.width = offsetWidth;
        canvasRef.current!.height = offsetHeight;
        starsRef.current = generateStars(150, offsetWidth, offsetHeight);
      };

      updateSize();
      window.addEventListener('resize', updateSize);
      
      animationRef.current = requestAnimationFrame(animate);

      return () => {
        window.removeEventListener('resize', updateSize);
        cancelAnimationFrame(animationRef.current);
      };
    }
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 z-0 overflow-hidden">
      <div className="cosmic-bg absolute inset-0"></div>
      <canvas ref={canvasRef} className="absolute inset-0"></canvas>
    </div>
  );
};

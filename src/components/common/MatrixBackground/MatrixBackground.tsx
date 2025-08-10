import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const MatrixContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
  background: radial-gradient(ellipse at center, rgba(0, 255, 65, 0.1) 0%, transparent 50%);
`;

const MatrixCanvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.1;
`;

const MatrixGrid = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, 
    transparent 25%, 
    rgba(0, 255, 65, 0.05) 25%, 
    rgba(0, 255, 65, 0.05) 50%, 
    transparent 50%, 
    transparent 75%, 
    rgba(0, 255, 65, 0.05) 75%
  );
  background-size: 30px 30px;
  animation: matrix-move 20s linear infinite;

  @keyframes matrix-move {
    0% { transform: translateX(-30px) translateY(-30px); }
    100% { transform: translateX(0) translateY(0); }
  }
`;

export const MatrixBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*';
    const fontSize = 12;
    let columns = 0;
    let drops: number[] = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      columns = Math.floor(canvas.width / fontSize);
      drops = Array(columns).fill(1);
    };

    const draw = () => {
      // Semi-transparent background to create fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#00ff41';
      ctx.font = `${fontSize}px monospace`;
      
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    resizeCanvas();
    const interval = setInterval(draw, 35);

    const handleResize = () => {
      resizeCanvas();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <MatrixContainer>
      <MatrixGrid />
      <MatrixCanvas ref={canvasRef} />
    </MatrixContainer>
  );
};
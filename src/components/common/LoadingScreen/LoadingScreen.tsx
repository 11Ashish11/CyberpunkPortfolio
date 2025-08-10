import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { GlitchText } from '../GlitchText';
import { useApp } from '../../../contexts/AppContext';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoadingContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--bg-dark);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  flex-direction: column;
`;

const LoadingContent = styled.div`
  text-align: center;
  max-width: 400px;
  width: 100%;
  padding: 0 2rem;
`;

const LoadingTitle = styled.h1`
  font-family: 'Orbitron', monospace;
  font-size: 2.5rem;
  font-weight: 900;
  color: var(--primary-color);
  margin-bottom: 2rem;
  text-shadow: 0 0 20px var(--primary-color);
`;

const LoadingSubtitle = styled.p`
  color: var(--text-muted);
  font-family: 'Share Tech Mono', monospace;
  margin-bottom: 3rem;
  font-size: 1.1rem;
`;

const LoadingBarContainer = styled.div`
  width: 100%;
  height: 6px;
  background: var(--bg-darker);
  border: 1px solid var(--primary-color);
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 1rem;
  box-shadow: 0 0 10px rgba(0, 255, 65, 0.3);
`;

const LoadingBar = styled.div<{ progress: number }>`
  height: 100%;
  background: linear-gradient(90deg, var(--primary-color), var(--secondary-color), var(--accent-color));
  width: ${props => props.progress}%;
  transition: width 0.3s ease;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 10px;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4));
    animation: ${spin} 1s linear infinite;
  }
`;

const LoadingPercentage = styled.div`
  color: var(--primary-color);
  font-family: 'Share Tech Mono', monospace;
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 2rem;
`;

const LoadingMessages = [
  'INITIALIZING CYBER MATRIX...',
  'LOADING NEURAL NETWORKS...',
  'DECRYPTING PORTFOLIO DATA...',
  'ESTABLISHING SECURE CONNECTION...',
  'BOOTING CYBERPUNK INTERFACE...',
  'LOADING COMPLETE!',
];

export const LoadingScreen: React.FC = () => {
  const { state } = useApp();
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (state.loading) {
      // Simulate loading progress
      const interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + Math.random() * 15;
          if (newProgress >= 100) {
            clearInterval(interval);
            return 100;
          }
          return Math.min(newProgress, 95);
        });
      }, 200);

      // Update loading messages
      const messageInterval = setInterval(() => {
        setMessageIndex(prev => (prev + 1) % LoadingMessages.length);
      }, 600);

      return () => {
        clearInterval(interval);
        clearInterval(messageInterval);
      };
    } else {
      // Complete loading
      setProgress(100);
      setTimeout(() => {
        setIsVisible(false);
      }, 500);
    }
  }, [state.loading]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <LoadingContainer
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <LoadingContent>
          <LoadingTitle>
            <GlitchText dataText="LOADING...">
              [LOADING...]
            </GlitchText>
          </LoadingTitle>
          
          <LoadingSubtitle>
            {LoadingMessages[messageIndex]}
          </LoadingSubtitle>

          <LoadingBarContainer>
            <LoadingBar progress={progress} />
          </LoadingBarContainer>

          <LoadingPercentage>
            {Math.round(progress)}%
          </LoadingPercentage>

          <motion.div
            animate={{ 
              rotateY: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              width: '60px',
              height: '60px',
              border: '3px solid var(--border-color)',
              borderTop: '3px solid var(--primary-color)',
              borderRadius: '50%',
              margin: '0 auto',
            }}
          />
        </LoadingContent>
      </LoadingContainer>
    </AnimatePresence>
  );
};
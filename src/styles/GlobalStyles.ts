import styled, { createGlobalStyle, keyframes } from 'styled-components';
import { COLORS, BREAKPOINTS } from '../constants';

// Global styles with cyberpunk theme
export const GlobalStyles = createGlobalStyle`
  // Import Google Fonts
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Share+Tech+Mono&display=swap');

  // CSS Variables
  :root {
    --primary-color: ${COLORS.primary};
    --secondary-color: ${COLORS.secondary};
    --accent-color: ${COLORS.accent};
    --bg-dark: ${COLORS.background};
    --bg-darker: ${COLORS.backgroundDark};
    --text-color: ${COLORS.text};
    --text-muted: ${COLORS.textMuted};
    --border-color: ${COLORS.border};
    --glow-color: ${COLORS.glow};
    --error-color: ${COLORS.error};
    --warning-color: ${COLORS.warning};
    --success-color: ${COLORS.success};
  }

  // Reset and base styles
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    font-family: 'Share Tech Mono', monospace;
    background: var(--bg-dark);
    color: var(--text-color);
    overflow-x: hidden;
    line-height: 1.6;
    min-height: 100vh;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  // Scrollbar styling
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: var(--bg-darker);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--primary-color);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: var(--secondary-color);
  }

  // Selection styling
  ::selection {
    background: var(--primary-color);
    color: var(--bg-dark);
  }

  ::-moz-selection {
    background: var(--primary-color);
    color: var(--bg-dark);
  }

  // Focus styles
  *:focus {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
  }

  // Typography
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Orbitron', monospace;
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 1rem;
  }

  p {
    margin-bottom: 1rem;
  }

  a {
    color: var(--accent-color);
    text-decoration: none;
    transition: all 0.3s ease;
  }

  a:hover {
    color: var(--primary-color);
    text-shadow: 0 0 10px var(--primary-color);
  }

  // Button reset
  button {
    background: none;
    border: none;
    cursor: pointer;
    font-family: inherit;
  }

  // Image responsive
  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  // List reset
  ul, ol {
    list-style: none;
  }

  // Container utility
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;

    @media (max-width: ${BREAKPOINTS.sm}) {
      padding: 0 1rem;
    }
  }

  // Screen reader only
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
`;

// Keyframe animations
export const glitchAnimation1 = keyframes`
  0% { clip: rect(64px, 9999px, 66px, 0); transform: skew(0.85deg); }
  5% { clip: rect(30px, 9999px, 36px, 0); transform: skew(0.95deg); }
  10% { clip: rect(80px, 9999px, 90px, 0); transform: skew(0.9deg); }
  15% { clip: rect(48px, 9999px, 56px, 0); transform: skew(0.85deg); }
  20% { clip: rect(12px, 9999px, 18px, 0); transform: skew(0.9deg); }
  25% { clip: rect(70px, 9999px, 80px, 0); transform: skew(0.85deg); }
  100% { clip: rect(0, 0, 0, 0); transform: skew(0deg); }
`;

export const glitchAnimation2 = keyframes`
  0% { clip: rect(44px, 9999px, 50px, 0); transform: skew(0.75deg); }
  5% { clip: rect(20px, 9999px, 30px, 0); transform: skew(0.8deg); }
  10% { clip: rect(60px, 9999px, 70px, 0); transform: skew(0.75deg); }
  15% { clip: rect(35px, 9999px, 45px, 0); transform: skew(0.8deg); }
  20% { clip: rect(5px, 9999px, 15px, 0); transform: skew(0.75deg); }
  25% { clip: rect(50px, 9999px, 65px, 0); transform: skew(0.8deg); }
  100% { clip: rect(0, 0, 0, 0); transform: skew(0deg); }
`;

export const matrixMove = keyframes`
  0% { transform: translateX(-30px) translateY(-30px); }
  100% { transform: translateX(0) translateY(0); }
`;

export const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export const rotateReverse = keyframes`
  from { transform: rotate(360deg); }
  to { transform: rotate(0deg); }
`;

export const dataFlow = keyframes`
  0%, 100% { opacity: 0.3; transform: scaleY(0.5); }
  50% { opacity: 1; transform: scaleY(1); }
`;

export const typing = keyframes`
  0%, 50% { border-color: transparent; }
  51%, 100% { border-color: var(--primary-color); }
`;

export const blink = keyframes`
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
`;

export const skillGlow = keyframes`
  from { box-shadow: 0 0 5px var(--primary-color); }
  to { box-shadow: 0 0 15px var(--primary-color); }
`;

export const heartbeat = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
`;

export const ripple = keyframes`
  to {
    transform: scale(4);
    opacity: 0;
  }
`;

export const slideInUp = keyframes`
  from {
    transform: translateY(100px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

export const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

// Styled component utilities
export const Section = styled.section`
  padding: 5rem 0;
  position: relative;

  @media (max-width: ${BREAKPOINTS.sm}) {
    padding: 3rem 0;
  }
`;

export const SectionTitle = styled.h2`
  font-family: 'Orbitron', monospace;
  font-size: 3rem;
  font-weight: 900;
  text-align: center;
  margin-bottom: 3rem;
  color: var(--primary-color);
  position: relative;
  display: inline-block;

  &::before,
  &::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  &::before {
    animation: ${glitchAnimation1} 0.5s infinite linear alternate-reverse;
    color: var(--secondary-color);
    z-index: -1;
  }

  &::after {
    animation: ${glitchAnimation2} 0.5s infinite linear alternate-reverse;
    color: var(--accent-color);
    z-index: -2;
  }

  @media (max-width: ${BREAKPOINTS.sm}) {
    font-size: 2rem;
  }
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;

  @media (max-width: ${BREAKPOINTS.sm}) {
    padding: 0 1rem;
  }
`;
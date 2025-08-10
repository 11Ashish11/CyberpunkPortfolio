import React from 'react';
import styled from 'styled-components';
import { glitchAnimation1, glitchAnimation2 } from '../../../styles/GlobalStyles';

interface GlitchTextProps {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  dataText?: string;
}

const StyledGlitchText = styled.span<{ dataText?: string }>`
  position: relative;
  display: inline-block;
  
  &::before,
  &::after {
    content: ${props => props.dataText ? `"${props.dataText}"` : 'attr(data-text)'};
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

  // Enhanced glitch effect on hover
  &:hover {
    &::before {
      animation-duration: 0.2s;
    }
    
    &::after {
      animation-duration: 0.2s;
    }
  }
`;

export const GlitchText: React.FC<GlitchTextProps> = ({
  children,
  className,
  as = 'span',
  dataText,
}) => {
  const childrenAsString = typeof children === 'string' ? children : '';
  const glitchText = dataText || childrenAsString;

  return (
    <StyledGlitchText
      as={as}
      className={className}
      data-text={glitchText}
      dataText={glitchText}
    >
      {children}
    </StyledGlitchText>
  );
};
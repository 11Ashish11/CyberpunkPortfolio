import React, { ButtonHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { ripple } from '../../../styles/GlobalStyles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const ButtonVariants = {
  primary: css`
    background: transparent;
    border: 2px solid var(--primary-color);
    color: var(--primary-color);
    
    &::before {
      background: var(--primary-color);
    }
    
    &:hover {
      color: var(--bg-dark);
      box-shadow: 0 0 20px var(--primary-color);
    }
  `,
  
  secondary: css`
    background: transparent;
    border: 2px solid var(--secondary-color);
    color: var(--secondary-color);
    
    &::before {
      background: var(--secondary-color);
    }
    
    &:hover {
      color: var(--bg-dark);
      box-shadow: 0 0 20px var(--secondary-color);
    }
  `,
  
  outline: css`
    background: transparent;
    border: 2px solid var(--accent-color);
    color: var(--accent-color);
    
    &::before {
      background: var(--accent-color);
    }
    
    &:hover {
      color: var(--bg-dark);
      box-shadow: 0 0 20px var(--accent-color);
    }
  `,
};

const ButtonSizes = {
  small: css`
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
  `,
  
  medium: css`
    padding: 0.8rem 1.5rem;
    font-size: 0.9rem;
  `,
  
  large: css`
    padding: 1rem 2rem;
    font-size: 1rem;
  `,
};

const StyledButton = styled(motion.button)<ButtonProps>`
  position: relative;
  overflow: hidden;
  font-family: 'Share Tech Mono', monospace;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  white-space: nowrap;
  
  ${props => ButtonVariants[props.variant || 'primary']}
  ${props => ButtonSizes[props.size || 'medium']}
  
  ${props => props.fullWidth && css`
    width: 100%;
  `}
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    transition: left 0.3s ease;
    z-index: -1;
  }
  
  &:hover::before {
    left: 0;
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    
    &:hover {
      box-shadow: none;
    }
    
    &:hover::before {
      left: -100%;
    }
  }
  
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: ${ripple} 0.6s linear;
    pointer-events: none;
  }
`;

const LoadingSpinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ButtonIcon = styled.span`
  display: flex;
  align-items: center;
  font-size: 1.1em;
`;

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  loading = false,
  icon,
  onClick,
  disabled,
  ...props
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (loading || disabled) return;
    
    // Create ripple effect
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    const rippleElement = document.createElement('span');
    rippleElement.style.width = rippleElement.style.height = size + 'px';
    rippleElement.style.left = x + 'px';
    rippleElement.style.top = y + 'px';
    rippleElement.classList.add('ripple');
    
    button.appendChild(rippleElement);
    
    setTimeout(() => {
      rippleElement.remove();
    }, 600);
    
    onClick?.(e);
  };

  return (
    <StyledButton
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      onClick={handleClick}
      disabled={disabled || loading}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {loading ? (
        <LoadingSpinner />
      ) : (
        icon && <ButtonIcon>{icon}</ButtonIcon>
      )}
      {children}
    </StyledButton>
  );
};
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { GlitchText } from '../../common';
import { NAVIGATION_ITEMS, BREAKPOINTS } from '../../../constants';
import { useApp } from '../../../contexts/AppContext';

const NavBar = styled(motion.nav)`
  position: fixed;
  top: 0;
  width: 100%;
  background: rgba(10, 10, 10, 0.9);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border-color);
  z-index: 1000;
  transition: all 0.3s ease;
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: ${BREAKPOINTS.sm}) {
    padding: 1rem;
  }
`;

const NavLogo = styled.div`
  font-family: 'Orbitron', monospace;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-color);
`;

const NavMenu = styled(motion.div)<{ isOpen: boolean }>`
  display: flex;
  gap: 2rem;

  @media (max-width: ${BREAKPOINTS.md}) {
    position: fixed;
    top: 70px;
    left: ${props => props.isOpen ? '0' : '-100%'};
    width: 100%;
    height: calc(100vh - 70px);
    background: var(--bg-dark);
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: left 0.3s ease;
    gap: 3rem;
  }
`;

const NavLink = styled.a<{ isActive: boolean }>`
  color: ${props => props.isActive ? 'var(--primary-color)' : 'var(--text-color)'};
  text-decoration: none;
  font-weight: 600;
  position: relative;
  transition: color 0.3s ease;
  cursor: pointer;

  &:hover {
    color: var(--primary-color);
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: ${props => props.isActive ? '100%' : '0'};
    height: 2px;
    background: var(--primary-color);
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }
`;

const HamburgerButton = styled.button`
  display: none;
  flex-direction: column;
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;

  @media (max-width: ${BREAKPOINTS.md}) {
    display: flex;
  }
`;

const HamburgerLine = styled.span<{ isOpen: boolean; index: number }>`
  width: 25px;
  height: 3px;
  background: var(--primary-color);
  margin: 3px 0;
  transition: 0.3s;
  transform-origin: center;

  ${props => props.isOpen && props.index === 0 && `
    transform: rotate(45deg) translate(6px, 6px);
  `}

  ${props => props.isOpen && props.index === 1 && `
    opacity: 0;
  `}

  ${props => props.isOpen && props.index === 2 && `
    transform: rotate(-45deg) translate(6px, -6px);
  `}
`;

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const offset = 80;
    const elementPosition = element.offsetTop - offset;
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    });
  }
};

export const Navigation: React.FC = () => {
  const { state, setActiveSection, setMobileMenu } = useApp();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setScrolled(scrollTop > 50);

      // Update active section based on scroll position
      const sections = NAVIGATION_ITEMS.map(item => item.id);
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection && currentSection !== state.activeSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [state.activeSection, setActiveSection]);

  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId);
    setActiveSection(sectionId);
    setMobileMenu(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenu(!state.mobileMenuOpen);
  };

  return (
    <NavBar
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        background: scrolled 
          ? 'rgba(10, 10, 10, 0.95)' 
          : 'rgba(10, 10, 10, 0.9)'
      }}
    >
      <NavContainer>
        <NavLogo>
          <GlitchText dataText="ASHISH.BHOYA">
            &lt;ASHISH.BHOYA/&gt;
          </GlitchText>
        </NavLogo>

        <NavMenu isOpen={state.mobileMenuOpen}>
          {NAVIGATION_ITEMS.map((item) => (
            <NavLink
              key={item.id}
              isActive={state.activeSection === item.id}
              onClick={() => handleNavClick(item.id)}
            >
              {item.label}
            </NavLink>
          ))}
        </NavMenu>

        <HamburgerButton onClick={toggleMobileMenu}>
          {[0, 1, 2].map(index => (
            <HamburgerLine 
              key={index}
              isOpen={state.mobileMenuOpen} 
              index={index} 
            />
          ))}
        </HamburgerButton>
      </NavContainer>
    </NavBar>
  );
};
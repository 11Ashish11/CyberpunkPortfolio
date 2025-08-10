import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Button, Terminal, TerminalLine } from '../../common';
import { PERSONAL_INFO, BREAKPOINTS } from '../../../constants';
import { useTypingEffect } from '../../../hooks/useAnimation';
import { rotateReverse, dataFlow } from '../../../styles/GlobalStyles';

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  max-width: 1200px;
  margin: 0 auto;
  gap: 4rem;

  @media (max-width: ${BREAKPOINTS.md}) {
    flex-direction: column;
    text-align: center;
    padding-top: 100px;
    gap: 2rem;
  }

  @media (max-width: ${BREAKPOINTS.sm}) {
    padding: 100px 1rem 0;
  }
`;

const HeroContent = styled.div`
  flex: 1;
  max-width: 600px;
`;

const HeroTerminal = styled(Terminal)`
  margin-bottom: 2rem;
`;

const CyberTitle = styled.h1`
  font-family: 'Orbitron', monospace;
  font-size: 3rem;
  font-weight: 900;
  color: var(--primary-color);
  text-shadow: 0 0 20px var(--primary-color);
  margin-bottom: 0.5rem;

  @media (max-width: ${BREAKPOINTS.sm}) {
    font-size: 2rem;
  }
`;

const CyberSubtitle = styled.h2`
  font-family: 'Orbitron', monospace;
  font-size: 1.5rem;
  color: var(--secondary-color);
  margin-bottom: 1rem;

  @media (max-width: ${BREAKPOINTS.sm}) {
    font-size: 1.2rem;
  }
`;

const CyberDescription = styled.p`
  color: var(--text-muted);
  font-size: 1.1rem;
  line-height: 1.8;
`;

const HeroActions = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 2rem;

  @media (max-width: ${BREAKPOINTS.sm}) {
    justify-content: center;
  }
`;

const HeroVisual = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HologramContainer = styled.div`
  width: 300px;
  height: 300px;
  position: relative;

  @media (max-width: ${BREAKPOINTS.sm}) {
    width: 250px;
    height: 250px;
  }
`;

const HologramAvatar = styled(motion.div)`
  width: 100%;
  height: 100%;
  border: 2px solid var(--primary-color);
  border-radius: 50%;
  position: relative;
  background: radial-gradient(circle at center, rgba(0, 255, 65, 0.1), transparent);
`;

const AvatarRing = styled.div`
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  border: 1px solid var(--accent-color);
  border-radius: 50%;
  border-top-color: transparent;
  border-right-color: transparent;
  animation: ${rotateReverse} 8s linear infinite;
`;

const AvatarData = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  gap: 10px;
`;

const DataStream = styled.div<{ delay?: number }>`
  width: 2px;
  height: 80px;
  background: linear-gradient(to bottom, var(--primary-color), transparent);
  animation: ${dataFlow} 1.5s ease-in-out infinite;
  animation-delay: ${props => props.delay || 0}s;
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

export const Hero: React.FC = () => {
  const { displayedText: typingCommand, isComplete } = useTypingEffect('cat about.txt', 100, 2000);

  return (
    <HeroSection id="home">
      <HeroContent>
        <HeroTerminal title="ashish@cyberdeck:~$">
          <TerminalLine 
            command="whoami"
            output={
              <>
                <CyberTitle>{PERSONAL_INFO.name}</CyberTitle>
                <CyberSubtitle>{PERSONAL_INFO.title}</CyberSubtitle>
              </>
            }
          />
          <TerminalLine 
            command={typingCommand}
            typingEffect={false}
            output={
              isComplete && (
                <CyberDescription>
                  {PERSONAL_INFO.description}
                </CyberDescription>
              )
            }
          />
          <TerminalLine showPrompt showCursor />
        </HeroTerminal>

        <HeroActions>
          <Button 
            variant="primary" 
            icon={<i className="fas fa-rocket" />}
            onClick={() => scrollToSection('projects')}
          >
            View Projects
          </Button>
          <Button 
            variant="secondary"
            icon={<i className="fas fa-terminal" />}
            onClick={() => scrollToSection('contact')}
          >
            Contact Me
          </Button>
        </HeroActions>
      </HeroContent>

      <HeroVisual>
        <HologramContainer>
          <HologramAvatar
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          >
            <AvatarRing />
            <AvatarData>
              <DataStream />
              <DataStream delay={0.3} />
              <DataStream delay={0.6} />
            </AvatarData>
          </HologramAvatar>
        </HologramContainer>
      </HeroVisual>
    </HeroSection>
  );
};
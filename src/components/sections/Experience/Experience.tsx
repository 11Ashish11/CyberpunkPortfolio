import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Section, SectionTitle, Container } from '../../../styles/GlobalStyles';
import { BREAKPOINTS } from '../../../constants';
import { useApp } from '../../../contexts/AppContext';
import { useScrollAnimation } from '../../../hooks/useAnimation';

const Timeline = styled.div`
  position: relative;
  padding-left: 2rem;

  @media (max-width: ${BREAKPOINTS.sm}) {
    padding-left: 1rem;
  }

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 2px;
    background: var(--primary-color);
    box-shadow: 0 0 10px var(--primary-color);
  }
`;

const TimelineItem = styled(motion.div)`
  position: relative;
  margin-bottom: 3rem;
  padding-left: 3rem;

  @media (max-width: ${BREAKPOINTS.sm}) {
    padding-left: 2rem;
  }
`;

const TimelineMarker = styled.div`
  position: absolute;
  left: -8px;
  top: 0;
  width: 16px;
  height: 16px;
  background: var(--primary-color);
  border-radius: 50%;
  box-shadow: 0 0 15px var(--primary-color);
  z-index: 2;

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 8px;
    height: 8px;
    background: var(--bg-dark);
    border-radius: 50%;
  }
`;

const TimelineContent = styled.div`
  background: var(--bg-darker);
  border: 1px solid var(--border-color);
  border-radius: 10px;
  padding: 1.5rem;
  position: relative;
  transition: all 0.3s ease;

  &:hover {
    border-color: var(--primary-color);
    box-shadow: 0 0 20px rgba(0, 255, 65, 0.3);
    transform: translateY(-2px);
  }

  &::before {
    content: '';
    position: absolute;
    left: -10px;
    top: 20px;
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-right: 10px solid var(--border-color);
    transition: border-right-color 0.3s ease;
  }

  &:hover::before {
    border-right-color: var(--primary-color);
  }
`;

const JobTitle = styled.h3`
  font-family: 'Orbitron', monospace;
  font-size: 1.3rem;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
`;

const Company = styled.h4`
  color: var(--secondary-color);
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
`;

const Duration = styled.span`
  color: var(--text-muted);
  font-size: 0.9rem;
  margin-bottom: 1rem;
  display: block;
`;

const JobDescription = styled.p`
  margin-bottom: 1rem;
  line-height: 1.6;
  color: var(--text-color);
`;

const TechTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const TechTag = styled.span`
  background: rgba(0, 255, 65, 0.2);
  border: 1px solid var(--primary-color);
  color: var(--primary-color);
  padding: 0.3rem 0.8rem;
  border-radius: 5px;
  font-size: 0.8rem;
  font-weight: bold;
  transition: all 0.3s ease;

  &:hover {
    background: var(--primary-color);
    color: var(--bg-dark);
    transform: scale(1.05);
  }
`;

export const Experience: React.FC = () => {
  const { state } = useApp();
  const { ref, isInView } = useScrollAnimation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0
    },
  };


  return (
    <Section id="experience" ref={ref}>
      <Container>
        <SectionTitle data-text="EXPERIENCE">EXPERIENCE</SectionTitle>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <Timeline>
            {state.experience.map((exp, index) => (
              <TimelineItem
                key={exp.id}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
              >
                <TimelineMarker />
                <TimelineContent>
                  <JobTitle>{exp.title}</JobTitle>
                  <Company>{exp.company}</Company>
                  <Duration>{exp.duration}</Duration>
                  <JobDescription>{exp.description}</JobDescription>
                  <TechTags>
                    {exp.technologies.map((tech, techIndex) => (
                      <TechTag key={techIndex}>{tech}</TechTag>
                    ))}
                  </TechTags>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </motion.div>
      </Container>
    </Section>
  );
};
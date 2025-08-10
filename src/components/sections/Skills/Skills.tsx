import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Section, SectionTitle, Container, skillGlow } from '../../../styles/GlobalStyles';
import { BREAKPOINTS } from '../../../constants';
import { useApp } from '../../../contexts/AppContext';
import { useScrollAnimation } from '../../../hooks/useAnimation';
import { SkillCategory } from '../../../types';

const SkillsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 3rem;

  @media (max-width: ${BREAKPOINTS.sm}) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const SkillsCategory = styled(motion.div)`
  background: var(--bg-darker);
  border: 1px solid var(--border-color);
  border-radius: 10px;
  padding: 2rem;
  transition: all 0.3s ease;

  &:hover {
    border-color: var(--primary-color);
    box-shadow: 0 0 20px rgba(0, 255, 65, 0.2);
  }
`;

const CategoryTitle = styled.h3`
  font-family: 'Orbitron', monospace;
  color: var(--primary-color);
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const SkillsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const SkillItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const SkillIcon = styled.div<{ level: number }>`
  font-size: 1.5rem;
  color: var(--primary-color);
  width: 30px;
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.2);
    filter: drop-shadow(0 0 10px var(--primary-color));
  }
`;

const SkillInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const SkillName = styled.span`
  font-weight: bold;
  color: var(--text-color);
  font-size: 0.9rem;
`;

const SkillLevelContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const SkillLevel = styled.div`
  flex: 1;
  height: 8px;
  background: var(--bg-dark);
  border: 1px solid var(--border-color);
  border-radius: 5px;
  overflow: hidden;
  position: relative;
`;

const SkillBar = styled(motion.div)<{ level: number }>`
  height: 100%;
  background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
  border-radius: 5px;
  position: relative;
  animation: ${skillGlow} 2s ease-in-out infinite alternate;
`;

const SkillPercentage = styled.span`
  color: var(--text-muted);
  font-size: 0.8rem;
  min-width: 35px;
  text-align: right;
`;

const CATEGORY_TITLES: Record<SkillCategory, string> = {
  frontend: 'Frontend',
  backend: 'Backend', 
  devops: 'DevOps & Cloud',
  tools: 'Tools',
  languages: 'Languages'
};

export const Skills: React.FC = () => {
  const { state } = useApp();
  const { ref, isInView } = useScrollAnimation();
  const [animatedSkills, setAnimatedSkills] = useState<Set<string>>(new Set());

  // Group skills by category
  const skillsByCategory = state.skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<SkillCategory, typeof state.skills>);

  useEffect(() => {
    if (isInView) {
      // Trigger skill bar animations when in view
      const timer = setTimeout(() => {
        setAnimatedSkills(new Set(state.skills.map(skill => skill.id)));
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isInView, state.skills]);

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

  const categoryVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0
    },
  };

  const skillVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0
    },
  };


  return (
    <Section id="skills" ref={ref}>
      <Container>
        <SectionTitle data-text="SKILLS">SKILLS</SectionTitle>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <SkillsContainer>
            {Object.entries(skillsByCategory).map(([category, skills]) => (
              <SkillsCategory
                key={category}
                variants={categoryVariants}
                whileHover={{ scale: 1.02 }}
              >
                <CategoryTitle>
                  {CATEGORY_TITLES[category as SkillCategory]}
                </CategoryTitle>
                <SkillsGrid>
                  {skills.map((skill, index) => (
                    <SkillItem
                      key={skill.id}
                      variants={skillVariants}
                      custom={index}
                    >
                      <SkillIcon level={skill.level}>
                        <i className={skill.icon} />
                      </SkillIcon>
                      <SkillInfo>
                        <SkillName>{skill.name}</SkillName>
                        <SkillLevelContainer>
                          <SkillLevel>
                            <SkillBar
                              level={skill.level}
                              initial={{ width: 0 }}
                              animate={{ 
                                width: animatedSkills.has(skill.id) ? `${skill.level}%` : 0 
                              }}
                              transition={{ 
                                duration: 1.5, 
                                delay: index * 0.1,
                                ease: "easeOut" 
                              }}
                            />
                          </SkillLevel>
                          <SkillPercentage>{skill.level}%</SkillPercentage>
                        </SkillLevelContainer>
                      </SkillInfo>
                    </SkillItem>
                  ))}
                </SkillsGrid>
              </SkillsCategory>
            ))}
          </SkillsContainer>
        </motion.div>
      </Container>
    </Section>
  );
};
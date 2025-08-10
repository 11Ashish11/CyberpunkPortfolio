import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Section, SectionTitle, Container } from '../../../styles/GlobalStyles';
import { BREAKPOINTS } from '../../../constants';
import { useApp } from '../../../contexts/AppContext';
import { useScrollAnimation } from '../../../hooks/useAnimation';

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;

  @media (max-width: ${BREAKPOINTS.sm}) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const ProjectCard = styled(motion.div)`
  background: var(--bg-darker);
  border: 1px solid var(--border-color);
  border-radius: 10px;
  padding: 1.5rem;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, var(--primary-color), var(--secondary-color), var(--accent-color));
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }

  &:hover::before {
    transform: scaleX(1);
  }

  &:hover {
    border-color: var(--primary-color);
    box-shadow: 0 0 20px rgba(0, 255, 65, 0.3);
    transform: translateY(-5px);
  }
`;

const ProjectHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const ProjectTitle = styled.h3`
  font-family: 'Orbitron', monospace;
  color: var(--primary-color);
  font-size: 1.2rem;
  flex: 1;
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ProjectLink = styled.a`
  color: var(--text-muted);
  font-size: 1.2rem;
  transition: all 0.3s ease;
  padding: 0.5rem;
  border-radius: 50%;

  &:hover {
    color: var(--primary-color);
    background: rgba(0, 255, 65, 0.1);
    transform: scale(1.1);
  }
`;

const ProjectDescription = styled.p`
  margin-bottom: 1rem;
  line-height: 1.6;
  color: var(--text-muted);
`;

const ProjectTech = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const TechTag = styled.span`
  background: rgba(0, 212, 255, 0.2);
  border: 1px solid var(--accent-color);
  color: var(--accent-color);
  padding: 0.2rem 0.6rem;
  border-radius: 3px;
  font-size: 0.8rem;
  font-weight: bold;
  transition: all 0.3s ease;

  &:hover {
    background: var(--accent-color);
    color: var(--bg-dark);
    transform: scale(1.05);
  }
`;

const ProjectStats = styled.div`
  display: flex;
  gap: 1rem;
  color: var(--text-muted);
  font-size: 0.9rem;
`;

const Stat = styled.span`
  display: flex;
  align-items: center;
  gap: 0.3rem;

  i {
    color: var(--warning-color);
  }
`;

const FeaturedBadge = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: var(--secondary-color);
  color: var(--bg-dark);
  padding: 0.2rem 0.5rem;
  border-radius: 3px;
  font-size: 0.7rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export const Projects: React.FC = () => {
  const { state } = useApp();
  const { ref, isInView } = useScrollAnimation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0
    },
  };


  return (
    <Section id="projects" ref={ref}>
      <Container>
        <SectionTitle data-text="PROJECTS">PROJECTS</SectionTitle>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <ProjectsGrid>
            {state.projects.map((project) => (
              <ProjectCard
                key={project.id}
                variants={cardVariants}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
              >
                {project.featured && <FeaturedBadge>Featured</FeaturedBadge>}
                
                <ProjectHeader>
                  <ProjectTitle>{project.title}</ProjectTitle>
                  <ProjectLinks>
                    {project.githubUrl && (
                      <ProjectLink href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-github" />
                      </ProjectLink>
                    )}
                    {project.liveUrl && (
                      <ProjectLink href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <i className="fas fa-external-link-alt" />
                      </ProjectLink>
                    )}
                  </ProjectLinks>
                </ProjectHeader>

                <ProjectDescription>{project.description}</ProjectDescription>

                <ProjectTech>
                  {project.technologies.map((tech, index) => (
                    <TechTag key={index}>{tech}</TechTag>
                  ))}
                </ProjectTech>

                {(project.stars !== undefined || project.forks !== undefined) && (
                  <ProjectStats>
                    {project.stars !== undefined && (
                      <Stat>
                        <i className="fas fa-star" />
                        {project.stars}
                      </Stat>
                    )}
                    {project.forks !== undefined && (
                      <Stat>
                        <i className="fas fa-code-branch" />
                        {project.forks}
                      </Stat>
                    )}
                  </ProjectStats>
                )}
              </ProjectCard>
            ))}
          </ProjectsGrid>
        </motion.div>
      </Container>
    </Section>
  );
};
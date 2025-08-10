import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { BREAKPOINTS, CONTACT_INFO } from '../../../constants';
import { heartbeat } from '../../../styles/GlobalStyles';

const FooterContainer = styled.footer`
  background: var(--bg-darker);
  border-top: 1px solid var(--border-color);
  padding: 2rem 0;
  margin-top: 3rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;

  @media (max-width: ${BREAKPOINTS.sm}) {
    flex-direction: column;
    text-align: center;
    padding: 0 1rem;
  }
`;

const FooterText = styled.div`
  color: var(--text-muted);
  font-size: 0.9rem;

  p {
    margin-bottom: 0.5rem;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const Heart = styled.span`
  color: var(--secondary-color);
  animation: ${heartbeat} 1.5s ease-in-out infinite;
  display: inline-block;
  margin: 0 0.3rem;
`;

const FooterSocial = styled.div`
  display: flex;
  gap: 1rem;
`;

const SocialLink = styled(motion.a)`
  color: var(--text-muted);
  font-size: 1.5rem;
  transition: all 0.3s ease;
  padding: 0.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: var(--primary-color);
    background: rgba(0, 255, 65, 0.1);
  }
`;

const Copyright = styled.div`
  text-align: center;
  padding-top: 1rem;
  margin-top: 1rem;
  border-top: 1px solid var(--border-color);
  color: var(--text-muted);
  font-size: 0.8rem;
`;

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <FooterContent>
        <FooterText>
          <p>&copy; {currentYear} Ashish Bhoya. All rights reserved.</p>
          <p>
            Built with<Heart>♥</Heart>and lots of caffeine
          </p>
        </FooterText>
        
        <FooterSocial>
          <SocialLink 
            href={CONTACT_INFO.github} 
            target="_blank" 
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <i className="fab fa-github" />
          </SocialLink>
          <SocialLink 
            href={CONTACT_INFO.linkedin} 
            target="_blank" 
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <i className="fab fa-linkedin" />
          </SocialLink>
          <SocialLink 
            href={CONTACT_INFO.twitter} 
            target="_blank" 
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <i className="fab fa-twitter" />
          </SocialLink>
          <SocialLink 
            href={`mailto:${CONTACT_INFO.email}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <i className="fas fa-envelope" />
          </SocialLink>
        </FooterSocial>
      </FooterContent>
      
      <Copyright>
        <p>Made with React, TypeScript, and Styled Components</p>
      </Copyright>
    </FooterContainer>
  );
};
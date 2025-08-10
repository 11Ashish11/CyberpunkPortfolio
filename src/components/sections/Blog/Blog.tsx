import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Section, SectionTitle, Container } from '../../../styles/GlobalStyles';
import { BREAKPOINTS } from '../../../constants';
import { useApp } from '../../../contexts/AppContext';
import { useScrollAnimation } from '../../../hooks/useAnimation';

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;

  @media (max-width: ${BREAKPOINTS.sm}) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const BlogCard = styled(motion.article)`
  background: var(--bg-darker);
  border: 1px solid var(--border-color);
  border-radius: 10px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(90deg, var(--secondary-color), var(--accent-color));
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

const BlogHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const BlogDate = styled.span`
  color: var(--text-muted);
  font-size: 0.9rem;
  font-family: 'Share Tech Mono', monospace;
`;

const BlogCategory = styled.span`
  background: rgba(255, 0, 128, 0.2);
  border: 1px solid var(--secondary-color);
  color: var(--secondary-color);
  padding: 0.2rem 0.5rem;
  border-radius: 3px;
  font-size: 0.8rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const BlogTitle = styled.h3`
  font-family: 'Orbitron', monospace;
  color: var(--primary-color);
  margin-bottom: 1rem;
  font-size: 1.3rem;
  line-height: 1.3;
`;

const BlogExcerpt = styled.p`
  color: var(--text-muted);
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const BlogMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 0.8rem;
  color: var(--text-muted);
`;

const ReadTime = styled.span`
  display: flex;
  align-items: center;
  gap: 0.3rem;

  i {
    color: var(--accent-color);
  }
`;

const BlogTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const Tag = styled.span`
  background: rgba(0, 212, 255, 0.2);
  border: 1px solid var(--accent-color);
  color: var(--accent-color);
  padding: 0.2rem 0.5rem;
  border-radius: 3px;
  font-size: 0.7rem;
  font-weight: bold;
  text-transform: uppercase;
  transition: all 0.3s ease;

  &:hover {
    background: var(--accent-color);
    color: var(--bg-dark);
    transform: scale(1.05);
  }
`;

const ReadMore = styled.a`
  color: var(--primary-color);
  text-decoration: none;
  font-weight: bold;
  font-family: 'Share Tech Mono', monospace;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover {
    text-shadow: 0 0 10px var(--primary-color);
    transform: translateX(5px);
  }

  &::after {
    content: '>';
    transition: transform 0.3s ease;
  }

  &:hover::after {
    transform: translateX(3px);
  }
`;

const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0].replace(/-/g, '.');
};

export const Blog: React.FC = () => {
  const { state } = useApp();
  const { ref, isInView } = useScrollAnimation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0
    },
  };


  return (
    <Section id="blog" ref={ref}>
      <Container>
        <SectionTitle data-text="BLOG">BLOG</SectionTitle>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <BlogGrid>
            {state.blogPosts.map((post) => (
              <BlogCard
                key={post.id}
                variants={cardVariants}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
              >
                <BlogHeader>
                  <BlogDate>{formatDate(post.publishDate)}</BlogDate>
                  <BlogCategory>{post.category}</BlogCategory>
                </BlogHeader>

                <BlogTitle>{post.title}</BlogTitle>
                
                <BlogMeta>
                  <ReadTime>
                    <i className="fas fa-clock" />
                    {post.readTime} min read
                  </ReadTime>
                </BlogMeta>

                <BlogExcerpt>{post.excerpt}</BlogExcerpt>

                <BlogTags>
                  {post.tags.map((tag, index) => (
                    <Tag key={index}>{tag}</Tag>
                  ))}
                </BlogTags>

                <ReadMore href={`#blog/${post.slug}`}>
                  Read More
                </ReadMore>
              </BlogCard>
            ))}
          </BlogGrid>
        </motion.div>
      </Container>
    </Section>
  );
};
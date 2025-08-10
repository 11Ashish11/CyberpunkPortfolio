import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Section, SectionTitle, Container } from '../../../styles/GlobalStyles';
import { Terminal, TerminalLine, Button } from '../../common';
import { BREAKPOINTS, CONTACT_INFO } from '../../../constants';
import { ContactFormData } from '../../../types';
import { useScrollAnimation } from '../../../hooks/useAnimation';

const ContactContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: start;

  @media (max-width: ${BREAKPOINTS.md}) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ContactInfo = styled.div`
  
`;

const ContactTerminal = styled(Terminal)`
  
`;

const ContactItem = styled.div`
  margin-bottom: 1rem;

  .output {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    color: var(--text-color);
    margin: 0.5rem 0 0 1.5rem;

    i {
      color: var(--primary-color);
      width: 20px;
      font-size: 1.1rem;
    }

    a {
      color: var(--accent-color);
      text-decoration: none;
      transition: all 0.3s ease;

      &:hover {
        color: var(--primary-color);
        text-shadow: 0 0 10px var(--primary-color);
      }
    }
  }
`;

const ContactForm = styled.div`
  background: var(--bg-darker);
  border: 1px solid var(--border-color);
  border-radius: 10px;
  padding: 2rem;
  transition: all 0.3s ease;

  &:hover {
    border-color: var(--primary-color);
    box-shadow: 0 0 20px rgba(0, 255, 65, 0.1);
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormLabel = styled.label`
  color: var(--primary-color);
  margin-bottom: 0.5rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.9rem;
`;

const FormInput = styled.input<{ hasError?: boolean }>`
  background: var(--bg-dark);
  border: 1px solid ${props => props.hasError ? 'var(--error-color)' : 'var(--border-color)'};
  border-radius: 5px;
  padding: 0.8rem;
  color: var(--text-color);
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.9rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 10px rgba(0, 255, 65, 0.3);
  }

  &::placeholder {
    color: var(--text-muted);
  }
`;

const FormTextarea = styled.textarea<{ hasError?: boolean }>`
  background: var(--bg-dark);
  border: 1px solid ${props => props.hasError ? 'var(--error-color)' : 'var(--border-color)'};
  border-radius: 5px;
  padding: 0.8rem;
  color: var(--text-color);
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  resize: vertical;
  min-height: 120px;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 10px rgba(0, 255, 65, 0.3);
  }

  &::placeholder {
    color: var(--text-muted);
  }
`;

const ErrorMessage = styled.span`
  color: var(--error-color);
  font-size: 0.8rem;
  margin-top: 0.3rem;
  font-family: 'Share Tech Mono', monospace;
`;

const SuccessMessage = styled(motion.div)`
  background: rgba(0, 255, 65, 0.1);
  border: 1px solid var(--success-color);
  color: var(--success-color);
  padding: 1rem;
  border-radius: 5px;
  text-align: center;
  font-family: 'Share Tech Mono', monospace;
  font-weight: bold;
`;

export const Contact: React.FC = () => {
  const { ref, isInView } = useScrollAnimation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Form submitted:', data);
    setIsSubmitting(false);
    setIsSuccess(true);
    reset();

    // Hide success message after 5 seconds
    setTimeout(() => {
      setIsSuccess(false);
    }, 5000);
  };

  return (
    <Section id="contact" ref={ref}>
      <Container>
        <SectionTitle data-text="CONTACT">CONTACT</SectionTitle>
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, staggerChildren: 0.3, delayChildren: 0.2 }}
        >
          <ContactContent>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <ContactInfo>
                <ContactTerminal title="contact.sh">
                  <ContactItem>
                    <TerminalLine command="ping email" />
                    <div className="output">
                      <i className="fas fa-envelope" />
                      <a href={`mailto:${CONTACT_INFO.email}`}>
                        {CONTACT_INFO.email}
                      </a>
                    </div>
                  </ContactItem>
                  
                  <ContactItem>
                    <TerminalLine command="curl -s github" />
                    <div className="output">
                      <i className="fab fa-github" />
                      <a href={CONTACT_INFO.github} target="_blank" rel="noopener noreferrer">
                        {CONTACT_INFO.github}
                      </a>
                    </div>
                  </ContactItem>
                  
                  <ContactItem>
                    <TerminalLine command="connect linkedin" />
                    <div className="output">
                      <i className="fab fa-linkedin" />
                      <a href={CONTACT_INFO.linkedin} target="_blank" rel="noopener noreferrer">
                        {CONTACT_INFO.linkedin}
                      </a>
                    </div>
                  </ContactItem>
                  
                  <ContactItem>
                    <TerminalLine command="follow twitter" />
                    <div className="output">
                      <i className="fab fa-twitter" />
                      <a href={CONTACT_INFO.twitter} target="_blank" rel="noopener noreferrer">
                        {CONTACT_INFO.twitter}
                      </a>
                    </div>
                  </ContactItem>
                </ContactTerminal>
              </ContactInfo>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <ContactForm>
                {isSuccess ? (
                  <SuccessMessage
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <i className="fas fa-check-circle" style={{ marginRight: '0.5rem' }} />
                    MESSAGE SENT SUCCESSFULLY!
                    <br />
                    <small>I'll get back to you soon.</small>
                  </SuccessMessage>
                ) : (
                  <Form onSubmit={handleSubmit(onSubmit)}>
                    <FormGroup>
                      <FormLabel htmlFor="name">Name</FormLabel>
                      <FormInput
                        type="text"
                        id="name"
                        hasError={!!errors.name}
                        placeholder="Enter your name"
                        {...register('name', { 
                          required: 'Name is required',
                          minLength: {
                            value: 2,
                            message: 'Name must be at least 2 characters'
                          }
                        })}
                      />
                      {errors.name && (
                        <ErrorMessage>{errors.name.message}</ErrorMessage>
                      )}
                    </FormGroup>

                    <FormGroup>
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <FormInput
                        type="email"
                        id="email"
                        hasError={!!errors.email}
                        placeholder="Enter your email"
                        {...register('email', {
                          required: 'Email is required',
                          pattern: {
                            value: /^\S+@\S+$/i,
                            message: 'Please enter a valid email'
                          }
                        })}
                      />
                      {errors.email && (
                        <ErrorMessage>{errors.email.message}</ErrorMessage>
                      )}
                    </FormGroup>

                    <FormGroup>
                      <FormLabel htmlFor="subject">Subject</FormLabel>
                      <FormInput
                        type="text"
                        id="subject"
                        hasError={!!errors.subject}
                        placeholder="Enter subject"
                        {...register('subject', {
                          required: 'Subject is required',
                          minLength: {
                            value: 5,
                            message: 'Subject must be at least 5 characters'
                          }
                        })}
                      />
                      {errors.subject && (
                        <ErrorMessage>{errors.subject.message}</ErrorMessage>
                      )}
                    </FormGroup>

                    <FormGroup>
                      <FormLabel htmlFor="message">Message</FormLabel>
                      <FormTextarea
                        id="message"
                        hasError={!!errors.message}
                        placeholder="Enter your message"
                        {...register('message', {
                          required: 'Message is required',
                          minLength: {
                            value: 10,
                            message: 'Message must be at least 10 characters'
                          }
                        })}
                      />
                      {errors.message && (
                        <ErrorMessage>{errors.message.message}</ErrorMessage>
                      )}
                    </FormGroup>

                    <Button
                      type="submit"
                      variant="primary"
                      size="large"
                      fullWidth
                      loading={isSubmitting}
                      icon={<i className="fas fa-paper-plane" />}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </Form>
                )}
              </ContactForm>
            </motion.div>
          </ContactContent>
        </motion.div>
      </Container>
    </Section>
  );
};
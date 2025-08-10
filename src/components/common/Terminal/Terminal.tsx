import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { typing, blink } from '../../../styles/GlobalStyles';

interface TerminalProps {
  title?: string;
  children?: React.ReactNode;
  showHeader?: boolean;
  className?: string;
}

interface TerminalLineProps {
  command?: string;
  output?: React.ReactNode;
  showPrompt?: boolean;
  showCursor?: boolean;
  typingEffect?: boolean;
  typingSpeed?: number;
}

const TerminalContainer = styled(motion.div)`
  background: var(--bg-darker);
  border: 1px solid var(--border-color);
  border-radius: 10px;
  box-shadow: 0 0 30px rgba(0, 255, 65, 0.3);
  overflow: hidden;
  font-family: 'Share Tech Mono', monospace;
`;

const TerminalHeader = styled.div`
  background: var(--bg-dark);
  padding: 1rem;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const TerminalControls = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Control = styled.div<{ color: 'red' | 'yellow' | 'green' }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => {
    switch (props.color) {
      case 'red': return '#ff5f56';
      case 'yellow': return '#ffbd2e';
      case 'green': return '#27ca3f';
      default: return '#ccc';
    }
  }};
`;

const TerminalTitle = styled.span`
  color: var(--text-muted);
  font-size: 0.9rem;
`;

const TerminalBody = styled.div`
  padding: 1.5rem;
  min-height: 200px;
`;

const TerminalLineContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  gap: 0.5rem;
`;

const Prompt = styled.span`
  color: var(--primary-color);
  font-weight: bold;
`;

const Command = styled.span<{ typing?: boolean }>`
  color: var(--accent-color);
  
  ${props => props.typing && `
    border-right: 2px solid var(--primary-color);
    animation: ${typing} 2s steps(15) infinite;
  `}
`;

const Output = styled.div`
  margin: 1rem 0;
  padding-left: 1.5rem;
  color: var(--text-color);
`;

const Cursor = styled.span`
  color: var(--primary-color);
  animation: ${blink} 1s infinite;
`;

export const Terminal: React.FC<TerminalProps> = ({
  title = 'terminal',
  children,
  showHeader = true,
  className,
}) => {
  return (
    <TerminalContainer
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {showHeader && (
        <TerminalHeader>
          <TerminalControls>
            <Control color="red" />
            <Control color="yellow" />
            <Control color="green" />
          </TerminalControls>
          <TerminalTitle>{title}</TerminalTitle>
        </TerminalHeader>
      )}
      <TerminalBody>
        {children}
      </TerminalBody>
    </TerminalContainer>
  );
};

export const TerminalLine: React.FC<TerminalLineProps> = ({
  command,
  output,
  showPrompt = true,
  showCursor = false,
  typingEffect = false,
  typingSpeed = 100,
}) => {
  const [displayedCommand, setDisplayedCommand] = useState('');
  const [showOutput, setShowOutput] = useState(!typingEffect);

  useEffect(() => {
    if (typingEffect && command) {
      let index = 0;
      const timer = setInterval(() => {
        if (index < command.length) {
          setDisplayedCommand(command.slice(0, index + 1));
          index++;
        } else {
          clearInterval(timer);
          setShowOutput(true);
        }
      }, typingSpeed);

      return () => clearInterval(timer);
    } else if (command) {
      setDisplayedCommand(command);
    }
  }, [command, typingEffect, typingSpeed]);

  return (
    <>
      {command && (
        <TerminalLineContainer>
          {showPrompt && <Prompt>$</Prompt>}
          <Command typing={typingEffect && displayedCommand.length < (command?.length || 0)}>
            {displayedCommand}
          </Command>
          {showCursor && <Cursor>_</Cursor>}
        </TerminalLineContainer>
      )}
      {output && showOutput && (
        <Output>
          {output}
        </Output>
      )}
    </>
  );
};
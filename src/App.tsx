import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { AppProvider } from './contexts/AppContext';
import { GlobalStyles } from './styles/GlobalStyles';
import { Navigation } from './components/layout/Navigation';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { Experience } from './components/sections/Experience';
import { Projects } from './components/sections/Projects';
import { Skills } from './components/sections/Skills';
import { Blog } from './components/sections/Blog';
import { Contact } from './components/sections/Contact';
import { LoadingScreen, MatrixBackground } from './components/common';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppProvider>
        <GlobalStyles />
        <MatrixBackground />
        <LoadingScreen />
        <Navigation />
        <main>
          <Hero />
          <Experience />
          <Projects />
          <Skills />
          <Blog />
          <Contact />
        </main>
        <Footer />
      </AppProvider>
    </ThemeProvider>
  );
};

export default App;
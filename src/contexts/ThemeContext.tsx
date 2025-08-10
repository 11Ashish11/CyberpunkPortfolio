import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeContextType, ThemeColors } from '../types';
import { COLORS } from '../constants';

const defaultColors: ThemeColors = {
  primary: COLORS.primary,
  secondary: COLORS.secondary,
  accent: COLORS.accent,
  background: COLORS.background,
  backgroundDark: COLORS.backgroundDark,
  text: COLORS.text,
  textMuted: COLORS.textMuted,
  border: COLORS.border,
  glow: COLORS.glow,
  error: COLORS.error,
  warning: COLORS.warning,
  success: COLORS.success,
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDark, setIsDark] = useState(true); // Default to dark theme for cyberpunk

  useEffect(() => {
    // Load theme preference from localStorage
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('portfolio-theme', newTheme ? 'dark' : 'light');
  };

  // For now, we're using cyberpunk theme only, but this structure allows for theme switching
  const colors = defaultColors;

  const value: ThemeContextType = {
    isDark,
    toggleTheme,
    colors,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
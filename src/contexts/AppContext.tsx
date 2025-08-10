import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Experience, Project, Skill, BlogPost } from '../types';
import { EXPERIENCE_DATA, PROJECTS_DATA, SKILLS_DATA, BLOG_DATA } from '../constants';

interface AppState {
  experience: Experience[];
  projects: Project[];
  skills: Skill[];
  blogPosts: BlogPost[];
  loading: boolean;
  activeSection: string;
  mobileMenuOpen: boolean;
}

type AppAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ACTIVE_SECTION'; payload: string }
  | { type: 'TOGGLE_MOBILE_MENU' }
  | { type: 'SET_MOBILE_MENU'; payload: boolean }
  | { type: 'LOAD_DATA_SUCCESS'; payload: Partial<AppState> };

const initialState: AppState = {
  experience: [],
  projects: [],
  skills: [],
  blogPosts: [],
  loading: true,
  activeSection: 'home',
  mobileMenuOpen: false,
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ACTIVE_SECTION':
      return { ...state, activeSection: action.payload };
    case 'TOGGLE_MOBILE_MENU':
      return { ...state, mobileMenuOpen: !state.mobileMenuOpen };
    case 'SET_MOBILE_MENU':
      return { ...state, mobileMenuOpen: action.payload };
    case 'LOAD_DATA_SUCCESS':
      return { ...state, ...action.payload, loading: false };
    default:
      return state;
  }
};

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  setActiveSection: (section: string) => void;
  toggleMobileMenu: () => void;
  setMobileMenu: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    // Simulate data loading - in a real app, this would be API calls
    const loadData = async () => {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      dispatch({
        type: 'LOAD_DATA_SUCCESS',
        payload: {
          experience: EXPERIENCE_DATA,
          projects: PROJECTS_DATA,
          skills: SKILLS_DATA,
          blogPosts: BLOG_DATA,
        },
      });
    };

    loadData();
  }, []);

  const setActiveSection = (section: string) => {
    dispatch({ type: 'SET_ACTIVE_SECTION', payload: section });
  };

  const toggleMobileMenu = () => {
    dispatch({ type: 'TOGGLE_MOBILE_MENU' });
  };

  const setMobileMenu = (open: boolean) => {
    dispatch({ type: 'SET_MOBILE_MENU', payload: open });
  };

  const value: AppContextType = {
    state,
    dispatch,
    setActiveSection,
    toggleMobileMenu,
    setMobileMenu,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
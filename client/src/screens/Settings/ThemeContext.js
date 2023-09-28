
import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }) {
  // Initialize theme state from localStorage (or use a default theme)
  const [isDarkTheme, setIsDarkTheme] = useState(
    localStorage.getItem('theme') === 'dark'
  );

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);
    // Store the theme preference in localStorage
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  useEffect(() => {
    // Apply the theme based on the stored preference
    if (localStorage.getItem('theme') === 'dark') {
      setIsDarkTheme(true);
    } else {
      setIsDarkTheme(false);
    }
  }, []);

  const theme = {
    isDarkTheme,
    toggleTheme,
  };

  return (

    
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
    
  );
}
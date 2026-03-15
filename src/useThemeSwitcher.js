import { useState, useCallback, useEffect } from 'react';

export function useThemeSwitcher(initialTheme = 'light') {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('app-theme') || initialTheme;
  });

  useEffect(() => {
    localStorage.setItem('app-theme', theme);
    document.body.style.backgroundColor = theme === 'light' ? '#ffffff' : '#121212';
    document.body.style.color = theme === 'light' ? '#000000' : '#ffffff';
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  }, []);

  return [theme, toggleTheme];
}
import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [textColor, setTextColor] = useState('text-black');
    const [logoColor, setLogoColor] = useState('text-black');

    return (
        <ThemeContext.Provider value={{ textColor, setTextColor, logoColor, setLogoColor }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);

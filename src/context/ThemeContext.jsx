import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [textColor, setTextColor] = useState('text-black');
    const [logoColor, setLogoColor] = useState('text-black');
    const [backgroundColor, setBackgroundColor] = useState('#FAF9F6'); // Default Light

    return (
        <ThemeContext.Provider value={{ textColor, setTextColor, logoColor, setLogoColor, backgroundColor, setBackgroundColor }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);

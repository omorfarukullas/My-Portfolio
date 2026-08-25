'use client';

import { createContext, useContext, ReactNode } from 'react';

type Theme = 'light';

interface ThemeContextValue {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
    theme: 'light',
    toggleTheme: () => { },
});

export function ThemeProvider({ children }: { children: ReactNode }) {
    return (
        <ThemeContext.Provider value={{ theme: 'light', toggleTheme: () => { } }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}

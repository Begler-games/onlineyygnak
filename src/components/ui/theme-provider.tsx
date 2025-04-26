"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

interface ThemeProviderConfig extends ThemeProviderProps {
  
}

export function ThemeProvider({ children, ...props }: ThemeProviderConfig) {
    return (
        <NextThemesProvider {...props}>
            {children}
        </NextThemesProvider>
    );
}

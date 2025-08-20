import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";


type Theme = "light" | "dark";
type Language = "english" | "spanish" | "french" | "german";

interface AppSettingsContextProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  language: Language;
  setLanguage: (language: Language) => void;
}

const AppSettingsContext = createContext<AppSettingsContextProps | undefined>(undefined);

export const AppSettingsProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>("dark"); // default to black/dark
  const [language, setLanguage] = useState<Language>("english");

  return (
    <AppSettingsContext.Provider value={{ theme, setTheme, language, setLanguage }}>
      {children}
    </AppSettingsContext.Provider>
  );
};

export const useAppSettings = () => {
  const context = useContext(AppSettingsContext);
  if (!context) {
    throw new Error("useAppSettings must be used within AppSettingsProvider");
  }
  return context;
};

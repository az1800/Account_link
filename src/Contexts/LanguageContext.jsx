import React, { createContext, useState } from "react";

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(localStorage.getItem("lan") ?? "En");

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === "En" ? "Ar" : "En"));
    localStorage.setItem("lan", language === "En" ? "Ar" : "En");
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

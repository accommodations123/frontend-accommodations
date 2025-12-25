import React, { createContext, useContext, useEffect, useState } from "react";

const CountryContext = createContext(null);

export const CountryProvider = ({ children }) => {
  const [activeCountry, setActiveCountry] = useState(null);
  const [isSelected, setIsSelected] = useState(false);

  // Load from localStorage on app load
  useEffect(() => {
    const saved = localStorage.getItem("selectedLocation");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed?.country) {
        setActiveCountry({
          name: parsed.country,
          code: parsed.country,
        });
        setIsSelected(true);
      }
    }
  }, []);

  const setCountry = (country) => {
    setActiveCountry(country);
    setIsSelected(true);
  };

  return (
    <CountryContext.Provider
      value={{
        activeCountry,
        setCountry,
        isSelected,
      }}
    >
      {children}
    </CountryContext.Provider>
  );
};

export const useCountry = () => {
  const ctx = useContext(CountryContext);
  if (!ctx) {
    throw new Error("useCountry must be used inside CountryProvider");
  }
  return ctx;
};
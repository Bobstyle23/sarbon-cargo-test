"use client";

import { createContext, useContext, useState } from "react";
import { cargoDictionary, type Lang } from "./cargoDictionary";

interface CargoI18nContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (typeof cargoDictionary)[Lang];
}

const CargoI18nContext = createContext<CargoI18nContextValue | null>(null);

export function CargoI18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("uz");

  const t = cargoDictionary[lang];

  return (
    <CargoI18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </CargoI18nContext.Provider>
  );
}

export function useCargoI18n() {
  const context = useContext(CargoI18nContext);

  if (!context) {
    throw new Error("useCargoI18n must be used inside CargoI18nProvider");
  }

  return context;
}

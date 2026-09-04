"use client";
import { createContext, useContext, useEffect, useState } from "react";
type Theme = "light"|"dark";
interface ThemeCtx { theme:Theme; toggleTheme:()=>void; }
const Ctx = createContext<ThemeCtx|undefined>(undefined);
export function ThemeProvider({ children }:{ children:React.ReactNode }) {
  const [theme,setTheme] = useState<Theme>("dark");
  useEffect(()=>{ setTheme(document.documentElement.classList.contains("dark")?"dark":"light"); },[]);
  const toggleTheme = () => {
    const next = theme==="dark"?"light":"dark";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next==="dark");
    localStorage.setItem("upnited-theme", next);
  };
  return <Ctx.Provider value={{theme,toggleTheme}}>{children}</Ctx.Provider>;
}
export function useTheme() {
  const ctx = useContext(Ctx);
  if(!ctx) throw new Error("useTheme must be within ThemeProvider");
  return ctx;
}

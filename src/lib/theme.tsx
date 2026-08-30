import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Theme = "dark" | "light" | "system";

const KEY = "ad-theme";

function systemTheme(): "dark" | "light" {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function apply(theme: Theme) {
  const resolved = theme === "system" ? systemTheme() : theme;
  document.documentElement.dataset.theme = resolved;
}

const ThemeContext = createContext<{
  theme: Theme;
  resolved: "dark" | "light";
  setTheme: (t: Theme) => void;
  cycle: () => void;
} | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [resolved, setResolved] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const stored = localStorage.getItem(KEY) as Theme | null;
    const next = stored === "light" || stored === "system" || stored === "dark" ? stored : "dark";
    setThemeState(next);
    const r = next === "system" ? systemTheme() : next;
    setResolved(r);
    apply(next);
  }, []);

  useEffect(() => {
    if (theme !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const onChange = () => {
      setResolved(systemTheme());
      apply("system");
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      resolved,
      setTheme: (t: Theme) => {
        setThemeState(t);
        localStorage.setItem(KEY, t);
        const r = t === "system" ? systemTheme() : t;
        setResolved(r);
        apply(t);
      },
      cycle: () => {
        const order: Theme[] = ["dark", "light", "system"];
        const i = order.indexOf(theme);
        const next = order[(i + 1) % order.length]!;
        setThemeState(next);
        localStorage.setItem(KEY, next);
        const r = next === "system" ? systemTheme() : next;
        setResolved(r);
        apply(next);
      },
    }),
    [theme, resolved],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

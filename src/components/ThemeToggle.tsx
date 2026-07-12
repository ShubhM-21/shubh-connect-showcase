import { Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export function ThemeToggle({ expanded = false, minimal = false }: { expanded?: boolean; minimal?: boolean }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const initialTheme = savedTheme || systemTheme;
    
    setTheme(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <Button
      variant="ghost"
      onClick={toggleTheme}
      className={`transition-all duration-300 ${
        minimal
          ? "!p-0 !bg-transparent !border-none !shadow-none w-5 h-5"
          : expanded
            ? "glass-card hover:bg-accent/20 w-full h-12 pl-4 justify-start"
            : "glass-card hover:bg-accent/20 w-12 h-12 justify-center px-0"
      }`}
      data-umami-event={`Sidebar - Theme Toggle`}
    >
      {theme === "light" ? (
        <Moon className="h-4 w-4 flex-shrink-0 text-black dark:text-white" />
      ) : (
        <Sun className="h-4 w-4 flex-shrink-0 text-black dark:text-white" />
      )}
      
      {/* Expanded Text */}
      <span className={`whitespace-nowrap transition-all duration-300 ${
        expanded ? "ml-3 opacity-100 w-auto" : "ml-0 opacity-0 w-0 overflow-hidden"
      }`}>
        {theme === "light" ? "Dark Mode" : "Light Mode"}
      </span>
      
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
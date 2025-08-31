import { Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export function ThemeToggle({ expanded = false }: { expanded?: boolean }) {
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
      className={`glass-card hover:bg-accent/20 transition-all duration-300 ${
        expanded ? "w-full h-12 px-4 justify-start" : "w-12 h-12 justify-center"
      }`}
    >
      {theme === "light" ? (
        <Moon className="h-4 w-4 flex-shrink-0" />
      ) : (
        <Sun className="h-4 w-4 flex-shrink-0" />
      )}
      
      {/* Expanded Text */}
      <span className={`ml-3 whitespace-nowrap transition-all duration-300 ${
        expanded ? "opacity-100 w-auto" : "opacity-0 w-0 overflow-hidden"
      }`}>
        {theme === "light" ? "Dark Mode" : "Light Mode"}
      </span>
      
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
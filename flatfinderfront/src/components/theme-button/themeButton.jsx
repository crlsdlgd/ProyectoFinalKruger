import { Button } from "@heroui/react";
import { useEffect, useState } from "react";
const ThemeButton = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "light";
    }
    return "light";
  });

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div>
      <Button
        type="button"
        onPress={toggleTheme}
        className="min-w-5 m-0 p-0 rounded-full w-10 bg-transparent"
      >
        {theme === "light" ? (
          // aqui va la imagen de luna en con src pues por defecto es de color negro (LUNA OSCURO)
          <img src="/svg/moon-solid.svg" alt="Dark Mode" className="w-5 h-5" />
        ) : (
          // aqui va el icono de sol en SVG por cuestion de colores en tema oscuro (SOL CLARO)
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-6 dark:text-txtdark"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
            />
          </svg>
        )}
      </Button>
    </div>
  );
};

export default ThemeButton;

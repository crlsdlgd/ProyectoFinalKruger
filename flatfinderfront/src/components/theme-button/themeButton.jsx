import { Button } from "@heroui/react";
import { useEffect, useState } from "react";
const ThemeButton = () => {
  const [theme, setTheme] = useState(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return "light";
  });

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    document.body.classList.remove("light", "dark"); // o cualquier tema que estés usando
    document.body.classList.add(theme);
  }, [theme]);

  return (
    <div>
      <Button
        type="button"
        onPress={toggleTheme}
        className="border-slate-400 min-w-5 m-0 p-0 rounded-full w-10"
      >
        {theme === "light" ? (
          <img src="/svg/moon-solid.svg" alt="Dark Mode" className="w-5 h-5" />
        ) : (
          <img src="/svg/sun-solid.svg" alt="Light Mode" className="w-5 h-5" />
        )}
      </Button>
    </div>
  );
};

export default ThemeButton;

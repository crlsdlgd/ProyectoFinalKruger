// Componente de Header
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return "light";
  });

  // Simulación de llamada a la base de datos
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Reemplaza esta URL con tu endpoint real
        const response = await fetch("https://api.example.com/user");
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    document.body.classList.remove("light", "dark"); // o cualquier tema que estés usando
    document.body.classList.add(theme);
  }, [theme]);

  return (
    <header>
      <div className="header-container">
        <div className="logo">
          <h1>FlatFinder</h1>
        </div>
        <nav>
          <ul>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/all-flats">All Flats</Link>
            </li>
            <li>
              <Link to="/new-flats">New Flat</Link>
            </li>
            <li>
              <Link to="/update-flats">Update Flat</Link>
            </li>
          </ul>
        </nav>
        <div>
          <button onClick={toggleTheme} className="border border-black">
            {theme === "light" ? (
              <img
                src="/svg/moon-solid.svg"
                alt="Dark Mode"
                className="w-5 h-5"
              />
            ) : (
              <img
                src="/svg/sun-solid.svg"
                alt="Light Mode"
                className="w-5 h-5"
              />
            )}
          </button>
        </div>
        <div className="user-info">
          {user ? <p>Welcome, {user.name}!</p> : <p>Loading user...</p>}
        </div>
      </div>
    </header>
  );
};

export default Header;

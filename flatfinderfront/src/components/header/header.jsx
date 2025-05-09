// Componente de Header
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ThemeButton from "../theme-button/themeButton";
import useAuthenticatedUser from "../../hooks/useAuthenticatedUser";

const Header = () => {
  const user = useAuthenticatedUser();

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
          <ThemeButton />
        </div>
        <div className="user-info">
          {user ? <p>Welcome, {user.name}!</p> : <p>Loading user...</p>}
        </div>
      </div>
    </header>
  );
};

export default Header;

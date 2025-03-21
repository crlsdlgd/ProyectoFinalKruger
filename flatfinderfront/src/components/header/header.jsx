// Componente de Header
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const Header = () => {
    const [user, setUser] = useState(null);

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

    return (
        <header>
            <div className="header-container">
                <div className="logo">
                    <h1>FlatFinder</h1>
                </div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/profile">Profile</Link>
                        </li>
                        <li>
                            <Link to="/Flat">All Flats</Link>
                        </li>
                        <li>
                            <Link to="/New Flat">New Flat</Link>
                        </li>
                        <li>
                            <Link to="/Update Flat">Update Flat</Link>
                        </li>
                    </ul>
                </nav>
                <div className="user-info">
                    {user ? (
                        <p>Welcome, {user.name}!</p>
                    ) : (
                        <p>Loading user...</p>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
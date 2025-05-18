// Componente de Header
import { useNavigate } from "react-router-dom";
import ThemeButton from "../theme-button/themeButton";
import useAuthenticatedUser from "../../hooks/useAuthenticatedUser";
import "./header.css";
import { Button, Avatar, button } from "@heroui/react";
const Header = () => {
  const navigate = useNavigate();

  const user = useAuthenticatedUser();

  return (
    <header>
      <div className="header-container border-b dark:border-[#27272a] border-[#e4e4e7]">
        <div className="logo">
          <h3 className="dark:text-txtdark text-txtlight">FlatFinder</h3>
        </div>
        <nav>
          <ul>
            <li>
              <Button
                onPress={() => navigate("/")}
                className="text-txtlight dark:text-txtdark header-link m-0 px-2 min-w-5 bg-transparent"
              >
                Home
              </Button>
            </li>
            <li>
              <Button
                onPress={() => navigate("/profile")}
                className="text-txtlight dark:text-txtdark header-link m-0 px-2 min-w-5 bg-transparent"
              >
                Profile
              </Button>
            </li>
            <li>
              <Button
                onPress={() => navigate("/all-flats")}
                className="text-txtlight dark:text-txtdark header-link m-0 px-2 min-w-5 bg-transparent"
              >
                All Flats
              </Button>
            </li>
            <li>
              <Button
                onPress={() => navigate("/new-flats")}
                className="text-txtlight dark:text-txtdark header-link m-0 px-2 min-w-5 bg-transparent"
              >
                New Flat
              </Button>
            </li>
            <li>
              <Button
                onPress={() => navigate("/update-flat")}
                className="text-txtlight dark:text-txtdark header-link m-0 px-2 min-w-5 bg-transparent"
              >
                Update Flat
              </Button>
            </li>
          </ul>
        </nav>
        <div className="header-actions">
          <div>
            <ThemeButton />
          </div>
          <div className="user-info">
            {user ? (
              <p className="dark:text-txtdark text-txtlight">
                Welcome, {user.name}!
              </p>
            ) : (
              <p className="dark:text-txtdark text-txtlight">Loading user...</p>
            )}
          </div>
          <div>
            {user ? (
              <div
                onClick={() => console.log("user")}
                className="cursor-pointer"
              >
                <Avatar showFallback name={user.name} />
              </div>
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

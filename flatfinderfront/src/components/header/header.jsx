// Componente de Header
import { useNavigate } from "react-router-dom";
import ThemeButton from "../theme-button/themeButton";
import useAuthenticatedUser from "../../hooks/useAuthenticatedUser";
import "./header.css";
import { Button, Avatar } from "@heroui/react";
const Header = () => {
  const navigate = useNavigate();

  const user = useAuthenticatedUser();

  return (
    <header>
      <div className="header-container border-b dark:border-[#27272a] border-[#e4e4e7]">
        <Button
          className="logo-container cursor-pointer min-w-[200px] bg-transparent"
          onPress={() => navigate("/")}
          radius="none"
        >
          <img
            src="/svg/flat-finder-logo2.svg"
            alt="Logo"
            className="h-10 shrink-0"
          />
          <h3 className="logo-text dark:text-txtdark text-txtlight">
            Flat Finder
          </h3>
        </Button>
        <nav>
          <ul>
            <li>
              <Button
                onPress={() => navigate("/")}
                className="text-txtlight dark:text-txtdark header-link m-0 px-2 min-w-5 bg-transparent"
                radius="none"
              >
                Home
              </Button>
            </li>
            <li>
              <Button
                onPress={() => navigate("/my-flats")}
                className="text-txtlight dark:text-txtdark header-link m-0 px-2 min-w-5 bg-transparent"
                radius="none"
              >
                My Flats
              </Button>
            </li>
            <li>
              <Button
                onPress={() => navigate("/favorites")}
                className="text-txtlight dark:text-txtdark header-link m-0 px-2 min-w-5 bg-transparent"
                radius="none"
              >
                Favorites
              </Button>
            </li>
            {user?.role === "admin" && (
              <li>
                <Button
                  onPress={() => navigate("/all-users")}
                  className="text-txtlight dark:text-txtdark header-link m-0 px-2 min-w-5 bg-transparent"
                  radius="none"
                >
                  Users
                </Button>
              </li>
            )}
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
              <Button
                onPress={() => console.log("user")}
                className="cursor-pointer min-w-0 w-10 p-0"
                radius="full"
              >
                <Avatar
                  showFallback
                  name={user.name}
                  src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                />
              </Button>
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

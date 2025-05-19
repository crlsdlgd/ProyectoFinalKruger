import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/react";
import useAuthenticatedUser from "../../hooks/useAuthenticatedUser";
import ThemeButton from "../theme-button/themeButton";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useAuthenticatedUser();
  const location = useLocation();

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "My Flats", href: "/my-flats" },
    { name: "Favorites", href: "/favorites" },
    { name: "Users", href: "/users" },
  ];

  return (
    <Navbar
      isBordered
      className="bg-transparent"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          className="text-txtlight dark:text-txtdark"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
        <NavbarBrand>
          <Link
            href="/"
            className="flex items-center gap-2 text-txtlight dark:text-txtdark hover:no-underline"
            underline="none"
          >
            <img src="/svg/flat-finder-logo2.svg" alt="Logo" className="h-10" />
            <p className="font-bold text-inherit hidden sm:block">
              FLAT FINDER
            </p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="sm:hidden" justify="center"></NavbarContent>
      <NavbarBrand className="hidden sm:flex">
        <Link
          href="/"
          className="flex items-center gap-2 text-txtlight dark:text-txtdark hover:no-underline"
          underline="none"
        >
          <img src="/svg/flat-finder-logo2.svg" alt="Logo" className="h-10" />
          <p className="font-bold text-inherit">FLAT FINDER</p>
        </Link>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link
            color={location.pathname === "/" ? "secondary" : "foreground"}
            href="/"
          >
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            color={
              location.pathname === "/my-flats" ? "secondary" : "foreground"
            }
            href="/my-flats"
          >
            My Flats
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            color={
              location.pathname === "/favorites" ? "secondary" : "foreground"
            }
            href="/favorites"
          >
            Favorites
          </Link>
        </NavbarItem>
        {user?.role === "admin" && (
          <NavbarItem>
            <Link
              color={
                location.pathname === "/all-users" ? "secondary" : "foreground"
              }
              href="/all-users"
            >
              Users
            </Link>
          </NavbarItem>
        )}
      </NavbarContent>

      <NavbarContent as="div" justify="end" className="gap-2">
        <ThemeButton />
        <p className="text-txtlight dark:text-txtdark text-xs">
          Welcome, {user?.name}
        </p>
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name={user?.name}
              size="sm"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold text-txtlight dark:text-txtdark">
                Signed in as
              </p>
              <p className="font-semibold text-txtlight dark:text-txtdark">
                {user?.email}
              </p>
            </DropdownItem>
            <DropdownItem
              key="profile"
              className="text-txtlight dark:text-txtdark"
              href={`/profile/${user?.id}`}
            >
              My Profile
            </DropdownItem>
            <DropdownItem
              key="update-password"
              className="text-txtlight dark:text-txtdark"
              href="/update-password"
            >
              Update Password
            </DropdownItem>
            <DropdownItem
              key="logout"
              color="danger"
              className="text-txtlight dark:text-txtdark"
              onPress={() => {
                localStorage.removeItem("token");
                window.location.href = "/login";
              }}
            >
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={index}>
            <Link
              className="text-txtlight dark:text-txtdark w-full"
              color="foreground"
              href={item.href}
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

import { Input, Button, addToast } from "@heroui/react";
import { useState } from "react";
import "./login.css";
import { UserService } from "../../services/userService.js";

// import FavoriteButton from "../../components/favorite-button/favoriteButton";
import ThemeButton from "../../components/theme-button/themeButton";
import { useNavigate } from "react-router-dom";
import { EyeSlashIcon } from "../../components/icons/eyeSlashIcon.jsx";
import { EyeIcon } from "../../components/icons/eyeIcon.jsx";
import { UserIcon } from "../../components/icons/userIcon.jsx";
import { KeyIcon } from "../../components/icons/keyIcon.jsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();
  // const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const userService = new UserService();
    const token = await userService.loginUser(email, password);
    if (token) {
      navigate("/");
    } else {
      addToast({
        title: "Login failed",
        description: "Invalid email or password",
        type: "error",
        variant: "bordered",
        color: "danger",
      });
    }
  };

  return (
    <main className="login-container dark:bg-[url('/assets/inspiration-desing/blurry-gradient-haikei(2).svg')] bg-[url('/assets/inspiration-desing/blurry-gradient-haikei(3).svg')] bg-cover">
      <div className="right-4 top-4 absolute">
        <ThemeButton />
      </div>
      <section className="login-form-container">
        <form onSubmit={(e) => handleLogin(e)} className="login-form">
          <div className="flex flex-col">
            <img
              src="/svg/flat-finder-logo2.svg"
              alt="Logo"
              className="h-10 mx-auto"
            />
            <p className="font-bold text-inherit hidden sm:block mx-auto text-txtlight dark:text-txtdark">
              Welcome to FLAT FINDER
            </p>
          </div>
          <h3 className="login-title text-txtlight dark:text-txtdark">
            Sign In
          </h3>
          <div>
            <Input
              label="Email"
              type="email"
              className="login-input text-txtlight dark:text-txtdark"
              isRequired
              variant="underlined"
              placeholder="example@gmail.com"
              value={email}
              onValueChange={setEmail}
              autoComplete="off"
              startContent={
                <UserIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
              }
            />
            <Input
              label="Password"
              type={isPasswordVisible ? "text" : "password"}
              className="login-input text-txtlight dark:text-txtdark"
              isRequired
              variant="underlined"
              placeholder="Password"
              value={password}
              onValueChange={setPassword}
              autoComplete="off"
              startContent={
                <KeyIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
              }
              endContent={
                <button
                  type="button"
                  className="text-txtlight dark:text-txtdark p-0 rounded-full h-8 w-8 min-w-8 flex items-center justify-center absolute -right-1 bottom-0 dark:hover:bg-white/10 hover:bg-gray-200 transition-colors duration-200"
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                  {isPasswordVisible ? <EyeSlashIcon /> : <EyeIcon />}
                </button>
              }
            />
            <Button type="submit" className="login-button">
              LOGIN
            </Button>
          </div>
          <p className="login-link text-txtlight dark:text-txtdark">
            Don't have an account? <a href="/register">Sign Up</a>
          </p>
        </form>
      </section>
    </main>
  );
};

export default Login;

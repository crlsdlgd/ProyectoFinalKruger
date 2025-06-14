import { Input, Button, addToast } from "@heroui/react";
import { useState } from "react";
import "./login.css";
import { UserService } from "../../services/userService.js";

// import FavoriteButton from "../../components/favorite-button/favoriteButton";
import ThemeButton from "../../components/theme-button/themeButton";
import { useNavigate } from "react-router-dom";
import { EyeSlashIcon } from "../../components/icons/eyeSlashIcon.jsx";
import { EyeIcon } from "../../components/icons/eyeIcon.jsx";

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
    <main className="login-container dark:bg-bgdark bg-bglight">
      <div>
        <ThemeButton />
      </div>
      <section className="login-form-container">
        <form onSubmit={(e) => handleLogin(e)} className="login-form">
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
              placeholder="Enter your email"
              value={email}
              onValueChange={setEmail}
              autoComplete="off"
            />
            <Input
              label="Password"
              type={isPasswordVisible ? "text" : "password"}
              className="login-input text-txtlight dark:text-txtdark"
              isRequired
              variant="underlined"
              placeholder="Enter your password"
              value={password}
              onValueChange={setPassword}
              autoComplete="off"
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

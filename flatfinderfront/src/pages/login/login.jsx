import { Input, Button, addToast } from "@heroui/react";
import { useState } from "react";
import "./login.css";
import { UserService } from "../../services/userService.js";

// import FavoriteButton from "../../components/favorite-button/favoriteButton";
// import ThemeButton from "../../components/theme-button/themeButton";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  // const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const userService = new UserService();
    const token = await userService.loginUser(email, password);
    if (token) {
      navigate("/home");
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
    <main className="login-container dark:bg-slate-900">
      <section className="login-form-container">
        <form onSubmit={(e) => handleLogin(e)} className="login-form">
          <h3 className="login-title">Sign In</h3>
          <div>
            <Input
              label="Email"
              type="email"
              className="login-input"
              isRequired
              variant="underlined"
              placeholder="Enter your email"
              value={email}
              onValueChange={setEmail}
              autoComplete="off"
            />
            <Input
              label="Password"
              type="password"
              className="login-input"
              isRequired
              variant="underlined"
              placeholder="Enter your password"
              value={password}
              onValueChange={setPassword}
              autoComplete="off"
            />
            <Button type="submit" className="login-button">
              LOGIN
            </Button>
          </div>
          <p className="login-link">
            Don't have an account? <a href="/register">Sign Up</a>
          </p>
        </form>
      </section>
    </main>
  );
};

export default Login;

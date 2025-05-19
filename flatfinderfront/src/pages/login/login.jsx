import { Input, Button, addToast } from "@heroui/react";
import { useState } from "react";
import "./login.css";
import { UserService } from "../../services/userService.js";

// import FavoriteButton from "../../components/favorite-button/favoriteButton";
import ThemeButton from "../../components/theme-button/themeButton";
import { useNavigate } from "react-router-dom";

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
                  className="text-black p-0 rounded-full h-8 w-8 min-w-8 flex items-center justify-center absolute -right-1 bottom-0 dark:hover:bg-white/10 hover:bg-gray-200 transition-colors duration-200"
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                  {isPasswordVisible ? (
                    // <img
                    //   src="/svg/eye-slash.svg"
                    //   alt="Hide password"
                    //   className="w-5 h-5"
                    // />
                    // Image for eye-slash
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-5 h-5 dark:text-txtdark text-txtlight"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  ) : (
                    // <img src="/svg/eye.svg" alt="Show password" className="w-5 h-5" />
                    // Image for eye
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-5 h-5 dark:text-txtdark text-txtlight"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                  )}
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

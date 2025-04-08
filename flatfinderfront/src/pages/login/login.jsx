import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { useState } from "react";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <main className="login-container">
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
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
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

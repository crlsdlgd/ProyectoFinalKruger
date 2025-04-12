import { Input, Button } from "@heroui/react";
import { useState } from "react";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = (e) => {
    e.preventDefault();
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

import { Input } from "@heroui/input";
import "./login.css";

const Login = () => {
  return (
    <div>
      <h1>Login</h1>
      <Input
        label="Email"
        type="email"
        className="email-input"
        variant="faded"
        isRequired
        color="primary"
      />
      <Input
        label="Password"
        type="password"
        className="email-input"
        color="success"
      />
    </div>
  );
};

export default Login;

import { useState } from "react";
import UserForm from "../../components/user-form/userForm";
import { UserService } from "../../services/userService";
import { useNavigate } from "react-router-dom";
import { addToast } from "@heroui/react";
import "./register.css";
import ThemeButton from "../../components/theme-button/themeButton";

const Register = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const submitRegister = async (e) => {
    e.preventDefault();
    const userService = new UserService();

    try {
      const response = await userService.saveUser(user);
      addToast({
        title: "Register success",
        description: "User registered successfully, please login",
        type: "success",
        variant: "bordered",
        color: "success",
      });
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      let description = "Registration failed";
      if (error.message.includes("email")) {
        description = "Email is already in use";
      }
      // else if (error.message.includes("nickname")) {
      //   description = "Nickname is already taken";
      // }

      addToast({
        title: "Register failed",
        description,
        type: "error",
        variant: "bordered",
        color: "danger",
      });
    }

    if (response) {
    } else {
      addToast({
        title: "Register failed",
        description: "User already exists",
        type: "error",
        variant: "bordered",
        color: "danger",
      });
    }
  };

  return (
    <main className="register-container dark:bg-bgdark bg-bglight transition-colors duration-500">
      <div>
        <ThemeButton />
      </div>
      <div>
        <UserForm
          user={user}
          setUser={setUser}
          action={submitRegister}
          buttonAction={"REGISTER"}
        />
        <p className="login-link text-txtlight dark:text-txtdark transition-colors duration-500">
          Already have an account? <a href="/login">Sign in</a>
        </p>
      </div>
    </main>
  );
};

export default Register;

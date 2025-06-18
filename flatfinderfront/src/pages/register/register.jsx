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

      addToast({
        title: "Register failed",
        description,
        type: "error",
        variant: "bordered",
        color: "danger",
      });
    }
  };

  return (
    <main className="register-container dark:bg-bgdark bg-bglight">
      <div className="absolute right-4 top-4">
        <ThemeButton />
      </div>

      <div className="register-form-container dark:bg-bgdarkOpacity bg-bglightOpacity">
        <img
          src="/svg/flat-finder-logo2.svg"
          alt="Logo"
          className="h-10 mx-auto mb-2"
        />
        <p className="font-bold text-inherit hidden sm:block mx-auto text-txtlight dark:text-txtdark text-center">
          Welcome to FLAT FINDER
        </p>
        <UserForm
          user={user}
          setUser={setUser}
          action={submitRegister}
          buttonAction={"REGISTER"}
        />
        <p className="login-link text-txtlight dark:text-txtdark">
          Already have an account? <a href="/login">Sign in</a>
        </p>
      </div>
    </main>
  );
};

export default Register;

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
        window.location.href = "/login";
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
    
      <div className="register-form register-form-container dark:bg-bgdark bg-bglight">
        <div className="flex flex-col items-center mb-4">
          <img
            src="/svg/flat-finder-logo2.svg"
            alt="Logo"
            className="h-10 shrink-0"
          />
          <p className="font-bold text-inherit hidden sm:block mx-auto text-txtlight dark:text-txtdark">
            Welcome to FLAT FINDER
          </p>
        </div>
        <div className="flex justify-center">
          
          <h1 className="register-title text-txtlight dark:text-txtdark">
            Register
          </h1>
        </div>
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

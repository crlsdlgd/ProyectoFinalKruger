import { useState } from "react";
import { Input, Button, DatePicker } from "@heroui/react";
import { calculateAge } from "../../utils/utils";

const UserForm = ({ user, setUser, action, buttonAction }) => {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const isNameInvalid = (name) => !name || name.length < 2;

  const handleRegister = (e) => {
    e.preventDefault();
    action(e);
  };

  return (
    <form onSubmit={(e) => handleRegister(e)}>
      <Input
        value={user.firstName}
        onChange={(e) => setUser({ ...user, firstName: e.target.value })}
        label="First Name"
        type="text"
        className="user-input"
        isRequired
        variant="underlined"
        placeholder="Enter your first name"
        autoComplete="off"
        validate={(value) => {
          return isNameInvalid(value)
            ? "First name must be at least 2 characters long"
            : null;
        }}
      />
      <Input
        value={user.lastName}
        onChange={(e) => setUser({ ...user, lastName: e.target.value })}
        label="Last Name"
        type="text"
        className="user-input"
        isRequired
        variant="underlined"
        placeholder="Enter your last name"
        autoComplete="off"
        validate={(value) => {
          return isNameInvalid(value)
            ? "Last name must be at least 2 characters long"
            : null;
        }}
      />
      <DatePicker
        value={user.birthdate}
        onChange={(date) => setUser({ ...user, birthdate: date })}
        label="Birthdate"
        type="CalendarDate"
        className="user-input"
        isRequired
        variant="underlined"
        placeholder="Enter your birthdate"
        showMonthAndYearPickers
        autoComplete="off"
        validate={(birthdate) => {
          return calculateAge(birthdate) < 18 || calculateAge(birthdate) > 120
            ? "Age must be 18 to 120 years old"
            : null;
        }}
      />
      <Input
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        label="Email"
        type="email"
        className="user-input"
        isRequired
        variant="underlined"
        placeholder="Enter your email"
        autoComplete="off"
        errorMessage="Invalid email format"
      />
      <Input
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        label="Password"
        type={isPasswordVisible ? "text" : "password"}
        className="user-input"
        isRequired
        variant="underlined"
        placeholder="Enter your password"
        autoComplete="off"
        endContent={
          <button
            type="button"
            className="text-black p-0"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            {isPasswordVisible ? (
              <img
                src="/svg/eye-slash.svg"
                alt="Ocultar contraseña"
                className="w-5 h-5"
              />
            ) : (
              <img
                src="/svg/eye.svg"
                alt="Mostrar contraseña"
                className="w-5 h-5"
              />
            )}
          </button>
        }
        validate={(value) => {
          return !value.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/)
            ? "Min 6 chars, incl. letter, number & symbol"
            : null;
        }}
      />
      <Input
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        label="Confirm Password"
        type={isConfirmPasswordVisible ? "text" : "password"}
        className="user-input"
        isRequired
        variant="underlined"
        placeholder="Confirm your password"
        autoComplete="off"
        endContent={
          <button
            type="button"
            className="text-black p-0"
            onClick={() =>
              setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
            }
          >
            {isConfirmPasswordVisible ? (
              <img
                src="/svg/eye-slash.svg"
                alt="Ocultar contraseña"
                className="w-5 h-5"
              />
            ) : (
              <img
                src="/svg/eye.svg"
                alt="Mostrar contraseña"
                className="w-5 h-5"
              />
            )}
          </button>
        }
        validate={(value) => {
          return value !== user.password ? "Passwords do not match" : null;
        }}
      />
      <Button type="submit">{buttonAction}</Button>
    </form>
  );
};

export default UserForm;

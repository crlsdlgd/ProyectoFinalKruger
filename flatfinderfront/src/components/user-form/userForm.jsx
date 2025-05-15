import { useState } from "react";
import { Input, Button, DatePicker, Form } from "@heroui/react";
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
    <Form onSubmit={(e) => handleRegister(e)}>
      <Input
        value={user.firstname}
        onChange={(e) => setUser({ ...user, firstname: e.target.value })}
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
        value={user.lastname}
        onChange={(e) => setUser({ ...user, lastname: e.target.value })}
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
            className="text-black p-0 rounded-full h-8 w-8 min-w-8 flex items-center justify-center absolute -right-1 bottom-0 dark:hover:bg-white/10 hover:bg-gray-200"
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
            className="text-black p-0 rounded-full h-8 w-8 min-w-8 flex items-center justify-center absolute -right-1 bottom-0 dark:hover:bg-white/10 hover:bg-gray-200"
            onClick={() =>
              setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
            }
          >
            {isConfirmPasswordVisible ? (
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
        validate={(value) => {
          return value !== user.password ? "Passwords do not match" : null;
        }}
      />
      <Button type="submit">{buttonAction}</Button>
    </Form>
  );
};

export default UserForm;

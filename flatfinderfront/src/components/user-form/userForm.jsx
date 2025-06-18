import { useState } from "react";
import { Input, Button, DatePicker, Form, Checkbox } from "@heroui/react";
import { calculateAge } from "../../utils/utils";
import { parseDate, today } from "@internationalized/date";
import useUserRole from "../../hooks/useUserRole";
import { EyeSlashIcon } from "../icons/eyeSlashIcon";
import { EyeIcon } from "../icons/eyeIcon";

const UserForm = ({ user, setUser, action, buttonAction }) => {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const userLoggedRole = useUserRole();

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
        value={user.birthdate ? parseDate(user.birthdate.slice(0, 10)) : null}
        onChange={(e) => setUser({ ...user, birthdate: e?.toString() || null })}
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
        isDisabled={buttonAction === "UPDATE"}
      />

      {userLoggedRole === "admin" && (
        <Checkbox
          isSelected={user.role === "admin"}
          onChange={(e) =>
            setUser({ ...user, role: e.target.checked ? "admin" : "user" })
          }
        >
          Admin
        </Checkbox>
      )}

      {buttonAction === "REGISTER" && (
        <>
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
                className="text-txtlight dark:text-txtdark p-0 rounded-full h-8 w-8 min-w-8 flex items-center justify-center absolute -right-1 bottom-0 dark:hover:bg-white/10 hover:bg-gray-200"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                {isPasswordVisible ? <EyeSlashIcon /> : <EyeIcon />}
              </button>
            }
            validate={(value) => {
              return !value.match(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/
              )
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
                className="text-txtlight dark:text-txtdark p-0 rounded-full h-8 w-8 min-w-8 flex items-center justify-center absolute -right-1 bottom-0 dark:hover:bg-white/10 hover:bg-gray-200"
                onClick={() =>
                  setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                }
              >
                {isConfirmPasswordVisible ? <EyeSlashIcon /> : <EyeIcon />}
              </button>
            }
            validate={(value) => {
              return value !== user.password ? "Passwords do not match" : null;
            }}
          />
        </>
      )}

      <Button type="submit" color="primary" className="w-full mt-2">
        {buttonAction}
      </Button>
    </Form>
  );
};

export default UserForm;

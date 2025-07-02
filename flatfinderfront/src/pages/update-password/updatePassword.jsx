import Footer from "../../components/footer/footer";
import "../pages.css";
import { NavBar } from "../../components/navbar/navbar";
import { useState } from "react";
import { addToast, Button, Input } from "@heroui/react";
import { EyeSlashIcon } from "../../components/icons/eyeSlashIcon";
import { EyeIcon } from "../../components/icons/eyeIcon";
import "./updatePassword.css";
import { UserService } from "../../services/userService";

const UpdatePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isCurrentPasswordVisible, setIsCurrentPasswordVisible] =
    useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isConfirmNewPasswordVisible, setIsConfirmNewPasswordVisible] =
    useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    updatePassword();
  };

  const updatePassword = async () => {
    const userService = new UserService();
    try {
      await userService.updatePassword(currentPassword, newPassword);
      addToast({
        title: "Password updated",
        description: "Password updated successfully",
        type: "success",
        variant: "bordered",
        color: "success",
      });
      setTimeout(() => {
        window.history.back();
      }, 2000);
    } catch (error) {
      addToast({
        title: "Update password failed",
        description: error.message || "Unexpected error",
        type: "error",
        variant: "bordered",
        color: "danger",
      });
    }
  };

  return (
    <div className="page-wrapper dark:bg-[url('/assets/inspiration-desing/blurry-gradient-haikei(2).svg')] bg-[url('/assets/inspiration-desing/blurry-gradient-haikei(3).svg')] bg-cover">
      <div>
        <NavBar />
      </div>
      <main className="update-password-container">
        <section>
          <form
            onSubmit={handleSubmit}
            className="update-password-form bg-background/30 before:bg-white/10"
          >
            <div>
              <Input
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                label="Current Password"
                type={isCurrentPasswordVisible ? "text" : "password"}
                className="update-password-input text-txtlight dark:text-txtdark"
                variant="underlined"
                isRequired
                placeholder="Enter current password"
                autoComplete="off"
                endContent={
                  <button
                    type="button"
                    onClick={() =>
                      setIsCurrentPasswordVisible(!isCurrentPasswordVisible)
                    }
                  >
                    {isCurrentPasswordVisible ? <EyeSlashIcon /> : <EyeIcon />}
                  </button>
                }
              ></Input>
            </div>

            <div>
              <Input
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                label="New Password"
                type={isNewPasswordVisible ? "text" : "password"}
                className="update-password-input text-txtlight dark:text-txtdark"
                variant="underlined"
                isRequired
                placeholder="Enter new password"
                autoComplete="off"
                endContent={
                  <button
                    type="button"
                    onClick={() =>
                      setIsNewPasswordVisible(!isNewPasswordVisible)
                    }
                  >
                    {isNewPasswordVisible ? <EyeSlashIcon /> : <EyeIcon />}
                  </button>
                }
                validate={(value) => {
                  return !value.match(
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/
                  )
                    ? "Min 6 chars, incl. letter, number & symbol"
                    : null;
                }}
              ></Input>
            </div>

            <div>
              <Input
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                label="Confirm New Password"
                type={isConfirmNewPasswordVisible ? "text" : "password"}
                className="update-password-input text-txtlight dark:text-txtdark"
                variant="underlined"
                isRequired
                placeholder="Confirm new password"
                autoComplete="off"
                endContent={
                  <button
                    type="button"
                    onClick={() =>
                      setIsConfirmNewPasswordVisible(
                        !isConfirmNewPasswordVisible
                      )
                    }
                  >
                    {isConfirmNewPasswordVisible ? (
                      <EyeSlashIcon />
                    ) : (
                      <EyeIcon />
                    )}
                  </button>
                }
                validate={(value) => {
                  return value !== newPassword
                    ? "Passwords do not match"
                    : null;
                }}
              ></Input>
            </div>
            <Button type="submit" className="update-password-button">
              Update Password
            </Button>
          </form>
        </section>
      </main>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default UpdatePassword;

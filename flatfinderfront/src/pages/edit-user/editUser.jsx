import Footer from "../../components/footer/footer";
import "../pages.css";
import { NavBar } from "../../components/navbar/navbar";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { UserService } from "../../services/userService";
import { addToast } from "@heroui/react";
import UserForm from "../../components/user-form/userForm";
import "./editUser.css";

const EditUser = () => {
  const [user, setUser] = useState({});
  const { userId } = useParams();

  useEffect(() => {
    loadUser();
  }, [userId]);

  const loadUser = async () => {
    const userService = new UserService();
    const data = await userService.getUserById(userId);
    setUser(data);
  };

  const updateUser = async () => {
    const userService = new UserService();
    try {
      await userService.updateUser(userId, user);
      addToast({
        title: "User updated",
        description: "User updated successfully",
        type: "success",
        variant: "bordered",
        color: "success",
      });
      setTimeout(() => {
        window.history.back();
      }, 2000);
    } catch (error) {
      addToast({
        title: "Update failed",
        description: "Error updating user",
        type: "error",
        variant: "bordered",
        color: "danger",
      });
    }
  };

  return (
    <div className="page-wrapper dark:bg-bgdark bg-bglight">
      <div>
        <NavBar />
      </div>
      <main className="edit-user-container">
        <div className="edit-user-form dark:bg-bgdarkOpacity bg-bglightOpacity">
          <UserForm
            user={user}
            setUser={setUser}
            action={updateUser}
            buttonAction={"UPDATE"}
          />
        </div>
      </main>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default EditUser;

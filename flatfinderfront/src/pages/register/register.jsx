import { useState } from "react";
import UserForm from "../../components/user-form/userForm";
import { UserService } from "../../services/userService";

const Register = () => {
  const [user, setUser] = useState({});

  const submitRegister = async (e) => {
    e.preventDefault();
    const userService = new UserService();
    const response = await userService.saveUser(user);
    console.log("response: ", response);
  };

  return (
    <main className="dark:bg-slate-900">
      <div>
        <UserForm
          user={user}
          setUser={setUser}
          action={submitRegister}
          buttonAction={"REGISTER"}
        />
      </div>
    </main>
  );
};

export default Register;

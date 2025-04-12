import { useState } from "react";
import UserForm from "../../components/user-form/userForm";

const Register = () => {
  const [user, setUser] = useState({});

  const submitRegister = (e) => {
    e.preventDefault();
    console.log("User:", user);
  };

  return (
    <main>
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

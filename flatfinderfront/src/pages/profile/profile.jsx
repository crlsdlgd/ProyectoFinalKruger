import Footer from "../../components/footer/footer";
import "../pages.css";
import { NavBar } from "../../components/navbar/navbar";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserService } from "../../services/userService";
import { Button, Divider, Image, Tooltip } from "@heroui/react";
import { CloseIcon } from "../../components/icons/closeIcon";
import { UserIcon } from "../../components/icons/userIcon";
import { MailIcon } from "../../components/icons/mailIcon";
import { CalendarIcon } from "../../components/icons/calendarIcon";
import { ShieldIcon } from "../../components/icons/shieldIcon";
import "./profile.css";
import { PencilSquareIcon } from "../../components/icons/pencilSquareIcon";
const Profile = () => {
  const [user, setUser] = useState({});
  const [userLogged, setUserLogged] = useState(() => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  });
  const navigate = useNavigate();
  const { userId } = useParams();

  useEffect(() => {
    loadUser(userId);
  }, []);

  const loadUser = async (userId) => {
    const userService = new UserService();
    const data = await userService.getUserById(userId);
    setUser(data);
  };

  return (
    <div className="page-wrapper dark:bg-bgdark bg-bglight">
      <div>
        <NavBar />
      </div>
      <main>
        {user && (
          <div className="flex flex-col justify-between md:w-4/5 mx-auto relative">
            <div>
              <Image
                alt="profile image"
                className="object-cover"
                width="100%"
                height="auto"
                src="/assets/flat2.jpg"
              />
            </div>
            <div className="absolute top-4 right-4 z-10">
              <Button
                className="min-w-10 w-10 rounded-full p-0"
                onPress={() => window.history.back()}
              >
                <CloseIcon />
              </Button>
            </div>
            <div className="mt-4 user-info">
              <div className="flex items-center gap-2">
                <Divider className="my-2" orientation="vertical" />
                <UserIcon className="text-txtlight dark:text-txtdark" />
                <span className="text-txtlight dark:text-txtdark">{` ${user.firstname} ${user.lastname}`}</span>
              </div>
              <div className="flex items-center gap-2">
                <Divider className="my-2" orientation="vertical" />
                <MailIcon className="text-txtlight dark:text-txtdark" />
                <span className="text-txtlight dark:text-txtdark">{` ${user.email}`}</span>
              </div>
              <div className="flex items-center gap-2">
                <Divider className="my-2" orientation="vertical" />
                <CalendarIcon className="text-txtlight dark:text-txtdark" />
                <span className="text-txtlight dark:text-txtdark">
                  {user.birthdate ? ` ${user.birthdate.slice(0, 10)}` : " N/A"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Divider className="my-2" orientation="vertical" />
                <ShieldIcon className="text-txtlight dark:text-txtdark" />
                <span className="text-txtlight dark:text-txtdark">{` ${user.role}`}</span>
              </div>
            </div>
            <div className="flex justify-end">
              {(userLogged._id.toString() == user._id ||
                userLogged.role == "admin") && (
                <Tooltip
                  content="Edit User"
                  className="hover:cursor-pointer"
                  placement="top"
                  color="secondary"
                  delay={1000}
                  showArrow
                >
                  <Button
                    className="p-0 rounded-full w-10 min-w-10 bg-primary hover:bg-primary-hover text-txtdark right-4"
                    onPress={() => navigate(`/edit-user/${user._id}`)}
                  >
                    <PencilSquareIcon />
                  </Button>
                </Tooltip>
              )}
            </div>
          </div>
        )}
      </main>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Profile;

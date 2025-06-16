import {
  Button,
  Card,
  CardFooter,
  Chip,
  Image,
  Link,
  Tooltip,
  User,
} from "@heroui/react";
import { ShieldIcon } from "../icons/shieldIcon";
import { CalendarIcon } from "../icons/calendarIcon";
import { formatDateToISOShort } from "../../utils/utils";
import { EyeIcon } from "../icons/eyeIcon";
import { useNavigate } from "react-router-dom";

const UserCard = ({ user }) => {
  const navigate = useNavigate();

  return (
    <Card>
      <Image
        alt="flat image"
        className="object-cover"
        height={300}
        src="/assets/user1.jpg"
        width="100%"
      />
      <CardFooter className="bg-background/30 before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
        <div className="w-full">
          <div className="flex justify-between w-full">
            <User
              avatarProps={{
                src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
                size: "sm",
              }}
              description={<Link className="text-sm">{user.email}</Link>}
              name={user.firstname + " " + user.lastname}
              className="text-txtlight dark:text-txtdark"
            />
            <div className="flex flex-row items-center justify-between mt-2">
              <Chip color={user.role === "admin" && "success"}>
                <div className="flex flex-row items-center gap-1">
                  <ShieldIcon />
                  <p className="text-sm uppercase">{user.role}</p>
                </div>
              </Chip>
            </div>
          </div>
          <div className="flex justify-between w-full">
            <div className="flex flex-row items-center gap-1 mt-2">
              <CalendarIcon />
              <p className="text-sm">{formatDateToISOShort(user.createdAt)}</p>
            </div>
            <div>
              <Tooltip
                content="Details"
                className="hover:cursor-pointer"
                placement="top"
                color="secondary"
                delay={1000}
                showArrow
              >
                <Button
                  className="min-w-10 w-10 p-0 rounded-full bg-transparent"
                  onPress={() => navigate(`/profile/${user._id}`)}
                >
                  <EyeIcon className="text-txtlight dark:text-txtdark" />
                </Button>
              </Tooltip>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default UserCard;

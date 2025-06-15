import { formatTimeAgo } from "../../utils/utils";
import { Button, Input, Tooltip, User } from "@heroui/react";
import { SendIcon } from "../icons/sendIcon";
import { useState } from "react";
import "./messages.css";

const Messages = ({ messages = [], sendMessage }) => {
  const [content, setContent] = useState("");

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!content) return;
    sendMessage(content);
    setContent("");
  };

  return (
    <div className="messages-container flex flex-col md:w-4/5 mx-auto my-4 p-4">
      <form
        onSubmit={(e) => handleSendMessage(e)}
        className="messages-input-container mb-6 p-2 bg-[#f1f1ff] dark:bg-[#373843]"
      >
        <Input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="message-input text-txtlight dark:text-txtdark"
          placeholder="Write your message..."
          variant="underlined"
          label="Send a Message"
          endContent={
            <Tooltip
              content="Send"
              className="hover:cursor-pointer"
              placement="top"
              color="success"
              delay={1000}
              showArrow
            >
              <Button
                type="submit"
                color="success"
                variant="light"
                className="min-w-10 w-10 p-0 rounded-full mr-4"
              >
                <SendIcon />
              </Button>
            </Tooltip>
          }
        />
      </form>
      <div className="messages-list-container flex flex-col gap-2">
        <p className="text-txtlight dark:text-txtdark mb-2 font-bold">
          Messages
        </p>
        {messages.map((message) => (
          <div
            key={message._id}
            className="messages-item-container p-2 bg-[#f1f1ff] dark:bg-[#373843]"
          >
            <div className="message-header">
              <div className="message-user">
                <User
                  avatarProps={{
                    src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
                    size: "sm",
                  }}
                  description={message.senderId.email}
                  name={
                    message.senderId.firstname + " " + message.senderId.lastname
                  }
                  className="text-txtlight dark:text-txtdark size-sm"
                />
              </div>
              <div className="message-timeago">
                <p className="message-date text-txtlight dark:text-txtdark">
                  {formatTimeAgo(message.createdAt)}
                </p>
              </div>
            </div>
            <div className="message-content">
              <p className="text-txtlight dark:text-txtdark">
                {message.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Messages;

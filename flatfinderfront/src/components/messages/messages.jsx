import { formatTimeAgo } from "../../utils/utils";
const Messages = ({ messages = [] }) => {
  return (
    <div>
      {messages.map((message) => (
        <div key={message._id} className="message-container">
          <h3 className="message-content text-txtlight dark:text-txtdark">
            {message.content}
          </h3>
          <p className="message-date text-txtlight dark:text-txtdark">
            {formatTimeAgo(message.createdAt)}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Messages;

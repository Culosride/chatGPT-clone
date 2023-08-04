import { useContext } from "react";
import Button from "./Button";
import classes from "./chatHistory.module.css";
import { BsChatRightDots } from "react-icons/bs";
import ChatContext from "../store/chat-context";


const ChatsHistory = () => {
  const { chats, currentChat, setCurrentChat } = useContext(ChatContext);

  const navigateToChat = (e, id) => {
    setCurrentChat(id)
  }

  const handleNewChat = () => {
    setCurrentChat()
  }

  return (
    <div className={classes["history-container"]}>
      <Button onClick={handleNewChat} title="+ New chat" type="button" styles={"btn chat-panel"} />
      <div>
        {chats && chats.map((chat, index) => (
          <div className={classes["chat-container"]} onClick={(e) => navigateToChat(e, chat.id)} key={index}>
            <BsChatRightDots />
            <div className={classes.chat}>
              {chat.chatTitle}
              <div className={classes["text-fade"]}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatsHistory;

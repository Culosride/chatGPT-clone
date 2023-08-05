import { useContext } from "react";
import Button from "./Button";
import classes from "./chatsHistory.module.css";
import { BsChatRightDots, BsChatRightDotsFill } from "react-icons/bs";
import ChatContext from "../store/chat-context";


const ChatsHistory = () => {
  const { chats, currentChat, setCurrentChat, isSubmittingMsg } = useContext(ChatContext);

  const navigateToChat = (e, id) => {
    !isSubmittingMsg && setCurrentChat(id)
  }

  const handleNewChat = () => {
    !isSubmittingMsg && setCurrentChat()
  }

  return (
    <div className={classes["history-container"]}>
      <Button onClick={handleNewChat} content="+ New chat" type="button" styles={"btn chat-panel"} />
      <div>
        {chats && chats.map((chat, index) => (
          <div className={classes["chat-container"] } onClick={(e) => navigateToChat(e, chat.id)} key={index}>
            {chat.id === currentChat.id ? <BsChatRightDotsFill /> : <BsChatRightDots />}
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

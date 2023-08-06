import { useContext } from "react";
import Button from "./Button";
import classes from "./chatsHistory.module.css";
import { BsChatRightDots, BsChatRightDotsFill } from "react-icons/bs";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import ChatContext from "../store/chat-context";

const ChatsHistory = () => {
  const { chats, currentChat, setCurrentChat, isSubmittingMsg, editChatTitle, deleteChat } =
    useContext(ChatContext);

  const currentChatID = currentChat.id;

  const navigateToChat = (e, id) => {
    !isSubmittingMsg && setCurrentChat(id);
  };

  const handleNewChat = () => {
    !isSubmittingMsg && setCurrentChat();
  };

  const handleEdit = () => {
    !isSubmittingMsg && editChatTitle(currentChatID)
    console.log("Edit")
  };

  const handleDelete = () => {
    !isSubmittingMsg && deleteChat(currentChatID);
    console.log("Delete")
  };

  return (
    <div className={classes["history-container"]}>
      <Button onClick={handleNewChat} type="button" styles={"btn chat-panel"}>
        + New chat
      </Button>
      <div>
        {chats &&
          chats.map((chat, index) => (
            <div
              className={classes["chat-container"]}
              onClick={(e) => navigateToChat(e, chat.id)}
              key={index}
            >
              {chat.id === currentChatID ? (
                <BsChatRightDotsFill />
              ) : (
                <BsChatRightDots />
              )}
              <div className={classes.chat}>
                {chat.chatTitle}
                <div className={classes["chat-menu"]}>
                  <div className={classes["text-fade"]}></div>
                  {chat.id === currentChatID && (
                    <div className={classes["chat-actions"]}>
                      <Button onClick={handleEdit} styles="btn delete">
                        <AiOutlineEdit />
                      </Button>
                      <Button onClick={handleDelete} styles="btn edit">
                        <AiOutlineDelete />
                      </Button>
                    </div >
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ChatsHistory;

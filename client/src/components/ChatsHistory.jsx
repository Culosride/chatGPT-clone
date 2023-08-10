import { useContext, useEffect, useState } from "react";
import Button from "./Button";
import classes from "./chatsHistory.module.css";
import {
  BsChatRightDots,
  BsChatRightDotsFill,
  BsCheckLg,
} from "react-icons/bs";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { MdOutlineClose } from "react-icons/md";
import ChatContext from "../store/chat-context";

const ChatsHistory = () => {
  const {
    chats,
    currentChat,
    setCurrentChat,
    isSubmittingMsg,
    editChatTitle,
    deleteChat,
  } = useContext(ChatContext);

  useEffect(() => {
    setNewChatTitle(currentChat.chatTitle);
  }, [setCurrentChat, currentChat.chatTitle]);

  const [isEditing, setIsEditing] = useState(false);
  const [newChatTitle, setNewChatTitle] = useState(currentChat.chatTitle);
  const currentChatID = currentChat.id;
  const year = new Date().getFullYear()

  const navigateToChat = (id) => {
    !isSubmittingMsg && setCurrentChat(id);
  };

  const handleNewChat = () => {
    !isSubmittingMsg && setCurrentChat();
    setIsEditing(false);
  };

  const handleEdit = () => {
    !isSubmittingMsg && setIsEditing(true);
    console.log("Edit");
  };

  const submitEdit = () => {
    !isSubmittingMsg &&
      newChatTitle.split(" ").join("").length &&
      editChatTitle({ id: currentChatID, newTitle: newChatTitle });

    setIsEditing(false);
    console.log("Edit submitted");
  };

  const handleDelete = () => {
    !isSubmittingMsg && deleteChat(currentChatID);
    console.log("Delete");
  };

  const cancelEdit = () => {
    setIsEditing(false);
  };

  const handleTitleChange = (e) => {
    setNewChatTitle(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      submitEdit();
      setIsEditing(false);
    }
    if (e.key === "Escape") {
      setIsEditing(false);
    }
  };

  const orderedChats = chats.sort((a, b) => a.created - b.created);

  const chatList = orderedChats.map((chat, index) => (
    <div
      className={classes["chat-container"]}
      onClick={() => navigateToChat(chat.id)}
      key={index}
    >
      {chat.id === currentChatID ? (
        <BsChatRightDotsFill />
      ) : (
        <BsChatRightDots />
      )}
      <div
        style={{ padding: isEditing && chat.id === currentChatID && 0 }}
        className={classes.chat}
      >
        {isEditing && chat.id === currentChatID ? (
          <input
            autoFocus
            onBlur={() => setIsEditing(false)}
            className={classes["title-input"]}
            type="text"
            onKeyDown={handleKeyDown}
            value={newChatTitle}
            onChange={handleTitleChange}
          >
            {chat.title}
          </input>
        ) : (
          chat.chatTitle
        )}
        <div className={classes["chat-menu"]}>
          {isEditing && chat.id === currentChatID ? (
            ""
          ) : (
            <div className={classes["text-fade"]}></div>
          )}
          {!isEditing && chat.id === currentChatID && (
            <div className={classes["chat-actions"]}>
              <Button onClick={handleEdit} styles="btn actions">
                <AiOutlineEdit />
              </Button>
              <Button onClick={handleDelete} styles="btn actions">
                <AiOutlineDelete />
              </Button>
            </div>
          )}
          {isEditing && chat.id === currentChatID && (
            <div className={classes["chat-actions"]}>
              <Button
                type="button"
                onMouseDown={submitEdit}
                styles="btn actions"
              >
                <BsCheckLg />
              </Button>
              <Button
                type="button"
                onMouseDown={cancelEdit}
                styles="btn actions"
              >
                <MdOutlineClose />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  ));

  return (
    <div className={classes["history-container"]}>
      <Button
        onClick={handleNewChat}
        type="button"
        styles={"btn new chat-panel"}
      >
        + New chat
      </Button>
      <div className={classes["chats-container"]}>{chats && chatList}</div>

      <div className={classes.footer}>Culosride {year}</div>
    </div>
  );
};

export default ChatsHistory;

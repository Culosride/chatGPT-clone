import Button from "./Button";
import classes from "./chatHistory.module.css";
import { BsChatRightDots } from "react-icons/bs";

const DUMMY_CHATS = [
  { text: "This is a first chat" },
  { text: "This is a second chat blablaclblasdasdsadkd" },
  { text: "This is a Lore ipsum asdasd" },
  { text: "Lore ipsum asdasd" },
];

const ChatsHistory = () => {
  return (
    <div className={classes["history-container"]}>
      <Button title="+ New chat" type="button" styles={"btn chat-panel"} />
      <div>
        {DUMMY_CHATS.map((conv, index) => (
          <div className={classes["chat-container"]} key={index}>
            <BsChatRightDots />
            <div className={classes.chat}>{conv.text}
            <div className={classes["text-fade"]}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatsHistory;

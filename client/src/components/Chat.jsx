import { useContext, useEffect, useRef, useState } from "react";
import classes from "./chat.module.css";
import InputForm from "./InputForm";
import ChatContext from "../store/chat-context";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Chat = () => {
  const { currentChat, newMessage, setIsSubmittingMsg, isSubmittingMsg } =
    useContext(ChatContext);
  const [userInput, setUserInput] = useState("");
  const dummyDiv = useRef(null);
  const msgValidation = userInput.split(" ").join("").length > 0;

  useEffect(() => {
    dummyDiv.current?.scrollIntoView();
  }, [currentChat]);

  const handleChange = (e) => {
    setUserInput(e.target.value);
  };

  const getTextAreaRef = (textAreaRef) => {
    textAreaRef.current.focus()
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!msgValidation || isSubmittingMsg) {
      return;
    }

    try {
      if (!isSubmittingMsg) {
        // DISPLAYS USER MESSAGE FIRST
        setIsSubmittingMsg(true);
        newMessage({ content: userInput, role: "user" });
        setUserInput("");

        // SENDS REQUEST FOR USER INPUT MESSAGE
        const result = await fetch(`${BASE_URL}/openai/completion`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ msg: userInput }),
        });

        const data = await result.json();

        newMessage({
          userInput,
          newMessage: data.message,
          chatTitle: data.chatTitle,
          id: data.id,
          created: data.created,
        });
      }
    } catch (error) {
      console.log(error);
    }

    setIsSubmittingMsg(false);
  };

  const handleEnter = (e) => {
    // e.preventDefault()
    e.key === "Enter" && handleSubmit(e);
  };

  return (
    <section className={classes["chat-container"]}>
      <div className={classes.banner}>{currentChat.chatTitle}</div>
      <div className={classes["messages-container"]}>
        {currentChat.messages.map((message, index) => (
          <div
            key={index}
            className={`${classes["chat-message"]} ${
              message.role === "user" ? classes.user : classes.assistant
            }`}
          >
            <div className={classes.text}>{message.content}</div>
          </div>
        ))}
        {isSubmittingMsg && (
          <div className={`${classes["chat-message"]} ${classes.assistant}`}>
            <div className={classes.text}>...</div>
          </div>
        )}
        <div ref={dummyDiv} className={classes["dummy-div"]}></div>
      </div>
      <InputForm
        getTextAreaRef={getTextAreaRef}
        handleEnter={handleEnter}
        inputIsValid={msgValidation}
        handleSubmit={handleSubmit}
        msg={userInput}
        handleChange={handleChange}
      />
    </section>
  );
};

export default Chat;

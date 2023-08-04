import { useState } from "react";
import classes from "./chat.module.css";
import InputForm from "./InputForm";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Chat = () => {
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState([]);

  const handleChange = (e) => {
    setMsg(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await fetch(`${BASE_URL}/openai/completion`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ msg: msg }),
      });

      const data = await result.json();
      setChat((prev) => [
        ...prev,
        {
          role: "user",
          content: msg,
        },
        data.message,
      ]);
    } catch (error) {
      console.log(error);
    }
    setMsg("");
  };

  return (
    <section className={classes["chat-container"]}>
      <div className={classes.banner}>Chat title</div>
      <div className={classes["messages-container"]}>
        {chat.map((message, index) => (
          <div
            key={index}
            className={`${classes["chat-message"]} ${
              message.role === "user" ? classes.user : classes.assistant
            }`}
          >
            <div className={classes.text}>{message.content}</div>
          </div>
        ))}
      </div>
      <InputForm
        handleSubmit={handleSubmit}
        msg={msg}
        handleChange={handleChange}
      />
    </section>
  );
};

export default Chat;

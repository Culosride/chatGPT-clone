import classes from "./inputForm.module.css";
import Button from "./Button";
import { useContext, useEffect, useRef } from "react";
import ChatContext from "../store/chat-context";
import { VscSend } from "react-icons/vsc";
import { PiHourglassSimpleLight } from "react-icons/pi";

const InputForm = ({ handleChange, handleSubmit, msg, inputIsValid }) => {
  const { isSubmittingMsg } = useContext(ChatContext);
  const btnContent = isSubmittingMsg ? <PiHourglassSimpleLight /> : <VscSend />;
  const btnStyles = isSubmittingMsg ? "btn submit submitting" : "btn submit";
  const inputContainer = useRef();
  const textAreaRef = useRef();

  const handleTextArea = () => {
    inputContainer.current.style.height = "auto";
    inputContainer.current.style.height = `${textAreaRef.current.scrollHeight}px`;
  };

  useEffect(() => {
    handleTextArea()
    window.addEventListener("resize", handleTextArea);
    return () => {
      window.removeEventListener("resize", handleTextArea);
    };
  }, [msg]);

  return (
    <form
      onSubmit={handleSubmit}
      method="post"
      className={classes["form-container"]}
    >
      <div ref={inputContainer} className={classes["input-container"]}>
        <textarea
          spellCheck={false}
          ref={textAreaRef}
          rows="1"
          onInput={handleTextArea}
          placeholder="Let's chat"
          name="msg"
          value={msg}
          onChange={handleChange}
          className={classes["user-input"]}
          onFocus={(e) => (e.target.placeholder = "")}
          onBlur={(e) => (e.target.placeholder = "Let's chat")}
        />

        {inputIsValid && (
          <Button type="submit" styles={btnStyles}>
            {btnContent}
          </Button>
        )}
      </div>
    </form>
  );
};

export default InputForm;

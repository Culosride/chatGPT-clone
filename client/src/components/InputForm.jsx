import classes from "./inputForm.module.css";
import Button from "./Button";
import { useContext, useEffect, useRef } from "react";
import ChatContext from "../store/chat-context";
import { VscSend } from "react-icons/vsc";
import { PiHourglassSimpleLight } from "react-icons/pi";

const InputForm = ({
  handleChange,
  handleSubmit,
  handleEnter,
  getTextAreaRef,
  msg,
}) => {
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
    handleTextArea();
    window.addEventListener("resize", handleTextArea);
    return () => {
      window.removeEventListener("resize", handleTextArea);
    };
  }, [msg]);

  useEffect(() => {
    getTextAreaRef(textAreaRef);
  }, [getTextAreaRef]);

  return (
    <form
      onSubmit={(e) => handleSubmit(e, textAreaRef)}
      method="post"
      className={classes["form-container"]}
    >
      <div ref={inputContainer} className={classes["input-container"]}>
        <textarea
          spellCheck={false}
          ref={textAreaRef}
          rows="1"
          onKeyDown={handleEnter}
          onInput={handleTextArea}
          placeholder="Let's chat"
          name="msg"
          value={msg}
          onChange={handleChange}
          className={classes["user-input"]}
          onBlur={(e) => (e.target.placeholder = "Let's chat")}
        />

        <Button type="submit" styles={btnStyles}>
          {btnContent}
        </Button>
      </div>
    </form>
  );
};

export default InputForm;

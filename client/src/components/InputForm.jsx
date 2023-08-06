import classes from "./inputForm.module.css";
import Button from "./Button";
import { useContext } from "react";
import ChatContext from "../store/chat-context";
import { VscSend } from "react-icons/vsc";
import { PiHourglassSimpleLight } from "react-icons/pi";

const InputForm = ({ handleChange, handleSubmit, msg, inputIsValid }) => {
  const { isSubmittingMsg } = useContext(ChatContext);
  const btnContent = isSubmittingMsg ? <PiHourglassSimpleLight /> : <VscSend />;
  const btnStyles = isSubmittingMsg
    ? "btn user-input submitting"
    : "btn user-input";

  return (
    <form
      onSubmit={handleSubmit}
      method="post"
      className={classes["input-container"]}
    >
      <textarea
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
    </form>
  );
};

export default InputForm;

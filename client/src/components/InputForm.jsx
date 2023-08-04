import classes from "./inputForm.module.css";
import Button from "./Button";

const InputForm = ({ handleChange, handleSubmit, msg, inputIsValid }) => {

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
        <Button title="&gt;" type="submit" styles={"btn user-input"} />
      )}
    </form>
  );
};

export default InputForm;

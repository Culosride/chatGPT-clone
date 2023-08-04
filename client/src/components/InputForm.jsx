import classes from "./inputForm.module.css";

const InputForm = (props) => {

  return (
    <form
      onSubmit={props.handleSubmit}
      method="post"
      className={classes["input-container"]}
    >
      <textarea
        placeholder="Let's chat"
        name="msg"
        value={props.msg}
        onChange={props.handleChange}
        className={classes["user-input"]}
        onFocus={(e) => (e.target.placeholder = "")}
        onBlur={(e) => (e.target.placeholder = "Let's chat")}
      />
      <button type="submit" className={classes.btn}>
        {" "}
        &gt;{" "}
      </button>
    </form>
  );
};

export default InputForm;

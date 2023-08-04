import classes from "./button.module.css";

const Button = ({ title }) => {
  return (
    <button className={classes.btn} type="button">
      {title}
    </button>
  );
};

export default Button;

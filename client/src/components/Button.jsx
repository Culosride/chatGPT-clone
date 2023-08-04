import classes from "./button.module.css";

const Button = ({ title, styles, type }) => {
  const btnStyles = styles.split(" ").map(className => classes[className]).join(" ");

  return (
    <button className={btnStyles} type={type}>
      {title}
    </button>
  );
};

export default Button;

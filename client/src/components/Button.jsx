import classes from "./button.module.css";

const Button = ({ title, styles, type, onClick }) => {
  const btnStyles = styles.split(" ").map(className => classes[className]).join(" ");

  return (
    <button onClick={onClick} className={btnStyles} type={type}>
      {title}
    </button>
  );
};

export default Button;

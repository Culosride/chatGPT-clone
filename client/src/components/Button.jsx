import classes from "./button.module.css";

const Button = ({ content, styles, type, onClick, children }) => {
  const btnStyles = styles.split(" ").map(className => classes[className]).join(" ");

  return (
    <button onClick={onClick} className={btnStyles} type={type}>
      {children}
    </button>
  );
};

export default Button;

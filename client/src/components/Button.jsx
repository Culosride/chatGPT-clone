import classes from "./button.module.css";

const Button = ({ content, styles, type, onClick, onMouseDown, children }) => {
  const btnStyles = styles.split(" ").map(className => classes[className]).join(" ");
  console.log(onClick)
  return (
    <button onClick={onClick} onMouseDown={onMouseDown} className={btnStyles} type={type}>
      {children}
    </button>
  );
};

export default Button;

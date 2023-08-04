import classes from "./button.module.css";

const Button = ({ content, styles, type, onClick }) => {
  const btnStyles = styles.split(" ").map(className => classes[className]).join(" ");

  return (
    <button onClick={onClick} className={btnStyles} type={type}>
      {content}
    </button>
  );
};

export default Button;

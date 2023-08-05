import ChatsHistory from "./ChatsHistory";
import Chat from "./Chat";
import classes from "./main.module.css";

function Main() {

  return (
    <main className={classes.container}>
      <ChatsHistory />
      <Chat />
    </main>
  );
}

export default Main;

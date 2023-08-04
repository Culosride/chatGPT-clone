import HistoryPanel from "./ChatHistory";
import Chat from "./Chat";
import classes from "./main.module.css";

function Main() {

  return (
    <main className={classes.container}>
      <HistoryPanel />
      <Chat />
    </main>
  );
}

export default Main;

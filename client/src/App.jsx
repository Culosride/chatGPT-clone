import Main from "./components/Main";
import { ChatProvider } from "./store/ChatProvider";

const App = () => {
  return (
    <ChatProvider>
      <Main />
    </ChatProvider>
  );
};

export default App;

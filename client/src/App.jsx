import Main from "./components/Main";
import { ChatProvider } from "./store/CartProvider";

const App = () => {
  return (
    <ChatProvider>
      <Main />
    </ChatProvider>
  );
};

export default App;

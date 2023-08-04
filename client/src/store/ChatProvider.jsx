import { useReducer } from "react";
import ChatContext from "./chat-context.js";

const initialChatState = {
  chats: [],
  currentChat: { chatTitle: "New chat", messages: [] },
};

const chatReducer = (state, action) => {
  if (action.type === "NEW_MSG") {
    const existingChat = state.currentChat?.id;

    if (!existingChat) {
      const chatTitle = action.payload.chatTitle;
      const chatId = action.payload.id;

      const newCurrentChat = {
        chatTitle,
        id: chatId,
        messages: [
          {
            role: "user",
            content: action.payload.userInput,
          },
          action.payload.newMessage,
        ],
      };

      return {
        ...state,
        chats: state.chats.concat(newCurrentChat),
        currentChat: newCurrentChat,
      };
    } else {
      const updatedCurrentChat = {
        ...state.currentChat,
        messages: [
          ...state.currentChat.messages,
          { role: "user", content: action.payload.userInput },
          action.payload.newMessage,
        ],
      };

      const updatedChats = state.chats.filter(
        (chat) => chat.id !== action.payload.id
      );

      return {
        ...state,
        chats: updatedChats,
        currentChat: updatedCurrentChat,
      };
    }
  }

  if (action.type === "SET_CURRENT_CHAT") {
    const chat = state.chats.find((chat) => chat.id === action.payload);
    if (chat) {
      return {
        ...state,
        currentChat: chat,
      };
    } else {
      return {
        ...state,
        currentChat: { chatTitle: "New chat", messages: [] },
      };
    }
  }

  return initialChatState;
};

export const ChatProvider = (props) => {
  const [state, dispatch] = useReducer(chatReducer, initialChatState);

  const newMessage = (data) => {
    dispatch({ type: "NEW_MSG", payload: data });
  };

  const setCurrentChat = (chatId) => {
    dispatch({ type: "SET_CURRENT_CHAT", payload: chatId });
  };

  const chatContext = {
    chats: state.chats,
    currentChat: state.currentChat,
    newMessage,
    setCurrentChat,
  };

  return (
    <ChatContext.Provider value={chatContext}>
      {props.children}
    </ChatContext.Provider>
  );
};

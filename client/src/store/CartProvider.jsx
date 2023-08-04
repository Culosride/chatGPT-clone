import React, { useReducer, useCallback } from "react";
import ChatContext from "./chat-context.js";

const initialChatState = {
  chats: [],
  currentChat: { chatTitle: "New chat", messages: [] },
};

const chatReducer = (state, action) => {
  if (action.type === "ADD_MSG") {
    const chatTitle =
      state.currentChat.chatTitle === "New chat"
        ? action.payload.chatTitle
        : state.currentChat.chatTitle;

    const updatedCurrentChat = {
      ...state.currentChat,
      chatTitle,
      messages: [
        ...state.currentChat.messages,
        {
          role: "user",
          content: action.payload.userInput,
        },
        action.payload.newMessage,
      ],
    };

    return {
      ...state,
      currentChat: updatedCurrentChat,
    };
  }
  return initialChatState;
};

export const ChatProvider = (props) => {
  const [state, dispatch] = useReducer(chatReducer, initialChatState);

  const newMessage = (data) => {
    dispatch({ type: "ADD_MSG", payload: data });
  };

  const chatContext = {
    chatHistory: state.chatHistory,
    currentChat: state.currentChat,
    newMessage,
  };

  return (
    <ChatContext.Provider value={chatContext}>
      {props.children}
    </ChatContext.Provider>
  );
};

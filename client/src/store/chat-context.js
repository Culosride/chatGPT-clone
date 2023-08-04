import React from "react";

const initialState = {
  chats: [],
  currentChat: {},
  newMessage: () => {},
  newChat: () => {},
  deleteChat: () => {},
};

const ChatContext = React.createContext(initialState);

export default ChatContext;

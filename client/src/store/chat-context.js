import React from "react";

const initialState = {
  chats: [],
  currentChat: {},
  isSubmittingMsg: false,
  newMessage: () => {},
};

const ChatContext = React.createContext(initialState);

export default ChatContext;

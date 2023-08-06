import React from "react";

const initialState = {
  chats: [],
  currentChat: {},
  isSubmittingMsg: false,
};

const ChatContext = React.createContext(initialState);

export default ChatContext;

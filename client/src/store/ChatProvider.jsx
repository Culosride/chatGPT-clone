import { useReducer } from "react";
import ChatContext from "./chat-context.js";

const initialChatState = {
  chats: [],
  isSubmittingMsg: false,
  currentChat: { chatTitle: "New chat", messages: [] },
};

const chatReducer = (state, action) => {
  if (action.type === "SET_SUB_MSG") {
    return {
      ...state,
      isSubmittingMsg: action.payload,
    };
  }

  if (action.type === "NEW_MSG") {
    const existingChat = state.currentChat?.id;


    // REGISTERS USER MESSAGE
    if (action.payload.role === "user"  ) {
      const updatedMessages = [...state.currentChat.messages, action.payload];
      return {
        ...state,
        currentChat: { ...state.currentChat, messages: updatedMessages },
      };
    }

    // REGISTERS OPENAI RESPONSE IN NEW CHAT
    if (!existingChat) {
      console.log('New chat' )
      const chatTitle = action.payload.chatTitle.replace(/"/g, "");
      const chatId = action.payload.id;

      const newCurrentChat = {
        chatTitle,
        id: chatId,
        messages: [...state.currentChat.messages, action.payload.newMessage],
      };

      return {
        ...state,
        chats: [...state.chats, newCurrentChat],
        currentChat: newCurrentChat,
      };
    } else {
      // REGISTERS OPENAI RESPONSE IN EXISTING CHAT
      console.log('existing chat')

      const updatedCurrentChat = {
        ...state.currentChat,
        messages: [...state.currentChat.messages, action.payload.newMessage],
      };

      const updatedChats = state.chats.filter(
        (chat) => chat.id !== state.currentChat.id
      );

      return {
        ...state,
        chats: [...updatedChats, updatedCurrentChat],
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

  const setIsSubmittingMsg = (isSubmittingMsg) => {
    dispatch({ type: "SET_SUB_MSG", payload: isSubmittingMsg });
  };

  const setCurrentChat = (chatId) => {
    dispatch({ type: "SET_CURRENT_CHAT", payload: chatId });
  };

  const chatContext = {
    chats: state.chats,
    currentChat: state.currentChat,
    isSubmittingMsg: state.isSubmittingMsg,
    newMessage,
    setCurrentChat,
    setIsSubmittingMsg,
  };

  return (
    <ChatContext.Provider value={chatContext}>
      {props.children}
    </ChatContext.Provider>
  );
};

import { useReducer } from "react";
import ChatContext from "./chat-context.js";

const initialChatState = {
  chats: [
    {
      chatTitle: "Prova",
      id: "c1",
      created: 0,
      messages: [
        { role: "user", content: "Prova prova" },
        { role: "assitant", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec diam sapien. Fusce vitae diam convallis, suscipit augue vitae, porttitor massa. Nulla augue purus, varius ut metus vitae, gravida fermentum magna. In malesuada malesuada ante, at sodales orci blandit sit amet. Nam eu purus at nibh pharetra lacinia sit amet auctor enim. Mauris commodo tortor elit, ac varius neque eleifend non. Pellentesque ut odio commodo ipsum tristique faucibus in dictum diam. Sed rutrum varius odio ac rutrum. Etiam faucibus tempus ipsum, id commodo dolor mattis quis. Aenean tincidunt elit magna, quis rutrum ante molestie sed. Aenean eu magna commodo odio volutpat faucibus." },
        { role: "assitant", content: "Prova prova" },
        { role: "assitant", content: "Prova prova" },
        { role: "assitant", content: "Prova prova" },
        { role: "assitant", content: "Prova prova" },
        { role: "assitant", content: "Prova prova" },
        { role: "assitant", content: "Prova prova" },
        { role: "assitant", content: "Prova prova" },
        { role: "assitant", content: "Prova prova" },
        { role: "assitant", content: "Prova prova" },
        { role: "assitant", content: "Prova prova" },
        { role: "assitant", content: "Prova prova" },
        { role: "assitant", content: "Prova prova" },
        { role: "assitant", content: "Prova prova" },
        { role: "assitant", content: "Prova prova" },
        { role: "assitant", content: "Prova prova" },

      ],
    },
    {
      chatTitle: "Prova titolo lungo lungo lungo",
      id: "c2",
      created: 1,
      messages: [
        { role: "user", content: "Prova prova" },
        { role: "assitant", content: "Prova prova" },
      ],
    },
  ],
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
    if (action.payload.role === "user") {
      const updatedMessages = [...state.currentChat.messages, action.payload];
      return {
        ...state,
        currentChat: { ...state.currentChat, messages: updatedMessages },
      };
    }

    // REGISTERS OPENAI RESPONSE IN NEW CHAT
    if (!existingChat) {
      console.log("New chat");

      const { id, created, newMessage } = action.payload
      const chatTitle = action.payload.chatTitle.replace(/"/g, "");

      const newCurrentChat = {
        chatTitle,
        id,
        created,
        messages: [...state.currentChat.messages, newMessage],
      };

      return {
        ...state,
        chats: [...state.chats, newCurrentChat],
        currentChat: newCurrentChat,
      };
    } else {
      // REGISTERS OPENAI RESPONSE IN EXISTING CHAT
      console.log("existing chat");

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

  if (action.type === "DEL_CHAT") {
    const chatToDelete = state.chats.find((chat) => chat.id === action.payload);

    if (chatToDelete) {
      const updatedChats = state.chats.filter(
        (chat) => chat.id !== chatToDelete.id
      );
      return {
        ...state,
        chats: updatedChats,
      };
    }
  }

  if (action.type === "EDIT_TITLE") {

    const { id, newTitle } = action.payload
    const chatToEdit = state.chats.find(
      (chat) => chat.id === id
    );

    if (chatToEdit) {
      chatToEdit.chatTitle = newTitle;

      const updatedChats = state.chats.filter(
        (chat) => chat.id !== chatToEdit.id
      );

      return {
        ...state,
        chats: [...updatedChats, chatToEdit],
        currentChat: chatToEdit,
      };
    }
  }

  return initialChatState;
};

export const ChatProvider = (props) => {
  const [state, dispatch] = useReducer(chatReducer, initialChatState);

  const newMessage = (data) => {
    dispatch({ type: "NEW_MSG", payload: data });
  }

  const setIsSubmittingMsg = (isSubmittingMsg) => {
    dispatch({ type: "SET_SUB_MSG", payload: isSubmittingMsg });
  };

  const setCurrentChat = (chatId) => {
    dispatch({ type: "SET_CURRENT_CHAT", payload: chatId });
  };

  const deleteChat = (chatId) => {
    dispatch({ type: "DEL_CHAT", payload: chatId });
  };

  const editChatTitle = (chatId) => {
    dispatch({ type: "EDIT_TITLE", payload: chatId });
  };

  const chatContext = {
    chats: state.chats,
    currentChat: state.currentChat,
    isSubmittingMsg: state.isSubmittingMsg,
    newMessage,
    setCurrentChat,
    setIsSubmittingMsg,
    deleteChat,
    editChatTitle,
  };

  return (
    <ChatContext.Provider value={chatContext}>
      {props.children}
    </ChatContext.Provider>
  );
};

import { useEffect, useState } from "react";
import useChatSocket from "./useChatSocket";
import { get_chats } from "../../services/chat";
import './chatbody.css';

const ChatBody = ({userid, chatid, currChattingMember, setOnlineUserList}) => {

  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState({});
  const [typing, setTyping] = useState(false);

  const {sendMessage, handleTyping} = useChatSocket({
    userid, chatid, setMessages, setTyping, setOnlineUserList
  });

  useEffect(() => {
    const fetchChatMessages = async () => {
      if(chatid) setMessages(await get_chats(chatid, 20, 0));
    }
    fetchChatMessages();
  }, [chatid]);

  const messageSubmitHandler = (event) => {
    event.preventDefault();
    if(inputMessage.trim()) {
      sendMessage(inputMessage.trim());
      setInputMessage("");
    }
  }

  const getChatMessageClassName = (userid) =>
    currUserId === userid
      ? "flex justify-end items-start space-x-2 pb-3"
      : "flex justify-start items-start space-x-2 pb-3";

  return (
    <div className="w-full sm:w-4/5 lg:w-4/5 xl:w-5/6 px-0">
      <div className="py-2 px-4 border-b hidden lg:block">
        <div className="flex items-center py-1">
          <img
            src={currChattingMember?.image}
            className="rounded-full mr-2"
            alt="User"
            width="40"
            height="40"
          />
          <div className="flex-grow pl-3">
            <strong>{currChattingMember?.name}</strong>
          </div>
        </div>
      </div>
    
      <div className="relative">
        <div
          id="chat-message-container"
          className="chat-messages px-4 pt-4 pb-1 flex flex-col-reverse space-y-reverse space-y-2 overflow-y-auto"
        >
          {typing && (
            <div className="chat-message-left chat-bubble mb-1">
              <div className="typing flex space-x-1">
                <div className="dot w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div className="dot w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150" />
                <div className="dot w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300" />
              </div>
            </div>
          )}

          {messages?.results?.map((message, index) => (
            <div key={index} className={getChatMessageClassName(message.userid)}>
              <div>
                <img
                  src={message.image}
                  className="rounded-full mr-2"
                  alt={message.username}
                  width="40"
                  height="40"
                />
                <div className="text-gray-500 text-xs whitespace-nowrap mt-2">
                  {message.timestamp}
                </div>
              </div>
              <div className="flex-shrink bg-gray-100 ml-2 rounded py-2 px-3 mr-3">
                <div className="font-bold mb-1">{message.username}</div>
                {message.message}
              </div>
            </div>
          ))}
        </div>
      </div>
        
      <div className="flex-grow-0 py-3 px-4 border-t">
        <form onSubmit={messageSubmitHandler}>
          <div className="flex">
            <input
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyUp={handleTyping}
              value={inputMessage}
              type="text"
              className="flex-1 border border-gray-300 rounded-l px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Type your message"
              autoComplete="off"
            />
            <button
              className="bg-yellow-500 text-white px-4 py-2 rounded-r hover:bg-yellow-600 transition-colors"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>  
  );
};

export default ChatBody;
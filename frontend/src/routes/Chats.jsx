import React, { useState } from "react";
import ChatBody from "../components/chatbody/ChatBody";
import ChatBodyEmpty from "../components/chatbody/ChatBodyEmpty";
import Sidebar from "../components/sidebar/Sidebar";
import { useParams } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

const Chats = (props) => {
  const { chatid } = useParams();
  const { user } = useUser();
  const [currChattingMember, setCurrChattingMember] = useState({});
  const [onlineUserList, setOnlineUserList] = useState([]);

  return (
    <main className="content h-screen">
      <div className="flex flex-col lg:flex-row h-full">
        {user?.id && (
          <Sidebar
            userid={user.id}
            chatid={chatid}
            setCurrChattingMember={setCurrChattingMember}
            onlineUserList={onlineUserList}
            {...props}
          />
        )}
        {user?.id && (
          chatid ? (
            <ChatBody
              userid={user.id}
              chatid={chatid}
              setOnlineUserList={setOnlineUserList}
              currChattingMember={currChattingMember}
              {...props}
            />
          ) : (
            <ChatBodyEmpty />
          )
        )}
      </div>
    </main>
  );  
};

export default Chats;

import React, { useEffect, useState } from "react";
import ChatBody from "../components/chatbody/ChatBody";
import ChatBodyEmpty from "../components/chatbody/ChatBodyEmpty";
import Sidebar from "../components/sidebar/Sidebar";
import { get_user } from "../services/user";
import { useParams } from "react-router-dom";

const Chats = (props) => {
  const { chatid } = useParams();
  const [currUser, setCurrUser] = useState({});
  const [currChattingMember, setCurrChattingMember] = useState({});
  const [onlineUserList, setOnlineUserList] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      const result = await get_user();
      if(result.success) setCurrUser(result.data);
    };
    getUser();
  }, []);

  return (
    <main className="content h-screen">
      <div className="flex flex-col lg:flex-row h-full">
        {currUser?.id && (
          <Sidebar
            userid={currUser.id}
            chatid={chatid}
            setCurrChattingMember={setCurrChattingMember}
            onlineUserList={onlineUserList}
            {...props}
          />
        )}
        {currUser?.id && (
          chatid ? (
            <ChatBody
              userid={currUser.id}
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

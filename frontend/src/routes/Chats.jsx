import React, { useEffect, useState } from "react";
import ChatBody from "../components/chatbody/ChatBody";
import Sidebar from "../components/sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import { get_user } from "../services/user";

const Chats = (props) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentChattingMember, setCurrentChattingMember] = useState({});
  const [onlineUserList, setOnlineUserList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const result = await get_user();
      if(!result) navigate("/login");
      setCurrentUser(result);
    };
    getUser();
  }, [navigate]);

  return (
    <main className="content">
      <div className="container-fluid p-0">
        <div className="container-fluid">
          <div className="row g-0">
            <Sidebar
              currentUser = {currentUser}
              setCurrentChattingMember={setCurrentChattingMember}
              onlineUserList={onlineUserList}
              {...props}
            />
            <ChatBody
              currentUser = {currentUser}
              setOnlineUserList={setOnlineUserList}
              currentChattingMember={currentChattingMember}
              {...props}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Chats;

import React, { useEffect, useState } from "react";
import ChatBody from "../components/chatbody/ChatBody";
import Sidebar from "../components/sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import { get_user } from "../services/user";

const Chats = (props) => {
  const [currUser, setCurrUser] = useState(null);
  const [currChattingMember, setCurrChattingMember] = useState({});
  const [onlineUserList, setOnlineUserList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const result = await get_user();
      if(!result) navigate("/login");
      setCurrUser(result);
    };
    getUser();
  }, [navigate]);

  return (
    <main className="content">
      <div className="container-fluid p-0">
        <div className="container-fluid">
          <div className="row g-0">
            <Sidebar
              userid = {currUser?.id}
              chatid = {match?.params?.chatid}
              setCurrChattingMember={setCurrChattingMember}
              onlineUserList={onlineUserList}
              {...props}
            />
            <ChatBody
              userid = {currUser?.id}
              chatid = {match?.params?.chatid}
              setOnlineUserList={setOnlineUserList}
              currChattingMember={currChattingMember}
              {...props}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Chats;

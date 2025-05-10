import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { get_chat_users } from "../../services/chat";
import "./sidebar.css";
import {BsHouseDoor} from "react-icons/bs";

const Sidebar = ({ userid, chatid, setCurrChattingMember, onlineUserList }) => {
  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    const fetchRoomList = async () => {
      const response = await get_chat_users(userid);
      if (!response.success) return;
      setChatList(getChatList(response.data));
    }
    fetchRoomList();
  }, [])

  useEffect(() => {
    if (!chatList.length) return;
  
    const matchedUser = chatList.find(user => user.roomid == chatid);
    const defaultUser = matchedUser || chatList[0];
  
    if (defaultUser) setCurrChattingMember(defaultUser);
    
  }, [chatList, chatid]);
  

  const getChatList = (chat_users) => {
    return chat_users.flatMap(chat =>
      chat.members
        .filter(member => member.id !== userid)
        .map(member => ({
          ...member,
          roomid: chat.id,
          is_online: onlineUserList?.includes(member.id) || false,
        }))
    );
  };

  return (
    <div className="w-full lg:w-1/4 xl:w-1/5 border-r bg-white h-full shadow-sm">
      <div className="user-list-container px-3 py-4">
        {chatList.map((user) => {
          return (
            <Link
              onClick={() => setCurrChattingMember(user)}
              to={`/direct/c/${user.roomid}`}
              key={user.id}
              className={`flex items-center px-3 py-2 rounded-lg transition hover:bg-gray-100 ${(user.roomid == chatid) ? "bg-yellow-100" : ""}`}>
              <img
                src={user.image || `https://robohash.org/${user.username}.png`}
                className="rounded-full mr-3"
                alt={user.name}
                width="40"
                height="40"
              />
              <div className="flex-grow">
                <div className="font-medium">{user.name}</div>
                <div className="text-sm text-gray-500 flex items-center gap-1">
                  <span
                    className={`w-2 h-2 rounded-full ${user.is_online ? "bg-green-500" : "bg-gray-400"
                      }`}
                  ></span>
                  {user.is_online ? "Online" : "Offline"}
                </div>
              </div>
            </Link>
          );
        })}
        <Link to="/" 
                  type="button"
                  className="flex items-center text-black hover:text-gray-800 px-6 mt-2 space-x-3 text-base gap-1 absolute bottom-4"
                >
                  <BsHouseDoor className="text-xl" />
                  <span>Home</span>
                </Link>
      </div>
    </div>
  );
}

export default Sidebar;
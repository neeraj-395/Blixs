import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { get_chat_users } from "../../services/chat";
import "./sidebar.css";

const Sidebar = ({ userid, chatid, setCurrChattingMember, onlineUserList }) => {
  const [chatUsers, setChatUsers] = useState([]);

  useEffect(() => {
    const fetchRoomList = async () => {
      const response = await get_chat_users(userid);
      if (!response.success) return;
      setChatUsers(response.data);
    }
    fetchRoomList();
  }, [])

  const getChatListWithOnlineUser = () => {
    return chatUsers.flatMap(chat =>
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
        {getChatListWithOnlineUser()?.map((user) => {
          return (
            <Link
              onClick={() => setCurrChattingMember(user)}
              to={`/direct/c/${user.roomid}`}
              key={user.id}
              className={`flex items-center px-3 py-2 rounded-lg transition hover:bg-gray-100 ${(user.roomid == chatid) ? "bg-yellow-100" : ""}`}>
              <img
                src={user.image || `https://robohash.org/${user.id}.png`}
                className="rounded-full mr-3"
                alt={user.username}
                width="40"
                height="40"
              />
              <div className="flex-grow">
                <div className="font-medium">{user.username}</div>
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
      </div>
    </div>
  );
}

export default Sidebar;
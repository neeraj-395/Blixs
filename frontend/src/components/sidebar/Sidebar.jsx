import React, { useEffect, useState } from "react";
import "./sidebar.css";

const Sidebar = (props) => {
  // const [chatUsers, setChatUsers] = useState([]);
  // const [users, setUsers] = useState([]);
  // const [isShowAddPeopleModal, setIsShowAddPeopleModal] = useState(false);

  return (
    <div className="w-full sm:w-1/3 md:w-1/3 lg:w-1/3 xl:w-1/6 border-r">
      <div className="hidden md:block">
        <button
          onClick={''}
          className="w-full border border-yellow-500 text-yellow-500 hover:bg-yellow-100 font-medium rounded-md py-2 my-1 mt-4"
        >
          Add People
        </button>
      </div>

      {/* <div className="user-list-container">
        {getChatListWithOnlineUser()?.map((chatUser) => {
          return (
            <Link
              onClick={() => props.setCurrentChattingMember(chatUser)}
              to={`/c/${chatUser.roomId}`}
              className={`pl-1 py-2 px-2 rounded hover:bg-gray-100 cursor-pointer flex items-start ${getActiveChatClass(chatUser.roomId)}`}
              key={chatUser.id}
            >
              <img
                src={chatUser.image}
                className="rounded-full mr-2"
                alt={chatUser.name}
                width="40"
                height="40"
              />
              <div className="flex-grow ml-2">
                <div className="font-medium">{chatUser.name}</div>
                <div className="text-sm text-gray-500 flex items-center gap-1">
                  <span
                    className={`w-2 h-2 rounded-full ${chatUser.isOnline ? "bg-green-500" : "bg-gray-400"
                      }`}
                  ></span>
                  {chatUser.isOnline ? "Online" : "Offline"}
                </div>
              </div>
            </Link>
          );
        })}
      </div> */}

      <hr className="block lg:hidden mt-1 mb-0 border-t" />

      {/* <Modal
        modalCloseHandler={() => setIsShowAddPeopleModal(false)}
        show={isShowAddPeopleModal}
      >
        {users.length > 0 ? (
          users.map((user) => (
            <div
              key={user.id}
              className="flex items-center py-2"
            >
              <img
                src={user.image}
                className="rounded-full mr-2"
                alt={`${user.first_name} ${user.last_name}`}
                width="40"
                height="40"
              />
              <div className="flex-grow ml-2 mr-5">
                {user.first_name + " " + user.last_name}
              </div>
              <button
                onClick={() => addMemberClickHandler(user.id)}
                className="bg-green-500 hover:bg-green-600 text-white text-sm px-3 py-1 rounded"
              >
                Add
              </button>
            </div>
          ))
        ) : (
          <h3 className="text-lg font-semibold">No More User Found</h3>
        )}
      </Modal> */}
    </div>
  );
}

export default Sidebar;
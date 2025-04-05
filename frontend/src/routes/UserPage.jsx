import React, { useEffect, useState } from "react";
import { user } from "../services/users";

const UserPage = () => {
  const [user_Info, setUser_Info] = useState(null);

  
  useEffect(() => {
    const fetchData = async () => {
      const res = await user();
      if (res) {
        setUser_Info(res);
      }
    };
    
    fetchData();
  }, []);
  
  if (!user_Info) {
    return <div>Loading...</div>;
  }


  return (
    <div className="min-h-screen bg-black text-white px-15 py-10 md:ml-20 overflow-x-hidden">
      {/* Profile Section */}
      <div className="flex items-center mx-25 p-10 ">
        <img
          src={user_Info.profile_pic || "https://via.placeholder.com/150"}
          alt="Profile"
          className="w-50 h-50 rounded-full mr-50 border-2 border-white/30 bg-center"
        />
        <div>
          <h1 className="text-3xl p-3">{user_Info.username}</h1>
          <div className="flex space-x-6 mt-2 p-3">
            <span className="text-xl"><span className="font-bold text-xl">{user_Info.post_num}</span> posts</span>
            <span className="text-xl"><span className="font-bold text-xl">{user_Info.user_followers}</span> followers</span>
            <span className="text-xl"><span className="font-bold text-xl">{user_Info.user_following}</span> following</span>
          </div>
          <p className="text-s my4 p-3">{user_Info.bio}</p>
        </div>
      </div>

      {/* Posts Section */}
      <div className="border-t border-gray-700 pt-6">
        <h2 className="flex text-xl mb-4 justify-center p-3">Posts</h2>
        <div className="grid grid-cols-3 gap-4 p-5">
          <div className="bg-gray-800 aspect-square"></div>
          <div className="bg-gray-800 aspect-square"></div>
        </div>
      </div>
    </div>
  );
};
export default UserPage;

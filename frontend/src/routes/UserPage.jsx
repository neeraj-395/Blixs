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
    <div className="min-h-screen bg-black text-white p-6">
      {/* Profile Section */}
      <div className="flex items-center mb-6">
        <img
          src={user_Info.profile_pic || "https://via.placeholder.com/150"}
          alt="Profile"
          className="w-32 h-32 rounded-full mr-6"
        />
        <div>
          <h1 className="text-2xl font-bold">{user_Info.username}</h1>
          <div className="flex space-x-6 mt-2">
            <span>2 posts</span>
            <span>201 followers</span>
            <span>48 following</span>
          </div>
          <p className="mt-4">{user_Info.bio}</p>
        </div>
      </div>

      {/* Posts Section */}
      <div className="border-t border-gray-700 pt-6">
        <h2 className="text-xl mb-4">Posts</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gray-800 aspect-square"></div>
          <div className="bg-gray-800 aspect-square"></div>
        </div>
      </div>
    </div>
  );
};
export default UserPage;

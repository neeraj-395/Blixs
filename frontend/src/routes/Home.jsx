import React, { useState, useEffect } from 'react';
import Post from '../components/Post';
import { get_posts } from '../services/posting';
import { get_user } from "../services/user";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
      const getUser = async () => {
        const result = await get_user();
        if (!result.success) navigate("/login");
      };
      getUser();
    }, [navigate]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await get_posts();
        console.log("Fetched Posts: ", response);
        if (response && Array.isArray(response)) {
          setPosts(response);
        } else {
          setError('Invalid data format');
        }
      } catch (err) {
        setError('Error fetching posts: ' + err.message);
      }
    };

    fetchPosts();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-black p-4 flex flex-col items-center w-full md:ml-0">
      {posts.length > 0 ? (
        posts.map((post, index) => (
          <Post key={index} {...post} />
        ))
      ) : (
        <div>No posts available.</div>
      )}
    </div>
  );
};

export default Home;

import React, { useState, useEffect } from 'react';
import Post from '../components/post/Post';
import { get_posts } from '../services/post';

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchContent = async () => {
      const result = await get_posts();
      if (result.success) setPosts(result.data);
      console.log(result.data);
    };
    fetchContent();
  }, []);

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

"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import PromptCard from "./PromptCard";
import Loading from "./Loading";

// interface Post {
//   _id: string;
// }

// interface PromptCardListProps {
//   data: Post[] | undefined;
//   handleTagClick: (value: string) => void;
// }

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data?.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

function Feed() {
  const { data: session } = useSession();
  const [searchText, setSearchText] = useState < string > "";
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  const searchApiByTagEvent = async (value) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/prompt/posts/${value}`);
      const data = await response.json();
      setLoading(false);
      setPosts(data);
    } catch (err) {
      console.log(err);
    }
  };
  //: React.ChangeEvent<HTMLInputElement>

  const handleSearchChange = async (e) => {
    if (!e.target.value) fetchPosts();

    setSearchText(e.target.value);

    searchApiByTagEvent(e.target.value);
  };

  const fetchPosts = async () => {
    setLoading(true);
    const response = await fetch("/api/prompt");
    const data = await response.json();
    setLoading(false);
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <section className="feed">
      <form className="relative w-full flex">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      {loading ? (
        <Loading />
      ) : (
        <PromptCardList data={posts} handleTagClick={searchApiByTagEvent} />
      )}
    </section>
  );
}

export default Feed;

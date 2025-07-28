import React from "react";
import { useGetUserPostsQuery } from "../../../services/post/postService";
import PostsGrid from "../../sub/post-grid/PostsGrid";

const MorePosts = ({ userId }) => {
  const { data: userData } = useGetUserPostsQuery(userId);
  return (
    <div className="mb-8 mx-auto max-w-5xl">
      <h2 className="text-sm text-gray-500 font-normal mb-4">
        More posts from{" "}
        <span className="font-semibold text-black">{userData?.user?.name}</span>
      </h2>

      <PostsGrid posts={userData?.posts}/>
    </div>
  );
};

export default MorePosts;

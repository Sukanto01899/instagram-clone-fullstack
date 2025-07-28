import React from "react";
import GridItem from "./GridItem";

const PostsGrid = ({ posts }) => {
  return (
    <div class="grid grid-cols-3 gap-1">
      {posts &&
        posts.map((post) => <GridItem key={post._id} postId={post._id} image={post.image}/>)}
    </div>
  );
};

export default PostsGrid;

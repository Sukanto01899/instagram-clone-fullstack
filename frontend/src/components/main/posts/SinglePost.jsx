import React from "react";
import PostImage from "./PostImage";
import PostLikes from "./PostLikes";
import PostCaption from "./PostCaption";
import AddComment from "./AddComment";
import useLike from "../../../hooks/useLike";
import PostAction from "../../sub/post-action/PostAction";
import { Link } from "react-router-dom";
import PostHeader from "../../sub/post-action/PostHeader";

const SinglePost = ({ post }) => {
    const { handleLike, isLiked, likesCount } = useLike(post?._id);

    return (
        <article className="pb-4 mb-4 max-w-[560px] mx-auto border bg-white border-gray-200 shadow-sm rounded-md">
            {/* <!-- Post Header --> */}
            <PostHeader
                state={{
                    userId: post?.user?._id,
                    postId: post._id,
                    name: post?.user?.name,
                    avatar: post?.user?.avatar,
                }}
            />

            {/* <!-- Post Image --> */}
            <PostImage isLiked={isLiked} handleLike={handleLike} image={post.image} />

            {/* <!-- Post Actions --> */}
            <PostAction isLiked={isLiked} handleLike={handleLike} />

            {/* <!-- Likes --> */}
            <PostLikes likes={likesCount} />

            {/* <!-- Caption --> */}
            <PostCaption caption={post?.caption} />

            {/* <!-- Comments --> */}
            <Link to={`/post/${post?._id}`} className="px-3 mt-1">
                <button className="text-gray-500 text-sm  cursor-pointer">
                    View all {post?.commentsCount} comments
                </button>
            </Link>

            {/* <!-- Add Comment --> */}
            <AddComment postId={post?._id} />
        </article>
    );
};

export default SinglePost;

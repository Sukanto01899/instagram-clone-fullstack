import React from "react";
import PostCaption from "./PostCaption";
import CommentSection from "./CommentSection";
import Avatar from "../../sub/Avatar";
import PostAction from "../../sub/post-action/PostAction";
import useLike from "../../../hooks/useLike";
import useComment from "../../../hooks/useComment";
import { MdInsertEmoticon } from "react-icons/md";
import { CiLocationArrow1 } from "react-icons/ci";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import PostHeader from "../../sub/post-action/PostHeader";

const RightSidePostInfo = ({ post }) => {
  const { handleLike, isLiked, likesCount } = useLike(post?._id);
  const { handleAddComment, isLoading } = useComment(post?._id);

  const handleComment = (formData) => {
    const comment = formData.get("comment");
    if (!comment) return;
    handleAddComment(comment);
  };


  return (
    <div className="w-full md:w-1/2 flex flex-col">
      {/* <!-- Post Header --> */}
      <PostHeader
        state={{
          userId: post?.user?._id,
          postId: post?._id,
          name: post?.user?.name,
          avatar: post?.user?.image
        }}
      />

      {/* Post caption */}
      <PostCaption caption={post?.caption} />

      {/* <!-- Comments Section --> */}
      <CommentSection comments={post?.comments} />

      {/* <!-- Post Actions --> */}
      <PostAction handleLike={handleLike} isLiked={isLiked} />

      {/* <!-- Likes --> */}
      <div className="mb-1 px-3">
        <p className="text-sm font-semibold">{likesCount} likes</p>
      </div>

      {/* <!-- Post Time --> */}
      <div className="mb-2 px-3">
        <p className="text-xs text-gray-500">3 hours ago</p>
      </div>

      {/* <!-- Add Comment --> */}
      <div className="p-3 flex items-center">
        <Avatar avatar={post?.user?.avatar} userId={post?.user?._id} />
        <form
          action={handleComment}
          className="flex-1 flex items-center justify-between ml-2"
        >
          <input
            name="comment"
            type="text"
            placeholder="Add a comment..."
            className="text-sm w-full outline-none"
          />
          <div className="flex items-center gap-4">
            <button>
              <MdInsertEmoticon className="h-6 w-6" />
            </button>
            {isLoading ? (
              <AiOutlineLoading3Quarters className="h-6 w-6 text-zinc-600" />
            ) : (
              <button type="submit" className="cursor-pointer">
                <CiLocationArrow1 className="h-6 w-6" />
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default RightSidePostInfo;

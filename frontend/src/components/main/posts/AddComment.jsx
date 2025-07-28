import React from "react";
import { CiLocationArrow1 } from "react-icons/ci";
import useComment from "../../../hooks/useComment";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useSelector } from "react-redux";

const AddComment = ({ postId }) => {
  const name = useSelector((state) => state.auth.userInfo.name);
  const { handleAddComment, comments, isLoading } = useComment(postId);

  const handleComment = (formData) => {
    const comment = formData.get("comment");
    if (!comment) return;
    handleAddComment(comment);
  };

  return (
    <div>
      <ul className="pl-3">
        {comments.map((comment, index) => (
          <li className="text-sm text-black" key={index}>
            <span className="font-bold">{name}</span> {comment}
          </li>
        ))}
      </ul>
      <form
        action={handleComment}
        className="px-3 mt-2 flex justify-between items-center"
      >
        <input
          name="comment"
          type="text"
          placeholder="Add a comment..."
          className="text-sm w-full outline-none"
        />
        <button
          type="submit"
          className="bg-gray-100 p-1 rounded-full cursor-pointer"
        >
          {isLoading ? (
            <AiOutlineLoading3Quarters className="h-6 w-6 text-zinc-600" />
          ) : (
            <CiLocationArrow1 className="h-6 w-6 text-zinc-600" />
          )}
        </button>
      </form>
    </div>
  );
};

export default AddComment;

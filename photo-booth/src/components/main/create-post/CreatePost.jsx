import React, { useState } from "react";
import CreatePostHeader from "./CreatePostHeader";
import LeftImagePreview from "./LeftImagePreview";
import RightPostDetails from "./RightPostDetails";
import { useCreatePostMutation } from "../../../services/post/postService";
import StatusPopup from "../../sub/status-popup/StatusPopup";
import { useNavigate } from "react-router-dom";
import useCreatePostContext from "../../../hooks/useCreatePostContext";
import { actions } from "./create-post-context/PostReducer";

const CreatePost = () => {
  const [file, setFile] = useState(null);
  const {state, dispatch} = useCreatePostContext();
  const [createPost, { isSuccess, isLoading }] = useCreatePostMutation();
  const navigate = useNavigate();

  const handleCreatePost = async () => {
    if (!file) {
      console.error("File or caption is missing");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("caption", state.caption);

    try {
      // Call the createPost mutation with the form data
      const res = await createPost(formData);

      if (res._id) {
        dispatch({action: actions.reset_state})
        console.log("Post created successfully:", res);
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const handlePopupAction = () => {
    console.log("Post created successfully");

    navigate("/"); // Redirect to profile or any other page after post creation
  };

  return (
    <>
      {isSuccess && (
        <StatusPopup
          type="success"
          template="postCreated"
          action={handlePopupAction}
        />
      )}
      <CreatePostHeader
        isLoading={isLoading}
        handleCreatePost={handleCreatePost}
      />

      {/* <!-- Main Content --> */}
      <div className="upload-container relative flex flex-col md:flex-row">
        {/* <div className='absolute z-10 w-32 h-32 bg-gray-200 rounded-lg shadow-md text-amber-400 transform left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center'>
                    <h1 className='opacity-100 text-black'>Posting..</h1>
                </div> */}
        {/* <!-- Left Side - Image Preview --> */}
        <LeftImagePreview file={file} setFile={setFile} />

        {/* <!-- Right Side - Post Details --> */}
        <RightPostDetails />
      </div>
    </>
  );
};

export default CreatePost;

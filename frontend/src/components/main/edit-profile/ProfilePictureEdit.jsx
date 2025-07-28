import React, { useRef, useState } from "react";
import { MdOutlineAddAPhoto } from "react-icons/md";

const ProfilePictureEdit = ({ userInfo, setUserInfo, handleUploadPicture, uploading }) => {
  const fileRef = useRef();
  const [viewAvatar, setViewAvatar] = useState(userInfo.avatar);

  console.log(userInfo)

  const handleClickFileInput = () => {
    if (fileRef.current) {
      fileRef.current.value = null;
    }

    fileRef.current.click();
  };

  const handleSelectFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setViewAvatar(URL.createObjectURL(file));
      setUserInfo((prev) => {
        return { ...prev, avatar: file };
      });
    }
  };


  return (
    <div className="bg-white rounded-lg p-6 mb-6">
      <div className="flex items-center">
        <div onClick={handleClickFileInput} className="w-16 h-16 rounded-full overflow-hidden mr-4 relative cursor-pointer">
          <img
            src={viewAvatar || "/default/default-img.jpg"}
            alt="Saad Hasan"
            className="w-full h-full object-cover"
          />
          <span className="absolute transform left-1/2 top-1/2 -translate-1/2">
            <MdOutlineAddAPhoto className="h-6 w-6" />
          </span>

        </div>
        <div>
          <h2 className="font-semibold text-base">{userInfo.name}</h2>
          <p className="text-gray-500">{userInfo.email}</p>
        </div>

        {/* File input */}
        <input
          max="1"
          accept="image/jpg,image/jpeg,image/png"
          onChange={handleSelectFile}
          ref={fileRef}
          type="file"
          className="hidden"
        />

        {/* Click to click file input */}
        <button
          disabled={uploading}
          onClick={handleUploadPicture}
          className="ml-auto bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-600 transition"
        >
          {uploading ? "Uploading..." : "Change photo"}
        </button>
      </div>
    </div>
  );
};

export default ProfilePictureEdit;

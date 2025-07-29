import React from "react";
import { Link } from "react-router-dom";
import EditProfileButton from "./EditProfileButton";
import { useSelector } from "react-redux";
import { FaExternalLinkAlt } from "react-icons/fa";


const ProfileInfo = ({ user, postsCount }) => {
  const { _id } = useSelector((state) => state.auth.userInfo);

  return (
    <div className="md:w-2/3">
      {/* <!-- Username and Buttons --> */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start mb-4">
        <h2 className="text-xl font-normal mb-4 sm:mb-0 sm:mr-4">
          {user?.name}
        </h2>
      </div>

      <div className="flex justify-center md:justify-start">
        {user?._id === _id && <EditProfileButton />}
      </div>

      {/* <!-- Stats --> */}
      <div className="flex justify-center sm:justify-start space-x-8 mb-4 mt-2">
        <div>
          <span className="font-semibold">{postsCount}</span> posts
        </div>
      </div>

      {/* <!-- Bio --> */}
      <div className="text-sm">
        <p>{user?.bio}</p>
        <p className="text-blue-900">
          {user?.website && <a
            href={user?.website}
            target="_blank"
            className="flex items-center gap-2"
          >
            <FaExternalLinkAlt/>
            {user?.website}
          </a>}
        </p>
      </div>
    </div>
  );
};

export default ProfileInfo;

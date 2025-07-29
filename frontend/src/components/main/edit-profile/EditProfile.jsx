import React, { useState } from "react";
import ProfilePictureEdit from "./ProfilePictureEdit";
import WebsiteEdit from "./WebsiteEdit";
import BioEdit from "./BioEdit";
import GenderEdit from "./GenderEdit";
import PasswordChange from "./PasswordChange";
import { useSelector } from "react-redux";
import {
  useUpdateMyProfileMutation,
  useUpdateProfilePictureMutation,
} from "../../../services/user/userService";

const EditProfile = () => {
  const { name, email, avatar, bio, website, gender } = useSelector(
    (state) => state.auth.userInfo
  );
  const [userInfo, setUserInfo] = useState({
    name,
    email,
    avatar,
    bio,
    website,
    gender,
  });
  const [updateMyProfile, { isLoading }] = useUpdateMyProfileMutation();
  const [updateProfilePicture, { isLoading: uploading }] =
    useUpdateProfilePictureMutation();

    console.log(userInfo)

  const handleUpdateProfile = async () => {
    try {
     await updateMyProfile({
        name: userInfo.name,
        email: userInfo.email,
        bio: userInfo.bio,
        website: userInfo.website,
        gender: userInfo.gender,
      });


    } catch (error) {
      console.log(error);
    }
  };

  const handleUploadPicture = async () => {
    if (!userInfo.avatar) {
      return alert('Select photo')
    };
    const formData = new FormData();
    formData.append("avatar", userInfo.avatar);

    try {
       await updateProfilePicture(formData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="edit-container">
      <h1 className="text-2xl font-bold mb-8">Edit profile</h1>

      {/* <!-- Profile Picture Section --> */}
      <ProfilePictureEdit
        uploading={uploading}
        handleUploadPicture={handleUploadPicture}
        userInfo={userInfo}
        setUserInfo={setUserInfo}
      />

      {/* <!-- Website Section --> */}
      <WebsiteEdit url={userInfo.website} setUserInfo={setUserInfo} />

      {/* <!-- Bio Section --> */}
      <BioEdit bio={userInfo.bio} setUserInfo={setUserInfo} />

      {/* <!-- Gender Section --> */}
      <GenderEdit gender={userInfo.gender} setUserInfo={setUserInfo} />

      {/* <!-- Submit Button --> */}
      <div className="flex justify-start px-6 mb-6">
        <button onClick={handleUpdateProfile} className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-600 transition">
          {isLoading ? "Updating..." : "Update"}
        </button>
      </div>

      {/* <!-- Password Change Section --> */}
      <PasswordChange />

      {/* <!-- Privacy Note --> */}
      <div className="mb-6">
        <p className="text-gray-500 text-sm">
          Certain profile info, like your name, bio and links, is visible to
          everyone.
          <a href="#" className="text-blue-500">
            See what profile info is visible
          </a>
        </p>
      </div>
    </div>
  );
};

export default EditProfile;

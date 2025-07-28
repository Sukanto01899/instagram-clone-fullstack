import React from "react";

const WebsiteEdit = ({ url, setUserInfo }) => {
  return (
    <div className="bg-white rounded-lg p-6 mb-6">
      <label className="block mb-2 font-medium">Website</label>
      <input
        onChange={(e) =>
          setUserInfo((prev) => {
            return { ...prev, website: e.target.value };
          })
        }
        type="text"
        className="form-input mb-2"
        value={url}
      />
      <p className="text-gray-500 text-xs">
        Editing your links is only available on mobile. Visit the PhotoBooth app
        and edit your profile to change the websites in your bio.
      </p>
    </div>
  );
};

export default WebsiteEdit;

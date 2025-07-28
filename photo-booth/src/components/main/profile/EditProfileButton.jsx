import React from 'react';
import { Link } from 'react-router-dom';

const EditProfileButton = () => {
    return (
        <button className="flex space-x-2 ">
            <Link to="/edit-profile" className="bg-gray-100 px-4 py-1.5 rounded-md text-sm font-medium">Edit profile</Link>
        </button>
    );
};

export default EditProfileButton;
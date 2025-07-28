import React from 'react';

const ProfilePicture = ({avatar}) => {
    return (
        <div className="flex justify-items-end md:justify-start md:w-1/3 mb-6 md:mb-0 relative">
            <div className="w-24 h-24 md:w-36 md:h-36 rounded-full overflow-hidden border border-gray-300 mx-auto">
                <img src={avatar || "/default/default-img.jpg"} alt="Profile picture" className="w-full h-full object-cover" />
            </div>
        </div>
    );
};

export default ProfilePicture;
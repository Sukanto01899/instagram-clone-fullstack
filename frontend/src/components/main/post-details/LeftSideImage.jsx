import React from 'react';

const LeftSideImage = ({ image }) => {
    return (
        <div className="w-full md:w-1/2 bg-black flex items-center">
            <img src={image} alt="Post image" className="w-full h-auto object-cover post-image" />
        </div>
    );
};

export default LeftSideImage;
import React from 'react';

const PostCaption = ({caption}) => {
    return (
        <div className="p-3">
            <p className="text-sm ">
                {caption}
            </p>
        </div>
    );
};

export default PostCaption;
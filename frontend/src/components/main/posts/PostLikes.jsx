import React from 'react';

const PostLikes = ({likes}) => {

    return (
        <div className="">
           
                <p className="text-sm ml-2"><span className="font-semibold">{likes} likes</span></p>
            
        </div>
    );
};

export default PostLikes;
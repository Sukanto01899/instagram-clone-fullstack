import React from 'react';
import AddLike from './AddLike';
import { FaRegCommentDots } from 'react-icons/fa';
import { IoShareSocialOutline } from 'react-icons/io5';

const PostAction = ({isLiked, handleLike}) => {

    return (
        <div className="flex justify-between p-3">
            <div className="flex space-x-4">
                <AddLike isLiked={isLiked} handleLike={handleLike}/>
                <button>
                    <FaRegCommentDots className="h-6 w-6 text-zinc-600" />
                </button>

            </div>

            <button className='cursor-pointer'>
                <IoShareSocialOutline className="h-6 w-6 text-zinc-600" />
            </button>

        </div>
    );
};

export default PostAction;
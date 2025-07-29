import React from 'react';
import Avatar from '../../sub/Avatar';

const SingleComment = ({ comment }) => {
    return (
        <div className="flex mb-4">
            <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-r  mr-2 ">
                <div className="w-full h-full rounded-full overflow-hidden bg-white p-[1px] mr-2">
                    <Avatar avatar={comment.user?.avatar} userId={comment.user?._id} />
                </div>
            </div>
            <div className="flex-1">
                <div className="flex items-center">
                    <span className="font-semibold text-sm">{comment.user.name}</span>

                    <span className="text-xs text-gray-500 ml-2">3h</span>
                </div>
                <p className="text-sm mt-2 text-gray-800">
                    {comment.text}
                </p>

            </div>
        </div>
    );
};

export default SingleComment;
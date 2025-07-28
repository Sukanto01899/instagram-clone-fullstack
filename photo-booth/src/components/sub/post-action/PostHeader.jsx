import React from 'react';
import Avatar from '../Avatar';
import PostMoreOption from './PostMoreOption';
import { Link } from 'react-router-dom';

const PostHeader = ({state}) => {
    const {avatar, userId, createdAt, postId, name} = state;

    return (
        <div className="flex items-center p-3">
            <Avatar avatar={avatar && avatar} userId={userId}/>
            <div className="ml-2">
                <Link to={`/profile/${userId}`} className="font-semibold text-sm">{name}</Link>
                <span className="text-gray-500 text-xs"> • {createdAt && createdAt}</span>
            </div>

            <PostMoreOption userId={userId} postId={postId}/>
        </div>
    );
};

export default PostHeader;
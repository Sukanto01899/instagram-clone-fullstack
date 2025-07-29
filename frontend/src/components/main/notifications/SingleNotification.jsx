import React from 'react';
import Avatar from '../../sub/Avatar';
import { useGetPostQuery } from '../../../services/post/postService';
import { Link } from 'react-router-dom';

const SingleNotification = ({notification}) => {
    const {data: post} = useGetPostQuery(notification?.postId)

    let type;

    if(notification.type === 'like'){
        type = "liked your photo."
    }else if(notification.type === 'comment'){
        type = "comment your post."
    }

    return (
        <div className="notification-item flex items-center p-4 border-b border-gray-100">
            <div className="relative mr-3">
                <Avatar userId={notification?.fromUserId} avatar={notification.fromUser?.avatar}/>
            </div>
            <div className="flex-1 mr-3">
                <p className="text-sm">
                    <span className="font-semibold">{notification.fromUser?.name}</span> {type}
                </p>
                <p className="text-xs text-gray-500 mt-1">2m</p>
            </div>
            <Link to={`/post/${notification?.postId}`} className="w-11 h-11 rounded overflow-hidden">
                <img src={post?.image} alt="Post thumbnail" className="post-thumbnail" />
            </Link>
        </div>
    );
};

export default SingleNotification;
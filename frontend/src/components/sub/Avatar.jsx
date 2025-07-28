import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Avatar = ({userId, avatar}) => {
    const {_id, avatar: MyAvatar} = useSelector(state => state.auth.userInfo);

    let currentAvatar = avatar;
    let currentId = userId;

    if(!userId){
        currentAvatar = MyAvatar;
        currentId = _id
    }

    return (
        <Link to={`/profile/${currentId}`}
            className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center text-white text-xs">
            <img src={currentAvatar ? currentAvatar : '/default/default-img.jpg'} className="w-full h-full object-cover" />
        </Link>
    );
};

export default Avatar;
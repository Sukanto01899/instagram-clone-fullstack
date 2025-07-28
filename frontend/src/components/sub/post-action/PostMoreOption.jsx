import React, { useState } from 'react';
import Avatar from '../Avatar';
import { IoIosMore } from 'react-icons/io';
import MoreOptionPopup from './MoreOptionPopup';

const PostMoreOption = ({userId, postId}) => {
    const [showOption, setShowOption] = useState(false);

    return (
        <div className="ml-auto ">
            <button onClick={()=> setShowOption(true)} className="text-gray-500 cursor-pointer hover:text-gray-700 focus:outline-none">
                <IoIosMore className="w-5 h-5" />
            </button>

            {
                showOption && <MoreOptionPopup state={{setShowOption, userId, postId}}/>
            }
        </div>
    );
};

export default PostMoreOption;
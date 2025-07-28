import React from 'react';
import { Link } from 'react-router-dom';

const GridItem = ({postId, image}) => {
    return (
        <Link to={`/post/${postId}`} >
            <div class="relative">
                <img src={image} alt="Post" class="w-full grid-image" />
            </div>
        </Link>
    );
};

export default GridItem;
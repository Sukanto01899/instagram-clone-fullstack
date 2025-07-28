import React, { useEffect } from 'react';
import LeftSideImage from './LeftSideImage';
import RightSidePostInfo from './RightSidePostInfo';
import { useParams } from 'react-router-dom';
import { useGetPostQuery } from '../../../services/post/postService';
import MorePosts from './MorePosts';

const PostDetails = () => {
    const {id} = useParams();
    const {data: post} = useGetPostQuery(id);

    useEffect(()=>{
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }, [id])

    return (
         <div id="post-details" className="max-w-6xl w-full py-10 ml-[var(--sidebar-width)] px-4">
        {/* <!-- Post Details Section --> */}
        <div className="bg-white border border-gray-200 rounded-sm overflow-hidden mb-8 mx-auto max-w-5xl">
            <div className="flex flex-col md:flex-row">
                {/* <!-- Left Side - Post Image --> */}
                <LeftSideImage image={post?.image}/>

                {/* <!-- Right Side - Post Info and Comments --> */}
                <RightSidePostInfo post={post}/>
            </div>
        </div>

        {/* <!-- More Posts Section --> */}
       <MorePosts userId={post?.user?._id}/>

    </div>
    );
};

export default PostDetails;
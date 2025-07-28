import React, { Suspense } from 'react';
import PostDetails from '../components/main/post-details/PostDetails';

const PostDetailsPage = () => {
    return (
        <>
            <Suspense fallback={<h1 className='text-5xl'>Loading...</h1>}>
                <PostDetails />
            </Suspense>
        </>
    );
};

export default PostDetailsPage;
import React from 'react';
import CreatePost from '../components/main/create-post/CreatePost';
import CreatePostContextProvider from '../components/main/create-post/create-post-context/Provider';

const CreatePostPage = () => {
    return (
        <CreatePostContextProvider>
            <CreatePost/>
        </CreatePostContextProvider>
    );
};

export default CreatePostPage;
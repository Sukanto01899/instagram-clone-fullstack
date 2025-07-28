import React, { useContext } from 'react';
import { CreatePostContext } from '../components/main/create-post/create-post-context/context';

const useCreatePostContext = () => {
    return useContext(CreatePostContext)
};

export default useCreatePostContext;
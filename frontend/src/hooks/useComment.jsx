import React, { useState } from 'react';
import { useAddCommentMutation } from '../services/post/postService';

const useComment = (postId) => {
    const [comments, setComments] = useState([])
    const [addComment, {isLoading}] = useAddCommentMutation();

    const handleAddComment =async  (text)=>{
        setComments(prev => [...prev, text]);

        console.log(postId, text)

       try{
        const res = await addComment({id: postId, text});
        console.log(res)
       }catch(error){
        console.log(error)
       }

        console.log(comments)
    }

    return {handleAddComment, comments, isLoading}
};

export default useComment;
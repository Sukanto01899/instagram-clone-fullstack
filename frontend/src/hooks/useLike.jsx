import React, { useEffect, useState } from 'react';
import { useGetPostQuery, usePostLikeUnlikeMutation } from '../services/post/postService';
import { useSelector } from 'react-redux';


const useLike = (postId) => {
    const [isLiked, setIsLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(0);
    const { data, isSuccess } = useGetPostQuery(postId);
    const [postLikeUnlike] = usePostLikeUnlikeMutation()
    const id = useSelector((state) => state.auth.userInfo?._id);


    useEffect(() => {
        if (isSuccess && data) {
            const liked = data.likes?.some(like => like._id === id);
            setIsLiked(liked);
            setLikesCount(data.likesCount)
        }
    }, [ isSuccess, data, id])


    const handleLike = async () => {
        const ifLiked = !isLiked ;
        const totalLikes = likesCount + (ifLiked ? 1 : -1);
        setIsLiked(ifLiked);
        setLikesCount(totalLikes)

        try {
            await postLikeUnlike(postId);
        } catch (error) {
            if (error) {
                if(error){
                    setIsLiked(prev => !prev);
                    setLikesCount(prev => ifLiked ? prev-- : prev++)
                }
            }
        }

    }


    return {isLiked, likesCount, handleLike }
};

export default useLike;
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDeleteMyPostMutation } from '../../../services/post/postService';
import { useNavigate } from 'react-router-dom';
import { removePost } from '../../../store/slice/posts/postSlice';



const MoreOptionPopup = ({state}) => {
    const {setShowOption, userId, postId} = state;
    const myId = useSelector(state => state.auth.userInfo?._id);
    const [deleteMyPost,{ isLoading }] = useDeleteMyPostMutation();
    const disPatch = useDispatch()
    const navigation = useNavigate()

    const handlePostDelete = async ()=>{
        try{
            const res = await deleteMyPost(postId);
            console.log(res)
            if(res.data.message === 'Post deleted'){
                setShowOption(false);
                disPatch(removePost(postId))
                navigation('/')
            }
        }catch(error){
            console.log(error)
        }
    }


    return (
        <div className='dialog-container'>
            <div className="dialog">
                <div className="p-4 flex flex-col items-center">
                    <ul className='w-full text-center'>
                        {(userId === myId) && <li onClick={handlePostDelete} className='text-red-500 font-bold border-b border-gray-200 py-2 cursor-pointer'>{isLoading ? 'Deleting' : 'Delete'}</li>}
                        <li className='text-gray-500 font-bold border-b border-gray-200 py-2 cursor-progress'>Edit</li>
                        <li className='text-gray-500 font-bold border-b border-gray-200 py-2 cursor-pointer'>Got To Post</li>
                        <li className='text-gray-500 font-bold border-b border-gray-200 py-2 cursor-pointer'>Copy link</li>
                        <li onClick={()=> setShowOption(false)} className='text-gray-500 font-bold pt-2 cursor-pointer'>Cancel</li>
                    </ul>
                </div> 
            </div>
        </div>
    );
};

export default MoreOptionPopup;
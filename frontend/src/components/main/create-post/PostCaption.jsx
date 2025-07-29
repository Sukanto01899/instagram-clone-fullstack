import React, { useState } from 'react';
import useCreatePostContext from '../../../hooks/useCreatePostContext';
import { actions } from './create-post-context/PostReducer';

const PostCaption = () => {
    const {dispatch, state} = useCreatePostContext();
    const [wordCount, setWordCount] = useState(0);
    const [wordLimit] = useState(2200)
    const handleCaptionChange = (e) => {
        const value = e.target?.value.length;
        setWordCount(e.target.value.length)

        if(value > wordLimit){
            return console.log('Word limit cross')
        }
        dispatch({type: actions.set_caption, payload: e.target.value})
    }

    return (
        <div className="p-4 border-b flex-grow">
                <div className="mb-2">
                    <p className="font-medium text-base mb-2">Caption Section</p>
                    <textarea
                    value={state.caption}
                        onChange={handleCaptionChange}
                        className="w-full caption-input border-0 outline-none text-sm"
                        placeholder="Write a caption..."
                    ></textarea>
                </div>

                {/* <!-- Character Count --> */}
                <div className="flex justify-between items-center">
                    <button className="text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>
                    <span className={`${wordCount > wordLimit ? "text-red-500" : "text-gray-400"} text-xs`}>{wordCount}/{wordLimit}</span>
                </div>
            </div>
    );
};

export default PostCaption;
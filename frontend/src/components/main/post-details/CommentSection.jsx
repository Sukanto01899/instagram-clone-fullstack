import React, { Suspense } from 'react';
import SingleComment from './SingleComment';

const CommentSection = ({ comments }) => {
    return (
        <div className="comments-section flex-grow p-3 border-b border-gray-200">
            {/* <!-- Post Owner Comment --> */}
            <h3 className="font-bold pb-4">Comments</h3>

            {
                comments && comments.map(comment => <SingleComment key={comment?._id} comment={comment} />)
            }

        </div>
    );
};

export default CommentSection;
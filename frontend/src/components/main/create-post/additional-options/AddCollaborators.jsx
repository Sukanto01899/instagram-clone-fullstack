import React from 'react';

const AddCollaborators = () => {
    return (
        <button className="flex items-center justify-between p-4 border-b">
            <span className="text-base text-gray-600">Add collaborators</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
        </button>
    );
};

export default AddCollaborators;
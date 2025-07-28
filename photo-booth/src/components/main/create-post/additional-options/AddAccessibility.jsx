import React from 'react';

const AddAccessibility = () => {
    return (
        <button className="flex items-center justify-between p-4 border-b">
            <span className="text-base text-gray-600">Accessibility</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
        </button>
    );
};

export default AddAccessibility;
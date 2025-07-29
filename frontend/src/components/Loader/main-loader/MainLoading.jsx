import React from 'react';

const MainLoading = () => {
    return (
        <div className='w-full h-screen flex justify-center items-center'>
            <div className='h-16 w-16 rounded-full animate-pulse'>
                <img src="/logo-2.svg" alt="loading-logo" />
            </div>
        </div>
    );
};

export default MainLoading;
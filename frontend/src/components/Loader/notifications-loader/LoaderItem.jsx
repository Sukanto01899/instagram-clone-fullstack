import React from 'react';
import Avatar from '../../sub/Avatar';

const LoaderItem = () => {
    return (
        <div className="notification-item flex items-center p-4 border-b border-gray-100">
            <div className="relative mr-3">
                <div
                    className="w-8 h-8 bg-gray-300 animate-pulse rounded-full overflow-hidden flex items-center justify-center text-white text-xs">
                    
                </div>
            </div>
            <div className="flex-1 mr-3">
                <p className="text-sm h-3 bg-gray-300 w-28 animate-pulse">
            
                </p>
                <p className="text-xs text-gray-500 mt-1 h-2 w-12 bg-gray-300 animate-pulse"></p>
            </div>
            <div className="w-11 h-11 rounded overflow-hidden bg-gray-300 animate-pulse">
                
            </div>
        </div>
    );
};

export default LoaderItem;
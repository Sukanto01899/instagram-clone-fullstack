import React from 'react';

const PasswordChange = () => {
    return (
        <div className="bg-white rounded-lg p-6 mb-6">
            <h2 className="font-medium text-lg mb-4">Change Password</h2>
            
            {/* <!-- Current Password --> */}
            <div className="mb-4">
                <label className="block mb-2 text-sm">Current Password</label>
                <div className="relative">
                    <input type="password" className="form-input pr-10" placeholder="Enter your current password"/>
                    <button className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 text-sm">
                        Show
                    </button>
                </div>
            </div>
            
            {/* <!-- New Password --> */}
            <div className="mb-4">
                <label className="block mb-2 text-sm">New Password</label>
                <div className="relative">
                    <input type="password" className="form-input pr-10 mb-1" placeholder="Enter new password"/>
                    <button className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 text-sm">
                        Show
                    </button>
                </div>
                
                {/* <!-- Password Strength Indicator --> */}
                <div className="flex w-full h-1 mb-1">
                    <div className="password-strength bg-red-500 w-1/4"></div>
                    <div className="password-strength bg-orange-500 w-1/4"></div>
                    <div className="password-strength bg-yellow-500 w-1/4"></div>
                    <div className="password-strength bg-green-500 w-1/4"></div>
                </div>
                <p className="text-xs text-gray-500 mb-3">
                    For a strong password, use at least 8 characters with a mix of letters, numbers, and symbols.
                </p>
            </div>
            
            {/* <!-- Confirm New Password --> */}
            <div className="mb-4">
                <label className="block mb-2 text-sm">Confirm New Password</label>
                <div className="relative">
                    <input type="password" className="form-input pr-10" placeholder="Confirm new password"/>
                    <button className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 text-sm">
                        Show
                    </button>
                </div>
            </div>
            
           
            
            {/* <!-- Password Change Button --> */}
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-600 transition">
                Change Password
            </button>
            
            <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                    After changing your password, you'll be logged out of all devices except the ones you're using now.
                </p>
            </div>
        </div>
    );
};

export default PasswordChange;
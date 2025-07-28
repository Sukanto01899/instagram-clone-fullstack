import React from 'react';

const GenderEdit = ({ gender, setUserInfo }) => {
    return (
        <div className="bg-white rounded-lg p-6 mb-6">
            <label className="block mb-2 font-medium">Gender</label>
            <div className="relative">
                <select onChange={(e) =>
                    setUserInfo((prev) => {
                        return { ...prev, gender: e.target.value };
                    })
                } defaultValue={gender} className="form-input appearance-none pr-8">
                    <option >Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </div>
            </div>
            <p className="text-gray-500 text-xs mt-2">
                This won't be part of your public profile.
            </p>
        </div>
    );
};

export default GenderEdit;
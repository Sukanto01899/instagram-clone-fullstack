import React from 'react';

const BioEdit = ({ bio, setUserInfo }) => {

    console.log(bio)
    return (
        <div className="bg-white rounded-lg p-6 mb-6">
            <label className="block mb-2 font-medium">Bio</label>
            <textarea onChange={(e) =>
                setUserInfo((prev) => {
                    return { ...prev, bio: e.target.value };
                })
            } className="form-input resize-none h-24 mb-1" value={bio}></textarea>
            <div className="flex justify-end">
                <span className="text-gray-500 text-xs">23 / 150</span>
            </div>
        </div>
    );
};

export default BioEdit;
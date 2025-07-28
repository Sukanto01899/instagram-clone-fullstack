import React from 'react';
import PostCaption from './PostCaption';
import AdvancedSettings from './additional-options/AdvancedSettings';
import AddLocation from './additional-options/AddLocation';
import AddCollaborators from './additional-options/AddCollaborators';
import AddAccessibility from './additional-options/AddAccessibility';
import Avatar from '../../sub/Avatar';
import { useSelector } from 'react-redux';

const RightPostDetails = () => {
    const {name} = useSelector(state => state.auth.userInfo)
    return (
        <div className="w-full md:w-1/2 bg-white flex flex-col">
            {/* <!-- User Info --> */}
            <div className="flex items-center p-4 border-b border-gray-200">
                <Avatar/>
                <span className="ml-3 font-semibold text-sm">{name}</span>
            </div>

            {/* <!-- Caption Section --> */}
            <PostCaption/>

            {/* <!-- Additional Options --> */}
            <div className="flex flex-col">
                {/* <!-- Add Location --> */}
                <AddLocation/>
                {/* <!-- Add Collaborators --> */}
                <AddCollaborators/>

                {/* <!-- Accessibility --> */}
                <AddAccessibility/>

                {/* <!-- Advanced Settings --> */}
                <AdvancedSettings/>
            </div>
        </div>
    );
};

export default RightPostDetails;
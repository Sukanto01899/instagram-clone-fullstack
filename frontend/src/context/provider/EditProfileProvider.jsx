import React, { useReducer } from 'react';
import { ProfileEditContext } from '../context';

const EditProfileProvider = ({children}) => {
    const [state, dispatch] = useReducer()
    
    return (
        <ProfileEditContext.Provider value={{state, dispatch}}>
            {children}
        </ProfileEditContext.Provider>
    );
};

export default EditProfileProvider;
import React from 'react';
import { useLogoutMutation } from '../services/auth/authService';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearState } from '../store/slice/auth/authSlice';

const useLogout = () => {
    const [logoutUser, { isLoading }] = useLogoutMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = async () => {
        try {
            const result = await logoutUser().unwrap();
            if(result) {
                console.log("Logout successful");
                // Clear user info from the store
                dispatch(clearState());
                // Optionally, redirect to login page or home page
                navigate('/login', { replace: true });
            }
        }catch (error) {
            console.error("Logout error:", error);
            alert("Logout failed. Please try again.");
        }
    }
    return {
        logout,
        isLoading
    };
};

export default useLogout;
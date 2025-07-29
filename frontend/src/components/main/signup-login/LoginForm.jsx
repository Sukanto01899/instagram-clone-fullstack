import React, { useEffect } from 'react';
import './style/style.css'
import { PasswordInput, TextInput } from './Input';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../../services/auth/authService';
import { useDispatch, useSelector } from 'react-redux';
import { setUserInfo } from '../../../store/slice/auth/authSlice';

const LoginForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [login, { isLoading, isSuccess, data }] = useLoginMutation();
    const userInfo = useSelector(state => state.auth.userInfo)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';

    // Handle form submission
    const onSubmit = async (data) => {
        // Here you would typically handle the login logic, e.g., sending data to your backend

        try {
            const result = await login(data).unwrap();

            if (result) {
                // Handle successful login, e.g., store tokens,
                dispatch(setUserInfo(result.user));
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("Login failed. Please try again.");
        }

    };

    useEffect(()=>{

        //  redirect user 
        if(isSuccess || (userInfo && data)){
            navigate(from, { replace: true });
        }
    }, [userInfo, isSuccess, navigate, from, data])

    

    return (
        <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="container rounded-md">
                {/* <!-- PhotoBooth Logo --> */}
                <div className="flex justify-center mb-8">
                    <img src="/logo-2.svg" alt="PhotoBooth" className="h-[51px]" />
                </div>

                {/* <!-- Login Form --> */}
                <div className="bg-white p-6 border border-gray-300 mb-3 rounded-md">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* <!-- Email Field --> */}
                        <TextInput type="text" placeholder="Email" ariaLabel="Email" {...register("email", { required: "Email is required" })} error={errors.email} />

                        {/* <!-- Password Field --> */}
                        <PasswordInput placeholder="Password" ariaLabel="Password" {...register("password", { required: "Password is required" })} error={errors.password} />

                        {/* <!-- Login Button --> */}

                        <button type="submit" className="button">
                            {isLoading ? "Logging in..." : "Log in"}
                        </button>


                        {/* <!-- OR Separator --> */}
                        {/* <div className="or-separator">
                        OR
                    </div>

                    <div className="mb-4">
                        <button type="submit" className="button">
                            Log in with Google
                        </button>
                    </div> */}



                    </form>
                </div>

                {/* <!-- Sign Up Box --> */}
                <div className="bg-white p-6 border border-gray-300 text-center ">
                    <p className="text-sm">
                        Don't have an account? <Link to="/signup" className="text-blue-500 font-semibold">Sign up</Link>
                    </p>
                </div>


            </div>

        </div>
    );
};

export default LoginForm;
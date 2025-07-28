import React from 'react';
import { PasswordInput, TextInput } from './Input';
import LoginSignupHeader from './LoginSignupHeader';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import { signup } from '../../../store/slice/auth/authActions';
import { useSignupMutation } from '../../../services/auth/authService';
import { setUserInfo } from '../../../store/slice/auth/authSlice';

const SignupForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [signupUser, { isLoading }] = useSignupMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';

    // Handle form submission
    const onSubmit = async (data) => {
        // Here you would typically handle the signup logic, e.g., sending data to your backend
        if (data.password !== data.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try{
            const result = await signupUser({
                email: data.email,
                name: data.fullName,
                password: data.password
            }).unwrap();

            if (result) {
                // Dispatch action to set user info in the store
                dispatch(setUserInfo(result.user));
                navigate(from, { replace: true });
            }
        }catch (error) {
            console.error("Signup error:", error);
            alert("Signup failed. Please try again.");
        }
    }

    


    return (
        <div className="min-h-screen flex flex-col justify-center py-8 sm:px-6 lg:px-8">
            <div className="container">
                {/* <!-- PhotoBooth Logo --> */}
                <div className="flex justify-center mb-4">
                    <img src="./assets/logo-2.svg" alt="PhotoBooth" className="h-[51px]" />
                </div>

                {/* <!-- Sign Up Form --> */}
                <div className="bg-white p-6 border border-gray-300 mb-3">
                    {/* <!-- Headline --> */}
                    <LoginSignupHeader text="Sign up to see photos and videos from your friends." />

                    <form onSubmit={handleSubmit(onSubmit)} >
                        {/* <!-- Email/Phone Field --> */}
                        <TextInput error={errors.email} {...register("email", { required: "Email is required", pattern: { value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, message: "Invalid email address" } })} type="text" placeholder="Email" ariaLabel="Email" />

                        {/* <!-- Full Name Field --> */}
                        <TextInput error={errors.fullName} {...register("fullName", { required: "Full Name is required" })} type="text" placeholder="Full Name" ariaLabel="Full Name" />

                        {/* <!-- Password Field --> */}
                        <PasswordInput error={errors.password} {...register("password", { required: "Password is required" })} placeholder="Password" ariaLabel="Password" />

                        {/* <!-- Confirm Password Field --> */}
                        <PasswordInput error={errors.confirmPassword} {...register("confirmPassword", { required: "Confirm Password is required" })} placeholder="Confirm Password" ariaLabel="Confirm Password" />

                        {/* <!-- Sign Up Button --> */}
                        <div className="mb-2">
                            <button type="submit" className="button">
                                {isLoading ? "Signing up..." : "Sign up"}
                            </button>
                        </div>
                    </form>
                </div>

                {/* <!-- Login Box --> */}
                <div className="bg-white p-6 border border-gray-300 text-center mb-4 rounded-md">
                    <p className="text-sm">
                        Have an account? <Link to="/login" className="text-blue-500 font-semibold">Log in</Link>
                    </p>
                </div>


            </div>


        </div>
    );
};

export default SignupForm;
import React from 'react';

export const TextInput = ({ type, placeholder, ariaLabel, error, ...rest }) => {
    return (
        <div class="mb-2">
            <div class="relative">
                <input {...rest} type={type} class="form-input" placeholder={placeholder} aria-label={ariaLabel} />
            </div>

            {error && <span className="text-red-500 text-sm">{error.message}</span>}
        </div>
    );
};


export const PasswordInput = ({ placeholder, ariaLabel, error, ...rest }) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    return (
        <div class="mb-3">
            <div class="relative">
                <input {...rest} type={showPassword ? "text" : "password"} class="form-input" placeholder={placeholder} aria-label={ariaLabel} />
                <button type="button" onClick={togglePasswordVisibility} class="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 text-xs">
                    {showPassword ? "Hide" : "Show"}
                </button>
            </div>
            {error && <span className="text-red-500 text-sm">{error.message}</span>}
        </div>
    )
}
import React from 'react';
import PostGridLoading from '../post-grid-loader/PostGridLoading';

const ProfileLoading = () => {
    return (
        <div class="main-container animate-pulse">
            <div class="profile-container">
                {/* <!-- Profile Header --> */}
                <div class="flex flex-col md:flex-row mb-10">
                    {/* <!-- Profile Picture --> */}
                    <div className="flex justify-items-end md:justify-start md:w-1/3 mb-6 md:mb-0 relative">
                        <div className="w-24 h-24 md:w-36 md:h-36 rounded-full overflow-hidden bg-gray-300 border border-gray-300 mx-auto">

                        </div>
                    </div>

                    {/* <!-- Profile Info --> */}

                    <div className="md:w-2/3">
                        {/* <!-- Username and Buttons --> */}
                        <div className="flex flex-col sm:flex-row items-center sm:items-start mb-4">
                            <h2 className="h-3 w-28 bg-gray-300 mb-4 sm:mb-0 sm:mr-4">

                            </h2>
                        </div>

                        <div className="h-6 w-24 bg-gray-300">

                        </div>

                        {/* <!-- Stats --> */}
                        <div className="flex justify-center sm:justify-start space-x-8 mb-4 mt-2">
                            <div className='h-4 w-11 bg-gray-300'>

                            </div>
                        </div>

                        {/* <!-- Bio --> */}
                        <div className="text-sm">
                            <p className='h-3 w-10 bg-gray-300'></p>
                            <p className="h-3 w-32 bg-gray-300">


                            </p>
                        </div>
                    </div>

                </div>


                {/* Phot grid loader */}
                <section>
                    <h3 class="font-semibold text-lg mb-4">Posts</h3>
                    
                    <PostGridLoading/>

                </section>
            </div>
        </div>
    );
};

export default ProfileLoading;
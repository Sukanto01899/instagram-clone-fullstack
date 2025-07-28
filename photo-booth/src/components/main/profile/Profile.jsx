import React from 'react';
import ProfilePicture from './ProfilePicture';
import ProfileInfo from './ProfileInfo';
import { useSelector } from 'react-redux';
import { useGetUserPostsQuery } from '../../../services/post/postService';
import { useParams } from 'react-router-dom';
import PostsGrid from '../../sub/post-grid/PostsGrid';

const Profile = () => {
    const {id} = useParams();
    const auth = useSelector((state) => state.auth);
    const { data: userData } = useGetUserPostsQuery(id || auth?.userInfo?._id);


    return (
        <div class="main-container">
       <div class="profile-container">
         {/* <!-- Profile Header --> */}
        <div class="flex flex-col md:flex-row mb-10">
            {/* <!-- Profile Picture --> */}
            <ProfilePicture avatar={userData?.user?.avatar}/>

            {/* <!-- Profile Info --> */}
            <ProfileInfo user={userData?.user}/>
        </div>

        <section>
            <h3 class="font-semibold text-lg mb-4">Posts</h3>
            {/* <!-- Photo Grid --> */}
            <PostsGrid posts={userData?.posts}/>
        </section>
       </div>
    </div>
    );
};

export default Profile;
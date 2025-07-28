import React from 'react';
import Sidebar from '../components/main/sidebar/Sidebar';
import AllPosts from '../components/main/posts/AllPosts';
import { Outlet } from 'react-router-dom';
import MobileMenu from '../components/main/mobile-menu.jsx/MobileMenu';

const Layout = () => {
    return (
        <>
            <Sidebar/>
            <Outlet/>

            <MobileMenu/>
        </>
    );
};

export default Layout;
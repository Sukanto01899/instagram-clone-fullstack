import React, { useEffect, useRef, useState } from 'react';
import Menu from './Menu';
import { IoHomeOutline } from "react-icons/io5";
import { FaRegBell } from "react-icons/fa";
import { FaRegPlusSquare } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";


const menuItem = [
    {
        title: "Home",
        path: '/',
        Icon: IoHomeOutline
    },
    {
        title: "Notification",
        path: '/notifications',
        Icon: FaRegBell
    },
    {
        title: "Post",
        path: '/create',
        Icon: FaRegPlusSquare
    },
    {
        title: "Profile",
        path: '/profile',
        Icon: FaRegUser
    },
]

const MobileMenu = () => {
    const [show, setShow] = useState(true);
    const menuRef = useRef(null)


    useEffect(()=>{
        let lastScrollTop = 0;

        const scrollCheck = ()=>{
            const currentScrollTop = window.scrollY;

            if(currentScrollTop > lastScrollTop){
                setShow(false)
            }else{
                setShow(true)
            }

            lastScrollTop = currentScrollTop;
        }

        window.addEventListener('scroll', scrollCheck)

        return ()=>{
            window.removeEventListener('scroll', scrollCheck)
        }
    }, [])

    return (
        <div ref={menuRef} className={`${show ? "" : 'hidden'} fixed bottom-0 w-full flex justify-between md:hidden h-12 bg-white px-3 border border-b-2 border-gray-200`}>
            {
                menuItem.map(menu => <Menu key={menu.title} menu={menu}/>)
            }
        </div>
    );
};

export default MobileMenu;
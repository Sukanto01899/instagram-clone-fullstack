import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const Menu = ({menu}) => {
    const {path, Icon} = menu;
    const {pathname} = useLocation();

    return (
        <NavLink  to={path} className={`${pathname === path && "bg-gradient-to-r to-red-400 from-yellow-400 "} px-4  flex justify-center items-center cursor-pointer`}>
            <Icon className="h-6 w-6 "/>
        </NavLink>
    );
};

export default Menu;
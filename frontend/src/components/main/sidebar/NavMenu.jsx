import React from 'react';
import { NavLink } from 'react-router-dom';

const NavMenu = ({menu}) => {
    const {name, path, Icon} = menu;
    return (
        <li>
            <NavLink to={path} className={`flex flex-row items-center gap-2`}>
                <Icon className="h-6 w-6"/>
                <span className="text-sm text-zinc-800">{name}</span>
            </NavLink>
        </li>
    );
};

export default NavMenu;
import React from "react";
import { Link, NavLink } from "react-router-dom";
import NavMenu from "./NavMenu";
import useLogout from "../../../hooks/useLogout";
import { IoHomeOutline } from "react-icons/io5";
import { FaRegBell } from "react-icons/fa";
import { FaRegPlusSquare } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import Avatar from "../../sub/Avatar";

const menus = [
  { name: "Home", path: "/", Icon: IoHomeOutline, id: 1 },
  { name: "Notifications", path: "/notifications", Icon: FaRegBell, id: 2 },
  { name: "Create", path: "/create", Icon: FaRegPlusSquare, id: 3 },
  { name: "Profile", path: "/profile", Icon: FaRegUser, id: 4 },
];

const Sidebar = () => {
  const { logout } = useLogout();
  const user = useSelector((state) => state.auth.userInfo);

  return (
    <aside className="hidden floating-navbar bg-white  border border-gray-200 px-6 py-2 md:flex flex-col">
      <a
        href="./index.html"
        className="flex gap-2 items-center font-medium py-4 mb-8"
      >
        <img
          src="/logo-2.svg"
          alt="PhotoBooth"
          className="h-6 object-contain"
        />
        <h2 className="text-lg">Photogenic</h2>
      </a>

      <ul className="space-y-8 flex-1">
        {menus.map((menu) => (
          <NavMenu key={menu.id} menu={menu} />
        ))}
      </ul>

      <div className="flex  justify-between">
        <Link to="/profile">
          <div className="flex items-center">
            <Avatar/>
            <div className="ml-2">
              <span className="font-semibold text-sm">{user.name}n</span>
              <p className="text-xs text-gray-500  leading-0">{user.email}</p>
            </div>
          </div>
        </Link>

        <button onClick={logout} title="logout" className="cursor-pointer">
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            data-name="Layer 1"
          >
            <path d="m8 0c-3.309 0-6 2.691-6 6s2.691 6 6 6 6-2.691 6-6-2.691-6-6-6zm0 10c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4zm-3.5 4h6.5v2h-6.5c-1.379 0-2.5 1.122-2.5 2.5v5.5h-2v-5.5c0-2.481 2.019-4.5 4.5-4.5zm11.5 8h2v2h-2c-1.654 0-3-1.346-3-3v-6c0-1.654 1.346-3 3-3h2v2h-2c-.552 0-1 .449-1 1v6c0 .551.448 1 1 1zm8-3.941c0 .548-.24 1.07-.658 1.432l-2.681 2.362-1.322-1.5 1.535-1.354h-3.874v-2h3.74l-1.401-1.235 1.322-1.5 2.688 2.37c.411.355.651.877.651 1.425z" />
          </svg>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

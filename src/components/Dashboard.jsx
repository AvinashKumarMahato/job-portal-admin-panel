import React, { useEffect, useState, useCallback } from 'react';
import { BsArrowLeftShort } from "react-icons/bs";
import { AiFillEnvironment } from "react-icons/ai";
import { useNavigate, Outlet, Link } from 'react-router-dom';
import { IoMdAddCircleOutline } from "react-icons/io";
import { FiFileText } from "react-icons/fi";
import { IoMdLogOut } from "react-icons/io";
import { MdOutlineMessage, MdOutlineSaveAs } from "react-icons/md";
import { HiOutlineExternalLink } from "react-icons/hi";

const Dashboard = () => {
  const [open, setOpen] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = useCallback(() => setShowModal(true), []);

  const confirmLogout = useCallback(() => {
    localStorage.removeItem('token');
    navigate('/');
  }, [navigate]);

  const cancelLogout = useCallback(() => setShowModal(false), []);

  const toggleSidebar = useCallback(() => setOpen(prev => !prev), []);

  // Ensure to load environment variables
  const viewWebsiteLink = import.meta.env.VITE_VIEW_WEBSITE_LINK;

  const Menus = [
    { title: "All Posts", path: "/dashboard/all-posts", icon: FiFileText },
    { title: "Create Post", path: "/dashboard/createAllPost", icon: IoMdAddCircleOutline },
    { title: "Drafts", path: "/dashboard/drafts", icon: MdOutlineSaveAs },
    { title: "Messages", path: "/dashboard/messages", icon: MdOutlineMessage },
    { title: "View Website", link: viewWebsiteLink, icon: HiOutlineExternalLink },
    { title: "LogOut", action: handleLogout, icon: IoMdLogOut, spacing: true }
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className={`bg-blue-700 h-full p-5 pt-8 ${open ? "w-72" : "w-20"} duration-300 relative flex-shrink-0`}>
        <BsArrowLeftShort
          className={`bg-white text-blue-700 text-3xl rounded-full absolute -right-3 top-9 border border-blue-700 cursor-pointer ${!open && "rotate-180"}`}
          onClick={toggleSidebar}
        />
        <div className='inline-flex'>
          <AiFillEnvironment
            className={`bg-yellow-300 text-4xl rounded cursor-pointer block float-left mr-2 duration-500 ${open && "rotate-[360deg]"}`}
          />
          <Link to="/dashboard" className={`text-white origin-left font-medium text-2xl duration-300 ${!open && "scale-0"} cursor-pointer`}>
            Winsum Planet
          </Link>
        </div>
        <ul className='pt-2'>
          {Menus.map((menu, index) => (
            <li
              key={index}
              className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-blue-600 rounded-md ${menu.spacing ? "mt-9" : "mt-2"}`}
              onClick={menu.action}
            >
              {menu.path ? (
                <Link to={menu.path} className="flex items-center gap-x-4 w-full">
                  <menu.icon className='text-2xl' />
                  <span className={`text-base font-medium flex-1 duration-200 ${!open && "hidden"}`}>
                    {menu.title}
                  </span>
                </Link>
              ) : menu.link ? (
                // External link with anchor tag
                <a href={menu.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-x-4 w-full">
                  <menu.icon className='text-2xl' />
                  <span className={`text-base font-medium flex-1 duration-200 ${!open && "hidden"}`}>
                    {menu.title}
                  </span>
                </a>
              ) : (
                <>
                  <menu.icon className='text-2xl' />
                  <span className={`text-base font-medium flex-1 duration-200 ${!open && "hidden"}`}>
                    {menu.title}
                  </span>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-gray-100 overflow-hidden">
        <div className="h-full overflow-y-auto p-7">
          <Outlet />
        </div>
      </div>

      {/* Logout Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-5 w-96">
            <h2 className="text-lg font-semibold">Confirm Logout</h2>
            <p className="mt-2">Are you sure you want to log out?</p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={confirmLogout}
                className="bg-blue-700 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600"
              >
                Yes
              </button>
              <button
                onClick={cancelLogout}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              >
                Not Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
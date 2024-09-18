import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
// import { FaHome, FaUser } from 'react-icons/fa';
import { TbLogout } from "react-icons/tb";
import { FaRegUser } from "react-icons/fa6";
import { menus } from './menus';
import AuthGuard from '../../../auth';
import './sidebar.css';
import { useNavigate } from 'react-router-dom';
import { HiOutlinePhotograph } from "react-icons/hi";

const Sidebar = () => {
  // const renderMenuIcon = (iconName) => {
  //   switch (iconName) {
  //     case 'FaHome':
  //       return <FaHome />;
  //     case 'FaUser':
  //       return <FaUser />;
  //     default:
  //       return null;
  //   }
  // };

  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/login'); // Redirect to the login page
  };

  const goGallery = () => {
    navigate('/home')
  }

  return (
    <AuthGuard>
      <>
        <div className='parent-header'>
          <div className='header'>
            <div>
              <ul className="navbarmenu ul-list">
                {menus.map((menu, index) => (
                  <li key={index} className='li-list'>
                    {menu.submenu ? (
                      <div>
                        {/* {renderMenuIcon(menu.icon)} */}
                        {menu.title}
                        <ul className='ul-list'>
                          {menu.submenu.map((sub, subIndex) => (
                            <li className='li-list' key={subIndex}>
                              <NavLink
                                to={sub.path}
                                className={({ isActive }) => isActive ? 'navactive' : undefined}
                              >
                                {sub.title}
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <NavLink
                        to={menu.path}
                        className={({ isActive }) => isActive ? 'navactive' : undefined}
                      >
                        {/* <span style={{color:'black'}}>{renderMenuIcon(menu.icon)}</span> */}
                        {menu.title}
                      </NavLink>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ display: 'flex' }}>
              <div>
                <p style={{ color: '#007791' }}><b>KAMALESAN C</b></p>
              </div>

              <div className='logout'>
                <FaRegUser />
              </div>

              <div title='Gallery' className='logout'>
                <HiOutlinePhotograph onClick={goGallery} />
              </div>

              <div className='logout'>
                <TbLogout title='Click to Logout' onClick={handleLogout} />
              </div>
            </div>
          </div>
        </div>
        <main className="content">
          <Outlet />
        </main>
      </>
    </AuthGuard>
  );
};

export default Sidebar;

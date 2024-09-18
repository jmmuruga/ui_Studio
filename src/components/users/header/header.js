import React from 'react';
import './header.css';
import { NavLink } from 'react-router-dom';
import { BiSolidLock } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';

function HeaderPage() {

const navigate=useNavigate();

const loginClick=()=>{
    navigate('/login')
}

    return <>
        <div className='header heading'>
            <div>
                <nav>
                    <NavLink className={({ isActive }) => isActive ? 'navactive' : undefined} to="/home">Home</NavLink>
                    <NavLink className={({ isActive }) => isActive ? 'navactive' : undefined} to="/about">About Us</NavLink>
                    <NavLink className={({ isActive }) => isActive ? 'navactive' : undefined} to="/contact">Contact Us</NavLink>
                </nav>
            </div>

            <div>
                <BiSolidLock onClick={loginClick} size={25} title='Admin' color='#E81828' style={{cursor:'pointer'}}/>
            </div>
        </div>
    </>
}

export default HeaderPage;
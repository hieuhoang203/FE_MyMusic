import React from "react";
import "../../css/dashboard.css"

const DashBoard = () => {
    return (
        <div className="sidebar">
            <a href="" className="logo">
                <i className='bx bx-code-alt'></i>
                <div className="logo-name"><span>My </span>Music</div>
            </a>
            <ul className="side-menu">
                <li><a href="#"><i className='bx bxs-dashboard'></i>Dashboard</a></li>
                <li><a href="#"><i className='bx bxs-user-voice'></i>Authors</a></li>
                <li><a href="#"><i className='bx bx-user'></i>Users</a></li>
                <li><a href="#"><i className='bx bx-album'></i>Albums</a></li>
                <li><a href="#"><i className='bx bxs-music'></i>Songs</a></li>
            </ul>
            <ul className="side-menu">
                <li><a href="#"><i className='bx bx-log-out-circle'></i>Logout</a></li>
            </ul>
        </div>
    );
}

export default DashBoard;
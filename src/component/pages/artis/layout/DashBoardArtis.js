import React, {useState} from "react";
import "../../../../css/dashboard.css";
import logo from "../../../../asset/logomusic.png";
import vanh from "../../../../asset/vanhdo.PNG";
import {Link, Outlet} from "react-router-dom";
import { useNavigate } from "react-router-dom";

const DashBoardArtis = () => {

    const navigate = useNavigate();

    const [active, setActive]  = useState(4);

    function changeColorUI() {
        document.querySelector('.body-dashboard').classList.toggle('dark-mode-variables');
        const background = document.getElementsByClassName('color-background')
        background.item(0).classList.toggle('active')
        background.item(1).classList.toggle('active')
    }

    function changeActiveSideBar(value) {
        const sidebar = document.querySelector('.sidebar')
        sidebar.querySelector(`a:nth-child(${active})`).classList.toggle('active')
        sidebar.querySelector(`a:nth-child(${value})`).classList.toggle('active')
        setActive(value)
    }

    function goHome() {
        navigate('/')
    }

    return (
        <div className="body-dashboard dark-mode-variables">
            <div className="container">
                <aside>
                    <div className="toggle">
                        <div className="logo">
                            <img src={logo}/>
                            <h2>Sub<span className="danger">lime</span></h2>
                        </div>
                        <div className="close" id="close-btn">
                            <i className='bx bx-x'></i>
                            hello
                        </div>
                    </div>

                    <div className="sidebar">
                        <Link onClick={() => changeActiveSideBar(1)} to={'/artis/album'}>
                            <i className='bx bx-album'></i>
                            <h3>Album</h3>
                        </Link>
                        <Link onClick={() => changeActiveSideBar(2)} to={'/artis/songs'}>
                            <i className='bx bx-music'></i>
                            <h3>Song</h3>
                            <span className="message-count">27</span>
                        </Link>
                        <Link onClick={() => changeActiveSideBar(3)} to={'/artis/podcast'}>
                            <i className='bx bx-podcast'></i>
                            <h3>Podcast</h3>
                            <span className="message-count">13</span>
                        </Link>
                        <Link className="active" onClick={() => changeActiveSideBar(4)} to={'/artis'}>
                            <i className='bx bx-line-chart-down'></i>
                            <h3>Analytics</h3>
                        </Link>
                        <Link onClick={() => changeActiveSideBar(5)} to={'/setting'}>
                            <i className='bx bx-cog'></i>
                            <h3>Settings</h3>
                        </Link>

                        <Link to={'/login'}>
                            <i className='bx bx-log-out-circle'></i>
                            <h3>Logout</h3>
                        </Link>
                    </div>
                </aside>

                <main>
                    <Outlet/>
                </main>

                <div className="right-section">
                    <div className="nav">
                        <div className="dark-mode" onClick={() => changeColorUI()}>
                            <i className='bx bxs-sun color-background'></i>
                            <i className='bx bxs-moon color-background active'></i>
                        </div>

                        <div className="profile">
                            <div className="info">
                                <p>Hey, <b>Vân Anh</b></p>
                                <small className="text-muted">Admin</small>
                            </div>
                            <div className="profile-photo">
                                <img src={vanh}/>
                            </div>
                        </div>

                    </div>

                    <div className="user-profile">
                        <div className="logo" onClick={() => goHome()}>
                            <img src={logo}/>
                            <h2>Sublime</h2>
                            <p>Hoàng Văn Hiếu 🫅</p>
                        </div>
                    </div>

                    <div className="reminders">
                        <div className="header">
                            <h2>Reminders</h2>
                            <i className='bx bx-bell'></i>
                        </div>

                        <div className="notification">
                            <div className="icon">
                                <i className='bx bx-volume-full'></i>
                            </div>
                            <div className="content">
                                <div className="info">
                                    <h3>Workshop</h3>
                                    <small className="text_muted">
                                        08:00 AM - 12:00 PM
                                    </small>
                                </div>
                                <i className='bx bx-dots-vertical-rounded'></i>
                            </div>
                        </div>

                        <div className="notification deactive">
                            <div className="icon">
                                <i className='bx bx-edit-alt'></i>
                            </div>
                            <div className="content">
                                <div className="info">
                                    <h3>Workshop</h3>
                                    <small className="text_muted">
                                        08:00 AM - 12:00 PM
                                    </small>
                                </div>
                                <i className='bx bx-dots-vertical-rounded'></i>
                            </div>
                        </div>

                        <div className="notification add-reminder">
                            <div>
                                <i className='bx bx-plus'></i>
                                <h3>Add Reminder</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashBoardArtis;
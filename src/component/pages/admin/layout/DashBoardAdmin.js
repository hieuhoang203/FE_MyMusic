import React, {useState} from "react";
import "../../../../css/dashboard.css";
import "../../../../css/spotify-theme.css";
import logo from "../../../../asset/logomusic.png";
import {Link, Outlet, useNavigate} from "react-router-dom";
import { 
    HomeOutlined, 
    UserOutlined, 
    TeamOutlined, 
    PlayCircleOutlined, 
    TagsOutlined, 
    BarChartOutlined,
    LogoutOutlined,
    MenuOutlined
} from "@ant-design/icons";

const DashBoardAdmin = () => {
    const [songWaits] = useState(0);
    const [podCastWaits] = useState(0);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const user = JSON.parse(localStorage.getItem("account"));
    const navigate = useNavigate();
    const [active, setActive] = useState(1);

    function changeActiveSideBar(value) {
        setActive(value);
    }

    function goHomePage() {
        navigate('/');
    }

    function logout() {
        localStorage.removeItem("account");
        localStorage.removeItem("token");
        navigate('/login');
    }

    const menuItems = [
        { id: 1, icon: <BarChartOutlined />, label: 'Thống kê', path: '/admin' },
        { id: 2, icon: <UserOutlined />, label: 'Người dùng', path: '/admin/user' },
        { id: 3, icon: <TeamOutlined />, label: 'Nghệ sĩ', path: '/admin/artis' },
        { id: 4, icon: <PlayCircleOutlined />, label: 'Bài hát', path: '/admin/song' },
        { id: 5, icon: <TagsOutlined />, label: 'Thể loại', path: '/admin/genres' },
    ];

    return (
        <div className="spotify-app">
            {/* Spotify Sidebar */}
            <aside className={`spotify-sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div className="spotify-sidebar-logo">
                    <i className='bx bx-pulse' style={{ fontSize: '32px', color: '#1db954' }}></i>
                    <h1>Admin Panel</h1>
                </div>
                
                <ul className="spotify-sidebar-nav">
                    {menuItems.map((item) => (
                        <li key={item.id}>
                            <Link 
                                to={item.path}
                                className={active === item.id ? 'active' : ''}
                                onClick={() => changeActiveSideBar(item.id)}
                            >
                                {item.icon}
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                <div style={{ marginTop: 'auto', paddingTop: '24px' }}>
                    <div className="spotify-sidebar-nav">
                        <h5 style={{ color: '#b3b3b3', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 8px 0' }}>Tài khoản</h5>
                        <ul className="spotify-sidebar-nav">
                            <li>
                                <Link to="/" onClick={goHomePage}>
                                    <HomeOutlined />
                                    Về trang chủ
                                </Link>
                            </li>
                            <li>
                                <Link to="#" onClick={logout}>
                                    <LogoutOutlined />
                                    Đăng xuất
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </aside>

            {/* Spotify Main Content */}
            <main className="spotify-main">
                {/* Header */}
                <div className="spotify-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <button 
                            className="spotify-player-btn"
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            style={{ display: 'block' }}
                        >
                            <MenuOutlined />
                        </button>
                        <h2>Quản trị hệ thống</h2>
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{ 
                            background: 'rgba(255, 255, 255, 0.1)', 
                            padding: '8px 16px', 
                            borderRadius: '20px',
                            color: '#fff',
                            fontSize: '14px',
                            fontWeight: '700'
                        }}>
                            Xin chào, {user?.name || 'Admin'}
                        </div>
                        <div style={{ 
                            width: '40px', 
                            height: '40px', 
                            borderRadius: '50%', 
                            background: '#1db954',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#000',
                            fontWeight: '700',
                            fontSize: '16px'
                        }}>
                            {user?.name?.charAt(0)?.toUpperCase() || 'A'}
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
                    <div className="spotify-card" style={{ background: 'linear-gradient(135deg, #1db954 0%, #1ed760 100%)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ 
                                width: '48px', 
                                height: '48px', 
                                borderRadius: '8px', 
                                background: 'rgba(0, 0, 0, 0.2)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#000'
                            }}>
                                <PlayCircleOutlined style={{ fontSize: '24px' }} />
                            </div>
                            <div>
                                <h3 style={{ fontSize: '24px', fontWeight: '700', margin: '0 0 4px 0', color: '#000' }}>
                                    {songWaits}
                                </h3>
                                <p style={{ fontSize: '14px', margin: 0, color: '#000', opacity: 0.8 }}>
                                    Bài hát chờ duyệt
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="spotify-card" style={{ background: 'linear-gradient(135deg, #ff6b6b 0%, #ff8e8e 100%)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ 
                                width: '48px', 
                                height: '48px', 
                                borderRadius: '8px', 
                                background: 'rgba(0, 0, 0, 0.2)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#fff'
                            }}>
                                <TeamOutlined style={{ fontSize: '24px' }} />
                            </div>
                            <div>
                                <h3 style={{ fontSize: '24px', fontWeight: '700', margin: '0 0 4px 0', color: '#fff' }}>
                                    {podCastWaits}
                                </h3>
                                <p style={{ fontSize: '14px', margin: 0, color: '#fff', opacity: 0.8 }}>
                                    Podcast chờ duyệt
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="spotify-card" style={{ background: 'linear-gradient(135deg, #4ecdc4 0%, #6dd5ed 100%)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ 
                                width: '48px', 
                                height: '48px', 
                                borderRadius: '8px', 
                                background: 'rgba(0, 0, 0, 0.2)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#fff'
                            }}>
                                <UserOutlined style={{ fontSize: '24px' }} />
                            </div>
                            <div>
                                <h3 style={{ fontSize: '24px', fontWeight: '700', margin: '0 0 4px 0', color: '#fff' }}>
                                    1,234
                                </h3>
                                <p style={{ fontSize: '14px', margin: 0, color: '#fff', opacity: 0.8 }}>
                                    Người dùng hoạt động
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="spotify-card" style={{ background: 'linear-gradient(135deg, #a8e6cf 0%, #dcedc1 100%)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ 
                                width: '48px', 
                                height: '48px', 
                                borderRadius: '8px', 
                                background: 'rgba(0, 0, 0, 0.2)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#000'
                            }}>
                                <BarChartOutlined style={{ fontSize: '24px' }} />
                            </div>
                            <div>
                                <h3 style={{ fontSize: '24px', fontWeight: '700', margin: '0 0 4px 0', color: '#000' }}>
                                    98%
                                </h3>
                                <p style={{ fontSize: '14px', margin: 0, color: '#000', opacity: 0.8 }}>
                                    Uptime hệ thống
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="spotify-card" style={{ minHeight: '400px' }}>
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default DashBoardAdmin;
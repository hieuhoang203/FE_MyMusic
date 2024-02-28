import React from "react";
import {Link, Outlet} from "react-router-dom";
import '../../../css/layout.css'

function Layout() {

    return (
        <div className="home-page">
            <div className="toolbar-content">
                <div className="standing-menu">
                    <div className="toolbar">
                        <div className="toolbar-item item-home">
                            <Link to="/">
                                <i className='bx bxs-home bx-sm bx-tada-hover'></i>
                                <h4>Trang chủ</h4>
                            </Link>
                        </div>
                        <div className="toolbar-item item-search">
                            <Link to="/search">
                                <i className='bx bx-search-alt bx-sm bx-tada-hover'></i>
                                <h4>Tìm kiếm</h4>
                            </Link>
                        </div>
                    </div>
                    <div className="library">
                        <div className="library-item">
                            <Link className="icon-library" to={'/library'}>
                                <i className='bx bx-library bx-sm bx-tada-hover'></i>
                                <h4>Thư viện</h4>
                            </Link>
                            <Link className='icon-bonus' to="/">
                                <i className='bx bx-plus bx-sm bx-tada-hover'></i>
                            </Link>
                            <Link className='icon-bonus' to="/">
                                <i className='bx bx-search-alt-2 bx-sm bx-tada-hover'></i>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="content">
                    <div className="header-content">
                        <Outlet/>
                    </div>
                </div>
            </div>
            <div className="playing">
                Hello
            </div>
        </div>

    );
}

export default Layout;
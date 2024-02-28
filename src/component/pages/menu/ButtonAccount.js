import React from "react";
import {Link} from "react-router-dom";

function ButtonAccount() {
    return (
        <div className="button-account">
            <button className="contact">
                <Link to={'https://www.instagram.com/hoanghieu_03/'} target={'_blank'}>
                    <i className='bx bxl-instagram bx-sm'></i>
                </Link>
            </button>
            <button className="notification">
                <i className='bx bx-bell bx-sm'></i>
            </button>
            <button className="avatar">
                <img src="/vanh.png" alt=""/>
            </button>
        </div>
    );
}

export default ButtonAccount;
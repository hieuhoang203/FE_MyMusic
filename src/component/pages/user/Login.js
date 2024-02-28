import React from "react";
import "../../../css/login.css";
import logo from "../../../asset/logomusic.png";

function Login() {
    return (
        <>
            <div className="container-login">
                <div className="logo">
                    <img src={logo} alt="Can't load image!"/>
                    <a href="/">My music</a>
                </div>
                <div className="create-account">
                    <h1>Login your account 👋</h1>
                    <div className="social-login">
                        <button className="google">
                            <i className='bx bxl-google bx-sm bx-tada-hover'></i>
                            Use Google
                        </button>
                        <button className="facebook">
                            <i className='bx bxl-facebook bx-sm bx-tada-hover'></i>
                            Use Facebook
                        </button>
                    </div>
                    <div className="divider">
                        <div className="line"></div>
                        <p>Or</p>
                        <div className="line"></div>
                    </div>
                    <form action="">
                        <label>Email:</label>
                        <div className="custom-input">
                            <input type="email" name={'email'} placeholder={'Your Email'} autoComplete={'off'}/>
                            <i className='bx bx-at'></i>
                        </div>
                        <label>Password:</label>
                        <div className="custom-input">
                            <input type="password" name={'password'} placeholder={'Your Password'}/>
                            <i className='bx bx-lock-alt'></i>
                        </div>
                        <button className="login">Login</button>
                        <div className="links">
                            <a href="">Reset password</a>
                            <a href="/register">Don't have an account?</a>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login;
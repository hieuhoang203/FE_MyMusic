import React, {useEffect} from "react";
import "../../../css/login.css";
import {createBrowserHistory as useHistory} from "history";

const LoginAndRegister = () => {
    const history = useHistory();

    const changeSelection = (value) => {
        const container = document.getElementById("container")
        if (value === true) {
            history.replace('/register')
            container.classList.add('active')
        } else {
            history.replace('/login')
            container.classList.remove('active')
        }
    }

    function loadLoginPage() {
        const container = document.getElementById("container")
        if (window.location.href.includes('register')) {
            container.classList.add('active')
        } else {
            container.classList.remove('active')
        }
    }

    useEffect(() => {
        loadLoginPage()
    }, []);

    return (
        <div className="body-login">
            <div className="box-container" id="container">
                <div className="form-container sign-up">
                    <form action="">
                        <h1>Create Account</h1>
                        <div className="social-icon">
                            <a href="" className="icon">
                                <i className='bx bxl-google bx-sm'></i>
                            </a>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <a href="" className="icon">
                                <i className='bx bxl-facebook bx-sm'></i>
                            </a>
                        </div>
                        <span>or use email for registration</span>
                        <input type="text" placeholder={'Name'}/>
                        <input type="email" placeholder={'Email'}/>
                        <input type="password" placeholder={'Password'}/>
                        <button>Sign up</button>
                    </form>
                </div>
                <div className="form-container sign-in">
                    <form action="">
                        <h1>Sign In</h1>
                        <div className="social-icon">
                            <a href="" className="icon">
                                <i className='bx bxl-google bx-sm'></i>
                            </a>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <a href="" className="icon">
                                <i className='bx bxl-facebook bx-sm'></i>
                            </a>
                        </div>
                        <span>or use email password</span>
                        <input type="email" placeholder={'Email'}/>
                        <input type="password" placeholder={'Password'}/>
                        <a href="">Forget your password?</a>
                        <button>Sign in</button>
                    </form>
                </div>
                <div className="toggle-container">
                    <div className="toggle">
                        <div className="toggle-panel toggle-left">
                            <h1>Well come back 👋</h1>
                            <p>Enter your personal details to use all of site features</p>
                            <button className="hidden" onClick={() => changeSelection(false)}>Sign In</button>
                        </div>
                        <div className="toggle-panel toggle-right">
                            <h1>Hello, Friend 😘</h1>
                            <p>Register with your personal details to use all of site features</p>
                            <button className="hidden" onClick={() => changeSelection(true)}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginAndRegister;
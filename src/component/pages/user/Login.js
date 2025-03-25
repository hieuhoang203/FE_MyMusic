import React, {useEffect, useState} from "react";
import "../../../css/login.css";
import "../../../css/animation.css";
import {createBrowserHistory as useHistory} from "history";
import {notification} from "antd";
import {getAccount, getUserWhenLogin, saveAccount} from "../../../service/loginService";

const LoginAndRegister = () => {

    const history = useHistory();

    const [validate, setValidate] = useState(true)

    const [account, setAccount] = useState({
        name: '',
        login: '',
        pass: ''
    })

    const [login, setLogin] = useState({
        login: '',
        pass: ''
    })


    const changeSelection = (value) => {
        const container = document.getElementById("container")
        if (value === true) {
            history.replace('/register')
            setAccount({
                name: '',
                login: '',
                pass: ''
            })
            container.classList.add('active')
        } else {
            history.replace('/login')
            setAccount({
                name: '',
                login: '',
                pass: ''
            })
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

    function checkContainer() {
        const container = document.getElementById("container")
        return container.classList.contains('active')
    }

    function checkName(value) {
        const inputValue = document.getElementsByTagName("input")[0]
        if (value.isEmpty || value.length < 6) {
            inputValue.classList.add('error')
            setValidate(false)
        } else {
            inputValue.classList.remove('error')
            setValidate(true)
        }
    }

    function checkEmail(value) {
        const emailValid = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (value.isEmpty || !value.match(emailValid)) {
            if (checkContainer() === true) {
                const inputValue = document.getElementsByTagName("input")[1]
                inputValue.classList.add('error')
            } else {
                const inputValue = document.getElementsByTagName("input")[3]
                inputValue.classList.add('error')
            }
            setValidate(false)
        } else {
            if (checkContainer() === true) {
                const inputValue = document.getElementsByTagName("input")[1]
                inputValue.classList.remove('error')
            } else {
                const inputValue = document.getElementsByTagName("input")[3]
                inputValue.classList.remove('error')
            }
            setValidate(true)
        }
    }

    function checkPassWord(value) {
        if (value.isEmpty || value.length < 6) {
            if (checkContainer() === true) {
                const inputValue = document.getElementsByTagName("input")[2]
                inputValue.classList.add('error')
            } else {
                const inputValue = document.getElementsByTagName("input")[4]
                inputValue.classList.add('error')
            }
            setValidate(false)
        } else {
            const inputValue = document.getElementsByTagName("input")[2]
            inputValue.classList.remove('error')
            setValidate(true)
        }
    }

    function handleChangeAccount(event) {
        const target = event.target
        const name = target.name
        const value = target.value
        if (name === 'name') {
            checkName(value)
        } else if (name === 'login') {
            checkEmail(value)
        } else {
            checkPassWord(value)
        }
        let item = {...account}
        item[name] = value
        setAccount(item)
    }

    function handleChangeLogin(event) {
        const target = event.target
        const name = target.name
        const value = target.value
        if (name === 'login') {
            checkEmail(value)
        } else {
            checkPassWord(value)
        }
        let item = {...login}
        item[name] = value
        setLogin(item)
    }

    function createAccount(event) {
        event.preventDefault()
        if (validate) {
            saveAccount(account).then((response) => {
                console.log(response)
                if (response.data.result.responseCode === '200') {
                    notification.success({
                        message: "Register",
                        description: "Create account successfully!",
                        duration: 3,
                        style: {
                            animation: 'fadeInOut 5s ease-in-out',
                        },
                    });
                    setTimeout(() => {
                        window.location.replace("/login")
                    }, 1000)
                } else {
                    notification.error({
                        message: "Register",
                        description: response.data.result.responseMessage,
                        duration: 3,
                        style: {
                            animation: 'fadeInOut 5s ease-in-out',
                        },
                    });
                }
            })
        
        } else {
            notification.error({
                message: "Register",
                description: "Check login information!",
            });
        }
    }

    async function loginAccount(event) {
        event.preventDefault()
        if (validate) {
            try {
                const response = await getAccount(login);
                if (response.data.result.responseCode != '200') {
                    notification.error({
                        message: "Login",
                        description: "Wrong email or password!",
                        duration: 3,
                        style: {
                            animation: 'fadeInOut 5s ease-in-out',
                        },
                    });
                } else {
                    const user = await getUserWhenLogin(login.login);
                    notification.success({
                        message: "Login",
                        description: "Login successfully!",
                        duration: 3, 
                        style: {
                            animation: 'fadeInOut 5s ease-in-out',
                        },
                    });
                    localStorage.setItem("account", JSON.stringify(user.data.data));
                    localStorage.setItem("token", response.data.data.accessToken);
                    console.log(user.data.data)
                    console.log(response)
                    setTimeout(() => {
                        if (user.data.data.role === 'ADMIN') {
                            window.location.replace("/admin")
                        } else if (user.data.data.role === 'ARTIS') {
                            window.location.replace("/artis")
                        } else {
                            window.location.replace("/")
                        }
                    }, 1000)
                }
            } catch (error) {
                console.log(error)
                notification.error({
                    message: "Login",
                    description: "Wrong email or password!",
                    duration: 3,
                    style: {
                        animation: 'fadeInOut 5s ease-in-out',
                    },
                });
            }
        } else {
            notification.error({
                message: "Login",
                description: "Check login information!",
                duration: 3,
                style: {
                    animation: 'fadeInOut 5s ease-in-out',
                },
            });
        }
    }

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
                        <input name={'name'} type="text" placeholder={'Name'}
                               onChange={(event) => handleChangeAccount(event)}/>
                        <input name={'login'} type="email" placeholder={'Email'}
                               onChange={(event) => handleChangeAccount(event)}/>
                        <input name={'pass'} type="password" placeholder={'Password'}
                               onChange={(event) => handleChangeAccount(event)}/>
                        <button onClick={(event) => createAccount(event)}>Sign up</button>
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
                        <input type="email" placeholder={'Email'} name={'login'}
                               onChange={(event) => handleChangeLogin(event)}/>
                        <input type="password" placeholder={'Password'} name={'pass'}
                               onChange={(event) => handleChangeLogin(event)}/>
                        <a href="">Forget your password?</a>
                        <button onClick={(event) => loginAccount(event)}>Sign in</button>
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
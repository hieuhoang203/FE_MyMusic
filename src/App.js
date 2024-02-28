import './App.css';
import React from "react";
import Home from "./component/pages/home/Home";
import Login from "./component/pages/user/Login";
import Register from "./component/pages/user/Register";
import {Route, Routes} from "react-router-dom";
import Search from "./component/pages/home/Search";
import Layout from "./component/pages/menu/Layout";


function App() {
    return (
        <div className="container">
            <Routes>
                <Route path={'/'} element={<Layout/>}>
                    <Route path={''} element={<Home/>}></Route>
                    <Route path={'search'} element={<Search/>}></Route>
                </Route>
                <Route path={'/login'} element={<Login/>}></Route>
                <Route path={'/register'} element={<Register/>}></Route>
            </Routes>
        </div>
    );
}

export default App;

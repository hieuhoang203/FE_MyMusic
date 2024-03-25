import './App.css';
import React from "react";
import Home from "./component/pages/home/Home";
import Login from "./component/pages/user/Login";
import {Route, Routes} from "react-router-dom";
import Search from "./component/pages/home/Search";
import Layout from "./component/pages/menu/Layout";
import DashBoard from "./component/admin/DashBoard";
import Artist from "./component/pages/home/Artist";
import Album from "./component/pages/home/Album";


function App() {
    return (
        <div className="container">
            <Routes>
                <Route path={'/'} element={<Layout/>}>
                    <Route path={''} element={<Home/>}></Route>
                    <Route path={'search'} element={<Search/>}></Route>
                    <Route path={'artist'} element={<Artist/>}></Route>
                    <Route path={'album'} element={<Album/>}></Route>
                </Route>
                <Route path={'/login'} element={<Login/>}></Route>
                <Route path={'/register'} element={<Login/>}></Route>
                <Route path={'/admin/dashboard'} element={<DashBoard/>}></Route>
            </Routes>
        </div>
    );
}

export default App;

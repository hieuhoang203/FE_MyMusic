import './App.css';
import React from "react";
import {Route, Routes} from "react-router-dom";
import Home from "./component/pages/home/Home";
import DashBoardAdmin from "./component/pages/admin/layout/DashBoardAdmin";
import LoginAndRegister from "./component/pages/user/Login";
import AnalyticsAdmin from "./component/pages/admin/AnalyticsAdmin";
import User from "./component/pages/admin/User";
import Artis from "./component/pages/admin/Artis";
import SongAdmin from "./component/pages/admin/SongAdmin";
import PodcastAdmin from "./component/pages/admin/PodcastAdmin";
import Genres from "./component/pages/admin/Genres";
import DashBoardArtis from "./component/pages/artis/layout/DashBoardArtis";
import PodcastArtis from "./component/pages/artis/PodcastArtis";
import SongArtis from "./component/pages/artis/SongArtis";
import AnalyticsArtis from "./component/pages/artis/AnalyticsArtis";
import Album from "./component/pages/artis/Album";
import Role from "./component/pages/admin/Role";


function App() {
    return (
        <>
            <Routes>
                <Route path={'/'} element={<Home/>}></Route>
                <Route path={'/login'} element={<LoginAndRegister/>}></Route>
                <Route path={'/register'} element={<LoginAndRegister/>}></Route>
                <Route path={'/admin/'} element={<DashBoardAdmin/>}>
                    <Route path={''} element={<AnalyticsAdmin/>}></Route>
                    <Route path={'user'} element={<User/>}></Route>
                    <Route path={'artis'} element={<Artis/>}></Route>
                    <Route path={'song'} element={<SongAdmin/>}></Route>
                    <Route path={'podcast'} element={<PodcastAdmin/>}></Route>
                    <Route path={'genres'} element={<Genres/>}></Route>
                    <Route path={'role'} element={<Role/>}></Route>
                </Route>
                <Route path={'/artis/'} element={<DashBoardArtis/>}>
                    <Route path={''} element={<AnalyticsArtis/>}></Route>
                    <Route path={'song'} element={<SongArtis/>}></Route>
                    <Route path={'podcast'} element={<PodcastArtis/>}></Route>
                    <Route path={'album'} element={<Album/>}></Route>
                </Route>
            </Routes>
        </>
    );
}

export default App;

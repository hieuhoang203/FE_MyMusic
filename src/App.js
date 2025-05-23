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
import Genres from "./component/pages/admin/Genres";
import DashBoardArtis from "./component/pages/artis/layout/DashBoardArtis";
import SongArtis from "./component/pages/artis/SongArtis";
import AnalyticsArtis from "./component/pages/artis/AnalyticsArtis";
import Album from "./component/pages/artis/Album";
import ErrorPage from "./component/pages/home/ErrorPage";
import AxiosInterceptor from "./component/AxiosInterceptor";

const storedUser = JSON.parse(localStorage.getItem("account"));

function App() {

    return (
        <>
            <AxiosInterceptor/>
            <Routes>
                <Route path={'/'} element={<Home/>}></Route>
                <Route path={'/login'} element={<LoginAndRegister/>}></Route>
                <Route path={'/register'} element={<LoginAndRegister/>}></Route>
                {
                    storedUser?.role === 'ADMIN' ?
                        <>
                            <Route path={'/admin/'} element={<DashBoardAdmin/>}>
                                <Route path={''} element={<AnalyticsAdmin/>}></Route>
                                <Route path={'user'} element={<User/>}></Route>
                                <Route path={'artis'} element={<Artis/>}></Route>
                                <Route path={'song'} element={<SongAdmin/>}></Route>
                                <Route path={'genres'} element={<Genres/>}></Route>
                            </Route>
                        </>
                        : <Route path={'/admin'} element={<ErrorPage/>}></Route>
                }
                {
                    storedUser?.role === 'ARTIS' ?
                        <>
                            <Route path={'/artis/'} element={<DashBoardArtis/>}>
                                <Route path={''} element={<AnalyticsArtis/>}></Route>
                                <Route path={'my-song'} element={<SongArtis/>}></Route>
                                <Route path={'my-album'} element={<Album/>}></Route>
                            </Route>
                        </>
                        : <Route path={'/artis/'} element={<ErrorPage/>}/>
                }
            </Routes>
        </>
    );
}

export default App;

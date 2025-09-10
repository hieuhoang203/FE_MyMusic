import './App.css';
import React from "react";
import { Route, Routes } from "react-router-dom";
import { ConfigProvider } from "antd";
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
import ErrorBoundary from "./components/ErrorBoundary";
import { USER_ROLES, STORAGE_KEYS } from "./constants";

function App() {
    // Get user from localStorage safely
    const getStoredUser = () => {
        try {
            const storedUser = localStorage.getItem(STORAGE_KEYS.ACCOUNT);
            return storedUser ? JSON.parse(storedUser) : null;
        } catch (error) {
            console.error('Error parsing stored user:', error);
            return null;
        }
    };

    const storedUser = getStoredUser();

    return (
        <ErrorBoundary>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: '#1890ff',
                        borderRadius: 6,
                    },
                }}
            >
                <AxiosInterceptor />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<LoginAndRegister />} />
                    <Route path="/register" element={<LoginAndRegister />} />
                    
                    {/* Admin Routes */}
                    {storedUser?.role === USER_ROLES.ADMIN ? (
                        <Route path="/admin/" element={<DashBoardAdmin />}>
                            <Route path="" element={<AnalyticsAdmin />} />
                            <Route path="user" element={<User />} />
                            <Route path="artis" element={<Artis />} />
                            <Route path="song" element={<SongAdmin />} />
                            <Route path="genres" element={<Genres />} />
                        </Route>
                    ) : (
                        <Route path="/admin" element={<ErrorPage />} />
                    )}
                    
                    {/* Artist Routes */}
                    {storedUser?.role === USER_ROLES.ARTIS ? (
                        <Route path="/artis/" element={<DashBoardArtis />}>
                            <Route path="" element={<AnalyticsArtis />} />
                            <Route path="my-song" element={<SongArtis />} />
                            <Route path="my-album" element={<Album />} />
                        </Route>
                    ) : (
                        <Route path="/artis/" element={<ErrorPage />} />
                    )}
                    
                    {/* Catch all route */}
                    <Route path="*" element={<ErrorPage />} />
                </Routes>
            </ConfigProvider>
        </ErrorBoundary>
    );
}

export default App;

import React, { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Alert } from "antd";
import { PlayCircleOutlined, HeartOutlined, SearchOutlined, HomeOutlined, SearchOutlined as SearchIcon, AppstoreOutlined, PlusOutlined } from "@ant-design/icons";
import "../../../css/home.css";
import "../../../css/spotify-theme.css";
import useMusicPlayer from "../../../hooks/useMusicPlayer";
import useAuth from "../../../hooks/useAuth";
import { ROUTES } from "../../../constants";
import { isMobile } from "../../../utils/helpers";

function Home() {
    const { user, isAuthenticated } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isMobileView, setIsMobileView] = useState(isMobile());

    const {
        songs,
        currentSong,
        isPlaying,
        currentTime,
        duration,
        volume,
        isLoading: playerLoading,
        error: playerError,
        audioRef,
        togglePlayPause,
        playSong,
        nextSong,
        previousSong,
        seekTo,
        setVolumeLevel,
        formatTime,
    } = useMusicPlayer();

    // Handle responsive design
    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(isMobile());
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Get trending song (first song)
    const trendingSong = songs[0] || null;

    // Event handlers
    const handleSidebarToggle = useCallback(() => {
        setIsSidebarOpen(prev => !prev);
    }, []);

    const handleSearchChange = useCallback((e) => {
        setSearchQuery(e.target.value);
    }, []);

    const handleSongSelect = useCallback((index) => {
        playSong(index);
    }, [playSong]);

    const handleSeekChange = useCallback((e) => {
        const newTime = parseFloat(e.target.value);
        seekTo(newTime);
    }, [seekTo]);

    const handleVolumeChange = useCallback((e) => {
        const newVolume = parseFloat(e.target.value);
        setVolumeLevel(newVolume);
    }, [setVolumeLevel]);

    const handleGoToLogin = useCallback(() => {
        window.location.href = ROUTES.LOGIN;
    }, []);

    // Filter songs based on search query
    const filteredSongs = songs.filter(song => 
        song.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="spotify-app">
            {playerError && (
                <Alert
                    message="Player Error"
                    description={playerError}
                    type="error"
                    closable
                    style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999 }}
                />
            )}
            
            {/* Spotify Sidebar */}
            <aside className={`spotify-sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div className="spotify-sidebar-logo">
                    <i className='bx bx-pulse' style={{ fontSize: '32px', color: '#1db954' }}></i>
                    <h1>My Music</h1>
                </div>
                
                <ul className="spotify-sidebar-nav">
                    <li>
                        <Link to={ROUTES.HOME} className="active">
                            <HomeOutlined />
                            Trang chủ
                        </Link>
                    </li>
                    <li>
                        <Link to="#">
                            <SearchIcon />
                            Tìm kiếm
                        </Link>
                    </li>
                    <li>
                        <Link to="#">
                            <AppstoreOutlined />
                            Thư viện
                        </Link>
                    </li>
                </ul>

                <div className="spotify-sidebar-nav">
                    <h5 style={{ color: '#b3b3b3', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', margin: '16px 0 8px 0' }}>Playlist</h5>
                    <ul className="spotify-sidebar-nav">
                        <li>
                            <Link to="#">
                                <PlusOutlined />
                                Tạo playlist
                            </Link>
                        </li>
                        <li>
                            <Link to="#">Bài hát yêu thích</Link>
                        </li>
                        <li>
                            <Link to="#">Top 2024</Link>
                        </li>
                        <li>
                            <Link to="#">Nhạc chill</Link>
                        </li>
                    </ul>
                </div>
            </aside>

            {/* Spotify Main Content */}
            <main className="spotify-main">
                {/* Header */}
                <div className="spotify-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <button 
                            className="spotify-player-btn"
                            onClick={handleSidebarToggle}
                            style={{ display: isMobileView ? 'block' : 'none' }}
                        >
                            <i className='bx bx-menu'></i>
                        </button>
                        <h2>Chào mừng trở lại</h2>
                    </div>
                    
                    <div className="spotify-search">
                        <SearchOutlined />
                        <input 
                            type="text" 
                            placeholder="Bạn muốn nghe gì?"
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                    </div>
                </div>

                {/* Trending Section */}
                {trendingSong && (
                    <div className="spotify-card" style={{ marginBottom: '32px', background: 'linear-gradient(135deg, #1db954 0%, #1ed760 100%)', padding: '24px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <img 
                                src={trendingSong.image} 
                                alt={trendingSong.name}
                                style={{ width: '80px', height: '80px', borderRadius: '8px' }}
                            />
                            <div>
                                <h3 style={{ fontSize: '24px', fontWeight: '700', margin: '0 0 8px 0', color: '#000' }}>
                                    {trendingSong.name}
                                </h3>
                                <p style={{ fontSize: '16px', margin: '0 0 16px 0', color: '#000' }}>
                                    {trendingSong.artist}
                                </p>
                                <Button 
                                    className="spotify-btn"
                                    icon={<PlayCircleOutlined />}
                                    onClick={() => handleSongSelect(0)}
                                    loading={playerLoading}
                                    style={{ backgroundColor: '#000', color: '#fff', border: 'none' }}
                                >
                                    Phát ngay
                                </Button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Recently Played */}
                <div className="spotify-playlist">
                    <div className="spotify-playlist-header">
                        <h3 className="spotify-playlist-title">Gần đây đã phát</h3>
                        <a href="#" className="spotify-playlist-see-all">Hiển thị tất cả</a>
                    </div>
                    <div className="spotify-grid">
                        {filteredSongs.slice(0, 6).map((song, index) => (
                            <div key={song.id} className="spotify-card spotify-fade-in">
                                <img 
                                    src={song.image} 
                                    alt={song.name}
                                    className="spotify-card-image"
                                />
                                <h4 className="spotify-card-title">{song.name}</h4>
                                <p className="spotify-card-subtitle">{song.artist}</p>
                                <button 
                                    className="spotify-player-btn play"
                                    onClick={() => handleSongSelect(index)}
                                    style={{ marginTop: '8px' }}
                                >
                                    <PlayCircleOutlined />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Made for You */}
                <div className="spotify-playlist">
                    <div className="spotify-playlist-header">
                        <h3 className="spotify-playlist-title">Dành cho bạn</h3>
                        <a href="#" className="spotify-playlist-see-all">Hiển thị tất cả</a>
                    </div>
                    <div className="spotify-grid">
                        {filteredSongs.slice(6, 12).map((song, index) => (
                            <div key={song.id} className="spotify-card spotify-fade-in">
                                <img 
                                    src={song.image} 
                                    alt={song.name}
                                    className="spotify-card-image"
                                />
                                <h4 className="spotify-card-title">{song.name}</h4>
                                <p className="spotify-card-subtitle">{song.artist}</p>
                                <button 
                                    className="spotify-player-btn play"
                                    onClick={() => handleSongSelect(index + 6)}
                                    style={{ marginTop: '8px' }}
                                >
                                    <PlayCircleOutlined />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* User Profile */}
                {!isAuthenticated && (
                    <div style={{ textAlign: 'center', marginTop: '48px' }}>
                        <h3 style={{ color: '#b3b3b3', marginBottom: '16px' }}>
                            Đăng nhập để nghe nhạc không giới hạn
                        </h3>
                        <Button 
                            className="spotify-btn spotify-btn-primary"
                            onClick={handleGoToLogin}
                        >
                            Đăng nhập
                        </Button>
                    </div>
                )}
            </main>

            {/* Spotify Music Player */}
            {currentSong && (
                <div className="spotify-player">
                    <div className="spotify-player-left">
                        <div className="spotify-player-song">
                            <img src={currentSong.image} alt={currentSong.name} />
                            <div className="spotify-player-song-info">
                                <h4>{currentSong.name}</h4>
                                <p>{currentSong.artist}</p>
                            </div>
                        </div>
                        <button className="spotify-player-btn">
                            <HeartOutlined />
                        </button>
                    </div>

                    <div className="spotify-player-center">
                        <div className="spotify-player-controls">
                            <button className="spotify-player-btn">
                                <i className='bx bx-shuffle'></i>
                            </button>
                            <button className="spotify-player-btn" onClick={previousSong}>
                                <i className='bx bx-skip-previous'></i>
                            </button>
                            <button 
                                className="spotify-player-btn play" 
                                onClick={togglePlayPause}
                                loading={playerLoading}
                            >
                                {isPlaying ? <i className='bx bx-pause'></i> : <i className='bx bx-play'></i>}
                            </button>
                            <button className="spotify-player-btn" onClick={nextSong}>
                                <i className='bx bx-skip-next'></i>
                            </button>
                            <button className="spotify-player-btn">
                                <i className='bx bx-repeat'></i>
                            </button>
                        </div>
                        
                        <div className="spotify-player-progress">
                            <span className="spotify-player-time">{formatTime(currentTime)}</span>
                            <div className="spotify-player-slider" onClick={handleSeekChange}>
                                <div 
                                    className="spotify-player-slider-fill" 
                                    style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                                />
                            </div>
                            <span className="spotify-player-time">{formatTime(duration)}</span>
                        </div>
                    </div>

                    <div className="spotify-player-right">
                        <div className="spotify-player-volume">
                            <button className="spotify-player-btn">
                                <i className='bx bx-volume-low'></i>
                            </button>
                            <div className="spotify-player-volume-slider" onClick={handleVolumeChange}>
                                <div 
                                    className="spotify-player-volume-fill" 
                                    style={{ width: `${volume * 100}%` }}
                                />
                            </div>
                            <button className="spotify-player-btn">
                                <i className='bx bx-volume-full'></i>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <audio 
                ref={audioRef}
                preload="auto" 
                src={currentSong?.audio}
                id="audio"
            />
        </div>
    );
}

export default Home;
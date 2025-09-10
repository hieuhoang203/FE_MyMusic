import React, { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Spin, Alert } from "antd";
import { PlayCircleOutlined, HeartOutlined, SearchOutlined } from "@ant-design/icons";
import "../../../css/home.css";
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
        <div className="body-home">
            {playerError && (
                <Alert
                    message="Player Error"
                    description={playerError}
                    type="error"
                    closable
                    style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999 }}
                />
            )}
            
            <div className={`home-container ${isMobileView ? 'mobile' : ''}`}>
                <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                    <div className="logo">
                        <button 
                            className="menu-btn" 
                            id="menu-close" 
                            onClick={() => setIsSidebarOpen(false)}
                            aria-label="Close menu"
                        >
                            <i className='bx bx-x'></i>
                        </button>
                        <i className='bx bx-pulse'></i>
                        <Link to={ROUTES.HOME}>My Music</Link>
                    </div>
                    <div className="menu">
                        <h5>Menu</h5>
                        <ul>
                            <li>
                                <i className='bx bxs-bolt-circle'></i>
                                <Link to="#">Explore</Link>
                            </li>
                            <li>
                                <i className='bx bxs-volume-full'></i>
                                <Link to="#">Genres</Link>
                            </li>
                            <li>
                                <i className='bx bxs-album'></i>
                                <Link to="#">Albums</Link>
                            </li>
                            <li>
                                <i className='bx bxs-microphone'></i>
                                <Link to="#">Artists</Link>
                            </li>
                            <li>
                                <i className='bx bxs-radio'></i>
                                <Link to="#">Podcast</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="menu">
                        <h5>Library</h5>
                        <ul>
                            <li>
                                <i className='bx bx-undo'></i>
                                <Link to="#">Recent</Link>
                            </li>
                            <li>
                                <i className='bx bxs-photo-album'></i>
                                <Link to="#">Albums</Link>
                            </li>
                            <li>
                                <i className='bx bxs-heart'></i>
                                <Link to="#">Favourites</Link>
                            </li>
                            <li>
                                <i className='bx bxs-folder'></i>
                                <Link to="#">Local</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="menu">
                        <h5>Play List</h5>
                        <ul>
                            <li>
                                <i className='bx bxs-plus-square'></i>
                                <Link to={'/'}>Create New</Link>
                            </li>
                            <li>
                                <i className='bx bxs-caret-right-circle'></i>
                                <Link to="#">Best of 2024</Link>
                            </li>
                            <li>
                                <i className='bx bxs-caret-right-circle'></i>
                                <Link to="#">Best of 2023</Link>
                            </li>
                            <li>
                                <i className='bx bxs-caret-right-circle'></i>
                                <Link to="#">Kael Fischer</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="playing">
                        <div className="top">
                            <img src={'https://res.cloudinary.com/hieuhv203/image/upload/v1715650295/assetHtml/q9h4uiwuz89nvni9a58k.png'} alt={'Can not show image'}/>
                            <h4>Grape<br/>Homepod</h4>
                        </div>
                        <div className="bottom">
                            <i className='bx bx-podcast'></i>
                            <p>Playing On Device</p>
                        </div>
                    </div>
                </aside>
                <main>
                    <header>
                        <div className="nav-links">
                            <button 
                                className="menu-btn" 
                                id="menu-open" 
                                onClick={handleSidebarToggle}
                                aria-label="Open menu"
                            >
                                <i className='bx bx-menu'></i>
                            </button>
                            <Link to={ROUTES.HOME}>Music</Link>
                            <Link to={'#'}>Live</Link>
                            <Link to={'#'}>Podcast</Link>
                        </div>
                        <div className="search">
                            <SearchOutlined />
                            <input 
                                type="text" 
                                placeholder="Type here to search"
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                        </div>
                    </header>

                    <div className="trending">
                        <div className="left">
                            <h5>Trending New Song</h5>
                            {trendingSong ? (
                                <div className="info">
                                    <h2>{trendingSong.name}</h2>
                                    <h4>{trendingSong.artist}</h4>
                                    <h5>63 Thousand Plays</h5>
                                    <div className="buttons">
                                        <Button 
                                            type="primary" 
                                            icon={<PlayCircleOutlined />}
                                            onClick={() => handleSongSelect(0)}
                                            loading={playerLoading}
                                        >
                                            Listen Now
                                        </Button>
                                        <Button 
                                            className="heart-button" 
                                            icon={<HeartOutlined />}
                                            shape="circle"
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div className="info">
                                    <h2>No songs available</h2>
                                </div>
                            )}
                        </div>
                        {trendingSong && (
                            <img src={trendingSong.image} alt={trendingSong.name} />
                        )}
                    </div>

                    <div className="playlist">
                        <div className="genres">
                            <div className="header">
                                <h5>Genres</h5>
                                <Link to={'#'}>See all</Link>
                            </div>
                            <div className="items">
                                <div className="item">
                                    <p>Electro<br/>Pop</p>
                                </div>
                                <div className="item">
                                    <p>Dance<br/>Beat</p>
                                </div>
                                <div className="item">
                                    <p>Clubhouse<br/>Remix</p>
                                </div>
                                <div className="item">
                                    <p>HipHop<br/>Rap</p>
                                </div>
                                <div className="item">
                                    <p>Alternative<br/>Indie</p>
                                </div>
                                <div className="item">
                                    <p>Classical<br/>Period</p>
                                </div>
                            </div>
                        </div>

                        <div className="music-list">
                            <div className="header">
                                <h5>Top Songs</h5>
                                <Link to={'#'}>See all</Link>
                            </div>

                            <div className="items">
                                {filteredSongs.length > 0 ? (
                                    filteredSongs.map((item, index) => (
                                        <div className="item" key={item.id}>
                                            <div className="info">
                                                <p>{index + 1}</p>
                                                <img src={item.image} alt={item.name} />
                                                <div className="details">
                                                    <h5>{item.name}</h5>
                                                    <p>{item.artist}</p>
                                                </div>
                                            </div>
                                            <div className="actions">
                                                <p className="time-song">{formatTime(item.duration)}</p>
                                                <div className="icon">
                                                    <Button
                                                        type="text"
                                                        icon={<PlayCircleOutlined />}
                                                        onClick={() => handleSongSelect(index)}
                                                        loading={playerLoading && currentSong?.id === item.id}
                                                    />
                                                </div>
                                                <Button
                                                    type="text"
                                                    icon={<HeartOutlined />}
                                                    shape="circle"
                                                />
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="no-results">
                                        <p>No songs found matching your search.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                </main>

                <div className="right-section">

                    <div className="profile">
                        <i className='bx bxs-bell'></i>
                        <i className='bx bxs-cog'></i>
                        {isAuthenticated && user ? (
                            <div className="user">
                                <div className="left">
                                    <img src={user.avatar} alt={user.name} />
                                </div>
                                <div className="right">
                                    {user.name}
                                </div>
                            </div>
                        ) : (
                            <Button 
                                className="login-button" 
                                onClick={handleGoToLogin}
                                type="primary"
                            >
                                Login
                            </Button>
                        )}
                    </div>

                    <div className="music-player">
                        <div className="top-section">
                            <div className="header">
                                <h5>Player</h5>
                                <i className='bx bxs-playlist'></i>
                            </div>
                            {currentSong ? (
                                <div className="song-info">
                                    <img src={currentSong.image} alt={currentSong.name} />
                                    <div className="description">
                                        <h3>{currentSong.name}</h3>
                                        <h5>{currentSong.artist}</h5>
                                        <p>Best of 2024</p>
                                        <audio 
                                            ref={audioRef}
                                            preload="auto" 
                                            src={currentSong.audio}
                                            id="audio"
                                        />
                                    </div>
                                    <div className="progress">
                                        <p className="current-time">{formatTime(currentTime)}</p>
                                        <div className="active-line">
                                            <input 
                                                type="range" 
                                                min={0} 
                                                max={duration || 0} 
                                                value={currentTime}
                                                onChange={handleSeekChange}
                                                id="seek-slide"
                                            />
                                        </div>
                                        <p className="total-duration">{formatTime(duration)}</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="song-info">
                                    <div className="description">
                                        <h3>No song selected</h3>
                                        <p>Choose a song to start playing</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="player-actions">
                            <div className="buttons">
                                <Button type="text" icon={<i className='bx bx-repeat'></i>} />
                                <Button 
                                    type="text" 
                                    icon={<i className='bx bx-first-page'></i>} 
                                    onClick={previousSong}
                                />
                                <Button 
                                    type="primary" 
                                    shape="circle"
                                    icon={
                                        isPlaying ? 
                                        <i className='bx bx-pause'></i> : 
                                        <i className='bx bxs-right-arrow'></i>
                                    }
                                    onClick={togglePlayPause}
                                    loading={playerLoading}
                                />
                                <Button 
                                    type="text" 
                                    icon={<i className='bx bx-last-page'></i>} 
                                    onClick={nextSong}
                                />
                                <Button type="text" icon={<i className='bx bx-download'></i>} />
                            </div>
                            <div className="volume-control">
                                <i className='bx bx-volume-low'></i>
                                <input 
                                    type="range" 
                                    min={0} 
                                    max={1} 
                                    step={0.1}
                                    value={volume}
                                    onChange={handleVolumeChange}
                                />
                                <i className='bx bx-volume-full'></i>
                            </div>
                            <div className="lyrics">
                                <i className='bx bx-chevron-up'></i>
                                <h5>LYRICS</h5>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Home;
import React, {useEffect, useState} from "react";
import "../../../css/home.css";
import trending from "../../../asset/song1.jpg";
import avatar from "../../../asset/avatar.png";
import img1 from "../../../asset/song1.jpg";
import song1 from "../../../asset/song1.mp3";
import img2 from "../../../asset/song2.jpg";
import song2 from "../../../asset/song2.mp3";
import img3 from "../../../asset/song3.jpg";
import song3 from "../../../asset/song3.mp3";
import img4 from "../../../asset/song4.jpg";
import song4 from "../../../asset/song4.mp3";
import {Link} from "react-router-dom";

function Home() {

    const [indexSong, setIndexSong] = useState(0);
    const [load, setLoad] = useState(true)
    const [trendingSong, setTrendingSong] = useState({})

    const [listSong, setListSong] = useState([
        {
            id: 1,
            name: 'Cô gái M52',
            artist: 'HuyR',
            image: img1,
            audio: song1,
            duration: 213
        },
        {
            id: 2,
            name: 'Mây lang thang',
            image: img2,
            artist: 'Tùng Tea',
            audio: song2,
            duration: 197
        },
        {
            id: 3,
            name: 'Bèo dạt mây trôi',
            image: img3,
            artist: 'Hương Tú',
            audio: song3,
            duration: 207
        },
        {
            id: 4,
            name: 'Yume Tourou',
            image: img4,
            artist: 'RADWIMPS',
            audio: song4,
            duration: 129
        }
    ])

    const [playing, setPlaying] = useState(listSong.at(indexSong));

    useEffect(() => {
        setTrendingSong(listSong.at(0))
    }, [])

    useEffect(() => {
        setSong()
    }, [load]);

    const [play, setPlay] = useState(true);

    function formatTime(value) {
        let min = Math.floor(value/60);
        if (min<10){
            min = `0${min}`
        }
        let sec = Math.floor(value%60)
        if (sec<10){
            sec = `0${sec}`
        }
        return `${min}:${sec}`
    }

    function setSong() {
        const currentTime = document.getElementsByClassName('current-time')[0]
        const seekSlide = document.getElementById('seek-slide')
        setPlaying(listSong.at(indexSong))
        setTimeout(() => {
            currentTime.innerHTML = "00:00"
            seekSlide.max = playing.duration
        }, 50)
    }

    function changePlaying(index) {
        const playIcon = document.getElementById('play')
        const audio = document.querySelector('audio');
        setIndexSong(index)
        setPlaying(listSong.at(index))
        if (play === true) {
            playIcon.classList.remove('bxs-right-arrow')
            playIcon.classList.add('bx-pause')
            setPlay(!play)
        }
        setLoad(!load)
        setTimeout(() => {
            audio.src = listSong.at(index).audio
            audio.play()
            console.log(audio)
        }, 1000)
    }

    function OpenOrCloseMenu(value) {
        const sidebar = document.getElementById('.container .sidebar');
        value === true ? sidebar.style.left = '0' : sidebar.style.left = '-100%';
    }

    function playMusic(value) {
        const audio = document.querySelector('audio');
        const playIcon = document.getElementById('play')
        if (value === true) {
            audio.play()
            playIcon.classList.remove('bxs-right-arrow')
            playIcon.classList.add('bx-pause')
        } else {
            audio.pause()
            playIcon.classList.remove('bx-pause')
            playIcon.classList.add('bxs-right-arrow')
        }
        setPlay(!play)
    }

    setInterval(() => {
        const currentTime = document.getElementsByClassName('current-time')[0]
        const seekSlide = document.getElementById('seek-slide')
        const audio =  document.querySelector('audio')
        seekSlide.value = audio.currentTime
        currentTime.innerHTML = formatTime(audio.currentTime)
        if (audio.ended) {
            nextSong()
            setTimeout(() => {
                audio.play()
            }, 100)
        }
    }, 1000)

    function previousSong() {
        if (indexSong >= 0) {
            setIndexSong(indexSong - 1)
        } else {
            setIndexSong(listSong.length - 1)
        }
        setPlaying(listSong.at(indexSong))
        setLoad(!load)
    }

    function nextSong() {
        if (indexSong < listSong.length - 1) {
            setIndexSong(indexSong + 1)
        } else {
            setIndexSong(0)
        }
        setPlaying(listSong.at(indexSong))
        setLoad(!load)
    }

    function seekChange(event) {
        event.preventDefault()
        const currentTime = document.getElementsByClassName('current-time')[0]
        const audio =  document.getElementById('audio')
        const target = event.target
        audio.currentTime = target.value
        currentTime.innerHTML = formatTime(audio.currentTime)
    }

    return (
        <div className="body-home">
            <div className={'home-container'}>
                <aside className="sidebar">
                    <div className="logo">
                        <button className="menu-btn" id="menu-close" onClick={() => OpenOrCloseMenu(false)}>
                            <i className='bx bx-x'></i>
                        </button>
                        <i className='bx bx-pulse'></i>
                        <Link to={'#'}>My Music</Link>
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
                            <button className="menu-btn" id="menu-open" onClick={() => OpenOrCloseMenu(true)}>
                                <i className='bx bx-menu'></i>
                            </button>
                            <Link to={'#'}>Music</Link>
                            <Link to={'#'}>Live</Link>
                            <Link to={'#'}>Podcast</Link>
                        </div>
                        <div className="search">
                            <i className='bx bx-search'></i>
                            <input type="text" placeholder={'Type here to search'}/>
                        </div>
                    </header>

                    <div className="trending">
                        <div className="left">
                            <h5>Trending New Song</h5>
                            <div className="info">
                                <h2>{trendingSong.name}</h2>
                                <h4>{trendingSong.artist}</h4>
                                <h5>63 Thousand Plays</h5>
                                <div className="buttons">
                                    <button onClick={() => changePlaying(0)}>Listen Now</button>
                                    <button className={'heart-button'}><i className='bx bxs-heart'></i></button>
                                </div>
                            </div>
                        </div>
                        <img src={trending} alt={'Can not show image'}/>
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
                                {listSong.map((item, index) =>
                                    <div className="item" key={item.id}>
                                        <div className="info">
                                            <p>{item.id}</p>
                                            <img src={item.image} alt="Can not show image"/>
                                            <div className="details">
                                                <h5>{item.name}</h5>
                                                <p>{item.artist}</p>
                                            </div>
                                        </div>
                                        <div className="actions">
                                            <p className={'time-song'}>{formatTime(item.duration)}</p>
                                            <div className="icon">
                                                <i className='bx bxs-right-arrow'
                                                   onClick={() => changePlaying(index)}></i>
                                            </div>
                                            <i className='bx bxs-plus-square'></i>
                                        </div>
                                    </div>)}
                            </div>
                        </div>
                    </div>

                </main>

                <div className="right-section">

                    <div className="profile">
                        <i className='bx bxs-bell'></i>
                        <i className='bx bxs-cog'></i>
                        <div className="user">
                            <div className="left">
                                <img src={avatar} alt="Can not show image!"/>
                            </div>
                            <div className="right">
                                Vân Anh
                            </div>
                        </div>
                    </div>

                    <div className="music-player">

                        <div className="top-section">
                            <div className="header">
                                <h5>Player</h5>
                                <i className='bx bxs-playlist'></i>
                            </div>
                            <div className="song-info">
                                <img src={playing.image} alt="Can not show image!"/>
                                <div className="description">
                                    <h3>{playing.name}</h3>
                                    <h5>{playing.artist}</h5>
                                    <p>Best of 2024</p>
                                    <audio preload={'auto'} src={playing.audio} id={'audio'}>
                                    </audio>
                                </div>
                                <div className="progress">
                                    <p className={'current-time'}></p>
                                    <div className="active-line">
                                        <input type="range" defaultValue={0} min={0} max={100} id={'seek-slide'}
                                               onClick={seekChange}/>
                                    </div>
                                    {/*<div className="deactive-line"></div>*/}
                                    <p className={'total-duration'}>{formatTime(playing.duration)}</p>
                                </div>
                            </div>
                        </div>

                        <div className="player-actions">
                            <div className="buttons">
                                <i className='bx bx-repeat'></i>
                                <i className='bx bx-first-page' onClick={() => previousSong()}></i>
                                <i id={'play'} className='bx bxs-right-arrow play-button'
                                   onClick={() => playMusic(play)}></i>
                                <i className='bx bx-last-page' onClick={() => nextSong()}></i>
                                <i className='bx bx-download'></i>
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
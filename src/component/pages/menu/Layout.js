import React, {useEffect, useState} from "react";
import {Link, Outlet} from "react-router-dom";
import '../../../css/layout.css';
import co_gai_m52 from '../../../asset/CoGaiM52-HuyTungViu-5393804.mp3';

function Layout() {

    const [play, setPlay] = useState(false);
    const [repeat, setRepeat] = useState(false);

    const music = {
        id: 1,
        name: 'Cô gái m52',
        image: 'https://i.ytimg.com/vi/nHK0u40Ompc/maxresdefault.jpg',
        author: [
            {
                id: 1,
                name: 'HuyR'
            },
            {
                id: 2,
                name: 'Tùng Viu'
            }
        ],
        audio: co_gai_m52
    };

    useEffect(() => {
        setSong();
    }, []);

    function changeColorText(value) {
        const home = document.getElementsByClassName('link-page')[0]
        const search = document.getElementsByClassName('link-page')[1]
        if (value === 'home') {
            search.classList.remove('active')
            home.classList.add('active')
        } else {
            home.classList.remove('active')
            search.classList.add('active')
        }
    }

    function addOrRemove() {
        const home = document.getElementsByClassName('link-page')[0]
        const search = document.getElementsByClassName('link-page')[1]
        const heart = document.getElementById('heart');
        if (heart.classList.contains('bx-heart')) {
            heart.classList.remove('bx-heart')
            heart.classList.add('bxs-heart')
            heart.style.color = "var(--heart-color)"
            search.classList.remove('active')
            home.classList.remove('active')
        } else {
            heart.classList.remove('bxs-heart')
            heart.classList.add('bx-heart')
            heart.style.color = "var(--text-color)"
        }
    }

    function setSong() {
        const currentTime = document.getElementsByClassName('current-time')[0]
        const durationTime = document.getElementsByClassName('total-duration')[0]
        const audio =  document.querySelector('audio')
        const seek_slide = document.getElementById('seek_slide')
        setTimeout(() => {
            currentTime.innerHTML = "00:00"
            seek_slide.max = audio.duration
            durationTime.innerHTML = formatTime(audio.duration)
        }, 100)
    }

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

    function seekTo(event) {
        const audio =  document.querySelector('audio')
        const target = event.target
        audio.currentTime = target.value
    }

    function repeatMusic(value) {
        const repeatElm = document.getElementsByClassName('style-icon')[1]
        const audio =  document.querySelector('audio')
        if (value === true) {
            repeatElm.classList.remove('active')
            setRepeat(!repeat)
            audio.loop = !repeat
        } else {
            repeatElm.classList.add('active')
            setRepeat(!repeat)
            audio.loop = !repeat
        }
    }

    setInterval(() => {
        const currentTime = document.getElementsByClassName('current-time')[0]
        const audio =  document.querySelector('audio')
        const seek_slide = document.getElementById('seek_slide')
        seek_slide.value = audio.currentTime
        currentTime.innerHTML = formatTime(audio.currentTime)
    }, 1000)

    function playMusic(value) {
        const audio =  document.querySelector('audio')
        const playIcon = document.getElementById('play');
        if (value === true) {
            playIcon.classList.remove('bx-play')
            playIcon.classList.add('bx-pause')
            setPlay(!play)
            audio.play()
        } else {
            playIcon.classList.remove('bx-pause')
            playIcon.classList.add('bx-play')
            setPlay(!play)
            audio.pause()
        }
    }

    function changeVolume(event) {
        const audio =  document.querySelector('audio')
        audio.volume = event.target.value/100
        console.log(event.target.value/100)
    }

    return (
        <div className="home-page">
            <div className="toolbar-content">
                <div className="standing-menu">
                    <div className="toolbar">
                        <div className="toolbar-item item-home">
                            <Link className="link-page active" to="/" onClick={() => changeColorText('home')}>
                                <i className='bx bxs-home bx-sm bx-tada-hover'></i>
                                <h4>Trang chủ</h4>
                            </Link>
                        </div>
                        <div className="toolbar-item item-search">
                            <Link className="link-page" to="/search" onClick={() => changeColorText('search')}>
                                <i className='bx bx-search-alt bx-sm bx-tada-hover'></i>
                                <h4>Tìm kiếm</h4>
                            </Link>
                        </div>
                    </div>
                    <div className="library">
                        <div className="library-item">
                            <Link className="icon-library" to={'/library'}>
                                <i className='bx bx-library bx-sm bx-tada-hover'></i>
                                <h4>Thư viện</h4>
                            </Link>
                            <Link className='icon-bonus' to="/">
                                <i className='bx bx-plus bx-sm bx-tada-hover'></i>
                            </Link>
                            <Link className='icon-bonus' to="/">
                                <i className='bx bx-search-alt-2 bx-sm bx-tada-hover'></i>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="content">
                    <div className="header-content">
                        <Outlet/>
                    </div>
                </div>
            </div>
            <div className="playing">
                <div className="thumbnail">
                    <div className="img-song">
                        <img src={music.image} alt=""/>
                    </div>
                    <div className="link-info">
                        <Link className="link-album" to="/album">
                            {music.name}
                        </Link>
                        <br/>
                        <Link className="link-author" to="/artist">
                            HuyR
                        </Link>
                    </div>
                    <div className="heart">
                        <button className="link-page" onClick={() => addOrRemove()}>
                            <i className='bx bx-heart' id={'heart'}></i>
                        </button>
                    </div>
                </div>
                <div className="song">
                    <div className="buttons">
                        <div className="buttons-controlls">
                            <button><i className='bx bx-shuffle bx-sm style-icon'></i></button>
                        </div>
                        <div className="buttons-controlls">
                            <button><i className='bx bx-skip-previous bx-md'></i></button>
                        </div>
                        <div className="buttons-controlls">
                            <button onClick={() => playMusic(play)}><i className='bx bx-play bx-md' id={'play'}></i></button>
                        </div>
                        <div className="buttons-controlls">
                            <button><i className='bx bx-skip-next bx-md'></i></button>
                        </div>
                        <div className="buttons-controlls">
                            <button onClick={() => repeatMusic(repeat)}><i className='bx bx-repeat bx-sm style-icon'></i></button>
                        </div>
                    </div>
                    <div className="slide-container">
                        <div className="current-time">
                            -.-
                        </div>
                        <input type="range" min="1" max="100" id="seek_slide" onChange={seekTo}/>
                        <div className="total-duration">
                            -.-
                        </div>
                        <audio src={music.audio}></audio>
                    </div>
                </div>
                <div className="controls-song">
                    <div className="user-controller">
                        <button>
                            <i className='bx bx-music'></i>
                        </button>
                    </div>
                    <div className="user-controller">
                        <button>
                            <i className='bx bx-menu'></i>
                        </button>
                    </div>
                    <div className="user-controller volume-button">
                        <input min={0} max={100} type="range" name="" id="volume" onChange={changeVolume}/>
                    </div>
                    <div className="user-controller">
                    <button>
                            <i className='bx bx-fullscreen'></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>

    );

}

export default Layout;
import React from "react";
import "../../../css/home.css";
import {Link} from "react-router-dom";
import ButtonAccount from "../menu/ButtonAccount";

function Home() {

    const listAlbum = [
        {
            id: 1,
            name: "Bài hát đã thích",
            image: "https://haycafe.vn/wp-content/uploads/2021/11/hinh-anh-hoat-hinh-de-thuong-cute-dep-nhat.jpg"
        },
        {
            id: 2,
            name: "Dân ca quan họ Bắc Ninh",
            image: "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/08/Hinh-nen-anime-cute-16-1.jpg"
        }
    ]

    return (
        <>
            <div className="header-content">
                <div className="button-arrow">
                    <Link to="/">
                        <i className='bx bx-chevron-left bx-sm'></i>
                    </Link>
                </div>
                <div className="button-arrow">
                    <Link to="/">
                        <i className='bx bx-chevron-right bx-sm'></i>
                    </Link>
                </div>
                <ButtonAccount></ButtonAccount>
            </div>
            <div className="search-box">
                <div className="list-button">
                    <button className="link-search active-button">
                        <a href="#" className="link-active">Tất cả</a>
                    </button>
                    <button className="link-search">
                        <a href="#">Album</a>
                    </button>
                    <button className="link-search">
                        <a href="#">Podcasts</a>
                    </button>
                </div>
                <div className="albums">
                    hello
                </div>
            </div>
        </>
    )
}

export default Home;
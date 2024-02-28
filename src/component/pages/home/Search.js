import React from "react";
import {Link} from "react-router-dom";
import '../../../css/search.css';
import ButtonAccount from "../menu/ButtonAccount";

function Search() {
    return (
        <>
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
            <div className="input-search">
                <span><i className='bx bx-search-alt-2 bx-sm'></i></span>
                <input type="text" placeholder="Bạn muốn nghe gì?"/>
            </div>
            <ButtonAccount></ButtonAccount>
        </>
    )
}

export default Search;
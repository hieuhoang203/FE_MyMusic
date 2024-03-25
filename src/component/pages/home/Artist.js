import React from "react";
import {Link} from "react-router-dom";
import ButtonAccount from "../menu/ButtonAccount";

const Artist = () => {
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
        <ButtonAccount></ButtonAccount></>
  );
}
export default Artist;
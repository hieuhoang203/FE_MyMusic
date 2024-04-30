import React from "react";
import thuy from "../../../asset/thuydo.png";
import truc from "../../../asset/trucdo.png";
import vanh from "../../../asset/vanhdo.PNG";
import plus from "../../../asset/plus.png";
import "../../../css/analytics.css";
import cogaim52 from "../../../asset/song1.mp3";

const AnalyticsAdmin = () => {

    const newSong = [
        {
            id: 1,
            avatar: thuy,
            name: 'Cô gái M52',
            artis: 'HuyR',
            post_time: '17/04/2024',
            duration: 213,
            audio: cogaim52
        },
        {
            id: 2,
            avatar: thuy,
            name: 'Mây Lang Thang',
            artis: 'Tùng Tea',
            post_time: '17/04/2024',
            duration: 213,
            audio: cogaim52
        },
        {
            id: 3,
            avatar: thuy,
            name: 'Bèo dạt mây trôi',
            artis: 'Hương Tú',
            post_time: '17/04/2024',
            duration: 213,
            audio: cogaim52
        }
    ]

  return (
      <>
          <h1 className={'title'}>Analytics</h1>
          <div className="analyse">
              <div className="sales">
                  <div className="status">
                      <div className="info">
                          <h3>Total Artis</h3>
                          <h1>65,024</h1>
                      </div>
                      <div className="progresss">
                          <svg>
                              <circle cx="38" cy="38" r="36"></circle>
                          </svg>
                          <div className="percentage">
                              <p>+81%</p>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="visits">
                  <div className="status">
                      <div className="info">
                          <h3>New Song</h3>
                          <h1>24,981</h1>
                      </div>
                      <div className="progresss">
                          <svg>
                              <circle cx="38" cy="38" r="36"></circle>
                          </svg>
                          <div className="percentage">
                              <p>-48%</p>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="searches">
                  <div className="status">
                      <div className="info">
                          <h3>Total User</h3>
                          <h1>14,147</h1>
                      </div>
                      <div className="progresss">
                          <svg>
                              <circle cx="38" cy="38" r="36"></circle>
                          </svg>
                          <div className="percentage">
                              <p>+21%</p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>

          <div className="recent-orders">
              <h2>Top Trending</h2>
              <table>
                  <thead>
                  <tr>
                      <th></th>
                      <th>Name Song<i className='bx bx-search-alt-2'></i></th>
                      <th>Name Artis<i className='bx bx-search-alt-2'></i></th>
                      <th style={{textAlign: "center"}}>Duration</th>
                      <th style={{textAlign: "center"}}>View</th>
                      <th></th>
                      <th></th>
                  </tr>
                  </thead>
                  <tbody>
                  {newSong.map((value, index) => (
                      <tr key={index}>
                          <td><img src={value.avatar} alt={'Can not show image'}/></td>
                          <td>{value.name}</td>
                          <td>{value.artis}</td>
                          <td>{value.duration}</td>
                          <td>{value.post_time}</td>
                          <td className={'success'}>Play</td>
                      </tr>
                  ))}
                  </tbody>
              </table>
          </div>
      </>
  );
}

export default AnalyticsAdmin;
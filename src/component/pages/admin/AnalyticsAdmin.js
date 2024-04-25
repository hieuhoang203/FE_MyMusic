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
                          <h3>New Registration</h3>
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

          <div className="new-users">
              <h2 className={'name-user'}>New Users</h2>
              <div className="user-list">
                  <div className="user">
                      <img src={thuy} alt={'Can not show image'}/>
                      <h2>Thúy</h2>
                      <p>54 Min Ago</p>
                  </div>
                  <div className="user">
                      <img src={truc} alt={'Can not show image'}/>
                      <h2>Trúc</h2>
                      <p>3 Hours Ago</p>
                  </div>
                  <div className="user">
                      <img src={vanh} alt={'Can not show image'}/>
                      <h2>Vân Anh</h2>
                      <p>6 Hours Ago</p>
                  </div>
                  <div className="user">
                      <img src={plus} alt={'Can not show image'}/>
                      <h2>More</h2>
                      <p>New User</p>
                  </div>
              </div>
          </div>

          <div className="recent-orders">
              <h2>Top Trending</h2>
              <table>
                  <thead>
                  <tr>
                      <th></th>
                      <th>Name Song</th>
                      <th>Name Artis</th>
                      <th>Duration</th>
                      <th>View</th>
                      <th>Try Listening</th>
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
              <a href="#">Show All</a>
          </div>
      </>
  );
}

export default AnalyticsAdmin;
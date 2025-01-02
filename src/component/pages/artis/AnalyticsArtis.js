import React from "react";
import love from "../../../asset/IMG_0174.PNG";
import "../../../css/analytics.css";

const AnalyticsArtis = () => {

    const Orders = [
        {
            productName: 'JavaScript Tutorial',
            productNumber: '85743',
            paymentStatus: 'Due',
            status: 'Pending'
        },
        {
            productName: 'CSS Full Course',
            productNumber: '97245',
            paymentStatus: 'Refunded',
            status: 'Declined'
        },
        {
            productName: 'Flex-Box Tutorial',
            productNumber: '36452',
            paymentStatus: 'Paid',
            status: 'Active'
        }
    ]

  return (
      <>
          <h1 className={'title'}>Analytics</h1>
          <div className="analyse">
              <div className="sales">
                  <div className="status">
                      <div className="info">
                          <h3>Followers</h3>
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
                          <h3>Personal Visit</h3>
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
                          <h3>Searches</h3>
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
              <h2 className={'name-user'}>New Followers</h2>
              <div className="user-list">
                  <div className="user">
                      <img src={love} alt={'Can not show image'}/>
                      <h2>Hòa</h2>
                      <p>54 Min Ago</p>
                  </div>
                  <div className="user">
                      <img src={love} alt={'Can not show image'}/>
                      <h2>Hòa</h2>
                      <p>3 Hours Ago</p>
                  </div>
                  <div className="user">
                      <img src={love} alt={'Can not show image'}/>
                      <h2>Hòa</h2>
                      <p>6 Hours Ago</p>
                  </div>
                  <div className="user">
                      <img src={love} alt={'Can not show image'}/>
                      <h2>Hòa</h2>
                      <p>12 Hours Ago</p>
                  </div>
              </div>
          </div>

          <div className="recent-orders">
              <h2>My Songs</h2>
              <table>
                  <thead>
                  <tr>
                      <th>Name</th>
                      <th>Listens</th>
                      <th>Downloads</th>
                      <th>Status</th>
                      <th></th>
                  </tr>
                  </thead>
                  <tbody>
                  {Orders.map((value, index) => (
                      <tr key={index}>
                          <td>{value.productName}</td>
                          <td>{value.productNumber}</td>
                          <td>{value.paymentStatus}</td>
                          <td className={value.status === 'Declined' ? 'danger' : value.status === 'Pending' ? 'warning' : 'primary'}>{value.status}</td>
                          <td className={'primary'}>Details</td>
                      </tr>
                  ))}
                  </tbody>
              </table>
              <a href="#">Show All</a>
          </div>
      </>
  );
}

export default AnalyticsArtis;
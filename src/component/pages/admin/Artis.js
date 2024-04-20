import React from "react";
import vanh from "../../../asset/vanhdo.PNG";
import thuy from "../../../asset/thuydo.png";
import truc from "../../../asset/trucdo.png";
import thuylinh from "../../../asset/IMG_3565.JPG";
import plus from "../../../asset/plus.png";

const Artis = () => {
    const UserList = [
        {
            avatar: vanh,
            name: 'Vân Anh',
            sex: 'Female',
            birthday: '01/02/2003',
        },
        {
            avatar: thuy,
            name: 'Diệu Thúy',
            sex: 'Female',
            birthday: '08/06/2003',
        },
        {
            avatar: truc,
            name: 'Hồng Trúc',
            sex: 'Female',
            birthday: '26/08/2003',
        },
        {
            avatar: thuylinh,
            name: 'Thùy Linh',
            sex: 'Female',
            birthday: '07/10/2005',
        },
        {
            avatar: truc,
            name: 'Hồng Trúc',
            sex: 'Female',
            birthday: '26/08/2003',
        }
    ]

    return (
        <>
            <div className="new-users">
                <h2 className={'name-user'}>New Artis</h2>
                <div className="user-list">
                    <div className="user">
                        <img src={thuy}/>
                        <h2>Thúy</h2>
                        <p>54 Min Ago</p>
                    </div>
                    <div className="user">
                        <img src={truc}/>
                        <h2>Trúc</h2>
                        <p>3 Hours Ago</p>
                    </div>
                    <div className="user">
                        <img src={vanh}/>
                        <h2>Vân Anh</h2>
                        <p>6 Hours Ago</p>
                    </div>
                    <div className="user">
                        <img src={plus}/>
                        <h2>More</h2>
                        <p>New Artis</p>
                    </div>
                </div>
            </div>

            <div className="recent-orders">
                <h2>Artis List</h2>
                <table>
                    <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Sex</th>
                        <th>Birthday</th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {UserList.map((value, index) => (
                        <tr key={index}>
                            <td><img src={value.avatar} alt=""/></td>
                            <td>{value.name}</td>
                            <td>{value.sex}</td>
                            <td>{value.birthday}</td>
                            <td className={'danger'}>Delete</td>
                            <td className={'warning'}>Update</td>
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

export default Artis;
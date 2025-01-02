import React from "react";
import love from "../../../asset/IMG_0174.PNG";
import cogaim52 from "../../../asset/song1.mp3";
import plus from "../../../asset/plus.png";

const SongArtis = () => {
    const newSong = [
        {
            id: 1,
            avatar: love,
            name: 'Cô gái M52',
            artis: 'HuyR',
            post_time: '17/04/2024',
            duration: 213,
            audio: cogaim52
        },
        {
            id: 2,
            avatar: love,
            name: 'Mây Lang Thang',
            artis: 'Tùng Tea',
            post_time: '17/04/2024',
            duration: 213,
            audio: cogaim52
        },
        {
            id: 3,
            avatar: love,
            name: 'Bèo dạt mây trôi',
            artis: 'Hương Tú',
            post_time: '17/04/2024',
            duration: 213,
            audio: cogaim52
        }
    ]

    return (
        <>
            <div className="new-users">
                <h2 className={'name-user'}>Add Song</h2>
                <div className="user-list">
                    <div className="user">
                        <img src={'https://res.cloudinary.com/hieuhv203/image/upload/v1715704767/assetHtml/jto8qgtu80dbi7ndvg8z.png'} alt={'Can not show image'}/>
                        <h2>More</h2>
                        <p>New Song</p>
                    </div>
                </div>
            </div>
            <div className="recent-orders">
                <h2>Wait For Confirmation</h2>
                <table>
                    <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Duration</th>
                        <th>Post Time</th>
                        <th>Try Listening</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {newSong.map((value, index) => (
                        <tr key={index}>
                            <td><img src={value.avatar} alt={'Can not show image'}/></td>
                            <td>{value.name}</td>
                            <td>{value.duration}</td>
                            <td>{value.post_time}</td>
                            <td className={'success'}>Play</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <a href="#">Show All</a>
            </div>
            <div className="recent-orders">
                <h2>All Songs</h2>
                <table>
                    <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Views</th>
                        <th>Duration</th>
                        <th>Post Time</th>
                        <th>Try Listening</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {newSong.map((value, index) => (
                        <tr key={index}>
                            <td><img src={value.avatar} alt={'Can not show image'}/></td>
                            <td>{value.name}</td>
                            <td>{value.duration}</td>
                            <td>{value.duration}</td>
                            <td>{value.post_time}</td>
                            <td className={'success'}>Play</td>
                            <td className={'danger'}>Delete</td>
                            <td className={'warning'}>Update</td>
                            <td className={'primary'}>Detail</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <a href="#">Show All</a>
            </div>
        </>
    );
}

export default SongArtis;
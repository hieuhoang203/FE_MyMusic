import React, {useEffect} from "react";
import thuy from "../../../asset/thuydo.png";
import cogaim52 from "../../../asset/song1.mp3";
import plus from "../../../asset/plus.png";
import axiosHelper from "../../../api/myApi";

const PodcastAdmin = () => {


    useEffect(() => {
        axiosHelper.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("token")}`;
    }, []);

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

    function playPodCast(audio) {

    }

    return (
        <>
            <div className="new-users">
                <h2 className={'name-user'}>Add Podcast</h2>
                <div className="user-list">
                    <div className="user">
                        <img src={plus} alt={'Can not show image'}/>
                        <h2>More</h2>
                        <p>New Podcast</p>
                    </div>
                </div>
            </div>
            <div className="recent-orders">
                <h2>Confirm</h2>
                <table>
                    <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Artis</th>
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
                            <td>{value.artis}</td>
                            <td>{value.duration}</td>
                            <td>{value.post_time}</td>
                            <td className={'success'} onClick={() => playPodCast(cogaim52)}>Play</td>
                            <td className={'warning'}>Accept</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <a href="#">Show All</a>
            </div>
            <div className="recent-orders">
                <h2>All Podcasts</h2>
                <table>
                    <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Artis</th>
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
                            <td>{value.artis}</td>
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

export default PodcastAdmin;
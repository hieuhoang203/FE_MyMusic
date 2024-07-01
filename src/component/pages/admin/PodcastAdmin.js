import React, {useEffect, useState} from "react";
import axiosHelper from "../../../api/myApi";

const PodcastAdmin = () => {

    // Create podcast variable
    const [podcast, setPodcast] = useState({
        name: "",
        avatar: {},
        sound: {},
        duration: 0,
        album: 0,
        artis: [],
        genres: []
    })

    const [newPodcasts, setNewPodcasts] = useState([{}])

    const [podcastList, setPodcastList] = useState([{}])

    // Create pageable

    const [page, setPage] = useState(0)
    const [pageWait, setPageWait] = useState(0)

    useEffect(() => {
        axiosHelper.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("token")}`;
    }, []);

    useEffect(() => {
        setPodcastList()
    }, [])

    useEffect(() => {
        setNewPodcasts()
    }, [])

    function playPodCast(audio) {

    }

    return (
        <>
            <div className="new-users">
                <h2 className={'name-user'}>Add Podcast</h2>
                <div className="user-list">
                    <div className="user">
                        <img src={'https://res.cloudinary.com/hieuhv203/image/upload/v1715704767/assetHtml/jto8qgtu80dbi7ndvg8z.png'} alt={'Can not show image'}/>
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
                    {newPodcasts.map((value, index) => (
                        <tr key={index}>
                            <td><img src={value.avatar} alt={'Can not show image'}/></td>
                            <td>{value.name}</td>
                            <td>{value.artis}</td>
                            <td>{value.duration}</td>
                            <td>{value.post_time}</td>
                            <td className={'success'} onClick={() => playPodCast()}>Play</td>
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
                    {podcastList.map((value, index) => (
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
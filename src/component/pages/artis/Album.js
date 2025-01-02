import React, {useEffect, useState} from "react";
import love from "../../../asset/IMG_0174.PNG";
import cogaim52 from "../../../asset/song1.mp3";
import {createBrowserHistory as useHistory} from "history";
import axiosHelper from "../../../api/myApi";
import {Modal} from "antd";

const Album = () => {

    const history = useHistory();

    const myAccount = JSON.parse(localStorage.getItem('account'));

    const [artis, setArtis] = useState();

    // My song
    const [myAlbums, setMyAlbums] = useState([])

    // New album
    const [album, setAlbum] = useState({
        id: 0,
        name: '',
        avatar: null,
        artis: myAccount?.id,
        songs: []
    })

    // Modal
    const [modal, setModal] = useState(false)

    useEffect(() => {
        axiosHelper.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("token")}`;
    }, [])

    useEffect(() => {
        if (myAccount?.role !== 'Artis') {
            history.replace("/")
        } else {
            setArtis(myAccount?.id)
        }
    }, []);

    // Pagination
    const [pagination, setPagination] = useState({
        page: 1, limit: 5, totalRows: 1,
    });

    const [page, setPage] = useState(0);

    function handlePageChange(value) {
        setPage(prevState => (value - 1))
    }

    const newSong = [{
        id: 1, avatar: love, name: 'Cô gái M52', artis: 'HuyR', post_time: '17/04/2024', duration: 213, audio: cogaim52
    }, {
        id: 2,
        avatar: love,
        name: 'Mây Lang Thang',
        artis: 'Tùng Tea',
        post_time: '17/04/2024',
        duration: 213,
        audio: cogaim52
    }, {
        id: 3,
        avatar: love,
        name: 'Bèo dạt mây trôi',
        artis: 'Hương Tú',
        post_time: '17/04/2024',
        duration: 213,
        audio: cogaim52
    }, {
        id: 2,
        avatar: love,
        name: 'Mây Lang Thang',
        artis: 'Tùng Tea',
        post_time: '17/04/2024',
        duration: 213,
        audio: cogaim52
    }, {
        id: 3,
        avatar: love,
        name: 'Bèo dạt mây trôi',
        artis: 'Hương Tú',
        post_time: '17/04/2024',
        duration: 213,
        audio: cogaim52
    }]

    function closeModal() {
        setModal(false)
    }

    function openModal() {
        setModal(true)
    }

    return (<>
        <div className="new-users">
            <h2 className={'name-user'}>Add Album</h2>
            <div className="user-list">
                <div className="user" onClick={() => openModal()}>
                    <img
                        src={'https://res.cloudinary.com/hieuhv203/image/upload/v1715704767/assetHtml/jto8qgtu80dbi7ndvg8z.png'}
                        alt={'Can not show image'}/>
                    <h2>More</h2>
                    <p>New Album</p>
                </div>
            </div>
        </div>
        <div className="recent-orders">
            <h2>All Albums</h2>
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
                {newSong.map((value, index) => (<tr key={index}>
                    <td><img src={value.avatar} alt={'Can not show image'}/></td>
                    <td>{value.name}</td>
                    <td>{value.artis}</td>
                    <td>{value.duration}</td>
                    <td>{value.post_time}</td>
                    <td className={'success'}>Play</td>
                    <td className={'danger'}>Delete</td>
                    <td className={'warning'}>Update</td>
                    <td className={'primary'}>Detail</td>
                </tr>))}
                </tbody>
            </table>
            <a href="#">Show All</a>
        </div>
        <Modal
            open={modal}
            onCancel={() => closeModal()}
            width={500}
            footer={null}
            className={'modal'}
        >
            Hello
        </Modal>
    </>);
}

export default Album;
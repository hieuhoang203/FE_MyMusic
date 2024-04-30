import React, {useEffect, useState} from "react";
import vanh from "../../../asset/vanhdo.PNG";
import thuy from "../../../asset/thuydo.png";
import truc from "../../../asset/trucdo.png";
import thuylinh from "../../../asset/IMG_3565.JPG";
import plus from "../../../asset/plus.png";
import {getAllArtis, getNewUserOrArtis} from "../../../service/userService";
import {Pagination} from "antd";

const Artis = () => {

    // Pagination
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 5,
        totalRows: 1,
    });

    const [page, setPage] = useState(0);

    // Reload page
    const [load, setLoad] = useState(true);

    // List artis
    const [newArtis, setNewArtis] = useState([{}]);
    const [allArtis, setAllArtis] = useState([]);

    useEffect(() => {
        getNewUserOrArtis('ARTIS').then((response) => {
            setNewArtis(Object.values(response.data))
        })
    }, []);

    useEffect(() => {
        getAllArtis(page).then((response) => {
            console.log(response.data.content)
            setAllArtis(response.data.content)
            setPagination((prevState) => ({...pagination, totalRows: response.data.totalElements}))
        })
    }, [load, page]);

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

    function handlePageChange(value) {
        setPage(prevState => (value - 1))
    }

    return (
        <>
            <div className="new-users">
                <h2 className={'name-user'}>New Artis</h2>
                <div className="user-list">
                    {
                        newArtis.map((value, index) => (
                            <div className="user" key={value.id}>
                                <img src={value.avatar} alt={'Can not show image'}/>
                                <h2>{value.name}</h2>
                            </div>
                        ))
                    }
                    <div className="user">
                        <img src={plus} alt={'Can not show image'}/>
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
                        <th style={{textAlign: "center"}}>Name</th>
                        <th style={{textAlign: "center"}}>Gender</th>
                        <th style={{textAlign: "center"}}>Songs</th>
                        <th style={{textAlign: "center"}}>Followers</th>
                        <th style={{textAlign: "center"}}>Status</th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {allArtis.map((value, index) => (
                        <tr key={index}>
                            <td><img src={value.avatar} alt={'Image Error'}/></td>
                            <td>{value.name}</td>
                            <td className={value.gender ? 'primary' : 'warning'}>{value.gender ? 'Male' : 'Female'}</td>
                            <td>{value.songs}</td>
                            <td>{value.follows}</td>
                            <td className={value.status === 'Activate' ? 'success' : 'danger'}>{value.status}</td>
                            <td className={'button danger'}>Delete</td>
                            <td className={'button warning'}>Update</td>
                            <td className={'button primary'}>Details</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <Pagination
                pageSize={5}
                total={pagination.totalRows}
                onChange={(value) => handlePageChange(value)}
            />
        </>
    );
}

export default Artis;
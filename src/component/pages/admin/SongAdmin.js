import React, {useEffect, useState} from "react";
import {getGenresSelect} from "../../../service/genresService";
import {getAlbumSelect} from "../../../service/albumService";
import {getArtisSelect} from "../../../service/userService";
import {
    getAllSong,
    getSongByStatus,
    saveSong,
    searchSong,
    updateSong,
    updateStatusSong
} from "../../../service/songService";
import {
    Button, Checkbox,
    ConfigProvider,
    Form,
    Input,
    InputNumber,
    message,
    Modal,
    notification,
    Pagination,
    Select,
    Upload
} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import {TinyColor} from "@ctrl/tinycolor";
import axiosHelper from "../../../api/myApi";

const SongAdmin = () => {

    useEffect(() => {
        axiosHelper.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("token")}`;
    }, []);

    // Form custom
    const colors3 = ['#40e495', '#30dd8a', '#2bb673'];
    const colors2 = ['#dd528d', '#ff8c79', '#fbae52'];

    const getHoverColors = (colors) =>
        colors.map((color) => new TinyColor(color).lighten(5).toString());
    const getActiveColors = (colors) =>
        colors.map((color) => new TinyColor(color).darken(5).toString());

    const [formCustom, setFormCustom] = useState(true)

    const [id, setId] = useState()

    const [form] = Form.useForm();

    // Date select custom
    const [genresSelect, setGenresSelect] = useState([]);
    const [albumSelect, setAlbumSelect] = useState([]);
    const [artisSelect, setArtisSelect] = useState([]);

    const [song, setSong] = useState({
        name: "",
        avatar: {},
        sound: {},
        duration: 0,
        album: 0,
        artis: [],
        genres: []
    })

    function setDateSelect() {
        getGenresSelect().then((response) => {
            setGenresSelect(response.data.data)
        })
        getAlbumSelect().then((response) => {
            setAlbumSelect(response.data.data)
        })
        getArtisSelect().then((response) => {
            setArtisSelect(response.data.data)
        })
    }

    useEffect(() => {
        setDateSelect()
    }, []);

    const [load, setLoad] = useState(true)

    // Songs
    const [songWaitList, setSongWaitList] = useState([])

    const [songList, setSongList] = useState([])


    // Pagination
    const [paginationWait, setPaginationWait] = useState({
        page: 1,
        limit: 5,
        totalRows: 1,
    });

    const [pagination, setPagination] = useState({
        page: 1,
        limit: 5,
        totalRows: 1,
    });

    const [page, setPage] = useState(0)

    const [pageWait, setPageWait] = useState(0)

    // Hàm lấy thời gian từ file âm thanh
  const getAudioDuration = (file) => {
    const audio = new Audio();
    audio.src = URL.createObjectURL(file);

    audio.onloadedmetadata = () => {
      const durationInSeconds = Math.floor(audio.duration); // Làm tròn thành số nguyên
      setSong((prev) => ({ ...prev, duration: durationInSeconds }));
      form.setFieldsValue({ duration: durationInSeconds }); // Cập nhật giá trị số vào form
      URL.revokeObjectURL(audio.src); // Giải phóng URL
    };
  };

    useEffect(() => {
        getSongByStatus(pageWait, 'Wait').then((response) => {
            if (response.data.result.responseCode === '200') {
                if (response.data.data.content !== null) {
                    setSongWaitList(response.data.data.content)
                    setPaginationWait((prevState) => ({...paginationWait, totalRows: response.data.data.totalElements}))
                } else {
                    setSongWaitList([])
                    setPaginationWait((prevState) => ({...paginationWait, totalRows: 0}))
                }
            } else {
                if (response.data.result.responseCode !== '401') {
                    message.open({
                        type: "error",
                        content: response.data.result.responseMessage,
                        style: {
                            animation: "fadeInOut 2s ease-in-out forwards",
                        },
                    })
                }
            }
        }).catch((error) => {
            if (error.response.status !== '401') {
                message.open({
                    type: "error",
                    content: "Cannot get song wait list!",
                    style: {
                        animation: "fadeInOut 2s ease-in-out forwards",
                    },
                })
            }
        })
    }, [pageWait]);

    useEffect(() => {
        getAllSong(page).then((response) => {
            if (response.data.result.responseCode === '200') {
                if (response.data.data.content !== null) {
                    setSongList(response.data.data.content)
                    setPagination((prevState) => ({...pagination, totalRows: response.data.data.totalElements}))
                } else {
                    setSongList([])
                    setPagination((prevState) => ({...pagination, totalRows: 0}))
                }
            } else {
                if (response.data.result.responseCode !== '401') {
                    message.open({
                        type: "error",
                        content: response.data.result.responseMessage,
                        style: {
                            animation: "fadeInOut 2s ease-in-out forwards",
                        },
                    })
                }
            }
        }).catch((error) => {
            if (error.response.status !== 401) {
                message.open({
                    type: "error",
                    content: "Cannot get song list!",
                    style: {
                        animation: "fadeInOut 2s ease-in-out forwards",
                    },
                })
            }
        })

    }, [load, page, songWaitList]);

    // Modal
    const [modal, setModal] = useState(false)

    function handlePageChange(value, index) {
        index === 1 ? setPageWait(prevState => value - 1) : setPage(prevState => value - 1)
    }

    function closeModal() {
        clearForm()
        return setModal(false);
    }

    function clearForm() {
        form.setFieldValue('name', "");
        form.setFieldValue('avatar', null);
        form.setFieldValue('sound', null);
        form.setFieldValue('duration', 0);
        form.setFieldValue('album', []);
        form.setFieldValue('artis', []);
        form.setFieldValue('genres', []);
    }

    async function createSong() {
        try {
            const response = await saveSong(song, 1)
            closeModal()
            setSong({
                name: "",
                avatar: null,
                sound: null,
                duration: 0,
                album: 0,
                artis: [],
                genres: []
            })
            clearForm()
            setLoad(!load)
            notification.success({
                message: "New song",
                description: "Create song successfully!",
            })
        } catch (error) {
            notification.error({
                message: "New song",
                description: "Check the information again!",
            })
        }
    }

     function updateNewSong() {
         console.log(song)
         updateSong(id, song).then((response) => {
            closeModal()
            setSong({
                name: "",
                avatar: null,
                sound: null,
                duration: 0,
                album: 0,
                artis: [],
                genres: []
            })
            clearForm()
            setLoad(!load)
            setId(undefined)
            notification.success({
                message: "Update song",
                description: "Update song successfully!",
            })
        }).catch((error) => {
            console.log(error)
            notification.error({
                message: "Update song",
                description: "Check the information again!",
            })
        })
    }

    function openModal() {
        setModal(true)
        setFormCustom((prevState) => true)
    }

    const handleChangeGenres = (value) => {
        setSong({...song, genres: value})
    }

    const handleChangeAlbum = (value) => {
        setSong({...song, album: value})
    }

    const handleChangeArtis = (value) => {
        setSong({...song, artis: value})
    }

    function playMusic(id) {

    }

    function fillDataToForm(id) {
        setId(id)
        setModal(true)
        setFormCustom(false)
        searchSong(id).then(response => {
            const data = {...response.data}
            setSong({...data, artis: data.artis.map(item => item.id), genres: data.genres.map(item => item.id)})
            form.setFieldValue('name', data.name);
            form.setFieldValue('duration', data.duration);
            form.setFieldValue('album', data.album !== null ? data.album.id : null);
            form.setFieldValue('artis', data.artis.map(item => item.id));
            form.setFieldValue('genres', data.genres.map(item => item.id));
        }).catch(error => {
            console.log(error)
        })
    }

    function changeStatusSong(id, status) {
        updateStatusSong(id, status).then((response) => {
            console.log(response)
            message.open({
                type: "success",
                content: "Song status changed successfully!",
                style: {
                    animation: "fadeInOut 2s ease-in-out forwards",
                },
            })
            setLoad(!load)
        }).catch((error) => {
            console.log(error)
            message.open({
                type: "error",
                content: "Song status changed failed!",
                style: {
                    animation: "fadeInOut 2s ease-in-out forwards",
                },
            })
        })
    }

    return (
        <>
            <div className="new-users">
                <h2 className={'name-user'}>Add Song</h2>
                <div className="user-list">
                    <div className="user" onClick={() => openModal()}>
                        <img
                            src={'https://res.cloudinary.com/hieuhv203/image/upload/v1715704767/assetHtml/jto8qgtu80dbi7ndvg8z.png'}
                            alt={'Can not show image'}/>
                        <h2>More</h2>
                        <p>New Song</p>
                    </div>
                </div>
            </div>
            <div className="recent-orders">
                <h2>Confirm</h2>
                <table>
                    <thead>
                    <tr>
                        <th>
                            <Checkbox></Checkbox>
                        </th>
                        <th>Name</th>
                        <th>Artis</th>
                        <th>Duration</th>
                        <th>Try Listening</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {songWaitList != null ? songWaitList.map((value, index) => (
                        <tr key={index}>
                            <td><img src={value.avatar} alt={'Can not show image'}/></td>
                            <td>{value.name}</td>
                            <td>{value.artists[0].name}</td>
                            <td>{value.duration}</td>
                            <td className={'button success'} onClick={() => playMusic(value.id)}>Play</td>
                            <td className={'button warning'}
                                onClick={() => changeStatusSong(value.id, 'Activate')}>Accept
                            </td>
                        </tr>
                    )) : <tr><td colSpan={5} style={{textAlign: 'center'}}>No data</td></tr>}
                    </tbody>
                </table>
            </div>
            <Pagination
                pageSize={3}
                total={paginationWait.totalRows}
                onChange={(value) => handlePageChange(value, 1)}
            />
            <div className="recent-orders">
                <h2>All Songs</h2>
                <table>
                    <thead>
                    <tr>
                        <th></th>
                        <th style={{textAlign: "center"}}>Name</th>
                        <th style={{textAlign: "center"}}>Artis</th>
                        <th style={{textAlign: "center"}}>Duration</th>
                        <th style={{textAlign: "center"}}>Status</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {songList != null ? songList.map((value, index) => (
                        <tr key={value.id}>
                            <td><img src={value.avatar} alt={'Can not show image'}/></td>
                            <td>{value.name}</td>
                            <td>{value.artists[value.artists.length - 1].name}</td>
                            <td>{value.duration}</td>
                            <td className={value.status === 'Activate' ? 'success' : 'danger'}>{value.status}</td>
                            <td className={value.status === 'Activate' ? 'danger button' : 'success button'}
                                onClick={() => value.status === 'Activate' ? changeStatusSong(value.id, 'ShutDown') : changeStatusSong(value.id, 'Activate')}>{value.status === 'Activate' ? 'Delete' : 'Return'}</td>
                            <td className={'button warning'} onClick={() => fillDataToForm(value.id)}>Update</td>
                            <td className={'button primary'}>Detail</td>
                        </tr>
                    )) : <tr><td colSpan={5} style={{textAlign: 'center'}}>No data</td></tr>}
                    </tbody>
                </table>
            </div>
            <Pagination
                pageSize={3}
                total={pagination.totalRows}
                onChange={(value) => handlePageChange(value, 2)}
            />
            <Modal
                open={modal}
                onCancel={() => closeModal()}
                width={500}
                footer={null}
                className={'modal'}
            >
                <Form
                    name="wrap"
                    labelCol={{flex: '100px'}}
                    labelAlign="left"
                    labelWrap
                    form={form}
                    wrapperCol={{flex: 1}}
                    colon={false}
                    style={{maxWidth: 600, marginTop: '60px'}}
                    initialValues={
                        {
                            remember: true,
                            duration: 0,
                        }
                    }
                    encType="multipart/form-data"
                >
                    <h2>{formCustom ? "Create User" : "Update User"}</h2>
                    <Form.Item
                        label={'Avatar'}
                        name={'avatar'}
                        valuePropName={'fileList'}
                        rules={[
                            formCustom ? {required: true, message: 'Avatar cannot be left blank!'} : null,
                            {
                                validator(_, fileList) {
                                    return new Promise((resolve, reject) => {
                                        if (fileList && fileList[0].size > 1000000) {
                                            reject('File size exceeded')
                                        } else {
                                            resolve()
                                        }
                                    })
                                }
                            }
                        ]}
                        getValueFromEvent={(event) => {
                            return event?.fileList
                        }}
                    >
                        <Upload
                            maxCount={1}
                            beforeUpload={(file) => {
                                return new Promise((resolve, reject) => {
                                    if (file.size > 1000000) {
                                        reject('File size exceeded!')
                                    } else {
                                        resolve('Success!')
                                    }
                                })
                            }}
                            multiple={false}
                            onChange={(info) => {
                                setSong({...song, avatar: info.file})
                            }}
                            customRequest={(info) => setSong({...song, avatar: info.file})}
                            accept={'image/*'}
                        >
                            <Button icon={<UploadOutlined/>}>Click to upload</Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item label={'Name'} name={'name'}
                               rules={[
                                   {required: true, message: 'Name can not be left blank!'}
                               ]}
                    >
                        <Input placeholder={'Enter your name'} name={'name'}
                               onChange={(events) => setSong({...song, name: events.target.value})}></Input>
                    </Form.Item>
                    <Form.Item label={'Duration'} name={'duration'}
                                rules={[
                                { required: true, message: 'Duration can not be left blank!' },
                                { type: 'number', message: 'Duration must be a number!' },
                                ]}
                    >
                        <InputNumber
                        placeholder={'Duration will be auto-filled'}
                        min={0}
                        style={{ width: '145px' , backgroundColor: 'white', color: 'black'}}
                        disabled
                        />
                    </Form.Item>

                    {/* Trường Sound */}
                    <Form.Item
                        label={'Sound'}
                        name={'sound'}
                        valuePropName={'fileList'}
                        rules={[
                        formCustom ? { required: true, message: 'Sound cannot be left blank!' } : null,
                        {
                            validator(_, fileList) {
                            return new Promise((resolve, reject) => {
                                if (fileList && fileList[0].size > 19000000) {
                                    reject('File size exceeded');
                                } else {
                                    resolve();
                                }
                            });
                            },
                        },
                        ]}
                        getValueFromEvent={(event) => event?.fileList}
                    >
                        <Upload
                        maxCount={1}
                        beforeUpload={(file) => {
                            return new Promise((resolve, reject) => {
                            if (file.size > 19000000) {
                                reject('File sound size exceeded!');
                            } else {
                                resolve('Success!');
                            }
                            });
                        }}
                        multiple={false}
                        onChange={(info) => {
                            const file = info.file.originFileObj;
                            setSong({ ...song, sound: file });
                            if (file.status === 'removed') {
                                form.setFieldsValue({ duration: null });
                                setSong({ ...song, duration: 0 });
                            } else {
                                getAudioDuration(file);
                            }
                        }}
                        customRequest={(info) => {
                            setSong({ ...song, sound: info.file });
                            getAudioDuration(info.file);
                        }}
                        accept={'audio/*'}
                        >
                        <Button icon={<UploadOutlined />}>Click to upload</Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item
                        label={'Album'}
                        name={'album'}
                    >
                        <Select
                            style={{
                                width: '100%',
                            }}
                            placeholder="Choose the album for the song"
                            onChange={handleChangeAlbum}
                            options={albumSelect}
                        />
                    </Form.Item>
                    <Form.Item
                        label={'Genres'}
                        name={'genres'}
                        rules={[
                            {required: true, message: 'Genres cannot be left blank!'}
                        ]}
                    >
                        <Select
                            mode="multiple"
                            allowClear
                            style={{
                                width: '100%',
                            }}
                            placeholder="Choose the genres for the song"
                            onChange={handleChangeGenres}
                            options={genresSelect}
                        />
                    </Form.Item>
                    <Form.Item
                        label={'Artis'}
                        name={'artis'}
                        rules={[
                            {required: true, message: 'Artis cannot be left blank!'}
                        ]}
                    >
                        <Select
                            mode="multiple"
                            style={{
                                width: '100%',
                            }}
                            placeholder="Choose the artis for the song"
                            onChange={handleChangeArtis}
                            options={artisSelect}
                        />
                    </Form.Item>
                    <Form.Item className={'button-submit'}>
                        <ConfigProvider
                            theme={formCustom ? {
                                components: {
                                    Button: {
                                        colorPrimary: `linear-gradient(116deg,  ${colors3.join(', ')})`,
                                        colorPrimaryHover: `linear-gradient(116deg, ${getHoverColors(colors3).join(', ')})`,
                                        colorPrimaryActive: `linear-gradient(116deg, ${getActiveColors(colors3).join(', ')})`,
                                        lineWidth: 0,
                                    }
                                }
                            } : {
                                components: {
                                    Button: {
                                        colorPrimary: `linear-gradient(116deg,  ${colors2.join(', ')})`,
                                        colorPrimaryHover: `linear-gradient(116deg, ${getHoverColors(colors2).join(', ')})`,
                                        colorPrimaryActive: `linear-gradient(116deg, ${getActiveColors(colors2).join(', ')})`,
                                        lineWidth: 0,
                                    }
                                }
                            }}
                        >
                            <Button htmlType={"button"} type="primary" size="large"
                                    onClick={() => formCustom ? createSong() : updateNewSong()}
                            >
                                {formCustom ? "Create" : "Update"}
                            </Button>
                        </ConfigProvider>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}

export default SongAdmin;
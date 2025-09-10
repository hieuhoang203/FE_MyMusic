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
    Upload,
    Card,
    Typography
} from "antd";
import {UploadOutlined, MusicOutlined, UserOutlined, TagOutlined} from "@ant-design/icons";
import {Spin} from "antd";
import {TinyColor} from "@ctrl/tinycolor";
import axiosHelper from "../../../api/myApi";
import "../../../css/admin-forms.css";

const { Title } = Typography;

const SongAdmin = () => {

    useEffect(() => {
        axiosHelper.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("token")}`;
    }, []);

    // Form custom
    const colors3 = ['#40e495', '#30dd8a', '#2bb673'];
    const colors2 = ['#dd528d', '#ff8c79', '#fbae52'];

    const [isLoading, setIsLoading] = useState(false);

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
            if (response.data.result.responseCode === '200') {
                setGenresSelect(response.data.data)
            } else {
                if (response.data.result.responseCode !== '401') {
                    message.open({
                        type: "error",
                        content: response.data.result.responseMessage,
                    })
                }
            }
        })
        getAlbumSelect().then((response) => {
            if (response.data.result.responseCode === '200') {
                setAlbumSelect(response.data.data)
            } else {    
                if (response.data.result.responseCode !== '401') {
                    message.open({
                        type: "error",
                        content: response.data.result.responseMessage,
                    })
                }
            }
        })
        getArtisSelect().then((response) => {
            if (response.data.result.responseCode === '200') {
                setArtisSelect(response.data.data)
            } else {
                if (response.data.result.responseCode !== '401') {
                    message.open({
                        type: "error",
                        content: response.data.result.responseMessage,
                    })
                }
            }
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
        setIsLoading(true)
        getSongByStatus(pageWait, 'Wait').then((response) => {
            setIsLoading(false)
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
            setIsLoading(false)
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
        setIsLoading(true)
        getAllSong(page).then((response) => {
            setIsLoading(false)
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
            setIsLoading(false)
            if (error.response.status !== '401') {
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
        setIsLoading(true)
        await saveSong(song, 1).then((response) => {
            setIsLoading(false)
            if (response.data.result.responseCode === '200') {
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
                message.open({
                    type: "success",
                    content: "New song created successfully!",
                })
            } else {
                message.open({
                    type: "error",
                    content: response.data.result.responseMessage,
                })
            }
        }).catch((error) => {
            setIsLoading(false)
            notification.error({
                message: "New song",
                description: "Check the information again!",
            })
        })
    }

     function updateNewSong() {
         console.log(song)
         setIsLoading(true)
         updateSong(id, song, 2).then((response) => {
            setIsLoading(false)
            if (response.data.result.responseCode === '200') {
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
                message.open({
                    type: "success",
                    content: "Update song successfully!",
                })
            } else {
                message.open({
                    type: "error",
                    content: response.data.result.responseMessage,
                })
            }
        }).catch((error) => {
            setIsLoading(false)
            message.open({
                type: "error",
                content: "Check the information again!",
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

    const urlToFile = async (url, fileName, mimeType) => {
        const response = await fetch(url);
        const blob = await response.blob();
        return new File([blob], fileName, { type: mimeType });
    };

    async function fillDataToForm(id) {  // ✅ Đánh dấu hàm là async
        setId(id);
        setModal(true);
        setFormCustom(false);
    
        try {
            const response = await searchSong(id);
            console.log(response.data.data);
            const data = { ...response.data.data };
    
            // Chờ convertSongData trả về file
            const fileHandle = await convertSongData(data);
    
            console.log(fileHandle.avatar); // ✅ Bây giờ avatar sẽ có giá trị
    
            setSong({
                name: data.name,
                album: data.album,
                duration: data.duration,
                avatar: fileHandle.avatar,
                sound: fileHandle.sound,
                artis: data.artists.map(item => item.id),
                genres: data.genres.map(item => item.id)
            });
    
            form.setFieldValue('name', data.name);
            form.setFieldValue('duration', data.duration);
            form.setFieldValue('album', data.album !== null ? data.album.id : null);
            form.setFieldValue('artis', data.artists.map(item => item.id));
            form.setFieldValue('genres', data.genres.map(item => item.id));
            form.setFieldValue('avatar', [fileHandle.avatar]);
            form.setFieldValue('sound', [fileHandle.sound]);
        } catch (error) {
            console.log(error);
        }
    }
    

    const convertSongData = async (songData) => {
        const avatarFile = await urlToFile(songData.avatar, "avatar.jpg", "image/jpeg");
        const soundFile = await urlToFile(songData.url, "sound.mp3", "audio/mpeg");
    
        return {
            avatar: avatarFile,
            sound: soundFile
        }
    };

    function changeStatusSong(id, status) {
        setIsLoading(true)
        updateStatusSong(id, status).then((response) => {
            setIsLoading(false)
            if (response.data.result.responseCode === '200') {
                message.open({
                    type: "success",
                    content: status === 'ShutDown' ? "Delete song successfully!" : "Return song successfully!"
                })
                setLoad(!load)
            } else {
                message.open({
                    type: "error",
                    content: response.data.result.responseMessage,
                    style: {
                        animation: "fadeInOut 2s ease-in-out forwards",
                    },
                })
            }
            setLoad(!load)
        }).catch((error) => {
            setIsLoading(false)
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
            <Spin size='large' tip='Loading...' spinning={!modal ? isLoading : null}>
                <Card className="modern-admin-card" style={{ marginBottom: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div>
                            <Title level={3} style={{ margin: 0, color: '#374151' }}>Song Management</Title>
                            <p style={{ margin: '8px 0 0 0', color: '#6b7280' }}>Manage and organize your music library</p>
                        </div>
                        <Button 
                            type="primary" 
                            size="large"
                            icon={<MusicOutlined />}
                            onClick={() => openModal()}
                            className="modern-form-button"
                        >
                            Add New Song
                        </Button>
                    </div>
                </Card>
                <Card className="modern-admin-card" style={{ marginBottom: '24px' }}>
                    <Title level={4} style={{ margin: '0 0 20px 0', color: '#374151' }}>Pending Approval</Title>
                    <div className="modern-admin-table">
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                            <tr>
                                <th style={{ textAlign: 'left' }}>Song</th>
                                <th style={{ textAlign: 'left' }}>Artist</th>
                                <th style={{ textAlign: 'center' }}>Duration</th>
                                <th style={{ textAlign: 'center' }}>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {songWaitList != null ? songWaitList.map((value, index) => (
                                <tr key={index}>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <img 
                                                src={value.avatar} 
                                                alt={value.name}
                                                style={{ 
                                                    width: '48px', 
                                                    height: '48px', 
                                                    borderRadius: '8px',
                                                    objectFit: 'cover'
                                                }}
                                            />
                                            <div>
                                                <div style={{ fontWeight: '600', color: '#374151' }}>{value.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <UserOutlined style={{ color: '#9ca3af' }} />
                                            {value.artists[0].name}
                                        </div>
                                    </td>
                                    <td style={{ textAlign: 'center', color: '#6b7280' }}>
                                        {Math.floor(value.duration / 60)}:{(value.duration % 60).toString().padStart(2, '0')}
                                    </td>
                                    <td style={{ textAlign: 'center' }}>
                                        <Button 
                                            className="modern-action-btn success"
                                            onClick={() => playMusic(value.id)}
                                            size="small"
                                        >
                                            Play
                                        </Button>
                                        <Button 
                                            className="modern-action-btn warning"
                                            onClick={() => changeStatusSong(value.id, 'Activate')}
                                            size="small"
                                        >
                                            Approve
                                        </Button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={4} style={{ textAlign: 'center', padding: '40px', color: '#9ca3af' }}>
                                        No pending songs
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                    <div className="modern-pagination">
                        <Pagination
                            pageSize={5}
                            total={paginationWait.totalRows}
                            onChange={(value) => handlePageChange(value, 1)}
                            showSizeChanger={false}
                        />
                    </div>
                </Card>

                <Card className="modern-admin-card">
                    <Title level={4} style={{ margin: '0 0 20px 0', color: '#374151' }}>All Songs</Title>
                    <div className="modern-admin-table">
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                            <tr>
                                <th style={{ textAlign: 'left' }}>Song</th>
                                <th style={{ textAlign: 'left' }}>Artist</th>
                                <th style={{ textAlign: 'center' }}>Duration</th>
                                <th style={{ textAlign: 'center' }}>Status</th>
                                <th style={{ textAlign: 'center' }}>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {songList != null ? songList.map((value, index) => (
                                <tr key={value.id}>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <img 
                                                src={value.avatar} 
                                                alt={value.name}
                                                style={{ 
                                                    width: '48px', 
                                                    height: '48px', 
                                                    borderRadius: '8px',
                                                    objectFit: 'cover'
                                                }}
                                            />
                                            <div>
                                                <div style={{ fontWeight: '600', color: '#374151' }}>{value.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <UserOutlined style={{ color: '#9ca3af' }} />
                                            {value.artists[value.artists.length - 1].name}
                                        </div>
                                    </td>
                                    <td style={{ textAlign: 'center', color: '#6b7280' }}>
                                        {Math.floor(value.duration / 60)}:{(value.duration % 60).toString().padStart(2, '0')}
                                    </td>
                                    <td style={{ textAlign: 'center' }}>
                                        <span 
                                            style={{
                                                padding: '4px 12px',
                                                borderRadius: '20px',
                                                fontSize: '12px',
                                                fontWeight: '600',
                                                backgroundColor: value.status === 'Activate' ? '#d1fae5' : '#fee2e2',
                                                color: value.status === 'Activate' ? '#065f46' : '#991b1b'
                                            }}
                                        >
                                            {value.status}
                                        </span>
                                    </td>
                                    <td style={{ textAlign: 'center' }}>
                                        <Button 
                                            className={`modern-action-btn ${value.status === 'Activate' ? 'danger' : 'success'}`}
                                            onClick={() => value.status === 'Activate' ? changeStatusSong(value.id, 'ShutDown') : changeStatusSong(value.id, 'Activate')}
                                            size="small"
                                        >
                                            {value.status === 'Activate' ? 'Deactivate' : 'Activate'}
                                        </Button>
                                        <Button 
                                            className="modern-action-btn warning"
                                            onClick={() => fillDataToForm(value.id)}
                                            size="small"
                                        >
                                            Edit
                                        </Button>
                                        <Button 
                                            className="modern-action-btn primary"
                                            size="small"
                                        >
                                            View
                                        </Button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={5} style={{ textAlign: 'center', padding: '40px', color: '#9ca3af' }}>
                                        No songs found
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                    <div className="modern-pagination">
                        <Pagination
                            pageSize={5}
                            total={pagination.totalRows}
                            onChange={(value) => handlePageChange(value, 2)}
                            showSizeChanger={false}
                        />
                    </div>
                </Card>
            </Spin>
            <Modal
                open={modal}
                onCancel={() => closeModal()}
                width={600}
                footer={null}
                className="modern-admin-form"
                title={formCustom ? "Add New Song" : "Edit Song"}
            >
                <Spin size='large' tip='Loading...' spinning={modal ? isLoading : null}>
                    <Form
                        name="song-form"
                        form={form}
                        layout="vertical"
                        className="modern-form"
                        initialValues={{
                            remember: true,
                            duration: 0,
                        }}
                        encType="multipart/form-data"
                        disabled={isLoading}
                        onFinish={formCustom ? createSong : updateNewSong}
                    >
                        <Form.Item
                            label="Song Cover"
                            name="avatar"
                            valuePropName="fileList"
                            className="modern-form-item"
                            rules={[
                                formCustom ? { required: true, message: 'Please upload a song cover!' } : null,
                                {
                                    validator(_, fileList) {
                                        return new Promise((resolve, reject) => {
                                            if (fileList && fileList.length && fileList[0].size > 1000000) {
                                                reject('File size must be less than 1MB');
                                            } else {
                                                resolve();
                                            }
                                        });
                                    },
                                },
                            ]}
                            getValueFromEvent={(event) => event?.fileList}
                        >
                            <Upload.Dragger
                                maxCount={1}
                                beforeUpload={(file) => {
                                    return new Promise((resolve, reject) => {
                                        if (file.size > 1000000) {
                                            reject('File size exceeded!');
                                        } else {
                                            resolve('Success!');
                                        }
                                    });
                                }}
                                multiple={false}
                                onChange={(info) => {
                                    const file = info.fileList.length ? info.file : null;
                                    setSong({ ...song, avatar: file.originFileObj });
                                }}
                                customRequest={(info) => {
                                    setSong({ ...song, avatar: info.file.originFileObj })
                                    info.onSuccess('done')
                                }}
                                accept="image/*"
                                showUploadList={false}
                            >
                                <p className="ant-upload-drag-icon">
                                    <UploadOutlined style={{ fontSize: '48px', color: '#667eea' }} />
                                </p>
                                <p className="ant-upload-text">Click or drag file to upload</p>
                                <p className="ant-upload-hint">Support for single file upload. Max size: 1MB</p>
                            </Upload.Dragger>
                        </Form.Item>
                        <Form.Item 
                            label="Song Name" 
                            name="name"
                            className="modern-form-item"
                            rules={[
                                { required: true, message: 'Please enter song name!' }
                            ]}
                        >
                            <Input 
                                placeholder="Enter song name" 
                                className="modern-form-input"
                                prefix={<MusicOutlined />}
                                onChange={(e) => setSong({...song, name: e.target.value})}
                            />
                        </Form.Item>
                        
                        <Form.Item 
                            label="Duration (seconds)" 
                            name="duration"
                            className="modern-form-item"
                            rules={[
                                { required: true, message: 'Duration is required!' },
                                { type: 'number', message: 'Duration must be a number!' },
                            ]}
                        >
                            <InputNumber
                                placeholder="Duration will be auto-filled"
                                min={0}
                                className="modern-form-input"
                                style={{ width: '100%' }}
                                disabled
                            />
                        </Form.Item>

                        <Form.Item
                            label="Audio File"
                            name="sound"
                            valuePropName="fileList"
                            className="modern-form-item"
                            rules={[
                                formCustom ? { required: true, message: 'Please upload an audio file!' } : null,
                                {
                                    validator(_, fileList) {
                                        return new Promise((resolve, reject) => {
                                            if (fileList && fileList.length && fileList[0].size > 19000000) {
                                                reject('File size must be less than 19MB');
                                            } else {
                                                resolve();
                                            }
                                        });
                                    },
                                },
                            ]}
                            getValueFromEvent={(event) => event?.fileList}
                        >
                            <Upload.Dragger
                                maxCount={1}
                                beforeUpload={(file) => {
                                    return new Promise((resolve, reject) => {
                                        if (file.size > 19000000) {
                                            reject('File size exceeded!');
                                        } else {
                                            resolve('Success!');
                                        }
                                    });
                                }}
                                multiple={false}
                                onChange={(info) => {
                                    const file = info.fileList.length ? info.file : null;
                                    setSong({ ...song, sound: file.originFileObj });
                                    if (info.file.status === 'removed') {
                                        form.setFieldsValue({ duration: null });
                                        setSong({ ...song, duration: 0 });
                                    } else if (info.file.originFileObj) {
                                        getAudioDuration(info.file.originFileObj);
                                    }
                                }}
                                customRequest={(info) => {
                                    setSong({ ...song, sound: info.file.originFileObj });
                                    getAudioDuration(info.file);
                                    info.onSuccess('done')
                                }}
                                accept="audio/*"
                                showUploadList={false}
                            >
                                <p className="ant-upload-drag-icon">
                                    <MusicOutlined style={{ fontSize: '48px', color: '#667eea' }} />
                                </p>
                                <p className="ant-upload-text">Click or drag audio file to upload</p>
                                <p className="ant-upload-hint">Support for MP3, WAV, OGG files. Max size: 19MB</p>
                            </Upload.Dragger>
                        </Form.Item>
                        <Form.Item
                            label="Album"
                            name="album"
                            className="modern-form-item"
                        >
                            <Select
                                className="modern-form-input"
                                placeholder="Select an album (optional)"
                                onChange={handleChangeAlbum}
                                options={albumSelect}
                                suffixIcon={<MusicOutlined />}
                            />
                        </Form.Item>
                        
                        <Form.Item
                            label="Genres"
                            name="genres"
                            className="modern-form-item"
                            rules={[
                                { required: true, message: 'Please select at least one genre!' }
                            ]}
                        >
                            <Select
                                mode="multiple"
                                allowClear
                                className="modern-form-input"
                                placeholder="Select genres for the song"
                                onChange={handleChangeGenres}
                                options={genresSelect}
                                suffixIcon={<TagOutlined />}
                            />
                        </Form.Item>
                        
                        <Form.Item
                            label="Artists"
                            name="artis"
                            className="modern-form-item"
                            rules={[
                                { required: true, message: 'Please select at least one artist!' }
                            ]}
                        >
                            <Select
                                mode="multiple"
                                className="modern-form-input"
                                placeholder="Select artists for the song"
                                onChange={handleChangeArtis}
                                options={artisSelect}
                                suffixIcon={<UserOutlined />}
                            />
                        </Form.Item>
                        <Form.Item className="modern-form-item" style={{ marginBottom: 0 }}>
                            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                                <Button 
                                    onClick={() => closeModal()}
                                    size="large"
                                    style={{ minWidth: '100px' }}
                                >
                                    Cancel
                                </Button>
                                <Button 
                                    type="primary" 
                                    size="large"
                                    htmlType="submit"
                                    loading={isLoading}
                                    className="modern-form-button"
                                    style={{ minWidth: '120px' }}
                                >
                                    {formCustom ? "Create Song" : "Update Song"}
                                </Button>
                            </div>
                        </Form.Item>
                    </Form>
                </Spin>
            </Modal>
        </>
    );
}

export default SongAdmin;
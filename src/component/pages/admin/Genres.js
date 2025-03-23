import React, {useEffect, useState} from "react";
import {Button, ConfigProvider, Form, Input, message, Modal, Pagination} from "antd";
import {TinyColor} from "@ctrl/tinycolor";
import {createBrowserHistory as useHistory} from "history";

import {
    deleteGenres,
    getAllGenres,
    saveGenres,
    searchGenres,
    updateGenres
} from "../../../service/genresService";
import axiosHelper from "../../../api/myApi";

const Genres = () => {

    const history = useHistory();

    const myAccount = JSON.parse(localStorage.getItem("account"))

    // Pagination
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 5,
        totalRows: 1,
    });

    const [page, setPage] = useState(0);

    function handlePageChange(value) {
        setPage(prevState => (value - 1))
    }

    // Variable reloads the page
    const [load, setLoad] = useState(true);
    const [form] = Form.useForm();

    // List genres
    const [listGenres, setListGenres] = useState([])

    // Modal's display change variable
    const [modal, setModal] = useState(false);

    // Form custom variable
    const [formCustom, setFormCustom] = useState(true)

    // Custom color button
    const colors3 = ['#40e495', '#30dd8a', '#2bb673'];
    const colors2 = ['#dd528d', '#ff8c79', '#fbae52'];

    const getHoverColors = (colors) =>
        colors.map((color) => new TinyColor(color).lighten(5).toString());
    const getActiveColors = (colors) =>
        colors.map((color) => new TinyColor(color).darken(5).toString());

    // Mapping object to BE
    const [genres, setGenres] = useState({
        code: "",
        name: ""
    })

    const [id, setId] = useState();

    useEffect(() => {
        axiosHelper.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("token")}`;
    }, []);

    useEffect(() => {
        if (myAccount?.role !== 'ADMIN') {
            history.replace("/")
        } else {
            getAllGenres(page).then((response) => {
                console.log(response)
                setListGenres(response.data.data.content)
                setPagination((prevState) => ({...pagination, totalRows: response.data.data.totalElements}))
            })
        }
    }, [load, page]);

    // Hide Modal
    function closeModal() {
        clearForm();
        setModal(false)
    }

    // Show Modal
    function openModal(value) {
        setModal(true)
        setFormCustom((formCustom) => (value))
    }

    // Create genres
    function createGenres() {
        saveGenres(genres).then((response) => {
            if (response.data.result.responseCode === '200') {
                setModal(false)
                message.open({
                    type: "success",
                    content: "Genres added successfully!"
                })
            setLoad(!load)
            setGenres({
                code: "",
                name: ""
                })
                clearForm()
            } else {
                message.open({
                    type: "error",
                    content: response.data.result.responseMessage
                })
            }
        }).catch((error) => {
            message.open({
                type: "error",
                content: "Cannot add new genres!"
            })
            console.log(error)
        })
    }

    // Clear form
    function clearForm() {
        form.setFieldValue('code', '');
        form.setFieldValue('name', '');
    }

    // Update genres
    function updateNewGenres() {
        updateGenres(id, genres).then((response) => {
            if (response.data.result.responseCode === '200') {
                setModal(false)
                message.open({
                    type: "success",
                    content: "Genres update successfully!"
                })
                setLoad(!load)
                setGenres({
                    code: "",
                    name: ""
                })
                clearForm()
            } else {
                message.open({
                    type: "error",
                    content: response.data.result.responseMessage
                })
            }
        }).catch((error) => {
            message.open({
                type: "error",
                content: "Cannot update genres!"
            })
            console.log(error)
        })
    }

    // Fill data update
    async function fillDataUpdate(id) {
        try {
            setId(id)
            const newValue = await searchGenres(id)
            const value = {
                code: newValue.data.data.code,
                name: newValue.data.data.name,
            }
            setGenres((prevState) => ({...prevState, ...value}))
            setModal(true)
            setFormCustom(false)
            form.setFieldValue('name', value.name);
            form.setFieldValue('code', value.code);
        } catch (error) {
            console.log(error)
        }
    }

    // Change status Genres
    function deleteRecord(id, status) {
        deleteGenres(id, status).then((response) => {
            if (response.data.result.responseCode === '200') {
                message.open({
                    type: "success",
                    content: status === 'ShutDown' ? "Delete successfully!" : "Return successfully!"
                })
                setLoad(!load)
                console.log(response)
            } else {
                message.open({
                    type: "error",
                    content: response.data.result.responseMessage
                })
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    // Check status ShutDown
    function checkStatus(value) {
        return value.status === 'ShutDown';
    }

    return (
        <>
            <div className="new-users">
                <h2 className={'name-user'}>New Genres</h2>
                <div className="user-list">
                    <div className="user" onClick={() => openModal(true)}>
                        <img src={'https://res.cloudinary.com/hieuhv203/image/upload/v1715704767/assetHtml/jto8qgtu80dbi7ndvg8z.png'} alt={'Can not show image'}/>
                        <h2>More</h2>
                        <p>New Genres</p>
                    </div>
                </div>
            </div>

            <div className="recent-orders">
                <h2>Genres List</h2>
                <table>
                    <thead>
                    <tr>
                        <th key={'code'}>Code<i className='bx bx-search-alt-2'></i></th>
                        <th key={'name'}>Name<i className='bx bx-search-alt-2'></i></th>
                        <th key={'status'}>Status<i className='bx bx-filter-alt'></i></th>
                        <th key={'action'}></th>
                    </tr>
                    </thead>
                    <tbody>
                    { listGenres != null ? listGenres.map((value, index) => (
                        <tr key={index}>
                            <td>{value.code}</td>
                            <td>{value.name}</td>
                            <td className={value.status === 'Activate' ? 'success' : 'danger'}>{value.status}</td>
                            <td className={checkStatus(value) ? 'success button' : 'danger button'}
                                onClick={() => checkStatus(value) ? deleteRecord(value.id, 'Activate') : deleteRecord(value.id, 'ShutDown')}>{checkStatus(value) ? 'Return' : 'Delete'}</td>
                            <td className={'button warning'} onClick={() => fillDataUpdate(value.id)}>Update</td>
                            <td className={'button primary'} onClick={() => fillDataUpdate(value.id)}>Details</td>
                        </tr>
                    )) : <tr><td colSpan={5} style={{textAlign: 'center'}}>No data</td></tr>}
                    </tbody>
                </table>
            </div>
            <Pagination
                pageSize={5}
                total={pagination.totalRows}
                onChange={(value) => handlePageChange(value)}
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
                    wrapperCol={{flex: 1}}
                    colon={false}
                    style={{maxWidth: 600, marginTop: '60px'}}
                    initialValues={genres}
                    form={form}
                >
                    <h2>{formCustom ? "Create Genres" : "Update Genres"}</h2>
                    <Form.Item label={'Code'} name={'code'}
                               rules={[
                                   {required: true, message: 'Code can not be left blank!'},
                                   {
                                    validator: (_, value) => {
                                            if (listGenres != null) {
                                                const lowercaseValue = value.trim().toLowerCase();
                                                const isDuplicate = listGenres.some(
                                                    (genres) => genres.code.trim().toLowerCase() === lowercaseValue
                                                );
                                                if (isDuplicate) {
                                                    return Promise.reject('Code already exists!');
                                                }
                                                return Promise.resolve();
                                            }
                                        }
                                    }
                               ]}
                    >
                        <Input placeholder={'Enter code'}
                               onChange={(event) => setGenres({...genres, code: event.target.value})} name={'code'}></Input>
                    </Form.Item>
                    <Form.Item label={'Name'} name={'name'}
                               rules={[
                                   {required: true, message: 'Name can not be left blank!'},
                                   {
                                       validator: (_, value) => {
                                            if (listGenres != null) {
                                                const lowercaseValue = value.trim().toLowerCase();
                                                const isDuplicate = listGenres.some(
                                                    (genres) => genres.name.trim().toLowerCase() === lowercaseValue
                                                )
                                                if (isDuplicate) {
                                                    return Promise.reject('Name already exists!');
                                                }
                                                return Promise.resolve();
                                            }
                                       }
                                   }
                               ]}
                    >
                        <Input placeholder={'Enter name'} name={'name'}
                               onChange={(event) => setGenres({...genres, name: event.target.value})}></Input>
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
                                    onClick={() => formCustom ? createGenres() : updateNewGenres()}>
                                {formCustom ? "Create" : "Update"}
                            </Button>
                        </ConfigProvider>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}

export default Genres;
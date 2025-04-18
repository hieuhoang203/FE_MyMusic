import React, {useEffect, useState} from "react";
import {
    getAllUser,
    getNewUserOrArtis,
    saveUser,
    searchUser,
    updateStatusUser,
    updateUser
} from "../../../service/userService";
import {Button, ConfigProvider, DatePicker, Form, Input, message, Modal, Pagination, Radio, Upload, Spin} from "antd";
import {TinyColor} from "@ctrl/tinycolor";
import {UploadOutlined} from "@ant-design/icons";
import dayjs from "dayjs";
import axiosHelper from "../../../api/myApi";

const User = () => {

    // Modal's display change variable
    const [modal, setModal] = useState(false);

    // Form custom variable
    const [formCustom, setFormCustom] = useState(true)

    const [form] = Form.useForm();

    const dateFormat = "YYYY/MM/DD";

    // User variable
    const [user, setUser] = useState({
        id: "",
        name: "",
        gender: true,
        birthday: "",
        avatar: {},
        email: "",
        role: "USER"
    })

    // Pagination
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 5,
        totalRows: 1,
    });

    const [page, setPage] = useState(0);

    // Reload page
    const [load, setLoad] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    // User list
    const [newUser, setNewUser] = useState([]);
    const [allUser, setAllUser] = useState([]);

    const [id, setId] = useState()

    // Custom color button
    const colors3 = ['#40e495', '#30dd8a', '#2bb673'];
    const colors2 = ['#dd528d', '#ff8c79', '#fbae52'];

    const getHoverColors = (colors) =>
        colors.map((color) => new TinyColor(color).lighten(5).toString());
    const getActiveColors = (colors) =>
        colors.map((color) => new TinyColor(color).darken(5).toString());

    useEffect(() => {
        axiosHelper.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("token")}`;
    }, []);

    useEffect(() => {
        setIsLoading(true)
        getNewUserOrArtis('USER').then((response) => {
            setIsLoading(false)
            if (response.data.result.responseCode === '200') {
                setNewUser(Object.values(response.data.data));
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
                    content: "Cannot get new user or artist!",
                    style: {
                        animation: "fadeInOut 2s ease-in-out forwards",
                    },
                })
            }
        })
    }, [load]);

    useEffect(() => {
        setIsLoading(true)
        getAllUser(page).then((response) => {
            setIsLoading(false)
            if (response.data.result.responseCode === '200') {
                console.log(response.data.data)
                setAllUser(Object.values(response.data.data.content));
                setPagination((prevState) => ({...pagination, totalRows: response.data.totalElements}))
            } else {
                message.open({
                    type: "error",
                    content: response.data.result.responseMessage,
                    style: {
                        animation: "fadeInOut 2s ease-in-out forwards",
                    },
                })
            }
        }).catch((error) => {
            setIsLoading(false)
            if (error.response.status !== '401') {
                message.open({
                    type: "error",
                    content: "Cannot get user list!",
                    style: {
                        animation: "fadeInOut 2s ease-in-out forwards",
                    },
                })
            }
        })
    }, [load, page]);

    function handlePageChange(value) {
        setPage(prevState => (value - 1))
    }

    function closeModal() {
        clearForm()
        setModal(false);
    }

    function openModal() {
        setModal(true)
        setFormCustom((prevState) => true)
    }

    async function createUser() {
        setIsLoading(true)
        saveUser(2, user).then((response) => {
            setIsLoading(false)
            if (response.data.result.responseCode === '200') {
                setModal(false)
                message.open({
                    type: "success",
                    content: "User added successfully!",
                    style: {
                        animation: "fadeInOut 2s ease-in-out forwards",
                    },
                })
                setUser({
                    id: "",
                    name: "",
                    gender: true,
                    birthday: "",
                    avatar: {},
                    email: "",
                    role: "USER"
                })
                clearForm()
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
        }).catch((error) => {
            setIsLoading(false)
            if (error.response.status !== '401') {
                message.open({
                    type: "error",
                    content: "Cannot create user!",
                    style: {
                        animation: "fadeInOut 2s ease-in-out forwards",
                    },
                })
            }
        })
    }

    function updateNewUser() {
        setIsLoading(true)
        updateUser(id, user).then((response) => {
            setIsLoading(false)
            setModal(false)
            setId(undefined);
            message.open({
                type: "success",
                content: "User updated successfully!",
                style: {
                    animation: "fadeInOut 2s ease-in-out forwards",
                },
            })
            setUser({
                id: "",
                name: "",
                gender: true,
                birthday: "",
                avatar: {},
                email: "",
                role: "USER"
            })
            clearForm()
            setLoad(!load)
        }).catch((error) => {
            setIsLoading(false)
            if (error.response.status !== '401') {
                message.open({
                    type: "error",
                    content: "Cannot update user!",
                    style: {
                        animation: "fadeInOut 2s ease-in-out forwards",
                    },
                })
            }
        })
    }

    function fillDataToForm(id) {
        setId(id)
        setModal(true)
        setFormCustom(false)
        searchUser(id).then((response) => {
            const value = {...response.data}
            setUser({...value, birthday: value.birthday.replaceAll('-', '/')})
            form.setFieldValue('id', value.id)
            form.setFieldValue('name', value.name)
            form.setFieldValue('birthday', dayjs(value.birthday, dateFormat))
            form.setFieldValue('gender', value.gender !== '' ? value.gender : 'true')
            form.setFieldValue('email', value.email)
            form.setFieldValue('role', value.role)
        }).catch((error) => {
            console.log(error)
            if (error.response.status !== '401') {
                message.open({
                    type: "error",
                    content: "Cannot fill data to form!",
                    style: {
                        animation: "fadeInOut 2s ease-in-out forwards", 
                    },
                })
            }
        })
    }

    function checkStatus(value) {
        return value.status === 'Activate';
    }

    function updateStatus(id, status) {
        setIsLoading(true)
        updateStatusUser(id, status).then((response) => {
            if (response.data.result.responseCode === '200') {
                setIsLoading(false)
                setLoad(!load)
                message.open({
                    type: "success",
                    content: status === 'ShutDown' ? "Delete user successfully!" : "Return user successfully!",
                })
            } else {
                if (response.data.result.responseCode !== '401') {
                    message.open({
                        type: "error",
                        content: response.data.result.responseMessage,
                    })
                }
            }
        }).catch((error) => {
            setIsLoading(false)
            if (error.response.status !== '401') {
                message.open({
                    type: "error",
                    content: "Cannot update status!",
                    style: {
                        animation: "fadeInOut 2s ease-in-out forwards",
                    },
                })
            }
        })
    }

    function clearForm() {
        form.setFieldValue('id', '')
        form.setFieldValue('avatar', null)
        form.setFieldValue('name', '')
        form.setFieldValue('birthday', '')
        form.setFieldValue('gender', true)
        form.setFieldValue('email', '')
        form.setFieldValue('role', 'USER')
    }

    return (
        <>
            <Spin size='large' tip='Loading...' spinning={!modal ? isLoading : null}>
                <div className="new-users">
                    <h2 className={'name-user'}>New Users</h2>
                    <div className="user-list">
                        {newUser.map((value, index) => (
                            <div className="user" key={value.id}>
                                <img src={value.avatar} alt={'Image Error'}/>
                                <h2>{value.name}</h2>
                            </div>
                        ))}
                        <div className="user" onClick={() => openModal()}>
                            <img src={'https://res.cloudinary.com/hieuhv203/image/upload/v1715704767/assetHtml/jto8qgtu80dbi7ndvg8z.png'} alt={'Can not show image'}/>
                            <h2>More</h2>
                            <p>New User</p>
                        </div>
                    </div>
                </div>

                <div className="recent-orders">
                    <h2>User List</h2>
                    <table>
                        <thead>
                        <tr>
                            <th></th>
                            <th>Name<i className='bx bx-search-alt-2'></i></th>
                            <th>Gender<i className='bx bx-filter-alt'></i></th>
                            <th>Status<i className='bx bx-filter-alt'></i></th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {allUser != null ? allUser.map((value, index) => (
                            <tr key={index}>
                                <td><img src={value.avatar} alt={'Image Error'}/></td>
                                <td>{value.name}</td>
                                <td className={value.gender ? 'primary' : 'warning'}>{value.gender ? 'Male' : 'Female'}</td>
                                <td className={value.status === 'Activate' ? 'success' : 'danger'}>{value.status}</td>
                                <td className={checkStatus(value) ? 'danger button' : 'success button'}
                                    onClick={() => checkStatus(value) ? updateStatus(value.id, 'ShutDown') : updateStatus(value.id, 'Activate')}>{checkStatus(value) ? 'Delete' : 'Return'}</td>
                                <td className={'button warning'} onClick={() => fillDataToForm(value.id)}>Update</td>
                                <td className={'button primary'} onClick={() => fillDataToForm(value.id)}>Details</td>
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
            </Spin>
            <Modal
                open={modal}
                onCancel={() => closeModal()}
                width={500}
                footer={null}
                className={'modal'}
            >
                <Spin size='large' tip='Loading...' spinning={ modal ? isLoading : null}>
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
                                avatar: null,
                                gender: true,
                                role: 'USER'
                            }
                        }
                        encType="multipart/form-data"
                        disabled={isLoading}
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
                                            if (fileList && fileList[0].size > 9000000) {
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
                                        if (file.size > 1500000) {
                                            reject('File size exceeded!')
                                        } else {
                                            resolve('Success!')
                                        }
                                    })
                                }}
                                multiple={false}
                                onChange={(info) => {
                                    setUser({...user, avatar: info.file})
                                }}
                                customRequest={(info) => {
                                    setUser({...user, avatar: info.file})
                                    info.onSuccess('done')
                                }}
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
                                onChange={(events) => setUser({...user, name: events.target.value})}></Input>
                        </Form.Item>
                        <Form.Item label={'Gender'} name={'gender'}>
                            <Radio.Group name={'gender'}
                                        onChange={(events) => setUser({...user, gender: events.target.value})}>
                                <Radio value={true} style={{color: "#fbfbfb", fontSize: "16px"}}> Male </Radio>
                                <Radio value={false} style={{color: "#fbfbfb", fontSize: "16px"}}> Female </Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item label={'Birth Day'} name={'birthday'}
                                rules={[
                                    {required: true},
                                ]}
                        >
                            <DatePicker format={dateFormat}
                                        onChange={(date, dateString) => setUser({...user, birthday: dateString})}
                                        name={'birthday'}/>
                        </Form.Item>
                        <Form.Item label={'Email'} name={'email'}
                                rules={[
                                    {required: true, message: 'Email can not be left blank!'},
                                    {type: 'email'},
                                    {
                                        validator: (_, value) => {
                                            if (!value) {
                                                return Promise.resolve();
                                            }
                                            if (!value.match(
                                                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                                            )) {
                                                return Promise.reject('Invalid email!');
                                            }
                                        }
                                    }
                                ]}
                        >
                            <Input placeholder={'Enter your login name'} name={'email'} disabled={!formCustom}
                                onChange={(events) => setUser({...user, email: events.target.value})}></Input>
                        </Form.Item>
                        <Form.Item label={'Role'} name={'role'} style={{marginLeft: "13px"}}>
                            <Radio.Group name={'role'}
                                        onChange={(events) => setUser({...user, role: events.target.value})}>
                                <Radio name={'role'} value={'USER'}
                                    style={{color: "#fbfbfb", fontSize: "16px"}}> User </Radio>
                                <Radio name={'role'} value={'ADMIN'}
                                    style={{color: "#fbfbfb", fontSize: "16px"}}> Admin </Radio>
                            </Radio.Group>
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
                                        onClick={() => formCustom ? createUser() : updateNewUser()}
                                >
                                    {formCustom ? "Create" : "Update"}
                                </Button>
                            </ConfigProvider>
                        </Form.Item>
                    </Form>
                </Spin>
            </Modal>
        </>
    );
}

export default User;
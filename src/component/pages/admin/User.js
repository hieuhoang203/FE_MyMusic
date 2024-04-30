import React, {useEffect, useState} from "react";
import plus from "../../../asset/plus.png";
import {
    getAllUser,
    getNewUserOrArtis,
    saveUser,
    searchUser,
    updateStatusUser,
    updateUser
} from "../../../service/userService";
import {Button, ConfigProvider, DatePicker, Form, Input, message, Modal, Pagination, Radio, Upload} from "antd";
import {TinyColor} from "@ctrl/tinycolor";
import {UploadOutlined} from "@ant-design/icons";
import dayjs from "dayjs";

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

    // User list
    const [newUser, setNewUser] = useState([{}]);
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
        getNewUserOrArtis('USER').then((response) => {
            setNewUser(Object.values(response.data));
        })
    }, []);

    useEffect(() => {
        getAllUser(page).then((response) => {
            setAllUser(response.data.content)
            setPagination((prevState) => ({...pagination, totalRows: response.data.totalElements}))
        })
    }, [load, page]);

    function handlePageChange(value) {
        setPage(prevState => (value - 1))
    }

    function closeModal() {
        setModal(false);
    }

    function openModal() {
        setModal(true)
        setFormCustom((prevState) => true)
    }

    async function createUser() {
        saveUser(user).then((response) => {
            setModal(false)
            message.open({
                type: "success",
                content: "User added successfully!"
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
            setLoad(!load)
        }).catch((error) => {
            console.log(error)
        })
    }

    function updateNewUser() {
        console.log(user)
        updateUser(id, user).then((response) => {
            setModal(false)
            setId(undefined);
            message.open({
                type: "success",
                content: "User updated successfully!"
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
            setLoad(!load)
        }).catch((error) => {
            console.log(error)
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
            form.setFieldValue('gender', value.gender)
            form.setFieldValue('email', value.email)
            form.setFieldValue('role', value.role)
        }).catch((error) => {
            console.log(error)
        })
    }

    function checkStatus(value) {
        return value.status === 'Activate';
    }

    function updateStatus(id, email, status) {
        updateStatusUser(id, email, status).then((response) => {
            setLoad(!load)
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <>
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
                        <img src={plus} alt={'Can not show image'}/>
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
                        <th></th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {allUser.map((value, index) => (
                        <tr key={index}>
                            <td><img src={value.avatar} alt={'Image Error'}/></td>
                            <td>{value.name}</td>
                            <td className={value.gender ? 'primary' : 'warning'}>{value.gender ? 'Male' : 'Female'}</td>
                            <td className={value.status === 'Activate' ? 'success' : 'danger'}>{value.status}</td>
                            <td className={checkStatus(value) ? 'danger button' : 'success button'}
                                onClick={() => checkStatus(value) ? updateStatus(value.id, value.email, 'ShutDown') : updateStatus(value.id, value.email, 'Activate')}>{checkStatus(value) ? 'Delete' : 'Return'}</td>
                            <td className={'button warning'} onClick={() => fillDataToForm(value.id)}>Update</td>
                            <td className={'button primary'} onClick={() => fillDataToForm(value.id)}>Details</td>
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
                    initialValues={{remember: true}}
                    encType="multipart/form-data"
                >
                    <h2>{formCustom ? "Create User" : "Update User"}</h2>
                    <Form.Item label={'Id'} name={'id'}
                               style={{color: '#fdfdfd'}}
                               rules={[
                                   {required: true, message: 'Id can not be left blank!'},
                                   {
                                       validator: (_, value) => {
                                           if (!value) {
                                               return Promise.resolve();
                                           }
                                           const lowercaseValue = value.trim().toLowerCase();
                                           const isDuplicate = allUser.some(
                                               (user) => user.id.trim().toLowerCase() === lowercaseValue
                                           )
                                           if (isDuplicate) {
                                               return Promise.reject('Id already exists!');
                                           }
                                       }
                                   }
                               ]}
                    >
                        <Input placeholder={'Enter your id'} name={'id'}
                               onChange={(events) => setUser({...user, id: events.target.value})} disabled={!formCustom}></Input>
                    </Form.Item>
                    <Form.Item
                        label={'Avatar'}
                        style={!formCustom ? {marginLeft: '13px'} : {marginLeft: '0px'}}
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
                                console.log(info.file)
                                setUser({...user, avatar: info.file})
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
                    <Form.Item label={'Gender'} name={'gender'} style={{marginLeft: "13px"}}>
                        <Radio.Group name={'gender'} defaultValue={'true'}
                                     onChange={(events) => setUser({...user, gender: events.target.value})}>
                            <Radio value={'true'} style={{color: "#fbfbfb", fontSize: "16px"}}> Male </Radio>
                            <Radio value={'false'} style={{color: "#fbfbfb", fontSize: "16px"}}> Female </Radio>
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
                                   {type: "email"},
                                   {
                                       validator: (_, value) => {
                                           if (!value) {
                                               return Promise.resolve();
                                           }
                                           const lowercaseValue = value.trim().toLowerCase();
                                           const isDuplicate = allUser.some(
                                               (user) => user.email.trim().toLowerCase() === lowercaseValue
                                           )
                                           if (isDuplicate) {
                                               return Promise.reject('Email already exists!');
                                           }
                                       }
                                   }
                               ]}
                    >
                        <Input placeholder={'Enter your login name'} name={'email'} disabled={!formCustom}
                               onChange={(events) => setUser({...user, email: events.target.value})}></Input>
                    </Form.Item>
                    <Form.Item label={'Role'} name={'role'} style={{marginLeft: "13px"}}>
                        <Radio.Group defaultValue={'USER'} name={'role'}
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
            </Modal>
        </>
    );
}

export default User;
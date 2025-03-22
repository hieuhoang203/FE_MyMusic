import React, {useEffect, useState} from "react";
import plus from "../../../asset/plus.png";
import {
    getAllArtis,
    getNewUserOrArtis,
    saveUser,
    searchUser,
    updateStatusUser,
    updateUser
} from "../../../service/userService";
import {Button, ConfigProvider, DatePicker, Form, Input, message, Modal, notification, Pagination, Radio, Upload} from "antd";
import {TinyColor} from "@ctrl/tinycolor";
import dayjs from "dayjs";
import {UploadOutlined} from "@ant-design/icons";
import axiosHelper from "../../../api/myApi";

const Artis = () => {

    // Modal's display change variable
    const [modal, setModal] = useState(false);

    // Form custom variable
    const [formCustom, setFormCustom] = useState(true)

    const [form] = Form.useForm();

    const dateFormat = "YYYY/MM/DD";

    // User variable
    const [artis, setArtis] = useState({
        id: "",
        name: "",
        gender: true,
        birthday: "",
        avatar: {},
        email: "",
        role: "ARTIS"
    })

    // Custom color button
    const colors3 = ['#40e495', '#30dd8a', '#2bb673'];
    const colors2 = ['#dd528d', '#ff8c79', '#fbae52'];

    const getHoverColors = (colors) =>
        colors.map((color) => new TinyColor(color).lighten(5).toString());
    const getActiveColors = (colors) =>
        colors.map((color) => new TinyColor(color).darken(5).toString());

    // Pagination
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 5,
        totalRows: 1,
    });

    const [page, setPage] = useState(0);

    // Reload page
    const [load, setLoad] = useState(true);

    const [id, setId] = useState()

    // List artis
    const [newArtis, setNewArtis] = useState([]);
    const [allArtis, setAllArtis] = useState([]);

    useEffect(() => {
        axiosHelper.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("token")}`;
    }, []);

    useEffect(() => {
        getNewUserOrArtis('ARTIS').then((response) => {
            if (response.data.result.responseCode === '200') {
                setNewArtis(Object.values(response.data.data))
            } else {
                message.open({
                    type: "error",
                    content: response.data.result.responseMessage
                })
            }
        })
    }, [load]);

    useEffect(() => {
        getAllArtis(page).then((response) => {
            if (response.data.result.responseCode === '200') {  
                setAllArtis(response.data.data.content)
                setPagination((prevState) => ({...pagination, totalRows: response.data.totalElements}))
            } else {
                message.open({
                    type: "error",
                    content: response.data.result.responseMessage
                })
            }
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

    async function createArtis() {
        try {
            const response = await saveUser(artis)
            setModal(false)
            setArtis({
                id: "",
                name: "",
                gender: true,
                birthday: "",
                avatar: {},
                email: "",
                role: "ARTIS"
            })
            clearForm()
            setLoad(!load)
            notification.success({
                message: "New artis",
                description: "Create artis successfully!",
            })
        } catch (error) {
            notification.error({
                message: "New artis",
                description: "Email already exists!",
            })
        }
    }

    async function updateNewArtis() {
        try {
            const response = await updateUser(id, artis)
            setModal(false)
            setId(undefined);
            setArtis({
                id: "",
                name: "",
                gender: true,
                birthday: "",
                avatar: {},
                email: "",
                role: "ARTIS"
            })
            clearForm()
            setLoad(!load)
            notification.success({
                message: "Update artis",
                description: "Update artis successfully!",
            })
        } catch (error) {
            notification.error({
                message: "New artis",
                description: "Can't update artis!",
            })
        }
    }

    function fillDataToForm(id) {
        setId(id)
        setModal(true)
        setFormCustom(false)
        searchUser(id).then((response) => {
            const value = {...response.data}
            setArtis({...value, birthday: value.birthday.replaceAll('-', '/')})
            form.setFieldValue('id', value.id)
            form.setFieldValue('name', value.name)
            form.setFieldValue('birthday', dayjs(value.birthday, dateFormat))
            form.setFieldValue('gender', value.gender)
            form.setFieldValue('email', value.email)
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

    function clearForm() {
        form.setFieldValue('avatar', null)
        form.setFieldValue('id', '')
        form.setFieldValue('name', '')
        form.setFieldValue('birthday', '')
        form.setFieldValue('gender', 'true')
        form.setFieldValue('email', '')
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
                    <div className="user" onClick={() => openModal()}>
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
                    </tr>
                    </thead>
                    <tbody>
                    {allArtis.length > 0 ? allArtis.map((value, index) => (
                        <tr key={index}>
                            <td><img src={value.avatar} alt={'Image Error'}/></td>
                            <td>{value.name}</td>
                            <td className={value.gender ? 'primary' : 'warning'}>{value.gender ? 'Male' : 'Female'}</td>
                            <td>{value.songs}</td>
                            <td>{value.follows}</td>
                            <td className={value.status === 'Activate' ? 'success' : 'danger'}>{value.status}</td>
                            <td className={checkStatus(value) ? 'danger button' : 'success button'}
                                onClick={() => checkStatus(value) ? updateStatus(value.id, value.email, 'ShutDown') : updateStatus(value.id, value.email, 'Activate')}>{checkStatus(value) ? 'Delete' : 'Return'}</td>
                            <td className={'button warning'} onClick={() => fillDataToForm(value.id)}>Update</td>
                            <td className={'button primary'} onClick={() => fillDataToForm(value.id)}>Details</td>
                        </tr>
                    )) : <tr><td colSpan={10} style={{textAlign: 'center'}}>No data</td></tr>}
                    </tbody>
                </table>
            </div>
            <Pagination
                pageSize={pagination.limit}
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
                    <h2>{formCustom ? "Create Artis" : "Update Artis"}</h2>
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
                                setArtis({...artis, avatar: info.file})
                            }}
                            customRequest={(info) => setArtis({...artis, avatar: info.file})}
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
                               onChange={(events) => setArtis({...artis, name: events.target.value})}></Input>
                    </Form.Item>
                    <Form.Item label={'Gender'} name={'gender'} style={{marginLeft: "13px"}}>
                        <Radio.Group name={'gender'} defaultValue={'true'}
                                     onChange={(events) => setArtis({...artis, gender: events.target.value})}>
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
                                    onChange={(date, dateString) => setArtis({...artis, birthday: dateString})}
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
                               onChange={(events) => setArtis({...artis, email: events.target.value})}></Input>
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
                                    onClick={() => formCustom ? createArtis() : updateNewArtis()}
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

export default Artis;
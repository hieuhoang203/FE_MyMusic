import React, {useEffect, useState} from "react";
import plus from "../../../asset/plus.png";
import {Button, ConfigProvider, Form, Input, message, Modal, Pagination} from "antd";
import {TinyColor} from "@ctrl/tinycolor";
import {deleteRole, getAllRole, returnStatus, saveRole, searchRole, updateRole} from "../../../service/roleService";

const Role = () => {

    // Pagination
    const [page, setPage] = useState(0);

    const [pagination, setPagination] = useState({
        page: 1,
        limit: 5,
        totalRows: 1,
    });

    function handlePageChange(value) {
        setPage(prevState => (value - 1))
    }

    // Variable reloads the page
    const [load, setLoad] = useState(true);
    const [form] = Form.useForm();

    // List Role
    const [listRole, setListRole] = useState([{}])

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
    const [role, setRole] = useState({
        code: "",
        name: ""
    })

    const [id, setId] = useState();

    useEffect(() => {
        getAllRole(page).then((response) => {
            setListRole(response.data.content)
            setPagination((prevState) => ({...pagination, totalRows: response.data.totalElements}))
        })
    }, [load, formCustom, page]);

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

    // Create Role
    function createRole() {
        saveRole(role).then((response) => {
            setModal(false)
            message.open({
                type: "success",
                content: "Role added successfully!"
            })
            setLoad(!load)
            setRole({
                code: "",
                name: ""
            })
            clearForm()
        }).catch((error) => {
            message.open({
                type: "error",
                content: "Cannot add new Role!"
            })
            console.log(error)
        })
    }

    // Clear form
    function clearForm() {
        form.setFieldValue('code', '');
        form.setFieldValue('name', '');
    }

    // Update Role
    function updateNewRole() {
        updateRole(id, role).then((response) => {
            setModal(false)
            message.open({
                type: "success",
                content: "Role update successfully!"
            })
            setLoad(!load)
            setRole({
                code: "",
                name: ""
            })
            clearForm()
        }).catch((error) => {
            message.open({
                type: "error",
                content: "Cannot update Role!"
            })
            console.log(error)
        })
    }

    async function fillDataUpdate(id) {
        setId(id)
        const newValue = await searchRole(id)
        const value = {
            code: newValue.data.code,
            name: newValue.data.name,
        }
        setRole((prevState) => ({...prevState, ...value}))
        setModal(true)
        setFormCustom(false)
        form.setFieldValue('name', value.name);
        form.setFieldValue('code', value.code);
        console.log(role)
    }

    function deleteRecord(id) {
        deleteRole(id).then((response) => {
            message.open({
                type: "success",
                content: "Delete successfully!"
            })
            setLoad(!load)
            console.log(response)
        }).catch((error) => {
            console.log(error)
        })
    }

    // Check status ShutDown
    function checkStatus(value) {
        return value.status === 'ShutDown';
    }

    // Return status Role
    function returnStatusRecord(id) {
        returnStatus(id).then((response) => {
            message.open({
                type: "success",
                content: "Return status successfully!"
            })
            setLoad(!load)
        }).catch((error) => {
            message.open({
                type: "error",
                content: "Cannot return status successfully!"
            })
            console.log(error)
        })
    }

    return (
        <>
            <div className="new-users">
                <h2 className={'name-user'}>New role</h2>
                <div className="user-list">
                    <div className="user" onClick={() => openModal(true)}>
                        <img src={plus} alt={'Can not show image'}/>
                        <h2>More</h2>
                        <p>New role</p>
                    </div>
                </div>
            </div>

            <div className="recent-orders">
                <h2>Role List</h2>
                <table>
                    <thead>
                    <tr key={listRole.length + 7}>
                        <th>Code<i className='bx bx-search-alt-2'></i></th>
                        <th>Name<i className='bx bx-search-alt-2'></i></th>
                        <th>Status<i className='bx bx-filter-alt'></i></th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {listRole.map((value, index) => (
                        <tr key={index}>
                            <td>{value.code}</td>
                            <td>{value.name}</td>
                            <td className={value.status === 'Activate' ? 'success' : 'danger'}>{value.status}</td>
                            <td className={checkStatus(value) ? 'success button' : 'danger button'}
                                onClick={() => checkStatus(value) ? returnStatusRecord(value.id) : deleteRecord(value.id)}>{checkStatus(value) ? 'Return' : 'Delete'}</td>
                            <td className={'button warning'} onClick={() => fillDataUpdate(value.id)}>Update</td>
                            <td className={'button primary'} onClick={() => fillDataUpdate(value.id)}>Details</td>
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
                    wrapperCol={{flex: 1}}
                    colon={false}
                    style={{maxWidth: 600, marginTop: '60px'}}
                    form={form}
                >
                    <h2>{formCustom ? "Create role" : "Update role"}</h2>
                    {/*<Form.Item label={'Image'} name={'avatar'}*/}
                    {/*           valuePropName={'fileList'}*/}
                    {/*           rules={[*/}
                    {/*               {required: true, message: 'Avatar can not be left blank!'},*/}
                    {/*               {*/}
                    {/*                   validator(_, fileList) {*/}
                    {/*                       return new Promise((resolve, reject) => {*/}
                    {/*                           if (fileList && fileList[0].size > 5000000) {*/}
                    {/*                               reject('File size exceeded')*/}
                    {/*                               message.error('File size exceeded!')*/}
                    {/*                           } else {*/}
                    {/*                               resolve('Success')*/}
                    {/*                               message.success('Success!')*/}
                    {/*                           }*/}
                    {/*                       })*/}
                    {/*                   }*/}
                    {/*               }*/}
                    {/*           ]}*/}
                    {/*           getValueFromEvent={(event) => {*/}
                    {/*               return event?.fileList*/}
                    {/*           }}*/}
                    {/*>*/}
                    {/*    <Upload*/}
                    {/*        maxCount={1}*/}
                    {/*        beforeUpload={(file) => {*/}
                    {/*            return new Promise((resolve, reject) => {*/}
                    {/*                if (file.size > 1500000) {*/}
                    {/*                    reject('File size exceeded!')*/}
                    {/*                } else {*/}
                    {/*                    resolve('Success!')*/}
                    {/*                }*/}
                    {/*            })*/}
                    {/*        }*/}
                    {/*        }*/}
                    {/*        multiple={false}*/}
                    {/*        customRequest={(info) => {*/}
                    {/*            setRole({...role, avatar: info.file})*/}
                    {/*            console.log(info.file)*/}
                    {/*        }}*/}
                    {/*        fileList={role.avatar}*/}
                    {/*    >*/}
                    {/*        <Button icon={<UploadOutlined/>}>Click to upload</Button>*/}
                    {/*    </Upload>*/}
                    {/*</Form.Item>*/}
                    <Form.Item label={'Code'} name={'code'}
                               rules={[
                                   {required: true, message: 'Code can not be left blank!'}
                               ]}
                               initialValue={role.code}
                    >
                        <Input name={'code'} placeholder={'Enter code'} onChange={(event) => setRole({...role, code: event.target.value})}></Input>
                    </Form.Item>
                    <Form.Item label={'Name'} name={'name'}
                               rules={[
                                   {required: true, message: 'Name can not be left blank!'}
                               ]}
                               initialValue={role.name}
                    >
                        <Input name={'name'} placeholder={'Enter name'} onChange={(event) => setRole({...role, name: event.target.value})}></Input>
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
                            <Button htmlType={"button"} type="primary" size="large" onClick={() => formCustom ? createRole() : updateNewRole()}>
                                {formCustom ? "Create" : "Update"}
                            </Button>
                        </ConfigProvider>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}

export default Role;
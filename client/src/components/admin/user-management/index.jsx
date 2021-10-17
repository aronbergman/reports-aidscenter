import React, { useEffect, useState } from 'react'
import { Modal, Table, Select, PageHeader } from "antd";
import { findAllRoles, findAllUsers, findRoles, findSubdivisions } from "../../../redux/thunks/user.thunks";
import { Button } from 'antd';
import styles from "../../reports/testing/styles.module.scss";
import { Register } from "../../Forms/Register";

const { Option } = Select;

export const UserManagement = () => {

    const [users, setUsers] = useState(null)
    const [roles, setRoles] = useState(null)
    const [subdivisions, setSubdivisions] = useState(null)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const cities = [
        {
            name: 'Москва',
            code: 'moscow'
        },
        {
            name: 'Санкт-Петербург',
            code: 'spb'
        },
        {
            name: 'Нижний Новгород',
            code: 'nn'
        },
    ]

    useEffect(() => {

        findRoles().then(roles => setRoles(roles.data))
        findSubdivisions().then(subdivisions => setSubdivisions(subdivisions.data))

        findAllUsers().then((dataUsers) => {
            findAllRoles().then((dataRoles) => {

                setUsers(dataUsers.data.map(user => ({
                        ...user,
                        roleId: dataRoles.data.find(role => user.id === role.userId).roleId,
                        subdivisionId: dataRoles.data.find(role => user.id === role.userId).subdivisionId,
                    })
                ).sort((a,b) => b.roleId - a.roleId))
            })
        })
    }, [])

    console.log('users', users)
    console.log('roles', roles)
    console.log('subdivisions', subdivisions)

    const handleChangeRole = (value) => {
        console.log(`selected role ${value}`);
    }

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const columns = [
        {
            title: 'Учётка (username)',
            width: 100,
            dataIndex: 'username',
            key: 'username',
            fixed: 'left',
        },
        {
            title: 'Полное имя (в списках)',
            width: 100,
            dataIndex: 'appointment',
            key: 'appointment'
        },
        {
            title: 'Роль сотрудника',
            dataIndex: 'roleId',
            key: '2',
            width: 150,
            render: (data) => {
                return (
                    <Select defaultValue={data} style={{ width: 200 }} onChange={handleChangeRole}>
                        {roles.map(role => <Option value={role.id}>{role.label}</Option>)}
                    </Select>
                )
            }
        },
        {
            title: 'Доступны подразделения',
            dataIndex: 'subdivisionId',
            key: '1',
            width: 150,
            render: (data) => {
                return (
                    subdivisions && <Select
                        mode="multiple"
                        defaultValue={
                            !!data ? data.split('.').map(i => subdivisions.find(value => value.id === +i).id) : undefined
                        }
                        style={{ width: 250 }}
                        onChange={handleChangeRole}>
                        {subdivisions.map(subdivision => <Option value={subdivision.id}>{subdivision.label}</Option>)}
                    </Select>
                )
            }
        },
        {
            title: 'Город',
            dataIndex: 'city',
            key: '2',
            width: 150,
            render: (data) => {
                return (
                    <Select defaultValue={data} style={{ width: 200 }} onChange={handleChangeRole}>
                        {cities.map(city => <Option value={city.code}>{city.name}</Option>)}
                    </Select>
                )
            }
        },
        {
            title: 'Создан',
            width: 100,
            dataIndex: 'createdAt',
            key: 'createdAt'
        },
        {
            key: 'operation',
            fixed: 'right',
            width: 100,
            render: () => <>
                <Button type="primary" ghost size="small">Изменить пароль</Button>
                <Button type="primary" ghost size="small" danger>Удалить</Button>
            </>,
        }
    ];

    return (
        <div>
            <PageHeader
                className={styles.title}
                title="Сотрудники"
                subTitle="Управление учётными записями и правами"
                extra={<Button onClick={showModal} type="primary">Добавить сотрудника</Button>}
            />
            <br/>

            <p>
                <b>Роль сотрудника</b> <br/>
                <i>Консультант</i>: может создавать формы в выбранных подразделениях <br/>
                <i>Модератор</i>: как user + доступен раздел отчёты по его подразделениям <br/>
                <i>Администратор</i>: абсолютный доступ КО ВСЕМУ, вкладка "Админка", управление пользователями
            </p>

            <Table size="small" columns={columns} dataSource={users} scroll={{ x: 1500, y: 300 }}/>

            <Modal title="Регистрация нового сотрудника" visible={isModalVisible} onCancel={handleCancel}
                   footer={false}>
                <Register/>
            </Modal>
        </div>
    )
}

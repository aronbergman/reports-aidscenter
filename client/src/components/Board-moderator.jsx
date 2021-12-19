import React, { useState, useEffect } from "react";
import { Layout, Menu } from 'antd';
import { UserOutlined, PhoneOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { MODERATOR } from "../constants/roles.constants";
import useAuth from "../hooks/useAuth";
import { findAllUsersForForms } from "../redux/thunks/user.thunks";
import DrugstoreReport from "./reports/drugstore/DrugstoreReport";
import GroupsHivReport from "./reports/groups/GroupsHivReport";
import TestingReport from "./reports/testing/TestingReport";
import HotLineReport from "./reports/hot-line/HotLineReport";

const { Content, Sider } = Layout;
const BoardModerator = () => {
    const [tab, setTab] = useState("2");
    const [opened, setOpened] = useState("1");
    const username = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        findAllUsersForForms().then((data) => {
            setOpened(data.data.filter(i => i.username === username.username)[0].subdivision);
        })
        // eslint-disable-next-line
    }, []);

    const setActiveTab = (e) => {
        setTab(e.key)
    }

    const setComponent = (tab) => {

        if (!opened.includes(tab)) {
            return "Доступ к этому отчету запрещён. (нужно добавить этот раздел в админке для вашего пользователя)"
        }

        switch (tab) {
            case "2":
                return <TestingReport/>
            case "4":
                return <HotLineReport/>
            case "3":
                return <GroupsHivReport/>
            case "1":
                return <DrugstoreReport/>
            default:
                return ""
        }
    }

    return (
        <Layout>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={broken => {
                    console.log(broken);
                }}
                onCollapse={(collapsed, type) => {
                    console.log(collapsed, type);
                }}
            >
                <Menu onSelect={setActiveTab} theme="dark" mode="inline" defaultSelectedKeys={[tab]}>
                    {/*<Menu.Item key="1" icon={<VideoCameraOutlined/>}>*/}
                    {/*    Диаграммы*/}
                    {/*</Menu.Item>*/}
                    <Menu.Item key="2" icon={<UserOutlined/>}>
                        Тестируемые
                    </Menu.Item>
                    <Menu.Item key="4" icon={<PhoneOutlined />}>
                        Горячая линия
                    </Menu.Item>
                    <Menu.Item key="3" icon={<UsergroupAddOutlined />}>
                        Группы поддержки
                    </Menu.Item>
                    <Menu.Item key="1" icon={<UsergroupAddOutlined />}>
                        Аптека
                    </Menu.Item>
                    {/*<Menu.Item key="4" icon={<UserOutlined/>}>*/}
                    {/*    nav 4*/}
                    {/*</Menu.Item>*/}
                </Menu>
            </Sider>
            <Layout>
                {/*<Header className="site-layout-sub-header-background" style={{ padding: 0 }}/>*/}
                <Content style={{ margin: '24px 16px 0' }}>
                    {setComponent(tab)}
                </Content>
            </Layout>
        </Layout>
    );
};

export default useAuth(BoardModerator, MODERATOR);
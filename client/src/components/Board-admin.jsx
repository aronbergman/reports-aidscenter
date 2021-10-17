import React, { useState, useEffect } from "react";
import { Layout, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { ADMIN } from "../constants/roles.constants";
import useAuth from "../hooks/useAuth";
import UserService from "../services/user.service";
import TestingReport from "./reports/testing/TestingReport";
import { UserManagement } from "./admin/user-management";

const { Content, Sider } = Layout;
const BoardAdmin = () => {
    const [tab, setTab] = useState("1");

    const setActiveTab = (e) => {
        setTab(e.key)
    }

    const setComponent = (tab) => {
       switch (tab) {
           case "1":
               return <UserManagement/>
           case "2":
               return "создание сущностей, редактирование, удаление, вход в ситему, просмотр отчета и т.д."
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
                    <Menu.Item key="1" >
                       Сотрудники
                    </Menu.Item>
                    <Menu.Item key="2" icon={<UserOutlined/>}>
                        Журнал действий
                    </Menu.Item>
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

export default useAuth(BoardAdmin, ADMIN);
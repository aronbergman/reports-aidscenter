import React, { useState, useEffect } from "react";
import { Layout, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { ADMIN } from "../constants/roles.constants";
import useAuth from "../hooks/useAuth";
import UserService from "../services/user.service";
import TestingReport from "./reports/testing/TestingReport";

const { Content, Sider } = Layout;
const BoardAdmin = () => {
    const [tab, setTab] = useState("1");

    const setActiveTab = (e) => {
        setTab(e.key)
    }

    const setComponent = (tab) => {
       switch (tab) {
           case "1":
               return <TestingReport/>
           case "2":
               return "Индивидуальная формулировка выборки показателей отчета (добавлять/удалять стату с хитрой совмещенной выборкой)"
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
                    <Menu.Item key="1" icon={<UserOutlined/>}>
                        Тестируемые
                    </Menu.Item>
                    <Menu.Item key="2" >
                       Индивидуальный отч.
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

export default useAuth(BoardAdmin, ADMIN);
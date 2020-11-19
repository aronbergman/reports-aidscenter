import React from 'react';
import {Layout, Menu} from 'antd';

const {Sider, Content} = Layout;

const Admin = props => {

    const menuSelectHandler = e => {
        props.history.push(`/admin/${e.key}`)
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
                <div className="logo"/>
                <Menu theme="dark" mode="inline" onSelect={menuSelectHandler} >
                    <Menu.Item key="add-video">
                        Добавить видео
                    </Menu.Item>
                    <Menu.Item key="list-video">
                        Список видео
                    </Menu.Item>
                    <Menu.Item key="3">
                        nav 3
                    </Menu.Item>
                    <Menu.Item key="4">
                        nav 4
                    </Menu.Item>
                </Menu>
            </Sider>
            <Content>{props.children}</Content>
        </Layout>
    );
};

export default Admin;

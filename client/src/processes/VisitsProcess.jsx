import React, { useState, useEffect } from "react";
import { Layout, Menu } from "antd";
import {
  PatientPage,
  PatientsPage,
  PatientVisitPage,
  PatientVisitsPage,
  QuestionsPage,
} from "../pages";
import { Route, Switch, useLocation, useParams } from "react-router";
import { Link } from "react-router-dom";

export const VisitsProcess = () => {
  const { id } = useParams();
  const [tab, setTab] = useState();
  const location = useLocation();

  useEffect(() => {
    const { pathname } = location;
    switch (pathname) {
      case '/visits/questions':
        setTab('6');
        break;
      case '/visits/history':
        setTab('8');
        break;
      default:
        break;
    }
  }, [location]);

  return (
    <Layout>
      <Layout.Sider breakpoint="lg" collapsedWidth="0">
        <Menu
          onSelect={(e) => setTab(e.key)}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[tab]}
        >
          {/* <Menu.Item key="8">
            <Link to="/visits/history">Визиты</Link>
          </Menu.Item> */}
          <Menu.Item key="7">
            <Link to="/visits/patients">Пациенты</Link>
          </Menu.Item>
          <Menu.Item key="6">
            <Link to="/visits/questions">Вопросы</Link>
          </Menu.Item>
        </Menu>
      </Layout.Sider>
      <Layout>
        <Layout.Content style={{ margin: "24px 16px 0" }}>
          <Switch>
            <Route path="/visits/questions" component={QuestionsPage} />
            <Route path="/visits/patients/:id" component={PatientPage} />
            <Route path="/visits/patients" component={PatientsPage} />
            <Route path="/visits/history/:id" component={PatientVisitPage} />
            <Route path="/visits/history" component={PatientVisitsPage} />
          </Switch>
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

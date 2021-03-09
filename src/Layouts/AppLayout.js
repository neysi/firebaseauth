import React, { useState } from "react";

import { Col, Layout, Menu, Row } from "antd";

import {
  UserOutlined,
  MenuOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { Link } from "@reach/router";
import { useFirestoreUser } from "../Context/context";
import { routes } from "../Constants/routes";

const { Header, Sider, Content } = Layout;
const AppLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const { user, userLoading } = useFirestoreUser();

  const [current, setCurrent] = useState("dashboard");

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const handleClick = (e) => {
    setCurrent(e.key);
    // setCollapsed(true);
  };

  return (
    <Layout>
      <Sider
        breakpoint="sm"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          // console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          setCollapsed(collapsed);
        }}
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div className="logo__app">
          <img
            alt="Logo"
            src={collapsed ? "/img/favicon.png" : "/img/logo_light.svg"}
          />
        </div>
        {false === userLoading ? (
          <Menu
            onClick={handleClick}
            theme="dark"
            mode="inline"
            selectedKeys={[current]}
          >
            <Menu.Item key={routes.PROFILE} icon={<UserOutlined />}>
              <Link to={routes.PROFILE}>My profile</Link>
            </Menu.Item>
            {user?.role === "admin" && (
              <Menu.Item key={routes.USERS} icon={<UnorderedListOutlined />}>
                <Link to={routes.USERS}>Manage users</Link>
              </Menu.Item>
            )}
          </Menu>
        ) : null}
      </Sider>
      <Layout className="site-layout">
        <Header className="layout__background" style={{ padding: 0 }}>
          <Row justify="space-between" align="top">
            <Col span={4}>
              {React.createElement(MenuOutlined, {
                className: "trigger",
                onClick: toggle,
              })}
            </Col>

            <Col span={6} style={{ textAlign: "right", paddingRight: 20 }}>
              <Link to={routes.LOGOUT}>Logout</Link>
            </Col>
          </Row>
        </Header>
        <Content className="layout ">{children}</Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;

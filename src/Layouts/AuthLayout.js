import { Layout } from "antd";
import { Content, Footer, Header } from "antd/lib/layout/layout";

const AuthLayout = ({ children }) => {
  return (
    <Layout>
      <Header>
        <div className="logo">
          <img alt="Logo" src="/img/logo_light.svg" />
        </div>
      </Header>
      <Content style={{ height: "calc(100vh - 135px)", padding: "0 20px" }}>
        <div className="site-layout-content">{children}</div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        © Immertec 2021 - All rights reserved
      </Footer>
    </Layout>
  );
};

export default AuthLayout;

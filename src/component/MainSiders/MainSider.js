import React, { useState } from "react";
import "./MainSider.style.scss";
import { Layout, Menu } from "antd";
import HomeRoutes from "../../util/HomeRoutes";
import { withRouter, Link } from "react-router-dom";
import parse from "html-react-parser";
import { FullscreenOutlined, FullscreenExitOutlined } from "@ant-design/icons";

const { Header, Sider } = Layout;
const CustomSider = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => {
    setCollapsed(!collapsed);
  };
  function compare(values) {
    let data1 = JSON.parse(localStorage.getItem("group_menu"));
    for (var i in data1) {
      if (data1[i].menu.includes(values)) {
        return values;
      }
    }
  }
  return (
    <>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          {/* <div className="logo" /> */}
          <Menu mode="inline" style={{ marginTop: "5px" }}>
            {HomeRoutes.sub_menu
              .filter((menu) => compare(menu.menu_id))
              .map((menu, idx) => {
                return (
                  <>
                    <Menu.Item
                      key={idx.toString()}
                      icon={menu.icon}
                      style={{
                        fontSize: "18px",
                        height: "51px",
                        lineHeight: "80%",
                      }}
                    >
                      {parse(menu.wording)}
                      <Link to={menu.path} />
                    </Menu.Item>
                  </>
                );
              })}
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(
              collapsed ? FullscreenOutlined : FullscreenExitOutlined,
              {
                className: "trigger",
                onClick: toggle,
              }
            )}
          </Header>
          {/* <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
            }}
          >
            Content
          </Content> */}
        </Layout>
      </Layout>
    </>
  );
};

export default withRouter(CustomSider);

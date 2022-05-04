import React from "react";
import "./MainLayouts.scss";
// import { Layout } from "antd";
import CustomHeader from "../MainHeaders/MainHeaders";
import MianFooter from "../MainFooters/Footer";
import CustomSider from "../MainSiders/MainSider";

import { Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content } = Layout;

// const { Header, Content, Sider } = Layout;

const MainLayouts = (props) => {
  return (
    <>
      <main
        className={`app-layout ${
          props.className !== undefined ? props.className : ""
        }`}
      >
        {props.isHeader && <CustomHeader />}
        {props.isSider && (
          <div className="sider-menu">
            <CustomSider style={{ borderRadius: "10px" }} />
          </div>
        )}
        <div className="conten-layout">{props.children}</div>
        {props.isFooter && <MianFooter />}
      </main>
    </>
  );
};

export default MainLayouts;

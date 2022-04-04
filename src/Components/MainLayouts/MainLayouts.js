import React from "react";
import "./MainLayouts.scss";
import { Layout } from "antd";

const { Header, Content, Sider } = Layout;

const MainLayouts = (props) => {
  return (
    <main
      className={`Main-layout ${
        props.className !== undefined ? props.className : ""
      }`}
    >
      {props.isHeader && <Header />}
    </main>
  );
};

export default MainLayouts;

import React from "react";
import { Layout } from "antd";
import wording from "../../util/wording";
import "./Footer.style.scss";

const { Footer } = Layout;

const MainFooter = () => {
  return (
    <>
      <footer className="footer-content">{wording.login_footer}</footer>
    </>
  );
};

export default MainFooter;

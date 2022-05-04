import React, { useState, useEffect } from "react";
import { logout, isLogin } from "../../middleware/authen.service";
import { Menu, Dropdown, Space } from "antd";
import { Navbar, Container } from "react-bootstrap";
// import LOGO_HEADER from "../../assets/icons/LOGO-THAILIFE-2.svg";
import { Link } from "react-router-dom";
import profile from "../../assets/icons/profile.svg";
import { LogoutOutlined, IdcardOutlined } from "@ant-design/icons";
import DropdownIcon from "../../assets/icons/DropdownIcons.svg";
// import LOGO_HUGE from "../../assets/icons/LOGO-THAILIFEE-BIGPICTURE.svg";
import LOGO_V2 from "../../assets/icons/LOGO-THAILIFEV2.jpg";
import LOGO_Normal from "../../assets/icons/LOGO-THAILIFE.png";
import wording from "../../util/wording";
import { Layout } from "antd";
import "./MainHeader.scss";

const { Header } = Layout;

const CustomHeader = (props) => {
  const [state, setState] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    setState(isLogin());
    setName(
      `${localStorage.getItem("firstName")} ${localStorage.getItem(
        "lastName"
      )} (${localStorage.getItem("group_code")})`
    );
  }, [props]);

  const onPresLogout = () => {
    logout();
    setState(false);
  };

  const usermenu = (
    <Menu>
      <Menu.Item key="0" icon={<IdcardOutlined />}>
        <Link to="/page-1" className="text_menu_span">
          {wording.profile_wording}
        </Link>
      </Menu.Item>
      <Menu.Item key="1" icon={<LogoutOutlined />}>
        <Link onClick={() => onPresLogout()} to="/" className="text_menu_span">
          {wording.logout_wording}
        </Link>
      </Menu.Item>
    </Menu>
  );

  if (state === false) {
    return (
      <Header className="header-huge">
        <div className="header-huge-container">
          <img src={LOGO_V2} alt="LOGO" />
          <div className="wording-container">
            <p className="wording-huge">{wording.home_page_wording}</p>
          </div>
        </div>
      </Header>
    );
  }

  return (
    <header>
      <Navbar>
        <Link className="navbar-brand" to="/home">
          <img
            src={LOGO_Normal}
            alt="React Logo"
            style={{ width: "66px", height: "64px" }}
          />
          <span
            style={{
              marginLeft: "20px",
              marginTop: "10px",
              fontSize: "40px",
              alignItems: "center",
            }}
          >
            {wording.home_page_wording}
          </span>
        </Link>
        <Navbar.Toggle />
        <Navbar.Collapse className="navbar-collapse">
          <Navbar.Text>
            <Space>
              <div>
                <span className="header-user-span">{name + " "}</span>
                <Dropdown
                  overlay={usermenu}
                  placement="bottomLeft"
                  trigger={["click"]}
                >
                  <img src={profile} alt="React Logo" />
                  {/* <img src={DropdownIcon} alt="React Logo" /> */}
                </Dropdown>
              </div>
            </Space>
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    </header>

    // <Header className="header-normal">
    //   <div className="header-normal-container">
    //     <img src={LOGO_Normal} alt="LOGO" />
    //     <div className="wording-container-normal">
    //       <p className="wording-normal">{wording.home_page_wording}</p>
    //     </div>
    //     <div className="header-user-container-normal">
    //       <p className="header-user">{wording.home_page_wording}</p>
    //     </div>
    //   </div>

    // </Header>
  );
};

export default CustomHeader;

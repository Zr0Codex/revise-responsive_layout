import React from "react";
import { Form, Input, Button } from "antd";
import { login } from "../../middleware/authen.service";
import loginPicture from "../../assets/pictures/loginPictureFull.png";
import { UserOutlined } from "@ant-design/icons";
import wording from "../../util/wording";

import CustomLayout from "../../component/MainLayouts/MainLayouts";

import "./LoginPage.style.scss";

const LoginPage = (props) => {
  const onFinish = (values) => {
    console.log("Success", values);
    login(props, values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed", errorInfo);
  };

  return (
    <>
      <CustomLayout className="app-login" isHeader={true}>
        <div className="login-page">
          <div className="login-box">
            <div className="illustration-wrapper">
              <img src={loginPicture} alt="login" />
            </div>

            <div className="login-div">
              <Form
                name="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
              >
                <p className="form-title" style={{ marginBottom: "60px" }}>
                  {wording.login_page_title}
                </p>
                <Form.Item
                  name="username"
                  rules={[
                    { required: true, message: wording.form_notice_message },
                  ]}
                >
                  <Input
                    placeholder={wording.username_placeholder}
                    autoComplete="off"
                    prefix={<UserOutlined />}
                  />
                </Form.Item>

                <Form.Item
                  name="password"
                  rules={[
                    { required: true, message: wording.form_notice_message },
                  ]}
                >
                  <Input.Password
                    placeholder={wording.username_placeholder}
                    prefix={<UserOutlined />}
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                  >
                    เข้าสู่ระบบ
                  </Button>
                </Form.Item>
              </Form>

              <div>
                <p className="footer-login">{wording.login_footer}</p>
              </div>
            </div>
          </div>
        </div>
      </CustomLayout>
    </>
  );
};

export default LoginPage;

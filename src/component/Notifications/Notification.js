import React from "react";
import wording from "../../util/wording";
import { notification } from "antd";

import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";

// notification.config({
//   placement: "topRight",
//   top: 30,
//   duration: 3,
//   rtl: true,
// });

const Notification = (type, props) => {
  if (props === "login_success") {
    notification[type]({
      message: `${wording.login_success}`,
      icon: <CheckCircleOutlined style={{ color: "green" }} />,
      style: { backgroundColor: "#FCFFD8" },
    });
  } else if (props === "login_error") {
    notification[type]({
      message: `${wording.login_failed}`,
      description: `${wording.login_failed_description}`,
      icon: <CloseCircleOutlined style={{ color: "red" }} />,
      style: { backgroundColor: "#FA8072" },
    });
  } else if (props === "login_warning") {
    notification[type]({
      message: `${wording.login_warning}`,
      description: `${wording.login_warning_description}`,
      icon: <InfoCircleOutlined style={{ color: "orange" }} />,
      style: { backgroundColor: "#FFA500" },
    });
  } else if (props === "logout_success") {
    notification[type]({
      message: `${wording.logout_success}`,
      icon: <CheckCircleOutlined style={{ color: "green" }} />,
      style: { backgroundColor: "#FCFFD8" },
    });
  }
};

export default Notification;

import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { login } from '../../middleware/authentication';
import loginPicture from '../../Assets/pictures/loginPictureFull.png';
import { UserOutlined } from '@ant-design/icons';
import CustomLayout from '../MainLayouts/MainLayouts';

const login = (props) => {
  const onFinish = (values) => {
    console.log('Success', values);
    login(props, values);
  };
  const onFailed = (error) => {
    console.log('Failed: ', error);
  };

  return <CustomLayout className="app-login" isHeader={true}></CustomLayout>;
};

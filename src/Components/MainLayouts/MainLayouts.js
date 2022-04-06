import React from 'react';
import './MainLayouts.scss';
import { Layout } from 'antd';
import CustomHeader from '../MainHeaders/MainHeaders';
import CustomFooter from '../MainFooter/MainFooter';

const { Header, Content, Sider } = Layout;

const CustomLayout = (props) => {
  return (
    <main className={`Main-layout ${props.className !== undefined ? props.className : ''}`}>
      {props.isHeader && <CustomHeader />}

      <div style={{ borderRadius: '10px', height: '100%' }}>{props.children}</div>
      <CustomFooter />
    </main>
  );
};

export default CustomLayout;

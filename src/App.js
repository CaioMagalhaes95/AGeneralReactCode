import './App.css';
import React, { useState } from 'react'
import { SideBar } from './components/SideBar/index.tsx'
import { Layout, theme } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { BrowserRouter } from 'react-router-dom';
import { AppRouting } from './App.routing.tsx';

function App() {
  // eslint-disable-next-line no-mixed-operators
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();


  return (
    <BrowserRouter>
   <Layout className='layout'>
    <SideBar />
    <Layout className='site-layout'>
      <Layout.Header style={{padding: 0, background: colorBgContainer}}>
        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
          className: 'trigger',
          onClick: () => setCollapsed(!collapsed),
        })}

      </Layout.Header>
      <Layout.Content
        style={{
          margin: '24px 16px',
        }}
        >
         <AppRouting />
      </Layout.Content>
     
    </Layout>
   </Layout>
   </BrowserRouter>
  );
}

export default App;

import React, { ReactElement, useState } from 'react'
import { Menu, type MenuProps, theme} from 'antd';
import {DashboardFilled, MailOutlined, PieChartOutlined, UserOutlined} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom';
import Layout from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';

type MenuItem = Required<MenuProps>['items'][number]


function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',

): MenuItem {
    return{
        key,
        icon,
        children,
        label,
        type,

    } as MenuItem;
}

const items: MenuItem[] = [
    getItem('Dashboard', '1', <PieChartOutlined />),
    getItem('Users', '2', <MailOutlined />)
];

export function SideBar(): ReactElement {
    const navigate = useNavigate();

    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
      } = theme.useToken();

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };
    return (
        <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div className="demo-logo-vertical" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={[{

            key: 'Dashboard',
            icon: <DashboardFilled></DashboardFilled>,
            label: 'Dashboard',
            onClick: () => navigate('/'),

          },
          {
          key: 'Users',
          icon: <UserOutlined></UserOutlined>,
          label: 'Users',
          onClick: () => navigate('/users')
          },

          ]} />
          
        </Sider>
       
      </Layout>
    );


}
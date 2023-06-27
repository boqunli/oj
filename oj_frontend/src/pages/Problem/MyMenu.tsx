import React, { useState } from 'react';
import {AppstoreOutlined, DatabaseOutlined, SettingOutlined} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import {history} from "@@/core/history";

const items: MenuProps['items'] = [
  {
    label: '全部问题',
    key: 'all',
    icon: <DatabaseOutlined />,
  },
  {
    label: '创建问题',
    key: 'create',
    icon: <AppstoreOutlined />,
    // disabled: true,
  },
  {
    label: '修改问题',
    key: 'modify',
    icon: <SettingOutlined />,
    // disabled: true,
  },
];

const MyMenu = (props:{current: string}) => {
  // const [current, setCurrent] = useState('all');
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    // setCurrent(e.key);
    history.push('/problem/'+ e.key)
  };

  return <Menu onClick={onClick} selectedKeys={[props.current]} mode="horizontal" items={items} />;
};

export default MyMenu;

import React, { useState } from 'react';
import {AppstoreOutlined, MailOutlined, SettingOutlined, TagOutlined} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import {Menu, Space} from 'antd';
import CategoryList from "@/pages/Category/CategoryList/categoryList";
import CategoryCreate from "@/pages/Category/CategoryCreate/categoryCreate";

const items: MenuProps['items'] = [
  {
    label: '分类列表',
    key: 'list',
    icon: <TagOutlined />,
  },
  {
    label: '分类创建',
    key: 'create',
    icon: <AppstoreOutlined />,
  },
  {
    label: '分类修改',
    key: 'modify',
    icon: <SettingOutlined />,
  },
];

const Category: React.FC = () => {
  const [current, setCurrent] = useState('list');

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
  };

  const renderCategory = () => {
    if (current === 'list') {
      return <CategoryList></CategoryList>
    } else if (current === "create") {
      return <CategoryCreate></CategoryCreate>
    } else if (current === "modify") {

    } else  {
      return <></>
    }
  }

  return (<>
    <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
      <div style={{height:"40px"}}></div>
      {renderCategory()}
    </>
  )
};

export default Category;

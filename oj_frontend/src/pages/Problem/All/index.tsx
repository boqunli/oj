import {FC} from "react";
import MyList from "@/pages/Problem/MyList";
import MyMenu from "@/pages/Problem/MyMenu";
import React from 'react';
import {Layout} from 'antd';

const All : FC = () => {
  return (
    <Layout>
        <MyMenu current={"all"}></MyMenu>
        <div style={{ height: '20px' }}></div>
        <MyList></MyList>

    </Layout>
  )
}

export default All;

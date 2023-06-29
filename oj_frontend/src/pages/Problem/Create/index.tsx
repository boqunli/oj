import {FC} from "react";
import MyForm from "@/pages/Problem/Create/MyForm";
import MyMenu from "@/pages/Problem/MyMenu";
import React from 'react';
import {Layout} from 'antd';



const Create : FC = () => {
  return (
    <Layout>
        <MyMenu current={"create"}></MyMenu>
        <div style={{ height: '30px' }}></div>
        <MyForm></MyForm>
    </Layout>
  )
}

export default Create;

import {FC} from "react";
// import MyList from "@/pages/Problem/MyList";
import MyMenu from "@/pages/Problem/MyMenu";
import React from 'react';
import {Layout} from 'antd';
import MyForm from "@/pages/Problem/Modify/MyForm";


const Modify : FC = () => {
  return (
    <Layout>
      <MyMenu current={"modify"}></MyMenu>
      <div style={{ height: '30px' }}></div>
      <MyForm></MyForm>
    </Layout>
  )
}

export default Modify;

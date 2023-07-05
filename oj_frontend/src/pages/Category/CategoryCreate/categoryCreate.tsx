import React from 'react';
import {Button, Form, Input, InputNumber} from 'antd';
import {CateCreate} from "@/services/oj-api/api_problem";

const onFinish = (values: {name: string, parentId: number}) => {
  console.log(values)
    if (values !== null) {
      CateCreate(values).then((r)=>{
        console.log(r)
      })
    }

};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

const CategoryCreate: React.FC = () => {
  return (
    <>
      <Form
        name="basic"
        labelCol={{span: 8}}
        wrapperCol={{span: 16}}
        style={{maxWidth: 600}}
        initialValues={{remember: true}}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="分类名称"
          name="name"
          rules={[{required: true, message: 'Please input your category name!'}]}
        >
          <Input/>
        </Form.Item>

        <Form.Item
          label="父类"
          name="parentId"
          rules={[{required: false, message: 'Please input  parentId!'}]}
        >
          <InputNumber/>
        </Form.Item>

        <Form.Item wrapperCol={{offset: 8, span: 16}}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  )}

export default CategoryCreate;

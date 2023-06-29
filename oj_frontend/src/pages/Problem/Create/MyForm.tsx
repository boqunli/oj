import {ProForm, ProFormDigit, ProFormText, ProFormTextArea} from '@ant-design/pro-components';
import {Button, Form, Input, message, Space} from 'antd';
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";
import React from "react";
import {CreateProblem} from "@/services/oj-api/api_problem";

export default () => {
  const [form] = Form.useForm();
  const wid = 600;
  return (
    <ProForm<{
      name: string;
      company?: string;
      useMode?: string;
    }>
      form={form}
      submitter={{
        render: (props, doms) => {
          return doms;
        }
      }}
      onFinish={async (values) => {
        console.log(values);
        const res = await CreateProblem(values as API.CreateProblemParam);
        if (res.code === 200) {
          message.success('提交成功');
        }
      }}
      params={{}}
    >
      <ProFormText
        width={wid}
        name="title"
        label="问题标题"
        // tooltip="最长为 24 位"
        placeholder="请输入名称"
      />
      <ProFormTextArea
        width={wid}
        name="content"
        label="问题描述"
        placeholder="请输入描述"
      />
      <ProForm.Item
        label="问题分类"
        name="categories"
        // initialValue={defaultData}
        trigger="onValuesChange"
      >
        <Form.List  name="category">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space key={key} style={{ display: 'flex', marginBottom: 4, width: wid*2}} align="baseline">
                  <Form.Item
                    {...restField}
                    name={[name, 'category']}
                    rules={[{ required: true, message: 'Missing category' }]}
                  >
                    <Input placeholder="分类id" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  增加关联分类
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </ProForm.Item>
      <ProFormDigit
        name={"max_mem"}
        width={wid}
        label="最大运行内存"
        placeholder="请输入内存"
      />
      <ProFormDigit
        name={"max_runtime"}
        width={wid}
        label="最大运行时间"
        placeholder="请输入时间"
      />
      <ProForm.Item
        label="测试用例"
        name="testcases"
        // initialValue={defaultData}
        trigger="onValuesChange"
      >
        <Form.List  name="testcase">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space key={key} style={{ display: 'flex', marginBottom: 8, width: wid*2}} align="baseline">
                  <Form.Item
                    {...restField}
                    name={[name, 'input']}
                    rules={[{ required: true, message: 'Missing input' }]}
                  >
                    <Input placeholder="输入" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'output']}
                    rules={[{ required: true, message: 'Missing output' }]}
                  >
                    <Input placeholder="输出" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  增加测试用例
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </ProForm.Item>
    </ProForm>
  );
};

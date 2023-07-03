import {ProForm, ProFormDigit, ProFormText, ProFormTextArea} from '@ant-design/pro-components';
import {Button, Form, Input, message, Space} from 'antd';
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";
import React from "react";
import {CreateProblem, ModifyProblem} from "@/services/oj-api/api_problem";
import ReactQuill from "react-quill";
// import CreateProblemParam = API.CreateProblemParam;
// import {CreateProblem} from "@/services/oj-api/api_problem";

export default () => {
  const [form] = Form.useForm();
  const wid = 600;
  return (
    <ProForm<{
      identity?: string,
      title?: string,
      content?: string,
      max_mem?: number,
      max_runtime?: number,
      category?: any,
      testcase?: any,
    }>
      form={form}
      submitter={{
        render: (props, doms) => {
          return doms;
        }
      }}
      onFinish={async (values) => {
        let cate: number[] = []
        if (values.category !== undefined) {
          // @ts-ignore
          cate = Array.from(values.category).map(item => Number(item['category']));
        }
        const res = await ModifyProblem({
          identity: values.identity,
          title: values.title,
          content: values.content,
          max_mem: values.max_mem,
          max_runtime: values.max_runtime,
          problem_categories: cate,
          test_cases: values.testcase,
        })


        if (res === undefined) {
          message.error("网络请求失败")
        } else if (res.code === 200) {
          message.success(res.msg)
        } else  {
          message.error("创建失败："+ res.msg)
        }
      }}
      params={{}}
    >
      <ProFormText
        width={wid}
        name="identity"
        label="问题标识"
        // tooltip="最长为 24 位"
        placeholder="请输入标识"
      />
      <ProFormText
        width={wid}
        name="title"
        label="问题标题"
        // tooltip="最长为 24 位"
        placeholder="请输入名称"
      />

      <ProForm.Item
        // style={{width:wid}}
        name="content"
        label="问题描述"
      >
        <ReactQuill theme="snow" style={{width:wid*2, height: 300}} />
      </ProForm.Item>

      <div style={{height:"30px"}}></div>
      
      <ProForm.Item
        label="问题分类"
        name="categories"
        // initialValue={defaultData}
        trigger="onValuesChange"
        style={{width:wid}}
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
        style={{width:wid}}

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
                <Button type="dashed" onClick={() => add()} block={true} icon={<PlusOutlined />}>
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

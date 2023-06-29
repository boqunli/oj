import { ProForm, ProFormText } from '@ant-design/pro-components';
import {  message } from 'antd';

export default () => {

  return (
    <ProForm<{
      name: string;
      company?: string;
      useMode?: string;
    }>
      submitter={{
        render: (props, doms) => {
          return doms;
        }
      }}
      onFinish={async (values) => {
        console.log(values);
        message.success('提交成功');
      }}
      params={{}}
    >
      <ProFormText
        width="md"
        name="name"
        label="签约客户名称"
        tooltip="最长为 24 位"
        placeholder="请输入名称"
      />
      <ProFormText
        width="md"
        name="company"
        label="我方公司名称"
        placeholder="请输入名称"
      />
      <ProFormText
        name={['contract', 'name']}
        width="md"
        label="合同名称"
        placeholder="请输入名称"
      />
    </ProForm>
  );
};

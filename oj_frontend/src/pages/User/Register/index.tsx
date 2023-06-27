import type { FC } from 'react';
import React, { useState, useEffect } from 'react';
import {Form, Button, Input, Popover, Progress, message, Row, Col} from 'antd';
// @ts-ignore
import { Link} from 'umi';
import styles from './style.less';
import {register} from "@/services/oj-api/api"
import {history} from "@@/core/history";
import {Helmet, SelectLang, useIntl} from "@@/exports";
import Settings from "../../../../config/defaultSettings";
import {useEmotionCss} from "@ant-design/use-emotion-css";
import { Avatar } from 'antd';
// import {useEmotionCss} from "@ant-design/use-emotion-css";

const FormItem = Form.Item;

const Lang = () => {
  const langClassName = useEmotionCss(({ token }) => {
    return {
      width: 42,
      height: 42,
      lineHeight: '42px',
      position: 'fixed',
      right: 16,
      borderRadius: token.borderRadius,
      ':hover': {
        backgroundColor: token.colorBgTextHover,
      },
    };
  });

  return (
    <div className={langClassName} data-lang>
      {SelectLang && <SelectLang />}
    </div>
  );
};

const passwordStatusMap = {
  ok: (
    <div className={styles.success}>
      <span>强度：强</span>
    </div>
  ),
  pass: (
    <div className={styles.warning}>
      <span>强度：中</span>
    </div>
  ),
  poor: (
    <div className={styles.error}>
      <span>强度：太短</span>
    </div>
  ),
};

const passwordProgressMap: {
  ok: 'success';
  pass: 'normal';
  poor: 'exception';
} = {
  ok: 'success',
  pass: 'normal',
  poor: 'exception',
};

const Register: FC = () => {
  const intl = useIntl();
  const [visible, setVisible]: [boolean, any] = useState(false);
  const [popover, setPopover]: [boolean, any] = useState(false);
  const confirmDirty = false;
  let interval: number | undefined;
  const [form] = Form.useForm();
  useEffect(
    () => () => {
      clearInterval(interval);
    },
    [interval],
  );

  const getPasswordStatus = () => {
    const value = form.getFieldValue('password');
    if (value && value.length > 9) {
      return 'ok';
    }
    if (value && value.length > 5) {
      return 'pass';
    }
    return 'poor';
  };


  const checkConfirm = (_: any, value: string) => {
    const promise = Promise;
    if (value && value !== form.getFieldValue('password')) {
      return promise.reject('两次输入的密码不匹配!');
    }
    return promise.resolve();
  };

  const checkPassword = (_: any, value: string) => {
    const promise = Promise;
    // 没有值的情况
    if (!value) {
      setVisible(!!value);
      return promise.reject('请输入密码!');
    }
    // 有值的情况
    if (!visible) {
      setVisible(!!value);
    }
    setPopover(!popover);
    if (value.length < 6) {
      return promise.reject('');
    }
    if (value && confirmDirty) {
      form.validateFields(['confirm']);
    }
    return promise.resolve();
  };


  const renderPasswordProgress = () => {
    const value = form.getFieldValue('password');
    const passwordStatus = getPasswordStatus();
    return value && value.length ? (
      <div className={styles[`progress-${passwordStatus}`]}>
        <Progress
          status={passwordProgressMap[passwordStatus]}
          className={styles.progress}
          strokeWidth={6}
          percent={value.length * 10 > 100 ? 100 : value.length * 10}
          showInfo={false}
        />
      </div>
    ) : null;
  };

  const  sendCode = async () => {

  }
  const handleSubmit = async (values: any) => {
    // 登录
    const body: API.RegisterParams = {
      username: values.values.username,
      password: values.values.password,
      email: values.values.email,
      captcha: values.values.captcha,
    }
    console.log(body)
    const res = await register(
      body
    );
    console.log(res)
    if (res.code === 200) {
      const defaultRegisterSuccessMessage = intl.formatMessage({
        id: 'pages.register.success',
        defaultMessage: '注册成功！\n 正在跳转到登录界面...',
      });
      const handleClose = () => {
        const urlParams = new URL(window.location.href).searchParams;
        history.push(urlParams.get('redirect') || '/user/login');
      }
      message.success(defaultRegisterSuccessMessage, 3, handleClose);
    }
  };


  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <Helmet>
          <title>
            {intl.formatMessage({
              id: 'menu.register',
              defaultMessage: '注册页',
            })}
            - {Settings.title}
          </title>
        </Helmet>
        <Lang />

        {/*<div*/}
        {/*  style={{*/}
        {/*    flex: '1',*/}
        {/*    padding: '32px 0',*/}
        {/*  }}*/}
        {/*>*/}
        {/*</div>*/}
        <div style={{paddingBottom:"20px"}}>
          <div style={{fontSize:"34px", fontFamily:"Arial, sans-serif"}}>
            <Avatar
              size={60}
              src={'../logo.svg'}
            />
            <span style={{margin:"10px"}}>My Online Judge</span>
          </div>
        </div>

        <Form form={form} name="UserRegister"
              onFinish={async (values) => {
                await handleSubmit({values: values});
              }}>
          <FormItem
            name="username"
            rules={[{required: true, message: '请输入用户名!',},]}
          >
          <Input size="large" placeholder="用户名" />

          </FormItem>
          <Popover
            getPopupContainer={(node) => {
              if (node && node.parentNode) {
                return node.parentNode as HTMLElement;
              }
              return node;
            }}
            content={
              visible && (
                <div style={{ padding: '4px 0' }}>
                  {passwordStatusMap[getPasswordStatus()]}
                  {renderPasswordProgress()}
                  <div style={{ marginTop: 10 }}>
                    <span>请至少输入 6 个字符。请不要使用容易被猜到的密码。</span>
                  </div>
                </div>
              )
            }
            overlayStyle={{ width: 240 }}
            placement="right"
            visible={visible}
          >
            <FormItem
              name="password"
              className={
                form.getFieldValue('password') &&
                form.getFieldValue('password').length > 0 &&
                styles.password
              }
              rules={[
                {
                  validator: checkPassword,
                },
              ]}
            >
              <Input size="large" type="password" placeholder="至少6位密码，区分大小写" />
            </FormItem>
          </Popover>
          <FormItem
            name="confirm"
            rules={[
              {
                required: true,
                message: '确认密码',
              },
              {
                validator: checkConfirm,
              },
            ]}
          >
          <Input size="large" type="password" placeholder="确认密码" />
          </FormItem>

          <FormItem
            name="email"
            rules={[{required: true, message: '请输入邮箱',},{
              pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
              message: '邮箱格式不正确',
            }, {
              max: 50,
              message: '邮箱不得超过50字符',
            }]}
          >
          <Input size="large" placeholder="邮箱" />

          </FormItem>
          <FormItem
            name="captcha"
            rules={[{ required: true, message: '请输入验证码!' }]}
          >
            <Row>
              <Col span={18}>
                <Input
                  size="large"
                  type="password"
                  placeholder="请输入验证码"
                />
              </Col>
              <Col span={6} style={{ float: 'right' }}>
                <Button type="link" size={"large"} style={{fontWeight: 'bold' }} onClick={sendCode}>发送验证码</Button>
              </Col>
            </Row>
          </FormItem>

          <FormItem
            name="phone"
            rules={[{required: false, message: '请输入电话号码',}, {
              pattern: /^1\d{10}$/,
              message: '手机号格式错误！',
            },]}
          >
            <Input size="large" placeholder="电话号码" />
          </FormItem>

          <FormItem>
            <Button
              size="large"
              // loading={submitting}
              className={styles.submit}
              type="primary"
              htmlType="submit"
            >
              <span>注册</span>
            </Button>
            <Link className={styles.login} to="/user/login">
              <span>使用已有账户登录</span>
            </Link>
          </FormItem>
        </Form>
      </div>
    </div>
  );
};
export default Register;
